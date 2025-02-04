import { Loader2, MessageSquare, Pencil, Trash2 } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import useShallowRouter from "@/hooks/useShallowRouter";
import { usePathname, useSearchParams } from "next/navigation";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "@workspace/ui/components/context-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@workspace/ui/components/alert-dialog";
import { useOptimistic, useRef, useState, useTransition } from "react";
import { Input } from "@workspace/ui/components/input";
import { deleteThread, renameThread } from "@/app/actions";
import { toast } from "@workspace/ui/hooks/use-toast";
import { useSupabaseClient } from "@/lib/SupabaseClientProvider";

const truncateTitle = (title: string) => {
  return title.slice(0, 20) + "...";
};

export function RecentChats({ repo }: { repo: string }) {
  const supabase = useSupabaseClient();
  const { data: session } = useSession();

  const { data: threads, isLoading } = useQuery({
    enabled: !!repo,
    queryKey: ["threads", session?.user?.email, repo],
    queryFn: async () => {
      if (!supabase) return null;
      const { data, error } = await supabase
        .from("threads")
        .select("thread_id,repo,owner,title")
        .eq("email", session?.user?.email)
        .eq("repo", repo)
        .order("updated_at", { ascending: false });

      if (error) {
        throw error;
      }
      return data || [];
    },
  });

  return (
    <>
      <div className="space-y-1">
        {isLoading ? (
          <div className="w-full flex items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-[#CCFF00]" />
          </div>
        ) : (
          <>
            {threads &&
              threads?.map((chat) => (
                <Thread
                  key={chat.thread_id}
                  chat={chat}
                  email={session?.user?.email as string}
                  repo={repo}
                />
              ))}
            {threads?.length === 0 ||
              (!threads && (
                <div className="text-sm text-white/50 pl-12 mt-10">
                  No recent chats
                </div>
              ))}
          </>
        )}
      </div>
    </>
  );
}

const Thread = ({
  chat,
  email,
  repo,
}: {
  chat: {
    thread_id: string;
    repo: string;
    owner: string;
    title: string;
  };
  email: string;
  repo: string;
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newName, setNewName] = useState(chat.title);
  const [optimisticName, setOptimisticName] = useOptimistic(chat.title);
  const [isLoading, startTransition] = useTransition();
  const queryParams = useSearchParams();
  const [isRenaming, setIsRenaming] = useState<{
    threadId: string | null;
    state: boolean;
  }>({
    threadId: null,
    state: false,
  });
  const shallowRoute = useShallowRouter();
  const currentThreadId = usePathname().split("/")[2] as string;
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateName();
      setIsRenaming({ threadId: null, state: false });
    }
  };

  const updateName = async () => {
    startTransition(async () => {
      setOptimisticName(newName);
      const data = await renameThread(chat.thread_id, newName);
      if (data) {
        setNewName(data.title);
      } else {
        return;
      }
    });
  };

  const handleDeleteThread = async () => {
    await deleteThread(chat.thread_id);
    setIsDeleteDialogOpen(false);
    queryClient.invalidateQueries({
      queryKey: ["threads", email, repo],
    });
    //remove thread id from navbar
    const queries = new URLSearchParams(queryParams);
    shallowRoute(`/repo-talkroom?${queries.toString()}`);
    toast({
      title: "Thread deleted",
      description: "Your thread has been deleted successfully",
    });
  };

  return (
    <>
      <ContextMenu key={chat.thread_id}>
        <ContextMenuTrigger
          asChild
          className={isLoading ? "opacity-50 cursor-not-allowed" : ""}
        >
          {isRenaming.state && isRenaming.threadId === chat.thread_id ? (
            <Input
              ref={inputRef}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-white/5 border-white/10 text-white"
            />
          ) : (
            <Button
              key={chat.thread_id}
              variant="ghost"
              className={cn(
                "w-full items-center justify-start text-sm font-normal",
                "text-white/70 hover:text-white hover:bg-white/5",
                currentThreadId === chat.thread_id && "bg-white/10"
              )}
              onClick={() => {
                shallowRoute(
                  `/repo-talkroom/${chat.thread_id}?repo=${chat.repo}&owner=${chat.owner}`
                );
              }}
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <p className="truncate">{truncateTitle(optimisticName)}</p>
            </Button>
          )}
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            onClick={() =>
              setIsRenaming({ threadId: chat.thread_id, state: true })
            }
            className="flex items-center gap-2 text-white cursor-pointer"
          >
            <Pencil className="w-4 h-4 text-[#CCFF00]" />
            Rename
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem
            onClick={() => setIsDeleteDialogOpen(true)}
            className="flex items-center gap-2 text-red-400 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="bg-[#1a1f1a] border border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Are you sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              chat thread and remove all of its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 border-none">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteThread}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
