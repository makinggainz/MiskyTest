import { AppStoreBadge, PlayStoreBadge, StarRating } from "@/components/StoreBadges";

// Final CTA per consumer-spec §21. Cinematic-minimal — restated identity
// claim, "It's free" reinforcement (§24.4 free-emphatic), single CTA whose
// label exactly matches the hero ("Try Elio") per §21 anti-pattern about
// CTA-label divergence.

function ArrowIcon() {
  return (
    <svg className="size-3 shrink-0" viewBox="0 0 9 13" fill="none" aria-hidden="true">
      <circle cx="7.22" cy="6.589" r="1.28" fill="currentColor" />
      <circle cx="4.658" cy="4.018" r="1.28" fill="currentColor" />
      <circle cx="2.099" cy="1.46" r="1.28" fill="currentColor" />
      <circle cx="4.658" cy="9.151" r="1.28" fill="currentColor" />
      <circle cx="2.099" cy="11.718" r="1.28" fill="currentColor" />
    </svg>
  );
}

export function ElioFinalCTA() {
  return (
    <section className="relative py-10 md:py-[100px]">
      <div className="container relative z-10">

        <div className="text-center max-w-2xl mx-auto" data-reveal>
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-mistral-black">
            Find your world now.
          </h2>
          <p className="mt-6 md:mt-12 text-sm md:text-base leading-relaxed text-mistral-black/55 max-w-xl mx-auto">
            Free. Smarter. Made for the next thing on your list.
          </p>
          <div className="mt-10 md:mt-20 flex flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
              <a
                href="#"
                className="group rounded-[7px] inline-flex items-center gap-2 px-5 py-2.5 bg-mistral-black text-white text-sm transition-colors hover:bg-mistral-black/80"
              >
                Try Elio in browser
                <span className="text-mistral-orange transition-transform group-hover:translate-x-0.5">
                  <ArrowIcon />
                </span>
              </a>
              <AppStoreBadge />
              <PlayStoreBadge />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <StarRating />
              <span className="text-mistral-black/30" aria-hidden="true">·</span>
              <span className="inline-flex items-center text-xs md:text-sm text-mistral-black/55">
                Free, forever
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
