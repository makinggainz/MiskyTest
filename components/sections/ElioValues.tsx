// Brand values band per consumer-spec §17 + §33. Four claims that a
// sophisticated consumer visitor would recognise as a stance, not as
// generic "we care about quality" filler. The "Free, forever." card is the
// load-bearing one for the free-emphatic variation (§24.4).

const VALUES = [
  {
    title: "Free, forever.",
    body:
      "Everything Elio does is free. No premium tier, no upsell, no asterisks. Use it on day one and on day one thousand.",
  },
  {
    title: "By travellers, for travellers.",
    body:
      "Built by people who actually care whether the third drink list has any house cocktails. Recommendations you'd actually take.",
  },
  {
    title: "No ads, ever.",
    body:
      "Elio doesn't rent your attention to brands. The picks you see are the picks Elio thought were best — full stop.",
  },
  {
    title: "Privacy by default.",
    body:
      "Your taste, your places, your people, your trips. Yours. We don't sell, we don't share, we don't track around the web.",
  },
] as const;

export function ElioValues() {
  return (
    <section
      className="relative py-10 md:py-[100px]"
      style={{
        backgroundColor: "var(--color-background)",
        backgroundImage: "url('/images/elio/palm-left.png')",
        backgroundSize: "50% auto",
        backgroundPosition: "top left",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container bg-grid-pattern relative z-10">

        <div className="mb-10 md:mb-20 text-center" data-reveal>
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-mistral-black">
            Maps the way you wish they&rsquo;d be.
          </h2>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          data-reveal
          data-reveal-delay="1"
        >
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="border border-[color:var(--color-elio-border,#C7D7F8)] rounded-[20px] bg-background p-6 md:p-8 flex flex-col gap-3"
            >
              <h3 className="text-base md:text-lg font-bold text-mistral-black leading-snug">
                {v.title}
              </h3>
              <p className="text-sm text-mistral-black/60 leading-relaxed">
                {v.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
