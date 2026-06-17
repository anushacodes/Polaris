"use client";

import type { NeighborhoodCard, NeighborhoodScore } from "@/types";
import { NEIGHBORHOODS } from "@/lib/data";

// ─── Score Ring ───────────────────────────────────────────────────────────────

interface ScoreRingProps {
  value:    number;
  label:    string;
  color:    string; // tailwind stroke color as hex
  size?:    number;
}

function ScoreRing({ value, label, color, size = 48 }: ScoreRingProps) {
  const radius      = 18;
  const circumference = 2 * Math.PI * radius;
  const filled      = (value / 10) * circumference;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          className="-rotate-90"
          aria-hidden="true"
        >
          <circle
            cx="24" cy="24" r={radius}
            fill="none"
            stroke="#F1F1F6"
            strokeWidth="4"
          />
          <circle
            cx="24" cy="24" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${filled} ${circumference}`}
            className="ring-progress"
          />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center text-[13px] font-semibold text-slate-800"
          aria-hidden="true"
        >
          {value}
        </span>
      </div>
      <span className="text-[11px] text-slate-400 text-center leading-tight">{label}</span>
      <span className="sr-only">{label}: {value} out of 10</span>
    </div>
  );
}

// ─── Vibe Tag ─────────────────────────────────────────────────────────────────

function VibeTag({ emoji, label }: { emoji: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-[12px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
      <span aria-hidden="true">{emoji}</span>
      {label}
    </span>
  );
}

// ─── Match Badge ─────────────────────────────────────────────────────────────

function MatchBadge({ pct }: { pct: number }) {
  return (
    <div
      className="glass-dark rounded-full px-3 py-1.5 text-[12px] font-semibold text-white absolute top-3.5 right-3.5"
      aria-label={`${pct}% match`}
    >
      {pct}% match
    </div>
  );
}

// ─── Skyline SVG ─────────────────────────────────────────────────────────────

function SkylineSVG() {
  return (
    <svg
      aria-hidden="true"
      style={{ position: "absolute", bottom: 0, left: 0, right: 0, width: "100%", opacity: 0.22 }}
      viewBox="0 0 400 80"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMax slice"
    >
      <rect x="10"  y="30" width="18" height="50" fill="#fff" rx="1" />
      <rect x="14"  y="20" width="10" height="12" fill="#fff" rx="1" />
      <rect x="36"  y="14" width="28" height="66" fill="#fff" rx="1" />
      <rect x="41"  y="7"  width="18" height="9"  fill="#fff" rx="1" />
      <rect x="48"  y="2"  width="6"  height="7"  fill="#fff" rx="1" />
      <rect x="72"  y="38" width="16" height="42" fill="#fff" rx="1" />
      <rect x="98"  y="22" width="22" height="58" fill="#fff" rx="1" />
      <rect x="103" y="16" width="12" height="8"  fill="#fff" rx="1" />
      <rect x="130" y="8"  width="26" height="72" fill="#fff" rx="1" />
      <rect x="136" y="2"  width="14" height="8"  fill="#fff" rx="1" />
      <rect x="166" y="33" width="14" height="47" fill="#fff" rx="1" />
      <rect x="190" y="18" width="20" height="62" fill="#fff" rx="1" />
      <rect x="220" y="38" width="14" height="42" fill="#fff" rx="1" />
      <rect x="244" y="26" width="18" height="54" fill="#fff" rx="1" />
      <rect x="249" y="18" width="8"  height="10" fill="#fff" rx="1" />
      <rect x="272" y="16" width="24" height="64" fill="#fff" rx="1" />
      <rect x="277" y="8"  width="14" height="10" fill="#fff" rx="1" />
      <rect x="306" y="35" width="16" height="45" fill="#fff" rx="1" />
      <rect x="332" y="20" width="20" height="60" fill="#fff" rx="1" />
      <rect x="337" y="12" width="10" height="10" fill="#fff" rx="1" />
      <rect x="362" y="30" width="24" height="50" fill="#fff" rx="1" />
    </svg>
  );
}

// ─── Score key → hex color ────────────────────────────────────────────────────

const SCORE_COLORS: [keyof NeighborhoodScore, string, string][] = [
  ["safety",  "Safety",  "#3B82F6"],
  ["transit", "Transit", "#14B8A6"],
  ["vibe",    "Vibe",    "#F5A623"],
];

// ─── Single Card ──────────────────────────────────────────────────────────────

function NeighborhoodCardItem({ card }: { card: NeighborhoodCard }) {
  return (
    <article
      className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-soft-sm hover:shadow-soft-xl hover:-translate-y-1 transition-all duration-200 flex flex-col"
      aria-label={`${card.name}, ${card.city} — ${card.matchPct}% match`}
    >
      {/* Header gradient */}
      <div
        className={`relative h-[160px] sm:h-[170px] flex items-end p-4 bg-gradient-to-br ${card.gradient}`}
      >
        <SkylineSVG />
        <MatchBadge pct={card.matchPct} />
        <div className="relative z-10">
          <h3 className="text-[20px] font-medium text-white leading-tight">{card.name}</h3>
          <p className="text-[12px] text-white/65 mt-0.5">
            {card.city}, {card.country}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Score rings */}
        <div
          className="flex items-center justify-around mb-4"
          role="group"
          aria-label={`Scores for ${card.name}`}
        >
          {SCORE_COLORS.map(([key, label, color]) => (
            <ScoreRing
              key={key}
              value={card.scores[key]}
              label={label}
              color={color}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-100 mb-4" aria-hidden="true" />

        {/* AI Quote */}
        <blockquote className="text-[13px] text-slate-600 italic leading-relaxed border-l-2 border-blue-200 pl-3 mb-4">
          "{card.aiQuote}"
        </blockquote>

        {/* Tags */}
        <div
          className="flex flex-wrap gap-1.5 mb-4"
          role="list"
          aria-label={`${card.name} vibe tags`}
        >
          {card.tags.map((tag) => (
            <div key={tag.label} role="listitem">
              <VibeTag {...tag} />
            </div>
          ))}
        </div>

        {/* Rent */}
        <p className="text-[13px] text-slate-400 mb-4 mt-auto">
          Avg. rent{" "}
          <strong className="text-[15px] font-semibold text-slate-800">
            {card.rentCurrency}{card.rentLow}–{card.rentHigh}
          </strong>
          <span className="text-slate-400 text-[12px]"> / {card.rentPeriod}</span>
        </p>

        {/* CTA */}
        <button
          className="w-full py-2.5 text-[13px] font-medium text-slate-700 border border-slate-200 rounded-xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-150"
          aria-label={`View full profile for ${card.name}`}
        >
          View full profile →
        </button>
      </div>
    </article>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function NeighborhoodCards() {
  return (
    <section
      id="neighborhoods"
      className="py-20 px-5 sm:px-6"
      aria-labelledby="cards-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-slate-400 mb-3">
            Example matches
          </p>
          <h2
            id="cards-heading"
            className="text-[clamp(26px,4vw,38px)] font-light tracking-tight text-slate-900 leading-[1.15] mb-3"
          >
            Neighborhoods that{" "}
            <em className="font-display font-normal not-italic text-blue-600">
              know who you are
            </em>
          </h2>
          <p className="text-[16px] text-slate-500 max-w-md leading-relaxed">
            Each recommendation is scored, explained, and personalized — not just listed.
          </p>
        </div>

        {/* Grid */}
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          role="list"
          aria-label="Neighborhood recommendation examples"
        >
          {NEIGHBORHOODS.map((card) => (
            <li key={card.id} role="listitem">
              <NeighborhoodCardItem card={card} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
