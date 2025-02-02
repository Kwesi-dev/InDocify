import { Loader2, MessageSquare } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { useSupabase } from "@/hooks/useSupabase";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import useShallowRouter from "@/hooks/useShallowRouter";
import { usePathname } from "next/navigation";

const truncateTitle = (title: string) => {
  return title.slice(0, 20) + "...";
};

export function RecentChats({ repo }: { repo: string }) {
  const supabase = useSupabase();
  const { data: session } = useSession();
  const shallowRoute = useShallowRouter();
  const currentThreadId = usePathname().split("/")[2] as string;

  const { data: threads, isLoading } = useQuery({
    enabled: !!repo,
    queryKey: ["threads", session?.user?.email, repo],
    queryFn: async () => {
      if (!supabase) return null;
      const { data, error } = await supabase
        .from("threads")
        .select("thread_id,repo,owner,messages,title")
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
    <div className="space-y-1">
      {isLoading ? (
        <div className="w-full flex items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-[#CCFF00]" />
        </div>
      ) : (
        <>
          {threads &&
            threads?.map((chat) => (
              <Button
                key={chat.thread_id}
                variant="ghost"
                className={cn(
                  "w-full items-center justify-start text-sm font-normal",
                  "text-white/70 hover:text-white hover:bg-white/5",
                  currentThreadId === chat.thread_id && "bg-white/10"
                )}
                disabled={chat.thread_id === currentThreadId}
                onClick={() => {
                  shallowRoute(
                    `/repo-talkroom/${chat.thread_id}?repo=${chat.repo}&owner=${chat.owner}`
                  );
                }}
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <p className="truncate">{truncateTitle(chat.title)}</p>
              </Button>
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
  );
}
