import { fetchAndProcessZipRepo } from "@/app/agents/new/actions";
import { extractOwnerAndRepo } from "@/utils";
import {
  EXCLUDED_FILES,
  MAX_SIZE_LIMIT_FOR_FREE_PLAN,
  MAX_SIZE_LIMIT_FOR_FREE_PLAN_ZIP,
  MAX_SIZE_LIMIT_FOR_PRO_PLAN,
  MAX_SIZE_LIMIT_FOR_PRO_PLAN_ZIP,
  validCodeFiles,
} from "@/utils/data";
import JSZip from "jszip";
import { GitBranch } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FileUploadZone } from "./file-upload-zone";
import { SizeLimitAlert } from "../size-limit-alert";
import { ErrorAlert } from "../error-alert";

const user1 = "free";
const user2 = "pro";

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

  //CONSTANTS DATA
  const user = !session ? user1 : user2;

  //FUNCTIONS

  const handleRepoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { owner, repo } = extractOwnerAndRepo(repoUrl);
    //get repo zip size
    const response = await fetch(`/api/repo/size?owner=${owner}&repo=${repo}`);
    const size = await response.json();
    console.log("size", size);
    if (user === "free" && size > MAX_SIZE_LIMIT_FOR_FREE_PLAN) {
      setSizeLimitExceeded({
        status: true,
        fileSize: size,
        sizeLimit: MAX_SIZE_LIMIT_FOR_FREE_PLAN,
      });
      return;
    } else if (user === "pro" && size > MAX_SIZE_LIMIT_FOR_PRO_PLAN) {
      setSizeLimitExceeded({
        status: true,
        fileSize: size,
        sizeLimit: MAX_SIZE_LIMIT_FOR_PRO_PLAN,
      });
      return;
    } else {
      if (sizeLimitExceeded.status === true)
        setSizeLimitExceeded({
          status: false,
          fileSize: 0,
          sizeLimit: 0,
        });
    }

    const files = await fetchAndProcessZipRepo(owner, repo);
    console.log("files", files);
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;

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
    const zipData = await file.arrayBuffer(); // Read ZIP file as ArrayBuffer
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

    // Step 7: Store valid files in the database
    // const { data, error } = await supabase.from("files").insert(
    //   validFiles.map((file) => ({
    //     repo: repoName, // Use the extracted repository name
    //     path: file.path,
    //     content: file.content,
    //   }))
    // );

    // if (error) {
    //   console.error("Error saving files to Supabase:", error);
    //   return;
    // }

    // console.log("Files saved successfully:", data);
    console.log(validFiles, repoName);
    return validFiles;
  };

  return (
    <>
      <div className="max-w-2xl mx-auto mb-12">
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
              className="bg-[#CCFF00] text-black px-6 py-3 rounded-xl hover:bg-[#CCFF00]/90 transition-colors font-medium flex items-center gap-2"
              disabled={repoUrl === ""}
            >
              <GitBranch className="w-5 h-5" />
              Import
            </button>
          </form>
          <div className="flex items-center justify-center mt-3">
            <div className="h-px bg-white/10 flex-1" />
            <span className="px-4 text-white/50 text-sm">OR</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>
          <FileUploadZone onFileSelect={handleFileUpload} />
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
    </>
  );
};

export default RepoExtractor;
