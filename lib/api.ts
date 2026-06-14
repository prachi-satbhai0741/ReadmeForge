import type { ScoreResult } from "./scorer";

export interface AnalyzeResponse {
  score: ScoreResult;
  generatedReadme: string;
  originalReadme: string;
  repoName: string;
}

export interface ScoreOnlyResponse {
  score: ScoreResult;
  originalReadme: string;
  repoName: string;
}

export async function analyzeRepo(url: string): Promise<AnalyzeResponse> {
  const res = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(err.error || `Request failed (${res.status})`);
  }
  return res.json();
}

export async function scoreOnly(url: string): Promise<ScoreOnlyResponse> {
  const res = await fetch(
    `/api/score-only?url=${encodeURIComponent(url)}`
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(err.error || `Request failed (${res.status})`);
  }
  return res.json();
}
