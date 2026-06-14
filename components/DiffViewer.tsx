"use client";
import { useState } from "react";

interface Props {
  original: string;
  generated: string;
}

export default function DiffViewer({ original, generated }: Props) {
  const [view, setView] = useState<"original" | "generated">("generated");

  return (
    <div className="relative z-10 w-full max-w-2xl mx-auto px-4 mt-6 pb-16">
      <div className="glass rounded-2xl overflow-hidden">

        {/* Tabs */}
        <div className="flex" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {(["original", "generated"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setView(tab)}
              className="flex-1 py-3.5 mono text-xs font-medium capitalize transition-all relative"
              style={{
                color: view === tab ? '#a855f7' : '#64748b',
                background: view === tab ? 'rgba(124,58,237,0.08)' : 'transparent',
              }}
            >
              {tab === "original" ? "⬛ Original" : "✦ Generated"}
              {view === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: 'linear-gradient(90deg, #7c3aed, #06b6d4)' }} />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <pre className="p-5 mono text-xs leading-relaxed whitespace-pre-wrap overflow-x-auto max-h-96 overflow-y-auto"
          style={{ color: '#94a3b8' }}>
          {view === "original"
            ? original || "— no existing README found —"
            : generated}
        </pre>
      </div>
    </div>
  );
}
