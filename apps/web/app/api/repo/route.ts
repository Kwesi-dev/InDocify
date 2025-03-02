import { auth } from "@/auth";
import { createSupabaseClient } from "@/lib/supabaseClient";
import { decryptToken } from "@/utils";

export async function GET() {
  const session = await auth();
  const encryptedToken = session?.githubAccessToken as string;
  const accessToken = encryptedToken
    ? decryptToken(encryptedToken)
    : process.env.GITHUB_API_KEY;
  const supabase = createSupabaseClient(session?.supabaseAccessToken as string);
  try {
    const res = await fetch(
      `https://api.github.com/user/repos?sort=created&direction=desc`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await res.json();
    const filteredData = data.filter((repo: any) => repo !== null);
    const repos = filteredData.map((repo: any) => {
      return {
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        email: session?.user?.email,
      };
    });
    //save repos to supabase
    const { error } = await supabase.from("github_repos").upsert(repos, {
      onConflict: "name,email",
    });
    if (error) {
      console.log("error", error);
    }

    return new Response(JSON.stringify(repos));
  } catch (error) {
    console.log(error);
  }
}
