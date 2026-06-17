"use client";

import { useState, useRef, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SearchHintPill {
  label:  string;
  prompt: string;
}

const HINTS: SearchHintPill[] = [
  { label: "📍 Mumbai · remote",   prompt: "I'm a remote worker moving to Mumbai. Budget ₹60,000/month. I love cafes and need great internet." },
  { label: "🍁 Toronto · student", prompt: "I'm a student moving to Toronto. I need something safe near university, under CA$1,400/month." },
  { label: "🗽 NYC · professional", prompt: "Young professional relocating to NYC. Budget $3,000/month. I want energy, nightlife, and easy transit." },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function AIBadge() {
  return (
    <div
      className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-[13px] font-medium px-3.5 py-1.5 rounded-full mb-8 select-none"
      aria-label="AI-powered neighborhood discovery"
    >
      <span
        className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-[pulseRing_2s_ease-in-out_infinite]"
        aria-hidden="true"
      />
      AI neighborhood agent
    </div>
  );
}

function SearchIcon() {
  return (
    <div
      className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-brand"
      aria-hidden="true"
    >
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 2.5a.75.75 0 01.75.75v1.5h1.5a.75.75 0 010 1.5h-1.5v1.5a.75.75 0 01-1.5 0V6.25H5.75a.75.75 0 010-1.5h1.5V3.25A.75.75 0 018 2.5zM3.5 9.75a.75.75 0 01.75.75v.5h.5a.75.75 0 010 1.5h-.5v.5a.75.75 0 01-1.5 0v-.5h-.5a.75.75 0 010-1.5h.5v-.5a.75.75 0 01.75-.75zM12.5 10.25a.5.5 0 01.5.5v.5h.5a.5.5 0 010 1h-.5v.5a.5.5 0 01-1 0v-.5h-.5a.5.5 0 010-1h.5v-.5a.5.5 0 01.5-.5z"
          fill="white"
        />
      </svg>
    </div>
  );
}

// ─── Main Hero Component ──────────────────────────────────────────────────────

export default function Hero() {
  const [value,     setValue]     = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef               = useRef<HTMLTextAreaElement>(null);

  const fillPrompt = useCallback((prompt: string) => {
    setValue(prompt);
    textareaRef.current?.focus();
  }, []);

  const handleSearch = useCallback(() => {
    if (!value.trim()) {
      textareaRef.current?.focus();
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      document.getElementById("neighborhoods")?.scrollIntoView({ behavior: "smooth" });
    }, 1800);
  }, [value]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSearch();
      }
    },
    [handleSearch],
  );

  return (
    <section
      className="relative min-h-[100svh] flex flex-col justify-center pt-20 pb-16 px-5 sm:px-6 overflow-hidden"
      aria-labelledby="hero-headline"
    >
      {/* Background gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_900px_700px_at_70%_-5%,rgba(59,130,246,0.10)_0%,transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_700px_500px_at_-5%_90%,rgba(14,184,166,0.07)_0%,transparent_65%)]" />
        {/* Warm horizontal light stripe */}
        <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto w-full text-center">
        <AIBadge />

        <h1
          id="hero-headline"
          className="text-[clamp(34px,6.5vw,68px)] font-light leading-[1.07] tracking-[-0.03em] text-slate-900 mb-5"
        >
          Find the neighborhood<br />
          that{" "}
          <em className="font-display font-normal not-italic text-blue-600">
            fits your life
          </em>
        </h1>

        <p className="text-[clamp(15px,2vw,18px)] text-slate-500 max-w-[500px] mx-auto mb-10 leading-relaxed font-light">
          Describe how you live. Get personalized neighborhood recommendations based on safety, 
          affordability, transit, culture, and community.
        </p>

        {/* ── Search Shell ── */}
        <div
          id="search"
          className="bg-white border border-slate-200 rounded-3xl shadow-soft-xl overflow-hidden max-w-[680px] mx-auto mb-4 transition-shadow duration-200 focus-within:shadow-brand focus-within:border-blue-200"
          role="search"
          aria-label="AI neighborhood search"
        >
          {/* Textarea area */}
          <div className="flex items-start gap-3 p-5 pb-0">
            <SearchIcon />
            <textarea
              ref={textareaRef}
              id="search-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`I'm moving to Mumbai. I work remotely and my budget is ₹60,000. I want cafes, safety, and nightlife.`}
              rows={3}
              className="flex-1 resize-none border-none outline-none font-sans text-[15px] leading-relaxed text-slate-900 placeholder:text-slate-400 bg-transparent"
              aria-label="Describe your lifestyle and preferences"
              aria-describedby="search-hint"
            />
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between gap-3 px-4 py-3.5 border-t border-slate-100 mt-3">
            {/* Hint pills (desktop only) */}
            <div
              className="hidden sm:flex items-center gap-2 overflow-x-auto no-scrollbar"
              role="group"
              aria-label="Quick-fill example searches"
            >
              {HINTS.map((hint) => (
                <button
                  key={hint.label}
                  onClick={() => fillPrompt(hint.prompt)}
                  className="whitespace-nowrap text-[12px] text-slate-400 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all duration-150"
                >
                  {hint.label}
                </button>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="flex-shrink-0 flex items-center gap-2 bg-blue-600 text-white text-[13px] font-medium px-5 py-2.5 rounded-full shadow-brand hover:bg-blue-700 hover:shadow-brand-lg active:scale-95 transition-all duration-150 disabled:opacity-70 disabled:cursor-not-allowed"
              aria-label="Find my neighborhood"
              aria-busy={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" aria-hidden="true" />
                  Analyzing…
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M7 1l1.5 4.5H13L9.5 8l1.5 4.5L7 10l-4 2.5L4.5 8 1 5.5h4.5L7 1z" fill="currentColor" />
                  </svg>
                  Find my neighborhood
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footnote */}
        <p
          id="search-hint"
          className="text-[12px] text-slate-400 text-center"
        >
          No account needed · Instant AI results · Free to use
        </p>

        {/* Mobile hint pills */}
        <div
          className="flex sm:hidden items-center gap-2 overflow-x-auto no-scrollbar mt-4 px-1"
          role="group"
          aria-label="Quick-fill example searches"
        >
          {HINTS.map((hint) => (
            <button
              key={hint.label}
              onClick={() => fillPrompt(hint.prompt)}
              className="flex-shrink-0 text-[12px] text-slate-400 bg-white border border-slate-200 rounded-full px-3 py-1.5 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all"
            >
              {hint.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
