"use client";

import { scrollToSection } from "@/utils";
import { Logo } from "@workspace/ui/components/Logo";
import Link from "next/link";

export function NavBar({ authButtons }: { authButtons?: React.ReactNode }) {
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
            onClick={() => scrollToSection("pricing")}
            className="text-white/90 transition-colors cursor-pointer hover:text-[#CCFF00]"
          >
            PRICING
          </li>
          <li>{authButtons}</li>
          <li>
            <Link href="/demo">
              <button className="bg-[#CCFF00] text-black px-6 py-2 rounded-full hover:bg-[#CCFF00]/90 transition-colors">
                REQUEST A DEMO
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
