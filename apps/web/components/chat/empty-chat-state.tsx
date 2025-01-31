"use client";

import { motion } from "motion/react";
import { MessagesSquare, Code2, GitBranch, Sparkles } from "lucide-react";

interface EmptyChatStateProps {
  repoName: string;
}

export function EmptyChatState({ repoName }: EmptyChatStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto p-6 text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8"
      >
        {/* Animated circles in the background */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-[#CCFF00]/20"
              initial={{ width: "100px", height: "100px" }}
              animate={{
                width: ["100px", "140px"],
                height: ["100px", "140px"],
                opacity: [0.3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.6,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Central icon */}
        <div className="relative z-10 w-20 h-20 rounded-2xl bg-[#CCFF00]/10 border border-[#CCFF00]/20 flex items-center justify-center">
          <MessagesSquare className="w-10 h-10 text-[#CCFF00]" />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-3xl font-bold text-white mb-4">
          Welcome to <span className="text-[#CCFF00]">{repoName}</span> RepoTalk
        </h1>
        <p className="text-lg text-white/70 mb-8">
          Your AI-powered guide to understanding and contributing to this
          codebase with confidence.
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mb-8"
      >
        {[
          {
            icon: Code2,
            title: "Explore the Code",
            description: "Ask about specific files, functions, or patterns",
          },
          {
            icon: GitBranch,
            title: "Understand Flow",
            description: "Learn how different parts of the codebase connect",
          },
          {
            icon: Sparkles,
            title: "Get Context",
            description: "Discover best practices and implementation details",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <div className="flex flex-col items-center text-center gap-2">
              <div className="p-2 rounded-lg bg-[#CCFF00]/10">
                <item.icon className="w-6 h-6 text-[#CCFF00]" />
              </div>
              <h3 className="font-medium text-white">{item.title}</h3>
              <p className="text-sm text-white/50">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-white/50 text-sm"
      >
        Try asking about architecture, dependencies, or how to implement new
        features
      </motion.div>
    </div>
  );
}
