"use client";

import { Check, CreditCard, X, Loader2, Crown } from "lucide-react";
import TitleTag from "./title-tag";
import {
  checkout,
  updateActiveSubscription,
} from "@/lib/lemon-squeezy/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "@workspace/ui/hooks/use-toast";
import { useSubscription } from "@/hooks/use-subscription";

const features = [
  {
    name: "Repositories Count Limit",
    free: "2 repos",
    pro: "Unlimited",
    enterprise: "Unlimited",
  },
  {
    name: "Private Repositories",
    free: false,
    pro: "Up to 10",
    enterprise: "Unlimited",
  },
  {
    name: "User Organization Repositories",
    free: false,
    pro: false,
    enterprise: true,
  },
  {
    name: "Repo Integration",
    free: "Public Repos Only",
    pro: "Public and Private Repos",
    enterprise: "Public and Private Repos",
  },
  {
    name: "Repo Size Limit",
    free: "Up to 50MB",
    pro: "Up to 200MB",
    enterprise: "Up to 500MB",
  },
  {
    name: "Pull Repo Updates",
    free: false,
    pro: "Pull Updates from GitHub",
    enterprise: "Pull Updates from GitHub",
  },
  {
    name: "Connect your GitHub Account",
    free: false,
    pro: true,
    enterprise: true,
  },
  {
    name: "Unlimited Chat Experience",
    free: false,
    pro: true,
    enterprise: true,
  },
  {
    name: "Priority Support",
    free: false,
    pro: true,
    enterprise: "Advanced Priority Support",
  },
];

export default function PricingSection() {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    subscription,
    isSubscribed,
    loading: subscriptionLoading,
  } = useSubscription();

  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">(
    "monthly"
  );
  const [loadingPro, setLoadingPro] = useState(false);
  const [loadingEnterprise, setLoadingEnterprise] = useState(false);

  const handleProCheckout = async () => {
    if (!session) {
      router.push("/signup");
      return;
    }

    setLoadingPro(true);
    try {
      // If already subscribed, update the subscription (handles both upgrade and downgrade)
      if (isSubscribed && subscription?.lemon_squeezy_subscription_id) {
        const response = await updateActiveSubscription(
          subscription.lemon_squeezy_subscription_id,
          "pro",
          billingPeriod
        );

        if (response.success) {
          toast({
            title: "Success",
            description: response.message,
          });
          window.location.reload();
          return;
        } else {
          toast({
            title: "Error",
            description: response.message || "Failed to update subscription",
            variant: "destructive",
          });
        }
        return;
      }

      // Only create new checkout if not subscribed
      const response = await checkout(billingPeriod, "pro");
      if (typeof response === "string") {
        window.location.href = response;
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to process checkout",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoadingPro(false);
    }
  };

  const handleEnterpriseCheckout = async () => {
    if (!session) {
      router.push("/signup");
      return;
    }

    setLoadingEnterprise(true);
    try {
      // If already subscribed, update the subscription (handles both upgrade and downgrade)
      if (isSubscribed && subscription?.lemon_squeezy_subscription_id) {
        const response = await updateActiveSubscription(
          subscription.lemon_squeezy_subscription_id,
          "enterprise",
          billingPeriod
        );

        if (response.success) {
          toast({
            title: "Success",
            description: response.message,
          });
          window.location.reload();
          return;
        } else {
          toast({
            title: "Error",
            description: response.message || "Failed to update subscription",
            variant: "destructive",
          });
        }
        return;
      }

      // Only create new checkout if not subscribed
      const response = await checkout(billingPeriod, "enterprise");
      if (typeof response === "string") {
        window.location.href = response;
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to process checkout",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoadingEnterprise(false);
    }
  };

  const getProButtonText = () => {
    if (loadingPro) {
      return (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Processing...
        </span>
      );
    }

    if (subscriptionLoading) {
      return (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading...
        </span>
      );
    }

    if (isSubscribed) {
      if (subscription?.tier === "enterprise") {
        return "Downgrade to Pro";
      }
      if (
        subscription?.tier === "pro" &&
        subscription.plan_type !== billingPeriod
      ) {
        return `Switch to ${billingPeriod === "monthly" ? "Monthly" : "Annual"} Plan`;
      }
      if (subscription?.tier === "pro") {
        return "Current Plan";
      }
    }

    return "Get Started with Pro";
  };

  const getEnterpriseButtonText = () => {
    if (loadingEnterprise) {
      return (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Processing...
        </span>
      );
    }

    if (subscriptionLoading) {
      return (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading...
        </span>
      );
    }

    if (isSubscribed) {
      if (subscription?.tier === "pro") {
        return "Upgrade to Enterprise";
      }
      if (
        subscription?.tier === "enterprise" &&
        subscription.plan_type !== billingPeriod
      ) {
        return `Switch to ${billingPeriod === "monthly" ? "Monthly" : "Annual"} Plan`;
      }
      if (subscription?.tier === "enterprise") {
        return "Current Plan";
      }
    }

    return "Get Started with Enterprise";
  };
  const isButtonDisabled = (tier: "pro" | "enterprise") => {
    if (loadingPro || loadingEnterprise || subscriptionLoading) return true;
    if (!isSubscribed) return false;

    return (
      subscription?.tier === tier && subscription?.plan_type === billingPeriod
    );
  };

  return (
    <section className="bg-[#1a1f1a] py-24 relative" id="pricing">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center">
          <TitleTag
            icon={<CreditCard className="w-4 h-4 text-[#CCFF00]" />}
            title="Pricing"
          />
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-white/70 text-xl max-w-2xl mx-auto">
              Choose the plan that best fits your needs
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-4 py-2 rounded-lg ${
                billingPeriod === "monthly"
                  ? "bg-[#CCFF00] text-black"
                  : "text-white/70"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("annual")}
              className={`px-4 py-2 rounded-lg ${
                billingPeriod === "annual"
                  ? "bg-[#CCFF00] text-black"
                  : "text-white/70"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="relative mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Tier */}
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-2">Free Tier</h3>
              <p className="text-white/70 mb-4">
                Ideal for looking to explore InDocify.
              </p>
              <div className="text-4xl font-bold text-white mb-8">$0</div>
              {/* <button className="w-full bg-white/10 text-white px-6 py-3 rounded-full mb-8">
                Get Started
              </button> */}
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {typeof feature.free === "boolean" ? (
                      feature.free ? (
                        <Check className="w-5 h-5 text-[#CCFF00] shrink-0 mt-1" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                      )
                    ) : (
                      <Check className="w-5 h-5 text-[#CCFF00] shrink-0 mt-1" />
                    )}
                    <div>
                      <p className="text-white">{feature.name}</p>
                      {typeof feature.free === "string" && (
                        <p className="text-white/50 text-sm">{feature.free}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Pro Tier */}
            <div className="bg-white/5 rounded-xl p-8 relative overflow-hidden">
              <div className="absolute top-6 right-6 bg-[#CCFF00] text-black text-xs px-3 py-1 rounded-full">
                Popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <div className="text-4xl font-bold text-white mb-2">
                {billingPeriod === "monthly" ? (
                  <>
                    $8
                    <span className="text-lg font-normal text-white/70">
                      /month
                    </span>
                  </>
                ) : (
                  <>
                    $80
                    <span className="text-lg font-normal text-white/70">
                      /year
                    </span>
                  </>
                )}
              </div>
              {billingPeriod === "annual" && (
                <p className="text-white/70 mb-6 text-sm">
                  <span className="line-through">$96</span>{" "}
                  <span className="text-[#CCFF00]">Save $16 (17% off)</span>
                </p>
              )}
              <p className="text-white/70 mb-6">Perfect for small teams</p>
              <button
                disabled={isButtonDisabled("pro")}
                className={`w-full px-6 py-3 rounded-full mb-8 font-medium relative transition-colors bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 ${
                  isButtonDisabled("pro") ? "opacity-70 cursor-not-allowed" : ""
                }`}
                onClick={handleProCheckout}
              >
                {getProButtonText()}
              </button>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {typeof feature.pro === "boolean" ? (
                      feature.pro ? (
                        <Check className="w-5 h-5 text-[#CCFF00] shrink-0 mt-1" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                      )
                    ) : (
                      <Check className="w-5 h-5 text-[#CCFF00] shrink-0 mt-1" />
                    )}{" "}
                    <div>
                      <p className="text-white">{feature.name}</p>
                      {typeof feature.pro === "string" && (
                        <p className="text-white/50 text-sm">{feature.pro}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Enterprise Tier */}
            <div className="relative bg-white/5 rounded-xl p-8">
              <div className="absolute top-6 right-6">
                <TitleTag
                  icon={<Crown className="w-4 h-4 text-purple-400" />}
                  title="Enterprise"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
              <div className="text-4xl font-bold text-white mb-2">
                {billingPeriod === "monthly" ? (
                  <>
                    $12
                    <span className="text-lg font-normal text-white/70">
                      /month
                    </span>
                  </>
                ) : (
                  <>
                    $120
                    <span className="text-lg font-normal text-white/70">
                      /year
                    </span>
                  </>
                )}
              </div>
              {billingPeriod === "annual" && (
                <p className="text-white/70 mb-6 text-sm">
                  <span className="line-through">$144</span>{" "}
                  <span className="text-[#CCFF00]">Save $24 (17% off)</span>
                </p>
              )}
              <p className="text-white/70 mb-6">
                Increased imported repo size limit
              </p>
              <button
                disabled={isButtonDisabled("enterprise")}
                className={`w-full px-6 py-3 rounded-full mb-8 font-medium relative transition-colors bg-purple-500 text-white hover:bg-purple-600 ${
                  isButtonDisabled("enterprise")
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
                onClick={handleEnterpriseCheckout}
              >
                {getEnterpriseButtonText()}
              </button>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#CCFF00] shrink-0 mt-1" />
                    <div>
                      <p className="text-white">{feature.name}</p>
                      {typeof feature.enterprise === "string" && (
                        <p className="text-white/50 text-sm">
                          {feature.enterprise}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
