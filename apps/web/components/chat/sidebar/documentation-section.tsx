"use client";

import { Book, FileText } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { cn } from "@workspace/ui/lib/utils";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDocumentationStore } from "@/lib/stores";
import useShallowRouter from "@/hooks/useShallowRouter";
import { useSupabaseClient } from "@/lib/SupabaseClientProvider";
import { useSession } from "next-auth/react";
import {
  generateDevelopmentGuidelines,
  generateGetStartedDocs,
} from "@/app/agents/new/actions";
import { getDocsColumnName } from "@/utils";

interface DocumentationSectionProps {
  isCollapsed?: boolean;
}

// Mock data - replace with actual documentation
const docs = [
  {
    id: "1",
    title: "Getting Started",
    description: "Project setup and initial configuration",
    icon: FileText,
  },
  {
    id: "2",
    title: "Development Guidelines",
    description: "Coding standards and best practices",
    icon: FileText,
  },
];

export default function DocumentationSection({
  isCollapsed = false,
}: DocumentationSectionProps) {
  const { setDocumentation, documentation, setIsGenerating } =
    useDocumentationStore();
  const [open, setOpen] = useState(false);
  const repo = useSearchParams().get("repo");
  const shallowRoute = useShallowRouter();
  const searchParams = useSearchParams();
  const repoName = searchParams.get("repo");
  const docsTitle = searchParams.get("doc") as string;
  const supabase = useSupabaseClient();
  const { data: session } = useSession();

  const fetchDocumentation = async (title: string) => {
    setOpen(false);
    setIsGenerating(true);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("doc", title);
    shallowRoute(`/repo-talkroom?${newSearchParams.toString()}`);
    if (documentation) {
      setDocumentation(null);
    }

    const column = getDocsColumnName(title);

    if (supabase) {
      const { data, error } = await supabase
        .from("github_docs")
        .select(column)
        .eq("email", session?.user?.email)
        .eq("repo", repoName)
        .single();

      if (data?.[column as keyof typeof data]) {
        setDocumentation(data?.[column as keyof typeof data]);
        setIsGenerating(false);
        return;
      }
      if (error) {
        console.log(error);
      }
    }
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
      // console.log(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "text-white/70 hover:text-white hover:bg-white/5 w-full p-0 hover:pl-1",
            isCollapsed ? "justify-center" : "justify-start"
          )}
          disabled={!repo}
        >
          <div
            className={`flex items-center ${isCollapsed ? "gap-0" : "gap-2"}`}
          >
            <Book className="w-4 h-4 shrink-0" />
            {!isCollapsed ? "Documentation" : ""}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[320px] px-2 bg-[#1a1f1a] border border-white/10"
        align={isCollapsed ? "start" : "center"}
      >
        <ScrollArea className="h-fit">
          <div className="p-2 space-y-4">
            {docs.map((doc) => (
              <Button
                key={doc.id}
                variant="ghost"
                className={`w-full justify-start gap-2 text-left hover:bg-white/5 ${
                  docsTitle === doc.title && "bg-white/5"
                }`}
                onClick={() => fetchDocumentation(doc.title)}
                disabled={docsTitle === doc.title}
              >
                <doc.icon className="w-4 h-4 shrink-0 text-white/50" />
                <div className="flex-1 truncate">
                  <div className="font-medium text-white/50">{doc.title}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {doc.description}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
