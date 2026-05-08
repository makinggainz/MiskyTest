/* eslint-disable @next/next/no-img-element */

const DATA_SOURCES = [
  { name: "Satellite Imagery",   image: "/images/data-residential.jpg" },
  { name: "Consumer Behavior",   image: "/images/data-consumer.jpg" },
  { name: "Commercial Activity", image: "/images/data-commercial.jpg" },
  { name: "Urban Planning",      image: "/images/data-urban.jpg" },
  { name: "Logistics Networks",  image: "/images/data-logistics.webp" },
  { name: "Site Selection",      image: "/images/data-site-selection.jpg" },
];

// Duplicate for seamless loop
const TRACK = [...DATA_SOURCES, ...DATA_SOURCES];

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

      <section className="my-10 md:my-24">
        <div className="container">

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
                <div className="ds-track flex items-stretch gap-4">
                  {TRACK.map((source, i) => (
                    <div
                      key={i}
                      className="relative flex-none rounded-[20px] overflow-hidden"
                      style={{ width: "300px", height: "200px" }}
                    >
                      <img
                        src={source.image}
                        alt={source.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                      {/* Label */}
                      <p className="absolute bottom-4 left-5 text-white text-sm font-semibold">
                        {source.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Central hover pill — same pattern as "Meet our customers" */}
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

        </div>
      </section>
    </>
  );
}
