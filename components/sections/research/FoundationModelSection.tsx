/* eslint-disable @next/next/no-img-element */
import { FOUNDATION } from "@/content/research";

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

export function FoundationModelSection() {
  return (
    <section id="index" className="py-10 md:py-[100px]">
      <div className="container">
        {/* Heading + body + diagram */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 md:gap-16 mb-10 md:mb-20 items-start"
          data-reveal
        >
          <div>
            <p className="text-xs font-medium text-mistral-black/50 uppercase tracking-wider">
              {FOUNDATION.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl md:text-5xl font-normal tracking-tight text-mistral-black">
              {FOUNDATION.title}
            </h2>
            <div className="mt-6 md:mt-12 flex flex-col gap-5 text-sm md:text-base text-mistral-black/70 leading-relaxed max-w-xl">
              {FOUNDATION.bodyParagraphs.map((p, i) => (
                <p key={i} className="whitespace-pre-line">
                  {p}
                </p>
              ))}
            </div>
            <a
              href={FOUNDATION.ctaHref}
              className="group mt-8 inline-flex items-center gap-2 rounded-[7px] px-5 py-2 text-sm bg-mistral-black text-white transition-colors hover:bg-mistral-black/80"
            >
              <span>{FOUNDATION.ctaText}</span>
              <span className="text-mistral-orange transition-transform group-hover:translate-x-0.5">
                <DiagArrow className="size-3" />
              </span>
            </a>
          </div>

          <div
            className="relative border border-[#C7D7F8] rounded-[8px] bg-mistral-beige-deep aspect-[4/3] overflow-hidden"
            aria-hidden="true"
          >
            <img
              src={FOUNDATION.diagramImg}
              alt=""
              className="absolute inset-0 w-full h-full object-contain p-6 md:p-10"
            />
          </div>
        </div>

        {/* Comparison table */}
        <div
          className="border border-[#C7D7F8] rounded-[20px] bg-white overflow-hidden"
          data-reveal
          data-reveal-delay="1"
        >
          <div className="px-6 md:px-10 pt-6 md:pt-10 pb-4 md:pb-6 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs font-medium text-mistral-black/50 uppercase tracking-wider">
              <img src={FOUNDATION.brand.logo} alt="" aria-hidden="true" className="size-4" />
              <span>{FOUNDATION.brand.name}</span>
            </div>
            <h3 className="text-xl md:text-3xl font-normal tracking-tight text-mistral-black">
              {FOUNDATION.tableTitle}
            </h3>
          </div>

          {/* Header row */}
          <div className="grid grid-cols-[minmax(0,0.8fr)_repeat(3,minmax(0,1fr))] border-t border-[#C7D7F8]/60">
            <div />
            {FOUNDATION.models.map((model) => (
              <div
                key={model.key}
                className={`flex flex-col items-center text-center gap-2 px-4 md:px-6 py-5 md:py-6 border-l border-[#C7D7F8]/60 ${
                  model.isLgm ? "bg-mistral-beige-deep" : ""
                }`}
              >
                <img src={model.icon} alt="" aria-hidden="true" className="size-8 object-contain" />
                <h4
                  className={`text-base md:text-lg font-semibold tracking-tight ${
                    model.isLgm ? "text-mistral-black" : "text-mistral-black/85"
                  }`}
                >
                  {model.name}
                </h4>
                <p className="text-xs text-mistral-black/50">{model.subtitle}</p>
              </div>
            ))}
          </div>

          {/* Row 1: Trained on */}
          <ComparisonRow
            label={FOUNDATION.rows[0].label}
            cells={FOUNDATION.rows[0].cells!}
          />

          {/* Row 2: What it outputs */}
          <ComparisonRow
            label={FOUNDATION.rows[1].label}
            cells={FOUNDATION.rows[1].cells!}
          />

          {/* Row 3: Who's building it (logos) */}
          <div className="grid grid-cols-[minmax(0,0.8fr)_repeat(3,minmax(0,1fr))] border-t border-[#C7D7F8]/60">
            <div className="px-4 md:px-6 py-5 md:py-7 text-xs font-medium text-mistral-black/50 uppercase tracking-wider whitespace-pre-line">
              {FOUNDATION.rows[2].label}
            </div>
            {/* LLM logos */}
            <div className="px-4 md:px-6 py-5 md:py-7 border-l border-[#C7D7F8]/60 grid grid-cols-2 gap-3 items-center justify-items-center">
              {FOUNDATION.models[0].logos.map((logo) => (
                <img
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-7 md:max-h-9 w-auto object-contain opacity-80"
                />
              ))}
            </div>
            {/* VLM logos */}
            <div className="px-4 md:px-6 py-5 md:py-7 border-l border-[#C7D7F8]/60 flex flex-col gap-3 items-center justify-center">
              {FOUNDATION.models[1].logos.map((logo) => (
                <img
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-7 md:max-h-9 w-auto object-contain opacity-80"
                />
              ))}
            </div>
            {/* LGM brand */}
            <div className="px-4 md:px-6 py-5 md:py-7 border-l border-[#C7D7F8]/60 bg-mistral-beige-deep flex items-center justify-center gap-2">
              <img src={FOUNDATION.brand.logo} alt="" aria-hidden="true" className="size-5" />
              <span className="text-sm font-semibold text-mistral-black">
                {FOUNDATION.brand.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonRow({
  label,
  cells,
}: {
  label: string;
  cells: { heading: string; note: string }[];
}) {
  return (
    <div className="grid grid-cols-[minmax(0,0.8fr)_repeat(3,minmax(0,1fr))] border-t border-[#C7D7F8]/60">
      <div className="px-4 md:px-6 py-5 md:py-7 text-xs font-medium text-mistral-black/50 uppercase tracking-wider whitespace-pre-line">
        {label}
      </div>
      {cells.map((cell, i) => (
        <div
          key={cell.heading}
          className={`px-4 md:px-6 py-5 md:py-7 border-l border-[#C7D7F8]/60 flex flex-col gap-2 ${
            i === 2 ? "bg-mistral-beige-deep" : ""
          }`}
        >
          <h4 className="text-sm md:text-base font-semibold text-mistral-black leading-snug">
            {cell.heading}
          </h4>
          <p className="text-xs md:text-sm text-mistral-black/55 leading-relaxed">
            {cell.note}
          </p>
        </div>
      ))}
    </div>
  );
}
