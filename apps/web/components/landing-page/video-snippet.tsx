"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Play, Pause, Expand } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

export function VideoSnippet() {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    const video = document.getElementById("demo-video") as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
    }
  };

  const openFullscreen = () => {
    const video = document.getElementById("demo-video") as HTMLVideoElement;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="w-full max-w-4xl mx-auto mt-12 rounded-xl overflow-hidden shadow-lg"
    >
      <div className="relative">
        <video
          id="demo-video"
          className="w-full"
          controls={false}
          poster="/placeholder.svg?height=720&width=1280"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-[#CCFF00] transition-colors"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause className="w-12 h-12" />
            ) : (
              <Play className="w-12 h-12" />
            )}
          </Button>
        </div>
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-[#CCFF00] transition-colors"
            onClick={openFullscreen}
          >
            <Expand className="w-6 h-6" />
          </Button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-white">
          How inDocify Works
        </h3>
        <p className="text-sm text-white">
          Watch this quick demo to see how inDocify can revolutionize your
          documentation process.
        </p>
      </div>
    </motion.div>
  );
}
