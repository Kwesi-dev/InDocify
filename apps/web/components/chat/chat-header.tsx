import { GitFork, GitBranch, FileText, RotateCw } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSupabaseClient } from "@/lib/SupabaseClientProvider";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { Button } from "@workspace/ui/components/button";
import { toast } from "@workspace/ui/hooks/use-toast";
import { useState } from "react";
import { useSubscription } from "@/hooks/use-subscription";

const RepoDetails = dynamic(() => import("./repo-sheet"), {
  ssr: false,
});

export function RepoHeader() {
  const supabase = useSupabaseClient();
  const params = useSearchParams();
  const selectedRepo = params.get("repo");
  const owner = params.get("owner");
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [isUpdating, setIsUpdating] = useState(false);
  const queryClient = useQueryClient();
  const { isSubscribed } = useSubscription();

  const { data } = useQuery({
    enabled: !!selectedRepo && !!supabase,
    queryKey: ["repo", selectedRepo],
    queryFn: async () => {
      if (!supabase) return null;
      const { data, error } = await supabase
        .from("github_docs")
        .select("readme, metadata")
        .eq("repo", selectedRepo)
        .eq("email", email)
        .maybeSingle();
      if (error) {
        throw error;
      }
      return data;
    },
  });
  const repoStats = JSON.parse(data?.metadata || "{}");
  return (
    <div className="border-b border-white/10">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-lg bg-[#CCFF00]/10 flex items-center justify-center shrink-0">
              <GitFork className="h-4 w-4 text-[#CCFF00]" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">
                {selectedRepo}
              </h1>
              {repoStats?.metadata?.about ? (
                <p className="text-sm text-white/50">
                  {repoStats?.metadata?.about.slice(0, 140) + "..."}
                </p>
              ) : null}
            </div>
          </div>
          <RepoDetails
            repo={{
              name: selectedRepo as string,
              description: repoStats?.metadata?.about,
              stats: repoStats,
              overview: data?.readme,
            }}
          />
        </div>
        <div className="mt-4 flex gap-4">
          <div className="flex items-center gap-2 text-sm text-white/50">
            <FileText className="h-4 w-4" />
            <span>{repoStats?.totalFiles ?? 0} files</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/50">
            <GitBranch className="h-4 w-4" />
            <span>{repoStats?.branches} branches</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/50">
            <div className="h-2 w-2 rounded-full bg-[#CCFF00]" />
            <span>{repoStats?.commits} commits</span>
          </div>
          {isSubscribed ? (
            <Button
              variant="ghost"
              size="sm"
              className="text-white/50 hover:text-white hover:bg-white/10 ml-auto"
              onClick={async () => {
                try {
                  if (!selectedRepo || !owner) return;
                  setIsUpdating(true);

                  const response = await fetch(
                    `/api/repo/pull-latest?owner=${owner}&repo=${selectedRepo}`
                  );
                  const result = await response.json();

                  if (!response.ok) {
                    throw new Error(
                      result.error || "Failed to pull latest changes"
                    );
                  }

                  if (result.noUpdates) {
                    toast({
                      title: "No Updates Available",
                      description: result.message,
                    });
                  } else {
                    await queryClient.invalidateQueries({
                      queryKey: ["repo", selectedRepo],
                    });
                    toast({
                      title: "Repository Updated",
                      description: "Successfully pulled the latest changes.",
                    });
                  }
                } catch (error) {
                  console.error("Error pulling latest changes:", error);
                  toast({
                    title: "Update Failed",
                    description:
                      "Failed to pull latest changes. Please try again.",
                    variant: "destructive",
                  });
                } finally {
                  setIsUpdating(false);
                }
              }}
              disabled={isUpdating}
            >
              <RotateCw
                className={`h-4 w-4 mr-2 ${isUpdating ? "animate-spin" : ""}`}
              />
              {isUpdating ? "Updating..." : "Pull Latest Changes"}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
