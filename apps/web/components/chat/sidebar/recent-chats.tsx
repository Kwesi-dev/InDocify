import { MessageSquare } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";

// Mock data - replace with actual chat data
const recentChats = [
  {
    id: "1",
    title: "Code review for auth implementation",
    timestamp: "2h ago",
  },
  {
    id: "2",
    title: "API documentation analysis",
    timestamp: "5h ago",
  },
  {
    id: "3",
    title: "Database schema review",
    timestamp: "1d ago",
  },
];

const truncateTitle = (title: string) => {
  return title.slice(0, 20) + "...";
};

export function RecentChats() {
  return (
    <div className="space-y-1">
      {recentChats.map((chat) => (
        <Button
          key={chat.id}
          variant="ghost"
          className={cn(
            "w-full justify-start text-sm font-normal",
            "text-white/70 hover:text-white hover:bg-white/5"
          )}
        >
          <div className="flex items-center gap-2 w-full">
            <MessageSquare className="w-4 h-4 shrink-0" />
            <div className="flex-1 truncate">
              <div className="truncate">{truncateTitle(chat.title)}</div>
            </div>
          </div>
        </Button>
      ))}
    </div>
  );
}
