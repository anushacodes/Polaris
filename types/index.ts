// ─────────────────────────────────────────────────────────────────────────────
// City Agent — Shared TypeScript Types
// ─────────────────────────────────────────────────────────────────────────────

export interface NeighborhoodScore {
  safety:      number; // 0–10
  transit:     number; // 0–10
  vibe:        number; // 0–10
  walkability: number; // 0–10
  cafes:       number; // 0–10
}

export interface NeighborhoodCard {
  id:          string;
  name:        string;
  city:        string;
  country:     string;
  countryCode: string;
  matchPct:    number;
  scores:      NeighborhoodScore;
  rentLow:     string;
  rentHigh:    string;
  rentCurrency:string;
  rentPeriod:  string;
  aiQuote:     string;
  tags:        VibeTag[];
  gradient:    string;
}

export interface VibeTag {
  label: string;
  emoji: string;
}

export interface ExamplePrompt {
  id:     string;
  text:   string;
  city:   string;
  emoji:  string;
  color:  string; // tailwind bg class for icon background
  prompt: string; // full prompt to fill into search
}

export interface HowItWorksStep {
  number:      string;
  title:       string;
  description: string;
}

export interface ChatMessage {
  id:      string;
  role:    "user" | "ai";
  content: string;
  chips?:  RecoChip[];
}

export interface RecoChip {
  label: string;
  color: string; // hex
}

export interface CityBadge {
  name:   string;
  flag:   string;
  status: "live" | "coming-soon";
}

export interface NavLink {
  label: string;
  href:  string;
}

export interface FooterLink {
  label: string;
  href:  string;
}

export type ScoreColorKey = "blue" | "teal" | "amber" | "rose" | "slate";
