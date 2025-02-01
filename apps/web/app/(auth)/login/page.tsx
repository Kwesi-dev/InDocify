import { auth } from "@/auth";
import LoginPageContent from "./page-content";
import { redirect } from "next/navigation";

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
  console.log(nextRepoUrl, repo, "server");

  if (session) {
    if (nextRepoUrl && repo) {
      if (owner) {
        redirect(
          `/repo-extraction?next-repo-url=${nextRepoUrl}&repo=${repo}&owner=${owner}`
        );
      } else {
        redirect(`/repo-extraction?next-repo-url=${nextRepoUrl}&repo=${repo}`);
      }
    } else {
      redirect("/analyse-repo");
    }
  }
  return <LoginPageContent />;
};

export default page;
