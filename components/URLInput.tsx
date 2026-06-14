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
      if (parts.length < 2) return "URL must include owner/repo.";
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
    <div className="relative z-10 w-full max-w-2xl mx-auto px-4 mt-8">
      {/* Gradient border wrapper */}
      <div className="p-px rounded-2xl" style={{
        background: 'linear-gradient(135deg, rgba(124,58,237,0.6), rgba(6,182,212,0.6))'
      }}>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-0 rounded-2xl overflow-hidden"
          style={{ background: '#0d1117' }}
        >
          <input
            type="text"
            value={url}
            onChange={(e) => { setUrl(e.target.value); setError(""); }}
            placeholder="https://github.com/owner/repo"
            className="flex-1 px-5 py-4 bg-transparent text-slate-100 placeholder-slate-600 mono text-sm focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-4 font-semibold text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all whitespace-nowrap"
            style={{
              background: loading
                ? 'rgba(124,58,237,0.4)'
                : 'linear-gradient(135deg, #7c3aed, #06b6d4)',
            }}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Analyzing…
              </span>
            ) : "Analyze →"}
          </button>
        </form>
      </div>

      {error && (
        <p className="mt-3 text-sm mono text-center" style={{ color: '#f87171' }}>
          ⚠ {error}
        </p>
      )}
    </div>
  );
}
