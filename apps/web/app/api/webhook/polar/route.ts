import {
  manageSubscriptionStatusChange,
  upsertProductRecord,
} from "@/lib/polar/actions";
import { Webhooks } from "@polar-sh/nextjs";

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onProductCreated: upsertProductRecord,
  onProductUpdated: upsertProductRecord,
  onSubscriptionUpdated: manageSubscriptionStatusChange,
});
