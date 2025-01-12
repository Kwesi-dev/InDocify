"use client";

import Link from "next/link";
import { Github } from "lucide-react";
import IndocifyLogo from "@/components/indocify-logo";

export default function GenerateDocsPage() {
  return (
    <div className="min-h-screen bg-[#1a1f1a] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <div className="flex flex-col items-center mb-12">
          <IndocifyLogo />
          <h1 className="text-3xl font-bold text-white mb-2">
            Hello, Personal
          </h1>
          <p className="text-white/70">
            Let's set up your first documentation deployment
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 rounded-lg p-6">
            <h2 className="text-white text-lg font-semibold mb-2">
              1. Connect to GitHub
            </h2>
            <p className="text-white/70 mb-4">
              To get started, connect your GitHub account
            </p>
            <button className="w-full bg-white text-black font-medium px-4 py-2 rounded-lg hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
              <Github className="w-5 h-5" />
              Connect GitHub Account
            </button>
          </div>

          <div className="bg-white/5 rounded-lg p-6">
            <h2 className="text-white text-lg font-semibold mb-2">
              2. Create documentation repo
            </h2>
            <p className="text-white/70">
              Your documentation content will be managed through this repo
            </p>
          </div>

          <div className="bg-white/5 rounded-lg p-6">
            <h2 className="text-white text-lg font-semibold mb-2">
              3. Make an update
            </h2>
            <p className="text-white/70">
              Clone the repo by running the following in your terminal
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <p className="text-white/50 text-sm">
            Need help?{" "}
            <Link href="/support" className="text-[#CCFF00] hover:underline">
              Contact support
            </Link>
          </p>
          <Link
            href="/pricing"
            className="text-[#CCFF00] text-sm hover:underline"
          >
            Upgrade to Pro for full documentation export and in-repo integration
          </Link>
        </div>
      </div>
    </div>
  );
}
