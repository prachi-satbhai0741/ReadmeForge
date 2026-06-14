"use client";
import { useState } from "react";

interface Props {
  markdown: string;
}

export default function ReadmePreview({ markdown }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-8">
      <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 backdrop-blur">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/60">
          <span className="text-sm font-semibold text-white">Generated README</span>
          <button
            onClick={handleCopy}
            className="text-xs px-3 py-1.5 rounded-md bg-brand-600 hover:bg-brand-500 text-white font-medium transition"
          >
            {copied ? "Copied ✓" : "Copy Markdown"}
          </button>
        </div>

        {/* Raw markdown */}
        <pre className="p-4 text-sm font-mono text-slate-300 whitespace-pre-wrap overflow-x-auto max-h-[500px] overflow-y-auto">
          {markdown}
        </pre>
      </div>
    </div>
  );
}
