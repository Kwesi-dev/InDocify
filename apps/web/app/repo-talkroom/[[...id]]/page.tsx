"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/chat/sidebar/sidebar";
import { ChatInterface } from "@/components/chat/chat-interface";
import { WelcomeScreen } from "@/components/chat/welcome-screen";
import { useSearchParams } from "next/navigation";
import { RepoHeader } from "@/components/chat/chat-header";
import { DocumentationContainer } from "@/components/chat/documentation/documentation-container";

export default function ChatPage() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const documentation = searchParams.get("doc") as string;
  const selectedRepo = searchParams.get("repo");
  const owner = searchParams.get("owner");

  console.log("documentation", documentation);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return a minimal layout during SSR to prevent hydration mismatches
  if (!mounted) {
    return (
      <div className="flex h-screen bg-[#1a1f1a] overflow-hidden">
        <div className="w-[260px]" />
        <main className="flex-1" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#1a1f1a] overflow-hidden">
      <Sidebar selectedRepo={selectedRepo} owner={owner} />
      <main className="flex-1">
        {!documentation ? (
          <>
            {selectedRepo ? (
              <>
                <RepoHeader />
                <ChatInterface />
              </>
            ) : (
              <WelcomeScreen />
            )}
          </>
        ) : (
          <DocumentationContainer title={documentation} />
        )}
      </main>
    </div>
  );
}
