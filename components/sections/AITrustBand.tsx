import { MapShape } from "@/components/MapShape";

// AI-specific trust band per landing-page-spec §17 + §38.4. Six pillars
// covering reproducibility, source citation, no-training-on-customer-data,
// human-in-the-loop, compliance, and audit trail — the threshold concerns
// that block enterprise purchase of agentic GIS.

const PILLARS = [
  {
    title: "Source citation.",
    body: "Every answer links back to the dataset, layer, and parcel it came from. Click a number, see the source.",
  },
  {
    title: "Reproducibility.",
    body: "Same prompt, same answer. Pinned model versions and archived data snapshots make every run replayable.",
  },
  {
    title: "No training on your data.",
    body: "Customer prompts, datasets, and outputs never enter our training corpus. Your work stays your work.",
  },
  {
    title: "Human-in-the-loop.",
    body: "High-stakes outputs require explicit human sign-off before they leave the platform.",
  },
  {
    title: "Compliance.",
    body: "SOC 2 Type II, GDPR-ready, AES-256 at rest, TLS 1.3 in transit. Self-hosted air-gap deployment available.",
  },
  {
    title: "Audit trail.",
    body: "Every action Columbus takes is logged with timestamp, user, and reasoning. Reviewable from day one.",
  },
] as const;

export function AITrustBand() {
  return (
    <section className="relative py-10 md:py-[100px]">
      <MapShape placement="right-edge" />
      <div className="container bg-grid-pattern relative z-10">

        <div className="mb-10 md:mb-20 text-center" data-reveal>
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-mistral-black">
            Trust the answer. Verify every step.
          </h2>
          <p className="mt-6 md:mt-12 text-sm leading-relaxed text-mistral-black/55 max-w-xl mx-auto">
            An agentic GIS is only useful if the buyer trusts it. Six guarantees that make every output auditable.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          data-reveal
          data-reveal-delay="1"
        >
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="border border-[#C7D7F8] rounded-[20px] bg-background p-6 md:p-8 flex flex-col gap-3"
            >
              <h3 className="text-base md:text-lg font-semibold text-mistral-black leading-snug">
                {p.title}
              </h3>
              <p className="text-sm text-mistral-black/60 leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
