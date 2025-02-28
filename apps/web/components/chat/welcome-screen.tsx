"use client";

import { GitFork, Upload, Github } from "lucide-react";
import { useSubscription } from "@/hooks/use-subscription";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useSupabaseClient } from "@/lib/SupabaseClientProvider";
import { Button } from "@workspace/ui/components/button";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { motion } from "motion/react";
import useShallowRouter from "@/hooks/useShallowRouter";
import Link from "next/link";
import { LoadingAnimation } from "./loading-animation";
import RepoExtractor from "../landing-page/repo-extractor";

type Repo = {
  name: string;
  description: string;
  url: string;
  owner: string;
};

export function WelcomeScreen() {
  const { data: session } = useSession();
  const { isSubscribed } = useSubscription();
  const supabase = useSupabaseClient();
  const shallowRoute = useShallowRouter();

  const { data: repos, isLoading } = useQuery({
    enabled: !!supabase && !!session,
    queryKey: ["repos", session?.user?.email],
    queryFn: async () => {
      if (!supabase) return [];
      const { data: savedRepos } = await supabase
        .from("github_repos")
        .select("name,description,url,owner")
        .eq("email", session?.user?.email);
      return savedRepos || [];
    },
  });

  const handleRepoClick = (repo: Repo) => {
    const queryParams = new URLSearchParams();
    queryParams.set("repo", repo.name);
    if (repo.owner) queryParams.set("owner", repo.owner);
    shallowRoute(`/repo-talkroom?${queryParams.toString()}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-8">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-12"
      >
        <GitFork className="w-16 h-16 text-[#CCFF00] mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to InDocify
        </h1>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          Your AI-powered companion for instantly understanding how features are
          implemented in any repository.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="flex items-center justify-center">
          <LoadingAnimation />
        </div>
      ) : (
        <>
          {repos && repos.length > 0 ? (
            <div className="w-full max-w-4xl">
              <h2 className="text-xl font-semibold text-white mb-6 text-center">
                Your Repositories
              </h2>
              <ScrollArea className="h-[60vh] px-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-4 p-5">
                  {repos.map((repo) => (
                    <motion.div
                      key={repo.name}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      whileHover={{ scale: 1.01 }}
                      className="bg-white/5 border border-white/10 rounded-lg p-6 cursor-pointer"
                      onClick={() => handleRepoClick(repo)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-white mb-2">
                            {repo.name}
                          </h3>
                          <p className="text-sm text-white/50 line-clamp-2">
                            {repo.description || "No description available"}
                          </p>
                        </div>
                        <GitFork className="w-5 h-5 text-[#CCFF00] shrink-0" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-white mb-6">
                Get Started with Your First Repository
              </h2>
              <div className="flex flex-col">
                <RepoExtractor className="w-[600px]" />
                <div className="flex items-center justify-center my-3">
                  <div className="h-px bg-white/10 flex-1" />
                  <span className="px-4 text-white/50 text-sm">OR</span>
                  <div className="h-px bg-white/10 flex-1" />
                </div>
                <Link href="/connect-github" className="contents">
                  <Button
                    size="lg"
                    className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 flex items-center gap-2"
                  >
                    <Github className="w-5 h-5" />
                    Connect GitHub
                  </Button>
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
