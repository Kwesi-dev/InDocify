"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseClientNoAuth } from "./supabaseClient";

export const SupabaseClientContext = createContext<SupabaseClient<
  any,
  "public",
  any
> | null>(null);

const PublicSupabaseClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [supabaseClient, setSupabaseClient] = useState<SupabaseClient<
    any,
    "public",
    any
  > | null>(null);

  useEffect(() => {
    (async () => {
      if (!supabaseClient) {
        setSupabaseClient(createSupabaseClientNoAuth());
      }
    })();
  }, [supabaseClient]);

  return (
    <SupabaseClientContext.Provider value={supabaseClient}>
      {children}
    </SupabaseClientContext.Provider>
  );
};

export const usePublicSupabaseClient = () => useContext(SupabaseClientContext);

export default PublicSupabaseClientProvider;
