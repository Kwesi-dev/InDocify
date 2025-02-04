"use server";

import { auth, signIn, signOut } from "@/auth";
import { createSupabaseClient } from "@/lib/supabaseClient";

export const logout = async () => {
  return signOut();
};

export const googleSignIn = async (callbackUrl: string) => {
  return signIn("google", { redirectTo: callbackUrl });
};

export const githubSignIn = async () => {
  return signIn("github");
};

export const sendgridSignIn = async (email: string, callbackUrl: string) => {
  return signIn("sendgrid", { email, redirectTo: callbackUrl });
};

export const supabaseClient = async () => {
  const session = await auth();
  return createSupabaseClient(session?.supabaseAccessToken as string);
};

export const deleteThread = async (threadId: string) => {
  const session = await auth();
  const supabase = createSupabaseClient(session?.supabaseAccessToken as string);

  const { error } = await supabase
    .from("threads")
    .delete()
    .eq("thread_id", threadId);
  if (error) {
    console.log(error);
  }
};

export const renameThread = async (threadId: string, title: string) => {
  const session = await auth();
  const supabase = createSupabaseClient(session?.supabaseAccessToken as string);

  const { data, error } = await supabase
    .from("threads")
    .update({ title })
    .eq("thread_id", threadId)
    .select()
    .single();
  if (error) {
    console.log(error);
  }

  return data;
};

export const getSupabaseAccessToken = async () => {
  "use server";
  const session = await auth();
  return session?.supabaseAccessToken;
};
