"use client";

import { scrollToSection } from "@/utils";
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

        <ul className="flex items-center gap-8">
          <li
            onClick={() => scrollToSection("features")}
            className="text-white/90 hover:text-white transition-colors cursor-pointer"
          >
            FEATURES
          </li>
          <li
            onClick={() => scrollToSection("pricing")}
            className="text-white/90 hover:text-white transition-colors cursor-pointer"
          >
            PRICING
          </li>
          <li>
            <Link
              href="/docs"
              className="text-white/90 hover:text-white transition-colors cursor-pointer"
            >
              DOCS
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              className="bg-white/10 text-white px-6 py-2 rounded-full hover:bg-white/20 transition-colors font-medium"
            >
              LOGIN
            </Link>
          </li>
          <li>
            <Link
              href="/demo"
              className="bg-[#CCFF00] text-black px-6 py-2 rounded-full hover:bg-[#CCFF00]/90 transition-colors"
            >
              REQUEST A DEMO
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
