import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getUserSubscription } from "@/lib/lemon-squeezy/subscription";
import { toast } from "@workspace/ui/hooks/use-toast";

export type Subscription = {
  id: string;
  user_id: string;
  plan_type: "monthly" | "annual";
  tier: "pro" | "enterprise";
  lemon_squeezy_subscription_id: string;
  status: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
};

export function useSubscription() {
  const { data: session } = useSession();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSubscription() {
      if (session) {
        setLoading(true);
        try {
          const sub = await getUserSubscription();
          setSubscription(sub);
        } catch (error) {
          console.error("Error fetching subscription:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchSubscription();
  }, [session]);

  const cancelSubscription = async () => {
    if (!subscription) return;

    try {
      const response = await fetch("/api/subscription/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriptionId: subscription.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to cancel subscription");
      }

      // Refresh subscription data
      const updatedSub = await getUserSubscription();
      setSubscription(updatedSub);

      toast({
        title: "Subscription cancelled",
        description:
          "Your subscription will remain active until the end of the billing period.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel subscription. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    subscription,
    loading,
    isSubscribed: !!subscription && subscription.status === "active",
    cancelSubscription,
  };
}
