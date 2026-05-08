"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";

const DATA_SOURCES = [
  { name: "Satellite Imagery",    image: "/images/data-residential.jpg" },
  { name: "Consumer Behavior",    image: "/images/data-consumer.jpg" },
  { name: "Commercial Activity",  image: "/images/data-commercial.jpg" },
  { name: "Urban Planning",       image: "/images/data-urban.jpg" },
  { name: "Logistics Networks",   image: "/images/data-logistics.webp" },
  { name: "Site Selection",       image: "/images/data-site-selection.jpg" },
];

export function DataSourcesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.querySelector("a") as HTMLElement | null;
    const w = card ? card.offsetWidth + 16 : 320;
    container.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <section className="my-10 md:my-24">
      <div className="container">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-20" data-reveal>
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl md:text-5xl font-normal tracking-tight">
              High fidelity and smart data sets.
            </h2>
            <p className="text-sm leading-relaxed text-mistral-black/50 max-w-lg">
              We vet our data with reputable partner organizations.
            </p>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => scroll(-1)}
              aria-label="Previous"
              className="size-10 flex items-center justify-center rounded-full bg-mistral-beige-deep hover:bg-[#C7D7F8] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Next"
              className="size-10 flex items-center justify-center rounded-full bg-mistral-beige-deep hover:bg-[#C7D7F8] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2"
          style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
          data-reveal
          data-reveal-delay="1"
        >
          {DATA_SOURCES.map((source) => (
            <a
              key={source.name}
              href="#"
              className="relative group overflow-hidden rounded-[20px] flex-none"
              style={{
                scrollSnapAlign: "start",
                width: "calc(33.333% - 11px)",
                minWidth: "280px",
                aspectRatio: "4 / 3",
              }}
            >
              {/* Photo */}
              <img
                src={source.image}
                alt={source.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
              />
              {/* Blue tint — same as ColumbusPage Applications */}
              <div className="absolute inset-0 transition-opacity duration-300" style={{ backgroundColor: "rgba(37, 99, 235, 0.18)" }} />
              {/* Dark gradient from bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Title — lifts on hover */}
              <div className="absolute inset-x-0 bottom-0 z-20 px-5 pb-6 translate-y-0 group-hover:-translate-y-8 transition-transform duration-300 ease-out">
                <h3 className="text-base font-semibold text-white">{source.name}</h3>
              </div>

              {/* Learn more — fades in on hover */}
              <div className="absolute inset-x-0 bottom-0 z-20 px-5 pb-6 flex items-center gap-4 group-hover:gap-8 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                <span className="text-white/90 text-sm font-medium">Learn more</span>
                <svg width="10" height="18" viewBox="0 0 7 12" fill="none" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M1 1l5 5-5 5" />
                </svg>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
