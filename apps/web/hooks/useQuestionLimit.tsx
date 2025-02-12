"use client";

import { useSupabaseClient } from "@/lib/SupabaseClientProvider";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useQuestionLimit = () => {
  const { data: session } = useSession();
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    enabled: !!(supabase && session),
    queryKey: ["user_count", session?.user.email],
    queryFn: async () => {
      if (!supabase || !session) return;
      const { data } = await supabase
        .from("users")
        .select("question_count")
        .eq("email", session?.user.email)
        .single();

      if (!data) {
        return null;
      }

      return data?.question_count;
    },
  });

  const updateQuestionCount = async (limit: number) => {
    if (!supabase || !session) return;

    const { error } = await supabase.from("users").upsert(
      { question_count: limit, email: session?.user.email },
      {
        ignoreDuplicates: false,
        onConflict: "email",
      }
    );
    if (error) {
      console.error(error);
      return null;
    }

    queryClient.invalidateQueries({
      queryKey: ["user_count", session?.user.email],
    });
  };

  return {
    questionCount: data,
    isLimited: data >= 5,
    fetchingCount: isLoading,
    updateQuestionCount,
  };
};

export default useQuestionLimit;
