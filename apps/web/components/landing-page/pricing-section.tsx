"use client";

import { Check, CreditCard, X, Bell } from "lucide-react";
import TitleTag from "./title-tag";
import type React from "react"; // Added import for React

const features = [
  {
    name: "Repo Integration",
    free: "Public Repos Only",
    pro: "Public and Private Repos",
  },
  {
    name: "Size",
    free: "Up to 5MB",
    pro: "Up to 100MB",
  },
  {
    name: "Generate Documentation Guide",
    pro: "Generate Custom Documentation Guides",
  },
  { name: "Code Push Updates", free: false, pro: "Pull Updates from GitHub" },
  { name: "Large Repos eg. Mono-Repo Support", free: false, pro: true },
  { name: "Connect your GitHub Account", free: false, pro: true },
  { name: "Unlimited Chat Experience", free: false, pro: true },
  { name: "Priority Support", free: false, pro: true },
];

export default function PricingSection() {
  return (
    <section className="bg-[#1a1f1a] py-24 relative" id="pricing">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center">
          <TitleTag
            icon={<CreditCard className="w-4 h-4 text-[#CCFF00]" />}
            title="Pricing"
          />
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-white/70 text-xl max-w-2xl mx-auto">
              Choose the plan that best fits your team&apos;s needs
            </p>
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Pricing Cards - Blurred */}
          <div className="grid md:grid-cols-2 gap-8 filter blur-sm pointer-events-none">
            {/* Free Tier */}
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-2">Free Tier</h3>
              <p className="text-white/70 mb-4">
                Perfect for small projects and individual developers
              </p>
              <div className="text-4xl font-bold text-white mb-8">$0</div>
              <button className="w-full bg-white/10 text-white px-6 py-3 rounded-full mb-8">
                Get Started
              </button>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {typeof feature.free === "boolean" ? (
                      feature.free ? (
                        <Check className="w-5 h-5 text-[#CCFF00] shrink-0 mt-1" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                      )
                    ) : (
                      <Check className="w-5 h-5 text-[#CCFF00] shrink-0 mt-1" />
                    )}
                    <div>
                      <p className="text-white">{feature.name}</p>
                      {typeof feature.free === "string" && (
                        <p className="text-white/50 text-sm">{feature.free}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Tier */}
            <div className="bg-[#CCFF00]/10 rounded-xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-[#CCFF00] text-black px-3 py-1 rounded-full text-sm font-medium">
                Popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro Tier</h3>
              <p className="text-white/70 mb-4">
                For teams that need more power and flexibility
              </p>
              <div className="text-4xl font-bold text-white mb-8">
                $ To Be Added
                <span className="text-lg font-normal text-white/70">
                  /month
                </span>
              </div>
              <button className="w-full bg-[#CCFF00] text-black px-6 py-3 rounded-full mb-8 font-medium">
                Start Free Trial
              </button>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#CCFF00] shrink-0 mt-1" />
                    <div>
                      <p className="text-white">{feature.name}</p>
                      {typeof feature.pro === "string" && (
                        <p className="text-white/50 text-sm">{feature.pro}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coming Soon Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-[#1a1f1a]/95 backdrop-blur-lg p-8 rounded-2xl border border-white/10 max-w-md w-full text-center">
              <div className="w-16 h-16 rounded-full bg-[#CCFF00]/20 flex items-center justify-center mx-auto mb-6">
                <Bell className="w-8 h-8 text-[#CCFF00]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Pricing Coming Soon
              </h3>
              <p className="text-white/70 mb-6">
                We&apos;re finalizing our pricing plans.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
