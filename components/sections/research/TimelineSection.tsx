/* eslint-disable @next/next/no-img-element */
import { TIMELINE } from "@/content/research";

function ArrowOut({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`shrink-0 ${className}`}
      width="10" height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 8l6-6M3.5 2H8v4.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Stop = {
  year?: string;
  label?: string;
  cta?: { text: string; href: string };
  isNow?: boolean;
};

export function TimelineSection() {
  // 5 evenly-spaced stops on a single horizontal line.
  // Order: 2022 → 2025 → Columbus "now" → 2026 → 2028.
  const stops: Stop[] = [
    { year: TIMELINE.milestones[0].year, label: TIMELINE.milestones[0].label },
    { year: TIMELINE.milestones[1].year, label: TIMELINE.milestones[1].label },
    { isNow: true, label: TIMELINE.columbusMarker.label },
    {
      year: TIMELINE.milestones[2].year,
      label: TIMELINE.milestones[2].label,
      cta: TIMELINE.milestones[2].cta,
    },
    {
      year: TIMELINE.milestones[3].year,
      label: TIMELINE.milestones[3].label,
      cta: TIMELINE.milestones[3].cta,
    },
  ];

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

        {/* Desktop / tablet — horizontal 5-column timeline */}
        <div className="relative hidden md:block mb-10 md:mb-20" data-reveal data-reveal-delay="1">
          {/* Track */}
          <div
            className="absolute left-0 right-0 h-px bg-mistral-black/15 pointer-events-none"
            style={{ top: "calc(50% + 0.5px)" }}
            aria-hidden="true"
          />

          <div className="relative grid grid-cols-5">
            {stops.map((stop, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                {/* Top-of-line content */}
                <div className="flex flex-col items-center gap-3 pb-6 min-h-[120px] justify-end">
                  {stop.label && (
                    <span
                      className={`text-sm md:text-base font-semibold leading-snug whitespace-pre-line max-w-[160px] ${
                        stop.isNow ? "text-mistral-orange uppercase tracking-wider text-xs" : "text-mistral-black"
                      }`}
                    >
                      {stop.label}
                    </span>
                  )}
                  <span
                    className={`block w-px h-5 ${
                      stop.isNow ? "bg-mistral-orange/60" : "bg-mistral-black/25"
                    }`}
                    aria-hidden="true"
                  />
                </div>

                {/* Dot on the line */}
                <span
                  className={`relative z-10 rounded-full ${
                    stop.isNow
                      ? "size-2.5 bg-mistral-orange"
                      : "size-2 bg-mistral-black/60"
                  }`}
                  aria-hidden="true"
                />

                {/* Below-line content */}
                <div className="flex flex-col items-center gap-2 pt-6 min-h-[100px]">
                  {stop.isNow && stop.label === "now" ? (
                    <img
                      src="/logobueno.png"
                      alt="Columbus"
                      className="h-7 w-auto opacity-80"
                    />
                  ) : (
                    <span className="text-sm text-mistral-black/55">{stop.year}</span>
                  )}
                  {stop.cta && (
                    <a
                      href={stop.cta.href}
                      className="group inline-flex items-center gap-1.5 text-xs text-mistral-black"
                    >
                      <span>{stop.cta.text}</span>
                      <span className="text-mistral-orange transition-transform group-hover:translate-x-0.5">
                        <ArrowOut className="size-2.5" />
                      </span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile — vertical milestone list */}
        <ol
          className="md:hidden flex flex-col mb-10 border-t border-mistral-black/10"
          data-reveal
          data-reveal-delay="1"
        >
          {stops.map((stop, i) => (
            <li
              key={i}
              className={`border-b border-mistral-black/10 py-5 flex flex-col gap-1 ${
                stop.isNow ? "bg-mistral-beige-deep -mx-4 px-4" : ""
              }`}
            >
              {stop.isNow ? (
                <>
                  <span className="text-xs font-medium uppercase tracking-wider text-mistral-orange">
                    {stop.label}
                  </span>
                  <img
                    src="/logobueno.png"
                    alt="Columbus"
                    className="h-7 w-auto self-start opacity-80 mt-1"
                  />
                </>
              ) : (
                <>
                  <span className="text-sm text-mistral-black/55">{stop.year}</span>
                  <span className="text-base font-semibold text-mistral-black whitespace-pre-line">
                    {stop.label}
                  </span>
                  {stop.cta && (
                    <a
                      href={stop.cta.href}
                      className="group mt-2 inline-flex items-center gap-2 text-sm text-mistral-black self-start"
                    >
                      <span>{stop.cta.text}</span>
                      <span className="text-mistral-orange transition-transform group-hover:translate-x-0.5">
                        <ArrowOut className="size-3" />
                      </span>
                    </a>
                  )}
                </>
              )}
            </li>
          ))}
        </ol>

        {/* SR-only authoritative outline */}
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
