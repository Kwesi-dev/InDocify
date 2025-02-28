import { createSupabaseClient } from "@/lib/supabaseClient";
import { auth } from "@/auth";
import {
  cancelSubscription,
  getSubscription,
} from "@lemonsqueezy/lemonsqueezy.js";
import "@/lib/lemon-squeezy/index";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.supabaseAccessToken) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { subscriptionId } = await request.json();
    const supabase = createSupabaseClient(session.supabaseAccessToken);

    // Get the subscription
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("lemon_squeezy_subscription_id")
      .eq("id", subscriptionId)
      .single();

    if (!subscription) {
      return Response.json(
        { error: "Subscription not found" },
        { status: 404 }
      );
    }

    // Cancel using Lemon Squeezy SDK
    const { error } = await cancelSubscription(
      subscription.lemon_squeezy_subscription_id
    );

    if (error) {
      throw new Error("Failed to cancel subscription");
    }

    // Get updated subscription details
    const { data: updatedSubscription } = await getSubscription(
      subscription.lemon_squeezy_subscription_id
    );

    // Update local database
    await supabase
      .from("subscriptions")
      .update({
        status: "cancelled",
        cancel_at: updatedSubscription?.data.attributes.ends_at,
        updated_at: new Date().toISOString(),
      })
      .eq("id", subscriptionId);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Cancel subscription error:", error);
    return Response.json(
      { error: "Failed to cancel subscription" },
      { status: 400 }
    );
  }
}
