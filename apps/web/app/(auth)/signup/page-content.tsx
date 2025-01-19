"use client";

import Link from "next/link";
import { useState } from "react";
import { Bot, Zap, GitBranch } from "lucide-react";
import IndocifyLogo from "@/components/indocify-logo";
import GoogleIcon from "@/components/google-icon";
import { googleSignIn, sendgridSignIn } from "@/app/actions";
// import ParticlesAnimation from "@/components/particles-animation";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Documentation",
    description:
      "Let our AI analyze your codebase and generate comprehensive documentation in minutes",
  },
  {
    icon: Zap,
    title: "Instant Setup",
    description:
      "Connect your GitHub repository and get started with documentation in under 5 minutes",
  },
  {
    icon: GitBranch,
    title: "Auto-Sync Updates",
    description:
      "Documentation stays in sync with your code through automatic updates and webhooks",
  },
];

export default function SignupPageContent() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendgridSignIn(email);
  };

  return (
    <div className="min-h-screen bg-[#1a1f1a] flex flex-col">
      {/* <ParticlesAnimation /> */}
      <div className="flex-1 flex">
        {/* Left Column - Form */}
        <div className="w-full lg:w-1/2 flex flex-col p-8 lg:p-12 xl:p-16">
          <IndocifyLogo />

          <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Get Started with inDocify
              </h1>
              <p className="text-white/70">
                Already have an account?{" "}
                <Link href="/login" className="text-[#CCFF00] hover:underline">
                  Sign in
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#CCFF00] focus:border-transparent"
                  placeholder="name@email.com"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#CCFF00] text-black px-6 py-3 rounded-lg hover:bg-[#CCFF00]/90 transition-colors font-medium"
              >
                Continue
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#1a1f1a] text-white/50">OR</span>
                </div>
              </div>

              <button
                type="button"
                className="w-full bg-white/5 border border-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                onClick={async () => {
                  await googleSignIn();
                }}
              >
                <GoogleIcon />
                Continue with Google
              </button>
            </form>

            <p className="mt-6 text-sm text-white/50 text-center">
              By signing up, you agree to our{" "}
              <Link href="/terms" className="text-[#CCFF00] hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[#CCFF00] hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>

        {/* Right Column - Features */}
        <div className="hidden lg:flex w-1/2 bg-white/5 flex-col p-12 xl:p-16">
          <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#CCFF00]/30 to-purple-500/30 rounded-lg blur"></div>
              <div className="relative bg-black/40 backdrop-blur-sm rounded-lg p-6 space-y-6">
                <h2 className="text-2xl font-bold text-white">
                  Transform Your Documentation Workflow
                </h2>
                <div className="space-y-8">
                  {features.map((feature, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#CCFF00]/10 flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-[#CCFF00]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-white/70 text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 mt-6 border-t border-white/10">
                  <blockquote className="text-white/70 italic">
                    "InDocify has revolutionized how we handle documentation.
                    What used to take days now takes minutes."
                  </blockquote>
                  <div className="mt-2 text-sm">
                    <span className="text-white font-medium">
                      Afriyie Kwesi Samuel
                    </span>
                    <span className="text-white/50">
                      {" "}
                      • Frontend Lead Developer at Vela Partners
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
