import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@workspace/ui/components/alert-dialog";
import { AlertCircle } from "lucide-react";

interface SizeLimitAlertProps {
  isOpen: boolean;
  onClose: () => void;
  fileSize: number;
  sizeLimit: number;
}

export function SizeLimitAlert({
  isOpen,
  onClose,
  fileSize,
  sizeLimit,
}: SizeLimitAlertProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-[#1a1f1a] border border-white/10">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-white">
            <AlertCircle className="w-5 h-5 text-red-400" />
            File Size Exceeds Limit
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white/70">
            Your repository size of {fileSize} MB exceeds our limit of{" "}
            {sizeLimit} MB. Please upload a smaller repository or contact
            support for larger repositories.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={onClose}
            className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90"
          >
            Try Another File
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
