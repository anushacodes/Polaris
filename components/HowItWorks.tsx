// ─── Step Visual Illustrations ───────────────────────────────────────────────

function StepOneVisual() {
  return (
    <div className="w-full h-full bg-white flex flex-col justify-center gap-3 p-5" aria-hidden="true">
      <div className="flex items-center gap-2.5 bg-blue-50 rounded-xl px-4 py-3">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-[pulseRing_2s_ease-in-out_infinite]" />
        <span className="text-[12px] text-slate-600">I'm a remote worker in Mumbai…</span>
      </div>
      <div className="flex flex-wrap gap-1.5 justify-center">
        {["Safety", "Cafes", "Nightlife", "₹60k", "Transit"].map((tag) => (
          <span
            key={tag}
            className="text-[11px] px-2.5 py-1 rounded-full border border-slate-200 text-slate-500 bg-white"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

interface BarItem {
  label:  string;
  value:  number;
  color:  string;
  width:  string;
}

const BARS: BarItem[] = [
  { label: "Safety",       value: 8.8, color: "bg-blue-500",  width: "88%" },
  { label: "Transit",      value: 9.2, color: "bg-teal-500",  width: "92%" },
  { label: "Cafes",        value: 8.0, color: "bg-amber-500", width: "80%" },
  { label: "Nightlife",    value: 9.5, color: "bg-rose-500",  width: "95%" },
  { label: "Affordability",value: 7.2, color: "bg-blue-400",  width: "72%" },
];

function StepTwoVisual() {
  return (
    <div className="w-full h-full bg-white flex flex-col justify-center gap-2 p-5" aria-hidden="true">
      {BARS.map((bar) => (
        <div key={bar.label} className="flex items-center gap-2.5">
          <span className="text-[11px] text-slate-400 w-[72px] flex-shrink-0">{bar.label}</span>
          <div className="flex-1 h-[5px] bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${bar.color}`} style={{ width: bar.width }} />
          </div>
          <span className="text-[11px] font-medium text-slate-600 w-6 text-right">{bar.value}</span>
        </div>
      ))}
    </div>
  );
}

interface MiniCard {
  name:     string;
  match:    number;
  barWidth: string;
}

const MINI_CARDS: MiniCard[] = [
  { name: "Bandra West", match: 92, barWidth: "92%" },
  { name: "Powai",       match: 84, barWidth: "84%" },
  { name: "Colaba",      match: 76, barWidth: "76%" },
];

function StepThreeVisual() {
  return (
    <div className="w-full h-full bg-white flex flex-col justify-center gap-2 p-5" aria-hidden="true">
      {MINI_CARDS.map((card) => (
        <div
          key={card.name}
          className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-xl px-3.5 py-2.5"
        >
          <div className="min-w-0 flex-1">
            <div className="text-[12px] font-medium text-slate-800">{card.name}</div>
            <div className="h-[3px] bg-slate-200 rounded-full mt-1.5 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400"
                style={{ width: card.barWidth }}
              />
            </div>
          </div>
          <span className="ml-3 text-[12px] font-semibold text-blue-600 flex-shrink-0">
            {card.match}%
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Step Item ────────────────────────────────────────────────────────────────

interface StepProps {
  stepNumber:  string;
  title:       string;
  description: string;
  visual:      React.ReactNode;
  isLast?:     boolean;
}

function Step({ stepNumber, title, description, visual, isLast = false }: StepProps) {
  return (
    <div className="relative flex flex-col">
      {/* Connector line (desktop, between steps) */}
      {!isLast && (
        <div
          className="hidden lg:block absolute top-[5.5rem] left-[calc(100%+1rem)] w-8 h-px border-t border-dashed border-slate-300 z-10"
          aria-hidden="true"
        />
      )}

      {/* Step number */}
      <p className="text-[11px] font-semibold tracking-[0.07em] uppercase text-blue-600 mb-4">
        {stepNumber}
      </p>

      {/* Illustration box */}
      <div
        className="w-full aspect-[4/3] rounded-2xl border border-slate-200 overflow-hidden mb-5 bg-slate-50"
        aria-hidden="true"
      >
        {visual}
      </div>

      {/* Text */}
      <h3 className="text-[17px] font-medium text-slate-900 mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-[14px] text-slate-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

const STEPS: Omit<StepProps, "isLast">[] = [
  {
    stepNumber:  "Step 01 — Describe yourself",
    title:       "Tell us how you live",
    description: "Type naturally — your budget, work style, lifestyle, and what actually matters to you. No dropdowns. No filters.",
    visual:      <StepOneVisual />,
  },
  {
    stepNumber:  "Step 02 — AI analysis",
    title:       "AI scores every dimension",
    description: "Our model weighs safety, rent, transit, community, culture, and lifestyle across dozens of neighborhoods.",
    visual:      <StepTwoVisual />,
  },
  {
    stepNumber:  "Step 03 — Your matches",
    title:       "See ranked recommendations",
    description: "Scored cards with AI-written explanations, vibe tags, rent ranges, and a full neighborhood profile.",
    visual:      <StepThreeVisual />,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 px-5 sm:px-6 bg-slate-50/80"
      aria-labelledby="how-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-slate-400 mb-3">
            How it works
          </p>
          <h2
            id="how-heading"
            className="text-[clamp(26px,4vw,38px)] font-light tracking-tight text-slate-900 leading-[1.15]"
          >
            Three steps.{" "}
            <em className="font-display font-normal not-italic text-blue-600">
              One perfect neighborhood.
            </em>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 relative">
          {STEPS.map((step, i) => (
            <Step
              key={step.stepNumber}
              {...step}
              isLast={i === STEPS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
