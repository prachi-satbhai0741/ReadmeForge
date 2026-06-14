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
    <main className="min-h-screen relative">
      {/* Noise texture overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.4\'/%3E%3C/svg%3E")' }} />

      <HeroSection />

      {/* Mode toggle */}
      <div className="relative z-10 flex justify-center gap-2 px-4 mt-2 mb-2">
        {[
          { key: "score", label: "Score only", sub: "free" },
          { key: "full", label: "Score + Generate", sub: "Claude AI" },
        ].map((m) => (
          <button
            key={m.key}
            onClick={() => setActiveMode(m.key as "score" | "full")}
            className="px-5 py-2.5 rounded-xl mono text-xs font-medium transition-all"
            style={{
              background: activeMode === m.key
                ? 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.3))'
                : 'rgba(255,255,255,0.04)',
              border: activeMode === m.key
                ? '1px solid rgba(124,58,237,0.5)'
                : '1px solid rgba(255,255,255,0.08)',
              color: activeMode === m.key ? '#e2e8f0' : '#64748b',
            }}
          >
            {m.label}{" "}
            <span style={{ color: activeMode === m.key ? '#06b6d4' : '#475569' }}>
              ({m.sub})
            </span>
          </button>
        ))}
      </div>

      <URLInput onSubmit={handleSubmit} loading={mode === "loading"} />

      {error && (
        <p className="relative z-10 text-center mt-6 mono text-sm px-4" style={{ color: '#f87171' }}>
          ⚠ {error}
        </p>
      )}

      {mode === "loading" && (
        <div className="relative z-10 flex flex-col items-center mt-12 gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-transparent animate-spin"
            style={{ borderTopColor: '#7c3aed', borderRightColor: '#06b6d4' }} />
          <p className="mono text-sm" style={{ color: '#64748b' }}>
            {activeMode === "score"
              ? "Fetching repo and scoring README…"
              : "Fetching repo, scoring and generating with Claude…"}
          </p>
        </div>
      )}

      {result && mode !== "idle" && mode !== "loading" && (
        <>
          <ScoreCard total={result.score.total} dimensions={result.score.dimensions} />
          {result.generatedReadme && (
            <>
              <ReadmePreview markdown={result.generatedReadme} />
              <DiffViewer original={result.originalReadme} generated={result.generatedReadme} />
            </>
          )}
        </>
      )}
    </main>
  );
}
