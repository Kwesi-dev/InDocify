"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";

interface PrivateRepoAccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivateRepoAccessDialog({
  isOpen,
  onClose,
}: PrivateRepoAccessDialogProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleUpgrade = () => {
    if (pathname === "/") {
      router.push("#pricing");
    } else {
      router.push("/#pricing");
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#1a1f1a] text-white border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <span className="text-[#CCFF00]">Private Repository</span> Access
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Private repositories are only available on our Pro and Enterprise
            plans. Upgrade to access private repositories and unlock advanced
            features!
          </DialogDescription>
        </DialogHeader>
        <motion.div
          className="flex flex-col gap-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
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
  );
}
