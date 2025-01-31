"use client";

import { motion } from "motion/react";
import { Users, Star, GitBranch, Clock } from "lucide-react";
import TitleTag from "./title-tag";

const metrics = [
  { value: "70%", label: "Faster Repository Onboarding" },
  { value: "90%", label: "Improved Repository Insights" },
  { value: "15hrs", label: "Hours Saved per Developer Monthly" },
];

const timeline = [
  {
    title: "The Problem",
    description:
      "Understanding complex repositories has always been a barrier for developers, especially when contributing to new projects or onboarding to unfamiliar codebases.",
  },
  {
    title: "The Breakthrough",
    description:
      "We created an AI-driven platform that analyzes any repository, answers questions in real-time, and provides clear, concise documentation to accelerate understanding.",
  },
  {
    title: "The Transformation",
    description:
      "Developers using InDocify spend 70% less time deciphering codebases and gain instant insights, empowering them to contribute effectively and innovate faster.",
  },
];

export default function StorySection() {
  return (
    <section className="bg-[#1a1f1a] py-24 relative overflow-hidden" id="story">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <TitleTag
            icon={<Star className="w-4 h-4 text-[#CCFF00]" />}
            title="Our Journey"
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            The Story Behind inDocify
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/70 text-xl max-w-2xl mx-auto"
          >
            From Complexity to Clarity: How InDocify Enhances Repository
            Understanding
          </motion.p>
        </div>

        {/* Metrics */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 rounded-xl p-6 text-center relative group hover:bg-white/10 transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#CCFF00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              <h3 className="text-4xl font-bold text-[#CCFF00] mb-2">
                {metric.value}
              </h3>
              <p className="text-white/70">{metric.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-white/10" />
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`w-1/2 flex ${index % 2 === 0 ? "justify-end pr-8" : "justify-start pl-8"}`}
                >
                  <div className="bg-white/5 rounded-xl p-6 max-w-sm relative group hover:bg-white/10 transition-all">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#CCFF00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                    <h3 className="text-xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/70">{item.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#CCFF00] rounded-full" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 rounded-xl p-8 md:p-12 relative group hover:bg-white/10 transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#CCFF00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
          <div className="max-w-3xl mx-auto relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Why I Built inDocify
            </h2>

            <div className="space-y-6 text-lg text-white/70">
              <p>
                Every developer knows the challenge: joining a new team or
                contributing to a project often means spending weeks trying to
                navigate the codebase. Documentation is frequently outdated,
                incomplete, or nonexistent. Developers waste valuable time
                deciphering code or seeking explanations instead of focusing on
                innovation.
              </p>

              <p>
                I’ve faced this myself. Across multiple projects, I realized
                that understanding a codebase shouldn’t be a struggle.
                Documentation should be a dynamic, accessible resource for every
                developer, no matter the repository.
              </p>

              <blockquote className="border-l-4 border-[#CCFF00] pl-6 my-8 italic">
                “InDocify isn’t just about documentation. It’s about
                transforming how developers explore, understand, and collaborate
                on codebases.”
              </blockquote>

              <p>
                Today, InDocify empowers developers by providing instant
                insights into any repository. My AI-powered platform analyzes
                code, generates real-time explanations, and produces
                comprehensive documentation that evolves with your projects.
                Whether onboarding to a new team or contributing to an
                open-source project, InDocify simplifies the process, saving
                time and enhancing collaboration.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
