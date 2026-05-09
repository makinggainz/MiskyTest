/* eslint-disable @next/next/no-img-element */

const DATA_SOURCES = [
  "Satellite Imagery",
  "Consumer Behavior",
  "Commercial Activity",
  "Urban Planning",
  "Logistics Networks",
  "Site Selection",
  "Demographics",
  "Land Use Zoning",
  "Transit Accessibility",
  "Office Vacancy",
  "Luxury Retail Footfall",
  "Flood Risk Layers",
];

// Duplicate for seamless loop
const TRACK = [...DATA_SOURCES, ...DATA_SOURCES];

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

export function DataSourcesSection() {
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

          {/* Header */}
          <div className="mb-10 md:mb-20" data-reveal>
            <h2 className="text-3xl md:text-5xl font-normal tracking-tight">
              High fidelity and smart data sets.
            </h2>
            <p className="text-sm leading-relaxed text-mistral-black/50 mt-3 max-w-lg">
              We vet our data with reputable partner organizations.
            </p>
          </div>

          {/* Marquee strip */}
          <div className="ds-group group relative overflow-hidden" data-reveal data-reveal-delay="1">
            <a className="flex items-center relative w-full cursor-pointer" href="#">

              {/* Scrolling track — blurs on hover */}
              <div
                className="group-hover:blur-sm group-hover:opacity-60 transition-all duration-300 overflow-hidden whitespace-nowrap flex items-center w-full"
              >
                <div className="ds-track flex items-center gap-3">
                  {TRACK.map((name, i) => (
                    <span
                      key={i}
                      className="flex-none px-5 py-2.5 rounded-full border border-[#C7D7F8] bg-background text-sm text-mistral-black/70 whitespace-nowrap"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Central hover pill */}
              <span
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 flex items-center gap-2 px-5 py-2.5 bg-mistral-black text-white text-sm font-medium rounded-full transition-all duration-300 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
              >
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

          {/* GIS block — image + text */}
          <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-center mt-20 md:mt-[100px]">

            {/* Left: image */}
            <div className="w-full lg:flex-1" data-reveal>
              <div className="relative h-[360px] md:h-[480px] rounded-[20px] overflow-hidden">
                <img
                  src="/images/CityScape.png"
                  alt="Columbus GIS in action"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right: text */}
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
                  className="group rounded-full inline-flex items-center gap-2 px-5 py-2.5 bg-mistral-black text-white text-sm font-medium transition-colors hover:bg-mistral-black/80"
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
