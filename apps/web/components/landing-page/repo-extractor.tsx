import { fetchAndProcessZipRepo, generateDocs } from "@/app/agents/new/actions";
import { extractOwnerAndRepo } from "@/utils";
import {
  EXCLUDED_FILES,
  MAX_SIZE_LIMIT_FOR_FREE_PLAN,
  MAX_SIZE_LIMIT_FOR_PRO_PLAN,
} from "@/utils/data";
import JSZip from "jszip";
import { GitBranch, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
// import { FileUploadZone } from "./file-upload-zone";
import { SizeLimitAlert } from "../size-limit-alert";
import { ErrorAlert } from "../error-alert";
import { useRouter } from "next/navigation";
import AnalysingRepoAnimation from "../analysing-repo-animation";
import { useSupabaseClient } from "@/lib/SupabaseClientProvider";
import { cn } from "@workspace/ui/lib/utils";

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
  const [analysingZipFile, setAnalysingZipFile] = useState(false);
  const supabase = useSupabaseClient();
  const router = useRouter();

  //CONSTANTS DATA
  const user = !session ? user1 : user2;

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

      if (!supabase) return;

      // Check if repository already exists
      const { data: existingRepo } = await supabase
        .from("github_repos")
        .select("name")
        .eq("name", repo)
        .eq("email", session?.user?.email)
        .single();

      if (existingRepo) {
        setAnalysingRepo(false);
        setErrorDetails({
          title: "Repository Already Exists",
          description: "This repository has already been imported. You can access it from your repository list.",
          showRetry: false,
        });
        setShowError(true);
        return;
      }

      // Fetch and process repository files
      const files = await fetchAndProcessZipRepo(owner, repo);
      const unsavedFiles = files?.map((file) => ({
        path: file.path,
        content: JSON.stringify(file.content),
        repo: repo,
        owner: owner,
        email: session?.user?.email as string,
      }));

      setProgress(25);

      // Save files to database
      const { error: filesError } = await supabase
        .from("github_files")
        .insert(unsavedFiles);

      if (filesError) {
        console.log("error saving files", filesError);
        throw new Error("Failed to save repository files");
      }

      // Fetch repository metadata
      const data = await fetch(
        `/api/repo/metadata?owner=${owner}&repo=${repo}`
      );
      const metadata = await data.json();

      setProgress(50);

      // Find and process README file
      const readmeFile = files?.find(
        (file: any) =>
          file.path.toLowerCase().includes("readme.md")
      );
      const docsRes = await generateDocs(readmeFile?.content as string);

      setProgress(75);

      // Save documentation
      const { error: docError } = await supabase.from("github_docs").insert({
        owner: owner,
        repo: repo,
        readme: docsRes,
        email: session?.user?.email,
        metadata: JSON.stringify({
          ...metadata,
          totalFiles: files?.length,
        }),
      });

      if (docError) {
        console.log("error saving docs", docError);
        throw new Error("Failed to save repository documentation");
      }

      // Save repository metadata
      const { error: repoError } = await supabase.from("github_repos").insert({
        name: repo,
        email: session?.user?.email,
        owner,
        description: metadata?.metadata.about || "",
        url: repoUrl,
      });

      if (repoError) {
        console.log("error saving repo", repoError);
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

  // const handleFileUpload = async (file: File) => {
  //   if (!file) return;

  //   setExtractingZipFile(true);
  //   try {
  //     // Step 1: Extract the repository name from the ZIP file name
  //     const repoName = file.name
  //       .replace(/-main\.zip$/, "") // Remove "-main.zip" suffix
  //       .replace(/\.zip$/, ""); // Remove ".zip" extension (fallback)

  //     const fileSizeInBytes = file.size;
  //     const fileSizeInKb = fileSizeInBytes / 1024;
  //     const fileSizeInMb = Math.ceil(fileSizeInKb / 1024);

  //     // Check size limits for free and pro users
  //     if (user === "free" && fileSizeInMb > MAX_SIZE_LIMIT_FOR_FREE_PLAN_ZIP) {
  //       setSizeLimitExceeded({
  //         status: true,
  //         fileSize: fileSizeInMb,
  //         sizeLimit: MAX_SIZE_LIMIT_FOR_FREE_PLAN_ZIP,
  //       });
  //       setExtractingZipFile(false);
  //       return;
  //     } else if (
  //       user === "pro" &&
  //       fileSizeInMb > MAX_SIZE_LIMIT_FOR_PRO_PLAN_ZIP
  //     ) {
  //       setSizeLimitExceeded({
  //         status: true,
  //         fileSize: fileSizeInMb,
  //         sizeLimit: MAX_SIZE_LIMIT_FOR_PRO_PLAN_ZIP,
  //       });
  //       setExtractingZipFile(false);
  //       return;
  //     } else {
  //       if (sizeLimitExceeded.status === true)
  //         setSizeLimitExceeded({
  //           status: false,
  //           fileSize: 0,
  //           sizeLimit: 0,
  //         });
  //     }

  //     const zip = new JSZip();
  //     const zipData = await file.arrayBuffer();
  //     const unzippedFiles = await zip.loadAsync(zipData); // Load ZIP content

  //     // Step 3: Check if at least one valid file or directory exists
  //     let isValidCodeRepo = false;
  //     for (const path of Object.keys(unzippedFiles.files)) {
  //       if (validCodeFiles.some((validFile) => path.includes(validFile))) {
  //         isValidCodeRepo = true;
  //         break;
  //       }
  //     }

  //     // Step 4: Set invalidZip state
  //     if (!isValidCodeRepo) {
  //       setErrorDetails({
  //         title: "Invalid Zip File",
  //         description:
  //           "The uploaded ZIP file does not appear to be a valid code repository.",
  //         showRetry: false,
  //       });
  //       setShowError(true);
  //       return;
  //     } else {
  //       setErrorDetails({
  //         title: "",
  //         description: "",
  //         showRetry: false,
  //       });
  //     }

  //     // Step 5: Filter out excluded files
  //     const validFiles = await getValidFiles(unzippedFiles);
  //     const file_id = nanoid();
  //     if (!session && supabase) {
  //       //save file to db temporarily
  //       await supabase.from("standby_files").insert({
  //         file_id: file_id,
  //         content: validFiles,
  //       });
  //     }
  //     checkSession(`zip-file-${file_id}`, repoName);
  //     if (!session) return;
  //     setAnalysingZipFile(true);
  //     setProgress(25);
  //     //save the files to supabase
  //     validFiles?.map(async (file) => {
  //       if (!supabase) return;
  //       //save file to db
  //       await supabase.from("github_files").insert({
  //         path: file.path,
  //         content: file.content,
  //         repo: repoName,
  //         owner: "user",
  //         email: session?.user?.email as string,
  //       });
  //     });
  //     setProgress(50);
  //     const readmeFile = validFiles?.find(
  //       (file: any) =>
  //         file.path.includes("README.md") || file.path.includes("readme.md")
  //     );
  //     //save the files to the database
  //     const docsRes = await generateDocs(readmeFile?.content as string);
  //     setProgress(75);
  //     if (supabase) {
  //       await supabase.from("github_docs").insert({
  //         repo: repoName,
  //         readme: docsRes,
  //         email: session?.user?.email,
  //         metadata: JSON.stringify({
  //           totalFiles: validFiles?.length,
  //         }),
  //       });

  //       await supabase.from("github_repos").upsert(
  //         {
  //           name: repoName,
  //           email: session?.user?.email,
  //         },
  //         {
  //           onConflict: "name,email",
  //         }
  //       );
  //     }
  //     setProgress(100);
  //     router.push(`/repo-talkroom?repo=${repoName}`);
  //   } catch (error) {
  //     console.error("Error processing ZIP file:", error);
  //     setErrorDetails({
  //       title: "Import Failed",
  //       description:
  //         "Failed to process the ZIP file. Please check if it's a valid repository and try again.",
  //       showRetry: true,
  //     });
  //     setShowError(true);
  //     setExtractingZipFile(false);
  //     setAnalysingZipFile(false);
  //   }
  // };

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
          {/* <div className="flex items-center justify-center mt-3">
            <div className="h-px bg-white/10 flex-1" />
            <span className="px-4 text-white/50 text-sm">OR</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>
          <FileUploadZone
            onFileSelect={handleFileUpload}
            isLoading={extractingZipFile}
          /> */}
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
