"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Mail, RefreshCw, Clock, AlertCircle } from "lucide-react";
import IndocifyLogo from "@/components/indocify-logo";

export default function VerifyRequestPage() {
  const emailVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    initial: { scale: 0.8, opacity: 0.5 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#1a1f1a] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <IndocifyLogo />

          <div className="relative h-32 mb-8">
            <motion.div
              variants={pulseVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-[#CCFF00]/20 rounded-full blur-2xl"
            />
            <motion.div
              variants={emailVariants}
              initial="initial"
              animate="animate"
              className="relative"
            >
              <div className="w-20 h-20 bg-[#CCFF00]/20 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-10 h-10 text-[#CCFF00]" />
              </div>
            </motion.div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Check your inbox
          </h1>
          <p className="text-white/70 text-lg mb-8">
            We've sent you a magic link to sign in to your account. The link
            will expire in 10 minutes.
          </p>

          {/* Status Cards */}
          <div className="grid gap-4 mb-8">
            <div className="bg-white/5 rounded-lg p-4 flex items-center gap-4">
              <Clock className="w-5 h-5 text-[#CCFF00]" />
              <p className="text-white/70 text-sm text-left">
                Magic links expire after 10 minutes for security
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 flex items-center gap-4">
              <RefreshCw className="w-5 h-5 text-[#CCFF00]" />
              <p className="text-white/70 text-sm text-left">
                You can request a new link if the current one expires
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 flex items-center gap-4">
              <AlertCircle className="w-5 h-5 text-[#CCFF00]" />
              <p className="text-white/70 text-sm text-left">
                Make sure to check your spam folder if you don't see the email
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-[#CCFF00] text-black px-6 py-3 rounded-lg hover:bg-[#CCFF00]/90 transition-colors font-medium"
            >
              Resend magic link
            </button>
          </div>

          {/* Help Link */}
          <p className="mt-8 text-white/50">
            Having trouble?{" "}
            <Link href="/support" className="text-[#CCFF00] hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center">
        <p className="text-white/50 text-sm">
          Secured by inDocify &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
