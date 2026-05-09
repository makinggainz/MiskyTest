/* eslint-disable @next/next/no-img-element */
import { AppStoreBadge, PlayStoreBadge, StarRating } from "@/components/StoreBadges";

// Consumer hero per consumer-landing-page-specification §11. Identity-driven
// h1 ("Find your next anything." — borrowed from the homepage Elio block),
// validation-or-unlock subhead, single primary CTA. The "Free" callout is
// elevated near the CTA per §6.1 (free product → state it explicitly).
//
// Visual approach: hero text in upper third, lifestyle screenshot below
// (Eliobackground.png), top-fading into the page. Same upper-third rhythm
// as /enterprise so the two product pages share a hero identity.

function ArrowIcon() {
  return (
    <svg className="size-3 shrink-0 text-mistral-orange" width="24" viewBox="0 0 9 13" fill="none" aria-hidden="true">
      <circle cx="7.22" cy="6.589" r="1.28" fill="currentColor" />
      <circle cx="4.658" cy="4.018" r="1.28" fill="currentColor" />
      <circle cx="2.099" cy="1.46" r="1.28" fill="currentColor" />
      <circle cx="4.658" cy="9.151" r="1.28" fill="currentColor" />
      <circle cx="2.099" cy="11.718" r="1.28" fill="currentColor" />
    </svg>
  );
}

export function ElioHero() {
  return (
    <section
      className="relative min-h-screen pt-nav pb-10 md:pb-[100px]"
      style={{
        backgroundColor: "var(--color-background)",
        backgroundImage: "url('/images/ElioBackground2.png')",
        backgroundSize: "100% auto",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container pt-32 md:pt-48 lg:pt-[228px] relative z-10">

        {/* Headline — centered upper third */}
        <div
          className="max-w-3xl mx-auto flex flex-col items-center text-center gap-12"
          data-reveal
        >
          {/* Brand mark */}
          <div className="inline-flex items-center gap-2.5 text-lg md:text-xl tracking-tight text-mistral-black/65">
            <img
              src="/images/mapsgpt-logo.png"
              alt=""
              aria-hidden="true"
              className="h-7 md:h-9 w-auto object-contain"
            />
            Elio
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-[56px] lg:text-[72px]/[1.05] tracking-tight text-mistral-black">
            Find your next anything.
          </h1>

          <p className="text-xl md:text-2xl tracking-tight leading-snug text-mistral-black/60">
            A smarter, more social map for every spot on your list.
          </p>

          {/* Primary CTA + App-store placeholders + free chip */}
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
              <a
                className="group rounded-[7px] px-5 py-2.5 text-sm flex items-center gap-2 transition-colors bg-mistral-black text-white hover:bg-mistral-black/80"
                href="#"
              >
                Try Elio in browser
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">
                  <ArrowIcon />
                </span>
              </a>
              <AppStoreBadge />
              <PlayStoreBadge />
            </div>
            {/* Rating + free callout per consumer-spec §11 + §6.1 */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <StarRating />
              <span className="text-mistral-black/30" aria-hidden="true">·</span>
              <span className="inline-flex items-center text-xs md:text-sm text-mistral-black/55">
                Free, forever
              </span>
            </div>
          </div>
        </div>

        {/* Platform screenshot — masked so the bottom fades seamlessly into the page background, matching the /enterprise hero treatment */}
        <div className="mt-12 md:mt-20 relative" data-reveal data-reveal-delay="1">
          <img
            src="/images/elio/desk-darkborder.png"
            alt="Elio platform — Madrid map view with conversational chat panel"
            className="block w-full h-auto"
            style={{
              maskImage:
                "linear-gradient(to bottom, black 0%, black 22%, transparent 80%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 22%, transparent 80%)",
            }}
          />
        </div>

      </div>
    </section>
  );
}
