import { auth } from "@/auth";

export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  const owner = params.get("owner");
  const repo = params.get("repo");

  if (!owner || !repo) {
    return new Response("Missing parameters", { status: 400 });
  }

  const user = await auth();
  const accessToken =
    (user?.githubAccessToken as string) ||
    (process.env.GITHUB_API_KEY as string);

  async function getRepoMetadata(
    owner: string,
    repo: string,
    accessToken: string
  ) {
    const url = `https://api.github.com/repos/${owner}/${repo}`;
    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await fetch(url, { headers });
    const data = await response.json();

    return {
      visibility: data.private ? "Private" : "Public",
      created: data.created_at,
      lastUpdated: data.pushed_at,
      language: data.language,
      about: data.description,
    };
  }

  async function getTotalCommits(
    owner: string,
    repo: string,
    accessToken: string
  ) {
    let url = `https://api.github.com/repos/${owner}/${repo}/commits`;
    const headers = { Authorization: `Bearer ${accessToken}` };
    let totalCommits = 0;

    while (url) {
      const response = await fetch(url, { headers });
      const commits = await response.json();
      totalCommits += commits.length;

      // Check for next page
      const linkHeader = response.headers.get("Link");
      const nextPage = linkHeader?.match(/<([^>]+)>; rel="next"/)?.[1];
      url = nextPage || "";
    }

    return totalCommits;
  }

  async function getTotalBranches(
    owner: string,
    repo: string,
    accessToken: string
  ) {
    const url = `https://api.github.com/repos/${owner}/${repo}/branches`;
    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await fetch(url, { headers });
    const branches = await response.json();

    return branches.length;
  }

  async function getTotalContributors(
    owner: string,
    repo: string,
    accessToken: string
  ) {
    const url = `https://api.github.com/repos/${owner}/${repo}/contributors`;
    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await fetch(url, { headers });
    const contributors = await response.json();

    return contributors.length;
  }

  try {
    const metadata = await Promise.all([
      getRepoMetadata(owner, repo, accessToken),
      getTotalCommits(owner, repo, accessToken),
      getTotalBranches(owner, repo, accessToken),
      getTotalContributors(owner, repo, accessToken),
    ]);

    return new Response(
      JSON.stringify({
        metadata: metadata[0],
        commits: metadata[1],
        branches: metadata[2],
        contributors: metadata[3],
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log("error metadata", error);
    return new Response("Error getting repo metadata", { status: 500 });
  }
}
