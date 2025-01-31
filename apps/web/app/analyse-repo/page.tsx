"use client";

import { signIn, useSession } from "next-auth/react";
import { useDeferredValue, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Github,
  Loader2,
  ChevronRight,
  Book,
  Code2,
  GitBranch,
  Search,
} from "lucide-react";
import Link from "next/link";
import IndocifyLogo from "@/components/indocify-logo";
import ParticlesAnimation from "@/components/particles-animation";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  analyzeJS,
  analyzePython,
  detectTechStack,
  fetchRepoFiles,
  generateDocs,
  processEmbeddings,
} from "../agents/new/actions";
import { useSupabase } from "@/hooks/useSupabase";
import AnalysingRepoAnimation from "@/components/analysing-repo-animation";

export default function SetupPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<{
    owner: string;
    repo: string;
    clone_url: string;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const searchQueryDebounced = useDeferredValue(searchQuery);
  const { data: session } = useSession();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const githubAccessToken = session?.githubAccessToken;
  const supabase = useSupabase();

  const { data: repos, isLoading: isLoadingRepos } = useQuery({
    enabled: !!githubAccessToken,
    queryKey: ["repos"],
    queryFn: async () => {
      const res = await fetch("/api/repo");
      const data = await res.json();
      if (!data) {
        return [];
      }
      return data;
    },
  });

  const handleConnectGithub = async () => {
    setIsLoading(true);
    if (githubAccessToken) {
      return;
    }
    signIn("github");
  };

  const handleSelectRepo = (owner: string, repo: string, clone_url: string) => {
    setSelectedRepo({ owner, repo, clone_url });
    setStep(3);
  };

  const handleGenerateDocs = async () => {
    setIsAnalyzing(true);
    try {
      const files = await fetchRepoFiles(
        selectedRepo?.owner as string,
        selectedRepo?.repo as string,
        githubAccessToken as string
      );

      setProgress(20);
      const techStack = await detectTechStack(files.filesWithContent);
      const data = await fetch(
        `/api/repo/metadata?owner=${selectedRepo?.owner}&repo=${selectedRepo?.repo}`
      );
      const metadata = await data.json();

      setProgress(40);
      const analysis =
        techStack.language.toLowerCase() === "javascript" ||
        techStack.language.toLowerCase() === "typescript"
          ? await analyzeJS(files.filesWithContent)
          : await analyzePython(files.filesWithContent);
      setProgress(60);
      //save analysis to supabase
      await supabase.from("github_files").upsert(
        [
          {
            owner: selectedRepo?.owner,
            repo: selectedRepo?.repo,
            github_access_token: githubAccessToken,
            repo_files: JSON.stringify(analysis),
          },
        ],
        {
          onConflict: "repo",
        }
      );
      setProgress(80);
      const docsRes = await generateDocs(
        analysis.readmeFile?.content as string
      );
      //save docs to supabase
      await supabase.from("github_docs").upsert(
        [
          {
            owner: selectedRepo?.owner,
            repo: selectedRepo?.repo,
            github_access_token: githubAccessToken,
            readme: docsRes,
            metadata: JSON.stringify({
              ...metadata,
              totalFiles: files.filesWithContent.length,
            }),
          },
        ],
        {
          onConflict: "repo",
        }
      );
      await processEmbeddings(
        files.filesWithContent,
        selectedRepo?.repo as string
      );
      setProgress(100);
      router.push(
        `/chat?owner=${selectedRepo?.owner}&repo=${selectedRepo?.repo}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const filteredRepos = repos?.filter(
    (repo: any) =>
      repo?.name?.toLowerCase()?.includes(searchQueryDebounced.toLowerCase()) ||
      repo?.description
        ?.toLowerCase()
        ?.includes(searchQueryDebounced.toLowerCase())
  );

  useEffect(() => {
    if (session?.githubAccessToken) {
      setStep(2);
    }
  }, [session?.githubAccessToken]);

  return (
    <div className="min-h-screen bg-[#1a1f1a] flex flex-col">
      {isAnalyzing ? <AnalysingRepoAnimation progress={progress} /> : null}
      {/* Animated Background */}
      <ParticlesAnimation />
      {/* Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-3xl space-y-8">
          <div className="text-center">
            <IndocifyLogo />
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white mb-4"
            >
              Your Code, Our Insights
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/70"
            >
              Understand your repo in just a few steps
            </motion.p>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {/* Step 1: Connect GitHub */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`bg-white/5 rounded-xl p-6 ${step === 1 ? "ring-2 ring-[#CCFF00]" : ""}`}
            >
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#CCFF00]/20 flex items-center justify-center text-[#CCFF00]">
                  1
                </span>
                Connect to GitHub
              </h2>
              <p className="text-white/70 mb-6">
                To get started, connect your GitHub account
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConnectGithub}
                disabled={isLoading || step !== 1}
                className="w-full bg-white text-black font-medium px-6 py-3 rounded-lg hover:bg-white/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Github className="w-5 h-5" />
                    Connect GitHub Account
                  </>
                )}
              </motion.button>
            </motion.div>

            {/* Step 2: Select Repo */}
            <AnimatePresence>
              {step >= 2 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`bg-white/5 rounded-xl p-6 ${step === 2 ? "ring-2 ring-[#CCFF00]" : ""}`}
                >
                  <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-[#CCFF00]/20 flex items-center justify-center text-[#CCFF00]">
                      2
                    </span>
                    Select a repo
                  </h2>
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                    <input
                      type="text"
                      placeholder="Search repositories..."
                      value={searchQueryDebounced}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#CCFF00] focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-hide overflow-x-hidden">
                    {isLoadingRepos ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="w-5 h-5 animate-spin" />
                      </div>
                    ) : (
                      <>
                        {filteredRepos?.length === 0 ? (
                          <div className="flex items-center justify-center">
                            <p className="text-white/50 text-sm">
                              No repositories found
                            </p>
                          </div>
                        ) : (
                          <>
                            {filteredRepos?.map((repo: any) => (
                              <motion.button
                                key={repo.id}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => {
                                  handleSelectRepo(
                                    repo.owner.login,
                                    repo.name,
                                    repo.clone_url
                                  );
                                }}
                                className="w-full bg-white/5 hover:bg-white/10 rounded-lg p-4 text-left transition-colors"
                              >
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h3 className="text-white font-medium flex items-center gap-2">
                                      <Code2 className="w-4 h-4 text-[#CCFF00]" />
                                      {repo.name}
                                    </h3>
                                    <p className="text-white/50 text-sm mt-1">
                                      {repo.description}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2 text-white/50 text-sm">
                                    <span className="flex items-center gap-1">
                                      <GitBranch className="w-4 h-4" />
                                      {repo.language}
                                    </span>
                                  </div>
                                </div>
                              </motion.button>
                            ))}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 3: Generate Docs */}
            <AnimatePresence>
              {step >= 3 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`bg-white/5 rounded-xl p-6 ${step === 3 ? "ring-2 ring-[#CCFF00]" : ""}`}
                >
                  <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-[#CCFF00]/20 flex items-center justify-center text-[#CCFF00]">
                      3
                    </span>
                    Analyze Repository
                  </h2>
                  <p className="text-white/70 mb-6">
                    Ready to analyze and understand {selectedRepo?.repo} with
                    AI-powered insights?
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGenerateDocs}
                    className="w-full bg-[#CCFF00] text-black px-6 py-3 rounded-lg hover:bg-[#CCFF00]/90 transition-colors flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Book className="w-5 h-5" />
                        Analyze Repository
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="text-center space-y-4">
            <p className="text-white/50">
              Need help?{" "}
              <Link href="/support" className="text-[#CCFF00] hover:underline">
                Contact support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
