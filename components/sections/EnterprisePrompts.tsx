/* eslint-disable @next/next/no-img-element */

const PROMPT_THUMBS = [
  {
    prompt: "Show me vacant lots near new transit lines in Charlotte.",
    image: "/images/usecases/layer1.png",
  },
  {
    prompt: "Where should we open our next pizzeria in Miami?",
    image: "/images/usecases/layer2.png",
  },
  {
    prompt: "Highlight displacement risk along the proposed corridor.",
    image: "/images/usecases/layer3.png",
  },
] as const;

function FeatureChatVisual() {
  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: "#f0ede8" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, #d6cfc6 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="absolute inset-x-6 bottom-6 flex flex-col gap-3" style={{ maxWidth: "440px", marginLeft: "auto", marginRight: "auto" }}>
        {/* User question */}
        <div className="self-end max-w-[85%] bg-white rounded-[16px] rounded-br-[5px] shadow-sm px-4 py-3">
          <p className="text-[12px] leading-relaxed text-mistral-black">
            Where should the city build its next bus depot?
          </p>
        </div>

        {/* Columbus reply */}
        <div className="bg-white/90 rounded-[14px] rounded-bl-[5px] shadow-sm px-4 py-3 flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <span
              className="size-4 shrink-0 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
              style={{ background: "var(--color-mistral-orange, #154ACC)" }}
            >
              C
            </span>
            <span
              className="text-[11px] font-medium"
              style={{ color: "var(--color-mistral-orange, #154ACC)" }}
            >
              Columbus
            </span>
          </div>
          <p className="text-[12px] leading-relaxed text-mistral-black/80 pl-6">
            Considering route density, parcels above two acres, and a twelve-minute headway envelope, three sites stand out:
          </p>
          <div className="flex flex-col gap-2 pl-6">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[11px] font-semibold text-mistral-black">Industrial Park, NW Corridor</p>
                <p className="text-[10px] text-mistral-black/50">2.4 acres · 6-min off-route</p>
              </div>
              <span className="text-[10px] font-semibold text-mistral-black bg-[#f0ede8] px-2 py-0.5 rounded-full shrink-0">Tier 1</span>
            </div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[11px] font-semibold text-mistral-black">Eastside Yard</p>
                <p className="text-[10px] text-mistral-black/50">3.1 acres · 11-min off-route</p>
              </div>
              <span className="text-[10px] font-semibold text-mistral-black bg-[#f0ede8] px-2 py-0.5 rounded-full shrink-0">Tier 2</span>
            </div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[11px] font-semibold text-mistral-black">Riverside Lot 14B</p>
                <p className="text-[10px] text-mistral-black/50">2.8 acres · flood-risk flagged</p>
              </div>
              <span className="text-[10px] font-semibold text-mistral-black bg-[#f0ede8] px-2 py-0.5 rounded-full shrink-0">Tier 3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EnterprisePrompts() {
  return (
    <section className="py-10 md:py-[100px]">
      <div className="container bg-grid-pattern">

        <div className="mb-10 md:mb-20 text-center" data-reveal>
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-mistral-black">
            See prompts you can ask.
          </h2>
          <p className="mt-6 md:mt-12 text-sm leading-relaxed text-mistral-black/55 max-w-xl mx-auto">
            Real questions analysts and operators bring to Columbus on day one.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-[2.5fr_1fr_1fr_1fr] gap-4 md:gap-6 items-stretch"
          data-reveal
          data-reveal-delay="1"
        >
          {/* Featured chat panel */}
          <div className="border border-[#C7D7F8] rounded-[20px] overflow-hidden h-[320px] md:h-[460px]">
            <FeatureChatVisual />
          </div>

          {/* Three prompt thumbnails */}
          {PROMPT_THUMBS.map((p) => (
            <div
              key={p.prompt}
              className="relative border border-[#C7D7F8] rounded-[20px] overflow-hidden h-[260px] md:h-[460px]"
            >
              <img
                src={p.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(7,12,38,0.78) 0%, rgba(7,12,38,0.25) 45%, transparent 75%)" }}
              />
              <p className="absolute bottom-4 left-4 right-4 text-sm text-white leading-snug font-medium">
                {p.prompt}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
