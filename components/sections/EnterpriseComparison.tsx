/* eslint-disable @next/next/no-img-element */

const COLUMBUS_BULLETS = [
  "Highest fidelity, freshest geospatial data",
  "Understands space and coordinates natively",
  "Spatial and contextual reasoning over real maps",
  "Produces maps, layers, and visual outputs",
  "Built for the physical world and enterprise teams",
];

const BASIC_AI_BULLETS = [
  "Regurgitates old articles about an area",
  "Hallucinates coordinates 60% of the time",
  "Limited and stale data reach",
  "Text outputs only — no maps, no GIS",
  "Built for text, not the physical world",
];

function CheckIcon() {
  return (
    <svg
      className="size-4 shrink-0 mt-0.5 text-mistral-black"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 6.5l2.5 2.5 5.5-5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      className="size-4 shrink-0 mt-0.5 text-mistral-black/35"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 3l6 6M9 3l-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EnterpriseComparison() {
  return (
    <section className="py-10 md:py-[100px]">
      <div className="container bg-grid-pattern">

        <div className="mb-10 md:mb-20 text-center" data-reveal>
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-mistral-black">
            See how we&rsquo;re different.
          </h2>
          <p className="mt-6 md:mt-12 text-sm leading-relaxed text-mistral-black/55 max-w-xl mx-auto">
            What an agentic GIS does that a generic chatbot cannot.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          data-reveal
          data-reveal-delay="1"
        >
          {/* Columbus card */}
          <div className="border border-[#C7D7F8] rounded-[20px] bg-background flex flex-col overflow-hidden">
            <div className="px-6 md:px-8 pt-6 md:pt-8 pb-4 flex items-center gap-3 border-b border-[#C7D7F8]">
              <img
                src="/images/Columbo.png"
                alt=""
                aria-hidden="true"
                className="h-6 w-auto object-contain"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(8%) sepia(80%) saturate(1400%) hue-rotate(215deg) brightness(90%)",
                }}
              />
              <span className="text-base font-semibold text-mistral-black">Columbus Pro</span>
            </div>
            <div className="px-6 md:px-8 py-6 md:py-8 flex flex-col gap-3 flex-1">
              {COLUMBUS_BULLETS.map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-sm text-mistral-black leading-relaxed">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Basic AI card */}
          <div className="border border-[#C7D7F8] rounded-[20px] bg-background flex flex-col overflow-hidden">
            <div className="px-6 md:px-8 pt-6 md:pt-8 pb-4 flex items-center gap-3 border-b border-[#C7D7F8]">
              <span className="size-6 rounded-full bg-mistral-black/10" aria-hidden="true" />
              <span className="text-base font-semibold text-mistral-black/45">Basic AI</span>
            </div>
            <div className="px-6 md:px-8 py-6 md:py-8 flex flex-col gap-3 flex-1">
              {BASIC_AI_BULLETS.map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <XIcon />
                  <span className="text-sm text-mistral-black/55 leading-relaxed">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
