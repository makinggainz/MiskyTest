// Big-number social proof per consumer-spec §19. Single dramatic number with
// two complementary smaller stats. Numbers are PLACEHOLDERS — replace with
// real, defensible figures when data is available. Per spec anti-pattern,
// never ship vague "trusted by thousands" — these are deliberately specific
// (120K+ / 80+ / 4.8) so they read as honest scaffolding.

const STATS = [
  { value: "120K+", label: "explorers worldwide" },
  { value: "80+", label: "cities covered" },
  { value: "4.8 ★", label: "average rating" },
] as const;

export function ElioBigNumber() {
  return (
    <section
      className="relative py-10 md:py-[100px]"
      style={{
        backgroundColor: "var(--color-background)",
        backgroundImage: "url('/images/elio/plants-left.png')",
        backgroundSize: "50% auto",
        backgroundPosition: "top left",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container relative z-10">

        <div className="text-center max-w-3xl mx-auto" data-reveal>
          <p className="text-xs uppercase tracking-widest text-mistral-black/45 mb-6">
            People are finding their next anything
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-baseline">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-2"
                data-reveal
                data-reveal-delay={String(i + 1)}
              >
                <span className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-mistral-black tabular-nums">
                  {s.value}
                </span>
                <span className="text-sm md:text-base text-mistral-black/55">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
