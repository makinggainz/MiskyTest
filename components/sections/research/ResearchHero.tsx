import { HERO, NAV_ITEMS } from "@/content/research";

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`shrink-0 ${className}`}
      width="14" height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 3v8.5M4 8.5l4 4.5 4-4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ResearchHero() {
  return (
    <section
      className="relative min-h-screen flex items-center"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="container bg-grid-pattern pt-nav pb-16 md:pb-24 w-full">
        <div className="flex flex-col items-center text-center gap-8 md:gap-12">
          <h1
            className="text-4xl sm:text-5xl md:text-[64px] tracking-tight text-mistral-black leading-[1.05] max-w-4xl"
            data-reveal
          >
            {HERO.title}
          </h1>

          <p
            className="text-base md:text-lg text-mistral-black/65 leading-relaxed max-w-2xl"
            data-reveal
            data-reveal-delay="1"
          >
            {HERO.subtitleLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </p>

          <nav
            className="mt-4 md:mt-8 flex flex-wrap justify-center gap-2 md:gap-3"
            data-reveal
            data-reveal-delay="2"
            aria-label="Research page sections"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="group inline-flex items-center gap-2 rounded-full border border-[#C7D7F8] bg-white px-4 py-2 text-sm text-mistral-black hover:bg-mistral-beige-deep transition-colors"
              >
                <span>{item.label}</span>
                <span className="text-mistral-black/45 transition-transform group-hover:translate-y-0.5">
                  <ChevronDown className="size-3" />
                </span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
