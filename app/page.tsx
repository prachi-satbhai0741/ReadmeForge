"use client";
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import URLInput from "@/components/URLInput";
import ScoreCard from "@/components/ScoreCard";
import ReadmePreview from "@/components/ReadmePreview";
import DiffViewer from "@/components/DiffViewer";
import { analyzeRepo, scoreOnly, type AnalyzeResponse } from "@/lib/api";

type Mode = "idle" | "loading" | "scored" | "full";

export default function Home() {
  const [mode, setMode] = useState<Mode>("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [activeMode, setActiveMode] = useState<"score" | "full">("full");

  async function handleSubmit(url: string) {
    setMode("loading");
    setError("");
    try {
      if (activeMode === "score") {
        const data = await scoreOnly(url);
        setResult({ ...data, generatedReadme: "" });
        setMode("scored");
      } else {
        const data = await analyzeRepo(url);
        setResult(data);
        setMode("full");
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setMode("idle");
    }
  }

  return (
    <main className="min-h-screen pb-24">
      <HeroSection />

      {/* Mode toggle */}
      <div className="flex justify-center gap-3 px-4 mb-6">
        <button
          onClick={() => setActiveMode("score")}
          className={`text-xs px-4 py-2 rounded-full border font-mono transition ${
            activeMode === "score"
              ? "border-brand-500 text-brand-400 bg-brand-900/30"
              : "border-slate-700 text-slate-400 hover:border-slate-500"
          }`}
        >
          Score only (free)
        </button>
        <button
          onClick={() => setActiveMode("full")}
          className={`text-xs px-4 py-2 rounded-full border font-mono transition ${
            activeMode === "full"
              ? "border-brand-500 text-brand-400 bg-brand-900/30"
              : "border-slate-700 text-slate-400 hover:border-slate-500"
          }`}
        >
          Score + Generate (Claude)
        </button>
      </div>

      <URLInput onSubmit={handleSubmit} loading={mode === "loading"} />

      {error && (
        <p className="text-center mt-6 text-red-400 font-mono text-sm px-4">
          ⚠ {error}
        </p>
      )}

      {mode === "loading" && (
        <p className="text-center mt-10 text-slate-400 font-mono text-sm animate-pulse">
          {activeMode === "score"
            ? "Fetching repo and scoring README…"
            : "Fetching repo, scoring, and generating with Claude…"}
        </p>
      )}

      {result && mode !== "idle" && mode !== "loading" && (
        <>
          <ScoreCard
            total={result.score.total}
            dimensions={result.score.dimensions}
          />
          {result.generatedReadme && (
            <>
              <ReadmePreview markdown={result.generatedReadme} />
              <DiffViewer
                original={result.originalReadme}
                generated={result.generatedReadme}
              />
            </>
          )}
        </>
      )}
    </main>
  );
}
