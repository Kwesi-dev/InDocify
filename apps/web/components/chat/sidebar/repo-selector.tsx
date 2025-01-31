"use client";

import { GitFork, Search, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { cn } from "@workspace/ui/lib/utils";

interface RepoSelectorProps {
  selectedRepo: string | null;
  onSelectRepo: (repo: string) => void;
  isCollapsed?: boolean;
}

// Mock data - replace with actual repo data
const repos = [
  { id: "1", name: "inDocify-web", description: "Main web application" },
  { id: "2", name: "inDocify-api", description: "Backend API service" },
  { id: "3", name: "inDocify-docs", description: "Documentation site" },
  { id: "4", name: "inDocify-cli", description: "Command line interface" },
  { id: "5", name: "inDocify-sdk", description: "Software development kit" },
];

export function RepoSelector({
  selectedRepo,
  onSelectRepo,
  isCollapsed = false,
}: RepoSelectorProps) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "text-white/70 hover:text-white hover:bg-white/5 w-full p-0 hover:pl-1",
            isCollapsed ? "justify-center" : "justify-start"
          )}
        >
          <div
            className={`flex items-center ${isCollapsed ? "gap-0" : "gap-2"}`}
          >
            <GitFork className="w-4 h-4" />
            {!isCollapsed ? "Repositories" : ""}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[300px] p-0"
        align={isCollapsed ? "start" : "center"}
      >
        <div className="p-3 border-b border-border">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search repositories..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <ScrollArea className="h-[300px]">
          <div className="p-2">
            {filteredRepos.map((repo) => (
              <Button
                key={repo.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2 text-left",
                  selectedRepo === repo.id && "bg-accent"
                )}
                onClick={() => {
                  onSelectRepo(repo.id);
                  setOpen(false);
                }}
              >
                <GitFork className="w-4 h-4 shrink-0" />
                <div className="flex-1 truncate">
                  <div className="font-medium">{repo.name}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {repo.description}
                  </div>
                </div>
                {selectedRepo === repo.id && (
                  <Check className="w-4 h-4 shrink-0" />
                )}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
