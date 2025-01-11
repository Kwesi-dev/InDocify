"use client";

import Link from "next/link";
import { scrollToSection } from "@/utils";

const ActionsButton = () => {
  return (
    <div className="flex flex-wrap gap-4 mt-8">
      <button
        onClick={() => scrollToSection("pricing")}
        className="bg-[#CCFF00] text-black px-8 py-3 rounded-full hover:bg-[#CCFF00]/90 transition-colors font-medium"
      >
        Get Started
      </button>
      <Link
        href="/signup"
        className="bg-white/10 text-white px-8 py-3 rounded-full hover:bg-white/20 transition-colors font-medium"
      >
        Try Now
      </Link>
    </div>
  );
};

export default ActionsButton;
