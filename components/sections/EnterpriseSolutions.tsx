"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { MapShape } from "@/components/MapShape";

type Solution = {
  id: string;
  eyebrow: string;
  heading: string;
  body: string;
  bullets: [string, string, string];
  image: string;
  Overlay: () => React.ReactElement;
};

// ── Right-side overlays ──────────────────────────────────────────────────────
// Each overlay sits on top of its map image, in MistX's chat-bubble / pale-card
// vocabulary. Native re-creations of the use-case visuals from ColumbusPage's
// /columbus-solutions, redrawn so they sit naturally next to the homepage.

function LayersOverlay() {
  const layers = [
    { name: "Solar Potential", swatch: "#F4C752" },
    { name: "Foot Traffic Density", swatch: "#5FBFF1" },
    { name: "Safety Score", swatch: "#01A35D" },
    { name: "Vibrancy Index", swatch: "#DE2F32" },
    { name: "Heat Risk", swatch: "#E97A2C" },
    { name: "Green Cover", swatch: "#7FB670" },
  ];
  return (
    <div className="absolute top-6 left-6 right-6 md:top-8 md:left-8 md:right-auto md:max-w-[280px] bg-white/95 backdrop-blur border border-[#C7D7F8] rounded-[14px] shadow-sm p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-widest font-semibold text-mistral-black/40">Active layers</span>
        <span className="text-[10px] text-mistral-black/45 bg-[#f0ede8] px-2 py-0.5 rounded-full">6 of 124</span>
      </div>
      <div className="flex flex-col gap-2">
        {layers.map((l) => (
          <div key={l.name} className="flex items-center gap-2.5">
            <span className="size-2.5 rounded-full" style={{ background: l.swatch }} aria-hidden="true" />
            <span className="text-[12px] text-mistral-black flex-1 truncate">{l.name}</span>
            <span className="text-[10px] text-mistral-black/40">on</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ForecastOverlay() {
  const stats = [
    { label: "Foot traffic in 6 months", value: "+18%", tone: "pos" },
    { label: "Gentrification risk", value: "High", tone: "warn" },
    { label: "Commercial vacancy", value: "−4.2%", tone: "pos" },
    { label: "Crime index forecast", value: "−11%", tone: "pos" },
  ];
  return (
    <div className="absolute inset-x-6 bottom-6 md:inset-x-8 md:bottom-8 flex flex-col gap-3">
      <div className="bg-white/95 backdrop-blur border border-[#C7D7F8] rounded-[14px] shadow-sm p-4 grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-1">
            <span className="text-[10px] text-mistral-black/45 leading-tight">{s.label}</span>
            <span
              className={`text-base font-semibold tracking-tight ${
                s.tone === "pos" ? "text-emerald-600" : "text-amber-600"
              }`}
            >
              {s.value}
            </span>
          </div>
        ))}
      </div>
      <div className="bg-white/95 backdrop-blur border border-[#C7D7F8] rounded-full shadow-sm px-4 py-2 flex items-center justify-between">
        {["2025", "2026", "2027", "2028"].map((y, i) => (
          <span
            key={y}
            className={`text-[11px] font-medium ${
              i === 1 ? "text-mistral-black bg-mistral-beige-deep px-2.5 py-0.5 rounded-full" : "text-mistral-black/40"
            }`}
          >
            {y}
          </span>
        ))}
      </div>
    </div>
  );
}

function AuditOverlay() {
  const checks = [
    { label: "Zoning compliance verified", state: "ok" },
    { label: "Environmental risk assessment", state: "ok" },
    { label: "Infrastructure capacity report", state: "ok" },
    { label: "Neighbouring land-use analysis", state: "ok" },
    { label: "Historical incident review", state: "pending" },
  ];
  return (
    <div className="absolute top-6 right-6 md:top-8 md:right-8 md:max-w-[300px] bg-white/95 backdrop-blur border border-[#C7D7F8] rounded-[14px] shadow-sm p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-widest font-semibold text-mistral-black/40">Due-diligence report</span>
      </div>
      <div className="flex flex-col gap-2">
        {checks.map((c) => (
          <div key={c.label} className="flex items-center gap-2.5">
            <span
              className={`size-4 shrink-0 rounded-full flex items-center justify-center text-[9px] font-bold ${
                c.state === "ok" ? "bg-emerald-500/15 text-emerald-600" : "bg-amber-500/15 text-amber-600"
              }`}
              aria-hidden="true"
            >
              {c.state === "ok" ? "✓" : "…"}
            </span>
            <span className="text-[12px] text-mistral-black/80 leading-snug">{c.label}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-[#C7D7F8] pt-3 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-mistral-black">4 / 5 checks passed</span>
        <span className="text-[10px] text-amber-600">In progress</span>
      </div>
    </div>
  );
}

function ComplianceOverlay() {
  const items = [
    { label: "GDPR Art. 9", state: "Compliant", tone: "ok" },
    { label: "FAA Part 107", state: "Compliant", tone: "ok" },
    { label: "Local zoning §14.2", state: "Review needed", tone: "warn" },
    { label: "EPA §1502", state: "Compliant", tone: "ok" },
  ];
  return (
    <div className="absolute inset-x-6 bottom-6 md:inset-x-auto md:bottom-8 md:left-8 md:right-8 bg-white/95 backdrop-blur border border-[#C7D7F8] rounded-[14px] shadow-sm p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-widest font-semibold text-mistral-black/40">Regulatory overview</span>
        <span className="text-[10px] text-mistral-black/45">Checked just now</span>
      </div>
      <div className="flex flex-col">
        {items.map((it, i) => (
          <div
            key={it.label}
            className={`flex items-center justify-between py-2 ${i !== items.length - 1 ? "border-b border-[#C7D7F8]/70" : ""}`}
          >
            <span className="text-[12px] text-mistral-black">{it.label}</span>
            <span
              className={`text-[11px] font-semibold ${
                it.tone === "ok" ? "text-emerald-600" : "text-amber-600"
              }`}
            >
              {it.state}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Solutions data ───────────────────────────────────────────────────────────

const SOLUTIONS: Solution[] = [
  {
    id: "creative-layers",
    eyebrow: "01",
    heading: "Creative data layers.",
    body:
      "Compose a map from any data you can name — and many you can't. Columbus turns natural-language asks into stacked layers you can interrogate, save, and share.",
    bullets: [
      "Hundreds of vetted base layers across demographics, terrain, infrastructure, and risk",
      "Stack, blend, and threshold layers without writing SQL or geo expressions",
      "Save and share custom layer recipes across your team",
    ],
    image: "/images/HK-Map-2.png",
    Overlay: LayersOverlay,
  },
  {
    id: "predict-future",
    eyebrow: "02",
    heading: "Predict the future.",
    body:
      "Forecast what an area is becoming, not just what it is. Columbus surfaces growth, displacement, and saturation signals so your team can move before the market does.",
    bullets: [
      "Six-month and multi-year forecasts grounded in real signals, not generic trends",
      "Gentrification, vacancy, and crime indices pre-built and ready to drop in",
      "Scenario sliders for headwinds, tailwinds, and policy interventions",
    ],
    image: "/images/enterprise/consumer-city.png",
    Overlay: ForecastOverlay,
  },
  {
    id: "automated-audits",
    eyebrow: "03",
    heading: "Automated audits & due diligence.",
    body:
      "Spin up a complete diligence pack from a single prompt. What used to take a research team three weeks now takes minutes — and the math is auditable.",
    bullets: [
      "Zoning, environmental, infrastructure, and incident reviews stitched into one report",
      "Every claim links back to the dataset, layer, and parcel it came from",
      "Templates for site selection, acquisition, and permitting workflows",
    ],
    image: "/images/enterprise/barca.png",
    Overlay: AuditOverlay,
  },
  {
    id: "regulatory-compliance",
    eyebrow: "04",
    heading: "Easy regulatory compliance.",
    body:
      "Stay current with the rules that move under your feet. Columbus monitors the regulations that touch your portfolio and flags the ones that need attention.",
    bullets: [
      "Continuous checks against federal, state, and local rule sets",
      "Plain-English summaries with citations into the underlying statute",
      "Alerts when a parcel, route, or asset slips out of compliance",
    ],
    image: "/images/enterprise/tokyo.png",
    Overlay: ComplianceOverlay,
  },
];

// ── Component ────────────────────────────────────────────────────────────────

export function EnterpriseSolutions() {
  const [activeIdx, setActiveIdx] = useState(0);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the largest intersectionRatio that's currently
        // intersecting. Avoids jitter when two items overlap the trigger band.
        let best = -1;
        let bestRatio = 0;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            if (!Number.isNaN(idx)) {
              best = idx;
              bestRatio = entry.intersectionRatio;
            }
          }
        });
        if (best >= 0) setActiveIdx(best);
      },
      {
        // Activate when the item's middle band crosses the centre of the viewport.
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const Active = SOLUTIONS[activeIdx];

  return (
    <section className="relative py-10 md:py-[100px]">
      <MapShape placement="top-left" />
      <div className="container bg-grid-pattern relative z-10">

        {/* Section heading */}
        <div className="mb-10 md:mb-20 text-center" data-reveal>
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-mistral-black inline-flex items-center gap-3 justify-center">
            <img
              src="/images/Columbo.png"
              alt=""
              aria-hidden="true"
              className="h-[1em] w-auto object-contain"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(8%) sepia(80%) saturate(1400%) hue-rotate(215deg) brightness(90%)",
              }}
            />
            Four jobs. One agent.
          </h2>
          <p className="mt-6 md:mt-12 text-sm leading-relaxed text-mistral-black/55 max-w-xl mx-auto">
            The use cases that cover most of what an enterprise GIS team ships in a quarter — each grounded in real data, not a tour of features.
          </p>
        </div>

        {/* Sticky scroll grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-10 lg:gap-16">

          {/* LEFT — text rail (single tall column on desktop) */}
          <div className="flex flex-col">
            {SOLUTIONS.map((s, i) => (
              <div
                key={s.id}
                ref={(el) => { itemRefs.current[i] = el; }}
                data-idx={i}
                className="py-10 lg:py-24 lg:min-h-[60vh] flex flex-col justify-center gap-4 border-t border-[#C7D7F8] first:border-t-0"
                data-reveal
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold tracking-widest text-mistral-black/40">
                    {s.eyebrow}
                  </span>
                  <span
                    className={`h-px flex-1 transition-colors duration-500 ${
                      i === activeIdx ? "bg-mistral-black/30" : "bg-mistral-black/10"
                    }`}
                  />
                </div>
                <h3
                  className={`text-2xl md:text-3xl font-normal tracking-tight transition-colors duration-500 ${
                    i === activeIdx ? "text-mistral-black" : "text-mistral-black/35"
                  }`}
                >
                  {s.heading}
                </h3>
                <p
                  className={`text-base leading-relaxed transition-colors duration-500 ${
                    i === activeIdx ? "text-mistral-black/65" : "text-mistral-black/35"
                  }`}
                >
                  {s.body}
                </p>
                <ul className="flex flex-col gap-2 mt-1">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className={`flex items-start gap-2.5 text-sm leading-relaxed transition-colors duration-500 ${
                        i === activeIdx ? "text-mistral-black/65" : "text-mistral-black/30"
                      }`}
                    >
                      <span
                        className={`mt-2 size-1.5 rounded-full shrink-0 transition-colors duration-500 ${
                          i === activeIdx ? "bg-mistral-orange" : "bg-mistral-black/20"
                        }`}
                        aria-hidden="true"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Mobile-only inline visual (sticky disappears on <lg) */}
                <div className="lg:hidden mt-4 relative h-[320px] rounded-[20px] border border-[#C7D7F8] overflow-hidden bg-white">
                  <img
                    src={s.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {(() => {
                    const O = s.Overlay;
                    return <O />;
                  })()}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — sticky visual (desktop only) */}
          <div className="hidden lg:block">
            <div className="sticky top-24 h-[640px] rounded-[20px] border border-[#C7D7F8] overflow-hidden bg-white">
              {SOLUTIONS.map((s, i) => (
                <div
                  key={s.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    i === activeIdx ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                  aria-hidden={i !== activeIdx}
                >
                  <img
                    src={s.image}
                    alt={Active.heading}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {(() => {
                    const O = s.Overlay;
                    return <O />;
                  })()}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}