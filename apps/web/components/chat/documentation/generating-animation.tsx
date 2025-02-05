"use client";

import { motion } from "motion/react";
import { FileText, Code2, Sparkles } from "lucide-react";

export function GeneratingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <div className="relative">
        {/* Orbiting elements */}
        <div className="relative w-32 h-32">
          {[FileText, Code2, Sparkles].map((Icon, index) => (
            <motion.div
              key={index}
              className="absolute"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: index * 0.2,
              }}
              style={{
                transformOrigin: "center center",
              }}
            >
              <motion.div
                className="absolute"
                style={{
                  x: Math.cos((index * 2 * Math.PI) / 3) * 60,
                  y: Math.sin((index * 2 * Math.PI) / 3) * 60,
                }}
              >
                <Icon className="w-8 h-8 text-[#CCFF00]" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Center pulse */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-12 h-12 rounded-full bg-[#CCFF00]/20" />
        </motion.div>
      </div>

      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-white mb-3">
          Generating Documentation
        </h2>
        <p className="text-white/70">
          Analyzing codebase and creating comprehensive documentation...
        </p>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="w-64 h-1 bg-white/10 rounded-full mt-8 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          className="h-full bg-[#CCFF00]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        />
      </motion.div>
    </div>
  );
}
