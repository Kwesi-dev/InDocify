import { NavBar } from "./nav-bar";
import AnimatedBackground from "./animated-background";
import { AnimatedStripes } from "./animated-stripes";
import ActionsButton from "./actions-button";
import LoginButton from "../login-button";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-[#1a1f1a] overflow-hidden">
      <AnimatedBackground />
      <AnimatedStripes />
      <div className="relative z-10 container mx-auto px-6 pt-32 h-[calc(100vh-20px)]">
        <NavBar loginButton={<LoginButton />} />
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-16 h-full">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full mb-8">
              <span className="text-white/90 text-sm">
                Your Code, Our Docs –
              </span>
              <span className="text-[#CCFF00] text-sm">
                Onboarding, Simplified
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-medium text-white leading-tight mb-8">
              Onboarding Made Effortless with Smarter,{" "}
              <span className="text-[#CCFF00]">AI-Driven</span> Documentation
            </h1>
            <ActionsButton />
          </div>

          <div className="lg:w-1/2 space-y-8 self-end mb-5">
            <p className="text-white/70 text-lg">
              Stop wasting hours explaining the codebase. Let InDocify handle
              documentation so your team can focus on building, not onboarding.
            </p>

            <p className="text-white/70 text-lg">
              New team members ramp up in days, not weeks. InDocify delivers
              clear, structured insights tailored to your codebase.
            </p>

            <p className="text-white/70 text-lg">
              Empower your team with centralized documentation and live
              collaboration tools, ensuring everyone stays on the same page.
            </p>

            <p className="text-white/70 text-lg">
              From startups to enterprises, InDocify adapts to your needs with
              customizable templates and affordable pricing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
