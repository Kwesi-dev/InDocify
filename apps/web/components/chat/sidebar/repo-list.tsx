import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";

interface RepoListProps {
  selectedRepo: string | null;
  onSelectRepo: (repo: string) => void;
}

// Mock data - replace with actual repo data
const repos = [
  { id: "1", name: "inDocify-web" },
  { id: "2", name: "inDocify-api" },
  { id: "3", name: "inDocify-docs" },
];

export function RepoList({ selectedRepo, onSelectRepo }: RepoListProps) {
  return (
    <div className="space-y-1">
      {repos.map((repo) => (
        <Button
          key={repo.id}
          variant="ghost"
          className={cn(
            "w-full justify-start text-sm font-normal",
            selectedRepo === repo.id
              ? "bg-white/10 text-white"
              : "text-white/70 hover:text-white hover:bg-white/5"
          )}
          onClick={() => onSelectRepo(repo.id)}
        >
          {repo.name}
        </Button>
      ))}
    </div>
  );
}
