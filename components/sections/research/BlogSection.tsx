/* eslint-disable @next/next/no-img-element */
import { BLOG } from "@/content/research";

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

export function BlogSection() {
  const featured = BLOG.cards[0];
  const small = BLOG.cards.slice(1);

  return (
    <section id="research-blog" className="py-10 md:py-[100px]">
      <div className="container bg-grid-pattern">
        <div className="text-center mb-10 md:mb-20" data-reveal>
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-mistral-black">
            {BLOG.title}
          </h2>
          <p className="mt-6 md:mt-12 text-sm leading-relaxed text-mistral-black/55 max-w-xl mx-auto">
            {BLOG.lead}
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-[2.5fr_1fr_1fr_1fr] gap-4 md:gap-6 items-stretch mb-10 md:mb-20"
          data-reveal
          data-reveal-delay="1"
        >
          <div className="flex flex-col gap-4">
            <a
              href={featured.href}
              className="group relative block border border-[#C7D7F8] rounded-[20px] overflow-hidden h-[260px] md:h-[380px] bg-mistral-beige-deep"
            >
              <img
                src={featured.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute bottom-4 right-4 text-white/90 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <DiagArrow className="size-5" />
              </span>
            </a>
            <h3 className="text-base font-semibold text-mistral-black leading-snug">
              {featured.title}
            </h3>
          </div>

          {small.map((card) => (
            <a
              key={card.title}
              href={card.href}
              className="group relative block border border-[#C7D7F8] rounded-[20px] overflow-hidden h-[220px] md:h-[380px] bg-mistral-beige-deep"
            >
              <img
                src={card.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span
                className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent pointer-events-none"
                aria-hidden="true"
              />
              <p className="absolute top-4 left-4 right-4 text-sm font-semibold leading-snug text-white">
                {card.title}
              </p>
              <span className="absolute bottom-4 right-4 text-white/80 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <DiagArrow className="size-4" />
              </span>
            </a>
          ))}
        </div>

        <div data-reveal data-reveal-delay="2">
          {BLOG.articles.map((article) => (
            <a
              key={article.title}
              href={article.href}
              className="group flex items-center justify-between gap-4 py-5 border-t border-mistral-black/10 transition-colors hover:text-mistral-black/50"
            >
              <span className="text-base text-mistral-black group-hover:text-mistral-black/50 transition-colors">
                {article.title}
              </span>
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-sm text-mistral-black/55">{article.date}</span>
                <DiagArrow className="size-5 text-mistral-black/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          ))}
          <div className="border-t border-mistral-black/10" />
        </div>
      </div>
    </section>
  );
}
