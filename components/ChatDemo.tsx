"use client";

import { useState } from "react";
import type { ChatMessage, RecoChip } from "@/types";
import { DEMO_CHAT } from "@/lib/data";

// ─── Avatar ───────────────────────────────────────────────────────────────────

interface AvatarProps {
  role: "user" | "ai";
}

function Avatar({ role }: AvatarProps) {
  if (role === "ai") {
    return (
      <div
        className="w-8 h-8 rounded-full flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-[11px] font-semibold shadow-brand"
        aria-hidden="true"
      >
        AI
      </div>
    );
  }
  return (
    <div
      className="w-8 h-8 rounded-full flex-shrink-0 bg-slate-100 flex items-center justify-center text-slate-600 text-[11px] font-semibold"
      aria-hidden="true"
    >
      You
    </div>
  );
}

// ─── Reco Chip ────────────────────────────────────────────────────────────────

function RecoChipButton({ chip }: { chip: RecoChip }) {
  return (
    <button className="flex items-center gap-2 text-[13px] font-medium text-slate-700 bg-white border border-slate-200 px-3.5 py-2 rounded-xl hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition-all duration-150">
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: chip.color }}
        aria-hidden="true"
      />
      {chip.label}
    </button>
  );
}

// ─── Message Bubble ───────────────────────────────────────────────────────────

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
      role="article"
      aria-label={`${isUser ? "Your" : "City Agent"} message`}
    >
      <Avatar role={message.role} />
      <div className={`max-w-[74%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-2`}>
        <div
          className={`px-4 py-3 rounded-2xl text-[14px] leading-relaxed ${
            isUser
              ? "bg-blue-600 text-white bubble-user"
              : "bg-white border border-slate-200 text-slate-800 bubble-ai shadow-soft-sm"
          }`}
        >
          {message.content}
        </div>

        {/* Reco chips */}
        {message.chips && message.chips.length > 0 && (
          <div
            className="flex flex-wrap gap-2"
            role="list"
            aria-label="Recommended neighborhoods"
          >
            {message.chips.map((chip) => (
              <div key={chip.label} role="listitem">
                <RecoChipButton chip={chip} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Typing Indicator ─────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3" aria-live="polite" aria-label="City Agent is typing">
      <Avatar role="ai" />
      <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl bubble-ai shadow-soft-sm flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-blue-400"
            style={{ animation: `pulseRing 1.2s ease-in-out ${i * 0.2}s infinite` }}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function ChatDemo() {
  const [inputValue,   setInputValue]   = useState("");
  const [messages,     setMessages]     = useState<ChatMessage[]>(DEMO_CHAT);
  const [isTyping,     setIsTyping]     = useState(false);

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id:      `u-${Date.now()}`,
      role:    "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id:      `a-${Date.now()}`,
        role:    "ai",
        content: "Great question! Based on your priorities, I can dig deeper into that neighborhood. Try the full search above to get a personalized breakdown with scores, rent ranges, and insider tips.",
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <section
      className="py-20 px-5 sm:px-6 bg-slate-50/80"
      aria-labelledby="chat-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-slate-400 mb-3">
            The AI agent
          </p>
          <h2
            id="chat-heading"
            className="text-[clamp(26px,4vw,38px)] font-light tracking-tight text-slate-900 leading-[1.15] mb-3"
          >
            Ask anything.{" "}
            <em className="font-display font-normal not-italic text-blue-600">
              It actually understands.
            </em>
          </h2>
          <p className="text-[16px] text-slate-500 max-w-md leading-relaxed">
            City Agent reads lifestyle, personality, and priorities — not just filter checkboxes.
          </p>
        </div>

        {/* Chat shell */}
        <div
          className="max-w-[680px] mx-auto bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-soft-xl"
          role="log"
          aria-label="AI conversation demo"
          aria-live="polite"
        >
          {/* Top bar */}
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-slate-100" aria-hidden="true">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
            </div>
            <div className="text-[13px] font-medium text-slate-700">City Agent</div>
            <div className="text-[12px] text-teal-500 ml-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              Online
            </div>
          </div>

          {/* Messages */}
          <div className="flex flex-col gap-5 p-5">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {isTyping && <TypingIndicator />}
          </div>

          {/* Input */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-t border-slate-100">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about any neighborhood, city, or lifestyle…"
              className="flex-1 text-[14px] font-sans border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 bg-slate-50 outline-none focus:border-blue-300 focus:bg-white placeholder:text-slate-400 transition-all"
              aria-label="Type your question"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="w-9 h-9 flex-shrink-0 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-brand hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              aria-label="Send message"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 8l12-5.5-4.5 5.5 4.5 5.5L2 8z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
