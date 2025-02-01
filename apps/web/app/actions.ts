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
