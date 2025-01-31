"use client";

import AnimatedBackground from "./animated-background";
import { AnimatedStripes } from "./animated-stripes";
import { Sparkles } from "lucide-react";
import RepoExtractor from "./repo-extractor";

const exampleProjects = [
  {
    name: "Repository Analysis",
    description:
      "Quickly understand any repository with AI insights and structured data.",
  },
  {
    name: "Interactive Q&A",
    description:
      "Ask detailed questions about the codebase and get precise, contextual answers.",
  },
  {
    name: "Codebase Overview",
    description:
      "Generate a high-level summary of the repository for easy comprehension.",
  },
  {
    name: "Contributor Onboarding",
    description:
      "Streamline onboarding with tailored guides for new contributors.",
  },
];

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
              <span className="text-white/90">Code to Answers in Seconds</span>
              <span className="ml-2 text-[#CCFF00]">✨ AI-Powered</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Understand Any Repository
            <br />
            <span className="text-[#CCFF00]">with AI-Powered Insights.</span>
          </h1>

          <p className="text-white/70 text-xl mb-12 max-w-2xl mx-auto">
            Analyze, navigate, and ask questions about any codebase—your own or
            others’—with AI-powered insights and documentation.
          </p>

          <RepoExtractor />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {exampleProjects.map((project) => (
              <button
                key={project.name}
                className="bg-white/5 backdrop-blur-sm p-4 rounded-xl hover:bg-white/10 transition-all group"
              >
                <Sparkles className="w-6 h-6 text-[#CCFF00] mb-2" />
                <h3 className="text-white font-medium mb-1">{project.name}</h3>
                <p className="text-white/50 text-sm">{project.description}</p>
              </button>
            ))}
          </div>
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
              "Faster than anything I&apos;ve seen before&quot;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
