"use client";

import { Plus, Clock, PanelLeftClose, PanelLeft } from "lucide-react";
import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import IndocifyLogo from "@/components/indocify-logo";
import { cn } from "@workspace/ui/lib/utils";
import { RecentChats } from "./recent-chats";
import DocumentationSection from "./documentation-section";
import { RepoSelector } from "./repo-selector";
import { UserProfile } from "./user-profile";
import { useSession } from "next-auth/react";
import useShallowRouter from "@/hooks/useShallowRouter";
import { nanoid } from "nanoid";

interface SidebarProps {
  selectedRepo: string | null;
  owner: string | null;
}

export default function Sidebar({ selectedRepo, owner }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const shallowRoute = useShallowRouter();
  const { data: session } = useSession();

  return (
    <div
      className={cn(
        "flex flex-col bg-[#1a1f1a] border-r border-white/10 transition-all duration-300",
        isCollapsed ? "w-[60px]" : "w-[260px]"
      )}
    >
      {/* Logo Section */}
      <div
        className={cn(
          "p-4 border-b border-white/10 flex items-center justify-between"
        )}
      >
        {!isCollapsed ? <IndocifyLogo /> : null}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white/50 hover:text-white"
        >
          {isCollapsed ? (
            <PanelLeft size={20} className="shrink-0" />
          ) : (
            <PanelLeftClose size={20} className="shrink-0" />
          )}
        </button>
      </div>

      {/* New Chat Button */}
      <div className={`${isCollapsed ? "px-2" : "px-4"} my-4`}>
        <Button
          className={cn(
            "w-full bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 gap-2"
          )}
          size="sm"
          title={isCollapsed ? "New Chat" : undefined}
          disabled={!selectedRepo}
          onClick={() => {
            shallowRoute(
              `/repo-talkroom/${nanoid()}?repo=${selectedRepo}&owner=${owner}`
            );
          }}
        >
          <Plus className="w-4 h-4" />
          {!isCollapsed && "New Chat"}
        </Button>
      </div>

      {/* Scrollable Content */}
      <div className={`space-y-6 py-4 ${isCollapsed ? "px-2" : "px-4"}`}>
        {/* Repositories Section */}
        <div className="space-y-4">
          <RepoSelector selectedRepo={selectedRepo} isCollapsed={isCollapsed} />
        </div>

        {/* Documentation Section */}
        <div className="space-y-4">
          <DocumentationSection isCollapsed={isCollapsed} />
        </div>

        <ScrollArea className="flex-1">
          {/* Recent Chats Section */}
          {!isCollapsed && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-white/50">
                <Clock className="w-4 h-4" />
                Recent Chats
              </div>
              <RecentChats repo={selectedRepo as string} />
            </div>
          )}
        </ScrollArea>
      </div>

      {/* User Profile Section - Fixed at bottom */}
      <div className="h-[85px] border-t border-white/10 mt-auto flex items-center justify-center">
        {!isCollapsed ? (
          <UserProfile
            name={session?.user.name as string}
            email={session?.user.email as string}
            avatarUrl="/placeholder.svg?height=40&width=40"
          />
        ) : (
          <Button
            variant="ghost"
            className="w-full p-2 hover:bg-white/5"
            title="Sarah Cooper"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              {session?.user.name?.charAt(0).toUpperCase()}
            </div>
          </Button>
        )}
      </div>
    </div>
  );
}
