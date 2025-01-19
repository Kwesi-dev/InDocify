import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  const accessToken = session?.githubAccessToken as string;
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
    return new Response(JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}
