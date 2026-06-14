interface RepoContext {
  owner: string;
  repo: string;
  description: string;
  language: string;
  topics: string[];
  stars: number;
  fileTree: string[];
  existingReadme: string;
}

export function buildReadmePrompt(ctx: RepoContext): string {
  return `You are an expert technical writer. Generate a polished, production-ready README.md for the GitHub repository below.

## Repo Info
- **Owner/Repo**: ${ctx.owner}/${ctx.repo}
- **Description**: ${ctx.description || "No description provided"}
- **Primary Language**: ${ctx.language || "Unknown"}
- **Topics/Tags**: ${ctx.topics.join(", ") || "none"}
- **Stars**: ${ctx.stars}

## File Tree (up to 200 files)
\`\`\`
${ctx.fileTree.slice(0, 80).join("\n")}
\`\`\`

## Existing README
\`\`\`markdown
${ctx.existingReadme || "No existing README"}
\`\`\`

## Instructions
Write a README.md that includes:
1. A clear project title and one-line description
2. Badges (build, license, language)
3. Features section (bullet list)
4. Tech stack table
5. Prerequisites
6. Installation & running locally (with code blocks)
7. Usage examples
8. Project structure (condensed)
9. Contributing guide
10. License

Use real information from the repo. Be specific, not generic. Output only valid Markdown — no explanation, no preamble.`;
}
