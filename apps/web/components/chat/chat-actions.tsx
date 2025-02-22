"use client";

import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog";
import { Button } from "@workspace/ui/components/button";
import { useSupabaseClient } from "@/lib/SupabaseClientProvider";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "@workspace/ui/hooks/use-toast";
import useShallowRouter from "@/hooks/useShallowRouter";

interface ChatActionsProps {
  threadId: string;
  repo: string;
  owner: string;
}

export function ChatActions({ threadId, repo, owner }: ChatActionsProps) {
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const shallowRoute = useShallowRouter();

  const handleDelete = async () => {
    try {
      if (!supabase) return;
      // Delete thread
      await supabase.from("threads").delete().match({
        thread_id: threadId,
        repo,
        owner,
        email: session?.user?.email,
      });

      // Invalidate queries to refresh UI
      queryClient.invalidateQueries({ queryKey: ["threads"] });

      // Navigate to repo talkroom
      shallowRoute(`/repo-talkroom?repo=${repo}&owner=${owner}`);

      toast({
        title: "Chat deleted",
        description: "Your chat has been deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting chat:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#1a1f1a] border border-white/10">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-white">
            <Trash2 className="w-5 h-5 text-red-400" />
            Delete Chat
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white/70">
            Are you sure you want to delete this chat? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-white/10 text-white hover:bg-white/20">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
