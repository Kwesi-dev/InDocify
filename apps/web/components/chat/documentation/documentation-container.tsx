"use client";

import { GeneratingAnimation } from "./generating-animation";
import { DocumentationPage } from "./documentation-section";
import { useSearchParams } from "next/navigation";
import { useSupabaseClient } from "@/lib/SupabaseClientProvider";
import { useSession } from "next-auth/react";
import { useDocumentationStore } from "@/lib/stores";
import { useQuery } from "@tanstack/react-query";
import { getDocsColumnName } from "@/utils";

interface DocumentationContainerProps {
  title: string;
}

export function DocumentationContainer({
  title: docsTitle,
}: DocumentationContainerProps) {
  const { documentation, setDocumentation, isGenerating } =
    useDocumentationStore();
  const searchParams = useSearchParams();
  const repoName = searchParams.get("repo");
  const supabase = useSupabaseClient();
  const { data: session } = useSession();

  const { isLoading } = useQuery({
    enabled:
      !!repoName &&
      !!session?.user?.email &&
      !!docsTitle &&
      !!supabase &&
      !documentation &&
      !isGenerating,
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
      setDocumentation(
        data?.[column as keyof typeof data] as unknown as string
      );
      return data?.[column as keyof typeof data] as unknown as string;
    },
  });

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {isGenerating || isLoading || !documentation ? (
        <GeneratingAnimation />
      ) : documentation ? (
        <DocumentationPage title={docsTitle} content={documentation} />
      ) : null}
    </div>
  );
}
