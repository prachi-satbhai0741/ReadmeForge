"use client";
import { useState } from "react";

interface Props {
  original: string;
  generated: string;
}

export default function DiffViewer({ original, generated }: Props) {
  const [view, setView] = useState<"original" | "generated">("generated");

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-8">
      <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 backdrop-blur">
        {/* Tab toggle */}
        <div className="flex border-b border-slate-700/60">
          {(["original", "generated"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setView(tab)}
              className={`flex-1 py-2.5 text-sm font-medium capitalize transition ${
                view === tab
                  ? "text-brand-400 border-b-2 border-brand-500"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {tab === "original" ? "Original README" : "Generated README"}
            </button>
          ))}
        </div>

        <pre className="p-4 text-sm font-mono text-slate-300 whitespace-pre-wrap overflow-x-auto max-h-[500px] overflow-y-auto">
          {view === "original" ? original || "— no existing README found —" : generated}
        </pre>
      </div>
    </div>
  );
}
