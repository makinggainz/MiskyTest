"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

const TAB_CYCLE_MS = 4000;

const TABS = [
  {
    id: "ranked-spots" as const,
    label: "Ranked Spots",
    headline: "Ranked spots, curated for you.",
    body: "Every place ranked by the things that actually matter — vibe, crowd, value, the time of day. The best of any city, ordered the way locals would.",
    cta: "Try it now",
  },
  {
    id: "shared-itineraries" as const,
    label: "Shared Itineraries",
    headline: "Itineraries you build together.",
    body: "Invite your crew, drop pins, swap notes. A shared trip plan that updates in real time — without the group-chat chaos.",
    cta: "Try it now",
  },
  {
    id: "search-by-character" as const,
    label: "Search by Character",
    headline: "Find a place that matches your mood.",
    body: "Search by character, not category. Tell Elio you want \"quiet, candle-lit, walking distance\" and you'll get a shortlist that actually fits.",
    cta: "Try it now",
  },
  {
    id: "roll-the-dice" as const,
    label: "Roll the Dice",
    headline: "Let chance pick your next spot.",
    body: "Stuck deciding? Tap once and Elio surfaces three surprise picks tuned to where you are and what you've liked. Tap to reveal.",
    cta: "Try it now",
  },
] as const;

type TabId = typeof TABS[number]["id"];

// ── NewAtMapsGPT-style fanned-card visual data ────────────────────────────────
// Sourced from /products/mapsgpt → NewAtMapsGPTSection.FEATURES, adapted to MistX.

type MiniCard = { image: string; title: string; subtitle: string };
type EmojiDeco = { src: string; size: number; left: string; top: string };

type FanVisualData = {
  bgColorA: string;
  bgColorB: string;
  miniCards: [MiniCard, MiniCard, MiniCard];
  emojis: EmojiDeco[];
};

const FAN_VISUALS: Record<TabId, FanVisualData> = {
  "ranked-spots": {
    bgColorA: "#5FBFF1",
    bgColorB: "#01A35D",
    miniCards: [
      { image: "/images/favorite-spots/22.jpeg", title: "Sunset Terrace", subtitle: "Top-rated rooftop, Roma" },
      { image: "/images/favorite-spots/20.jpeg", title: "Casa Verde", subtitle: "Best brunch in Trastevere" },
      { image: "/images/favorite-spots/24.jpeg", title: "La Lucciola", subtitle: "Locals' aperitivo pick" },
    ],
    emojis: [
      { src: "/images/emojis/passport.png", size: 56, left: "5%", top: "60%" },
      { src: "/images/emojis/plane.png", size: 60, left: "75%", top: "10%" },
    ],
  },
  "shared-itineraries": {
    bgColorA: "#DE2F32",
    bgColorB: "#B00098",
    miniCards: [
      { image: "/images/favorite-spots/23.jpeg", title: "Day 1 — Friday", subtitle: "Dinner + nightcap, 4 spots" },
      { image: "/images/favorite-spots/14.jpeg", title: "Day 2 — Saturday", subtitle: "Brunch, gallery, sunset" },
      { image: "/images/favorite-spots/17.jpeg", title: "Day 3 — Sunday", subtitle: "Slow lunch, train home" },
    ],
    emojis: [
      { src: "/images/emojis/champ.png", size: 54, left: "7%", top: "12%" },
      { src: "/images/emojis/martini.png", size: 52, left: "76%", top: "58%" },
    ],
  },
  "search-by-character": {
    bgColorA: "#0A6E5C",
    bgColorB: "#2A8FC2",
    miniCards: [
      { image: "/images/favorite-spots/19.jpeg", title: "Quiet & candle-lit", subtitle: "Date-night atmosphere" },
      { image: "/images/favorite-spots/21.jpeg", title: "Loud & raucous", subtitle: "Where the locals go after work" },
      { image: "/images/favorite-spots/22.jpeg", title: "Hidden, no sign", subtitle: "Ring the bell to enter" },
    ],
    emojis: [
      { src: "/images/emojis/palm.png", size: 56, left: "73%", top: "12%" },
      { src: "/images/emojis/earth.png", size: 52, left: "6%", top: "57%" },
    ],
  },
  "roll-the-dice": {
    bgColorA: "#00B1D4",
    bgColorB: "#5FBFF1",
    miniCards: [
      { image: "/images/favorite-spots/24.jpeg", title: "???", subtitle: "Tap to reveal" },
      { image: "/images/favorite-spots/17.jpeg", title: "???", subtitle: "Tap to reveal" },
      { image: "/images/favorite-spots/14.jpeg", title: "???", subtitle: "Tap to reveal" },
    ],
    emojis: [
      { src: "/images/emojis/car.png", size: 56, left: "7%", top: "16%" },
      { src: "/images/emojis/earth.png", size: 50, left: "75%", top: "58%" },
    ],
  },
};

const CARD_FAN_OFFSETS = [
  { rotate: -8, x: -120, y: 24 },
  { rotate: 0, x: 0, y: 0 },
  { rotate: 8, x: 120, y: 24 },
];

function FanFeatureVisual({ data }: { data: FanVisualData }) {
  return (
    <div
      className="relative h-full min-h-[643px] overflow-hidden flex items-center justify-center"
      style={{
        background: `radial-gradient(ellipse 80% 45% at 0% 0%, ${data.bgColorA}80 0%, transparent 100%), radial-gradient(ellipse 80% 45% at 100% 0%, ${data.bgColorB}80 0%, transparent 100%), #FFFFFF`,
      }}
    >
      {data.emojis.map((emoji) => (
        <img
          key={emoji.src}
          src={emoji.src}
          alt=""
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{ left: emoji.left, top: emoji.top, width: emoji.size, height: emoji.size, zIndex: 4 }}
        />
      ))}

      {data.miniCards.map((card, i) => {
        const cfg = CARD_FAN_OFFSETS[i];
        return (
          <div
            key={i}
            className="absolute bg-white rounded-[16px] overflow-hidden flex flex-col"
            style={{
              width: 180,
              height: 250,
              boxShadow: "0 8px 28px rgba(0, 0, 0, 0.18)",
              transform: `translate(${cfg.x}px, ${cfg.y}px) rotate(${cfg.rotate}deg)`,
              zIndex: i === 1 ? 3 : i === 2 ? 2 : 1,
            }}
          >
            <div className="w-full h-[160px] overflow-hidden shrink-0">
              <img src={card.image} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="px-3 py-2.5 flex-1 flex flex-col gap-0.5">
              <p className="text-[12px] font-semibold text-mistral-black truncate">{card.title}</p>
              <p className="text-[11px] text-mistral-black/55 truncate">{card.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Shared icons ─────────────────────────────────────────────────────────────

function ArrowIcon() {
  return (
    <svg className="size-3 shrink-0" viewBox="0 0 9 13" fill="none" aria-hidden="true">
      <circle cx="7.22"  cy="6.589" r="1.28" fill="currentColor" />
      <circle cx="4.658" cy="4.018" r="1.28" fill="currentColor" />
      <circle cx="2.099" cy="1.46"  r="1.28" fill="currentColor" />
      <circle cx="4.658" cy="9.151" r="1.28" fill="currentColor" />
      <circle cx="2.099" cy="11.718" r="1.28" fill="currentColor" />
    </svg>
  );
}


// ── Main section ─────────────────────────────────────────────────────────────

export function ElioSection() {
  const [activeId, setActiveId] = useState<TabId>("ranked-spots");
  const active = TABS.find((t) => t.id === activeId)!;

  useEffect(() => {
    const id = setTimeout(() => {
      const i = TABS.findIndex((t) => t.id === activeId);
      setActiveId(TABS[(i + 1) % TABS.length].id);
    }, TAB_CYCLE_MS);
    return () => clearTimeout(id);
  }, [activeId]);

  return (
    <section className="py-10 md:py-[100px]">
      <div className="container bg-grid-pattern">

        {/* Section heading */}
        <div className="mb-10 md:mb-20 text-center" data-reveal>
          <div className="inline-flex items-center gap-3 justify-center">
            <img
              src="/images/mapsgpt-logo.png"
              alt="Elio"
              className="h-10 w-auto object-contain"
            />
            <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-mistral-black">
              Elio
            </h2>
          </div>
          <p className="mt-6 md:mt-12 text-sm leading-relaxed text-mistral-black/55 max-w-xl mx-auto">
            Making maps feel alive again.
          </p>
        </div>

        {/* Elio tabbed panel */}
        <div
          className="border border-[#C7D7F8] rounded-[20px] overflow-hidden"
          data-reveal
          data-reveal-delay="1"
        >
          {/* Tab bar */}
          <div className="flex border-b border-[#C7D7F8] bg-background overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveId(tab.id)}
                className={`flex-1 min-w-max px-6 py-4 text-sm transition-colors whitespace-nowrap relative ${
                  activeId === tab.id
                    ? "text-mistral-black font-medium"
                    : "text-mistral-black/40 hover:text-mistral-black/70"
                }`}
              >
                {tab.label}
                {activeId === tab.id && (
                  <span
                    key={activeId}
                    className="tab-progress-line"
                    style={{ "--tab-cycle-duration": `${TAB_CYCLE_MS}ms` }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content: left text panel + right visual */}
          <div className="flex flex-col md:flex-row">
            <div
              className="flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#C7D7F8] bg-background p-8 md:p-10 shrink-0"
              style={{ width: "320px", maxWidth: "100%" }}
            >
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-normal text-mistral-black leading-snug tracking-tight">
                  {active.headline}
                </h3>
                <p className="text-sm leading-relaxed text-mistral-black/55">
                  {active.body}
                </p>
              </div>
              <a
                href="#"
                className="group mt-8 rounded-[7px] flex items-center justify-between w-full px-5 py-2.5 bg-mistral-black text-white text-sm font-medium transition-colors hover:bg-mistral-black/80"
              >
                <span>{active.cta}</span>
                <span className="text-mistral-orange transition-transform group-hover:translate-x-0.5">
                  <ArrowIcon />
                </span>
              </a>
            </div>
            <div className="flex-1 overflow-hidden">
              <FanFeatureVisual data={FAN_VISUALS[activeId]} />
            </div>
          </div>
        </div>

        {/* "Never be bored" split block */}
        <div
          className="mt-20 md:mt-[100px] flex flex-col lg:flex-row gap-10 md:gap-16 items-center"
          data-reveal
        >
          {/* Left: text */}
          <div
            className="w-full lg:flex-1 lg:max-w-[480px] flex flex-col gap-6"
            data-reveal
            data-reveal-delay="1"
          >
            <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-mistral-black">
              Never be bored again.
            </h2>
            <p className="text-xl md:text-2xl font-normal tracking-tight leading-snug text-mistral-black/60">
              You can always find your next anything on Elio.
            </p>
            <div className="pt-2">
              <a
                href="#"
                className="group rounded-[7px] inline-flex items-center gap-2 px-5 py-2.5 bg-mistral-black text-white text-sm font-medium transition-colors hover:bg-mistral-black/80"
              >
                Find your world now
                <span className="text-mistral-orange transition-transform group-hover:translate-x-0.5">
                  <ArrowIcon />
                </span>
              </a>
            </div>
          </div>

          {/* Right: image */}
          <div className="w-full lg:flex-1" data-reveal data-reveal-delay="1">
            <div className="relative h-[360px] md:h-[480px]">
              <img
                src="/images/Eliobackground.png"
                alt="Elio"
                className="media-bleed absolute inset-0 w-full h-full object-cover"
                style={{ "--media-bleed-fade": "18%" }}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
