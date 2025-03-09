import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSupabaseClient } from "@/lib/SupabaseClientProvider";

export function useSubscription() {
  const { data: session } = useSession();
  const [subscription, setSubscription] = useState<Record<string, any> | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const supabase = useSupabaseClient();

  useEffect(() => {
    async function fetchSubscription() {
      if (session && supabase) {
        setLoading(true);
        try {
          const { data: sub } = await supabase
            .from("subscriptions")
            .select("*, prices(*, products(*))")
            .in("status", ["trialing", "active"])
            .eq("user_id", session?.user?.id)
            .maybeSingle();
          setSubscription(sub);
        } catch (error) {
          console.error("Error fetching subscription:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchSubscription();
  }, [session, supabase]);

  return {
    subscription,
    loading,
    isSubscribed: !!subscription && subscription.status === "active",
    tier: subscription?.prices?.products?.name,
  };
}
