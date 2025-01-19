import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Loader2, FileText, X } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Progress } from "@workspace/ui/components/progress";
import { useToast } from "@workspace/ui/hooks/use-toast";
import JSZip from "jszip";

const RepoUpload = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const validFiles = acceptedFiles.filter((file) =>
        file.name.endsWith(".zip")
      );
      if (validFiles.length !== acceptedFiles.length) {
        toast({
          title: "Only ZIP files containing repository content are allowed.",
        });
      }
      setFiles((prev) => [...prev, ...validFiles]);
    },
    [toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/zip": [".zip"],
      "application/x-zip-compressed": [".zip"],
    },
    maxFiles: 1,
    multiple: false,
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    try {
      setIsUploading(true);

      const reader = new FileReader();
      const zip = new JSZip();
      reader.onload = async (event) => {
        const content = event.target?.result as string;
        const zipContent = await zip.loadAsync(content);
        const folders: string[] = [];
        const files: { name: string; content: string }[] = [];
        await Promise.all(
          Object.entries(zipContent.files).map(async ([name, file]) => {
            if (file.dir) {
              folders.push(name);
            } else {
              files.push({
                name,
                content: await file.async("text"),
              });
            }
          })
        );

        console.log("folders", folders);
        console.log("files", files);
      };
      reader.readAsText(files[0] as Blob);

      //   onComplete("upload", { files });
    } catch (error) {
      toast({
        title: "Failed to process repository",
        description: "Please try again later.",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      setFiles([]);
    }
  };

  return (
    <div
      {...getRootProps()}
      className={`
            relative rounded-lg border-2 border-dashed transition-colors cursor-pointer
            ${isDragActive ? "border-[#CCFF00] bg-[#CCFF00]/10" : "border-white/10 hover:border-white/20"}
            ${files.length > 0 ? "p-4" : "p-6"}
          `}
    >
      <input {...getInputProps()} />

      <AnimatePresence mode="wait">
        {files.length > 0 ? (
          <div className="space-y-4">
            {files.map((file, index) => (
              <motion.div
                key={file.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 p-2"
              >
                <FileText className="h-4 w-4 text-white/70" />
                <span className="flex-1 truncate text-sm text-white/70">
                  {file.name}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white/50 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </motion.div>
            ))}

            {isUploading && (
              <div className="space-y-2">
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-xs text-white/50">
                  Processing repository...
                </p>
              </div>
            )}

            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleUpload();
              }}
              disabled={isUploading}
              className="w-full bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Process Repository
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <Upload className="mb-2 h-6 w-6 text-white/40" />
            <p className="text-sm font-medium text-white">
              Drop repository ZIP
            </p>
            <p className="text-xs text-white/50">or click to select file</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RepoUpload;
