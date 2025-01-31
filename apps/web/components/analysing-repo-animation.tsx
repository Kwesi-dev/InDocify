"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, Code2, FileText, Check } from "lucide-react";

const steps = [
  {
    icon: Bot,
    text: "Connecting to your repository",
    detail: "Verifying your GitHub connection",
  },
  {
    icon: Code2,
    text: "Fetching repository details",
    detail: "Gathering information about your codebase",
  },
  {
    icon: FileText,
    text: "Analysing your files",
    detail: "Analyzing the structure and content of your codebase",
  },
  {
    icon: Check,
    text: "Almost ready",
    detail: "Preparing to redirect you to your inDocify chatroom",
  },
];

export default function AnalysingRepoAnimation({
  progress,
}: {
  progress: number;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [positions, setPositions] = useState<{ left: string; top: string }[]>(
    []
  );

  const CurrentIcon = steps[currentStep]?.icon;

  useEffect(() => {
    const newPositions = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
    setPositions(newPositions);
  }, []);

  useEffect(() => {
    const stepSize = 100 / steps.length;
    setCurrentStep(Math.floor(progress / stepSize));
  }, [progress]);

  return (
    <div className="min-h-screen bg-[#1a1f1a] flex items-center justify-center p-6 fixed inset-0 w-full z-50">
      <div className="w-full max-w-2xl">
        {/* Hexagon Grid Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full">
            {positions.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute w-24 h-24 border border-[#CCFF00]/10"
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

        {/* Main Content */}
        <div className="relative">
          {/* Progress Circle */}
          <div className="mb-12">
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#CCFF00"
                  strokeWidth="2"
                  opacity="0.1"
                />
                {/* Progress circle */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#CCFF00"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * progress) / 100}
                  transform="rotate(-90 50 50)"
                />
                {/* Current step icon */}
                <foreignObject x="25" y="25" width="50" height="50">
                  <div className="w-full h-full flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {CurrentIcon && (
                          <CurrentIcon className="w-8 h-8 text-[#CCFF00]" />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </foreignObject>
              </svg>

              {/* Percentage text */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-white/70 text-sm">
                {Math.round(progress)}
                {"%"}
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                    currentStep === index
                      ? "bg-[#CCFF00]/10"
                      : currentStep > index
                        ? "bg-white/5 opacity-50"
                        : "bg-white/5"
                  }`}
                  animate={
                    currentStep === index
                      ? {
                          scale: [1, 1.02, 1],
                          transition: { duration: 1, repeat: Infinity },
                        }
                      : {}
                  }
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5">
                    {currentStep > index ? (
                      <Check className="w-5 h-5 text-[#CCFF00]" />
                    ) : (
                      <StepIcon
                        className={`w-5 h-5 ${
                          currentStep === index
                            ? "text-[#CCFF00]"
                            : "text-white/50"
                        }`}
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{step.text}</h3>
                    <p className="text-white/50 text-sm">{step.detail}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Loading Messages */}
          <div className="mt-8 text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-white/70 text-sm"
              >
                {currentStep === 0 &&
                  "Using AI to understand your code structure..."}
                {currentStep === 1 &&
                  "Creating clear and concise documentation..."}
                {currentStep === 2 &&
                  "Adding finishing touches to your docs..."}
                {currentStep === 3 &&
                  "Get ready to explore your new documentation!"}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Particles */}
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
      </div>
    </div>
  );
}
