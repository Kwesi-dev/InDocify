import { auth } from "@/auth";
import { SupabaseClient } from "@supabase/supabase-js";

export const getSubscription = async (supabase: SupabaseClient) => {
  const session = await auth();
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*, prices(*, products(*))")
    .in("status", ["trialing", "active"])
    .eq("user_id", session?.user?.id)
    .maybeSingle();

  return subscription;
};

export const getProducts = async (supabase: SupabaseClient) => {
  const { data: products } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("active", true)
    .order("price_amount", { referencedTable: "prices" });
  return products;
};
