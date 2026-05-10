import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function buildPrompt({ meta, readme, fileTree }) {
  const files = fileTree.slice(0, 80).join("\n");

  return `You are a technical writer. Generate a professional, production-quality GitHub README for the repository described below.

Repository metadata:
- Name: ${meta.full_name}
- Description: ${meta.description || "Not provided"}
- Primary language: ${meta.language || "Not detected"}
- Stars: ${meta.stargazers_count}
- Topics: ${(meta.topics || []).join(", ") || "None"}
- License: ${meta.license?.name || "Not specified"}
- Homepage: ${meta.homepage || "None"}

File tree (first 80 entries):
${files}

Existing README (may be empty or incomplete):
---
${readme || "No README found."}
---

Requirements:
1. Output only raw Markdown. No preamble, no explanation, no code fences wrapping the output.
2. Include: project name, shields.io badges, one-paragraph description, quick start with shell commands in fenced code blocks, environment variable table, project structure tree, API endpoints if detectable from the file tree, tech stack table, and license section.
3. Infer the actual tech stack from the file tree and existing README. Do not invent features or endpoints not evidenced by the repository.
4. Use concrete shell commands — no pseudocode or placeholder commands.
5. Write in plain, professional English. No filler phrases.`;
}

export async function generateReadme(repoData) {
  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2048,
    messages: [{ role: "user", content: buildPrompt(repoData) }],
  });

  const block = message.content.find((b) => b.type === "text");
  return block ? block.text : "";
}

