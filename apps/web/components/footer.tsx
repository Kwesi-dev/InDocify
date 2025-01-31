"use client";

import Link from "next/link";
import { Twitter, Linkedin } from "lucide-react";
import { Logo } from "@workspace/ui/components/Logo";

export function Footer() {
  return (
    <footer className="bg-[#1a1f1a] border-t border-white/10 z-50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Logo />
              <Link href="/" className="text-[#CCFF00] text-2xl font-medium">
                inDocify
              </Link>
            </div>{" "}
            <p className="text-white/70">
              Understand Any Repository with AI-Powered Insights.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://twitter.com/indocify"
                className="text-white/70 hover:text-[#CCFF00]"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com/company/indocify"
                className="text-white/70 hover:text-[#CCFF00]"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/70 text-sm">
            © {new Date().getFullYear()} InDocify. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-white/70 hover:text-white text-sm"
            >
              Privacy
            </Link>

            <span className="text-white/30">•</span>
            <Link
              href="/contact"
              className="text-white/70 hover:text-white text-sm"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
