"use client";

import PageLayout from "@/components/layout";
import { useState } from "react";
import { useSubscription } from "@/hooks/use-subscription";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { toast } from "@workspace/ui/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { updateActiveSubscription } from "@/lib/lemon-squeezy/actions";
import { AlertCircle } from "lucide-react";
import { Calendar } from "lucide-react";

const features = {
  pro: [
    "Unlimited repositories",
    "Public and private repos",
    "Up to 5 private repositories",
    "Up to 200MB repository size",
    "Pull updates from GitHub",
    "GitHub account connection",
    "Unlimited chat experience",
    "Priority support",
  ],
  enterprise: [
    "Public and private repos",
    "Up to 500MB repository size",
    "All Pro tier features",
    "User Organization Repositories",
    "Advanced support",
  ],
};

export default function SubscriptionPageContent() {
  const {
    subscription,
    isSubscribed,
    loading: subscriptionLoading,
    cancelSubscription,
  } = useSubscription();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showChangeDialog, setShowChangeDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleCancelSubscription = async () => {
    if (!subscription?.lemon_squeezy_subscription_id) return;

    setLoading(true);
    try {
      await cancelSubscription();
      toast({
        title: "Success",
        description: "Your subscription has been cancelled.",
      });
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setShowCancelDialog(false);
    }
  };

  const handleChangePlan = async () => {
    if (!subscription?.lemon_squeezy_subscription_id) return;

    setLoading(true);
    try {
      const newPlan =
        subscription.plan_type === "monthly" ? "annual" : "monthly";
      const response = await updateActiveSubscription(
        subscription.lemon_squeezy_subscription_id,
        subscription.tier, // Keep the same tier
        newPlan
      );

      if (response.success) {
        toast({
          title: "Success",
          description: "Your plan has been updated successfully.",
        });
        window.location.reload();
      } else {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setShowChangeDialog(false);
    }
  };

  const handleChangeTier = async (newTier: "pro" | "enterprise") => {
    if (!subscription?.lemon_squeezy_subscription_id) return;

    setLoading(true);
    try {
      const response = await updateActiveSubscription(
        subscription.lemon_squeezy_subscription_id,
        newTier,
        subscription.plan_type // Keep the same billing period
      );

      if (response.success) {
        toast({
          title: "Success",
          description: response.message,
        });
        window.location.reload();
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to update subscription",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setShowChangeDialog(false);
    }
  };

  const getPlanBadgeStyle = (tier: "pro" | "enterprise") => {
    return tier === "pro"
      ? "bg-[#CCFF00]/10 text-[#CCFF00] border border-[#CCFF00]/20"
      : "bg-purple-500/10 text-purple-500 border border-purple-500/20";
  };

  return (
    <PageLayout>
      <main className="flex-1 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Subscription Management
            </h1>
            <p className="text-white/70 text-lg">
              Manage your subscription, billing, and plan settings
            </p>
          </div>

          {subscriptionLoading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="w-8 h-8 animate-spin text-white/70" />
            </div>
          ) : !isSubscribed ? (
            <div className="text-center p-8 bg-white/5 rounded-xl">
              <h2 className="text-xl font-semibold text-white mb-4">
                No Active Subscription
              </h2>
              <p className="text-white/70 mb-6">
                You currently don't have an active subscription.
              </p>
              <Button
                onClick={() => (window.location.href = "/#pricing")}
                className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90"
              >
                View Plans
              </Button>
            </div>
          ) : (
            <div className="grid gap-8">
              {/* Current Plan Card */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Current Plan
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/70 mb-2">Plan</p>
                    <div className="flex items-center gap-2">
                      <p className="text-white font-medium">
                        {subscription?.plan_type === "monthly"
                          ? "Monthly"
                          : "Annual"}
                      </p>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPlanBadgeStyle(
                          subscription?.tier || "pro"
                        )}`}
                      >
                        {subscription?.tier === "enterprise"
                          ? "Enterprise"
                          : "Pro"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-white/70 mb-2">Status</p>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        subscription?.status === "active"
                          ? "bg-green-500/10 text-green-500 border border-green-500/20"
                          : subscription?.status === "cancelled"
                            ? "bg-red-500/10 text-red-500 border border-red-500/20"
                            : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                      }`}
                    >
                      {subscription?.status === "active" && "●"}
                      <span
                        className={
                          subscription?.status === "active" ? "ml-1" : ""
                        }
                      >
                        {subscription?.status === "active"
                          ? "Active"
                          : subscription?.status === "cancelled"
                            ? "Cancelled"
                            : subscription?.status === "past_due"
                              ? "Past Due"
                              : "Expired"}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Plan Features */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-white mb-4 font-semibold text-lg ">
                    Your Plan Features:
                  </p>
                  <ul className="space-y-3">
                    {features[subscription?.tier || "pro"].map((feature) => (
                      <li key={feature} className="text-white/70">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                {subscription?.tier === "pro" && (
                  <Button
                    onClick={() => handleChangeTier("enterprise")}
                    disabled={loading}
                    className="mt-4"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : null}
                    Upgrade to Enterprise
                  </Button>
                )}
                {subscription?.tier === "enterprise" && (
                  <Button
                    onClick={() => handleChangeTier("pro")}
                    disabled={loading}
                    className="mt-4"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : null}
                    Downgrade to Pro
                  </Button>
                )}
              </div>
              <div>
                <h4 className="text-white/70 text-sm font-medium">
                  Next Billing Date
                </h4>
                <p className="text-xl font-semibold text-white mt-1">
                  {formatDate(subscription?.current_period_end as string)}
                </p>
                <p className="text-white/50 text-sm mt-1">
                  Your {subscription?.plan_type} plan will renew automatically
                </p>
              </div>
              {/* Actions Card */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Plan Actions
                </h2>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowChangeDialog(true)}
                    disabled={loading || subscription?.status !== "active"}
                  >
                    Change Billing Cycle
                  </Button>
                  {subscription?.status === "active" && (
                    <Button
                      variant="destructive"
                      onClick={() => setShowCancelDialog(true)}
                      disabled={loading}
                    >
                      Cancel Subscription
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Cancel Dialog */}
        <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <DialogContent className="bg-[#1a1f1a] border border-white/10">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-white">
                <AlertCircle className="w-5 h-5 text-red-400" />
                Cancel Subscription
              </DialogTitle>
              <DialogDescription className="text-white/70">
                Are you sure you want to cancel your subscription? You will lose
                access to premium features at the end of your current billing
                period.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowCancelDialog(false)}
                className="border-white/10 text-white bg-white/5"
              >
                Keep Subscription
              </Button>
              <Button
                onClick={handleCancelSubscription}
                disabled={loading}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : null}
                Cancel Subscription
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Change Plan Dialog */}
        <Dialog open={showChangeDialog} onOpenChange={setShowChangeDialog}>
          <DialogContent className="bg-[#1a1f1a] border border-white/10">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-white">
                <Calendar className="w-5 h-5 text-[#CCFF00]" />
                Change Billing Period
              </DialogTitle>
              <DialogDescription className="text-white/70">
                Switch to{" "}
                {subscription?.plan_type === "monthly" ? "annual" : "monthly"}{" "}
                billing.
                {subscription?.plan_type === "monthly" ? (
                  <span className="block mt-2 text-green-500">
                    Annual billing saves you money!
                  </span>
                ) : (
                  <span className="block mt-2 text-green-500">
                    Monthly billing offers more flexibility.
                  </span>
                )}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowChangeDialog(false)}
                className="border-white/10 text-white bg-white/5"
              >
                Cancel
              </Button>
              <Button
                onClick={handleChangePlan}
                disabled={loading}
                className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : null}
                Switch to{" "}
                {subscription?.plan_type === "monthly" ? "Annual" : "Monthly"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </PageLayout>
  );
}
