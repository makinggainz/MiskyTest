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

export function EnterpriseFinalCTA() {
  return (
    <section className="py-10 md:py-[100px]">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto" data-reveal>
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-mistral-black">
            Build with Columbus Pro.
          </h2>
          <p className="mt-6 md:mt-12 text-sm leading-relaxed text-mistral-black/55 max-w-xl mx-auto">
            Columbus Pro is in early enterprise rollout. Tell us what you&rsquo;re trying to figure out, and we&rsquo;ll show you the same thing in fifteen minutes.
          </p>
          <div className="mt-8 md:mt-12 flex justify-center">
            <a
              href="#"
              className="group rounded-[7px] inline-flex items-center gap-2 px-5 py-2.5 bg-mistral-black text-white text-sm font-medium transition-colors hover:bg-mistral-black/80"
            >
              Talk to founders
              <span className="text-mistral-orange transition-transform group-hover:translate-x-0.5">
                <ArrowIcon />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
