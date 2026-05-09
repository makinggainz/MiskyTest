"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

const TABS = [
  {
    id: "ask-elio" as const,
    label: "Ask Elio anything",
    headline: "Ask anything, go anywhere.",
    body: "Chat with Elio like your most knowledgeable local friend. Ask anything from hidden gems to the busiest happy hours nearby.",
    cta: "Try Elio",
  },
  {
    id: "group-plans" as const,
    label: "Create group plans",
    headline: "Planning together, finally easy.",
    body: "Invite your crew, drop pins, chat about options. Group trip planning without the group chat chaos.",
    cta: "Plan with friends",
  },
  {
    id: "vote-places" as const,
    label: "Vote on places",
    headline: "Let the group decide.",
    body: "Share a shortlist and let everyone vote. Majority rules, no more endless back-and-forth.",
    cta: "Start voting",
  },
  {
    id: "itineraries" as const,
    label: "Travel itineraries",
    headline: "Your trip, fully mapped.",
    body: "Elio turns your wishlist into a day-by-day itinerary with routes, reservations, and local tips.",
    cta: "Build my trip",
  },
] as const;

type TabId = typeof TABS[number]["id"];

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

// ── Tab visuals ───────────────────────────────────────────────────────────────

function AskElioVisual() {
  return (
    <div
      className="relative h-full min-h-[643px] overflow-hidden"
      style={{ background: "#f0ede8" }}
    >
      {/* Dot-grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, #d6cfc6 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Chat bubbles */}
      <div className="absolute inset-x-6 bottom-8 flex flex-col gap-3" style={{ maxWidth: "440px", marginLeft: "auto", marginRight: "auto" }}>
        {/* User message */}
        <div className="self-end max-w-[85%] bg-white rounded-[16px] rounded-br-[5px] shadow-sm px-4 py-3">
          <p className="text-[11px] leading-relaxed text-mistral-black">
            Best rooftop bars in Roma tonight?
          </p>
        </div>

        {/* AI reply */}
        <div className="bg-white/80 rounded-[14px] rounded-bl-[5px] shadow-sm px-4 py-3 flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <span
              className="size-4 shrink-0 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
              style={{ background: "var(--color-mistral-orange, #f97316)" }}
            >
              E
            </span>
            <span className="text-[11px] font-medium" style={{ color: "var(--color-mistral-orange, #f97316)" }}>
              Elio
            </span>
          </div>
          <p className="text-[11px] leading-relaxed text-mistral-black/80 pl-6">
            Here are my top picks for tonight:
          </p>
          <div className="flex flex-col gap-2 pl-6">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[11px] font-semibold text-mistral-black">Terrazza Caffarelli</p>
                <p className="text-[10px] text-mistral-black/50">Capitoline Hill · Outdoor terrace</p>
              </div>
              <span className="text-[10px] font-semibold text-mistral-black bg-[#f0ede8] px-2 py-0.5 rounded-full shrink-0">4.8 ★</span>
            </div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[11px] font-semibold text-mistral-black">Il Sorpasso Rooftop</p>
                <p className="text-[10px] text-mistral-black/50">Prati · Cocktails &amp; aperitivo</p>
              </div>
              <span className="text-[10px] font-semibold text-mistral-black bg-[#f0ede8] px-2 py-0.5 rounded-full shrink-0">4.6 ★</span>
            </div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[11px] font-semibold text-mistral-black">La Rinascente Panorama</p>
                <p className="text-[10px] text-mistral-black/50">Via del Corso · City views</p>
              </div>
              <span className="text-[10px] font-semibold text-mistral-black bg-[#f0ede8] px-2 py-0.5 rounded-full shrink-0">4.5 ★</span>
            </div>
          </div>
        </div>

        {/* Second user message */}
        <div className="self-end max-w-[85%] bg-white rounded-[16px] rounded-br-[5px] shadow-sm px-4 py-3">
          <p className="text-[11px] leading-relaxed text-mistral-black">
            Which one has the shortest wait right now?
          </p>
        </div>
      </div>
    </div>
  );
}

function GroupPlansVisual() {
  const avatars = [
    { initials: "AL", bg: "#dde3ea" },
    { initials: "MR", bg: "#e8ddf0" },
    { initials: "JK", bg: "#ddf0e8" },
    { initials: "SO", bg: "#f0e8dd" },
  ];

  return (
    <div
      className="h-full min-h-[643px] flex flex-col gap-4 p-6"
      style={{ background: "#f0f3f8" }}
    >
      {/* Avatar row */}
      <div className="flex items-center gap-2">
        {avatars.map((av) => (
          <span
            key={av.initials}
            className="size-9 rounded-full flex items-center justify-center text-[11px] font-semibold text-mistral-black/70 shrink-0 border border-[#C7D7F8]"
            style={{ background: av.bg }}
          >
            {av.initials}
          </span>
        ))}
        <span className="text-xs text-mistral-black/40 ml-1">+ 2 planning together</span>
      </div>

      {/* Current plan card */}
      <div className="bg-white border border-[#C7D7F8] rounded-[16px] px-4 py-4 flex flex-col gap-3 shadow-sm">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[10px] text-mistral-black/40 uppercase tracking-wider font-semibold mb-0.5">Current plan</p>
            <p className="text-sm font-semibold text-mistral-black">Dinner in Trastevere</p>
            <p className="text-xs text-mistral-black/50">Saturday · 8:00 PM · Roma</p>
          </div>
          <span className="text-[10px] bg-[#f0f3f8] border border-[#C7D7F8] text-mistral-black/60 px-2.5 py-1 rounded-full shrink-0">
            4 going
          </span>
        </div>

        {/* Vote bar */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-mistral-black/50">Da Enzo al 29</span>
            <span className="text-[10px] font-semibold text-mistral-black">3 votes</span>
          </div>
          <div className="h-1.5 rounded-full bg-[#C7D7F8] overflow-hidden">
            <div className="h-full rounded-full bg-mistral-black" style={{ width: "75%" }} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-mistral-black/50">Tonnarello</span>
            <span className="text-[10px] font-semibold text-mistral-black">1 vote</span>
          </div>
          <div className="h-1.5 rounded-full bg-[#C7D7F8] overflow-hidden">
            <div className="h-full rounded-full bg-mistral-black/40" style={{ width: "25%" }} />
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-2">
          <span
            className="size-6 rounded-full flex items-center justify-center text-[9px] font-semibold text-mistral-black/70 shrink-0 border border-[#C7D7F8]"
            style={{ background: "#dde3ea" }}
          >
            AL
          </span>
          <div className="bg-white border border-[#C7D7F8] rounded-[10px] rounded-tl-[4px] px-3 py-2 shadow-sm max-w-[80%]">
            <p className="text-[10px] text-mistral-black/70">I heard Da Enzo has a great vibe, let&apos;s go there!</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span
            className="size-6 rounded-full flex items-center justify-center text-[9px] font-semibold text-mistral-black/70 shrink-0 border border-[#C7D7F8]"
            style={{ background: "#e8ddf0" }}
          >
            MR
          </span>
          <div className="bg-white border border-[#C7D7F8] rounded-[10px] rounded-tl-[4px] px-3 py-2 shadow-sm max-w-[80%]">
            <p className="text-[10px] text-mistral-black/70">Agreed, already voted 👍</p>
          </div>
        </div>
      </div>

      {/* Suggest input */}
      <div className="mt-auto flex items-center gap-2 bg-white border border-[#C7D7F8] rounded-full px-4 py-2.5 shadow-sm">
        <svg className="size-3.5 shrink-0 text-mistral-black/25" fill="none" viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="text-xs text-mistral-black/30">Suggest a place…</span>
      </div>
    </div>
  );
}

function VotePlacesVisual() {
  const places = [
    { name: "Osteria dell'Enoteca", neighborhood: "Oltrarno", votes: 12 },
    { name: "Buca Mario", neighborhood: "Centro Storico", votes: 8 },
    { name: "Il Latini", neighborhood: "Santa Croce", votes: 5 },
    { name: "Trattoria Mario", neighborhood: "Mercato Centrale", votes: 3 },
  ];

  return (
    <div
      className="h-full min-h-[643px] flex flex-col gap-3 p-6"
      style={{ background: "#f0ede8" }}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold text-mistral-black">Vote on tonight&apos;s spot</span>
        <span className="text-xs text-mistral-black/40">Firenze</span>
      </div>
      <div className="flex flex-col gap-2.5">
        {places.map((place, i) => (
          <div
            key={i}
            className="bg-white border border-[#C7D7F8] rounded-[14px] px-4 py-3 flex items-center gap-3 shadow-sm"
          >
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-mistral-black truncate mb-1">{place.name}</p>
              <span className="text-[10px] bg-[#f0ede8] text-mistral-black/50 px-2 py-0.5 rounded-full inline-block">
                {place.neighborhood}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-mistral-black">{place.votes}</span>
              <button
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-mistral-black text-white text-[10px] font-medium hover:bg-mistral-black/80 transition-colors"
                aria-label={`Vote for ${place.name}`}
              >
                <svg className="size-3" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 3v5m0 0H5m3 0h3M4 14h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Vote
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto bg-white/60 border border-[#C7D7F8] rounded-[14px] px-4 py-3 flex items-center justify-between shadow-sm">
        <span className="text-[10px] text-mistral-black/50">Voting closes in</span>
        <span className="text-[10px] font-semibold text-mistral-black">2h 14m</span>
      </div>
    </div>
  );
}

function ItineraryVisual() {
  const days = [
    {
      label: "Day 1",
      date: "Sat, Jun 7",
      activities: [
        { time: "9:00 AM", name: "Breakfast at Café de Flore", type: "Breakfast" },
        { time: "11:00 AM", name: "Louvre Museum", type: "Museum" },
        { time: "7:30 PM", name: "Dinner at Le Comptoir", type: "Dinner" },
      ],
    },
    {
      label: "Day 2",
      date: "Sun, Jun 8",
      activities: [
        { time: "8:30 AM", name: "Brunch at Café Varenne", type: "Breakfast" },
        { time: "1:00 PM", name: "Musée d'Orsay", type: "Museum" },
        { time: "8:00 PM", name: "Seine river cruise", type: "Evening" },
      ],
    },
    {
      label: "Day 3",
      date: "Mon, Jun 9",
      activities: [
        { time: "9:30 AM", name: "Montmartre walk", type: "Explore" },
        { time: "6:30 PM", name: "Dinner at Bistrot Paul Bert", type: "Dinner" },
      ],
    },
  ];

  const typeColors: Record<string, string> = {
    Breakfast: "#f0ede8",
    Museum: "#e8edf5",
    Dinner: "#eee8f0",
    Evening: "#e8f0eb",
    Explore: "#f5ede8",
  };

  return (
    <div
      className="h-full min-h-[643px] flex flex-col gap-4 p-6"
      style={{ background: "#f0f3f8" }}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold text-mistral-black">Paris · 3-day itinerary</span>
        <span className="text-[10px] text-mistral-black/40 bg-white border border-[#C7D7F8] px-2.5 py-1 rounded-full">
          Built by Elio
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {days.map((day) => (
          <div
            key={day.label}
            className="bg-white border border-[#C7D7F8] rounded-[14px] px-4 py-3 flex flex-col gap-2.5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-mistral-black">{day.label}</span>
              <span className="text-[10px] text-mistral-black/40">{day.date}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {day.activities.map((act) => (
                <div key={act.name} className="flex items-center gap-2">
                  <span className="text-[10px] text-mistral-black/40 w-[58px] shrink-0">{act.time}</span>
                  <span
                    className="text-[10px] font-medium text-mistral-black/70 px-2.5 py-1 rounded-full truncate"
                    style={{ background: typeColors[act.type] ?? "#f0f3f8" }}
                  >
                    {act.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main section ─────────────────────────────────────────────────────────────

export function ElioSection() {
  const [activeId, setActiveId] = useState<TabId>("ask-elio");
  const active = TABS.find((t) => t.id === activeId)!;

  return (
    <section className="py-10 md:py-[100px]">
      <div className="container bg-grid-pattern">

        {/* Section heading */}
        <div className="mb-10 md:mb-20 text-center" data-reveal>
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-mistral-black">
            Elio making maps feel alive again.
          </h2>
          <p className="mt-6 md:mt-12 text-sm leading-relaxed text-mistral-black/55 max-w-xl mx-auto">
            Smart and social maps, built for real life.
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
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-mistral-black" />
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
                className="group mt-8 rounded-full flex items-center justify-between w-full px-5 py-2.5 bg-mistral-black text-white text-sm font-medium transition-colors hover:bg-mistral-black/80"
              >
                <span>{active.cta}</span>
                <span className="text-mistral-orange transition-transform group-hover:translate-x-0.5">
                  <ArrowIcon />
                </span>
              </a>
            </div>
            <div className="flex-1 overflow-hidden">
              {activeId === "ask-elio" && <AskElioVisual />}
              {activeId === "group-plans" && <GroupPlansVisual />}
              {activeId === "vote-places" && <VotePlacesVisual />}
              {activeId === "itineraries" && <ItineraryVisual />}
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
                className="group rounded-full inline-flex items-center gap-2 px-5 py-2.5 bg-mistral-black text-white text-sm font-medium transition-colors hover:bg-mistral-black/80"
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
            <div className="relative h-[360px] md:h-[480px] rounded-[20px] overflow-hidden">
              <img
                src="/images/product-elio.png"
                alt="Elio"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
