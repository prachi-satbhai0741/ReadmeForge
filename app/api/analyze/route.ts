import { NextRequest, NextResponse } from "next/server";
import { parseRepoUrl, getRepoMeta, getReadme, getFileTree } from "@/lib/github";
import { scoreReadme } from "@/lib/scorer";
import { buildReadmePrompt } from "@/lib/prompts";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: "url is required" }, { status: 400 });

    const { owner, repo } = parseRepoUrl(url);
    const [meta, readme, fileTree] = await Promise.all([
      getRepoMeta(owner, repo),
      getReadme(owner, repo),
      getFileTree(owner, repo),
    ]);

    const score = scoreReadme(readme, fileTree);
    const prompt = buildReadmePrompt({
      owner, repo,
      description: meta.description ?? "",
      language: meta.language ?? "",
      topics: meta.topics ?? [],
      stars: meta.stargazers_count ?? 0,
      fileTree,
      existingReadme: readme,
    });

    const response = await fetch(
      "https://models.inference.ai.azure.com/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.GITHUB_TOKEN,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 2048,
        }),
      }
    );

    const data = await response.json();
    const generatedReadme = data.choices?.[0]?.message?.content ?? "";

    return NextResponse.json({
      score,
      generatedReadme,
      originalReadme: readme,
      repoName: owner + "/" + repo,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
