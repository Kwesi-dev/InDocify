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
import { useSearchParams } from "next/navigation";

interface RepoActionsProps {
  repoName: string;
  owner: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function RepoActions({ repoName, owner, setOpen }: RepoActionsProps) {
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const shallowRoute = useShallowRouter();
  const currentRepo = useSearchParams().get("repo");

  const handleDelete = async () => {
    setOpen(false);
    try {
      if (!supabase) return;
      // Delete repository files
      await supabase
        .from("github_files")
        .delete()
        .match({ repo: repoName, owner });

      // Delete repository docs
      await supabase
        .from("github_docs")
        .delete()
        .match({ repo: repoName, owner });

      // Delete repository
      await supabase
        .from("github_repos")
        .delete()
        .match({ name: repoName, owner, email: session?.user?.email });

      // Delete associated threads
      await supabase
        .from("threads")
        .delete()
        .match({ repo: repoName, owner, email: session?.user?.email });

      if (currentRepo === repoName) {
        shallowRoute(`/repo-talkroom`);
      }
      // Invalidate queries to refresh UI
      queryClient.invalidateQueries({
        queryKey: ["repos", session?.user?.email],
      });
      queryClient.invalidateQueries({
        queryKey: ["threads", session?.user?.email, repoName],
      });

      toast({
        title: "Repository deleted",
        description: "Your repository has been deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting repository:", error);
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
          <AlertDialogTitle className="text-white">
            Delete Repository
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this repository? This will also
            delete all associated chats and documentation. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
