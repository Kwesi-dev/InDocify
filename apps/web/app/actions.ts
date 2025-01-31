"use server";

import { auth, signIn, signOut } from "@/auth";
import { createSupabaseClient } from "@/lib/supabaseClient";

export const logout = async () => {
  return signOut();
};

export const googleSignIn = async () => {
  return signIn("google", { callbackUrl: "/analyse-repo" });
};

export const githubSignIn = async () => {
  return signIn("github");
};

export const sendgridSignIn = async (email: string) => {
  return signIn("sendgrid", { email, callbackUrl: "/analyse-repo" });
};

export const supabaseClient = async () => {
  const session = await auth();
  return createSupabaseClient(session?.supabaseAccessToken as string);
};
