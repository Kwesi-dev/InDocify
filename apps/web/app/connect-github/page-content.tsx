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
import { generateDocs } from "../agents/new/actions";
import AnalysingRepoAnimation from "@/components/analysing-repo-animation";
import {
  MAX_SIZE_LIMIT_FOR_ENTERPRISE_PLAN,
  MAX_SIZE_LIMIT_FOR_FREE_PLAN,
  MAX_SIZE_LIMIT_FOR_PRO_PLAN,
} from "@/utils/data";
import { fetchAndProcessZipRepo } from "../agents/new/actions";
import { SizeLimitAlert } from "@/components/size-limit-alert";
import { useSupabaseClient } from "@/lib/SupabaseClientProvider";
import useRepoLimit from "@/hooks/useRepoLimit";
import { ProRepoLimitDialog } from "@/components/pro-repo-limit-dialog";
import { useSubscription } from "@/hooks/use-subscription";
import { ErrorAlert } from "@/components/error-alert";
import { OrganizationRepoDialog } from "@/components/organization-repo-dialog";

export default function PageContent() {
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
  const supabase = useSupabaseClient();
  const [sizeLimitExceeded, setSizeLimitExceeded] = useState({
    status: false,
    fileSize: 0,
    sizeLimit: 0,
  });
  const [showError, setShowError] = useState(false);
  const [errorDetails, setErrorDetails] = useState({
    title: "",
    description: "",
    showRetry: false,
  });
  const { updateRepoCounts, repoCounts: repoLimitData } = useRepoLimit();
  const [showLimitDialog, setShowLimitDialog] = useState(false);
  const { subscription, isSubscribed } = useSubscription();
  const [showOrgRepoDialog, setShowOrgRepoDialog] = useState(false);

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

  const handleRetry = () => {
    setShowError(false);
  };

  const handleRepoSubmit = async () => {
    if (repoLimitData?.isLimited || repoLimitData?.isProLimited) {
      setShowLimitDialog(true);
      return;
    }
    setIsAnalyzing(true);
    try {
      //get repo zip size
      const response = await fetch(
        `/api/repo/size?owner=${selectedRepo?.owner}&repo=${selectedRepo?.repo}`
      );
      const size = await response.json();
      if (!isSubscribed && size > MAX_SIZE_LIMIT_FOR_FREE_PLAN) {
        setSizeLimitExceeded({
          status: true,
          fileSize: size,
          sizeLimit: MAX_SIZE_LIMIT_FOR_FREE_PLAN,
        });
        setIsAnalyzing(false);
        return;
      } else if (
        isSubscribed &&
        subscription?.tier === "pro" &&
        size > MAX_SIZE_LIMIT_FOR_PRO_PLAN
      ) {
        setSizeLimitExceeded({
          status: true,
          fileSize: size,
          sizeLimit: MAX_SIZE_LIMIT_FOR_PRO_PLAN,
        });
        setIsAnalyzing(false);
        return;
      } else if (
        isSubscribed &&
        subscription?.tier === "enterprise" &&
        size > MAX_SIZE_LIMIT_FOR_ENTERPRISE_PLAN
      ) {
        setSizeLimitExceeded({
          status: true,
          fileSize: size,
          sizeLimit: MAX_SIZE_LIMIT_FOR_ENTERPRISE_PLAN,
        });
        setIsAnalyzing(false);
        return;
      } else {
        if (sizeLimitExceeded.status === true)
          setSizeLimitExceeded({
            status: false,
            fileSize: 0,
            sizeLimit: 0,
          });
      }

      if (!supabase) return;

      // Check if the current user has already imported this repo
      const { data: existingRepo } = await supabase
        .from("github_repos")
        .select("*")
        .eq("name", selectedRepo?.repo)
        .eq("email", session?.user?.email)
        .maybeSingle();

      if (existingRepo) {
        setIsAnalyzing(false);
        setErrorDetails({
          title: "Repository Already Exists",
          description:
            "You have already imported this repository. You can access it from your repository list.",
          showRetry: false,
        });
        setShowError(true);
        return;
      }

      setProgress(20);

      const data = await fetch(
        `/api/repo/metadata?owner=${selectedRepo?.owner}&repo=${selectedRepo?.repo}`
      );
      const metadata = await data.json();
      const isPrivate = metadata.metadata.visibility === "Private";
      const isOrgRepo = metadata.metadata.owner.type === "Organization";
      await updateRepoCounts(isPrivate);

      if (
        isOrgRepo &&
        (!isSubscribed || subscription?.tier !== "enterprise") &&
        isPrivate
      ) {
        setShowOrgRepoDialog(true);
        setIsAnalyzing(false);
        return;
      }

      // Check if repo files and docs already exist (imported by another user)
      const { data: existingFiles } = await supabase
        .from("github_files")
        .select("*")
        .eq("repo", selectedRepo?.repo)
        .eq("email", session?.user?.email)
        .maybeSingle();

      const { data: existingDocs } = await supabase
        .from("github_docs")
        .select("*")
        .eq("repo", selectedRepo?.repo)
        .eq("email", session?.user?.email)
        .maybeSingle();

      let files;

      if (!existingFiles) {
        files = await fetchAndProcessZipRepo(
          selectedRepo?.owner as string,
          selectedRepo?.repo as string
        );

        //save files to database
        files?.map(async (file) => {
          if (!supabase) return;
          //save file to db
          await supabase.from("github_files").insert({
            path: file.path,
            content: file.content,
            repo: selectedRepo?.repo,
            owner: selectedRepo?.owner,
            email: session?.user?.email,
          });
        });
      }
      setProgress(40);

      setProgress(60);

      let docsRes;
      if (!existingDocs) {
        const _files = files || [];
        //find the readme file
        const readmeFile = files?.find(
          (file: any) =>
            file.path.includes("README.md") || file.path.includes("readme.md")
        ); //save the files to the database

        docsRes = await generateDocs(readmeFile?.content as string);

        setProgress(80);

        //save readme to database
        await supabase.from("github_docs").insert({
          owner: selectedRepo?.owner,
          repo: selectedRepo?.repo,
          readme: docsRes,
          email: session?.user?.email,
          metadata: JSON.stringify({
            ...metadata,
            totalFiles: _files?.length,
          }),
        });
      }

      setProgress(100);

      router.push(
        `/repo-talkroom?owner=${selectedRepo?.owner}&repo=${selectedRepo?.repo}`
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
      <SizeLimitAlert
        isOpen={sizeLimitExceeded.status}
        onClose={() =>
          setSizeLimitExceeded({ status: false, fileSize: 0, sizeLimit: 0 })
        }
        fileSize={sizeLimitExceeded.fileSize}
        sizeLimit={sizeLimitExceeded.sizeLimit}
      />
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
              Uncover how features are implemented in any repository.
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
                            {filteredRepos?.map(
                              (repo: Record<string, any>, index: number) => (
                                <motion.button
                                  key={repo.name + index}
                                  whileTap={{ scale: 0.99 }}
                                  onClick={() => {
                                    handleSelectRepo(
                                      repo.owner?.login ?? "",
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
                              )
                            )}
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
                    onClick={handleRepoSubmit}
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

          <p className="text-white/50 text-center">
            Need help?{" "}
            <Link href="/support" className="text-[#CCFF00] hover:underline">
              Contact support
            </Link>
          </p>
          <ProRepoLimitDialog
            isOpen={showLimitDialog}
            onClose={() => setShowLimitDialog(false)}
          />
          <OrganizationRepoDialog
            isOpen={showOrgRepoDialog}
            onClose={() => setShowOrgRepoDialog(false)}
          />
          <ErrorAlert
            isOpen={showError}
            onClose={() => setShowError(false)}
            onRetry={handleRetry}
            title={errorDetails.title}
            description={errorDetails.description}
            showRetry={errorDetails.showRetry}
          />
        </div>
      </div>
    </div>
  );
}
