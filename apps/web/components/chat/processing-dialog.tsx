"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { LoadingSpinner } from "../loading-spinner";
import { Code2, GitBranch } from "lucide-react";

interface ProcessingDialogProps {
  isOpen: boolean;
  repoName: string;
  progress: {
    label: string;
    value: number;
  };
  onOpenChange: (open: boolean) => void;
}

export function ProcessingDialog({
  isOpen,
  onOpenChange,
  repoName,
  progress,
}: ProcessingDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#1a1f1a] border-white/10">
        <DialogTitle hidden />
        <div className="flex flex-col items-center justify-center gap-6 py-8">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#CCFF00]/20 blur-xl" />
            <div className="relative bg-[#1a1f1a] rounded-full p-4 border border-[#CCFF00]/20">
              <LoadingSpinner className="w-12 h-12" />
            </div>
          </div>

          <div className="space-y-2 text-center">
            <h2 className="text-xl font-semibold text-white">
              Processing Repository
            </h2>
            <div className="flex items-center justify-center gap-2 text-white/70">
              <GitBranch className="w-4 h-4" />
              <span className="text-sm font-medium">{repoName}</span>
            </div>
          </div>

          <div className="w-full max-w-sm space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Code2 className="w-4 h-4 text-[#CCFF00]" />
                <span>{progress.label}...</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#CCFF00]/50 rounded-full animate-pulse"
                  style={{ width: `${progress.value}%` }}
                />
              </div>
            </div>
          </div>

          <p className="text-sm text-white/50">
            This may take a few minutes depending on the repository size
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
