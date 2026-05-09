/* eslint-disable @next/next/no-img-element */
import { MapShape } from "@/components/MapShape";

// Lifestyle-led UGC-style gallery per consumer-spec §14 (Lifestyle/UGC) +
// §32 (Instagram-grid principle). Six cards, each a real-feeling moment-of-
// use: a verbatim user query and the place Elio surfaced. Photos sourced
// from /public/images/favorite-spots/. Skip when UGC isn't visually
// compelling — for a maps/travel app it always is.

const ASKS = [
  {
    image: "/images/favorite-spots/14.jpeg",
    place: "Menbaka Fire Ramen",
    location: "Kyoto · 8-min walk",
    rating: "4.8",
    query: "Best ramen in Kyoto right now?",
  },
  {
    image: "/images/favorite-spots/17.jpeg",
    place: "Koh Lanta",
    location: "Krabi province",
    rating: "4.7",
    query: "A quiet beach in Thailand far from the party scene?",
  },
  {
    image: "/images/favorite-spots/19.jpeg",
    place: "Terrazza Caffarelli",
    location: "Capitoline Hill",
    rating: "4.8",
    query: "Best rooftop bar in Roma tonight?",
  },
  {
    image: "/images/favorite-spots/20.jpeg",
    place: "Beacon, NY",
    location: "Hudson Valley",
    rating: "4.6",
    query: "A weekend trip 2 hours from NYC, family-friendly?",
  },
  {
    image: "/images/favorite-spots/21.jpeg",
    place: "Malasaña",
    location: "Madrid",
    rating: "4.6",
    query: "Coolest GenZ neighbourhood in Madrid right now?",
  },
  {
    image: "/images/favorite-spots/22.jpeg",
    place: "Oia",
    location: "Santorini",
    rating: "4.7",
    query: "Where to watch the sunset in Santorini without the crowds?",
  },
] as const;

export function ElioPromptGallery() {
  return (
    <section className="relative py-10 md:py-[100px]">
      <MapShape placement="bottom-left" />
      <div className="container bg-grid-pattern relative z-10">

        <div className="mb-10 md:mb-20 text-center" data-reveal>
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-mistral-black">
            See what people are asking.
          </h2>
          <p className="mt-6 md:mt-12 text-sm leading-relaxed text-mistral-black/55 max-w-xl mx-auto">
            Real questions. Real picks. Elio for every kind of night out and trip.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          data-reveal
          data-reveal-delay="1"
        >
          {ASKS.map((a) => (
            <div
              key={a.query}
              className="border border-[#C7D7F8] rounded-[20px] overflow-hidden bg-background flex flex-col"
            >
              {/* Photo with place overlay */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={a.image}
                  alt={a.place}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  className="absolute inset-x-0 top-0 h-20"
                  style={{ background: "linear-gradient(to bottom, rgba(7,12,38,0.55), transparent)" }}
                  aria-hidden="true"
                />
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-[13px] font-semibold text-white leading-tight drop-shadow-sm">{a.place}</span>
                    <span className="text-[11px] text-white/80 leading-tight drop-shadow-sm">{a.location}</span>
                  </div>
                  <span className="text-[11px] font-semibold bg-white/95 text-mistral-black px-2 py-0.5 rounded-full shrink-0">
                    {a.rating} ★
                  </span>
                </div>
              </div>

              {/* Query line */}
              <div className="px-5 py-4 flex items-start gap-3 border-t border-[#C7D7F8]">
                <span
                  className="size-5 shrink-0 mt-0.5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: "var(--color-mistral-orange, #154ACC)" }}
                  aria-hidden="true"
                >
                  E
                </span>
                <p className="text-sm text-mistral-black/70 leading-snug italic">
                  &ldquo;{a.query}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
