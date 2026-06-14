"use client";
import { useState } from "react";

interface Props {
  onSubmit: (url: string) => void;
  loading: boolean;
}

export default function URLInput({ onSubmit, loading }: Props) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  function validate(value: string) {
    if (!value.trim()) return "Paste a GitHub repo URL to get started.";
    try {
      const u = new URL(value);
      if (!u.hostname.includes("github.com")) return "Must be a github.com URL.";
      const parts = u.pathname.split("/").filter(Boolean);
      if (parts.length < 2) return "URL must include owner/repo (e.g. github.com/owner/repo).";
    } catch {
      return "That doesn't look like a valid URL.";
    }
    return "";
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate(url);
    if (err) { setError(err); return; }
    setError("");
    onSubmit(url.trim());
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={url}
          onChange={(e) => { setUrl(e.target.value); setError(""); }}
          placeholder="https://github.com/owner/repo"
          className="flex-1 px-4 py-3 rounded-lg bg-slate-800/70 border border-slate-700 text-slate-100 placeholder-slate-500 font-mono text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-lg bg-brand-600 hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition whitespace-nowrap"
        >
          {loading ? "Analyzing…" : "Analyze →"}
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-red-400 font-mono">{error}</p>}
    </div>
  );
}
