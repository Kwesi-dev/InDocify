"use client";

import { createClient } from "@supabase/supabase-js";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

export const useSupabase = () => {
  const { data: session } = useSession();

  const supabase = useMemo(() => {
    if (!session?.supabaseAccessToken) {
      return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
    }
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${session?.supabaseAccessToken}`,
          },
        },
      }
    );
  }, [session?.supabaseAccessToken]);

  return supabase;
};
