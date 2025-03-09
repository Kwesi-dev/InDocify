"use client";

import { useState } from "react";
import {
  ChevronDown,
  Github,
  Lock,
  LogOut,
  MessageSquare,
  User,
} from "lucide-react";
import Link from "next/link";
import { Session } from "next-auth";
import { useSubscription } from "@/hooks/use-subscription";
import { logout } from "@/app/actions";

const UserLandingProfile = ({ session }: { session: Session }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isSubscribed } = useSubscription();
  return (
    <div className="relative">
      <button
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 transition-colors px-4 py-2 rounded-full"
      >
        <div className="w-8 h-8 rounded-full bg-[#CCFF00]/20 flex items-center justify-center">
          <User className="w-4 h-4 text-[#CCFF00]" />
        </div>
        <span className="text-white/90">{session.user.name}</span>
        <ChevronDown
          className={`w-4 h-4 text-white/50 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isUserMenuOpen && (
        <div className="absolute right-0 mt-2 w-[250px] bg-[#1a1f1a] border border-white/10 rounded-xl shadow-xl py-2">
          <Link
            href="/repo-talkroom"
            className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/5 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>RepoTalk Room</span>
          </Link>

          {isSubscribed && (
            <>
              <div className="border-t border-white/10 my-1" />
              <Link
                href="/connect-github"
                className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/5 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Connect to Github</span>
              </Link>
            </>
          )}
          <div className="border-t border-white/10 my-1" />
          <Link
            href="/portal"
            className="px-4 py-3 text-white/90 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2"
          >
            <Lock className="w-4 h-4 shrink-0" />
            <span>Manage Subscription</span>
          </Link>
          <div className="border-t border-white/10 my-1" />
          <button
            onClick={() => {
              logout();
            }}
            className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserLandingProfile;
