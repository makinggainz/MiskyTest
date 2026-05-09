"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";

// "How it works" — three-step product lifecycle.
//
// Source: ColumbusPage `/mapsgpt §HowItWorks`. Visuals are reimplemented
// faithfully (image collage, animated typing + staggered place cards,
// heart-cycle + share-sheet) and then re-skinned through the Elio design-
// system exception:
//   – Card surfaces use bg-background (page bg #FCF3E8 via .theme-elio)
//     instead of the source's cool-grey #FFFFFF on #F8F9FA.
//   – Card borders + dividers use the warm Elio companion
//     `--color-elio-border` (#D8C8AE) instead of the cool #E5E7EB family.
//   – Headings drop the cyan/red/teal gradient treatments — plain
//     text-mistral-black, MistX type scale.
//   – Border radii consume MistX tokens (rounded-[20px] cards, rounded-full
//     pills, rounded-[10px] inputs).
//   – Step copy: real product copy where the source had lorem ipsum.
//
// All three visuals run idle animations, identical to the source, so the
// page reads the same way it does on /mapsgpt.

// ── Step 1: Image cluster + chat input ───────────────────────────────────────

const PILL_DATA = [
  { emoji: "🍜", label: "Street food" },
  { emoji: "🏖️", label: "Beach vibes" },
  { emoji: "🎭", label: "Night out" },
  { emoji: "🌿", label: "Eco trail" },
  { emoji: "🛍️", label: "Hidden gems" },
  { emoji: "🗺️", label: "Adventure" },
  { emoji: "☕", label: "Café culture" },
  { emoji: "🎨", label: "Art & culture" },
] as const;

const PILL_POSITIONS = [
  { left: "12.71%", top: "46.48%" },
  { left: "7.32%", top: "0%" },
  { left: "34.98%", top: "89.44%" },
  { left: "67.41%", top: "16.9%" },
  { left: "40.66%", top: "2.58%" },
  { left: "76.08%", top: "60.8%" },
  { left: "64.87%", top: "80.99%" },
  { left: "0%", top: "75.82%" },
] as const;

function ImageCluster() {
  return (
    <div className="relative w-full aspect-[669/426] overflow-visible">
      {/* Center circular image with warm border */}
      <img
        src="/images/elio/how/center.png"
        alt=""
        aria-hidden="true"
        className="absolute rounded-full object-cover w-[21.08%] h-auto"
        style={{
          left: "37.97%",
          top: "39.67%",
          border: "4px solid var(--color-elio-bg-light, #FEF6EB)",
          boxSizing: "border-box",
          aspectRatio: "1",
          boxShadow: "0 6px 18px rgba(60, 40, 20, 0.12)",
        }}
      />
      <img src="/images/elio/how/hidden-gems.jpg" alt="" aria-hidden="true"
        className="absolute w-[16%] h-auto object-cover"
        style={{ left: "34.98%", top: "5.4%", aspectRatio: "107/129", borderRadius: "10px", boxShadow: "0 6px 18px rgba(60, 40, 20, 0.12)" }} />
      <img src="/images/elio/how/5.png" alt="" aria-hidden="true"
        className="absolute w-[16.89%] h-auto"
        style={{ left: "68.46%", top: "41.08%", aspectRatio: "113/135", borderRadius: "14px", boxShadow: "0 6px 18px rgba(60, 40, 20, 0.12)" }} />
      <img src="/images/elio/how/adventure.jpg" alt="" aria-hidden="true"
        className="absolute w-[14.65%] h-auto object-cover"
        style={{ left: "60.09%", top: "15.73%", aspectRatio: "98/97", borderRadius: "10px", boxShadow: "0 6px 18px rgba(60, 40, 20, 0.12)" }} />
      <img src="/images/elio/how/art-culture.jpg" alt="" aria-hidden="true"
        className="absolute w-[16%] h-auto object-cover"
        style={{ left: "56.05%", top: "73.94%", aspectRatio: "107/106", borderRadius: "10px", boxShadow: "0 6px 18px rgba(60, 40, 20, 0.12)" }} />
      <img src="/images/elio/how/beach-vibes.jpg" alt="" aria-hidden="true"
        className="absolute w-[20.03%] h-auto object-cover"
        style={{ left: "8.07%", top: "16.9%", aspectRatio: "134/158", borderRadius: "14px", boxShadow: "0 6px 18px rgba(60, 40, 20, 0.12)" }} />
      <img src="/images/elio/how/cafe-culture.jpg" alt="" aria-hidden="true"
        className="absolute w-[20.03%] h-auto object-cover"
        style={{ left: "11.21%", top: "60.8%", aspectRatio: "134/158", borderRadius: "14px", boxShadow: "0 6px 18px rgba(60, 40, 20, 0.12)" }} />

      {/* Floating category pills */}
      {PILL_POSITIONS.map((pos, i) => {
        const { emoji, label } = PILL_DATA[i];
        return (
          <div
            key={label}
            className="absolute flex items-center justify-center gap-1.5 px-2.5 rounded-full text-[12px] font-medium text-mistral-black/85"
            style={{
              ...pos,
              background: "var(--color-elio-bg-light, #FEF6EB)",
              border: "1px solid var(--color-elio-border, #D8C8AE)",
              boxShadow: "0 4px 12px rgba(60, 40, 20, 0.08)",
              width: "23.92%",
              height: "10.56%",
              minWidth: 80,
              minHeight: 28,
              maxWidth: 160,
              maxHeight: 45,
            }}
          >
            <span className="leading-none shrink-0" aria-hidden="true">{emoji}</span>
            <span className="truncate">{label}</span>
          </div>
        );
      })}
    </div>
  );
}

function ChatInput() {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasText = inputValue.trim().length > 0;

  return (
    <div className="flex flex-col items-center w-full max-w-[593px]">
      <div
        className="relative w-full rounded-[20px] overflow-hidden cursor-text"
        style={{
          background: "var(--color-elio-bg-light, #FEF6EB)",
          border: `1.5px solid ${isFocused ? "var(--color-mistral-orange, #154ACC)" : "var(--color-elio-border, #D8C8AE)"}`,
          boxShadow: isFocused
            ? "0 2px 12px rgba(21, 74, 204, 0.15)"
            : "0 6px 18px rgba(60, 40, 20, 0.10)",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Suggested questions row */}
        <div className="flex items-center justify-center gap-2 px-6" style={{ height: 56 }}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <rect x="1.5" y="1.5" width="17" height="17" rx="4" stroke="var(--color-mistral-orange, #154ACC)" strokeWidth="1.5" />
            <circle cx="6.5" cy="6.5" r="1.25" fill="var(--color-mistral-orange, #154ACC)" />
            <circle cx="13.5" cy="6.5" r="1.25" fill="var(--color-mistral-orange, #154ACC)" />
            <circle cx="10" cy="10" r="1.25" fill="var(--color-mistral-orange, #154ACC)" />
            <circle cx="6.5" cy="13.5" r="1.25" fill="var(--color-mistral-orange, #154ACC)" />
            <circle cx="13.5" cy="13.5" r="1.25" fill="var(--color-mistral-orange, #154ACC)" />
          </svg>
          <span className="text-sm font-semibold" style={{ color: "var(--color-mistral-orange, #154ACC)" }}>Suggested questions</span>
        </div>
        <div style={{ height: 1, background: "var(--color-elio-border, #D8C8AE)" }} />

        {/* Input row */}
        <div className="flex items-center gap-3 px-4 bg-background" style={{ height: 64 }}>
          <div
            className="flex items-center justify-center shrink-0 rounded-full"
            style={{ width: 36, height: 36, border: "1.5px solid var(--color-elio-border, #D8C8AE)", background: "var(--color-elio-bg-light, #FEF6EB)" }}
            aria-hidden="true"
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M15.5 8.5L8.5 15.5C6.84 17.16 4.16 17.16 2.5 15.5C0.84 13.84 0.84 11.16 2.5 9.5L9 3C10.1 1.9 11.9 1.9 13 3C14.1 4.1 14.1 5.9 13 7L6.5 13.5C5.95 14.05 5.05 14.05 4.5 13.5C3.95 12.95 3.95 12.05 4.5 11.5L10.5 5.5" stroke="rgba(60,40,20,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="relative flex-1 flex items-center min-w-0">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full bg-transparent outline-none border-none text-base text-mistral-black"
              style={{ caretColor: "var(--color-mistral-orange, #154ACC)" }}
            />
            {!isFocused && !inputValue && (
              <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <span style={{ width: 2, height: 18, background: "var(--color-mistral-black)", borderRadius: 1, animation: "blink 1.1s step-start infinite" }} />
                <span className="text-base text-mistral-black/40">Ask Elio anything</span>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center shrink-0 rounded-full transition-opacity"
            style={{ width: 36, height: 36, background: "var(--color-mistral-black)", opacity: hasText ? 1 : 0.4 }}
            aria-label="Send"
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M9 14V4M4 9l5-5 5 5" stroke="#fff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      <span className="mt-5 text-[13px] text-mistral-black/35">Powered by Elio</span>
      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </div>
  );
}

function ChatDiscoveryVisual() {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-[669px] mb-8 md:mb-10">
        <ImageCluster />
      </div>
      <ChatInput />
    </div>
  );
}

// ── Step 2: animated typing + staggered place cards ─────────────────────────

const REC_MSG = "Hey! While you were away I found some cool spots for your Madrid trip.";

const REC_PLACES = [
  { name: "Le Jules Verne", location: "Paris, France", rating: "4.8", tag: "Fine Dining", emoji: "🍷", image: "/images/elio/places/4.png" },
  { name: "Aman Spa & Resort", location: "Ubud, Bali", rating: "4.9", tag: "Spa & Wellness", emoji: "🧖", image: "/images/elio/places/2.png" },
  { name: "Shibuya Sky", location: "Tokyo, Japan", rating: "4.7", tag: "Gen Z spots", emoji: "✨", image: "/images/elio/places/3.png" },
] as const;

function StarFilled({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function RecommendationCard() {
  const [typedText, setTypedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || startedRef.current) return;
      startedRef.current = true;
      observer.disconnect();

      const len = REC_MSG.length;
      const timestamps: number[] = [];
      let t = 0;
      for (let i = 0; i < len; i++) {
        timestamps.push(t);
        const ch = REC_MSG[i];
        const warmup = i < 8 ? 1 + (1 - i / 8) * 1 : 1;
        let delay = 18 * warmup;
        if (/[.!?]/.test(ch)) delay = 160 * warmup;
        else if (ch === ",") delay = 80 * warmup;
        else if (ch === " ") {
          const nextWord = REC_MSG.slice(i + 1).split(/\s/)[0] || "";
          delay = (22 + Math.min(nextWord.length, 6) * 1.5) * warmup;
        }
        t += delay;
      }
      let raf = 0;
      const start = performance.now() + 200;
      const frame = (now: number) => {
        const elapsed = now - start;
        if (elapsed < 0) { raf = requestAnimationFrame(frame); return; }
        let lo = 0, hi = len;
        while (lo < hi) {
          const mid = (lo + hi + 1) >>> 1;
          if (timestamps[mid] <= elapsed) lo = mid; else hi = mid - 1;
        }
        const idx = Math.min(lo + 1, len);
        setTypedText(REC_MSG.slice(0, idx));
        if (idx >= len) {
          setTypingDone(true);
          return;
        }
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
      return () => cancelAnimationFrame(raf);
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!typingDone) return;
    const timers = [
      setTimeout(() => setVisibleCount(1), 400),
      setTimeout(() => setVisibleCount(2), 900),
      setTimeout(() => setVisibleCount(3), 1400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [typingDone]);

  return (
    <div
      ref={cardRef}
      className="rounded-[20px] p-5 w-full bg-background border border-[color:var(--color-elio-border,#D8C8AE)]"
      style={{ boxShadow: "0 12px 32px rgba(60, 40, 20, 0.10)" }}
    >
      {/* Chat bubble: avatar + typed message */}
      <div className="flex items-start gap-3 mb-5">
        <span
          className="size-10 shrink-0 rounded-full flex items-center justify-center text-[14px] font-bold text-white"
          style={{ background: "var(--color-mistral-orange, #154ACC)" }}
          aria-hidden="true"
        >
          E
        </span>
        <div className="flex-1 min-w-0">
          <span className="block text-sm font-bold text-mistral-black mb-0.5">Elio</span>
          <div className="text-sm leading-relaxed text-mistral-black/70 min-h-[22px]">
            {typedText}
            {!typingDone && (
              <span
                className="inline-block align-text-bottom ml-0.5"
                style={{ width: 2, height: 14, background: "var(--color-mistral-black)", borderRadius: 1, animation: "blink 1.1s step-start infinite" }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Place cards */}
      <div className="flex flex-col gap-3">
        {REC_PLACES.map((p, i) => (
          <div
            key={p.name}
            className="flex items-center gap-3 p-3 rounded-[14px]"
            style={{
              background: "var(--color-elio-bg-light, #FEF6EB)",
              opacity: i < visibleCount ? 1 : 0,
              transform: i < visibleCount ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <div className="size-14 shrink-0 rounded-[8px] overflow-hidden">
              <img src={p.image} alt="" aria-hidden="true" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-bold text-mistral-black truncate">{p.name}</span>
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-background"
                  style={{ border: "1px solid var(--color-elio-border, #D8C8AE)" }}
                >
                  <span className="text-mistral-orange">
                    <StarFilled size={10} />
                  </span>
                  <span className="text-[11px] font-bold text-mistral-black tabular-nums">{p.rating}</span>
                </span>
              </div>
              <span className="text-xs text-mistral-black/60">{p.location}</span>
            </div>
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-background shrink-0"
              style={{ border: "1px solid var(--color-elio-border, #D8C8AE)" }}
            >
              <span className="text-xs leading-none" aria-hidden="true">{p.emoji}</span>
              <span className="text-xs font-medium text-mistral-black whitespace-nowrap">{p.tag}</span>
            </span>
          </div>
        ))}
      </div>

      {/* Match footer */}
      <div
        className="flex items-center justify-center gap-2 mt-4 py-2"
        style={{ opacity: visibleCount >= 3 ? 1 : 0, transition: "opacity 0.5s ease" }}
      >
        <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
        <span className="text-xs font-medium text-mistral-black/60">98% match to your taste</span>
      </div>
    </div>
  );
}

// ── Step 3: animated heart-cycle + share-sheet ──────────────────────────────

const PARTICLES = [
  { angle: -80, dist: 38 }, { angle: -40, dist: 44 }, { angle: 0, dist: 40 },
  { angle: 40, dist: 44 }, { angle: 80, dist: 38 }, { angle: -130, dist: 42 },
  { angle: 130, dist: 42 }, { angle: 180, dist: 36 },
];

const FRIEND_AVATARS = [
  { img: 12, name: "Alex" }, { img: 32, name: "David" }, { img: 44, name: "Erick" },
  { img: 15, name: "Josue" }, { img: 59, name: "Justin S" }, { img: 28, name: "George" },
  { img: 36, name: "Yifei" }, { img: 51, name: "Tamara" },
] as const;

const SHARE_ACTIONS = [
  { icon: "map", label: "Shared Map", color: "var(--color-mistral-orange, #154ACC)" },
  { icon: "copy", label: "Copy Link", color: "#6B7280" },
  { icon: "whatsapp", label: "WhatsApp", color: "#25D366" },
  { icon: "sms", label: "SMS", color: "#34C759" },
  { icon: "snapchat", label: "Snapchat", color: "#000" },
  { icon: "telegram", label: "Telegram", color: "#0088CC" },
] as const;

function ShareActionIcon({ type, color, size = 22 }: { type: string; color: string; size?: number }) {
  const stroke = { stroke: color, strokeWidth: 1.75, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (type) {
    case "map":
      return (<svg width={size} height={size} viewBox="0 0 24 24" {...stroke}><path d="M12 21s-7-7-7-12a7 7 0 0114 0c0 5-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>);
    case "copy":
      return (<svg width={size} height={size} viewBox="0 0 24 24" {...stroke}><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 012-2h10" /></svg>);
    case "sms":
      return (<svg width={size} height={size} viewBox="0 0 24 24" {...stroke}><path d="M21 11.5a8.4 8.4 0 01-1.2 4.4 8.5 8.5 0 01-7.3 4.1 8.4 8.4 0 01-4.4-1.2L3 21l1.2-5.1A8.4 8.4 0 013 11.5a8.5 8.5 0 014.1-7.3A8.4 8.4 0 0111.5 3a8.5 8.5 0 018.5 8.5z" /></svg>);
    case "whatsapp":
      return (<svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 01-4.11-1.14l-.29-.174-3.01.79.8-2.93-.19-.3A7.96 7.96 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z" /></svg>);
    case "snapchat":
      return (<svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true"><path d="M12.206 1c.062 0 .124.002.186.005 1.9.07 3.313.93 4.19 2.553.46.85.55 2.058.55 2.76 0 .344-.01.696-.034 1.06.182.083.387.125.607.125.263 0 .502-.062.692-.174a.42.42 0 01.217-.057c.1 0 .205.03.33.1.38.21.44.515.44.67 0 .443-.453.73-.843.922-.116.058-.226.11-.316.16-.5.27-.567.46-.527.63.04.16.19.33.38.46.73.5 1.58.88 2.15 1.07.29.1.5.35.55.65.04.21-.02.56-.56.73-.22.07-.49.13-.79.19-.14.03-.21.12-.24.28-.02.11-.05.23-.08.37-.05.21-.2.46-.67.46-.14 0-.29-.02-.46-.05-.42-.08-.84.03-1.34.17-.39.11-.83.24-1.37.28a3.5 3.5 0 01-.09.01c-.72 0-1.32-.63-2.08-1.42-.47-.49-.96-.65-1.33-.65-.37 0-.86.16-1.33.65-.76.79-1.36 1.42-2.08 1.42-.03 0-.06 0-.09-.01-.54-.04-.98-.17-1.37-.28-.5-.14-.92-.25-1.34-.17-.17.03-.32.05-.46.05-.47 0-.62-.25-.67-.46-.03-.14-.06-.26-.08-.37-.03-.16-.1-.25-.24-.28-.3-.06-.57-.12-.79-.19-.54-.17-.6-.52-.56-.73.05-.3.26-.55.55-.65.57-.19 1.42-.57 2.15-1.07.19-.13.34-.3.38-.46.04-.17-.03-.36-.53-.63-.09-.05-.2-.1-.31-.16-.39-.19-.84-.48-.84-.92 0-.15.06-.46.44-.67.12-.07.23-.1.33-.1.07 0 .15.02.22.06.19.11.43.17.69.17.22 0 .42-.04.6-.12-.02-.37-.03-.72-.03-1.07 0-.7.09-1.91.55-2.76C8.7 1.93 10.113 1.07 12.013 1h.193z" /></svg>);
    case "telegram":
      return (<svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>);
    default: return null;
  }
}

function HeartIcon({ size = 22, filled, color }: { size?: number; filled: boolean; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : "none"} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}

function ShareIcon({ size = 22, color }: { size?: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

type Phase = "idle" | "tapping" | "filled" | "fading" | "share-tap" | "share-open" | "share-visible";

function FavoriteSpotCard() {
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const clear = () => timers.current.forEach(clearTimeout);
    const after = (ms: number, fn: () => void) => { timers.current.push(setTimeout(fn, ms)); };
    const runCycle = () => {
      clear();
      timers.current = [];
      setPhase("idle");
      after(1500, () => setPhase("tapping"));
      after(1700, () => setPhase("filled"));
      after(2900, () => setPhase("fading"));
      after(3700, () => setPhase("share-tap"));
      after(4000, () => setPhase("share-open"));
      after(4400, () => setPhase("share-visible"));
      after(9400, runCycle);
    };
    after(800, runCycle);
    return clear;
  }, []);

  const isFilled = phase !== "idle" && phase !== "tapping";
  const showParticles = phase === "filled" || phase === "fading";
  const particleOpacity = phase === "filled" ? 1 : 0;
  const showSaved = isFilled && phase !== "share-open" && phase !== "share-visible";
  const heartScale = phase === "tapping" ? 1.4 : phase === "filled" ? 1.15 : 1;
  const shareScale = phase === "share-tap" ? 1.35 : 1;
  const isShareOpen = phase === "share-open" || phase === "share-visible";
  const shareCardReady = phase === "share-visible";

  return (
    <div
      className="relative rounded-[20px] p-5 pb-8 w-full bg-background border border-[color:var(--color-elio-border,#D8C8AE)] overflow-hidden"
      style={{ boxShadow: "0 12px 32px rgba(60, 40, 20, 0.10)" }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold tracking-wider text-mistral-black">ZLATÁ PRAHA</span>
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full"
            style={{ background: "var(--color-elio-bg-light, #FEF6EB)" }}
          >
            <span className="text-mistral-orange"><StarFilled size={11} /></span>
            <span className="text-xs font-bold text-mistral-black">5.0</span>
          </span>
        </div>
        <div className="relative flex items-center gap-3">
          <span
            className="text-sm font-bold whitespace-nowrap pointer-events-none"
            style={{
              color: "var(--color-mistral-orange, #154ACC)",
              opacity: showSaved ? 1 : 0,
              transform: showSaved ? "translateX(0)" : "translateX(6px)",
              transition: "opacity 0.3s, transform 0.3s",
            }}
          >Saved!</span>
          {/* Heart with particles */}
          <div className="relative" style={{ width: 22, height: 22, overflow: "visible" }}>
            {showParticles && PARTICLES.map((p, i) => {
              const rad = (p.angle * Math.PI) / 180;
              return (
                <span
                  key={i}
                  aria-hidden="true"
                  className="absolute pointer-events-none"
                  style={{
                    top: "50%", left: "50%", fontSize: 9, lineHeight: 1,
                    transform: `translate(calc(-50% + ${Math.cos(rad) * p.dist}px), calc(-50% + ${Math.sin(rad) * p.dist}px))`,
                    opacity: particleOpacity,
                    transition: `opacity 0.7s ease ${i * 25}ms`,
                  }}
                >❤️</span>
              );
            })}
            <span
              className="relative inline-block"
              style={{ zIndex: 1, transform: `scale(${heartScale})`, transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
            >
              <HeartIcon
                size={22}
                filled={isFilled}
                color={isFilled ? "var(--color-mistral-orange, #154ACC)" : "var(--color-mistral-black)"}
              />
            </span>
          </div>
          {/* Share */}
          <span
            className="relative inline-block"
            style={{ width: 22, height: 22, transform: `scale(${shareScale})`, transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
          >
            <ShareIcon size={22} color="var(--color-mistral-black)" />
          </span>
        </div>
      </div>

      {/* Image */}
      <div className="w-full aspect-[4/3] rounded-[8px] overflow-hidden mb-5">
        <img src="/images/favorite-spots/20.jpeg" alt="" aria-hidden="true" className="w-full h-full object-cover" />
      </div>

      {/* Bottom text — avatar + quote */}
      <div className="flex items-start gap-3">
        <span
          className="size-11 shrink-0 rounded-full flex items-center justify-center text-sm font-bold mt-1"
          style={{ background: "var(--color-elio-bg-light, #FEF6EB)", border: "1px solid var(--color-elio-border, #D8C8AE)", color: "rgba(60,40,20,0.7)" }}
          aria-hidden="true"
        >
          AL
        </span>
        <p className="text-[18px] lg:text-[22px] font-medium leading-snug text-mistral-black m-0">
          Find me a cute romantic restaurant with views of the river
        </p>
      </div>

      {/* Share overlay backdrop */}
      <div
        className="absolute inset-0 rounded-[20px]"
        style={{
          zIndex: 5,
          background: "rgba(60, 40, 20, 0.45)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          opacity: isShareOpen ? 1 : 0,
          pointerEvents: isShareOpen ? "auto" : "none",
          transition: "opacity 0.35s",
        }}
      />

      {/* Share sheet — slides up */}
      <div
        className="absolute left-0 right-0 bottom-0 rounded-[20px] flex flex-col p-5 overflow-hidden bg-background"
        style={{
          zIndex: 6,
          height: "90%",
          border: "1px solid var(--color-elio-border, #D8C8AE)",
          boxShadow: "0 -4px 32px rgba(60, 40, 20, 0.18)",
          transform: isShareOpen ? "translateY(0)" : "translateY(100%)",
          opacity: isShareOpen ? 1 : 0,
          transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s",
        }}
      >
        {/* Sheet header */}
        <div className="flex items-center justify-between mb-5 shrink-0">
          <span className="text-xl font-bold text-mistral-black">Send to</span>
          <span
            className="size-9 rounded-full flex items-center justify-center cursor-pointer"
            style={{ background: "var(--color-elio-bg-light, #FEF6EB)" }}
            aria-hidden="true"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(60,40,20,0.6)" strokeWidth="2" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </span>
        </div>

        {/* Friends row */}
        <div className="flex gap-4 mb-5 shrink-0 overflow-x-auto pb-1">
          {FRIEND_AVATARS.map((friend) => (
            <div
              key={friend.name}
              className="flex flex-col items-center gap-2"
              style={{
                minWidth: 56,
                opacity: shareCardReady ? 1 : 0,
                transform: shareCardReady ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.3s, transform 0.3s",
              }}
            >
              <img
                src={`https://i.pravatar.cc/80?img=${friend.img}`}
                alt={friend.name}
                className="size-14 rounded-full object-cover"
              />
              <span className="text-xs font-medium text-mistral-black/70 whitespace-nowrap">{friend.name}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px shrink-0 mb-4" style={{ background: "var(--color-elio-border, #D8C8AE)" }} />

        {/* Action buttons row */}
        <div className="flex gap-4 mb-5 shrink-0 overflow-x-auto pb-1">
          {SHARE_ACTIONS.map((action, i) => (
            <div
              key={action.label}
              className="flex flex-col items-center gap-2"
              style={{
                minWidth: 56,
                opacity: shareCardReady ? 1 : 0,
                transform: shareCardReady ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.3s ${i * 40}ms, transform 0.3s ${i * 40}ms`,
              }}
            >
              <div
                className="size-14 rounded-full flex items-center justify-center"
                style={{
                  background: action.icon === "snapchat" ? "#FFFC00" : "var(--color-elio-bg-light, #FEF6EB)",
                  border: "1px solid var(--color-elio-border, #D8C8AE)",
                }}
              >
                <ShareActionIcon type={action.icon} color={action.icon === "snapchat" ? "#111" : action.color} size={22} />
              </div>
              <span className="text-xs font-medium text-mistral-black/70 whitespace-nowrap text-center">{action.label}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px shrink-0 mb-4" style={{ background: "var(--color-elio-border, #D8C8AE)" }} />

        {/* Bottom row */}
        <div
          className="flex justify-center gap-8 shrink-0"
          style={{ opacity: shareCardReady ? 1 : 0, transition: "opacity 0.3s 0.15s" }}
        >
          {[
            { type: "flag", label: "Report" },
            { type: "ban", label: "Not interested" },
            { type: "info", label: "Info" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2">
              <span style={{ color: "rgba(60,40,20,0.5)" }}>
                {item.type === "flag" && (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 22V4M4 4h13l-2 4 2 4H4" /></svg>
                )}
                {item.type === "ban" && (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><line x1="5.6" y1="5.6" x2="18.4" y2="18.4" /></svg>
                )}
                {item.type === "info" && (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><line x1="12" y1="11" x2="12" y2="17" /><line x1="12" y1="7" x2="12.01" y2="7" /></svg>
                )}
              </span>
              <span className="text-xs font-medium whitespace-nowrap" style={{ color: "rgba(60,40,20,0.5)" }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────

type Step = {
  eyebrow: string;
  headline: string;
  body: string;
  Visual: () => React.ReactElement;
  imageRight: boolean;
};

const STEPS: Step[] = [
  {
    eyebrow: "Step 01",
    headline: "Chat to find what you need.",
    body: "Type a vibe, a craving, a city. Elio talks back like a knowledgeable local friend — narrowing in on what you'd actually want, not just what's nearby.",
    Visual: ChatDiscoveryVisual,
    imageRight: true,
  },
  {
    eyebrow: "Step 02",
    headline: "Get personalised recommendations.",
    body: "Elio remembers your preferences and continuously learns your vibes. The more you use it, the better it gets — surfacing spots that match your taste before you even ask.",
    Visual: RecommendationCard,
    imageRight: false,
  },
  {
    eyebrow: "Step 03",
    headline: "Save & share your favourites.",
    body: "Tap to save. Send to the group chat. Plan a trip together around the spots that actually moved everyone. Your collection grows a place at a time.",
    Visual: FavoriteSpotCard,
    imageRight: true,
  },
];

export function ElioHowItWorks() {
  return (
    <section className="relative py-10 md:py-[100px]">
      <div className="container bg-grid-pattern relative z-10">

        <div className="mb-10 md:mb-20 text-center" data-reveal>
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-mistral-black">
            How it works.
          </h2>
        </div>

        {STEPS.map((s, i) => (
          <div
            key={i}
            className={`flex flex-col ${s.imageRight ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 md:gap-16 items-center ${i > 0 ? "mt-20 md:mt-[100px]" : ""}`}
            data-reveal
          >
            {/* Text */}
            <div className="w-full lg:flex-1 lg:max-w-[480px] flex flex-col gap-5">
              <span className="text-xs uppercase tracking-widest font-bold text-mistral-black/45">
                {s.eyebrow}
              </span>
              <h3 className="text-3xl md:text-5xl font-normal tracking-tight text-mistral-black">
                {s.headline}
              </h3>
              <p className="text-base md:text-lg text-mistral-black/65 leading-relaxed">
                {s.body}
              </p>
            </div>

            {/* Visual */}
            <div className="w-full lg:flex-1" data-reveal data-reveal-delay="1">
              <s.Visual />
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
