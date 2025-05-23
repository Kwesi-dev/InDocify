// File: polar-supabase-starter-main/utils/supabase/admin.ts

"use server";

import { api } from "./polar";
import { createClient } from "@supabase/supabase-js";

// Note: supabaseAdmin uses the SERVICE_ROLE_KEY which you must only use in a secure server-side context
// as it has admin privileges and overwrites RLS policies!
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

export const getCustomerfromPolar = async (email: string) => {
  await api.customers.list({
    email: email,
  });
};

const upsertProductRecord = async (payload: any) => {
  const product = payload.data;

  const productData = {
    id: product.id,
    active: !product.isArchived,
    name: product.name,
    description: product.description ?? null,
    image: product.medias?.[0]?.publicUrl ?? null,
    metadata: product.metadata,
  };

  const { error: upsertError } = await supabaseAdmin
    .from("products")
    .upsert([productData]);
  if (upsertError)
    throw new Error(`Product insert/update failed: ${upsertError.message}`);

  const priceData = product.prices.map((price: any) => ({
    id: price.id,
    product_id: product.id,
    price_amount: price.amountType === "fixed" ? price.priceAmount : null,
    type: price.type,
    recurring_interval:
      price.type === "recurring" ? price.recurringInterval : null,
  }));

  const { error: priceUpsertError } = await supabaseAdmin
    .from("prices")
    .upsert(priceData);
  if (priceUpsertError)
    throw new Error(`Price insert/update failed: ${priceUpsertError.message}`);
};

const upsertCustomerToSupabase = async (uuid: string, customerId: string) => {
  const { error: upsertError } = await supabaseAdmin
    .from("customers")
    .upsert([{ id: uuid, polar_customer_id: customerId }]);

  if (upsertError) {
    throw new Error(
      `Supabase customer record creation failed: ${upsertError.message}`
    );
  }

  return customerId;
};

const createCustomerInPolar = async (uuid: string, email: string) => {
  // First, try to find if a customer with this email already exists
  try {
    const response = await api.customers.list({
      email: email,
    });

    if (response?.result?.items && response?.result?.items?.length > 0) {
      console.log(
        `Customer with email ${email} already exists in Polar. Using existing customer.`
      );
      return response?.result?.items[0]?.id;
    }
  } catch (error) {
    console.error("Error checking for existing customer:", error);
    // Continue with creation if lookup fails
  }

  // If no existing customer found, create a new one
  const customerData = {
    metadata: { supabaseUUID: uuid },
    email: email,
    // Removing organizationId as it's not needed with an organization token
    // and causes the API validation error
  };

  try {
    const newCustomer = await api.customers.create(customerData);
    if (!newCustomer) throw new Error("Polar customer creation failed.");
    return newCustomer.id;
  } catch (error) {
    console.error("Error creating customer:", error);
    // If creation fails due to duplicate email, try to find the customer again
    if (
      error instanceof Error &&
      error.message.includes("email address already exists")
    ) {
      const response = await api.customers.list({
        email: email,
      });

      if (response?.result?.items && response?.result?.items?.length > 0) {
        return response?.result?.items[0]?.id;
      }
    }
    throw error; // Re-throw if we couldn't recover
  }
};

const createOrRetrieveCustomer = async ({
  email,
  uuid,
}: {
  email: string;
  uuid: string;
}) => {
  // Check if the customer already exists in Supabase
  const { data: existingSupabaseCustomer, error: queryError } =
    await supabaseAdmin
      .from("customers")
      .select("*")
      .eq("id", uuid)
      .maybeSingle();

  if (queryError) {
    throw new Error(`Supabase customer lookup failed: ${queryError.message}`);
  }

  // Retrieve the Polar customer ID using the Supabase customer ID, with email fallback
  let polarCustomerId: string | undefined;
  if (existingSupabaseCustomer?.polar_customer_id) {
    const existingPolarCustomer = await api.customers.get({
      id: existingSupabaseCustomer.polar_customer_id,
    });
    polarCustomerId = existingPolarCustomer.id;
  }

  // If still no polarCustomerId, create a new customer in Polar
  const polarIdToInsert = polarCustomerId
    ? polarCustomerId
    : await createCustomerInPolar(uuid, email);
  if (!polarIdToInsert) throw new Error("Polar customer creation failed.");

  if (existingSupabaseCustomer && polarCustomerId) {
    // If Supabase has a record but doesn't match Polar, update Supabase record
    if (existingSupabaseCustomer.polar_customer_id !== polarCustomerId) {
      const { error: updateError } = await supabaseAdmin
        .from("customers")
        .update({ polar_customer_id: polarCustomerId })
        .eq("id", uuid);

      if (updateError)
        throw new Error(
          `Supabase customer record update failed: ${updateError.message}`
        );
      console.warn(
        `Supabase customer record mismatched Polar ID. Supabase record updated.`
      );
    }
    // If Supabase has a record and matches Polar, return Polar customer ID
    return polarCustomerId;
  } else {
    console.warn(
      `Supabase customer record was missing. A new record was created.`
    );

    // If Supabase has no record, create a new record and return Polar customer ID
    const upsertedPolarCustomer = await upsertCustomerToSupabase(
      uuid,
      polarIdToInsert
    );
    if (!upsertedPolarCustomer)
      throw new Error("Supabase customer record creation failed.");

    return upsertedPolarCustomer;
  }
};

const manageSubscriptionStatusChange = async (payload: any) => {
  const polarCustomerId = payload.data.customer.id;

  // Get customer's UUID from mapping table.
  let { data: customerData, error: noCustomerError } = await supabaseAdmin
    .from("customers")
    .select("id")
    .eq("polar_customer_id", polarCustomerId)
    .single();

  if (noCustomerError || !customerData) {
    const createdCustomerId = await createOrRetrieveCustomer({
      email: payload.data.customer.email,
      uuid: payload.data.metadata["customerId"] as string,
    });

    customerData = { id: createdCustomerId };
  }

  const subscription = payload.data;

  // Upsert the latest status of the subscription object.
  const subscriptionData = {
    id: subscription.id,
    user_id: customerData.id,
    status: subscription.status,
    price_id: subscription.price.id,
    cancel_at_period_end: subscription.cancelAtPeriodEnd,
    cancel_at:
      subscription.cancelAtPeriodEnd && subscription.currentPeriodEnd
        ? subscription.currentPeriodEnd.toISOString()
        : null,
    current_period_start: subscription.currentPeriodStart.toISOString(),
    current_period_end: subscription.currentPeriodEnd
      ? subscription.currentPeriodEnd.toISOString()
      : undefined,
    created: subscription.createdAt.toISOString(),
    ended_at: subscription.endedAt ? subscription.endedAt.toISOString() : null,
  };

  const { error: upsertError } = await supabaseAdmin
    .from("subscriptions")
    .upsert([subscriptionData]);
  if (upsertError)
    throw new Error(
      `Subscription insert/update failed: ${upsertError.message}`
    );
  console.log(
    `Inserted/updated subscription [${subscription.id}] for user [${customerData.id}]`
  );
};

export {
  upsertProductRecord,
  createOrRetrieveCustomer,
  manageSubscriptionStatusChange,
};
