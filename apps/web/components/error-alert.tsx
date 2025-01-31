import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@workspace/ui/components/alert-dialog";
import { XCircle, RefreshCcw } from "lucide-react";

interface ErrorAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry?: () => void;
  title?: string;
  description?: string;
  showRetry?: boolean;
}

export function ErrorAlert({
  isOpen,
  onClose,
  onRetry,
  title = "An Error Occurred",
  description = "We encountered an error while processing your request. Please try again.",
  showRetry = true,
}: ErrorAlertProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-[#1a1f1a] border border-white/10">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-white">
            <XCircle className="w-5 h-5 text-red-400" />
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white/70">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-3">
          <AlertDialogAction
            onClick={onClose}
            className="bg-white/10 text-white hover:bg-white/20"
          >
            Close
          </AlertDialogAction>
          {showRetry && onRetry && (
            <AlertDialogAction
              onClick={() => {
                onRetry();
                onClose();
              }}
              className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 flex items-center gap-2"
            >
              <RefreshCcw className="w-4 h-4" />
              Try Again
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
