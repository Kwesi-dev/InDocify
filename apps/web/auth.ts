import { SupabaseAdapter } from "@auth/supabase-adapter";
import NextAuth, { NextAuthResult } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import jwt from "jsonwebtoken";
import { createSupabaseClient } from "./lib/supabaseClient";
import { encryptToken } from "./utils";

const result = NextAuth({
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL as string,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  }),
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      authorization: {
        url: "https://github.com/login/oauth/authorize",
        params: { scope: "user:email repo read:org" },
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      const signingSecret = process.env.SUPABASE_JWT_SECRET;

      if (signingSecret) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: "authenticated",
        };
        session.supabaseAccessToken = jwt.sign(payload, signingSecret);

        const supabase = createSupabaseClient(session.supabaseAccessToken);
        const { data } = await supabase
          .from("users")
          .select("github_access_token")
          .eq("email", user.email)
          .single();

        if (data?.github_access_token) {
          // Encrypt the token before storing in session
          session.githubAccessToken = encryptToken(data.github_access_token);
        }
      }

      return session;
    },
  },
  pages: {
    verifyRequest: "/verify-request",
  },
});

export const handlers: NextAuthResult["handlers"] = result.handlers;
export const auth: NextAuthResult["auth"] = result.auth;
export const signIn: NextAuthResult["signIn"] = result.signIn;
export const signOut: NextAuthResult["signOut"] = result.signOut;
