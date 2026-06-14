import { NextRequest, NextResponse } from "next/server";
import { parseRepoUrl, getRepoMeta, getReadme, getFileTree } from "@/lib/github";
import { scoreReadme } from "@/lib/scorer";

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl.searchParams.get("url");
    if (!url) {
      return NextResponse.json(
        { error: "url query param is required" },
        { status: 400 }
      );
    }

    const { owner, repo } = parseRepoUrl(url);

    const [, readme, fileTree] = await Promise.all([
      getRepoMeta(owner, repo),
      getReadme(owner, repo),
      getFileTree(owner, repo),
    ]);

    const score = scoreReadme(readme, fileTree);

    return NextResponse.json({
      score,
      originalReadme: readme,
      repoName: `${owner}/${repo}`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
