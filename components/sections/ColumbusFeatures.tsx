"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

const TAB_CYCLE_MS = 4000;

const TABS = [
  {
    id: "map-chat" as const,
    label: "Map Chat",
    headline: "Conversational map chat",
    body: "Talk to your map like you would your best analyst. Ask anything from infrastructure planning to site competition — Columbus reasons over verified data and answers in plain English.",
    cta: "Try map chat",
  },
  {
    id: "data-catalogue" as const,
    label: "Data Catalogue",
    headline: "The most accurate data catalogue",
    body: "Every layer your team needs, priced per point of interest and ready to drop into your existing tools. Vetted, high-fidelity, and smart datasets for your most critical decisions.",
    cta: "Learn about our data",
  },
  {
    id: "audits" as const,
    label: "Audits and site selection",
    headline: "Agentic geospatial research",
    body: "Spin up complete due-diligence reports from a single prompt. What used to take a research team weeks now takes minutes — automated audits, regulatory checks, and full geospatial reports.",
    cta: "Browse report templates",
  },
] as const;

type TabId = typeof TABS[number]["id"];

const PARTNER_LOGOS = [
  { src: "/images/mapsgpt-logos/logo1.png", alt: "Partner 1" },
  { src: "/images/mapsgpt-logos/logo2.png", alt: "Partner 2" },
  { src: "/images/mapsgpt-logos/logo3.png", alt: "Partner 3" },
  { src: "/images/mapsgpt-logos/logo4.png", alt: "Partner 4" },
  { src: "/images/mapsgpt-logos/logo5.png", alt: "Partner 5" },
  { src: "/images/mapsgpt-logos/logo6.png", alt: "Partner 6" },
  { src: "/images/mapsgpt-logos/logo7.png", alt: "Partner 7" },
  { src: "/images/mapsgpt-logos/logo8.png", alt: "Partner 8" },
  { src: "/images/mapsgpt-logos/logo9.png", alt: "Partner 9" },
  { src: "/images/mapsgpt-logos/logo10.png", alt: "Partner 10" },
  { src: "/images/mapsgpt-logos/logo11.png", alt: "Partner 11" },
  { src: "/images/mapsgpt-logos/logo12.png", alt: "Partner 12" },
];

const TRACK = [...PARTNER_LOGOS, ...PARTNER_LOGOS];

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
// Sourced from ColumbusPage's /columbus-solutions use-case rows
// (Chat / DataCatalogue / AgentResearch) — adapted to MistX's design language.

const URBAN_CHAT_QUERY =
  "Where should the Transportation authority install a new road-signal for traffic?";
const URBAN_CHAT_CONSIDERING = [
  "Considering demographics of Miami",
  "Considering lot prices",
  "Considering trade area competition",
  "Considering your customer target",
];

function MapChatVisual() {
  return (
    <div
      className="relative h-full min-h-[643px] overflow-hidden"
      style={{ background: "linear-gradient(135deg, #111827 0%, #15203a 30%, #1a2d50 60%, #0f1a2e 100%)" }}
    >
      <img
        src="/images/HK-Map-2.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "grayscale(1) brightness(0.8) contrast(1.1)", mixBlendMode: "luminosity", opacity: 0.35 }}
      />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(18, 8, 52, 0.22)" }} />

      <div className="absolute inset-y-4 left-4 md:inset-y-6 md:left-6 w-[calc(50%-1rem)] md:w-[calc(50%-1.5rem)] bg-[#f5f5f7] shadow-xl rounded-[12px] p-5 md:p-7 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <img
            src="/images/Columbo.png"
            alt=""
            aria-hidden="true"
            className="size-4 shrink-0"
            style={{ filter: "brightness(0) saturate(100%) invert(8%) sepia(80%) saturate(1400%) hue-rotate(215deg) brightness(90%)", opacity: 0.5 }}
          />
          <span className="text-gray-400 text-[13px] font-mono">Columbus is thinking…</span>
        </div>

        <div className="text-gray-400 text-[12px] space-y-1 mb-5 font-mono pl-7">
          {URBAN_CHAT_CONSIDERING.map((step) => (
            <p key={step}>{step}</p>
          ))}
        </div>

        <div className="text-gray-800 text-[13px] mb-4 leading-relaxed font-medium flex-1">
          These areas <span className="text-red-700">marked,</span> have streets that often have had crashes.
          There is poor road signal trafficking. Consumers have expressed dissatisfaction with this section.
        </div>

        <div className="text-gray-700 text-[13px] leading-relaxed mb-5">
          / Would you like to order a specific dataset and survey? Our partner agents will be dispatched for the study.
        </div>

        <div className="bg-white rounded-[14px] shadow-sm px-4 py-3.5 flex items-center justify-between gap-4 mt-auto">
          <span className="text-gray-500 text-[13px] leading-snug flex-1">{URBAN_CHAT_QUERY}</span>
          <div className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0" style={{ background: "#0A1344" }}>
            <div className="w-4 h-4 rounded-sm bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

const DATA_CATALOGUE_TABS = [
  "My Data",
  "Suggested",
  "All",
  "Base Maps",
  "Overlays",
  "Packs",
  "Smart Layers",
];

const DATA_CATALOGUE_CARDS = [
  {
    title: "Future Appreciation Zones",
    rows: "55,010 rows",
    description: "Predicts 2–5 year property value growth using migration, job forecasts, and permit trends.",
    image: "/images/usecases/layer1.png",
  },
  {
    title: "Future Turnover Hotspots",
    rows: "40,206 rows",
    description: "Predicts high-flip areas (DOM <20 days) from sales velocity, investor inflows, and economic cycles.",
    image: "/images/usecases/layer2.png",
  },
  {
    title: "Future Displacement Risk Overlay",
    rows: "33,520 rows",
    description: "Flags areas at risk of resident displacement from rising costs, affordable housing site selection.",
    image: "/images/usecases/layer3.png",
  },
];

function DataCatalogueVisual() {
  const activeTab = "Smart Layers";
  return (
    <div className="h-full min-h-[643px] flex flex-col gap-5 p-6" style={{ background: "#f0f3f8" }}>
      <div className="flex gap-6 text-[13px] text-mistral-black/50 overflow-x-auto pb-1">
        {DATA_CATALOGUE_TABS.map((t) => {
          const isActive = t === activeTab;
          return (
            <span
              key={t}
              className={`shrink-0 ${
                isActive
                  ? "text-mistral-black font-semibold border-b border-mistral-black pb-1"
                  : "text-mistral-black/50"
              }`}
            >
              {t}
            </span>
          );
        })}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
        {DATA_CATALOGUE_CARDS.map((card) => (
          <div key={card.title} className="bg-white rounded-[14px] overflow-hidden flex flex-col border border-[#C7D7F8] shadow-sm">
            <div className="relative h-[160px] bg-mistral-beige-deep">
              <img src={card.image} alt={card.title} className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="p-4 flex flex-col gap-1.5 flex-1">
              <h4 className="font-semibold text-[14px] text-mistral-black leading-snug">{card.title}</h4>
              <p className="text-[11px] text-mistral-black/40">{card.rows}</p>
              <p className="text-[12px] text-mistral-black/65 leading-relaxed mt-1">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const REPORT_TEMPLATES = [
  { title: "General Report", description: "A general review of the parcel, considering key variables in construction" },
  { title: "Geotech / soils report", description: "Report for bearing capacity, groundwater, rock, slope stability" },
  { title: "General Geological study", description: "Wetlands/flood, stormwater, heritage/trees and other constraints" },
];

function AuditsVisual() {
  return (
    <div className="h-full min-h-[643px] grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 p-6" style={{ background: "#f0f3f8" }}>
      {/* Templates column */}
      <div className="flex flex-col gap-3 min-w-0">
        <p className="text-mistral-black/50 text-[12px]">Templates</p>
        {REPORT_TEMPLATES.map((tpl) => (
          <div key={tpl.title} className="bg-white border border-[#C7D7F8] rounded-[12px] p-4 shadow-sm">
            <h4 className="text-[13px] font-semibold text-mistral-black mb-1.5">{tpl.title}</h4>
            <p className="text-[11px] text-mistral-black/55 leading-relaxed">{tpl.description}</p>
          </div>
        ))}
        <div className="relative bg-mistral-black/95 text-white rounded-[12px] p-4 overflow-hidden">
          <h4 className="font-semibold text-[12px]">Advanced Geological study</h4>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-mistral-black opacity-60 pointer-events-none" />
        </div>
      </div>

      {/* Report panel */}
      <div className="bg-white border border-[#C7D7F8] rounded-[14px] p-5 shadow-sm flex flex-col min-h-0">
        <p className="text-mistral-black/45 text-[11px] mb-2">🌐 Report Produced by Columbus</p>
        <h3 className="text-[16px] font-semibold mb-2 leading-snug" style={{ color: "#1f2b5c" }}>
          Greenfield Minnesota Copper Porphyrrs
        </h3>
        <p className="text-mistral-black/65 text-[11px] leading-relaxed mb-4">
          A discrete subsurface density anomaly located in central Kansas has been identified as a high-priority exploration target for copper and associated sulfide mineralization. The target exhibits elevated rock density values relative to surrounding formations and aligns with regional structural features interpreted as potential pathways for mineralizing fluids.
        </p>
        <div className="relative w-full flex-1 min-h-[180px] rounded-[10px] overflow-hidden mb-3">
          <img src="/images/usecases/gmap.png" alt="Geological map" className="absolute inset-0 w-full h-full object-cover" />
          <button
            type="button"
            className="absolute top-3 left-3 bg-white text-mistral-black text-[11px] px-3 py-1 rounded-md shadow"
          >
            Interact with me
          </button>
        </div>
        <div className="border border-[#C7D7F8] rounded-[10px] p-2.5 flex items-center justify-between gap-2">
          <p className="text-mistral-black/40 text-[11px] truncate">Input a list of parcels (parcel ID, address, coordinates)</p>
          <div className="flex gap-1.5 shrink-0">
            <span className="bg-mistral-beige-deep text-mistral-black text-[10px] px-2.5 py-1 rounded-md">Upload File</span>
            <span className="bg-mistral-beige-deep text-mistral-black text-[10px] px-2.5 py-1 rounded-md">Select on map</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main section ─────────────────────────────────────────────────────────────

export function ColumbusFeatures() {
  const [activeId, setActiveId] = useState<TabId>("map-chat");
  const active = TABS.find((t) => t.id === activeId)!;

  useEffect(() => {
    const id = setTimeout(() => {
      const i = TABS.findIndex((t) => t.id === activeId);
      setActiveId(TABS[(i + 1) % TABS.length].id);
    }, TAB_CYCLE_MS);
    return () => clearTimeout(id);
  }, [activeId]);

  return (
    <>
      <style>{`
        @keyframes ds-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ds-track {
          animation: ds-scroll 28s linear infinite;
          will-change: transform;
        }
        .ds-group:hover .ds-track {
          animation-play-state: paused;
        }
      `}</style>

      <section className="py-10 md:py-[100px]">
        <div className="container bg-grid-pattern">

          {/* Heading 1 */}
          <div className="mb-10 md:mb-20 text-center" data-reveal>
            <div className="inline-flex items-center gap-3 justify-center">
              <img
                src="/images/Columbo.png"
                alt="Columbus"
                className="h-10 w-auto object-contain"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(8%) sepia(80%) saturate(1400%) hue-rotate(215deg) brightness(90%)",
                }}
              />
              <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-mistral-black">
                Columbus
              </h2>
            </div>
            <p className="mt-6 md:mt-12 text-sm leading-relaxed text-mistral-black/55 max-w-xl mx-auto">
              All-in-one map intelligence platform.
            </p>
          </div>

          {/* Columbus tabbed panel */}
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

            {/* Content: left text + right visual */}
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
                  href="/ColumbusDesign"
                  className="group mt-8 rounded-[7px] flex items-center justify-between w-full px-5 py-2.5 bg-mistral-black text-white text-sm font-medium transition-colors hover:bg-mistral-black/80"
                >
                  <span>{active.cta}</span>
                  <span className="text-mistral-orange transition-transform group-hover:translate-x-0.5">
                    <ArrowIcon />
                  </span>
                </a>
              </div>
              <div className="flex-1 overflow-hidden">
                {activeId === "map-chat" && <MapChatVisual />}
                {activeId === "data-catalogue" && <DataCatalogueVisual />}
                {activeId === "audits" && <AuditsVisual />}
              </div>
            </div>
          </div>

          {/* Heading 2 */}
          <div className="mt-20 md:mt-[100px] mb-10 md:mb-20" data-reveal>
            <h2 className="text-3xl md:text-5xl font-normal tracking-tight">
              High fidelity and smart data sets.
            </h2>
            <p className="mt-6 md:mt-12 text-sm leading-relaxed text-mistral-black/50 max-w-lg">
              We vet our data with reputable partner organizations.
            </p>
          </div>

          {/* Marquee strip */}
          <div className="ds-group group relative overflow-hidden" data-reveal data-reveal-delay="1">
            <a className="flex items-center relative w-full cursor-pointer" href="#">
              <div className="group-hover:blur-sm group-hover:opacity-60 transition-all duration-300 overflow-hidden flex items-center w-full relative">
                <div className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none w-24" style={{ background: "linear-gradient(to right, var(--color-background, white), transparent)" }} />
                <div className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none w-24" style={{ background: "linear-gradient(to left, var(--color-background, white), transparent)" }} />
                <div className="ds-track flex items-center gap-14">
                  {TRACK.map((logo, i) => (
                    <img
                      key={i}
                      src={logo.src}
                      alt={logo.alt}
                      className="flex-none h-[48px] w-auto object-contain"
                      style={{ filter: "grayscale(100%) opacity(0.5)" }}
                    />
                  ))}
                </div>
              </div>
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 flex items-center gap-2 px-5 py-2.5 bg-mistral-black text-white text-sm font-medium rounded-[7px] transition-all duration-300 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100">
                Learn more
                <svg className="size-3 shrink-0 text-mistral-orange" viewBox="0 0 9 13" fill="none" aria-hidden="true">
                  <circle cx="7.22"  cy="6.589" r="1.28" fill="currentColor" />
                  <circle cx="4.658" cy="4.018" r="1.28" fill="currentColor" />
                  <circle cx="2.099" cy="1.46"  r="1.28" fill="currentColor" />
                  <circle cx="4.658" cy="9.151" r="1.28" fill="currentColor" />
                  <circle cx="2.099" cy="11.718" r="1.28" fill="currentColor" />
                </svg>
              </span>
            </a>
          </div>

          {/* GIS block — video + text */}
          <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-center mt-20 md:mt-[100px]">
            <div className="w-full lg:flex-1" data-reveal>
              <div className="relative h-[360px] md:h-[480px] rounded-[20px] overflow-hidden">
                <video
                  src="/images/No-GISVid.mp4"
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            </div>
            <div
              className="w-full lg:flex-1 lg:max-w-[480px] flex flex-col gap-6"
              data-reveal
              data-reveal-delay="1"
            >
              <h2 className="text-3xl md:text-5xl font-normal tracking-tight">
                No GIS experience needed.
              </h2>
              <div className="flex flex-col gap-2">
                <p className="text-xl md:text-2xl font-normal tracking-tight leading-snug text-mistral-black/60">
                  Get to critical decisions faster.
                </p>
                <p className="text-xl md:text-2xl font-normal tracking-tight leading-snug text-mistral-black/60">
                  Faster site selection.
                </p>
              </div>
              <div className="pt-2">
                <a
                  href="/ColumbusDesign"
                  className="group rounded-[7px] inline-flex items-center gap-2 px-5 py-2.5 bg-mistral-black text-white text-sm font-medium transition-colors hover:bg-mistral-black/80"
                >
                  Your new GIS
                  <span className="text-mistral-orange transition-transform group-hover:translate-x-0.5">
                    <ArrowIcon />
                  </span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
