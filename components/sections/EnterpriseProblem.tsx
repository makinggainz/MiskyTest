import { MapShape } from "@/components/MapShape";

const PAIN_POINTS = [
  {
    number: "01",
    title: "A single site selection report takes two to three weeks.",
    body: "By the time the deck lands, the deal has already moved.",
  },
  {
    number: "02",
    title: "$10K+ per seat for software half your team can’t use.",
    body: "Most licences sit idle. The few that don’t require a specialist.",
  },
  {
    number: "03",
    title: "Sixty percent of analyst time is spent finding and cleaning data.",
    body: "Real work happens in the other forty.",
  },
  {
    number: "04",
    title: "Coordinates copy-pasted from Google are wrong half the time.",
    body: "And you usually find out after the contractor is already on site.",
  },
  {
    number: "05",
    title: "New hires take six months before they can use your GIS tools.",
    body: "By then the project they were hired for is shipped.",
  },
  {
    number: "06",
    title: "Coordinates, demographics, and lot data live in three different systems.",
    body: "Stitching them together has somehow become the actual job.",
  },
] as const;

export function EnterpriseProblem() {
  return (
    <section className="relative py-10 md:py-[100px]">
      <MapShape placement="bottom-right" />
      <div className="container bg-grid-pattern relative z-10">
        <div className="mb-10 md:mb-20 text-center" data-reveal>
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-mistral-black">
            Legacy GIS slows you down.
          </h2>
          <p className="mt-6 md:mt-12 text-sm leading-relaxed text-mistral-black/55 max-w-xl mx-auto">
            Six things every GIS team has stopped questioning — and why we built Columbus Pro instead.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          data-reveal
          data-reveal-delay="1"
        >
          {PAIN_POINTS.map((p) => (
            <div
              key={p.number}
              className="border border-[#C7D7F8] rounded-[20px] bg-background p-6 md:p-8 flex flex-col gap-3"
            >
              <span className="text-xs font-semibold tracking-widest text-mistral-black/40">
                {p.number}
              </span>
              <h3 className="text-base md:text-lg font-semibold text-mistral-black leading-snug">
                {p.title}
              </h3>
              <p className="text-sm text-mistral-black/55 leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
