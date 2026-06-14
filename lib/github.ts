const GH_API = "https://api.github.com";

function headers() {
  const h: Record<string, string> = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) h["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

export async function getRepoMeta(owner: string, repo: string) {
  const res = await fetch(`${GH_API}/repos/${owner}/${repo}`, { headers: headers() });
  if (!res.ok) throw new Error(`GitHub repo not found: ${owner}/${repo}`);
  return res.json();
}

export async function getReadme(owner: string, repo: string): Promise<string> {
  const res = await fetch(`${GH_API}/repos/${owner}/${repo}/readme`, { headers: headers() });
  if (!res.ok) return "";
  const data = await res.json();
  return Buffer.from(data.content, "base64").toString("utf-8");
}

export async function getFileTree(owner: string, repo: string): Promise<string[]> {
  const res = await fetch(
    `${GH_API}/repos/${owner}/${repo}/git/trees/HEAD?recursive=1`,
    { headers: headers() }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return (data.tree as { path: string; type: string }[])
    .filter((f) => f.type === "blob")
    .map((f) => f.path)
    .slice(0, 200); // cap to avoid huge trees
}

export function parseRepoUrl(url: string): { owner: string; repo: string } {
  const u = new URL(url);
  const [, owner, repo] = u.pathname.split("/");
  return { owner, repo: repo.replace(/\.git$/, "") };
}
