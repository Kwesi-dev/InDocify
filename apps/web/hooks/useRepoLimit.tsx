import { useSession } from "next-auth/react";
import { useSupabaseClient } from "@/lib/SupabaseClientProvider";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSubscription } from "./use-subscription";

interface RepoLimitResponse {
  repoCount: number;
  privateRepoCount: number;
  isLimited: boolean;
  isProLimited: boolean;
}

const useRepoLimit = () => {
  const { data: session } = useSession();
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();
  const { subscription } = useSubscription();

  const { data, isLoading } = useQuery({
    enabled: !!(supabase && session),
    queryKey: ["repo_counts", session?.user.email],
    queryFn: async () => {
      if (!supabase || !session) return;
      const { data } = await supabase
        .from("users")
        .select("repo_count, private_repo_count")
        .eq("email", session?.user.email)
        .maybeSingle();

      if (!data) {
        return null;
      }

      const repoCount = data.repo_count || 0;
      const privateRepoCount = data.private_repo_count || 0;
      const { data: subscription } = await supabase
        .from("subscriptions")
        .select("tier")
        .eq("user_id", session?.user?.id)
        .maybeSingle();

      // Free tier: 2 repos total
      // Pro tier: Unlimited public repos, 5 private repos
      // Enterprise: Unlimited all
      const isFreeTier = !subscription || subscription.tier === "free";
      const isProTier = subscription?.tier === "pro";

      return {
        repoCount,
        privateRepoCount,
        isLimited: isFreeTier && repoCount >= 2,
        isProLimited: isProTier && privateRepoCount >= 5,
      } as RepoLimitResponse;
    },
  });

  const updateRepoCounts = async (isPrivate: boolean) => {
    if (!supabase || !session) return;

    if (
      (subscription?.tier === "pro" && !isPrivate) ||
      subscription?.tier === "enterprise"
    ) {
      return;
    }

    const field = isPrivate ? "private_repo_count" : "repo_count";
    const { data: currentData } = await supabase
      .from("users")
      .select(field)
      .eq("email", session.user.email)
      .maybeSingle();

    if (!currentData) return;

    // Type assertion to help TypeScript understand the shape of currentData
    const count = (currentData as Record<typeof field, number>)[field] || 0;

    const { error } = await supabase
      .from("users")
      .update({ [field]: count + 1 })
      .eq("email", session.user.email);

    if (error) {
      console.error("Error updating repo count:", error);
      return;
    }

    // Invalidate the query to trigger a refetch
    queryClient.invalidateQueries({
      queryKey: ["repo_counts", session.user.email],
    });
  };

  return {
    repoCounts: data,
    isLoading,
    updateRepoCounts,
  };
};

export default useRepoLimit;
