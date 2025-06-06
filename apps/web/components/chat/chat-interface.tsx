"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { Textarea } from "@workspace/ui/components/textarea";
import { cn } from "@workspace/ui/lib/utils";
import { Bot, User } from "@/components/icons";
import { LoadingAnimation } from "./loading-animation";
import { Message, useChat } from "ai/react";
import { usePathname, useSearchParams } from "next/navigation";
import { EmptyChatState } from "./empty-chat-state";
import { nanoid } from "@/utils";
import useShallowRouter from "@/hooks/useShallowRouter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useSupabaseClient } from "@/lib/SupabaseClientProvider";
import { MemoizedMarkdown } from "@/lib/Markdown";
import { QuestionLimitDialog } from "./question-limit-dialog";
import { ChatActions } from "./chat-actions";
import useQuestionLimit from "@/hooks/useQuestionLimit";
import { useSubscription } from "@/hooks/use-subscription";

export const maxDuration = 60;

const FREE_TIER_LIMIT = 10;

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
  const { questionCount, isLimited, updateQuestionCount } = useQuestionLimit();
  const { isSubscribed } = useSubscription();
  const [isQuestionCountDialogOpen, setIsQuestionCountDialogOpen] =
    useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
    error,
    reload,
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
    experimental_throttle: 50,
    onFinish: () => {
      query.invalidateQueries({
        queryKey: ["threads", session?.user?.email, repo],
      });
    },
    onError: (error) => {
      // console.error("Chat error:", error);
    },
  });

  useEffect(() => {
    if (!currentThread) {
      newThread.current = nanoid();
    }
  }, [currentThread]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { refetch } = useQuery({
    enabled: !!currentThread && !!repo && !!session && !isLoading,
    queryKey: ["messages", session?.user?.email, repo, currentThread],
    queryFn: async () => {
      if (!supabase) return null;
      try {
        const { data, error } = await supabase
          .from("threads")
          .select("messages")
          .eq("thread_id", currentThread)
          .eq("repo", repo)
          .eq("email", session?.user?.email)
          .maybeSingle();

        if (error) {
          setMessages([]);
          // console.error("Error fetching messages:", error);
          return [];
        }

        if (!data?.messages) {
          setMessages([]);
          return [];
        }

        const parsedMessages = JSON.parse(data.messages);
        setMessages(parsedMessages);
        return parsedMessages;
      } catch (error) {
        //console.error(error);
        return [];
      }
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: 2,
  });

  useEffect(() => {
    if (!currentThread) {
      setMessages([]);
    }
  }, [currentThread, setMessages]);

  useEffect(() => {
    if (session && repo && currentThread) {
      refetch();
    }
  }, [currentThread, refetch, repo, session]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector(
          "[data-radix-scroll-area-viewport]"
        );
        if (viewport) {
          viewport.scrollTop = viewport.scrollHeight;
        }
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [messages]);

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!currentThread) {
        shallowRoute(
          `/repo-talkroom/${newThread.current}?repo=${repo}&owner=${owner}`
        );
      }
      if (!isSubscribed) {
        if (isLimited || questionCount === FREE_TIER_LIMIT)
          return setIsQuestionCountDialogOpen(true);
        const currentCount = questionCount || 0;
        await updateQuestionCount(currentCount + 1);
      }
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {isQuestionCountDialogOpen ? (
        <QuestionLimitDialog
          isOpen={isQuestionCountDialogOpen}
          onClose={() => setIsQuestionCountDialogOpen(false)}
        />
      ) : null}
      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-[0.76] p-4">
        <div className="max-w-3xl mx-auto space-y-6 ">
          <div className="flex items-center justify-between">
            <AnimatePresence initial={false}>
              {messages.length === 0 && !isLoading ? (
                <EmptyChatState repoName={repo!} />
              ) : null}
            </AnimatePresence>
            {currentThread && messages.length > 0 && (
              <ChatActions
                threadId={currentThread}
                repo={repo!}
                owner={owner!}
              />
            )}
          </div>

          <Messages
            messages={messages}
            isLoading={isLoading}
            error={error}
            onRetry={reload}
          />
          {/* Typing Indicator */}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-white/10 p-4 flex-[0.24]">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!currentThread) {
              shallowRoute(
                `/repo-talkroom/${newThread.current}?repo=${repo}&owner=${owner}`
              );
            }
            // Only update question count for free tier users
            if (!isSubscribed) {
              if (isLimited || questionCount === FREE_TIER_LIMIT)
                return setIsQuestionCountDialogOpen(true);
              const currentCount = questionCount || 0;
              await updateQuestionCount(currentCount + 1);
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

const Messages = ({
  messages,
  isLoading,
  error,
  onRetry,
}: {
  messages: Message[];
  isLoading: boolean;
  error: Error | undefined;
  onRetry: () => void;
}) => {
  return (
    <div className="space-y-6">
      {messages.map((message, index) => {
        if (message.content === "") return null;

        return (
          <div
            key={`${message.id}-${index}`}
            className={cn(
              "flex items-start gap-4 rounded-lg p-4",
              message.role === "assistant" ? "bg-white/5" : ""
            )}
          >
            {/* Avatar */}
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                message.role === "assistant" ? "bg-[#CCFF00]" : "bg-white/10"
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
              <div className="prose prose-invert max-w-full w-full overflow-hidden text-white/90">
                <div className="w-full max-w-[650px] overflow-hidden break-words">
                  <MemoizedMarkdown
                    id={message.id}
                    content={message.content}
                    isLoading={isLoading}
                  />
                </div>
              </div>

              {/* Message Actions */}
            </div>
          </div>
        );
      })}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col items-center gap-4 rounded-lg p-4 bg-white/5"
          >
            <LoadingAnimation />
            <p className="text-sm text-white/50">AI Assistant is thinking...</p>
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col items-center gap-4 rounded-lg p-4 bg-red-500/10 border border-red-500/20"
          >
            <div className="text-red-400">
              {error.message === "timeout"
                ? "Request timed out. Please try again."
                : "An error occurred while processing your request."}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="flex items-center gap-2 bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
            >
              <Loader2 className="h-4 w-4" />
              Retry
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
