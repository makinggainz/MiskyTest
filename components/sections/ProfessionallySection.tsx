"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

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

// ── Map chat visual (ported from ColumbusPage Capabilities) ───────────────────

const QUERY = "Where should the Transportation authority install a new road-signal for traffic?";
const CONSIDERING = [
  "Considering demographics of Miami",
  "Considering lot prices",
  "Considering trade area competition",
  "Considering your customer target",
];

function MapChatVisual() {
  return (
    <div className="h-full rounded-[14px] overflow-hidden relative" style={{ background: "linear-gradient(135deg, #111827 0%, #15203a 30%, #1a2d50 60%, #0f1a2e 100%)" }}>
      {/* Map background */}
      <img
        src="/images/HK-Map-2.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "grayscale(1) brightness(0.8) contrast(1.1)", mixBlendMode: "luminosity", opacity: 0.35 }}
      />
      {/* Overlay tint */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(18, 8, 52, 0.22)" }} />

      {/* Chat panel */}
      <div className="absolute inset-4 md:inset-6 bg-[#f5f5f7] shadow-xl rounded-[12px] p-5 md:p-7 flex flex-col">
        {/* Thinking header */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src="/images/Columbo.png"
            alt=""
            aria-hidden="true"
            className="size-4 shrink-0"
            style={{ filter: "brightness(0) saturate(100%) invert(8%) sepia(80%) saturate(1400%) hue-rotate(215deg) brightness(90%)", opacity: 0.5 }}
          />
          <span className="text-gray-400 text-[13px] font-mono">Columbus is thinking...</span>
        </div>

        {/* Considering steps */}
        <div className="text-gray-400 text-[12px] space-y-1 mb-5 font-mono pl-7">
          {CONSIDERING.map((step, i) => (
            <p key={i}>{step}</p>
          ))}
        </div>

        {/* Response */}
        <div className="text-gray-800 text-[13px] mb-4 leading-relaxed font-medium flex-1">
          These areas <span className="text-red-700">marked,</span> have streets that often have had crashes.
          There is poor road signal trafficking. Consumers have
          expressed dissatisfaction with this section.
        </div>

        <div className="text-gray-700 text-[13px] leading-relaxed mb-5">
          / Would you like to order a specific dataset and survey?
          Our partner agents will be dispatched for the study.
        </div>

        {/* Input bar */}
        <div className="bg-white rounded-[14px] shadow-sm px-4 py-3.5 flex items-center justify-between gap-4 mt-auto">
          <span className="text-gray-500 text-[13px] leading-snug flex-1">{QUERY}</span>
          <div
            className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0"
            style={{ background: "#0A1344" }}
          >
            <div className="w-4 h-4 rounded-sm bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Data catalogue visual ─────────────────────────────────────────────────────

function DataCatalogueVisual() {
  const rows = [
    { name: "Urban density index", type: "Raster", updated: "Today", coverage: "Global" },
    { name: "Office vacancy rates", type: "Vector", updated: "Weekly", coverage: "EU + US" },
    { name: "Luxury retail footfall", type: "Point", updated: "Daily", coverage: "Key cities" },
    { name: "Transit accessibility", type: "Network", updated: "Monthly", coverage: "Global" },
    { name: "Land use zoning", type: "Polygon", updated: "Quarterly", coverage: "EU" },
  ];
  return (
    <div className="h-full flex flex-col gap-3 p-2 rounded-[14px]" style={{ background: "#f0f3f8" }}>
      {/* Search */}
      <div className="flex items-center gap-2.5 bg-white border border-[#C7D7F8] rounded-full px-4 py-2.5 shadow-sm">
        <svg className="size-3.5 shrink-0 text-mistral-black/30" fill="none" viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.5" />
          <path d="m10 10 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="text-xs text-mistral-black/30">Search 3,400+ datasets…</span>
      </div>
      {/* Table */}
      <div className="flex-1 bg-white border border-[#C7D7F8] rounded-[14px] overflow-hidden shadow-sm">
        <div className="grid grid-cols-4 px-4 py-2.5 border-b border-[#C7D7F8] bg-mistral-beige-deep">
          {["Dataset", "Type", "Updated", "Coverage"].map((h) => (
            <span key={h} className="text-[10px] font-semibold uppercase tracking-wider text-mistral-black/50">{h}</span>
          ))}
        </div>
        {rows.map((row, i) => (
          <div key={i} className={`grid grid-cols-4 px-4 py-2.5 hover:bg-mistral-beige-deep/50 ${i < rows.length - 1 ? "border-b border-[#C7D7F8]/40" : ""}`}>
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

// ── Audits visual ─────────────────────────────────────────────────────────────

function AuditsVisual() {
  const sites = [
    { name: "Paseo de Gracia 42, Barcelona", score: 94, tag: "Premium" },
    { name: "Friedrichstraße 85, Berlin", score: 87, tag: "High" },
    { name: "Via Montenapoleone 12, Milan", score: 82, tag: "High" },
    { name: "Kurfürstendamm 19, Berlin", score: 71, tag: "Medium" },
    { name: "Faubourg Saint-Honoré, Paris", score: 68, tag: "Medium" },
  ];
  return (
    <div className="h-full flex flex-col gap-2.5 p-2 rounded-[14px]" style={{ background: "#f0f3f8" }}>
      <div className="flex items-center justify-between px-2">
        <span className="text-xs font-semibold text-mistral-black">Top matching parcels</span>
        <span className="text-xs text-mistral-black/40">5 of 128 results</span>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        {sites.map((site, i) => (
          <div key={i} className="flex-1 bg-white border border-[#C7D7F8] rounded-[12px] px-4 py-2.5 flex items-center gap-3 shadow-sm">
            <span className="size-7 rounded-full bg-mistral-beige-deep flex items-center justify-center text-[10px] font-bold text-mistral-black/60 shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-mistral-black truncate mb-1">{site.name}</p>
              <div className="h-1 rounded-full bg-[#C7D7F8] overflow-hidden">
                <div className="h-full rounded-full bg-mistral-black" style={{ width: `${site.score}%` }} />
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0 pl-2">
              <span className="text-sm font-bold text-mistral-black leading-none">{site.score}</span>
              <span className="text-[10px] bg-mistral-beige-deep text-mistral-black/50 px-2 py-0.5 rounded-full">{site.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    id: "map-chat",
    name: "Map Chat",
    description: "Ask your map directly about anything. Have a conversation like you're talking to your best analyst.",
    Visual: MapChatVisual,
  },
  {
    id: "data-catalogue",
    name: "Data Catalogue",
    description: "Browse, filter, and layer thousands of curated datasets. Every source is documented, versioned, and ready to query.",
    Visual: DataCatalogueVisual,
  },
  {
    id: "audits",
    name: "Audits and site selection",
    description: "Run automated site audits and score locations against your criteria. Surface the highest-scoring parcels in seconds.",
    Visual: AuditsVisual,
  },
] as const;

type FeatureId = (typeof FEATURES)[number]["id"];

// ── Section ───────────────────────────────────────────────────────────────────

export function ProfessionallySection() {
  const [activeId, setActiveId] = useState<FeatureId>("map-chat");
  const active = FEATURES.find((f) => f.id === activeId)!;

  return (
    <section className="py-10 md:py-[100px]">
      <div className="container bg-grid-pattern">

        {/* Panel */}
        <div
          className="border border-[#C7D7F8] rounded-[20px] overflow-hidden"
          data-reveal
          data-reveal-delay="1"
        >
          {/* Mobile: horizontal tab strip */}
          <div className="flex md:hidden border-b border-[#C7D7F8] bg-background overflow-x-auto">
            {FEATURES.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveId(f.id)}
                className={`flex-none px-5 py-4 text-sm whitespace-nowrap relative transition-colors ${
                  activeId === f.id
                    ? "text-mistral-black font-medium"
                    : "text-mistral-black/40 hover:text-mistral-black/70"
                }`}
              >
                {f.name}
                {activeId === f.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-mistral-black" />
                )}
              </button>
            ))}
          </div>

          {/* Body: sidebar + focused view */}
          <div className="flex flex-col md:flex-row">

            {/* Left: Columbus branding + feature list (desktop only) */}
            <div className="hidden md:flex flex-col md:w-[240px] lg:w-[280px] shrink-0 border-r border-[#C7D7F8] bg-background">

              {/* Brand header */}
              <div className="px-6 pt-7 pb-5 border-b border-[#C7D7F8]">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <img
                    src="/images/Columbo.png"
                    alt="Columbus"
                    className="size-5 shrink-0"
                    style={{ filter: "brightness(0) saturate(100%) invert(8%) sepia(80%) saturate(1400%) hue-rotate(215deg) brightness(90%)" }}
                  />
                  <span className="text-base font-semibold text-mistral-black">Columbus</span>
                </div>
                <p className="text-xs text-mistral-black/40 tracking-wide">All-in-one map intelligence platform</p>
              </div>

              {/* Feature list */}
              <div className="flex-1">
                {FEATURES.map((f, i) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveId(f.id)}
                    className={`group w-full flex items-center gap-4 px-6 py-5 text-left transition-colors relative ${
                      i < FEATURES.length - 1 ? "border-b border-[#C7D7F8]/60" : ""
                    } ${activeId === f.id ? "bg-mistral-beige-deep" : "hover:bg-mistral-beige-deep/50"}`}
                  >
                    {activeId === f.id && (
                      <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-mistral-black" />
                    )}
                    <span className="text-[10px] font-medium text-mistral-black/25 shrink-0 w-5 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`text-sm leading-snug transition-colors ${
                      activeId === f.id
                        ? "font-medium text-mistral-black"
                        : "text-mistral-black/50 group-hover:text-mistral-black/75"
                    }`}>
                      {f.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* CTA */}
              <div className="p-5 border-t border-[#C7D7F8]">
                <a
                  href="/ColumbusDesign"
                  className="group rounded-full flex items-center justify-between w-full px-5 py-2.5 bg-mistral-black text-white text-sm font-medium transition-colors hover:bg-mistral-black/80"
                >
                  <span>Try Columbus</span>
                  <span className="text-mistral-orange transition-transform group-hover:translate-x-0.5">
                    <ArrowIcon />
                  </span>
                </a>
                <p className="text-xs text-mistral-black/25 text-center mt-3">Example for display purpose only</p>
              </div>
            </div>

            {/* Right: focused feature */}
            <div className="flex-1 flex flex-col">
              {/* Visual area */}
              <div className="flex-1 min-h-[300px] md:min-h-[400px] p-5 md:p-6">
                <active.Visual />
              </div>
              {/* Description */}
              <div className="px-6 md:px-8 py-5 border-t border-[#C7D7F8] bg-background">
                <h3 className="text-xl font-semibold text-mistral-black mb-1.5">{active.name}</h3>
                <p className="text-sm leading-relaxed text-mistral-black/55">{active.description}</p>
                {/* Mobile CTA */}
                <div className="mt-5 md:hidden">
                  <a
                    href="/ColumbusDesign"
                    className="group rounded-full flex items-center justify-between w-full px-5 py-2.5 bg-mistral-black text-white text-sm font-medium transition-colors hover:bg-mistral-black/80"
                  >
                    <span>Try Columbus</span>
                    <span className="text-mistral-orange transition-transform group-hover:translate-x-0.5">
                      <ArrowIcon />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
