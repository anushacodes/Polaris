import type { CityBadge } from "@/types";
import { CITIES } from "@/lib/data";

// ─── Globe SVG ────────────────────────────────────────────────────────────────

function GlobeSVG() {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Outer circle */}
      <circle cx="100" cy="100" r="80" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1" />

      {/* Grid lines */}
      <ellipse cx="100" cy="100" rx="40" ry="80" fill="none" stroke="#DBEAFE" strokeWidth="0.75" />
      <ellipse cx="100" cy="100" rx="80" ry="80" fill="none" stroke="#DBEAFE" strokeWidth="0.75" />
      <line x1="20" y1="100" x2="180" y2="100" stroke="#DBEAFE" strokeWidth="0.75" />
      <line x1="100" y1="20" x2="100" y2="180" stroke="#DBEAFE" strokeWidth="0.75" />
      <ellipse cx="100" cy="100" rx="80" ry="28" fill="none" stroke="#DBEAFE" strokeWidth="0.75" />

      {/* City dots — live */}
      <circle cx="116" cy="86" r="5" fill="#3B82F6" opacity="0.9" />
      <circle cx="116" cy="86" r="9" fill="none" stroke="#3B82F6" strokeWidth="1" opacity="0.25" />

      <circle cx="80"  cy="70" r="4" fill="#14B8A6" opacity="0.9" />
      <circle cx="80"  cy="70" r="7" fill="none" stroke="#14B8A6" strokeWidth="1" opacity="0.25" />

      <circle cx="68"  cy="73" r="4" fill="#F5A623" opacity="0.9" />
      <circle cx="68"  cy="73" r="7" fill="none" stroke="#F5A623" strokeWidth="1" opacity="0.25" />

      {/* City dots — coming soon (muted) */}
      <circle cx="128" cy="77" r="3" fill="#93C5FD" opacity="0.6" />
      <circle cx="140" cy="92" r="2.5" fill="#93C5FD" opacity="0.5" />
      <circle cx="122" cy="95" r="2.5" fill="#93C5FD" opacity="0.5" />
      <circle cx="112" cy="78" r="2"   fill="#93C5FD" opacity="0.4" />
    </svg>
  );
}

// ─── City Badge ───────────────────────────────────────────────────────────────

function CityBadgeItem({ city }: { city: CityBadge }) {
  const isLive = city.status === "live";
  return (
    <div
      className={`inline-flex items-center gap-2 text-[13px] px-4 py-2 rounded-full border transition-colors ${
        isLive
          ? "border-slate-200 text-slate-700 bg-white shadow-soft-sm"
          : "border-dashed border-slate-200 text-slate-400 bg-transparent"
      }`}
      aria-label={`${city.name} — ${isLive ? "available now" : "coming soon"}`}
    >
      <span aria-hidden="true">{city.flag}</span>
      {city.name}
      {!isLive && (
        <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">
          soon
        </span>
      )}
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function GlobalCoverage() {
  const liveCities   = CITIES.filter((c) => c.status === "live");
  const comingCities = CITIES.filter((c) => c.status === "coming-soon");

  return (
    <section
      id="cities"
      className="py-20 px-5 sm:px-6"
      aria-labelledby="globe-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

          {/* Globe illustration */}
          <div
            className="w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] flex-shrink-0 mx-auto lg:mx-0"
            aria-hidden="true"
          >
            <GlobeSVG />
          </div>

          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-slate-400 mb-3">
              Coverage
            </p>
            <h2
              id="globe-heading"
              className="text-[clamp(26px,4vw,38px)] font-light tracking-tight text-slate-900 leading-[1.15] mb-4"
            >
              Trained on real cities.{" "}
              <em className="font-display font-normal not-italic text-blue-600">
                Expanding worldwide.
              </em>
            </h2>
            <p className="text-[15px] text-slate-500 leading-relaxed max-w-lg mb-8">
              Currently covering select neighborhoods in Mumbai, Toronto, and New York City — 
              with global expansion on the roadmap.
            </p>

            {/* Live cities */}
            <div className="mb-4">
              <p className="text-[12px] font-medium text-slate-400 mb-3">Live now</p>
              <ul
                className="flex flex-wrap gap-2 justify-center lg:justify-start"
                role="list"
                aria-label="Cities available now"
              >
                {liveCities.map((city) => (
                  <li key={city.name} role="listitem">
                    <CityBadgeItem city={city} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Coming soon */}
            <div>
              <p className="text-[12px] font-medium text-slate-400 mb-3">Coming soon</p>
              <ul
                className="flex flex-wrap gap-2 justify-center lg:justify-start"
                role="list"
                aria-label="Cities coming soon"
              >
                {comingCities.map((city) => (
                  <li key={city.name} role="listitem">
                    <CityBadgeItem city={city} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
