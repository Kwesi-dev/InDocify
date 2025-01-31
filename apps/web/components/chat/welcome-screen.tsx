import { GitFork } from "lucide-react";

export function WelcomeScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <GitFork className="w-12 h-12 text-[#CCFF00] mb-4" />
      <h1 className="text-2xl font-semibold text-white mb-2">
        Select a Repository to Start
      </h1>
      <p className="text-white/50 max-w-md">
        Choose a repository from the sidebar to begin analyzing and discussing
        your codebase.
      </p>
    </div>
  );
}
