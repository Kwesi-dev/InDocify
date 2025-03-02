import { auth } from "@/auth";

export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  const owner = params.get("owner");
  const repo = params.get("repo");

  console.log(
    `https://api.github.com/repos/${owner}/${repo}`,
    "fetching repo size"
  );

  if (!owner || !repo) {
    return new Response("Missing parameters", { status: 400 });
  }
  const session = await auth();
  const accessToken =
    (session?.githubAccessToken as string) || process.env.GITHUB_API_KEY;
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    const sizeInKb = data.size;
    const sizeInMb = Math.ceil(sizeInKb / 1024);

    return new Response(JSON.stringify(sizeInMb));
  } catch (error) {
    console.log(
      "error importing repo size ",
      error,
      `https://api.github.com/repos/${owner}/${repo}`
    );
  }
}
