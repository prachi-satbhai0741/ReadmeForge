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

const DIM_COLORS = ["#7c3aed", "#06b6d4", "#ec4899", "#a855f7"];

function ScoreBar({ score, max, color }: { score: number; max: number; color: string }) {
  const pct = Math.round((score / max) * 100);
  return (
    <div className="w-full rounded-full h-1.5 mt-2" style={{ background: 'rgba(255,255,255,0.06)' }}>
      <div
        className="h-1.5 rounded-full transition-all duration-1000"
        style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}99, ${color})` }}
      />
    </div>
  );
}

export default function ScoreCard({ total, dimensions }: Props) {
  const grade = total >= 85 ? "A" : total >= 70 ? "B" : total >= 55 ? "C" : total >= 40 ? "D" : "F";
  const gradeColor = total >= 85 ? "#06b6d4" : total >= 70 ? "#a855f7" : total >= 55 ? "#f59e0b" : "#f87171";

  return (
    <div className="relative z-10 w-full max-w-2xl mx-auto px-4 mt-10">
      <div className="glass rounded-2xl overflow-hidden">

        {/* Top gradient bar */}
        <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #7c3aed, #06b6d4)' }} />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="mono text-xs uppercase tracking-widest mb-1" style={{ color: '#64748b' }}>
                README Score
              </p>
              <h2 className="text-lg font-semibold text-white">Analysis Complete</h2>
            </div>
            <div className="text-right">
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold grad-text">{total}</span>
                <span className="text-xl mb-1" style={{ color: '#64748b' }}>/100</span>
                <span className="text-4xl font-bold mb-0.5" style={{ color: gradeColor }}>{grade}</span>
              </div>
            </div>
          </div>

          {/* Dimensions */}
          <ul className="space-y-5">
            {dimensions.map((d, i) => (
              <li key={d.label}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: DIM_COLORS[i] }} />
                    <span className="text-sm font-medium text-slate-200">{d.label}</span>
                  </div>
                  <span className="mono text-xs" style={{ color: DIM_COLORS[i] }}>
                    {d.score}/{d.max}
                  </span>
                </div>
                <ScoreBar score={d.score} max={d.max} color={DIM_COLORS[i]} />
                {d.feedback && (
                  <p className="mt-1.5 text-xs" style={{ color: '#64748b' }}>{d.feedback}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
