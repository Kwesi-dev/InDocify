"use server";

import { auth } from "@/auth";
import { createSupabaseClient } from "../supabaseClient";
import { getSubscription as getLemonSubscription } from "@lemonsqueezy/lemonsqueezy.js";

export async function getUserSubscription() {
  const session = await auth();
  if (!session?.supabaseAccessToken) return null;

  const supabase = createSupabaseClient(session?.supabaseAccessToken);

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*, lemon_squeezy_subscription_id")
    .eq("user_id", session.user.id)
    .eq("status", "active")
    .single();

  if (subscription) {
    // Get real-time status from Lemon Squeezy
    const { data: lemonSubscription } = await getLemonSubscription(
      subscription.lemon_squeezy_subscription_id
    );

    // Update local DB if status has changed
    if (
      lemonSubscription &&
      lemonSubscription.data.attributes.status !== subscription.status
    ) {
      await supabase
        .from("subscriptions")
        .update({
          status: lemonSubscription.data.attributes.status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", subscription.id);

      subscription.status = lemonSubscription.data.attributes.status;
    }
  }

  return subscription;
}

export async function isUserSubscribed() {
  const subscription = await getUserSubscription();
  return !!subscription && subscription.status === "active";
}
