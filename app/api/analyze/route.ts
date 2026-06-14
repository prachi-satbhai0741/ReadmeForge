import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { parseRepoUrl, getRepoMeta, getReadme, getFileTree } from "@/lib/github";
import { scoreReadme } from "@/lib/scorer";
import { buildReadmePrompt } from "@/lib/prompts";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ error: "url is required" }, { status: 400 });
    }

    const { owner, repo } = parseRepoUrl(url);

    const [meta, readme, fileTree] = await Promise.all([
      getRepoMeta(owner, repo),
      getReadme(owner, repo),
      getFileTree(owner, repo),
    ]);

    const score = scoreReadme(readme, fileTree);

    const prompt = buildReadmePrompt({
      owner,
      repo,
      description: meta.description ?? "",
      language: meta.language ?? "",
      topics: meta.topics ?? [],
      stars: meta.stargazers_count ?? 0,
      fileTree,
      existingReadme: readme,
    });

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      messages: [{ role: "user", content: prompt }],
    });

    const generatedReadme =
      message.content[0].type === "text" ? message.content[0].text : "";

    return NextResponse.json({
      score,
      generatedReadme,
      originalReadme: readme,
      repoName: `${owner}/${repo}`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
