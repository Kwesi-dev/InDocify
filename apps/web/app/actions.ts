"use server";

import { auth, signIn, signOut } from "@/auth";
import { createSupabaseClient } from "@/lib/supabaseClient";

export const logout = async () => {
  return signOut();
};

export const googleSignIn = async () => {
  return signIn("google", { callbackUrl: "/generate-docs" });
};

export const githubSignIn = async () => {
  return signIn("github");
};

export const sendgridSignIn = async (email: string) => {
  return signIn("sendgrid", { email, callbackUrl: "/generate-docs" });
};

export const supabaseClient = async () => {
  const session = await auth();
  return createSupabaseClient(session?.supabaseAccessToken as string);
};
