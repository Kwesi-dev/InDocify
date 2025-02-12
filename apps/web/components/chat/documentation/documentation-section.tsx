"use client";

import { motion } from "motion/react";
import { FileText } from "lucide-react";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { Separator } from "@workspace/ui/components/separator";
import { MemoizedMarkdown } from "@/lib/Markdown";

interface DocumentationPageProps {
  title: string;
  content: string | null;
}

export function DocumentationPage({ title, content }: DocumentationPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-6 py-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="h-12 w-12 rounded-xl bg-[#CCFF00]/10 flex items-center justify-center">
          <FileText className="h-6 w-6 text-[#CCFF00]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white capitalize">{title}</h1>
          <p className="text-white/70">
            Generated documentation based on your codebase
          </p>
        </div>
      </motion.div>

      <Separator className="bg-white/10 mb-8" />

      {/* Content */}
      <ScrollArea className="pr-4 h-[calc(100vh-150px)]">
        <div className="space-y-8 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <div className="prose prose-invert max-w-full w-full overflow-hidden text-white/90">
              <div className="w-full max-w-[750px] overflow-hidden break-words">
                <MemoizedMarkdown content={content || ""} id={title} />
              </div>
            </div>
          </motion.div>
        </div>
      </ScrollArea>
    </motion.div>
  );
}
