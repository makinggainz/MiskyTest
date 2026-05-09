import { MapShape } from "@/components/MapShape";

// User testimonials per consumer-spec §15 + §36 (identity-tag principle).
// Three placeholder testimonials with names and identity tags. Avatars are
// rendered as colored monogram circles to avoid stock-photo anti-patterns
// (§15) and to be safely swappable for real user photos when collected.
// Identity tags diversify across self-images: solo, group, weekend.

const TESTIMONIALS = [
  {
    initials: "SM",
    bg: "#dde3ea",
    name: "Sofia Mendes",
    tag: "Solo backpacker",
    quote:
      "I planned my whole six-week Asia trip with Elio. Every place it picked, I went — and every place was better than the last.",
  },
  {
    initials: "MC",
    bg: "#e8ddf0",
    name: "Marcus Chen",
    tag: "Weekend explorer",
    quote:
      "Roll the dice has gotten me out of so many Saturday-night ruts. I&rsquo;ve found three new favourite spots this month alone.",
  },
  {
    initials: "AP",
    bg: "#ddf0e8",
    name: "Aisha Patel",
    tag: "Group trip planner",
    quote:
      "I used to be the one stuck planning every trip. Now I send Elio links to my friends and we just vote. The group chat is finally fun.",
  },
] as const;

export function ElioTestimonials() {
  return (
    <section className="relative py-10 md:py-[100px]">
      <MapShape placement="bottom-right" />
      <div className="container bg-grid-pattern relative z-10">

        <div className="mb-10 md:mb-20 text-center" data-reveal>
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-mistral-black">
            People who use Elio.
          </h2>
          <p className="mt-6 md:mt-12 text-sm leading-relaxed text-mistral-black/55 max-w-xl mx-auto">
            Three of the millions of moments Elio has been part of.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
          data-reveal
          data-reveal-delay="1"
        >
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="border border-[#C7D7F8] rounded-[20px] bg-background p-6 md:p-8 flex flex-col gap-6"
            >
              <blockquote
                className="text-base md:text-lg text-mistral-black/80 leading-relaxed flex-1"
                dangerouslySetInnerHTML={{ __html: `&ldquo;${t.quote}&rdquo;` }}
              />
              <figcaption className="flex items-center gap-3 mt-auto">
                <span
                  className="size-10 rounded-full flex items-center justify-center text-[12px] font-semibold text-mistral-black/70 shrink-0 border border-[#C7D7F8]"
                  style={{ background: t.bg }}
                  aria-hidden="true"
                >
                  {t.initials}
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-mistral-black leading-tight">{t.name}</span>
                  <span className="text-xs text-mistral-black/55 italic leading-tight mt-0.5">{t.tag}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

      </div>
    </section>
  );
}
