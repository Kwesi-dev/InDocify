import { fetchAndProcessZipRepo, generateDocs } from "@/app/agents/new/actions";
import { extractOwnerAndRepo, nanoid } from "@/utils";
import {
  EXCLUDED_FILES,
  MAX_SIZE_LIMIT_FOR_FREE_PLAN,
  MAX_SIZE_LIMIT_FOR_FREE_PLAN_ZIP,
  MAX_SIZE_LIMIT_FOR_PRO_PLAN,
  MAX_SIZE_LIMIT_FOR_PRO_PLAN_ZIP,
  validCodeFiles,
} from "@/utils/data";
import JSZip from "jszip";
import { GitBranch, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FileUploadZone } from "./file-upload-zone";
import { SizeLimitAlert } from "../size-limit-alert";
import { ErrorAlert } from "../error-alert";
import { useRouter } from "next/navigation";
import AnalysingRepoAnimation from "../analysing-repo-animation";
import { useSupabaseClient } from "@/lib/SupabaseClientProvider";

const user1 = "free";
const user2 = "pro";

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

const RepoExtractor = () => {
  //STATES
  const [repoUrl, setRepoUrl] = useState("");
  const { data: session } = useSession();
  const [sizeLimitExceeded, setSizeLimitExceeded] = useState({
    status: false,
    fileSize: 0,
    sizeLimit: 0,
  });
  const [errorType, setErrorType] = useState<
    "invalid repo url" | "invalid zip" | null
  >(null);
  const [extractingRepo, setExtractingRepo] = useState(false);
  const [extractingZipFile, setExtractingZipFile] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysingRepo, setAnalysingRepo] = useState(false);
  const [analysingZipFile, setAnalysingZipFile] = useState(false);
  const supabase = useSupabaseClient();
  const router = useRouter();

  //CONSTANTS DATA
  const user = !session ? user1 : user2;

  //FUNCTIONS

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
    setExtractingRepo(true);
    try {
      const { owner, repo } = extractOwnerAndRepo(repoUrl);
      //get repo zip size
      const response = await fetch(
        `/api/repo/size?owner=${owner}&repo=${repo}`
      );
      const size = await response.json();
      if (user === "free" && size > MAX_SIZE_LIMIT_FOR_FREE_PLAN) {
        setSizeLimitExceeded({
          status: true,
          fileSize: size,
          sizeLimit: MAX_SIZE_LIMIT_FOR_FREE_PLAN,
        });
        setExtractingRepo(false);
        return;
      } else if (user === "pro" && size > MAX_SIZE_LIMIT_FOR_PRO_PLAN) {
        setSizeLimitExceeded({
          status: true,
          fileSize: size,
          sizeLimit: MAX_SIZE_LIMIT_FOR_PRO_PLAN,
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
      checkSession(repoUrl, repo, owner);
      if (!session) return;
      setExtractingRepo(false);
      setAnalysingRepo(true);
      const files = await fetchAndProcessZipRepo(owner, repo);
      const unsavedFiles = files?.map((file) => {
        return {
          path: file.path,
          content: JSON.stringify(file.content),
          repo: repo,
          owner: owner,
          email: session?.user?.email as string,
        };
      });
      //save the files to supabase

      if (!supabase) return;
      //save file to db
      await supabase.from("github_files").insert(unsavedFiles);

      setProgress(25);
      const data = await fetch(
        `/api/repo/metadata?owner=${owner}&repo=${repo}`
      );
      const metadata = await data.json();

      setProgress(50);
      //find the readme file
      const readmeFile = files?.find(
        (file: any) =>
          file.path.includes("README.md") || file.path.includes("readme.md")
      );
      //save the files to the database
      const docsRes = await generateDocs(readmeFile?.content as string);

      setProgress(75);

      //save readme to database
      if (supabase) {
        await supabase.from("github_docs").insert({
          owner: owner,
          repo: repo,
          readme: docsRes,
          email: session?.user?.email,
          metadata: JSON.stringify({
            ...metadata,
            totalFiles: files?.length,
          }),
        });
        console.log("saved readme", metadata);

        const { error } = await supabase.from("github_repos").upsert(
          {
            name: repo,
            email: session?.user?.email,
            owner,
            description: metadata?.metadata.about || "",
          },
          {
            onConflict: "name,email",
          }
        );

        if (error) {
          console.log("error saving repo", error);
        }
      }

      setProgress(100);

      router.push(`/repo-talkroom?owner=${owner}&repo=${repo}`);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    setExtractingZipFile(true);
    try {
      // Step 1: Extract the repository name from the ZIP file name
      const repoName = file.name
        .replace(/-main\.zip$/, "") // Remove "-main.zip" suffix
        .replace(/\.zip$/, ""); // Remove ".zip" extension (fallback)

      const fileSizeInBytes = file.size;
      const fileSizeInKb = fileSizeInBytes / 1024;
      const fileSizeInMb = Math.ceil(fileSizeInKb / 1024);

      // Check size limits for free and pro users
      if (user === "free" && fileSizeInMb > MAX_SIZE_LIMIT_FOR_FREE_PLAN_ZIP) {
        setSizeLimitExceeded({
          status: true,
          fileSize: fileSizeInMb,
          sizeLimit: MAX_SIZE_LIMIT_FOR_FREE_PLAN_ZIP,
        });
        setExtractingZipFile(false);
        return;
      } else if (
        user === "pro" &&
        fileSizeInMb > MAX_SIZE_LIMIT_FOR_PRO_PLAN_ZIP
      ) {
        setSizeLimitExceeded({
          status: true,
          fileSize: fileSizeInMb,
          sizeLimit: MAX_SIZE_LIMIT_FOR_PRO_PLAN_ZIP,
        });
        setExtractingZipFile(false);
        return;
      } else {
        if (sizeLimitExceeded.status === true)
          setSizeLimitExceeded({
            status: false,
            fileSize: 0,
            sizeLimit: 0,
          });
      }

      const zip = new JSZip();
      const zipData = await file.arrayBuffer();
      const unzippedFiles = await zip.loadAsync(zipData); // Load ZIP content

      // Step 3: Check if at least one valid file or directory exists
      let isValidCodeRepo = false;
      for (const path of Object.keys(unzippedFiles.files)) {
        if (validCodeFiles.some((validFile) => path.includes(validFile))) {
          isValidCodeRepo = true;
          break;
        }
      }

      // Step 4: Set invalidZip state
      if (!isValidCodeRepo) {
        setErrorType("invalid zip");
        return;
      } else {
        setErrorType(null);
      }

      // Step 5: Filter out excluded files
      const validFiles = await getValidFiles(unzippedFiles);
      const file_id = nanoid();
      if (!session && supabase) {
        //save file to db temporarily
        await supabase.from("standby_files").insert({
          file_id: file_id,
          content: validFiles,
        });
      }
      checkSession(`zip-file-${file_id}`, repoName);
      if (!session) return;
      setAnalysingZipFile(true);
      setProgress(25);
      //save the files to supabase
      validFiles?.map(async (file) => {
        if (!supabase) return;
        //save file to db
        await supabase.from("github_files").insert({
          path: file.path,
          content: file.content,
          repo: repoName,
          owner: "user",
          email: session?.user?.email as string,
        });
      });
      setProgress(50);
      const readmeFile = validFiles?.find(
        (file: any) =>
          file.path.includes("README.md") || file.path.includes("readme.md")
      );
      //save the files to the database
      const docsRes = await generateDocs(readmeFile?.content as string);
      setProgress(75);
      if (supabase) {
        await supabase.from("github_docs").insert({
          repo: repoName,
          readme: docsRes,
          email: session?.user?.email,
          metadata: JSON.stringify({
            totalFiles: validFiles?.length,
          }),
        });

        await supabase.from("github_repos").upsert(
          {
            name: repoName,
            email: session?.user?.email,
          },
          {
            onConflict: "name,email",
          }
        );
      }
      setProgress(100);
      router.push(`/repo-talkroom?repo=${repoName}`);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto mb-12">
        <div className="bg-white/5 backdrop-blur-sm p-2 rounded-2xl">
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="Enter public repository URL"
              className="flex-1 bg-black/20 text-white placeholder-white/50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
              disabled
            />
            <button
              type="submit"
              className="bg-[#CCFF00] text-black px-6 py-3 rounded-xl hover:bg-[#CCFF00]/90 transition-colors font-medium flex items-center justify-center gap-2 w-[80px] md:w-[125px]"
              // disabled={repoUrl === "" || extractingRepo}
              disabled
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
          <div className="flex items-center justify-center mt-3">
            <div className="h-px bg-white/10 flex-1" />
            <span className="px-4 text-white/50 text-sm">OR</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>
          <FileUploadZone
            onFileSelect={handleFileUpload}
            isLoading={extractingZipFile}
          />
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
        isOpen={errorType !== null}
        onClose={() => setErrorType(null)}
        title={
          errorType === "invalid repo url"
            ? "Invalid Repository URL"
            : "Invalid Zip File"
        }
        description={
          errorType === "invalid repo url"
            ? "Please enter a valid GitHub repository URL."
            : "The uploaded ZIP file does not appear to be a valid code repository."
        }
      />
      {analysingRepo || analysingZipFile ? (
        <AnalysingRepoAnimation
          progress={progress}
          stepsType={analysingZipFile ? "zipSteps" : "urlSteps"}
        />
      ) : null}
    </>
  );
};

export default RepoExtractor;
