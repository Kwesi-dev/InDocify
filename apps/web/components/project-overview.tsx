import { supabaseClient } from "@/app/actions";
import { MDXRemote } from "next-mdx-remote/rsc";

export default async function ProjectOverview() {
  const supabase = await supabaseClient();
  // MDX text - can be from a database, CMS, fetch, anywhere...
  const { data: repoDocs } = await supabase
    .from("github_docs")
    .select("project_overview")
    .eq("owner", "Kwesi-ops")
    .eq("repo", "blogify-portal")
    .single();

  const markdown = repoDocs?.project_overview;

  return <MDXRemote source={markdown} />;
}
