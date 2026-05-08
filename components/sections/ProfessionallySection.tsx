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

// ── Feature visuals (scaled up for focused view) ──────────────────────────────

function ResumeVisual() {
  return (
    <div className="h-full bg-[#f0f3f8] rounded-[14px] p-6 flex flex-col gap-4">
      {/* Profile header */}
      <div className="flex items-center gap-4">
        <div className="size-12 rounded-full bg-[#C7D7F8] shrink-0" />
        <div className="flex flex-col gap-1.5 flex-1">
          <div className="h-2 w-32 rounded-full bg-mistral-black/20" />
          <div className="h-1.5 w-24 rounded-full bg-mistral-black/10" />
          <div className="h-1 w-40 rounded-full bg-mistral-black/10" />
        </div>
        <div className="self-start bg-white border border-[#C7D7F8] rounded-full px-2.5 py-1 flex items-center gap-1.5 shadow-sm shrink-0">
          <div className="size-1.5 rounded-full" style={{ background: "var(--color-mistral-orange)" }} />
          <span className="text-[9px] text-mistral-black/50">AI optimized</span>
        </div>
      </div>

      <div className="h-px bg-[#C7D7F8]" />

      {/* Experience block */}
      <div className="flex flex-col gap-2">
        <div className="h-1.5 w-24 rounded-full bg-[#C7D7F8]" />
        <div className="pl-3 border-l-2 border-[#C7D7F8] flex flex-col gap-1.5">
          <div className="h-1.5 w-44 rounded-full bg-mistral-black/20" />
          <div className="h-1 w-28 rounded-full bg-mistral-black/10" />
          <div className="h-1 w-full rounded-full bg-mistral-black/10" />
          <div className="h-1 w-5/6 rounded-full bg-mistral-black/10" />
        </div>
      </div>

      <div className="h-px bg-[#C7D7F8]" />

      {/* Skills block */}
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-1.5 w-16 rounded-full bg-[#C7D7F8]" />
        <div className="flex flex-wrap gap-1.5">
          {[64, 80, 52, 72, 48, 68, 56].map((w, i) => (
            <div key={i} className="h-5 rounded-full bg-white border border-[#C7D7F8]" style={{ width: `${w}px` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function JobMatchVisual() {
  const jobs = [
    { title: "Senior Product Manager", company: "TechCorp", location: "London", score: 96 },
    { title: "Growth Lead", company: "Elio Labs", location: "Remote", score: 88 },
    { title: "Product Strategist", company: "Mapsurf", location: "Berlin", score: 81 },
    { title: "Head of Product", company: "Northstar", location: "Paris", score: 74 },
  ];
  return (
    <div className="h-full bg-[#f0f3f8] rounded-[14px] p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold text-mistral-black uppercase tracking-wider">Matched for you</span>
        <span className="text-[10px] text-mistral-black/40">4 of 312 results</span>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        {jobs.map((job, i) => (
          <div key={i} className="flex-1 bg-white border border-[#C7D7F8] rounded-[12px] px-4 py-2.5 flex items-center gap-3">
            <div className="size-7 rounded-full bg-mistral-beige-deep shrink-0 flex items-center justify-center">
              <div className="size-3 rounded-full bg-[#C7D7F8]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium text-mistral-black truncate">{job.title}</p>
              <p className="text-[9px] text-mistral-black/40">{job.company} · {job.location}</p>
            </div>
            <div className="flex flex-col items-end shrink-0 gap-1">
              <span className="text-[11px] font-bold text-mistral-black">{job.score}%</span>
              <div className="w-14 h-1 rounded-full bg-[#C7D7F8] overflow-hidden">
                <div className="h-full rounded-full bg-mistral-black" style={{ width: `${job.score}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NetworkVisual() {
  const satellites = [
    { cx: "20%", cy: "20%", r: 6 },
    { cx: "78%", cy: "18%", r: 6 },
    { cx: "88%", cy: "54%", r: 5 },
    { cx: "66%", cy: "84%", r: 6 },
    { cx: "28%", cy: "80%", r: 5 },
    { cx: "10%", cy: "54%", r: 4 },
    { cx: "50%", cy: "12%", r: 5 },
  ];
  return (
    <div className="h-full bg-[#f0f3f8] rounded-[14px] overflow-hidden relative">
      <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
        {satellites.map((n, i) => (
          <line key={i} x1="50%" y1="50%" x2={n.cx} y2={n.cy} stroke="#C7D7F8" strokeWidth="1.5" />
        ))}
        {satellites.map((n, i) => (
          <circle key={i} cx={n.cx} cy={n.cy} r={n.r} fill="#C7D7F8" />
        ))}
        <circle cx="50%" cy="50%" r="24" fill="#154ACC" fillOpacity="0.07" />
        <circle cx="50%" cy="50%" r="11" fill="#154ACC" fillOpacity="0.5" />
      </svg>
      <div className="absolute top-4 left-4 bg-white border border-[#C7D7F8] rounded-full px-3 py-1.5 shadow-sm flex items-center gap-1.5">
        <div className="size-1.5 rounded-full opacity-60" style={{ background: "#154ACC" }} />
        <span className="text-[9px] text-mistral-black/50">3 new introductions</span>
      </div>
      <div className="absolute bottom-4 right-4 bg-white border border-[#C7D7F8] rounded-full px-3 py-1.5 shadow-sm">
        <span className="text-[9px] text-mistral-black/50">247 connections</span>
      </div>
    </div>
  );
}

function AnalyticsVisual() {
  const bars = [42, 55, 50, 68, 60, 78, 88];
  const stats = [
    { label: "Market rank", value: "Top 12%" },
    { label: "Skill gaps", value: "2 identified" },
  ];
  return (
    <div className="h-full bg-[#f0f3f8] rounded-[14px] p-5 flex flex-col gap-4">
      <div className="flex items-baseline justify-between">
        <span className="text-[10px] text-mistral-black/40 uppercase tracking-wider">Market value</span>
        <span className="text-sm font-semibold text-mistral-black">+18% YTD</span>
      </div>
      <div className="flex-1 flex items-end gap-2">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-[4px]"
            style={{
              height: `${h}%`,
              background: i === bars.length - 1 ? "#154ACC" : "#C7D7F8",
            }}
          />
        ))}
      </div>
      <div className="flex">
        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((m) => (
          <span key={m} className="text-[8px] text-mistral-black/30 flex-1 text-center">{m}</span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-[#C7D7F8] rounded-[10px] px-3 py-2">
            <p className="text-[9px] text-mistral-black/40">{s.label}</p>
            <p className="text-[11px] font-semibold text-mistral-black">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    id: "resume",
    name: "AI Resume Builder",
    description: "Draft a polished, role-tailored resume in seconds. Backed by real hiring data from thousands of job postings.",
    Visual: ResumeVisual,
  },
  {
    id: "jobs",
    name: "Smart Job Matching",
    description: "Surface roles ranked by fit, not keywords. The right opportunity, delivered at the right moment.",
    Visual: JobMatchVisual,
  },
  {
    id: "network",
    name: "Network Intelligence",
    description: "Know who to connect with and why. Warm paths, mutual contacts, and full relationship context.",
    Visual: NetworkVisual,
  },
  {
    id: "analytics",
    name: "Career Analytics",
    description: "Track your market value over time. Spot skill gaps before they hold you back.",
    Visual: AnalyticsVisual,
  },
] as const;

type FeatureId = (typeof FEATURES)[number]["id"];

// ── Section ───────────────────────────────────────────────────────────────────

export function ProfessionallySection() {
  const [activeId, setActiveId] = useState<FeatureId>("resume");
  const active = FEATURES.find((f) => f.id === activeId)!;

  return (
    <section className="my-10 md:my-24">
      <div className="container">

        {/* Section heading */}
        <div className="mb-10 md:mb-20" data-reveal>
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight">
            Meet Professionly.
          </h2>
        </div>

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

            {/* Left: numbered feature list (desktop only) */}
            <div className="hidden md:flex flex-col md:w-[220px] lg:w-[260px] shrink-0 border-r border-[#C7D7F8] bg-background">
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
                    <span
                      className={`text-sm leading-snug transition-colors ${
                        activeId === f.id
                          ? "font-medium text-mistral-black"
                          : "text-mistral-black/50 group-hover:text-mistral-black/75"
                      }`}
                    >
                      {f.name}
                    </span>
                  </button>
                ))}
              </div>
              <div className="p-5 border-t border-[#C7D7F8]">
                <a
                  href="#"
                  className="group rounded-full flex items-center justify-between w-full px-5 py-2.5 bg-mistral-black text-white text-sm font-medium transition-colors hover:bg-mistral-black/80"
                >
                  <span>Try Professionly</span>
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
              <div className="flex-1 min-h-[300px] md:min-h-[340px] p-5 md:p-6">
                <active.Visual />
              </div>
              {/* Description */}
              <div className="px-6 md:px-8 py-5 border-t border-[#C7D7F8] bg-background">
                <h3 className="text-xl font-semibold text-mistral-black mb-1.5">{active.name}</h3>
                <p className="text-sm leading-relaxed text-mistral-black/55">{active.description}</p>
                {/* Mobile CTA */}
                <div className="mt-5 md:hidden">
                  <a
                    href="#"
                    className="group rounded-full flex items-center justify-between w-full px-5 py-2.5 bg-mistral-black text-white text-sm font-medium transition-colors hover:bg-mistral-black/80"
                  >
                    <span>Try Professionly</span>
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
