// File: polar-supabase-starter-main/app/page.tsx

import { getProducts, getSubscription } from "@/utils/supabase-queries";
import { auth } from "@/auth";
import { createSupabaseClient } from "@/lib/supabaseClient";
import PricingSection from "./pricing-section";

export default async function PricingSectionServer() {
  const session = await auth();
  const supabase = createSupabaseClient(session?.supabaseAccessToken as string);
  const [products, subscription] = await Promise.all([
    getProducts(supabase),
    getSubscription(supabase),
  ]);

  console.log("subscription", subscription);

  return (
    <PricingSection
      products={products ?? []}
      subscription={subscription}
      session={session}
    />
  );
}
