import { auth } from "@/auth";
import LoginPageContent from "./page-content";
import { redirect } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabaseClient";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    ["next-repo-url"]?: string;
    repo?: string;
    owner?: string;
  }>;
}) => {
  const session = await auth();

  const { ["next-repo-url"]: nextRepoUrl, repo, owner } = await searchParams;

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

    if (nextRepoUrl && repo) {
      if (owner) {
        redirect(
          `/repo-extraction?next-repo-url=${nextRepoUrl}&repo=${repo}&owner=${owner}`
        );
      } else {
        redirect(`/repo-extraction?next-repo-url=${nextRepoUrl}&repo=${repo}`);
      }
    } else {
      if (data.data?.id) {
        redirect("/repo-talkroom");
      }
      redirect("/");
    }
  }
  return <LoginPageContent />;
};

export default page;
