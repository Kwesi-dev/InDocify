"use client";

import { useState, useEffect, useCallback } from "react";
import { GeneratingAnimation } from "./generating-animation";
import { DocumentationPage } from "./documentation-section";
import { generateGetStartedDocs } from "@/app/agents/new/actions";
import { useSearchParams } from "next/navigation";
import { useSupabaseClient } from "@/lib/SupabaseClientProvider";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

interface DocumentationContainerProps {
  title: string;
}

export function DocumentationContainer({ title }: DocumentationContainerProps) {
  const [isGenerating, setIsGenerating] = useState(true);
  const [documentation, setDocumentation] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const repoName = searchParams.get("repo") as string;
  const docsTitle = searchParams.get("doc") as string;
  const supabase = useSupabaseClient();
  const { data: session } = useSession();

  const { data, isLoading } = useQuery({
    enabled: !!repoName && !!session?.user?.email && !!docsTitle,
    queryKey: ["github_docs", session?.user?.email, repoName, documentation],
    queryFn: async () => {
      if (!supabase) return null;
      const { data, error } = await supabase
        .from("github_docs")
        .select("get_started")
        .eq("email", session?.user?.email)
        .eq("repo", repoName)
        .single();
      if (error) {
        throw error;
        console.log("error", error);
      }

      setIsGenerating(false);
      return data?.get_started;
    },
  });

  const fetchDocumentation = useCallback(async () => {
    setIsGenerating(true);
    const response = await generateGetStartedDocs(repoName);
    setDocumentation(response);
    setIsGenerating(false);
    //save the text to the database
    if (!supabase) return;
    await supabase.from("github_docs").upsert(
      {
        get_started: response,
        repo: repoName,
        email: session?.user?.email as string,
      },
      { onConflict: "email, repo" }
    );
  }, [repoName, session?.user?.email, supabase]);

  useEffect(() => {
    if (!data && !documentation && !isLoading) {
      fetchDocumentation();
    }
  }, [data, documentation, fetchDocumentation, isLoading]);

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {isGenerating ? (
        <GeneratingAnimation />
      ) : documentation || data ? (
        <DocumentationPage title={title} content={data ?? documentation} />
      ) : null}
    </div>
  );
}
