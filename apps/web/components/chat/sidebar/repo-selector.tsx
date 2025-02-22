"use client";

import { GitFork, Search, Check } from "lucide-react";
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
import { extractOwnerAndRepo } from "@/utils";
import { ProcessingDialog } from "../processing-dialog";
import { RepoActions } from "./repo-actions";
import {
  MAX_SIZE_LIMIT_FOR_FREE_PLAN,
  MAX_SIZE_LIMIT_FOR_PRO_PLAN,
} from "@/utils/data";
import { SizeLimitAlert } from "@/components/size-limit-alert";
import { fetchAndProcessZipRepo, generateDocs } from "@/app/agents/new/actions";
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
  const [activeRepo, setActiveRepo] = useState<Repo | null>(null);
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [sizeLimitExceeded, setSizeLimitExceeded] = useState({
    status: false,
    fileSize: 0,
    sizeLimit: 0,
  });
  const { data: session } = useSession();
  const supabase = useSupabaseClient();
  const [progress, setProgress] = useState({
    label: "",
    value: 0,
  });
  const { addQueryString } = useCreateQueryString();
  const shallowRoute = useShallowRouter();
  const sub = "pro";
  const user = sub === "pro" ? "pro" : "free";

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
    if (activeRepo) {
      let shouldProcess = false;
      let repoOwner = "";
      let repoName = "";

      if (!activeRepo.url) {
        if (supabase) {
          const { data } = await supabase
            .from("github_docs")
            .select("id")
            .eq("repo", activeRepo.name)
            .eq("email", session?.user?.email)
            .single();
          if (data?.id) {
            shallowRoute(`/repo-talkroom?repo=${activeRepo.name}`);
            return;
          } else {
            shouldProcess = true;
            repoName = activeRepo.name;
          }
        }
      } else {
        const { owner, repo } = extractOwnerAndRepo(activeRepo.url as string);
        if (supabase) {
          const { data } = await supabase
            .from("github_docs")
            .select("id")
            .eq("owner", owner)
            .eq("repo", repo)
            .eq("email", session?.user?.email)
            .single();
          if (data?.id) {
            shallowRoute(`/repo-talkroom?owner=${owner}&repo=${repo}`);
            return;
          } else {
            shouldProcess = true;
            repoOwner = owner;
            repoName = repo;
          }
        }
      }

      if (shouldProcess) {
        setProcessing(true);
        setProgress({
          label: "Confirming repository size",
          value: 0,
        });
        try {
          const response = await fetch(
            `/api/repo/size?owner=${repoOwner}&repo=${repoName}`
          );
          const size = await response.json();
          if (user === "free" && size > MAX_SIZE_LIMIT_FOR_FREE_PLAN) {
            setSizeLimitExceeded({
              status: true,
              fileSize: size,
              sizeLimit: MAX_SIZE_LIMIT_FOR_FREE_PLAN,
            });
            setProcessing(false);
            return;
          } else if (user === "pro" && size > MAX_SIZE_LIMIT_FOR_PRO_PLAN) {
            setSizeLimitExceeded({
              status: true,
              fileSize: size,
              sizeLimit: MAX_SIZE_LIMIT_FOR_PRO_PLAN,
            });
            setProcessing(false);
            return;
          } else {
            if (sizeLimitExceeded.status === true)
              setSizeLimitExceeded({
                status: false,
                fileSize: 0,
                sizeLimit: 0,
              });
          }
          setProgress({
            label: "Extracting repository files",
            value: 10,
          });

          const files = await fetchAndProcessZipRepo(repoOwner, repoName);
          //save the files to supabase
          files?.map(async (file) => {
            if (!supabase) return;
            //save file to db
            await supabase.from("github_files").insert({
              path: file.path,
              content: file.content,
              repo: repoName,
              owner: repoOwner,
              email: session?.user?.email as string,
            });
          });
          setProgress({
            label: "Extracting repository metadata",
            value: 50,
          });
          const data = await fetch(
            `/api/repo/metadata?owner=${repoOwner}&repo=${repoName}`
          );
          const metadata = await data.json();

          setProgress({
            label: "Extracting repository readme",
            value: 75,
          });
          //find the readme file
          const readmeFile = files?.find(
            (file: any) =>
              file.path.includes("README.md") || file.path.includes("readme.md")
          );
          //save the files to the database
          const docsRes = await generateDocs(readmeFile?.content as string);

          setProgress({
            label: "Generating readmedocumentation",
            value: 75,
          });

          //save readme to database
          if (supabase) {
            await supabase.from("github_docs").insert({
              owner: repoOwner,
              repo: repoName,
              readme: docsRes,
              email: session?.user?.email,
              metadata: JSON.stringify({
                ...metadata,
                totalFiles: files?.length,
              }),
            });
          }

          setProgress({
            label: "Finalizing and preparing repository for repoTalk",
            value: 100,
          });
          addQueryString({
            repo: repoName,
            owner: repoOwner,
          });
          setProcessing(false);
        } catch (error) {
          console.error("Error processing repository:", error);
          setProcessing(false);
        }
      }
    }
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
                        setActiveRepo(repo);
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
                    />
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </PopoverContent>
      </Popover>
      {processing ? (
        <ProcessingDialog
          isOpen={processing}
          onOpenChange={setProcessing}
          repoName={activeRepo?.name as string}
          progress={progress}
        />
      ) : null}
      {sizeLimitExceeded.status ? (
        <SizeLimitAlert
          isOpen={sizeLimitExceeded.status}
          onClose={() =>
            setSizeLimitExceeded({ status: false, fileSize: 0, sizeLimit: 0 })
          }
          fileSize={sizeLimitExceeded.fileSize}
          sizeLimit={sizeLimitExceeded.sizeLimit}
          buttonText="Try Another Repository"
        />
      ) : null}
    </>
  );
}
