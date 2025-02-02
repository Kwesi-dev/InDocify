import { GitFork, GitBranch, FileText } from "lucide-react";
import RepoDetails from "./repo-sheet";
import { useSupabase } from "@/hooks/useSupabase";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export function RepoHeader() {
  const supabase = useSupabase();
  const params = useSearchParams();
  const selectedRepo = params.get("repo");
  const owner = params.get("owner");

  const { data } = useQuery({
    enabled: !!selectedRepo && !!supabase,
    queryKey: ["repo", selectedRepo],
    queryFn: async () => {
      if (!supabase) return null;
      const { data, error } = await supabase
        .from("github_docs")
        .select("readme, metadata")
        .eq("owner", owner)
        .eq("repo", selectedRepo)
        .single();
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
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-[#CCFF00]/10 flex items-center justify-center">
              <GitFork className="h-4 w-4 text-[#CCFF00]" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">
                {selectedRepo}
              </h1>
              <p className="text-sm text-white/50">
                {repoStats?.metadata?.about}
              </p>
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
        </div>
      </div>
    </div>
  );
}
