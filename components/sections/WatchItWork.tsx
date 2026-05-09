import { MapShape } from "@/components/MapShape";

// "Watch it work" before/after per landing-page-spec §12. Same brief —
// "Where should we locate a new bus depot in Travis County?" — done two
// ways. The "before" panel is on the left so the eye lands on the
// impressive "after" panel last (spec anti-pattern: putting the slow side
// on the right).

const BEFORE_STEPS = [
  { time: "Day 1–3", text: "Pull demographic data from Census APIs and clean it." },
  { time: "Day 3–5", text: "Source zoning shapefiles from the city open-data portal." },
  { time: "Day 5–8", text: "Reproject coordinates, deduplicate, join the layers." },
  { time: "Day 8–11", text: "Cross-reference with the vacant parcel database." },
  { time: "Day 11–15", text: "Run the weighted overlay analysis in QGIS." },
  { time: "Day 15–21", text: "Peer review, edit, compile the final report." },
] as const;

const AFTER_STEPS = [
  { time: "Step 1", text: "Type the question. Plain English." },
  { time: "Step 2", text: "Review the reasoning trace and dataset citations." },
  { time: "Step 3", text: "Adjust source weighting; correct anything off." },
  { time: "Step 4", text: "Export the parcel-level report." },
] as const;

export function WatchItWork() {
  return (
    <section className="relative py-10 md:py-[100px]">
      <MapShape placement="bottom-right" />
      <div className="container bg-grid-pattern relative z-10">

        <div className="mb-10 md:mb-20 text-center" data-reveal>
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-mistral-black">
            Three weeks. Or three minutes.
          </h2>
          <p className="mt-6 md:mt-12 text-sm leading-relaxed text-mistral-black/55 max-w-xl mx-auto">
            The same brief — &ldquo;Where should we locate a new bus depot in Travis County?&rdquo; — done two ways.
          </p>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6"
          data-reveal
          data-reveal-delay="1"
        >
          {/* Before */}
          <div className="border border-[#C7D7F8] rounded-[20px] bg-background flex flex-col overflow-hidden">
            <div className="px-6 md:px-8 pt-6 md:pt-8 pb-4 flex items-center justify-between border-b border-[#C7D7F8]">
              <span className="text-base font-semibold text-mistral-black/45">Without Columbus</span>
              <span className="text-[10px] uppercase tracking-widest text-mistral-black/40">Manual</span>
            </div>
            <ol className="px-6 md:px-8 py-6 md:py-8 flex flex-col gap-4 flex-1">
              {BEFORE_STEPS.map((s, i) => (
                <li key={i} className="flex gap-4">
                  <span className="text-[11px] font-semibold tracking-widest text-mistral-black/35 shrink-0 w-[80px] uppercase">
                    {s.time}
                  </span>
                  <span className="text-sm text-mistral-black/65 leading-relaxed">{s.text}</span>
                </li>
              ))}
            </ol>
            <div className="border-t border-[#C7D7F8] px-6 md:px-8 py-4 flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-widest text-mistral-black/40">Total</span>
              <span className="text-2xl md:text-3xl font-normal tracking-tight text-mistral-black/65">12–21 days</span>
            </div>
          </div>

          {/* After */}
          <div className="border border-[#C7D7F8] rounded-[20px] bg-background flex flex-col overflow-hidden">
            <div className="px-6 md:px-8 pt-6 md:pt-8 pb-4 flex items-center justify-between border-b border-[#C7D7F8]">
              <span className="text-base font-semibold text-mistral-black">With Columbus Pro</span>
              <span className="text-[10px] uppercase tracking-widest text-mistral-orange">Agentic</span>
            </div>
            <ol className="px-6 md:px-8 py-6 md:py-8 flex flex-col gap-4 flex-1">
              {AFTER_STEPS.map((s, i) => (
                <li key={i} className="flex gap-4">
                  <span className="text-[11px] font-semibold tracking-widest text-mistral-orange shrink-0 w-[80px] uppercase">
                    {s.time}
                  </span>
                  <span className="text-sm text-mistral-black/80 leading-relaxed">{s.text}</span>
                </li>
              ))}
            </ol>
            <div className="border-t border-[#C7D7F8] px-6 md:px-8 py-4 flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-widest text-mistral-black/40">Total</span>
              <span className="text-2xl md:text-3xl font-normal tracking-tight text-mistral-black">Three minutes</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
