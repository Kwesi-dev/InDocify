"use client";

import { useState, useRef } from "react";
import { Upload, X, FileText, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

export function FileUploadZone({
  onFileSelect,
  isLoading,
}: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith(".zip")) {
      handleFileSelection(file);
    }
  };

  const handleFileSelection = async (file: File) => {
    setSelectedFile(file);
    setIsUploading(true);
    try {
      // Simulate upload process
      await new Promise((resolve) => setTimeout(resolve, 2000));
      //   onFileSelect(file);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        p-8 border-2 border-dashed rounded-xl mt-3 text-center transition-all duration-200
        ${isDragging ? "border-[#CCFF00] bg-[#CCFF00]/10" : "border-white/10 hover:border-white/20"}
        ${selectedFile ? "bg-white/5" : ""}
      `}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".zip"
        onChange={handleFileInput}
        className="hidden"
        id="file-upload"
        disabled
      />

      {!selectedFile ? (
        <label
          htmlFor="file-upload"
          className="cursor-pointer inline-flex flex-col items-center gap-2"
        >
          <Upload
            className={`w-8 h-8 ${isDragging ? "text-[#CCFF00]" : "text-white/70"}`}
          />
          <span className="text-white font-medium">
            {isDragging
              ? "Drop your file here"
              : "Drop your repository ZIP file here"}
          </span>
          <span className="text-white/50 text-sm">or click to browse</span>
        </label>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3">
            <FileText className="w-8 h-8 text-[#CCFF00]" />
            <div className="text-left">
              <p className="text-white font-medium">{selectedFile.name}</p>
              <p className="text-white/50 text-sm">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            {isUploading ? (
              <Button
                disabled
                className="bg-white/10 text-white hover:bg-white/20"
              >
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={removeFile}
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  disabled={isLoading}
                >
                  <X className="w-4 h-4 mr-2" />
                  Remove
                </Button>
                <Button
                  className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 flex items-center justify-center"
                  onClick={() => onFileSelect(selectedFile)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      Processing
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
