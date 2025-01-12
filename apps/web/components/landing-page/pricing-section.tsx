import { Check, CreditCard, X } from "lucide-react";
import TitleTag from "./title-tag";
import Link from "next/link";

const features = [
  {
    name: "Repo Integration",
    free: "Public Repos Only",
    pro: "Public and Private Repos",
  },
  {
    name: "Documentation Preview",
    free: "Platform Preview Only",
    pro: "Platform Preview + In-Repo Integration",
  },
  { name: "Markdown Export", free: false, pro: true },
  { name: "Customization", free: "Limited Themes", pro: "Fully Customizable" },
  { name: "Code Push Updates", free: false, pro: "Via GitHub Webhooks" },
  { name: "Mono-Repo Support", free: false, pro: true },
  { name: "Collaborative Editing", free: false, pro: true },
  {
    name: "API Integration Docs",
    free: "Basic (One Repo)",
    pro: "Comprehensive (All Integrated Repos)",
  },
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

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="bg-white/5 rounded-xl p-8 hover:bg-white/10 transition-colors">
            <h3 className="text-2xl font-bold text-white mb-2">Free Tier</h3>
            <p className="text-white/70 mb-4">
              Perfect for small projects and individual developers
            </p>
            <div className="text-4xl font-bold text-white mb-8">$0</div>
            <Link href="/generate-docs">
              <button className="w-full bg-white/10 text-white px-6 py-3 rounded-full hover:bg-white/20 transition-colors mb-8">
                Get Started
              </button>
            </Link>
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
          <div className="bg-[#CCFF00]/10 rounded-xl p-8 hover:bg-[#CCFF00]/20 transition-colors relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-[#CCFF00] text-black px-3 py-1 rounded-full text-sm font-medium">
              Popular
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Pro Tier</h3>
            <p className="text-white/70 mb-4">
              For teams that need more power and flexibility
            </p>
            <div className="text-4xl font-bold text-white mb-8">
              $29
              <span className="text-lg font-normal text-white/70">/month</span>
            </div>
            <button className="w-full bg-[#CCFF00] text-black px-6 py-3 rounded-full hover:bg-[#CCFF00]/90 transition-colors mb-8 font-medium">
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
      </div>
    </section>
  );
}
