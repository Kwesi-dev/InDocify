"use client";

import { useState } from "react";
import { CheckCircle, Users, Zap, Clock } from "lucide-react";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";

const benefits = [
  {
    icon: Users,
    title: "Join a Growing Community",
    description:
      "Be part of a new wave of developers redefining how codebases are documented and understood.",
  },
  {
    icon: Zap,
    title: "Get Early Access",
    description:
      "Be among the first to explore innovative AI-driven tools that make understanding codebases effortless.",
  },
  {
    icon: Clock,
    title: "Enjoy Priority Onboarding",
    description:
      "Receive personalized guidance and support to get started seamlessly when we launch.",
  },
];

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1f1a] via-[#1a1f1a]/95 to-[#1a1f1a]" />

      <div className="relative container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join the Waitlist
          </h2>
          <div></div>
          <p className="text-white/70 text-lg mb-8 w-[75%] mx-auto">
            Be the first to explore a smarter way to understand codebases. Gain
            early access and unlock exclusive benefits.
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-12">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                  required
                />
                <Button
                  type="submit"
                  className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90"
                >
                  Join Now
                </Button>
              </div>
              <p className="text-white/50 text-sm mt-2">
                We'll notify you when we're ready to launch
              </p>
            </form>
          ) : (
            <div className="max-w-md mx-auto mb-12 bg-[#CCFF00]/10 rounded-lg p-6 flex items-center gap-4">
              <CheckCircle className="w-6 h-6 text-[#CCFF00]" />
              <div className="text-left">
                <p className="text-white font-medium">You're on the list!</p>
                <p className="text-white/70 text-sm">
                  We'll notify you at {email} when we're ready
                </p>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white/5 rounded-xl p-6 backdrop-blur-sm"
              >
                <benefit.icon className="w-8 h-8 text-[#CCFF00] mb-4" />
                <h3 className="text-white font-medium mb-2">{benefit.title}</h3>
                <p className="text-white/70 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
