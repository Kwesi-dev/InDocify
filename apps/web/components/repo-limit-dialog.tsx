"use client";

import { motion, AnimatePresence } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { useRouter } from "next/navigation";

interface RepoLimitDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RepoLimitDialog({ isOpen, onClose }: RepoLimitDialogProps) {
  const router = useRouter();

  const handleUpgrade = () => {
    router.push("#pricing");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[425px] bg-[#1a1f1a] text-white border-white/10">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <span className="text-[#CCFF00]">Repository</span> Limit Reached
              </DialogTitle>
              <DialogDescription className="text-white/70">
                You've reached the free tier limit of 2 repositories. Upgrade to
                our Pro or Enterprise plan to import unlimited repositories!
              </DialogDescription>
            </DialogHeader>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="space-y-4"
            >
              <Button
                onClick={handleUpgrade}
                className="w-full bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90"
              >
                Upgrade Now
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                className="w-full border-white/10 text-white bg-white/5"
              >
                Maybe Later
              </Button>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
