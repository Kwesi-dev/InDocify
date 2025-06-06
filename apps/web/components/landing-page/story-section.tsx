"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";
import TitleTag from "./title-tag";

const timeline = [
  {
    title: "The Problem",
    description:
      "Finding how specific features are implemented in a repository is often time-consuming, requiring manual code exploration or cloning just to search through files.",
  },
  {
    title: "The Breakthrough",
    description:
      "InDocify eliminates this friction by providing an AI-powered platform that lets developers instantly search for feature implementations and get clear, real-time answers—without cloning or digging through code manually.",
  },
  {
    title: "The Transformation",
    description:
      "With InDocify, developers find feature implementations in seconds, reducing wasted time and enabling them to focus on learning, building, and innovating faster.",
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
            From Complexity to Clarity: How InDocify Helps You Instantly
            Understand Feature Implementations in GitHub Repositories.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto mb-16 hidden md:block">
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

        <div className="max-w-4xl mx-auto mb-16 px-4 block md:hidden">
          <div className="relative">
            {/* Timeline line - hidden on mobile, shown on md and up */}
            <div className="absolute left-[16px] md:left-1/2 md:-translate-x-1/2 h-full w-px bg-white/10" />

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  x: 0,
                }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative flex items-start md:items-center mb-12 ${
                  index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                }`}
              >
                {/* Timeline dot */}
                <div
                  className={`
                absolute left-0 md:left-1/2 w-8 h-8 
                transform md:-translate-x-1/2 
                flex items-center justify-center
                z-10
              `}
                >
                  <div className="w-4 h-4 bg-[#CCFF00] rounded-full" />
                </div>

                {/* Content container */}
                <div
                  className={`
                pl-12 md:pl-0 w-full md:w-[calc(50%-2rem)]
                ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}
                ${index % 2 === 0 ? "md:ml-0" : "md:ml-auto"}
              `}
                >
                  <div className="bg-white/5 rounded-xl p-6 relative group hover:bg-white/10 transition-all">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#CCFF00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-sm md:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
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
                Every developer has faced this challenge: searching for how a
                feature is implemented in a repository they find online, often
                spending hours manually digging through code.
              </p>

              <p>
                I’ve faced this myself. Across multiple repositories, I realized
                that finding specific feature implementations shouldn’t be a
                struggle. The process should be seamless and instant.
              </p>

              <blockquote className="border-l-4 border-[#CCFF00] pl-6 my-8 italic">
                “InDocify transforms how developers search for and understand
                feature implementations in any repository.”
              </blockquote>

              <p>
                Today, InDocify empowers developers with instant, AI-powered
                insights into repositories, helping them quickly find and
                understand how features are implemented—without cloning or
                manual exploration. Just search, ask, and get answers in real
                time.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
