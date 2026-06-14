export default function HeroSection() {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center pt-20 pb-10 px-4 text-center">

      {/* Badge */}
      <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass mono text-xs tracking-widest uppercase"
        style={{ color: '#a855f7' }}>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse inline-block" />
        AI-Powered Developer Tool
      </div>

      {/* Headline */}
      <h1 className="text-5xl sm:text-7xl font-bold leading-[1.05] tracking-tight max-w-4xl">
        Your README,{" "}
        <br />
        <span className="grad-text">scored & reforged</span>
      </h1>

      {/* Sub */}
      <p className="mt-6 text-lg sm:text-xl max-w-xl leading-relaxed" style={{ color: '#94a3b8' }}>
        Paste any public GitHub repo URL — get an instant score across{" "}
        <span style={{ color: '#a855f7' }}>4 dimensions</span>, then generate a
        polished README with{" "}
        <span style={{ color: '#06b6d4' }}>Claude AI</span>.
      </p>

      {/* Dimension pills */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {[
          { label: "Completeness", color: "#7c3aed" },
          { label: "Setup Instructions", color: "#06b6d4" },
          { label: "Clarity", color: "#ec4899" },
          { label: "Badges", color: "#a855f7" },
        ].map((d) => (
          <span
            key={d.label}
            className="px-4 py-2 rounded-full mono text-xs font-medium glass"
            style={{ color: d.color, borderColor: d.color + '33', border: `1px solid ${d.color}44` }}
          >
            {d.label}
          </span>
        ))}
      </div>

      {/* Score preview card — decorative */}
      <div className="mt-12 float">
        <div className="glass rounded-2xl px-6 py-4 inline-flex items-center gap-4"
          style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}>
          <div className="text-left">
            <p className="mono text-xs" style={{ color: '#64748b' }}>README Score</p>
            <p className="text-3xl font-bold grad-text">87<span className="text-base font-normal" style={{color:'#64748b'}}>/100</span></p>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-left">
            <p className="mono text-xs" style={{ color: '#64748b' }}>Grade</p>
            <p className="text-3xl font-bold" style={{ color: '#a855f7' }}>A</p>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-left">
            <p className="mono text-xs" style={{ color: '#64748b' }}>Status</p>
            <p className="text-sm font-semibold" style={{ color: '#06b6d4' }}>Generated ✓</p>
          </div>
        </div>
      </div>
    </section>
  );
}
