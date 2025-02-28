"use client";

import AnalysingRepoAnimation from "@/components/analysing-repo-animation";
import { useSearchParams } from "next/navigation";
import { fetchAndProcessZipRepo, generateDocs } from "../agents/new/actions";
import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@/lib/SupabaseClientProvider";
import useRepoLimit from "@/hooks/useRepoLimit";
import { useSubscription } from "@/hooks/use-subscription";
import { RepoLimitDialog } from "@/components/repo-limit-dialog";
import { ProRepoLimitDialog } from "@/components/pro-repo-limit-dialog";

const PageContent = () => {
  const searchParams = useSearchParams();
  const nextRepoUrl = searchParams.get("next-repo-url");
  const repo = searchParams.get("repo") as string;
  const owner = searchParams.get("owner") as string;
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const supabase = useSupabaseClient();
  const { data: session } = useSession();
  const { updateRepoCounts, repoCounts: repoLimitData } = useRepoLimit();
  const { isSubscribed } = useSubscription();
  const [showLimitDialog, setShowLimitDialog] = useState(false);
  const [showProLimitDialog, setShowProLimitDialog] = useState(false);

  const prepareRepoForExtraction = useCallback(async () => {
    // Check repository limits
    if (!isSubscribed && repoLimitData?.isLimited) {
      setShowLimitDialog(true);
      return;
    }

    // For pro users, check private repo limit
    const isPrivateRepo = nextRepoUrl?.includes('private=true');
    if (isSubscribed && isPrivateRepo && repoLimitData?.isProLimited) {
      setShowProLimitDialog(true);
      return;
    }
    let files: { path: string; content: string }[] = [];
    try {
      if (nextRepoUrl?.includes("zip-file")) {
        const file_id = nextRepoUrl.split("-")[2];
        if (!supabase) return;
        const { data, error } = await supabase
          .from("standby_files")
          .select("content")
          .eq("file_id", file_id)
          .single();
        if (error) {
          return;
        }
        files = data?.content as typeof files;
      } else {
        files = (await fetchAndProcessZipRepo(owner, repo)) as typeof files;
      }

      setProgress(25);
      //map through files and prepare them for saving to db
      if (!files) {
        //alet the user of the error
        return;
      }

      files.map(async (file) => {
        if (!supabase) return;
        //save file to db
        await supabase.from("github_files").insert({
          path: file.path,
          content: file.content,
          repo: repo,
          owner: owner,
          email: session?.user?.email as string,
        });
      });
      setProgress(50);

      let metadata: Record<string, any> = {};
      if (owner) {
        const data = await fetch(
          `/api/repo/metadata?owner=${owner}&repo=${repo}`
        );
        metadata = await data.json();
        // Update repo counts based on visibility
        const isPrivate = metadata.metadata.visibility === "Private";
        await updateRepoCounts(isPrivate);
      } else {
        // For uploaded zip files, count as public repos
        await updateRepoCounts(false);
      }

      const readmeFile = files?.find(
        (file: any) =>
          file.path.includes("README.md") || file.path.includes("readme.md")
      );
      setProgress(75);

      const docsRes = await generateDocs(readmeFile?.content as string);

      if (!supabase) return;

      if (owner) {
        await supabase.from("github_docs").insert({
          owner: owner,
          repo: repo,
          readme: docsRes,
          email: session?.user?.email,
          metadata: {
            ...metadata,
            totalFiles: files?.length,
          },
        });
      } else {
        await supabase.from("github_docs").insert({
          repo: repo,
          readme: docsRes,
          email: session?.user?.email,
          metadata: JSON.stringify({
            ...metadata,
            totalFiles: files?.length,
          }),
        });
      }

      setProgress(100);
      const path = owner
        ? `/repo-talkroom?owner=${owner}&repo=${repo}`
        : `/repo-talkroom?repo=${repo}`;
      router.push(path);
    } catch (error) {
      console.log(error);
    }
  }, [
    isSubscribed,
    nextRepoUrl,
    owner,
    repo,
    repoLimitData?.isLimited,
    router,
    session?.user?.email,
    supabase,
    updateRepoCounts,
  ]);

  useEffect(() => {
    prepareRepoForExtraction();
  }, [prepareRepoForExtraction]);

  return (
    <>
      <RepoLimitDialog
        isOpen={showLimitDialog}
        onClose={() => setShowLimitDialog(false)}
      />
      <ProRepoLimitDialog
        isOpen={showProLimitDialog}
        onClose={() => setShowProLimitDialog(false)}
      />
      <AnalysingRepoAnimation
        progress={progress}
        stepsType={nextRepoUrl?.includes("zip-file") ? "zipSteps" : "urlSteps"}
      />
    </>
  );
};

export default PageContent;
