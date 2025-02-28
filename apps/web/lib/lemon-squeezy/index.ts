import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";

const apiKey = process.env.LEMON_SQUEEZY_API_KEY;

lemonSqueezySetup({
  apiKey,
  onError: (error) => console.error("Error!", error),
});

// export const monthlyCheckoutData = {
//   storeId: process.env.STORE_ID,
//   variantId: process.env.MONTHLY_VARIANT_ID,
// };

// export const annualCheckoutData = {
//   storeId: process.env.STORE_ID,
//   variantId: process.env.ANNUAL_VARIANT_ID,
// };

const STORE_ID = process.env.STORE_ID as string;

const VARIANT_IDS = {
  pro: {
    monthly: process.env.PRO_MONTHLY_VARIANT_ID,
    annual: process.env.PRO_ANNUAL_VARIANT_ID,
  },
  enterprise: {
    monthly: process.env.ENTERPRISE_MONTHLY_VARIANT_ID,
    annual: process.env.ENTERPRISE_ANNUAL_VARIANT_ID,
  },
} as const;

export type CheckoutData = {
  storeId: string;
  variantId: string;
};

export const getCheckoutData = (
  plan: "monthly" | "annual",
  tier: "pro" | "enterprise"
): CheckoutData => {
  return {
    storeId: STORE_ID,
    variantId: VARIANT_IDS[tier][plan] as string,
  };
};
