"use client";

import { motion } from "motion/react";

export function LoadingAnimation() {
  return (
    <div
      role="status"
      aria-label="Loading response"
      className="flex items-center justify-center py-8"
    >
      <div className="relative flex gap-2">
        {/* Central circle */}
        <motion.div
          className="w-4 h-4 rounded-full bg-[#CCFF00]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Orbiting dots */}
        {[...Array(8)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-2 h-2 rounded-full bg-[#CCFF00]"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
              rotate: 360,
              x: Math.cos((index * Math.PI * 2) / 8) * 20,
              y: Math.sin((index * Math.PI * 2) / 8) * 20,
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#CCFF00]"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}
