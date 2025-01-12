"use client";

import { scrollToSection } from "@/utils";

const GetStartedButton = () => {
  return (
    <button
      onClick={() => scrollToSection("pricing")}
      className="bg-[#CCFF00] text-black px-8 py-3 rounded-full hover:bg-[#CCFF00]/90 transition-colors font-medium"
    >
      Get Started
    </button>
  );
};

export default GetStartedButton;
