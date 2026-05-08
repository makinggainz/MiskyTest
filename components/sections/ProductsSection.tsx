/* eslint-disable @next/next/no-img-element */

const products = [
  {
    label: "For Enterprise",
    tagline: "Columbus Pro — Agentic GIS",
    cta: "Your new GIS",
    href: "/ColumbusDesign",
    image: "/images/product-columbus.png",
    features: [
      "Team management at any scale",
      "Compliance-ready AI tooling",
      "Advanced deployment pipelines",
    ],
  },
  {
    label: "For Consumer",
    tagline: "Elio — Smart & Social maps",
    cta: "Find your world now",
    href: "#",
    image: "/images/product-elio.png",
    features: [
      "Search and create intelligently",
      "Frontier AI in everyday life",
      "Personalized to your workflow",
    ],
  },
  {
    label: "Research",
    tagline: "Our journey to the Large Geospatial Model",
    cta: "A new foundation model",
    href: "#",
    image: "/images/product-research.webp",
    features: [
      "Frontier model releases",
      "Open-source contributions",
      "Published papers and benchmarks",
    ],
  },
];

function CheckIcon() {
  return (
    <svg
      className="size-3.5 shrink-0 mt-0.5 text-mistral-black"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 6.5l2.5 2.5 5.5-5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

export function ProductsSection() {
  const [enterprise, consumer, research] = products;

  return (
    <section className="py-10 md:py-[100px]">
      <div className="container bg-grid-pattern">

        <div className="mb-10 md:mb-20" data-reveal>
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight">
            We&rsquo;re all about maps and data.
          </h2>
        </div>

        {/* Bento grid — Enterprise spans 2 cols × 2 rows; Consumer + Research stack right */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

          {/* Hero tile — Enterprise (col-span-2, row-span-2) */}
          <div
            className="flex flex-col border border-[#C7D7F8] rounded-[20px] overflow-hidden bg-background md:col-span-2 md:row-span-2"
            data-reveal
            data-reveal-delay="1"
          >
            <div className="px-5 pt-5 pb-3">
              <span className="text-xs font-medium text-mistral-black tracking-wide uppercase">
                {enterprise.label}
              </span>
            </div>

            <div className="px-4 pb-2">
              <div className="relative h-56 md:h-72 w-full overflow-hidden rounded-[20px]">
                <img
                  src={enterprise.image}
                  alt={enterprise.tagline}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col flex-1 px-5 pt-4 pb-4 gap-4">
              <h3 className="text-lg md:text-2xl font-semibold text-mistral-black leading-snug">
                {enterprise.tagline}
              </h3>
              <div className="flex flex-col gap-2 flex-1">
                {enterprise.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <CheckIcon />
                    <span className="text-sm text-mistral-black leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-5 pb-5 pt-1">
              <a
                href={enterprise.href}
                className="group rounded-full flex items-center justify-between w-full px-5 py-2.5 bg-mistral-black text-white text-sm font-medium transition-colors hover:bg-mistral-black/80"
              >
                <span>{enterprise.cta}</span>
                <span className="text-mistral-orange transition-transform group-hover:translate-x-0.5">
                  <ArrowIcon />
                </span>
              </a>
            </div>
          </div>

          {/* Consumer tile */}
          <div
            className="flex flex-col border border-[#C7D7F8] rounded-[20px] overflow-hidden bg-background"
            data-reveal
            data-reveal-delay="2"
          >
            <div className="px-5 pt-5 pb-3">
              <span className="text-xs font-medium text-mistral-black tracking-wide uppercase">
                {consumer.label}
              </span>
            </div>

            <div className="px-4 pb-2">
              <div className="relative h-32 w-full overflow-hidden rounded-[20px]">
                <img
                  src={consumer.image}
                  alt={consumer.tagline}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col flex-1 px-5 pt-3 pb-4 gap-3">
              <h3 className="text-base font-semibold text-mistral-black leading-snug">
                {consumer.tagline}
              </h3>
              <div className="flex flex-col gap-1.5 flex-1">
                {consumer.features.slice(0, 2).map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <CheckIcon />
                    <span className="text-sm text-mistral-black leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-5 pb-5 pt-1">
              <a
                href={consumer.href}
                className="group rounded-full flex items-center justify-between w-full px-5 py-2.5 bg-mistral-black text-white text-sm font-medium transition-colors hover:bg-mistral-black/80"
              >
                <span>{consumer.cta}</span>
                <span className="text-mistral-orange transition-transform group-hover:translate-x-0.5">
                  <ArrowIcon />
                </span>
              </a>
            </div>
          </div>

          {/* Research tile */}
          <div
            className="flex flex-col border border-[#C7D7F8] rounded-[20px] overflow-hidden bg-background"
            data-reveal
            data-reveal-delay="3"
          >
            <div className="px-5 pt-5 pb-3">
              <span className="text-xs font-medium text-mistral-black tracking-wide uppercase">
                {research.label}
              </span>
            </div>

            <div className="px-4 pb-2">
              <div className="relative h-32 w-full overflow-hidden rounded-[20px]">
                <img
                  src={research.image}
                  alt={research.tagline}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col flex-1 px-5 pt-3 pb-4 gap-3">
              <h3 className="text-base font-semibold text-mistral-black leading-snug">
                {research.tagline}
              </h3>
              <div className="flex flex-col gap-1.5 flex-1">
                {research.features.slice(0, 2).map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <CheckIcon />
                    <span className="text-sm text-mistral-black leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-5 pb-5 pt-1">
              <a
                href={research.href}
                className="group rounded-full flex items-center justify-between w-full px-5 py-2.5 bg-mistral-black text-white text-sm font-medium transition-colors hover:bg-mistral-black/80"
              >
                <span>{research.cta}</span>
                <span className="text-mistral-orange transition-transform group-hover:translate-x-0.5">
                  <ArrowIcon />
                </span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
