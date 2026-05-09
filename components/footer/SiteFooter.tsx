/* eslint-disable @next/next/no-img-element */

const NAV = [
  {
    heading: "Product",
    links: ["Columbus", "Platform", "Use-Cases", "MapsGPT"],
  },
  {
    heading: "Technology",
    links: ["LGM vs LLM", "Data Collection", "Core Reasoning", "Research", "Blog"],
  },
  {
    heading: "Company",
    links: ["Our Mission", "Careers", "Legal", "Report"],
  },
];

export function SiteFooter() {
  return (
    <footer className="px-4 pb-4 pt-0">
      <div className="relative rounded-[20px] overflow-hidden min-h-[540px] md:min-h-[620px]">

        {/* Background image */}
        <img
          src="/images/footerimg.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />

        {/* Bottom gradient for text legibility — dark, fades up */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.35) 55%, transparent 80%)",
          }}
        />

        {/* Content — pinned to bottom */}
        <div className="absolute inset-0 flex flex-col justify-end py-8 md:py-14 px-4">
          <div className="max-w-[1248px] mx-auto w-full flex flex-col gap-8 px-5">

          {/* Main row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">

            {/* Brand */}
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-white leading-none">
                Columbus Earth.
              </h2>
              <p className="text-sm text-white/70 max-w-xs leading-relaxed">
                The frontier AI lab building the first production Universal Geospatial Model to answer the planet&rsquo;s toughest questions.
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-3">
                <a
                  href="mailto:hello@columbus.earth"
                  className="size-9 rounded-full border border-white/30 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Email"
                >
                  <svg className="size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <path d="m2 7 10 7 10-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-9 rounded-full border border-white/30 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="size-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Nav */}
            <nav className="grid grid-cols-3 gap-8 md:gap-14">
              {NAV.map((col) => (
                <div key={col.heading} className="flex flex-col gap-2.5">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
                    {col.heading}
                  </span>
                  {col.links.map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="text-sm text-white/80 hover:text-white transition-colors leading-snug"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              ))}
            </nav>

          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-t border-white/15 pt-5">
            <span className="text-xs text-white/55">
              Columbus Earth &copy; 2026. For investor relations, contact us on email or LinkedIn.
            </span>
            <span className="text-xs text-white/40 hidden md:block">
              Website made by hand, no AI.
            </span>
            <span className="text-xs text-white/55">
              www.columbus.earth
            </span>
          </div>

          </div>{/* max-w container */}
        </div>
      </div>
    </footer>
  );
}
