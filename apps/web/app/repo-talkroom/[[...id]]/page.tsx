"use client";

import Sidebar from "@/components/chat/sidebar/sidebar";
import { ChatInterface } from "@/components/chat/chat-interface";
import { WelcomeScreen } from "@/components/chat/welcome-screen";
import { useSearchParams } from "next/navigation";
import { RepoHeader } from "@/components/chat/chat-header";

export default function ChatPage() {
  const searchParams = useSearchParams();
  const selectedRepo = searchParams.get("repo");
  const owner = searchParams.get("owner");

  return (
    <div className="flex h-screen bg-[#1a1f1a] overflow-hidden">
      <Sidebar selectedRepo={selectedRepo} owner={owner} />
      <main className="flex-1">
        {selectedRepo ? (
          <>
            <RepoHeader />
            <ChatInterface />
          </>
        ) : (
          <WelcomeScreen />
        )}
      </main>
    </div>
  );
}
