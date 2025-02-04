"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseClient } from "./supabaseClient";
import { getSupabaseAccessToken } from "@/app/actions";

export const SupabaseClientContext = createContext<SupabaseClient<
  any,
  "public",
  any
> | null>(null);

const SupabaseClientProvider = ({
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
        const token = (await getSupabaseAccessToken()) as string;
        setSupabaseClient(createSupabaseClient(token));
      }
    })();
  }, [supabaseClient]);

  return (
    <SupabaseClientContext.Provider value={supabaseClient}>
      {children}
    </SupabaseClientContext.Provider>
  );
};

export const useSupabaseClient = () => useContext(SupabaseClientContext);

export default SupabaseClientProvider;
