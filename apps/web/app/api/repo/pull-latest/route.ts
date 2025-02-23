import { auth } from "@/auth";
import { createSupabaseClient } from "@/lib/supabaseClient";
import { fetchAndProcessZipRepo, generateDocs } from "@/app/agents/new/actions";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const url = new URL(req.url);
    const owner = url.searchParams.get("owner");
    const repo = url.searchParams.get("repo");

    if (!owner || !repo) {
      return NextResponse.json(
        { error: "Owner and repo parameters are required" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseClient(
      session.supabaseAccessToken as string
    );
    if (!supabase) {
      return NextResponse.json(
        { error: "Failed to initialize database connection" },
        { status: 500 }
      );
    }

    // Fetch latest files from GitHub
    const files = await fetchAndProcessZipRepo(owner, repo);
    if (!files || files.length === 0) {
      return NextResponse.json({
        success: true,
        noUpdates: true,
        message: "Repository is already up to date.",
      });
    }

    const processedFiles = files.map((file) => ({
      path: file.path,
      content: JSON.stringify(file.content),
      repo: repo,
      owner: owner,
      email: session.user.email as string,
    }));

    // Get repository metadata
    const metadataResponse = await fetch(
      `${url.origin}/api/repo/metadata?owner=${owner}&repo=${repo}`
    );
    const metadata = await metadataResponse.json();

    // Find README file
    const readmeFile = files.find((file) =>
      file.path.toLowerCase().includes("readme.md")
    );
    const docsRes = await generateDocs(readmeFile?.content || "");

    // Begin database transaction
    const { error: deleteError } = await supabase
      .from("github_files")
      .delete()
      .eq("repo", repo)
      .eq("owner", owner)
      .eq("email", session.user.email);

    if (deleteError) {
      return NextResponse.json(
        { error: `Failed to delete old files: ${deleteError.message}` },
        { status: 500 }
      );
    }

    // Insert new files
    const { error: filesError } = await supabase
      .from("github_files")
      .insert(processedFiles);

    if (filesError) {
      return NextResponse.json(
        { error: `Failed to save new files: ${filesError.message}` },
        { status: 500 }
      );
    }

    // Update documentation
    const { error: docsError } = await supabase
      .from("github_docs")
      .update({
        readme: docsRes,
        metadata: JSON.stringify({
          ...metadata,
          totalFiles: files.length,
          lastUpdated: new Date().toISOString(),
        }),
      })
      .eq("repo", repo)
      .eq("owner", owner)
      .eq("email", session.user.email);

    if (docsError) {
      return NextResponse.json(
        { error: `Failed to update documentation: ${docsError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      totalFiles: files.length,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Error pulling latest changes:", error);
    return NextResponse.json(
      { error: error.message || "Failed to pull latest changes" },
      { status: 500 }
    );
  }
}
