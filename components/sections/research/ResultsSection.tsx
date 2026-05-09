import { RESULTS } from "@/content/research";

function LineArrow({ className = "" }: { className?: string }) {
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

function GlobeMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className={className}
    >
      <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="0.9" />
      <ellipse cx="50" cy="50" rx="34" ry="9" stroke="currentColor" strokeWidth="0.7" />
      <ellipse cx="50" cy="50" rx="32" ry="22" stroke="currentColor" strokeWidth="0.6" />
      <ellipse cx="50" cy="50" rx="28" ry="32" stroke="currentColor" strokeWidth="0.6" />
      <line x1="50" y1="16" x2="50" y2="84" stroke="currentColor" strokeWidth="0.8" />
      <line x1="34" y1="22" x2="66" y2="22" stroke="currentColor" strokeWidth="0.6" />
      <line x1="28" y1="34" x2="72" y2="34" stroke="currentColor" strokeWidth="0.6" />
      <line x1="28" y1="66" x2="72" y2="66" stroke="currentColor" strokeWidth="0.6" />
      <line x1="34" y1="78" x2="66" y2="78" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="61" cy="40" r="3" fill="currentColor" />
    </svg>
  );
}

export function ResultsSection() {
  return (
    <section id="data-collection" className="py-10 md:py-[100px]">
      <div className="container">
        <div className="mb-10 md:mb-20 max-w-3xl" data-reveal>
          <p className="text-xs font-medium text-mistral-black/50 uppercase tracking-wider">
            {RESULTS.kicker}
          </p>
          <h2 className="mt-4 text-3xl md:text-5xl font-normal tracking-tight text-mistral-black">
            {RESULTS.title}
          </h2>
          <p className="mt-6 md:mt-12 text-sm md:text-base text-mistral-black/70 leading-relaxed">
            {RESULTS.lead}
          </p>
        </div>

        {/* Numbered results list — large display numbers + statement + globe icon */}
        <div
          className="mb-10 md:mb-20 border-t border-mistral-black/10"
          data-reveal
          data-reveal-delay="1"
        >
          {RESULTS.cards.map((card) => (
            <div
              key={card.num}
              className="group flex items-start md:items-center gap-6 md:gap-10 py-6 md:py-8 border-b border-mistral-black/10"
            >
              <span className="text-3xl md:text-5xl font-normal tracking-tight text-mistral-black/30 tabular-nums shrink-0 w-12 md:w-20">
                0{card.num}
              </span>
              <h3 className="flex-1 text-base md:text-xl font-semibold text-mistral-black leading-snug">
                {card.text}
              </h3>
              <span className="hidden md:inline-block text-mistral-black/30 shrink-0">
                <GlobeMark className="size-10" />
              </span>
            </div>
          ))}
        </div>

        {/* Article cards row */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          data-reveal
          data-reveal-delay="2"
        >
          {RESULTS.articles.map((article) => (
            <a
              key={article.strong}
              href={article.href}
              className="group block border border-[#C7D7F8] rounded-[20px] bg-mistral-beige-deep p-6 md:p-8 transition-colors hover:bg-mistral-beige-deep/80"
            >
              <div className="flex items-start justify-between gap-6">
                <p className="text-base md:text-lg leading-snug text-mistral-black">
                  {article.lead}
                  <br />
                  <strong className="font-semibold">{article.strong}</strong>
                </p>
                <span className="text-mistral-black/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <LineArrow className="size-5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
