import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function middleware(request: Request) {
  const supabase = createServerComponentClient({ cookies });
  const session = await getSession();

  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check if user is subscribed
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", session.user.id)
    .single();

  if (!subscription || subscription.status !== "active") {
    return NextResponse.redirect(new URL("/subscription", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/connect-github",
};
