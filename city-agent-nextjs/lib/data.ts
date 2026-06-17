import type {
  NeighborhoodCard,
  ExamplePrompt,
  ChatMessage,
  CityBadge,
  NavLink,
  FooterLink,
} from "@/types";

// ─── Navigation ──────────────────────────────────────────────────────────────

export const NAV_LINKS: NavLink[] = [
  { label: "How it works", href: "#how-it-works"  },
  { label: "Neighborhoods", href: "#neighborhoods" },
  { label: "Cities",        href: "#cities"        },
];

export const FOOTER_LINKS: FooterLink[] = [
  { label: "About",   href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Contact", href: "#" },
  { label: "GitHub",  href: "https://github.com" },
];

// ─── Example Prompts ─────────────────────────────────────────────────────────

export const EXAMPLE_PROMPTS: ExamplePrompt[] = [
  {
    id:     "remote-mumbai",
    text:   "Best neighborhood for a remote worker who loves cafes and needs fast internet",
    city:   "Mumbai",
    emoji:  "💻",
    color:  "bg-blue-50",
    prompt: "I'm a remote worker moving to Mumbai. I love specialty cafes and need fast internet. Budget is ₹60,000/month.",
  },
  {
    id:     "student-toronto",
    text:   "Safe, affordable area for a student near university and transit",
    city:   "Toronto",
    emoji:  "🎓",
    color:  "bg-teal-50",
    prompt: "I'm a student moving to Toronto. I need a safe area near university with good transit. Budget is CA$1,400/month.",
  },
  {
    id:     "nightlife",
    text:   "Nightlife-first neighborhood without burning through the budget",
    city:   "Mumbai · NYC",
    emoji:  "🌃",
    color:  "bg-rose-50",
    prompt: "I want the best nightlife neighborhood in Mumbai under ₹55,000 a month. Bars, rooftop spots, walkable at night.",
  },
  {
    id:     "family-toronto",
    text:   "Family-friendly with top schools, parks, and fast transit access",
    city:   "Toronto",
    emoji:  "👨‍👩‍👧",
    color:  "bg-sky-50",
    prompt: "I'm moving to Toronto with my family. Two kids under 10. Need top-rated schools, parks, and reliable transit. Budget is CA$3,500.",
  },
  {
    id:     "nomad-nyc",
    text:   "Digital nomad hub — coworking, fast wifi, and great food",
    city:   "New York City",
    emoji:  "🌍",
    color:  "bg-amber-50",
    prompt: "I'm a digital nomad relocating to NYC. Need a neighborhood with coworking spaces, high-speed internet, and amazing food. Budget is $3,000/month.",
  },
  {
    id:     "green-couple",
    text:   "Quiet, green neighborhood with parks — perfect for a couple",
    city:   "Mumbai",
    emoji:  "🌿",
    color:  "bg-teal-50",
    prompt: "My partner and I are moving to Mumbai. We want a quieter, greener neighborhood with parks and low noise. Budget ₹70,000.",
  },
];

// ─── Neighborhood Cards ───────────────────────────────────────────────────────

export const NEIGHBORHOODS: NeighborhoodCard[] = [
  {
    id:           "bandra-west",
    name:         "Bandra West",
    city:         "Mumbai",
    country:      "India",
    countryCode:  "IN",
    matchPct:     92,
    scores: { safety: 8.4, transit: 9.1, vibe: 9.5, walkability: 8.9, cafes: 9.3 },
    rentLow:      "45,000",
    rentHigh:     "70,000",
    rentCurrency: "₹",
    rentPeriod:   "mo",
    aiQuote:
      "Perfect for remote workers who need cafes, walkability, and nightlife within a mid-range Mumbai budget.",
    tags: [
      { label: "Artsy",     emoji: "🎨" },
      { label: "Coastal",   emoji: "🌊" },
      { label: "Cafes",     emoji: "☕" },
      { label: "Nightlife", emoji: "🌃" },
    ],
    gradient: "from-[#0f172a] via-[#1e3a8a] to-[#1e40af]",
  },
  {
    id:           "powai",
    name:         "Powai",
    city:         "Mumbai",
    country:      "India",
    countryCode:  "IN",
    matchPct:     84,
    scores: { safety: 9.0, transit: 7.2, vibe: 8.6, walkability: 7.0, cafes: 7.5 },
    rentLow:      "50,000",
    rentHigh:     "80,000",
    rentCurrency: "₹",
    rentPeriod:   "mo",
    aiQuote:
      "Ideal for tech professionals and families who prioritize safety, green space, and a calm lakeside community.",
    tags: [
      { label: "Lakeside",  emoji: "🏞️" },
      { label: "Tech hub",  emoji: "💻" },
      { label: "Green",     emoji: "🌳" },
      { label: "Families",  emoji: "👨‍👩‍👧" },
    ],
    gradient: "from-[#0d2137] via-[#1a3a52] to-[#0d5e6e]",
  },
  {
    id:           "kensington-market",
    name:         "Kensington Market",
    city:         "Toronto",
    country:      "Canada",
    countryCode:  "CA",
    matchPct:     89,
    scores: { safety: 7.8, transit: 9.3, vibe: 9.7, walkability: 9.4, cafes: 8.8 },
    rentLow:      "1,800",
    rentHigh:     "2,600",
    rentCurrency: "CA$",
    rentPeriod:   "mo",
    aiQuote:
      "Toronto's most bohemian, walkable market neighborhood — beloved by students, creatives, and anyone who hates chain restaurants.",
    tags: [
      { label: "Bohemian",   emoji: "🎭" },
      { label: "Food scene", emoji: "🥘" },
      { label: "Arts",       emoji: "🎨" },
      { label: "Walkable",   emoji: "🚶" },
    ],
    gradient: "from-[#1c1a2e] via-[#2d1f55] to-[#1a0a3a]",
  },
];

// ─── AI Chat Demo ─────────────────────────────────────────────────────────────

export const DEMO_CHAT: ChatMessage[] = [
  {
    id:      "u1",
    role:    "user",
    content: "I want a safe area with good cafes and coworking spaces. Budget is ₹60,000. I work from home.",
  },
  {
    id:      "a1",
    role:    "ai",
    content: "Based on your priorities — remote work, safety, café culture, and a ₹60k budget — here are three neighborhoods in Mumbai worth exploring:",
    chips: [
      { label: "Bandra West",  color: "#3B82F6" },
      { label: "Powai",        color: "#14B8A6" },
      { label: "Colaba",       color: "#F5A623" },
    ],
  },
  {
    id:      "u2",
    role:    "user",
    content: "Which has the best coworking scene?",
  },
  {
    id:      "a2",
    role:    "ai",
    content:
      "Powai leads on coworking — home to Innov8, 91springboard, and tech-campus day passes near Hiranandani. Bandra is stronger for café-work culture (Koinonia, The Pantry). Both fit your budget for a 1BHK. Want a side-by-side comparison?",
  },
];

// ─── Cities ──────────────────────────────────────────────────────────────────

export const CITIES: CityBadge[] = [
  { name: "Mumbai",        flag: "🇮🇳", status: "live"         },
  { name: "Toronto",       flag: "🇨🇦", status: "live"         },
  { name: "New York City", flag: "🇺🇸", status: "live"         },
  { name: "London",        flag: "🇬🇧", status: "coming-soon"  },
  { name: "Singapore",     flag: "🇸🇬", status: "coming-soon"  },
  { name: "Dubai",         flag: "🇦🇪", status: "coming-soon"  },
  { name: "Bangalore",     flag: "🇮🇳", status: "coming-soon"  },
];
