"use client";

import { scrollToSection } from "@/utils";
import { Button } from "@workspace/ui/components/button";
import { DialogTitle } from "@workspace/ui/components/dialog";
import { Logo } from "@workspace/ui/components/Logo";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import {
  Github,
  Lock,
  LogOut,
  Menu,
  MessageSquare,
  User,
  UserPlus,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useSubscription } from "@/hooks/use-subscription";
import Link from "next/link";
import { useState } from "react";

export function NavBar({ authButtons }: { authButtons?: React.ReactNode }) {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo />
          <Link href="/" className="text-[#CCFF00] text-2xl font-medium">
            inDocify
          </Link>
        </div>

        <ul className="hidden md:flex items-center gap-8">
          <li
            onClick={() => scrollToSection("pricing")}
            className="text-white/90 transition-colors cursor-pointer hover:text-[#CCFF00]"
          >
            PRICING
          </li>
          <li>{authButtons}</li>
          <li>
            <Link href="/demo">
              <button className="bg-[#CCFF00] text-black px-6 py-2 rounded-full hover:bg-[#CCFF00]/90 transition-colors">
                REQUEST A DEMO
              </button>
            </Link>
          </li>
        </ul>

        <Drawer />
      </div>
    </nav>
  );
}

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const { isSubscribed } = useSubscription();
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" className="text-white">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] bg-[#1a1f1a] border-white/10 p-0"
      >
        <DialogTitle className="hidden" />
        <div className="flex flex-col h-full mt-5">
          <div className="p-6 border-b border-white/10">
            {session ? (
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#CCFF00]/20 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-[#CCFF00]" />
                </div>
                <div>
                  <p className="text-white font-medium">
                    {session?.user?.email}
                  </p>
                </div>
              </div>
            ) : null}
            <Button
              asChild
              className="w-full bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90"
            >
              <Link href="/demo">REQUEST A DEMO</Link>
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-4">
            {session ? (
              <nav className="flex flex-col space-y-1">
                <Link
                  href="/repo-talkroom"
                  className="px-6 py-3 text-white/90 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <MessageSquare className="w-4 h-4" />
                  RepoTalk Room
                </Link>
                {isSubscribed && (
                  <Link
                    href="/connect-github"
                    className="px-6 py-3 text-white/90 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <Github className="w-4 h-4" />
                    Connect to Github
                  </Link>
                )}
                <Link
                  href="/subscription"
                  className="px-6 py-3 text-white/90 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Lock className="w-4 h-4" />
                  Manage Subscription
                </Link>
              </nav>
            ) : (
              <div className="grid gap-y-5 p-6">
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-white/10 text-white hover:bg-white/5 justify-start gap-3 h-12 bg-transparent"
                >
                  <Link href="/login">
                    <Lock className="w-4 h-4 text-[#CCFF00]" />
                    Login
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-white/5 text-white hover:bg-white/10 justify-start gap-3 h-12"
                >
                  <Link href="/signup">
                    <UserPlus className="w-4 h-4 text-[#CCFF00]" />
                    Sign Up
                  </Link>
                </Button>
              </div>
            )}
          </div>
          {session ? (
            <div className="p-6 border-t border-white/10">
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors w-full"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
};
