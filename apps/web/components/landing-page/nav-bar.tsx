"use client";

import { Logo } from "@workspace/ui/components/Logo";
import Link from "next/link";

export function NavBar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo />
          <Link href="/" className="text-[#CCFF00] text-2xl font-medium">
            inDocify
          </Link>
        </div>

        <div className="flex items-center gap-8">
          <Link
            href="/features"
            className="text-white/90 hover:text-white transition-colors"
          >
            FEATURES
          </Link>
          <Link
            href="/pricing"
            className="text-white/90 hover:text-white transition-colors"
          >
            PRICING
          </Link>
          <Link
            href="/docs"
            className="text-white/90 hover:text-white transition-colors"
          >
            DOCS
          </Link>
          <Link
            href="/demo"
            className="bg-[#CCFF00] text-black px-6 py-2 rounded-full hover:bg-[#CCFF00]/90 transition-colors"
          >
            REQUEST A DEMO
          </Link>
        </div>
      </div>
    </nav>
  );
}
