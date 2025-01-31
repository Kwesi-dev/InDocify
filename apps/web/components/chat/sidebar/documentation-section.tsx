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
    title: "Architecture Overview",
    description: "System design and component structure",
    icon: FileText,
  },
  {
    id: "3",
    title: "Development Guidelines",
    description: "Coding standards and best practices",
    icon: FileText,
  },
  {
    id: "4",
    title: "API Documentation",
    description: "API endpoints and usage examples",
    icon: FileText,
  },
  {
    id: "5",
    title: "Deployment Guide",
    description: "Build and deployment procedures",
    icon: FileText,
  },
];

export default function DocumentationSection({
  isCollapsed = false,
}: DocumentationSectionProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "text-white/70 hover:text-white hover:bg-white/5 w-full p-0 hover:pl-1",
            isCollapsed ? "justify-center" : "justify-start"
          )}
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
        className="w-[300px] p-0"
        align={isCollapsed ? "start" : "center"}
      >
        <ScrollArea className="h-[300px]">
          <div className="p-2">
            {docs.map((doc) => (
              <Button
                key={doc.id}
                variant="ghost"
                className="w-full justify-start gap-2 text-left"
              >
                <doc.icon className="w-4 h-4 shrink-0" />
                <div className="flex-1 truncate">
                  <div className="font-medium">{doc.title}</div>
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
