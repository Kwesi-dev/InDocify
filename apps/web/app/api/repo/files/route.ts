import { auth } from "@/auth";
import { NextRequest } from "next/server";
import pThrottle from "p-throttle";

const exemptedfiles = [
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  "pnpm-workspace.yaml",
  "bun.lockb",
  "components.json",
  ".gitignore",
];

const exemptedDirs = [
  ".next",
  ".vercel",
  ".vercel_build_output",
  ".github",
  ".turbo",
  "public",
  "node_modules",
  "dist",
  "tests",
];

async function fetchFileContent(file: any, headers: HeadersInit) {
  const response = await fetch(file.url, { headers });
  const fileData = await response.json();

  if (fileData.encoding === "base64") {
    return { ...file, content: atob(fileData.content) };
  }
  return file;
}

async function fetchAllFilesWithContent(
  repoContentsUrl: string,
  headers: HeadersInit
) {
  let allFiles: any[] = [];

  async function traverse(url: string) {
    const response = await fetch(url, { headers });
    const items = await response.json();

    if (items?.message === "This repository is empty.") {
      return allFiles;
    }
    const filePromises = items.map(async (item: any) => {
      if (exemptedfiles.includes(item.name)) {
        return;
      }
      if (item.type === "file") {
        return fetchFileContent(item, headers);
      } else if (item.type === "dir" && !exemptedDirs.includes(item.name)) {
        await traverse(item.url);
      }
    });

    // Process files and directories concurrently
    const resolvedFiles = await Promise.all(filePromises);
    allFiles = allFiles.concat(resolvedFiles.filter(Boolean));
  }

  await traverse(repoContentsUrl);
  return allFiles;
}
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const owner = searchParams.get("owner");
  const repo = searchParams.get("repo");
  const session = await auth();
  const accessToken = session?.githubAccessToken as string;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const files = await fetchAllFilesWithContent(
      `https://api.github.com/repos/${owner}/${repo}/contents`,
      headers
    );
    console.log("all files", files);
    return new Response(JSON.stringify(files));
  } catch (error) {
    console.log(error);
  }
}
