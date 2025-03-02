import { auth } from "@/auth";
import { decryptToken } from "@/utils";

export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  const owner = params.get("owner");
  const repo = params.get("repo");

  if (!owner || !repo) {
    return new Response("Missing parameters", { status: 400 });
  }
  const session = await auth();
  const encryptedToken = session?.githubAccessToken as string;
  const accessToken = encryptedToken
    ? decryptToken(encryptedToken)
    : process.env.GITHUB_API_KEY;
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    const sizeInKb = data.size;
    const sizeInMb = Math.ceil(sizeInKb / 1024);

    console.log("size in mb", sizeInMb);
    return new Response(JSON.stringify(sizeInMb));
  } catch (error) {
    console.log(
      "error importing repo size ",
      error,
      `https://api.github.com/repos/${owner}/${repo}`
    );
  }
}
