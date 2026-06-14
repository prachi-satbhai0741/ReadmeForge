export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center pt-24 pb-16 px-4 text-center overflow-hidden">
      {/* Glow blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-700/20 rounded-full blur-3xl pointer-events-none" />

      <span className="inline-block mb-4 px-3 py-1 text-xs font-mono font-medium tracking-widest uppercase text-brand-500 border border-brand-700/50 rounded-full bg-brand-900/30">
        AI-Powered Developer Tool
      </span>

      <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight max-w-3xl">
        Your README,{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-cyan-400">
          scored &amp; reforged
        </span>
      </h1>

      <p className="mt-6 text-lg text-slate-400 max-w-xl leading-relaxed">
        Paste any public GitHub repo URL. Get an instant score across 4 dimensions —
        then let Claude generate a production-ready README in seconds.
      </p>

      {/* Score dimension pills */}
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {["Completeness", "Setup Instructions", "Clarity", "Badges"].map((d) => (
          <span
            key={d}
            className="px-3 py-1 text-sm font-mono text-slate-300 bg-slate-800/60 border border-slate-700/50 rounded-full"
          >
            {d}
          </span>
        ))}
      </div>
    </section>
  );
}
