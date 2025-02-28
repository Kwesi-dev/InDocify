import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const getServiceSupabase = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string
  );

export async function POST(request: Request) {
  try {
    // Read the raw body text first
    const rawBody = await request.text();
    // Then parse it as JSON
    const payload = JSON.parse(rawBody);

    if (!process.env.LEMON_SQUEEZY_SIGNING_SECRET) {
      return new Response("Lemon Squeezy Webhook Secret not set in .env", {
        status: 500,
      });
    }

    // First, make sure the request is from Lemon Squeezy.
    const secret = process.env.LEMON_SQUEEZY_SIGNING_SECRET;

    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
    const signature = Buffer.from(
      request.headers.get("X-Signature") || "",
      "utf8"
    );

    if (!crypto.timingSafeEqual(digest, signature)) {
      throw new Error("Invalid signature.");
    }

    const eventName = payload.meta.event_name;
    const { attributes, id } = payload.data;

    const userId = payload.meta.custom_data?.user_id;
    const tier = payload.meta.custom_data?.tier || "pro"; // Default to pro if not specified

    const supabase = getServiceSupabase();

    // Get full subscription details from Lemon Squeezy
    switch (eventName) {
      case "subscription_created": {
        const { error } = await supabase.from("subscriptions").insert({
          user_id: userId,
          lemon_squeezy_customer_id: attributes.customer_id,
          lemon_squeezy_subscription_id: id,
          status: attributes.status,
          tier: tier,
          plan_type: attributes.product_name.includes("MONTHLY")
            ? "monthly"
            : "annual",
          current_period_end: attributes.renews_at,
        });
        if (error) {
          console.log("create error", error);
        }
        break;
      }

      case "subscription_updated": {
        // Get the variant details to determine the tier
        const variantName = attributes.product_name.toLowerCase();
        const newTier = variantName.includes("enterprise")
          ? "enterprise"
          : "pro";

        const { error } = await supabase
          .from("subscriptions")
          .update({
            plan_type: attributes.product_name.includes("MONTHLY")
              ? "monthly"
              : "annual",
            tier: newTier,
            status: attributes.status,
            current_period_end: attributes.renews_at,
            updated_at: new Date().toISOString(),
          })
          .eq("lemon_squeezy_subscription_id", id);

        if (error) {
          console.log("update error", error);
        }
        break;
      }

      case "subscription_cancelled":
        {
          const { error } = await supabase
            .from("subscriptions")
            .update({
              status: "cancelled",
              cancel_at: attributes.ends_at,
              updated_at: new Date().toISOString(),
            })
            .eq("lemon_squeezy_subscription_id", id);

          if (error) {
            console.log("update error", error);
          }
        }
        break;

      case "subscription_resumed": {
        const { error } = await supabase
          .from("subscriptions")
          .update({
            status: "active",
            cancel_at: null,
            current_period_end: attributes.renews_at,
            updated_at: new Date().toISOString(),
          })
          .eq("lemon_squeezy_subscription_id", id);

        if (error) {
          console.log("resume error", error);
        }
        break;
      }

      case "subscription_expired": {
        const { error } = await supabase
          .from("subscriptions")
          .update({
            status: "expired",
            current_period_end: null,
            updated_at: new Date().toISOString(),
          })
          .eq("lemon_squeezy_subscription_id", id);

        if (error) {
          console.log("expire error", error);
        }
        break;
      }
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error });
  }
}
