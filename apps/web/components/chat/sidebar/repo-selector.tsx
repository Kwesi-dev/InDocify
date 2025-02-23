"use client";

import { GitFork, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { cn } from "@workspace/ui/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { RepoActions } from "./repo-actions";
import { useSession } from "next-auth/react";
import useCreateQueryString from "@/hooks/useCreateQueryString";
import useShallowRouter from "@/hooks/useShallowRouter";
import { useSupabaseClient } from "@/lib/SupabaseClientProvider";

export type Repo = {
  name: string;
  description: string;
  url: string;
  owner?: string;
};
interface RepoSelectorProps {
  selectedRepo: string | null;
  isCollapsed?: boolean;
}

export function RepoSelector({
  selectedRepo,
  isCollapsed = false,
}: RepoSelectorProps) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const supabase = useSupabaseClient();

  useCreateQueryString();
  const shallowRoute = useShallowRouter();

  const { data: repos, isLoading } = useQuery({
    enabled: !!supabase,
    queryKey: ["repos", session?.user?.email],
    queryFn: async () => {
      let repos: Repo[] = [];
      if (supabase) {
        const { data: savedRepos } = await supabase
          .from("github_repos")
          .select("name,description,url,owner")
          .eq("email", session?.user?.email);
        if (savedRepos) {
          repos = savedRepos;
        }
      }
      return repos ?? [];
    },
  });

  const filteredRepos =
    repos && !isLoading
      ? repos
          .filter((repo: any) =>
            repo.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((repo: any) => {
            return {
              name: repo.name,
              description: repo.description,
              url: repo.html_url,
              owner: repo.owner,
            };
          })
      : [];

  const handleRepoSelect = async (activeRepo: Repo) => {
    const queryParams = new URLSearchParams();
    queryParams.set("repo", activeRepo.name);
    if (activeRepo.owner) queryParams.set("owner", activeRepo.owner);
    shallowRoute(`/repo-talkroom?${queryParams.toString()}`);
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "text-white/70 hover:text-white hover:bg-white/5 w-full p-0 hover:pl-2",
              isCollapsed ? "justify-center" : "justify-start"
            )}
          >
            <div
              className={`flex items-center ${isCollapsed ? "gap-0" : "gap-2"}`}
            >
              <GitFork className="w-4 h-4" />
              {!isCollapsed ? "Repositories" : ""}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[300px] p-0 bg-[#232723] border border-white/10"
          align={isCollapsed ? "start" : "center"}
        >
          <div className="p-3 border-b border-white/10">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search repositories..."
                className="text-white pl-8 border border-white/10 active:border-white/40 focus:ring-0 focus:border-white/40"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="h-[250px]">
            {filteredRepos?.length === 0 ? (
              <div className="p-2 text-white/30 text-center">
                No repositories found.
              </div>
            ) : (
              <div className="p-2">
                {filteredRepos.map((repo: Repo) => (
                  <div className="flex items-center space-x-1" key={repo.name}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-2 text-left hover:bg-white/5",
                        selectedRepo === repo.name && "bg-white/10"
                      )}
                      disabled={selectedRepo === repo.name}
                      onClick={() => {
                        handleRepoSelect(repo);
                        setOpen(false);
                      }}
                    >
                      <GitFork className="w-4 h-4 shrink-0 text-white/50" />
                      <div className="flex-1 truncate">
                        <div className="font-medium text-white/50">
                          {repo.name}
                        </div>
                        <div className="text-xs text-white/30 truncate">
                          {repo.description
                            ? repo.description?.substring(0, 30) + "..."
                            : "no description"}
                        </div>
                      </div>
                    </Button>
                    <RepoActions
                      repoName={repo.name}
                      owner={repo.owner as string}
                      setOpen={setOpen}
                    />
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </>
  );
}
