import { RESULTS } from "@/content/research";

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

function GlobeMark() {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className="size-16 text-mistral-black/35"
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
        <div className="text-center mb-10 md:mb-20" data-reveal>
          <p className="text-xs font-medium text-mistral-black/50 uppercase tracking-wider">
            {RESULTS.kicker}
          </p>
          <h2 className="mt-4 text-3xl md:text-5xl font-normal tracking-tight text-mistral-black">
            {RESULTS.title}
          </h2>
          <p className="mt-6 md:mt-12 text-sm leading-relaxed text-mistral-black/55 max-w-xl mx-auto">
            {RESULTS.lead}
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-20"
          data-reveal
          data-reveal-delay="1"
        >
          {RESULTS.cards.map((card) => (
            <div
              key={card.num}
              className="border border-[#C7D7F8] rounded-[20px] bg-mistral-beige-deep p-6 md:p-8 flex flex-col gap-6 min-h-[180px] md:min-h-[220px]"
            >
              <div aria-hidden="true">
                <GlobeMark />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-mistral-black leading-snug">
                {`${card.num}. ${card.text}`}
              </h3>
            </div>
          ))}
        </div>

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
                  <DiagArrow className="size-5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
