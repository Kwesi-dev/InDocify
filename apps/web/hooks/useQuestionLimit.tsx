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
    queryKey: ["user_question_count", session?.user.email],
    queryFn: async () => {
      if (!supabase || !session) return;
      const { data } = await supabase
        .from("users")
        .select("question_count")
        .eq("email", session?.user.email)
        .maybeSingle();

      if (!data) {
        return null;
      }

      return data?.question_count;
    },
  });

  const updateQuestionCount = async (limit: number) => {
    if (!supabase || !session) return;

    const { error } = await supabase
      .from("users")
      .update({ question_count: limit })
      .eq("email", session?.user.email);

    if (error) {
      console.error(error);
      return null;
    }

    // Invalidate and refetch
    await queryClient.invalidateQueries({
      queryKey: ["user_question_count", session?.user.email],
    });
  };

  return {
    questionCount: data,
    isLimited: data >= 10,
    fetchingCount: isLoading,
    updateQuestionCount,
  };
};

export default useQuestionLimit;
