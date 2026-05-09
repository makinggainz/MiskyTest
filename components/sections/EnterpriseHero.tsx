/* eslint-disable @next/next/no-img-element */

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

export function EnterpriseHero() {
  return (
    <section
      className="relative min-h-screen pt-nav pb-10 md:pb-[100px]"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="container pt-32 md:pt-48 lg:pt-[228px]">

        {/* Headline — centered, sits in the upper-middle of the viewport */}
        <div
          className="max-w-3xl mx-auto flex flex-col items-center text-center gap-4 md:gap-6"
          data-reveal
        >
          <h1 className="text-4xl sm:text-5xl md:text-[56px] lg:text-[72px]/[1.05] tracking-tight text-mistral-black">
            Columbus Pro
          </h1>
          <p className="text-xl md:text-2xl tracking-tight leading-snug text-mistral-black/60">
            An agentic GIS that replaces three weeks of analysis with a single prompt.
          </p>
          <div className="mt-2 flex flex-wrap justify-center items-center gap-3 md:gap-4">
            <a
              className="group rounded-[7px] px-5 py-2 text-sm flex items-center gap-2 transition-colors bg-mistral-black text-white hover:bg-mistral-black/80"
              href="#"
            >
              Talk to founders
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">
                <ArrowIcon />
              </span>
            </a>
            <a
              className="group rounded-[7px] px-5 py-2 text-sm flex items-center gap-2 transition-colors text-mistral-black hover:text-mistral-black/60"
              href="#columbus-showcase"
            >
              See it in action
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">
                <ArrowIcon />
              </span>
            </a>
          </div>
        </div>

        {/* Platform screenshot — full-width, no frame, fades at top into background, extends past the fold */}
        <div className="mt-12 md:mt-20 relative" data-reveal data-reveal-delay="1">
          <img
            src="/images/enterprise/desk.png"
            alt="Columbus Pro platform — Data Manager view"
            className="block w-full h-auto"
          />
          {/* Top fade — softens the screenshot's top edge into the page background */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-12 md:h-20"
            style={{ background: "linear-gradient(to bottom, var(--color-background), transparent)" }}
          />
          {/* Bottom fade — white gradient covering the bottom 45% of the image */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%]"
            style={{ background: "linear-gradient(to top, #ffffff, transparent)" }}
          />
        </div>

      </div>
    </section>
  );
}
