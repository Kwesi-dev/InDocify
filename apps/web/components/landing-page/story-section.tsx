"use client";

import { motion } from "motion/react";
import { Users, Star, GitBranch, Clock } from "lucide-react";
import TitleTag from "./title-tag";

const metrics = [
  { value: "60%", label: "Reduced Onboarding Time" },
  { value: "85%", label: "Documentation Accuracy" },
  { value: "12hrs", label: "Saved Per Developer Monthly" },
];

const timeline = [
  {
    title: "The Challenge",
    description:
      "As codebases grew more complex, developers spent countless hours explaining and documenting code instead of building. We knew there had to be a better way.",
  },
  {
    title: "The Solution",
    description:
      "We built an AI-powered platform that automatically generates and maintains documentation, making it easy for teams to stay in sync and scale efficiently.",
  },
  {
    title: "The Impact",
    description:
      "Teams using inDocify have reduced onboarding time by 60% and spend more time building features instead of explaining code.",
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
            From frustration to innovation: How we're transforming technical
            documentation
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
            <div className="flex flex-wrap gap-8 mb-8">
              <div className="flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-[#CCFF00]" />
                <span className="text-white/70">Open Source First</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#CCFF00]" />
                <span className="text-white/70">Community Driven</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#CCFF00]" />
                <span className="text-white/70">Always Up-to-date</span>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Why We Built inDocify
            </h2>

            <div className="space-y-6 text-lg text-white/70">
              <p>
                Every developer knows the feeling: you join a new team, excited
                to contribute, but spend weeks trying to understand the
                codebase. The documentation is outdated, incomplete, or worse -
                non-existent. Senior developers spend precious time explaining
                the same concepts repeatedly instead of building new features.
              </p>

              <p>
                We experienced this firsthand across multiple companies and
                projects. That's when we realized: documentation shouldn't be a
                burden. It should be as dynamic and alive as the code itself.
              </p>

              <blockquote className="border-l-4 border-[#CCFF00] pl-6 my-8 italic">
                "We're not just building a documentation tool. We're
                transforming how teams understand and share knowledge about
                their code."
              </blockquote>

              <p>
                Today, InDocify is empowering growing teams to focus less on
                explaining and more on building. Our AI-powered platform is
                designed to generate comprehensive, context-aware documentation
                that stays in sync with your codebase. By simplifying onboarding
                and enhancing collaboration, we’re helping developers work
                smarter, not harder, as they scale their projects and teams.
              </p>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/demo"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 bg-[#CCFF00] text-black px-8 py-3 rounded-lg hover:bg-[#CCFF00]/90 transition-colors font-medium"
              >
                See it in Action
              </motion.a>
              <motion.a
                href="/about"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-3 rounded-lg hover:bg-white/20 transition-colors"
              >
                Learn More
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
