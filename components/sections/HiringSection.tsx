const ROLE_CATEGORIES = [
  "Engineering",
  "Research",
  "Design",
  "Product",
  "Go-to-Market",
];

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

export function HiringSection() {
  return (
    <section className="py-10 md:py-[100px]">
      <div className="container bg-grid-pattern">

        {/* Single big bordered card */}
        <div
          className="border border-[#C7D7F8] rounded-[20px] p-8 md:p-16 flex flex-col gap-8 md:gap-12"
          data-reveal
        >

          {/* Top area: heading + descriptor */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
            <h2 className="text-3xl md:text-5xl font-normal tracking-tight max-w-xl">
              We&rsquo;re hiring humans.
            </h2>
            <p className="text-sm text-mistral-black/50 leading-relaxed max-w-sm md:self-end md:text-right">
              We&rsquo;re a small team building something big. If maps, AI, and the
              future of how people move through the world excites you &mdash; we&rsquo;d
              love to talk.
            </p>
          </div>

          {/* Role category pills */}
          <div className="flex flex-wrap gap-3" data-reveal data-reveal-delay="1">
            {ROLE_CATEGORIES.map((role) => (
              <span
                key={role}
                className="px-5 py-2.5 rounded-full border border-[#C7D7F8] bg-background text-sm text-mistral-black/70"
              >
                {role}
              </span>
            ))}
          </div>

          {/* CTA button */}
          <div data-reveal data-reveal-delay="2">
            <a
              href="#"
              className="group rounded-full inline-flex items-center gap-2 px-5 py-2.5 bg-mistral-black text-white text-sm font-medium transition-colors hover:bg-mistral-black/80"
            >
              See open roles
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
