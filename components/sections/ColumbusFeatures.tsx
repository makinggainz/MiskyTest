"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

const TABS = [
  {
    id: "map-chat" as const,
    label: "Map Chat",
    headline: "Conversational map chat",
    body: "Ask your chat directly about anything. Have a conversation like you're talking to your best analyst.",
  },
  {
    id: "data-catalogue" as const,
    label: "Data Catalogue",
    headline: "Rich geospatial data catalogue",
    body: "Browse, filter, and layer thousands of curated datasets. Every source is documented, versioned, and ready to query.",
  },
  {
    id: "audits" as const,
    label: "Audits and site selection",
    headline: "AI-powered site intelligence",
    body: "Run automated site audits and score locations against your criteria. Surface the highest-scoring parcels in seconds.",
  },
] as const;

type TabId = typeof TABS[number]["id"];

// ── Visuals ─────────────────────────────────────────────────────────────────

function MapChatVisual() {
  return (
    <div className="relative h-full min-h-[380px] overflow-hidden" style={{ background: "#dde3ea" }}>
      {/* Map dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, #b8c2ce 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      {/* Suggestive road lines */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1="38%" x2="100%" y2="36%" stroke="#a4aeba" strokeWidth="4" />
        <line x1="0" y1="62%" x2="100%" y2="60%" stroke="#a4aeba" strokeWidth="2" />
        <line x1="28%" y1="0" x2="26%" y2="100%" stroke="#a4aeba" strokeWidth="3" />
        <line x1="68%" y1="0" x2="70%" y2="100%" stroke="#a4aeba" strokeWidth="4" />
        <line x1="0" y1="20%" x2="35%" y2="25%" stroke="#a4aeba" strokeWidth="1.5" />
        <line x1="55%" y1="48%" x2="100%" y2="50%" stroke="#a4aeba" strokeWidth="1.5" />
        <rect x="42%" y="40%" width="22%" height="18%" fill="#c8d0da" opacity="0.6" rx="2" />
        <rect x="10%" y="18%" width="14%" height="12%" fill="#c8d0da" opacity="0.6" rx="2" />
        <rect x="72%" y="55%" width="18%" height="22%" fill="#c8d0da" opacity="0.6" rx="2" />
      </svg>

      {/* Chat panel overlay */}
      <div className="absolute right-6 bottom-6 left-[35%] flex flex-col gap-2.5">
        {/* User message */}
        <div className="self-end max-w-[90%] bg-white rounded-[16px] rounded-br-[5px] shadow-sm px-4 py-3">
          <p className="text-[11px] leading-relaxed text-mistral-black">
            Show me parcels between 2,500–4,000 sqm where surrounding luxury retail density is high but office vacancy is below 8%.
          </p>
        </div>
        {/* AI investigating */}
        <div className="bg-white/80 rounded-[14px] rounded-bl-[5px] shadow-sm px-4 py-3 flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <img
              src="/images/Columbo.png"
              alt=""
              className="size-3.5 shrink-0"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(8%) sepia(80%) saturate(1400%) hue-rotate(215deg) brightness(90%)",
                opacity: 0.5,
              }}
            />
            <span className="text-[11px] font-medium" style={{ color: "var(--color-mistral-orange)" }}>
              Columbus is investigating
            </span>
          </div>
          <p className="text-[10px] text-mistral-black/35 pl-[22px]">Considering demographics of Miami</p>
        </div>
        {/* Follow-up */}
        <div className="self-end max-w-[90%] bg-white rounded-[16px] rounded-br-[5px] shadow-sm px-4 py-3">
          <p className="text-[11px] leading-relaxed text-mistral-black">
            Now only show parcels where asking price is under €12,000/sqm and within 400m of a Metro stop.
          </p>
        </div>
      </div>
    </div>
  );
}

function DataCatalogueVisual() {
  const rows = [
    { name: "Urban density index", type: "Raster", updated: "Today", coverage: "Global" },
    { name: "Office vacancy rates", type: "Vector", updated: "Weekly", coverage: "EU + US" },
    { name: "Luxury retail footfall", type: "Point", updated: "Daily", coverage: "Key cities" },
    { name: "Transit accessibility", type: "Network", updated: "Monthly", coverage: "Global" },
    { name: "Land use zoning", type: "Polygon", updated: "Quarterly", coverage: "EU" },
  ];
  return (
    <div className="h-full min-h-[380px] flex flex-col gap-3 p-6" style={{ background: "#f0f3f8" }}>
      {/* Search */}
      <div className="flex items-center gap-2.5 bg-white border border-[#C7D7F8] rounded-full px-4 py-2.5 shadow-sm">
        <svg className="size-3.5 shrink-0 text-mistral-black/30" fill="none" viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.5" />
          <path d="m10 10 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="text-xs text-mistral-black/30">Search 3,400+ datasets…</span>
      </div>
      {/* Table */}
      <div className="flex-1 bg-white border border-[#C7D7F8] rounded-[16px] overflow-hidden shadow-sm">
        <div className="grid grid-cols-4 px-4 py-2.5 border-b border-[#C7D7F8] bg-mistral-beige-deep">
          {["Dataset", "Type", "Updated", "Coverage"].map((h) => (
            <span key={h} className="text-[10px] font-semibold uppercase tracking-wider text-mistral-black/50">
              {h}
            </span>
          ))}
        </div>
        {rows.map((row, i) => (
          <div
            key={i}
            className={`grid grid-cols-4 px-4 py-2.5 transition-colors hover:bg-mistral-beige-deep/50 ${
              i < rows.length - 1 ? "border-b border-[#C7D7F8]/40" : ""
            }`}
          >
            <span className="text-xs font-medium text-mistral-black truncate pr-2">{row.name}</span>
            <span className="text-xs text-mistral-black/50">{row.type}</span>
            <span className="text-xs text-mistral-black/50">{row.updated}</span>
            <span className="text-xs text-mistral-black/50">{row.coverage}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AuditsVisual() {
  const sites = [
    { name: "Paseo de Gracia 42, Barcelona", score: 94, tag: "Premium" },
    { name: "Friedrichstraße 85, Berlin", score: 87, tag: "High" },
    { name: "Via Montenapoleone 12, Milan", score: 82, tag: "High" },
    { name: "Kurfürstendamm 19, Berlin", score: 71, tag: "Medium" },
    { name: "Faubourg Saint-Honoré, Paris", score: 68, tag: "Medium" },
  ];
  return (
    <div className="h-full min-h-[380px] flex flex-col gap-3 p-6" style={{ background: "#f0f3f8" }}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-mistral-black">Top matching parcels</span>
        <span className="text-xs text-mistral-black/40">5 of 128 results</span>
      </div>
      <div className="flex flex-col gap-2">
        {sites.map((site, i) => (
          <div
            key={i}
            className="bg-white border border-[#C7D7F8] rounded-[14px] px-4 py-3 flex items-center gap-3 shadow-sm"
          >
            <span className="size-8 rounded-full bg-mistral-beige-deep flex items-center justify-center text-[10px] font-bold text-mistral-black/60 shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-mistral-black truncate mb-1.5">{site.name}</p>
              <div className="h-1 rounded-full bg-[#C7D7F8] overflow-hidden">
                <div
                  className="h-full rounded-full bg-mistral-black"
                  style={{ width: `${site.score}%` }}
                />
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0 pl-2">
              <span className="text-sm font-bold text-mistral-black leading-none">{site.score}</span>
              <span className="text-[10px] bg-mistral-beige-deep text-mistral-black/50 px-2 py-0.5 rounded-full">
                {site.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main section ─────────────────────────────────────────────────────────────

export function ColumbusFeatures() {
  const [activeId, setActiveId] = useState<TabId>("map-chat");
  const active = TABS.find((t) => t.id === activeId)!;

  return (
    <section className="my-10 md:my-20">
      <div className="container">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10 gap-2" data-reveal>
          <div className="flex items-center gap-2.5">
            <img
              src="/images/Columbo.png"
              alt="Columbus"
              className="size-7"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(8%) sepia(80%) saturate(1400%) hue-rotate(215deg) brightness(90%)",
              }}
            />
            <span className="text-xl font-semibold text-mistral-black">Columbus</span>
          </div>
          <p className="text-sm text-mistral-black/45 tracking-wide">All-in-one map intelligence platform</p>
        </div>

        {/* Panel */}
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

          {/* Content */}
          <div className="flex flex-col md:flex-row">
            {/* Left: text */}
            <div className="flex flex-col justify-between p-8 md:p-10 md:w-[280px] lg:w-[320px] shrink-0 border-b md:border-b-0 md:border-r border-[#C7D7F8] bg-background">
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-semibold text-mistral-black leading-snug">
                  {active.headline}
                </h3>
                <p className="text-sm leading-relaxed text-mistral-black/55">
                  {active.body}
                </p>
              </div>
              <p className="text-xs text-mistral-black/25 mt-10">Example for display purpose only</p>
            </div>

            {/* Right: visual */}
            <div className="flex-1 overflow-hidden">
              {activeId === "map-chat" && <MapChatVisual />}
              {activeId === "data-catalogue" && <DataCatalogueVisual />}
              {activeId === "audits" && <AuditsVisual />}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
