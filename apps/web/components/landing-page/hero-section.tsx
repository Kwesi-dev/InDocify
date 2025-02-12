"use client";

import AnimatedBackground from "./animated-background";
import { AnimatedStripes } from "./animated-stripes";
import { Sparkles } from "lucide-react";
import RepoExtractor from "./repo-extractor";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-[#1a1f1a] overflow-hidden">
      <AnimatedBackground />
      <AnimatedStripes />
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative mb-8 inline-block">
            <div className="absolute inset-0 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-[#CCFF00] via-purple-500 to-[#CCFF00] opacity-30 blur-xl" />
            </div>
            <div className="relative bg-white/5 backdrop-blur-sm px-6 py-2 rounded-full">
              <span className="text-white/90 text-xs md:text-sm">
                Code to Answers in Seconds
              </span>
              <span className="ml-2 text-[#CCFF00] text-xs md:text-sm">
                ✨ AI-Powered
              </span>
            </div>
          </div>

          <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            No More Digging Through
            <br />
            <span className="text-[#CCFF00]">Code, Just Ask</span>
          </h1>

          <p className="text-white/70 text-md  md:text-xl mb-12 max-w-lg md:max-w-2xl mx-auto">
            Navigate any repo, ask questions, and get AI-powered answers—no
            cloning needed, just instant insights.
          </p>

          <RepoExtractor />
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-2 text-white/90">
              <span>Join</span>
              <span className="text-[#CCFF00] font-bold">other</span>
              <span>developers using inDocify</span>
            </div>

            <div className="flex items-center justify-center gap-8">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-white/10 border-2 border-[#1a1f1a] flex items-center justify-center text-white/70 text-sm"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-[#CCFF00]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-white ml-2">4.9 / 5.0</span>
              </div>
            </div>

            <div className="text-white/50 text-sm">
              Next-level speed for understanding code.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
