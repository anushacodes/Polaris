"use client";

import { useCallback } from "react";
import type { ExamplePrompt } from "@/types";
import { EXAMPLE_PROMPTS } from "@/lib/data";

// ─── Prompt Card ──────────────────────────────────────────────────────────────

interface PromptCardProps {
  prompt:  ExamplePrompt;
  onClick: (prompt: string) => void;
}

function PromptCard({ prompt, onClick }: PromptCardProps) {
  return (
    <button
      onClick={() => onClick(prompt.prompt)}
      className="group flex items-start gap-4 p-5 bg-white border border-slate-200 rounded-2xl text-left cursor-pointer hover:border-blue-200 hover:shadow-soft hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-200 w-full"
      aria-label={`Use prompt: ${prompt.text} — ${prompt.city}`}
    >
      {/* Icon */}
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center text-[18px] flex-shrink-0 ${prompt.color}`}
        aria-hidden="true"
      >
        {prompt.emoji}
      </div>

      {/* Text */}
      <div className="min-w-0">
        <p className="text-[14px] text-slate-700 leading-[1.5] group-hover:text-slate-900 transition-colors line-clamp-2">
          {prompt.text}
        </p>
        <p className="text-[12px] text-slate-400 mt-1.5 font-medium">{prompt.city}</p>
      </div>

      {/* Arrow */}
      <div
        className="ml-auto text-slate-300 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-0.5"
        aria-hidden="true"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </button>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function ExamplePrompts() {
  const handlePromptClick = useCallback((prompt: string) => {
    const input = document.getElementById("search-input") as HTMLTextAreaElement | null;
    if (input) {
      input.value = prompt;
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.focus();
    }
    document.getElementById("search")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  return (
    <section
      className="py-20 px-5 sm:px-6"
      aria-labelledby="prompts-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-slate-400 mb-3">
            People are asking
          </p>
          <h2
            id="prompts-heading"
            className="text-[clamp(26px,4vw,38px)] font-light tracking-tight text-slate-900 leading-[1.15] mb-3"
          >
            Every move starts<br className="hidden sm:block" /> with a{" "}
            <em className="font-display font-normal not-italic text-blue-600">question</em>
          </h2>
          <p className="text-[16px] text-slate-500 max-w-md leading-relaxed">
            Tap any example to see how City Agent thinks — or type your own.
          </p>
        </div>

        {/* Grid */}
        <ul
          className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3"
          role="list"
          aria-label="Example search prompts"
        >
          {EXAMPLE_PROMPTS.map((prompt) => (
            <li key={prompt.id} role="listitem">
              <PromptCard prompt={prompt} onClick={handlePromptClick} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
