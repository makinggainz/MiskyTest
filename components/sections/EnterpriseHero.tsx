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
    <div className="relative min-h-screen flex items-center" style={{ backgroundColor: "var(--color-background)" }}>
      <img
        src="/images/product-columbus.png"
        alt=""
        aria-hidden="true"
        className="absolute top-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{
          height: "82vh",
          width: "auto",
          right: "150px",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 38%, black 82%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 32%, black 68%, transparent 100%)",
          WebkitMaskComposite: "source-in",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 38%, black 82%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 32%, black 68%, transparent 100%)",
          maskComposite: "intersect",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-48 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-background))" }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{ background: "linear-gradient(to right, var(--color-background) 0%, var(--color-background) 38%, transparent 68%)" }}
      />

      <div className="container pt-nav relative z-20">
        <div className="w-full flex flex-col items-center text-center lg:text-left lg:items-start justify-center gap-8 lg:gap-10">
          <div className="flex flex-col gap-4 md:gap-6 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-[56px] lg:text-[72px]/[1.05] tracking-tight text-mistral-black">
              Columbus Pro
            </h1>
            <p className="text-xl md:text-2xl tracking-tight leading-snug text-mistral-black/60">
              An agentic GIS that replaces three weeks of analysis with a single prompt.
            </p>
            <p className="text-sm md:text-base text-mistral-black/55 leading-relaxed max-w-xl">
              Conversational map chat, the most accurate geospatial data catalogue, and automated due-diligence reports — all in one platform.
            </p>
          </div>
          <div className="flex w-full flex-wrap justify-center lg:justify-start items-center gap-3 md:gap-4">
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
              className="group rounded-[7px] px-5 py-2 text-sm flex items-center gap-2 transition-colors bg-mistral-black text-white hover:bg-mistral-black/80"
              href="#columbus-showcase"
            >
              See it in action
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">
                <ArrowIcon />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
