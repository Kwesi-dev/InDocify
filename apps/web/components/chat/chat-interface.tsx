"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Copy, Check, Loader2 } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { Textarea } from "@workspace/ui/components/textarea";
import { cn } from "@workspace/ui/lib/utils";
import { Bot, User } from "@/components/icons";
import { LoadingAnimation } from "./loading-animation";
import { Message, useChat } from "ai/react";
import ReactMarkdown from "react-markdown";
import { usePathname, useSearchParams } from "next/navigation";
import { EmptyChatState } from "./empty-chat-state";
import { nanoid } from "@/utils";
import useShallowRouter from "@/hooks/useShallowRouter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useSupabaseClient } from "@/lib/SupabaseClientProvider";

export function ChatInterface() {
  const params = useSearchParams();
  const repo = params.get("repo");
  const owner = params.get("owner");
  const currentThread = usePathname().split("/")[2];
  const newThread = useRef<string | null>(!currentThread ? nanoid() : null);
  const shallowRoute = useShallowRouter();
  const { data: session } = useSession();
  const supabase = useSupabaseClient();
  const query = useQueryClient();

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat({
    maxSteps: 3,
    api: "/api/chat",
    experimental_prepareRequestBody: ({
      messages,
    }: {
      messages: Message[];
    }) => ({
      messages: messages as any[],
      repo,
      currentThread: currentThread ?? newThread.current,
      owner,
    }),
    onFinish: () => {
      query.invalidateQueries({
        queryKey: ["threads", session?.user?.email, repo],
      });
    },
  });

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const _ = useQuery({
    enabled: !!currentThread && !!repo,
    queryKey: ["messages", session?.user?.email, repo, currentThread],
    queryFn: async () => {
      if (!supabase) return null;
      const { data, error } = await supabase
        .from("threads")
        .select("messages")
        .eq("thread_id", currentThread)
        .eq("repo", repo)
        .eq("email", session?.user?.email)
        .single();
      if (error) {
        console.log(error);
      }
      setMessages(JSON.parse(data?.messages || "[]"));
      return data?.messages || [];
    },
  });

  useEffect(() => {
    if (!currentThread) {
      setMessages([]);
    }
  }, [currentThread, setMessages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!currentThread) {
        shallowRoute(
          `/repo-talkroom/${newThread.current}?repo=${repo}&owner=${owner}`
        );
      }
      handleSubmit(e);
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-[0.85] p-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <AnimatePresence initial={false}>
            {messages.length === 0 ? <EmptyChatState repoName={repo!} /> : null}

            {messages.map((message) => {
              if (message.content === "") return null;
              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "flex items-start gap-4 rounded-lg p-4",
                    message.role === "assistant" ? "bg-white/5" : ""
                  )}
                >
                  {/* Avatar */}
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                      message.role === "assistant"
                        ? "bg-[#CCFF00]"
                        : "bg-white/10"
                    )}
                  >
                    {message.role === "assistant" ? (
                      <Bot className="w-5 h-5 text-black" />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>

                  {/* Message Content */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/50">
                        {message.role === "assistant" ? "AI Assistant" : "You"}
                      </span>
                    </div>

                    <div className="prose prose-invert max-w-none text-white/90 text-wrap">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>

                    {/* Message Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white/50 hover:text-white"
                        onClick={() =>
                          copyToClipboard(message.content, message.id)
                        }
                      >
                        {copiedId === message.id ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex flex-col items-center gap-4 rounded-lg p-4 bg-white/5"
              >
                <LoadingAnimation />
                <p className="text-sm text-white/50">
                  AI Assistant is thinking...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-white/10 p-4">
        <form
          onSubmit={(e) => {
            if (!currentThread) {
              shallowRoute(
                `/repo-talkroom/${newThread.current}?repo=${repo}&owner=${owner}`
              );
            }
            handleSubmit(e);
          }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask about your codebase..."
              className="min-h-[60px] w-full bg-white/5 border border-white/10 rounded-lg pl-4 pr-12 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#CCFF00] focus:border-[#CCFF00]/50 resize-none"
              rows={1}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90"
              disabled={!input.trim() || isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
