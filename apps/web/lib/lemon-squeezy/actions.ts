"use server";

import "./index";
import {
  createCheckout,
  updateSubscription,
} from "@lemonsqueezy/lemonsqueezy.js";
import { auth } from "@/auth";
import { getCheckoutData } from "./index";

export const checkout = async (
  plan: "monthly" | "annual",
  tier: "pro" | "enterprise" | null
) => {
  if (!tier) {
    return {
      error: true,
      message: "Please select a tier",
    };
  }
  const session = await auth();
  const checkoutData = getCheckoutData(plan, tier);

  const { data, error } = await createCheckout(
    checkoutData.storeId as string,
    checkoutData.variantId as string,
    {
      checkoutData: {
        email: session?.user.email as string,
        custom: {
          user_id: session?.user.id as string,
          tier: tier,
        },
      },
      productOptions: {
        redirectUrl: `${process.env.BASE_URL as string}`,
        receiptButtonText: "Go Back",
        receiptThankYouNote: "Thank you for subscribing!",
      },
    }
  );

  if (error) {
    return {
      error: error.message,
      message: "an error occurred",
    };
  }

  return data.data.attributes.url;
};

export const updateActiveSubscription = async (
  subscriptionId: string,
  tier: "pro" | "enterprise" | null,
  plan: "monthly" | "annual"
) => {
  if (!tier) {
    return {
      success: false,
      message: "Please select a tier",
    };
  }

  const checkoutData = getCheckoutData(plan, tier);

  const { error } = await updateSubscription(subscriptionId, {
    variantId: Number(checkoutData.variantId),
    disableProrations: false,
    invoiceImmediately: false,
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message:
      "Your subscription will be updated at the next renewal date. You'll continue on your current plan until then.",
  };
};
