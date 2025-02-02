import { auth } from "@/auth";
import PageContent from "./page-content";
import { redirect } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabaseClient";

const page = async () => {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  if (session) {
    const supabase = createSupabaseClient(
      session?.supabaseAccessToken as string
    );
    //check to see if at aleast the user has a record count
    const data = await supabase
      .from("github_docs")
      .select("id")
      .eq("email", session?.user?.email)
      .limit(1)
      .single();
    console.log("dataaa", data);
    if (data.data?.id) {
      redirect("/repo-talkroom");
    }
  }

  return <PageContent />;
};

export default page;
