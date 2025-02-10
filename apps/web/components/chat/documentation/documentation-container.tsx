"use client";

import { useCallback, useEffect } from "react";
import { GeneratingAnimation } from "./generating-animation";
import { DocumentationPage } from "./documentation-section";
import {
  generateDevelopmentGuidelines,
  generateGetStartedDocs,
} from "@/app/agents/new/actions";
import { useSearchParams } from "next/navigation";
import { useSupabaseClient } from "@/lib/SupabaseClientProvider";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useDocumentationStore } from "@/lib/stores";

interface DocumentationContainerProps {
  title: string;
}

const getDocsColumnName = (title: string) => {
  switch (title) {
    case "Getting Started":
      return "get_started";
    case "Development Guidelines":
      return "development_guidelines";
    default:
      return "get_started";
  }
};

export function DocumentationContainer({
  title: docsTitle,
}: DocumentationContainerProps) {
  const { documentation, isGenerating, setDocumentation, setIsGenerating } =
    useDocumentationStore();
  const searchParams = useSearchParams();
  const repoName = searchParams.get("repo");
  const supabase = useSupabaseClient();
  const { data: session } = useSession();

  const { data, isLoading } = useQuery({
    enabled:
      !!repoName && !!session?.user?.email && !!docsTitle && !documentation,
    queryKey: ["github_docs", session?.user?.email, repoName, documentation],
    queryFn: async () => {
      if (!supabase) return null;
      const column = getDocsColumnName(docsTitle);
      const { data, error } = await supabase
        .from("github_docs")
        .select(column)
        .eq("email", session?.user?.email)
        .eq("repo", repoName)
        .single();

      if (error) {
        console.log(error);
      }

      setIsGenerating(false);
      return data?.[column as keyof typeof data] as unknown as string;
    },
  });

  const fetchDocumentation = useCallback(async () => {
    if (documentation || data || isGenerating) return;
    setIsGenerating(true);
    const column = getDocsColumnName(docsTitle);
    const agent =
      column === "get_started"
        ? generateGetStartedDocs
        : column === "development_guidelines"
          ? generateDevelopmentGuidelines
          : null;
    if (!agent) return;
    try {
      const response = await agent(repoName as string);
      setDocumentation(response);
      //save the text to the database
      if (!supabase) return;
      await supabase.from("github_docs").upsert(
        {
          [column]: response,
          repo: repoName,
          email: session?.user?.email as string,
        },
        { onConflict: "email, repo" }
      );
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsGenerating(false);
    }
  }, [
    documentation,
    data,
    isGenerating,
    setIsGenerating,
    docsTitle,
    repoName,
    setDocumentation,
    supabase,
    session?.user?.email,
  ]);

  useEffect(() => {
    let mounted = true;
    const initFetch = async () => {
      if (mounted && (!documentation || !data) && !isGenerating) {
        await fetchDocumentation();
      }
    };
    initFetch();
    return () => {
      mounted = false;
    };
  }, [documentation, isGenerating, fetchDocumentation, data]);

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {isGenerating ? (
        <GeneratingAnimation />
      ) : documentation ? (
        <DocumentationPage title={docsTitle} content={data ?? documentation} />
      ) : null}
    </div>
  );
}
