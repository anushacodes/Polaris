"use client";

import Onboarding from "./Onboarding";

// ─── Sub-components ───────────────────────────────────────────────────────────

function AIBadge() {
  return (
    <div
      className="inline-flex items-center gap-2 bg-blue-600 text-white text-[13px] font-semibold px-4 py-2 rounded-full mb-8 select-none shadow-brand"
      aria-label="AI-powered neighborhood discovery"
    >
      <span
        className="w-2 h-2 rounded-full bg-amber-400 animate-[pulseRing_2s_ease-in-out_infinite]"
        aria-hidden="true"
      />
      AI neighborhood agent
    </div>
  );
}

// ─── Main Hero Component ──────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section
      className="relative min-h-[100svh] flex flex-col justify-center pt-24 pb-16 px-5 sm:px-6 overflow-hidden"
      aria-labelledby="hero-headline"
    >
      {/* Funky, colorful organic blobs — soft, never harsh boxes */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="blob-mask absolute -top-16 -left-10 w-72 h-72 bg-blue-200/50 animate-float" />
        <div className="blob-mask absolute top-10 -right-16 w-80 h-80 bg-sky-200/50" />
        <div className="blob-mask absolute -bottom-20 left-1/4 w-72 h-72 bg-rose-100/60 animate-float" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
        <AIBadge />

        <h1
          id="hero-headline"
          className="text-[clamp(38px,7vw,68px)] font-bold leading-[1.04] tracking-[-0.03em] text-slate-900 mb-5"
        >
          Find the neighborhood<br />
          that{" "}
          <em className="font-display not-italic text-blue-600 relative inline-block">
            fits your life
            <span className="absolute left-0 -bottom-1 w-full h-2.5 bg-amber-400/70 rounded-full -z-10" aria-hidden="true" />
          </em>
        </h1>

        <p className="text-[clamp(15px,1.8vw,17px)] text-slate-600 max-w-[520px] mx-auto mb-10 leading-relaxed">
          Describe how you live. Our lifestyle matching engine matches you with the equivalent neighborhood in your new city.
        </p>

        {/* ── Onboarding Multi-step Form ── */}
        <div id="search" className="text-left">
          <Onboarding />
        </div>
      </div>
    </section>
  );
}
