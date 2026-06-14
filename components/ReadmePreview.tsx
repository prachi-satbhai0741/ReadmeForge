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
    <div className="relative z-10 w-full max-w-2xl mx-auto px-4 mt-6">
      <div className="glass rounded-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3">
            {/* macOS dots */}
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
            </div>
            <span className="mono text-xs" style={{ color: '#64748b' }}>README.md</span>
          </div>
          <button
            onClick={handleCopy}
            className="px-4 py-1.5 rounded-lg mono text-xs font-medium transition-all"
            style={{
              background: copied
                ? 'rgba(6,182,212,0.2)'
                : 'rgba(124,58,237,0.2)',
              color: copied ? '#06b6d4' : '#a855f7',
              border: `1px solid ${copied ? '#06b6d422' : '#7c3aed33'}`,
            }}
          >
            {copied ? "✓ Copied!" : "Copy Markdown"}
          </button>
        </div>

        {/* Content */}
        <pre className="p-5 mono text-xs leading-relaxed whitespace-pre-wrap overflow-x-auto max-h-96 overflow-y-auto"
          style={{ color: '#94a3b8' }}>
          {markdown}
        </pre>
      </div>
    </div>
  );
}
