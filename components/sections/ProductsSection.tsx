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
  return (
    <section className="py-10 md:py-[100px]">
      <div className="container bg-grid-pattern">

        {/* Section heading — "Our current offerings:" removed */}
        <div className="mb-10 md:mb-20" data-reveal>
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight">
            We&rsquo;re all about maps and data.
          </h2>
        </div>

        {/* Three cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {products.map((product, i) => (
            <div
              key={product.tagline}
              className="flex flex-col border border-[#C7D7F8] rounded-[20px] overflow-hidden bg-background"
              data-reveal
              data-reveal-delay={String(i + 1)}
            >
              {/* Card label header */}
              <div className="px-5 pt-5 pb-3">
                <span className="text-xs font-medium text-mistral-black tracking-wide uppercase">
                  {product.label}
                </span>
              </div>

              {/* Product image — floating, inset with rounded corners */}
              <div className="px-4 pb-2">
                <div className="relative h-44 w-full overflow-hidden rounded-[20px]">
                  <img
                    src={product.image}
                    alt={product.tagline}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 px-5 pt-4 pb-4 gap-4">
                {/* Tagline */}
                <h3 className="text-base font-semibold text-mistral-black leading-snug">
                  {product.tagline}
                </h3>

                {/* Feature list */}
                <div className="flex flex-col gap-2 flex-1">
                  {product.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2.5">
                      <CheckIcon />
                      <span className="text-sm text-mistral-black leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA — design-system outlined button, centered within card padding */}
              <div className="px-5 pb-5 pt-1">
                <a
                  href={product.href}
                  className="group rounded-[7px] flex items-center justify-between w-full px-5 py-2.5 bg-mistral-black text-white text-sm font-medium transition-colors hover:bg-mistral-black/80"
                >
                  <span>{product.cta}</span>
                  <span className="text-mistral-orange transition-transform group-hover:translate-x-0.5">
                    <ArrowIcon />
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
