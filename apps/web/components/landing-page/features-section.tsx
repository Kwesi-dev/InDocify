"use client";

import { motion } from "motion/react";
import { Bot, Github, RefreshCw, Palette, FileCode, Users } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Documentation",
    description:
      "Let InDocify's advanced AI analyze your codebase and generate clean, detailed, and developer-friendly documentation within minutes. Save countless hours and focus on building instead of explaining.",
  },
  {
    icon: Github,
    title: "Seamless GitHub Integration",
    description:
      "Easily connect your GitHub account to select repositories for documentation. InDocify supports both public and private repos, ensuring compatibility for personal projects and enterprise-level codebases.",
  },
  {
    icon: RefreshCw,
    title: "Real-Time Documentation Updates",
    description:
      "With GitHub webhook integration, InDocify automatically updates your documentation whenever there are code changes. Stay synchronized without any manual effort.",
  },
  {
    icon: Palette,
    title: "Customizable Templates",
    description:
      "Personalize your documentation with customizable templates tailored to match your team's preferences, coding standards, and branding.",
  },
  {
    icon: FileCode,
    title: "In-Repo Documentation",
    description:
      "Generate Markdown-based documentation directly into your code repository. Pro users can integrate docs into mono-repos or Next.js apps, making documentation part of the development workflow.",
  },
  {
    icon: Users,
    title: "Collaborative Tools",
    description:
      "Empower your team with live collaboration features. Review, edit, and approve documentation changes directly within InDocify, ensuring everyone is on the same page.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      className="bg-[#1a1f1a] py-24 relative overflow-hidden"
      id="features"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Features Built for Modern Teams
          </h2>
          <p className="text-white/70 text-xl max-w-2xl mx-auto">
            Everything you need to create, maintain, and share world-class
            documentation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors"
            >
              <feature.icon className="w-12 h-12 text-[#CCFF00] mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
