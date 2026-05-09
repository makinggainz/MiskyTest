/* eslint-disable @next/next/no-img-element */
import { TIMELINE } from "@/content/research";

function DiagArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`shrink-0 ${className}`}
      width="14" height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 11L11 3M11 3H5.5M11 3V8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Timeline spans 2022 → 2028 inclusive (matches ColumbusPage source).
// 4% / 96% gutters; yearAt(y) places at start of year, yearMid at mid-year.
const yearAt = (y: number) => `${(4 + ((y - 2022) / 7) * 92).toFixed(2)}%`;
const yearMid = (y: number) => yearAt(y + 0.5);

export function TimelineSection() {
  // Columbus "now" marker placement — between 2025 and 2026.
  // Source uses dynamic `new Date()`; we mirror that here so the marker
  // tracks the build-time date the same way.
  const xColumbus = `calc(${yearMid(2025.5)} - 4px)`;

  // Stagger 2025 left and 2026 right so labels have breathing room.
  const x2025 = `calc(${yearMid(2025)} - clamp(140px, 16vw, 220px))`;
  const x2026 = `calc(${yearMid(2026)} + clamp(40px, 5vw, 80px))`;

  return (
    <section id="lgm-vs-llm" className="py-10 md:py-[100px]">
      <div className="container bg-grid-pattern">
        <div className="text-center mb-10 md:mb-20" data-reveal>
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-mistral-black max-w-3xl mx-auto">
            {TIMELINE.title}
          </h2>
          <p className="mt-6 md:mt-12 text-sm leading-relaxed text-mistral-black/55">
            {TIMELINE.lead}
          </p>
        </div>

        {/* Desktop timeline */}
        <div
          className="relative hidden md:block h-[260px] mb-10 md:mb-20"
          data-reveal
          data-reveal-delay="1"
          aria-hidden="true"
        >
          {/* Track */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-px h-px bg-mistral-black/15" />

          {/* Subtle rhythm dots */}
          {[2023, 2024, 2027].map((y) => (
            <span
              key={y}
              className="absolute top-1/2 -translate-y-1/2 size-1 rounded-full bg-mistral-black/20"
              style={{ left: yearMid(y) }}
            />
          ))}
          {["12%", "29%", "44.5%", "57%", "71.5%", "84%"].map((l) => (
            <span
              key={l}
              className="absolute top-1/2 -translate-y-1/2 size-[3px] rounded-full bg-mistral-black/10"
              style={{ left: l }}
            />
          ))}
          {/* Trailing dots past 2028 */}
          {[2029, 2030, 2031, 2032].map((y) => (
            <span
              key={y}
              className="absolute top-1/2 -translate-y-1/2 size-[3px] rounded-full bg-mistral-black/10"
              style={{ left: yearMid(y) }}
            />
          ))}

          {/* 2022 — top label, bottom year */}
          <Milestone xPercent={yearMid(2022)} label="LLM" year="2022" />

          {/* 2025 — staggered left */}
          <Milestone xPercent={x2025} label={TIMELINE.milestones[1].label} year="2025" />

          {/* Columbus marker — between 2025 and 2026 */}
          <div
            className="absolute flex flex-col items-center"
            style={{ left: xColumbus, bottom: "calc(50% + 4px)" }}
          >
            <span className="size-2 rounded-full bg-mistral-orange" />
            <span className="block w-px h-5 bg-mistral-orange/60" />
          </div>

          {/* 2026 — staggered right, with CTA */}
          <Milestone
            xPercent={x2026}
            label={TIMELINE.milestones[2].label}
            year="2026"
            cta={TIMELINE.milestones[2].cta}
          />

          {/* 2028 — UGM */}
          <Milestone
            xPercent={yearMid(2028)}
            label={TIMELINE.milestones[3].label}
            year="2028"
            cta={TIMELINE.milestones[3].cta}
          />
        </div>

        {/* Mobile / sr-only outline (also serves as compact mobile timeline) */}
        <ol
          className="md:hidden flex flex-col gap-5 mb-10 border-t border-mistral-black/10"
          data-reveal
          data-reveal-delay="1"
        >
          {TIMELINE.milestones.map((m) => (
            <li
              key={m.year}
              className="border-b border-mistral-black/10 pb-5 flex flex-col gap-1"
            >
              <span className="text-sm text-mistral-black/55">{m.year}</span>
              <span className="text-base font-semibold text-mistral-black whitespace-pre-line">
                {m.label}
              </span>
              {m.cta && (
                <a
                  href={m.cta.href}
                  className="group mt-2 inline-flex items-center gap-2 text-sm text-mistral-black"
                >
                  <span>{m.cta.text}</span>
                  <span className="text-mistral-orange transition-transform group-hover:translate-x-0.5">
                    <DiagArrow className="size-3" />
                  </span>
                </a>
              )}
            </li>
          ))}
        </ol>

        {/* SR-only outline */}
        <div className="sr-only">
          <h3>Timeline of foundational AI models</h3>
          <ul>
            {TIMELINE.srOutline.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        {/* Article card */}
        <a
          href={TIMELINE.articleCard.href}
          className="group block border border-[#C7D7F8] rounded-[20px] bg-mistral-beige-deep p-6 md:p-10 transition-colors hover:bg-mistral-beige-deep/80"
          data-reveal
          data-reveal-delay="2"
        >
          <p className="text-xs font-medium text-mistral-black/50 uppercase tracking-wider">
            {TIMELINE.articleCard.kicker}
          </p>
          <p className="mt-3 text-lg md:text-2xl text-mistral-black leading-snug">
            {TIMELINE.articleCard.headline}
          </p>
          <p className="mt-1 text-lg md:text-2xl text-mistral-black font-semibold leading-snug">
            {TIMELINE.articleCard.headlineStrong}
          </p>
        </a>
      </div>
    </section>
  );
}

function Milestone({
  xPercent,
  label,
  year,
  cta,
}: {
  xPercent: string;
  label: string;
  year: string;
  cta?: { text: string; href: string };
}) {
  return (
    <>
      {/* Label above + stem */}
      <div
        className="absolute flex flex-col items-center text-center"
        style={{ left: xPercent, bottom: "calc(50% + 12px)", transform: "translateX(-50%)" }}
      >
        <span className="text-sm md:text-base font-semibold text-mistral-black leading-snug whitespace-pre-line max-w-[160px]">
          {label}
        </span>
        <span className="block w-px h-5 bg-mistral-black/25 mt-2" />
      </div>
      {/* Year + optional CTA below */}
      <div
        className="absolute flex flex-col items-center text-center"
        style={{ left: xPercent, top: "calc(50% + 12px)", transform: "translateX(-50%)" }}
      >
        <span className="block w-px h-5 bg-mistral-black/25 mb-2" />
        <span className="text-sm text-mistral-black/55">{year}</span>
        {cta && (
          <a
            href={cta.href}
            className="group mt-2 inline-flex items-center gap-1.5 text-xs text-mistral-black"
          >
            <span>{cta.text}</span>
            <span className="text-mistral-orange transition-transform group-hover:translate-x-0.5">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path
                  d="M2 8l6-6M3.5 2H8v4.5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        )}
      </div>
    </>
  );
}
