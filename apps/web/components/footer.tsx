"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";
import { Logo } from "@workspace/ui/components/Logo";
import { scrollToSection } from "@/utils";

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
              Simplify documentation with AI-powered insights and seamless
              collaboration.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/indocify"
                className="text-white/70 hover:text-[#CCFF00]"
              >
                <Github className="h-5 w-5" />
              </Link>
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

          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li
                className="text-white/70 hover:text-white cursor-pointer"
                onClick={() => scrollToSection("features")}
              >
                Features
              </li>
              <li
                className="text-white/70 hover:text-white cursor-pointer"
                onClick={() => scrollToSection("pricing")}
              >
                Pricing
              </li>
              <li>
                <Link href="/docs" className="text-white/70 hover:text-white">
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/changelog"
                  className="text-white/70 hover:text-white"
                >
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white/70 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/70 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-white/70 hover:text-white"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/70 hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-white/70 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/70 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className="text-white/70 hover:text-white"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/70 text-sm">
            © {new Date().getFullYear()} InDocify. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/status"
              className="text-white/70 hover:text-white text-sm"
            >
              Status
            </Link>

            <span className="text-white/30">•</span>
            <Link
              href="/support"
              className="text-white/70 hover:text-white text-sm"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
