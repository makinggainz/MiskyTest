function DiagArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`shrink-0 ${className}`}
      width="18" height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 14L14 4M14 4H7M14 4V11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const FEATURED = {
  title: "Philosophy behind a Universal Geospatial Model",
  href: "#",
  // soft sunshine-200
  bg: "#C7D7F8",
};

const SMALL_CARDS = [
  {
    title: "MapsGPT Version 2.5. Architecture improvements.",
    href: "#",
    bg: "#A8C0F4", // sunshine-300
    dark: true,
  },
  {
    title: "Mimicking the adult brain.",
    href: "#",
    bg: "#EEF3FE", // sunshine-50
    dark: false,
  },
  {
    title: "Earth recipes.",
    href: "#",
    bg: "#DCE7FB", // sunshine-100
    dark: false,
  },
];

const LIST_ITEMS = [
  "Spatial embeddings at continental scale",
  "Real-time terrain synthesis for autonomous routing",
  "Releasing our geospatial foundation model weights",
  "How we index 3,400 datasets for sub-100ms queries",
];

export function ResearchSection() {
  return (
    <section className="py-10 md:py-[100px]">
      <div className="container bg-grid-pattern">

        {/* Centered header */}
        <div className="text-center mb-10 md:mb-20" data-reveal>
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight">
            Research Blog
          </h2>
          <p className="text-sm text-mistral-black/50 mt-3 max-w-[280px] mx-auto leading-relaxed">
            Explore the innovative research and recent papers from our team
          </p>
        </div>

        {/* Card row */}
        <div
          className="grid grid-cols-1 md:grid-cols-[2.5fr_1fr_1fr_1fr] gap-4 md:gap-4 items-stretch mb-10 md:mb-16"
          data-reveal
          data-reveal-delay="1"
        >
          {/* Featured card */}
          <div className="flex flex-col gap-4">
            <a
              href={FEATURED.href}
              className="group relative block border border-[#C7D7F8] rounded-[20px] overflow-hidden h-[260px] md:h-[380px]"
              style={{ backgroundColor: FEATURED.bg }}
            >
              <span className="absolute bottom-4 right-4 text-mistral-black/50 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <DiagArrow className="size-5" />
              </span>
            </a>
            <h3 className="text-base font-semibold text-mistral-black leading-snug">
              {FEATURED.title}
            </h3>
          </div>

          {/* Small cards */}
          {SMALL_CARDS.map((card) => (
            <a
              key={card.title}
              href={card.href}
              className="group relative block border border-[#C7D7F8] rounded-[20px] overflow-hidden h-[220px] md:h-[380px]"
              style={{ backgroundColor: card.bg }}
            >
              <p
                className={`absolute top-4 left-4 right-4 text-sm font-semibold leading-snug ${
                  card.dark ? "text-white" : "text-mistral-black"
                }`}
              >
                {card.title}
              </p>
              <span
                className={`absolute bottom-4 right-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                  card.dark ? "text-white/60" : "text-mistral-black/40"
                }`}
              >
                <DiagArrow className="size-4" />
              </span>
            </a>
          ))}
        </div>

        {/* Article list — narrower */}
        <div className="max-w-2xl mx-auto" data-reveal data-reveal-delay="2">
          {LIST_ITEMS.map((item, i) => (
            <a
              key={i}
              href="#"
              className="group flex items-center justify-between py-5 border-t border-mistral-black/10 hover:text-mistral-black/50 transition-colors"
            >
              <span className="text-base text-mistral-black group-hover:text-mistral-black/50 transition-colors">
                {item}
              </span>
              <DiagArrow className="size-5 ml-6 shrink-0 text-mistral-black/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
          <div className="border-t border-mistral-black/10" />
        </div>

      </div>
    </section>
  );
}
