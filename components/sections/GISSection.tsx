/* eslint-disable @next/next/no-img-element */

function ArrowIcon() {
  return (
    <svg className="size-3 shrink-0" viewBox="0 0 9 13" fill="none" aria-hidden="true">
      <circle cx="7.22"  cy="6.589" r="1.28" fill="currentColor" />
      <circle cx="4.658" cy="4.018" r="1.28" fill="currentColor" />
      <circle cx="2.099" cy="1.46"  r="1.28" fill="currentColor" />
      <circle cx="4.658" cy="9.151" r="1.28" fill="currentColor" />
      <circle cx="2.099" cy="11.718" r="1.28" fill="currentColor" />
    </svg>
  );
}

export function GISSection() {
  return (
    <section className="my-10 md:my-24">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-center">

          {/* Left: image */}
          <div className="w-full lg:flex-1" data-reveal>
            <div className="relative h-[360px] md:h-[480px] rounded-[20px] overflow-hidden">
              <img
                src="/images/gis-hero.jpg"
                alt="Columbus GIS in action"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: text */}
          <div
            className="w-full lg:flex-1 lg:max-w-[480px] flex flex-col gap-6"
            data-reveal
            data-reveal-delay="1"
          >
            <h2 className="text-3xl md:text-5xl font-normal tracking-tight">
              No GIS experience needed.
            </h2>

            <div className="flex flex-col gap-2">
              <p className="text-xl md:text-2xl font-normal tracking-tight leading-snug text-mistral-black/60">
                Get to critical decisions faster.
              </p>
              <p className="text-xl md:text-2xl font-normal tracking-tight leading-snug text-mistral-black/60">
                Faster site selection.
              </p>
            </div>

            <div className="pt-2">
              <a
                href="/ColumbusDesign"
                className="group rounded-full inline-flex items-center gap-2 px-5 py-2.5 bg-mistral-black text-white text-sm font-medium transition-colors hover:bg-mistral-black/80"
              >
                Your new GIS
                <span className="text-mistral-orange transition-transform group-hover:translate-x-0.5">
                  <ArrowIcon />
                </span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
