"use client";

import {
  GitFork,
  GitBranch,
  FileText,
  Users,
  Calendar,
  Globe,
  Clock,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import { Button } from "@workspace/ui/components/button";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { Separator } from "@workspace/ui/components/separator";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";

interface RepoDetailsProps {
  repo: {
    name: string;
    description: string;
    stats: Record<string, any>;
    overview: string;
  };
}

function convertDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

//convert this date to like this 2024-11-15T23:24:55Z to 2 hours ago or 1 day ago or 1 week ago or 1 month ago or 1 year ago
function convertTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 24) {
    return `${hours} hours ago`;
  } else if (hours < 24 * 7) {
    return `${Math.floor(hours / 24)} days ago`;
  } else if (hours < 24 * 30) {
    return `${Math.floor(hours / (24 * 7))} weeks ago`;
  } else if (hours < 24 * 30 * 12) {
    return `${Math.floor(hours / (24 * 30))} months ago`;
  } else {
    return `${Math.floor(hours / (24 * 30 * 12))} years ago`;
  }
}

export default function RepoDetails({ repo }: RepoDetailsProps) {
  const [dateCreated, setDateCreated] = useState("");
  const [dateUpdated, setDateUpdated] = useState("");

  useEffect(() => {
    setDateCreated(convertDate(repo.stats.metadata.created));
  }, [repo.stats.metadata.created]);

  useEffect(() => {
    setDateUpdated(convertTime(repo.stats.metadata.lastUpdated));
  }, [repo.stats.metadata.lastUpdated]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="text-white/50">
          View details
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[600px] bg-[#1a1f1a] border-l border-white/10">
        <SheetDescription hidden />
        <SheetHeader>
          <SheetTitle className="text-white flex items-center gap-2">
            <GitFork className="h-5 w-5 text-[#CCFF00]" />
            {repo.name}
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-full pr-4">
          <div className="space-y-6 py-6">
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown>{repo?.overview}</ReactMarkdown>
            </div>
            <Separator className="bg-white/10" />

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-white/50">Files</div>
                <div className="text-lg font-medium text-white flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#CCFF00]" />
                  {repo?.stats?.totalFiles || 0}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-white/50">Commits</div>
                <div className="text-lg font-medium text-white flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#CCFF00]" />
                  {repo?.stats?.commits || 0}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-white/50">Branches</div>
                <div className="text-lg font-medium text-white flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-[#CCFF00]" />
                  {repo?.stats?.branches || 0}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-white/50">Contributors</div>
                <div className="text-lg font-medium text-white flex items-center gap-2">
                  <Users className="h-4 w-4 text-[#CCFF00]" />
                  {repo?.stats?.contributors || 0}
                </div>
              </div>
            </div>

            <Separator className="bg-white/10" />

            {/* Additional details */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Globe className="h-4 w-4" />
                  Visibility
                </div>
                <span className="text-sm text-white capitalize">
                  {repo?.stats?.metadata?.visibility || "Public"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Calendar className="h-4 w-4" />
                  Created
                </div>
                <span className="text-sm text-white">{dateCreated}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Clock className="h-4 w-4" />
                  Last updated
                </div>
                <span className="text-sm text-white">{dateUpdated}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: "blue",
                    }}
                  />
                  Language
                </div>
                <span className="text-sm text-white">
                  {repo?.stats?.metadata?.language}
                </span>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
