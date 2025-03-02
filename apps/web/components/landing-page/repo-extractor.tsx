import { fetchAndProcessZipRepo, generateDocs } from "@/app/agents/new/actions";
import { extractOwnerAndRepo } from "@/utils";
import {
  EXCLUDED_FILES,
  MAX_SIZE_LIMIT_FOR_ENTERPRISE_PLAN,
  MAX_SIZE_LIMIT_FOR_FREE_PLAN,
  MAX_SIZE_LIMIT_FOR_PRO_PLAN,
} from "@/utils/data";
import JSZip from "jszip";
import { GitBranch, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { SizeLimitAlert } from "../size-limit-alert";
import { ErrorAlert } from "../error-alert";
import { useRouter } from "next/navigation";
import AnalysingRepoAnimation from "../analysing-repo-animation";
import { useSupabaseClient } from "@/lib/SupabaseClientProvider";
import { cn } from "@workspace/ui/lib/utils";
import { useSubscription } from "@/hooks/use-subscription";
import useRepoLimit from "@/hooks/useRepoLimit";
import { RepoLimitDialog } from "../repo-limit-dialog";
import { ProRepoLimitDialog } from "../pro-repo-limit-dialog";
import { PrivateRepoAccessDialog } from "./private-repo-access-dialog";

export const getValidFiles = async (unzippedFiles: JSZip) => {
  const extractedFiles = await Promise.all(
    Object.entries(unzippedFiles.files).map(async ([path, fileObj]) => {
      if (fileObj.dir) {
        return;
      }

      // Check if the file should be excluded
      const isExcluded = EXCLUDED_FILES.some((excluded) => {
        if (excluded.startsWith("*")) {
          // Handle wildcard patterns (e.g., *.png)
          return path.endsWith(excluded.slice(1));
        } else {
          // Handle exact matches (e.g., node_modules)
          return path.includes(excluded);
        }
      });

      if (isExcluded) {
        return;
      }

      // Extract file content
      const content = await fileObj.async("text"); // Use "uint8array" for binary files
      return { path, content };
    })
  );

  // Step 6: Filter out undefined values (excluded files)
  const validFiles = extractedFiles.filter((f) => f !== undefined);

  return validFiles;
};

const RepoExtractor = ({ className }: { className?: string }) => {
  //STATES
  const [repoUrl, setRepoUrl] = useState("");
  const { data: session } = useSession();
  const [sizeLimitExceeded, setSizeLimitExceeded] = useState({
    status: false,
    fileSize: 0,
    sizeLimit: 0,
  });
  const [showError, setShowError] = useState(false);
  const [errorDetails, setErrorDetails] = useState({
    title: "",
    description: "",
    showRetry: false,
  });
  const [extractingRepo, setExtractingRepo] = useState(false);
  // const [extractingZipFile, setExtractingZipFile] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysingRepo, setAnalysingRepo] = useState(false);
  const supabase = useSupabaseClient();
  const router = useRouter();
  const { subscription, isSubscribed } = useSubscription();
  const { updateRepoCounts, repoCounts: repoLimitData } = useRepoLimit();
  const [showLimitDialog, setShowLimitDialog] = useState(false);
  const [showPrivateRepoAccessDialog, setShowPrivateRepoAccessDialog] =
    useState(false);

  //FUNCTIONS
  const handleRetry = () => {
    // Create a synthetic event
    handleRepoSubmit({ preventDefault: () => {} } as React.FormEvent);
  };

  const checkSession = (repoUrl: string, repoName?: string, owner?: string) => {
    if (!session) {
      const path = owner
        ? `/signup?next-repo-url=${repoUrl}&repo=${repoName}&owner=${owner}`
        : `/signup?next-repo-url=${repoUrl}&repo=${repoName}`;
      router.push(path);
    }
    return;
  };

  const handleRepoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (repoLimitData?.isLimited || repoLimitData?.isProLimited) {
      setShowLimitDialog(true);
      return;
    }
    setExtractingRepo(true);
    setShowError(false);
    try {
      const { owner, repo } = extractOwnerAndRepo(repoUrl);
      //get repo zip size
      const response = await fetch(
        `/api/repo/size?owner=${owner}&repo=${repo}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch repository size: ${response.statusText}`
        );
      }

      const size = await response.json();

      if (!isSubscribed && size > MAX_SIZE_LIMIT_FOR_FREE_PLAN) {
        setSizeLimitExceeded({
          status: true,
          fileSize: size,
          sizeLimit: MAX_SIZE_LIMIT_FOR_FREE_PLAN,
        });
        setExtractingRepo(false);
        return;
      } else if (
        isSubscribed &&
        subscription?.tier === "pro" &&
        size > MAX_SIZE_LIMIT_FOR_PRO_PLAN
      ) {
        setSizeLimitExceeded({
          status: true,
          fileSize: size,
          sizeLimit: MAX_SIZE_LIMIT_FOR_PRO_PLAN,
        });
        setExtractingRepo(false);
        return;
      } else if (
        isSubscribed &&
        subscription?.tier === "enterprise" &&
        size > MAX_SIZE_LIMIT_FOR_ENTERPRISE_PLAN
      ) {
        setSizeLimitExceeded({
          status: true,
          fileSize: size,
          sizeLimit: MAX_SIZE_LIMIT_FOR_ENTERPRISE_PLAN,
        });
        setExtractingRepo(false);
        return;
      } else {
        if (sizeLimitExceeded.status === true)
          setSizeLimitExceeded({
            status: false,
            fileSize: 0,
            sizeLimit: 0,
          });
      }

      // Fetch repo metadata
      const data = await fetch(
        `/api/repo/metadata?owner=${owner}&repo=${repo}`
      );

      const metadata = await data.json();
      const isPrivate = metadata.metadata.visibility === "Private";
      if (!isSubscribed && isPrivate) {
        setShowPrivateRepoAccessDialog(true);
        setExtractingRepo(false);
        return;
      }

      await updateRepoCounts(isPrivate);

      checkSession(repoUrl, repo, owner);
      if (!session) return;
      setExtractingRepo(false);
      setAnalysingRepo(true);

      if (!supabase) return;

      // Check if the current user has already imported this repo
      const { data: existingRepo } = await supabase
        .from("github_repos")
        .select("*")
        .eq("name", repo)
        .eq("email", session?.user?.email)
        .maybeSingle();

      if (existingRepo) {
        setAnalysingRepo(false);
        setErrorDetails({
          title: "Repository Already Exists",
          description:
            "You have already imported this repository. You can access it from your repository list.",
          showRetry: false,
        });
        setShowError(true);
        return;
      }

      setProgress(25);

      // Check if repo files and docs already exist (imported by another user)
      const { data: existingFiles } = await supabase
        .from("github_files")
        .select("*")
        .eq("repo", repo)
        .eq("email", session?.user?.email)
        .maybeSingle();

      const { data: existingDocs } = await supabase
        .from("github_docs")
        .select("*")
        .eq("repo", repo)
        .eq("email", session?.user?.email)
        .maybeSingle();

      // If files don't exist yet, fetch and process them
      let files;
      if (!existingFiles) {
        files = await fetchAndProcessZipRepo(owner, repo);
        const unsavedFiles = files?.map((file) => ({
          path: file.path,
          content: JSON.stringify(file.content),
          repo: repo,
          owner: owner,
          email: session?.user?.email as string,
        }));

        // Save files
        const { error: filesError } = await supabase
          .from("github_files")
          .insert(unsavedFiles);

        if (filesError) {
          throw new Error("Failed to save repository files");
        }
      }

      setProgress(50);

      // Generate docs if they don't exist yet
      let docsRes;
      if (!existingDocs) {
        const _files = files || [];
        // Find and process README file
        const readmeFile = files?.find((file: any) =>
          file.path.toLowerCase().includes("readme.md")
        );
        docsRes = await generateDocs(readmeFile?.content as string);

        const { error: docError } = await supabase.from("github_docs").insert({
          owner: owner,
          repo: repo,
          readme: docsRes,
          email: session?.user?.email,
          metadata: JSON.stringify({
            ...metadata,
            totalFiles: _files?.length,
          }),
        });

        if (docError) {
          throw new Error("Failed to save repository documentation");
        }
      }

      setProgress(75);
      // Save repo to user's list
      const { error: repoError } = await supabase.from("github_repos").insert({
        name: repo,
        email: session?.user?.email,
        owner,
        description: metadata?.metadata.about || "",
        url: repoUrl,
      });

      if (repoError) {
        throw new Error("Failed to save repository metadata");
      }

      setProgress(100);

      router.push(`/repo-talkroom?owner=${owner}&repo=${repo}`);
    } catch (error) {
      console.error("Error importing repository:", error);
      setErrorDetails({
        title: "Import Failed",
        description:
          "Failed to import the repository. Please check if the repository exists and try again.",
        showRetry: true,
      });
      setShowError(true);
      setExtractingRepo(false);
      setAnalysingRepo(false);
    }
  };

  return (
    <>
      <div className={cn("max-w-2xl mx-auto mb-12", className)}>
        <div className="bg-white/5 backdrop-blur-sm p-2 rounded-2xl">
          <form onSubmit={handleRepoSubmit} className="flex gap-2">
            <input
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="Enter public repository URL"
              className="flex-1 bg-black/20 text-white placeholder-white/50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
            />
            <button
              type="submit"
              className="bg-[#CCFF00] text-black px-6 py-3 rounded-xl hover:bg-[#CCFF00]/90 transition-colors font-medium flex items-center justify-center gap-2 w-[80px] md:w-[125px]"
              disabled={repoUrl === "" || extractingRepo}
            >
              {extractingRepo ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <>
                  <GitBranch className="w-5 h-5 md:block hidden" />
                  Import
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      <SizeLimitAlert
        isOpen={sizeLimitExceeded.status}
        onClose={() =>
          setSizeLimitExceeded({ status: false, fileSize: 0, sizeLimit: 0 })
        }
        fileSize={sizeLimitExceeded.fileSize}
        sizeLimit={sizeLimitExceeded.sizeLimit}
      />
      <ErrorAlert
        isOpen={showError}
        onClose={() => setShowError(false)}
        onRetry={handleRetry}
        title={errorDetails.title}
        description={errorDetails.description}
        showRetry={errorDetails.showRetry}
      />
      <>
        {subscription?.tier === "pro" ? (
          <ProRepoLimitDialog
            isOpen={showLimitDialog}
            onClose={() => setShowLimitDialog(false)}
          />
        ) : (
          <RepoLimitDialog
            isOpen={showLimitDialog}
            onClose={() => setShowLimitDialog(false)}
          />
        )}
      </>
      {showPrivateRepoAccessDialog ? (
        <PrivateRepoAccessDialog
          isOpen={showPrivateRepoAccessDialog}
          onClose={() => setShowPrivateRepoAccessDialog(false)}
        />
      ) : null}
      {analysingRepo ? <AnalysingRepoAnimation progress={progress} /> : null}
    </>
  );
};

export default RepoExtractor;
