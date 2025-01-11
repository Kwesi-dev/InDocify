"use client";

import Link from "next/link";
import { ChevronDown, Github } from "lucide-react";
import { useState } from "react";
import IndocifyLogo from "@/components/indocify-logo";

export default function TestPage() {
  const [showOAuth, setShowOAuth] = useState(false);

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
              1. Sign in with GitHub
            </h2>
            <p className="text-white/70 mb-4">
              To get started, log in with your GitHub account
            </p>
            <button className="w-full bg-white text-black font-medium px-4 py-2 rounded-lg hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
              <Github className="w-5 h-5" />
              Login with GitHub
            </button>
            <button
              onClick={() => setShowOAuth(!showOAuth)}
              className="text-white/50 text-sm mt-3 flex items-center gap-1 hover:text-white/70 transition-colors"
            >
              Don't want to authorize GitHub OAuth?
              <ChevronDown
                className={`w-4 h-4 transform transition-transform ${showOAuth ? "rotate-180" : ""}`}
              />
            </button>
            {showOAuth && (
              <div className="mt-3 text-white/70 text-sm">
                <p>
                  You can also use a personal access token with the following
                  scopes:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>repo</li>
                  <li>read:org</li>
                  <li>read:user</li>
                </ul>
              </div>
            )}
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
