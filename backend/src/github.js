import fetch from "node-fetch";

const BASE = "https://api.github.com";

function buildHeaders() {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "ReadmeForge/1.0",
  };
  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function ghFetch(url) {
  const res = await fetch(url, { headers: buildHeaders() });

  if (res.status === 404) {
    const err = new Error("Repository not found.");
    err.status = 404;
    throw err;
  }
  if (res.status === 403) {
    const err = new Error("GitHub API rate limit exceeded. Add a GITHUB_TOKEN to increase the limit.");
    err.status = 403;
    throw err;
  }
  if (!res.ok) {
    const err = new Error(`GitHub API error: ${res.status}`);
    err.status = res.status;
    throw err;
  }

  return res.json();
}

export async function fetchRepoData(owner, repo) {
  const [meta, readmeRaw, tree] = await Promise.allSettled([
    ghFetch(`${BASE}/repos/${owner}/${repo}`),
    ghFetch(`${BASE}/repos/${owner}/${repo}/readme`),
    ghFetch(`${BASE}/repos/${owner}/${repo}/git/trees/HEAD?recursive=1`),
  ]);

  if (meta.status === "rejected") throw meta.reason;

  let readme = "";
  if (readmeRaw.status === "fulfilled" && readmeRaw.value.content) {
    readme = Buffer.from(readmeRaw.value.content, "base64").toString("utf-8");
  }

  const fileTree =
    tree.status === "fulfilled"
      ? tree.value.tree.map((f) => f.path)
      : [];

  return { meta: meta.value, readme, fileTree };
}

