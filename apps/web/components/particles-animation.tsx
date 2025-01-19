"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const ParticlesAnimation = () => {
  const [positions, setPositions] = useState<{ left: string; top: string }[]>(
    []
  );

  useEffect(() => {
    const newPositions = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
    setPositions(newPositions);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 opacity-30">
        {positions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#CCFF00]"
            style={{
              left: pos.left,
              top: pos.top,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0">
        {positions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border border-[#CCFF00]/10"
            style={{
              left: pos.left,
              top: pos.top,
              rotate: 45,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ParticlesAnimation;
