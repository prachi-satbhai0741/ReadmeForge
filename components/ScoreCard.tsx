interface Dimension {
  label: string;
  score: number;
  max: number;
  feedback: string;
}

interface Props {
  total: number;
  dimensions: Dimension[];
}

function ScoreBar({ score, max }: { score: number; max: number }) {
  const pct = Math.round((score / max) * 100);
  const color =
    pct >= 75 ? "bg-emerald-500" : pct >= 50 ? "bg-yellow-500" : "bg-red-500";
  return (
    <div className="w-full bg-slate-700/50 rounded-full h-1.5 mt-1">
      <div
        className={`${color} h-1.5 rounded-full transition-all duration-700`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export default function ScoreCard({ total, dimensions }: Props) {
  const grade =
    total >= 85 ? "A" : total >= 70 ? "B" : total >= 55 ? "C" : total >= 40 ? "D" : "F";

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-10">
      <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 backdrop-blur p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">README Score</h2>
          <div className="flex items-end gap-1">
            <span className="text-4xl font-bold text-white">{total}</span>
            <span className="text-slate-400 text-sm mb-1">/100</span>
            <span className="ml-2 text-2xl font-bold text-brand-500">{grade}</span>
          </div>
        </div>

        {/* Dimensions */}
        <ul className="space-y-4">
          {dimensions.map((d) => (
            <li key={d.label}>
              <div className="flex justify-between text-sm">
                <span className="text-slate-300 font-medium">{d.label}</span>
                <span className="font-mono text-slate-400">
                  {d.score}/{d.max}
                </span>
              </div>
              <ScoreBar score={d.score} max={d.max} />
              {d.feedback && (
                <p className="mt-1 text-xs text-slate-500">{d.feedback}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
