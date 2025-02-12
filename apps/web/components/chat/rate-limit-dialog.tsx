"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { useSupabaseClient } from "@/lib/SupabaseClientProvider";
import { toast } from "@workspace/ui/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface RateLimitDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RateLimitDialog({ isOpen, onClose }: RateLimitDialogProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const supabase = useSupabaseClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (supabase) {
      await supabase.from("waitlist").insert({ email });
      setIsSubmitting(false);
      onClose();
      toast({
        title: "Success",
        description: "You have been added to the waitlist.",
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[425px] bg-[#1a1f1a] text-white border-white/10">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <span className="text-[#CCFF00]">Limit</span> Reached
              </DialogTitle>
              <DialogDescription className="text-white/70">
                You've reached the free usage limit. Join our waitlist for
                unlimited access!
              </DialogDescription>
            </DialogHeader>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-white/90"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder-white/50"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90"
                  disabled={isSubmitting || email === ""}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    "Join Waitlist"
                  )}
                </Button>
              </form>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
