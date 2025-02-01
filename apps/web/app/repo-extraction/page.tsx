"use client";

import AnalysingRepoAnimation from "@/components/analysing-repo-animation";
import { useSearchParams } from "next/navigation";
import { fetchAndProcessZipRepo } from "../agents/new/actions";
import { useSupabase } from "@/hooks/useSupabase";
import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const nextRepoUrl = searchParams.get("next-repo-url");
  const repo = searchParams.get("repo") as string;
  const owner = searchParams.get("owner") as string;
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const supabase = useSupabase();
  const { data: session } = useSession();

  const prepareRepoForExtraction = useCallback(async () => {
    let files: { path: string; content: string }[] = [];
    try {
      //after 200 seconds set progress to 100
      setTimeout(() => {
        setProgress(25);
      }, 500);
      if (nextRepoUrl?.includes("zip-file")) {
        const file_id = nextRepoUrl.split("-")[2];
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

      setProgress(50);
      setTimeout(() => {
        setProgress(25);
      }, 500);
      //map through files and prepare them for saving to db
      if (!files) {
        //alet the user of the error
        return;
      }

      files.map(async (file) => {
        if (!supabase) return;
        //save file to db
        await supabase.from("github_files").upsert({
          path: file.path,
          content: file.content,
          repo: repo,
          owner: owner,
          githubAccessToken: session?.githubAccessToken as string,
          email: session?.user?.email as string,
        });
      });

      setProgress(100);
      const path = owner
        ? `/chat?owner=${owner}&repo=${repo}`
        : `/chat?repo=${repo}`;
      router.push(path);
    } catch (error) {
      console.log(error);
    }
  }, [
    nextRepoUrl,
    owner,
    repo,
    router,
    session?.githubAccessToken,
    session?.user?.email,
    supabase,
  ]);

  useEffect(() => {
    prepareRepoForExtraction();
  }, [prepareRepoForExtraction]);

  return (
    <AnalysingRepoAnimation
      progress={progress}
      stepsType={nextRepoUrl?.includes("zip-file") ? "zipSteps" : "urlSteps"}
    />
  );
};

export default Page;
