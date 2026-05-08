/* eslint-disable @next/next/no-img-element */

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

// ── Feature visuals ───────────────────────────────────────────────────────────

function ResumeVisual() {
  return (
    <div className="h-full bg-[#f0f3f8] rounded-[14px] p-4 flex flex-col gap-2.5">
      <div className="flex items-center gap-2.5">
        <div className="size-7 rounded-full bg-[#C7D7F8] shrink-0" />
        <div className="flex flex-col gap-1">
          <div className="h-1.5 w-20 rounded-full bg-mistral-black/20" />
          <div className="h-1 w-14 rounded-full bg-mistral-black/10" />
        </div>
      </div>
      <div className="h-px bg-[#C7D7F8]" />
      <div className="flex flex-col gap-1.5 flex-1">
        <div className="h-1 w-full rounded-full bg-mistral-black/15" />
        <div className="h-1 w-4/5 rounded-full bg-mistral-black/10" />
        <div className="h-1 w-full rounded-full bg-mistral-black/15" />
        <div className="h-1 w-3/4 rounded-full bg-mistral-black/10" />
        <div className="h-px bg-[#C7D7F8] my-1" />
        <div className="h-1 w-1/3 rounded-full bg-[#C7D7F8]" />
        <div className="h-1 w-full rounded-full bg-mistral-black/10" />
        <div className="h-1 w-4/5 rounded-full bg-mistral-black/10" />
      </div>
      <div className="self-end bg-white border border-[#C7D7F8] rounded-full px-2.5 py-1 flex items-center gap-1.5 shadow-sm">
        <div className="size-1.5 rounded-full" style={{ background: "var(--color-mistral-orange)" }} />
        <span className="text-[9px] text-mistral-black/50">AI suggested</span>
      </div>
    </div>
  );
}

function JobMatchVisual() {
  const jobs = [
    { title: "Senior Product Manager", company: "TechCorp", score: 96 },
    { title: "Growth Lead", company: "Elio Labs", score: 88 },
    { title: "Product Strategist", company: "Mapsurf", score: 79 },
  ];
  return (
    <div className="h-full bg-[#f0f3f8] rounded-[14px] p-3 flex flex-col justify-between gap-2">
      {jobs.map((job, i) => (
        <div
          key={i}
          className="flex-1 bg-white border border-[#C7D7F8] rounded-[10px] px-3 py-2 flex items-center gap-2.5"
        >
          <div className="size-5 rounded-full bg-mistral-beige-deep shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-medium text-mistral-black truncate">{job.title}</p>
            <p className="text-[9px] text-mistral-black/40">{job.company}</p>
          </div>
          <div className="flex flex-col items-end shrink-0">
            <span className="text-[10px] font-bold text-mistral-black">{job.score}%</span>
            <div className="w-12 h-1 rounded-full bg-[#C7D7F8] overflow-hidden mt-0.5">
              <div className="h-full rounded-full bg-mistral-black" style={{ width: `${job.score}%` }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function NetworkVisual() {
  return (
    <div className="h-full bg-[#f0f3f8] rounded-[14px] overflow-hidden relative">
      <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
        <line x1="50%" y1="50%" x2="22%" y2="20%" stroke="#C7D7F8" strokeWidth="1.5" />
        <line x1="50%" y1="50%" x2="78%" y2="20%" stroke="#C7D7F8" strokeWidth="1.5" />
        <line x1="50%" y1="50%" x2="12%" y2="66%" stroke="#C7D7F8" strokeWidth="1.5" />
        <line x1="50%" y1="50%" x2="86%" y2="66%" stroke="#C7D7F8" strokeWidth="1.5" />
        <line x1="50%" y1="50%" x2="50%" y2="88%" stroke="#C7D7F8" strokeWidth="1.5" />
        <circle cx="22%" cy="20%" r="6" fill="#C7D7F8" />
        <circle cx="78%" cy="20%" r="6" fill="#C7D7F8" />
        <circle cx="12%" cy="66%" r="5" fill="#C7D7F8" />
        <circle cx="86%" cy="66%" r="5" fill="#C7D7F8" />
        <circle cx="50%" cy="88%" r="6" fill="#C7D7F8" />
        <circle cx="50%" cy="50%" r="18" fill="#154ACC" fillOpacity="0.08" />
        <circle cx="50%" cy="50%" r="9" fill="#154ACC" fillOpacity="0.5" />
      </svg>
      <div className="absolute bottom-3 right-3 bg-white border border-[#C7D7F8] rounded-full px-2.5 py-1 shadow-sm">
        <span className="text-[9px] text-mistral-black/50">247 connections</span>
      </div>
    </div>
  );
}

function AnalyticsVisual() {
  const bars = [42, 55, 50, 65, 60, 78, 88];
  return (
    <div className="h-full bg-[#f0f3f8] rounded-[14px] p-4 flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <span className="text-[9px] text-mistral-black/40 uppercase tracking-wider">Market value</span>
        <span className="text-[11px] font-semibold text-mistral-black">+18% YTD</span>
      </div>
      <div className="flex-1 flex items-end gap-1.5">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-[3px]"
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

// ── Section ───────────────────────────────────────────────────────────────────

export function ProfessionallySection() {
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
          className="border border-[#C7D7F8] rounded-[20px] overflow-hidden flex flex-col lg:flex-row"
          data-reveal
          data-reveal-delay="1"
        >
          {/* Left: intro + CTA */}
          <div className="lg:w-[280px] xl:w-[340px] shrink-0 p-8 md:p-10 bg-background border-b lg:border-b-0 lg:border-r border-[#C7D7F8] flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-medium text-mistral-black/40 uppercase tracking-wider">
                Product
              </span>
              <p className="text-sm leading-relaxed text-mistral-black/55">
                The professional growth platform built for ambitious careers. AI-powered tools that understand the job market and help you navigate it.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="group rounded-full flex items-center justify-between w-full px-5 py-2.5 bg-mistral-black text-white text-sm font-medium transition-colors hover:bg-mistral-black/80"
              >
                <span>Try Professionly</span>
                <span className="text-mistral-orange transition-transform group-hover:translate-x-0.5">
                  <ArrowIcon />
                </span>
              </a>
              <p className="text-xs text-mistral-black/25 text-center">Example for display purpose only</p>
            </div>
          </div>

          {/* Right: 2×2 feature grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2">
            {FEATURES.map((feature, i) => {
              const isLastRow = i >= 2;
              const isRightCol = i % 2 === 1;
              const isLastItem = i === FEATURES.length - 1;
              return (
                <div
                  key={feature.id}
                  className={[
                    "p-5 flex flex-col gap-3 border-[#C7D7F8]",
                    !isLastItem ? "border-b sm:border-b-0" : "",
                    !isLastRow ? "sm:border-b" : "",
                    !isRightCol ? "sm:border-r" : "",
                  ].join(" ")}
                >
                  <div className="h-36">
                    <feature.Visual />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold text-mistral-black">{feature.name}</p>
                    <p className="text-xs leading-relaxed text-mistral-black/50">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
