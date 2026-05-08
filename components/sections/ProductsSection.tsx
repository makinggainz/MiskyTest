import Image from "next/image";

const products = [
  {
    label: "Enterprise",
    tagline: "Columbus — Agentic GIS",
    cta: "Your new GIS",
    description:
      "Full-scale enterprise platform — team management, advanced deployments, and compliance-ready AI tooling built for organisations at scale.",
    href: "/ColumbusDesign",
    image: "/images/product-columbus.png",
    features: [
      "Team management at any scale",
      "Compliance-ready AI tooling",
      "Advanced deployment pipelines",
    ],
  },
  {
    label: "Consumer",
    tagline: "Elio — Smart & Social maps",
    cta: "Find your world now",
    description:
      "Your personal AI companion — search, create, and explore intelligently. Designed for individuals who want frontier AI in their everyday life.",
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
    description:
      "Frontier models, open-source releases, and published papers. Explore the science powering our products and the broader AI research community.",
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
    <section className="my-10 md:my-20">
      <div className="container">

        {/* Section heading */}
        <div className="mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-normal">
            We&rsquo;re all about maps and data. Our current offerings:
          </h2>
        </div>

        {/* Three cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {products.map((product) => (
            <div
              key={product.tagline}
              className="flex flex-col border border-[#B8CCF5] rounded-[6px] overflow-hidden bg-mistral-beige-deep"
            >
              {/* Product image */}
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={product.image}
                  alt={product.tagline}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6 gap-4">
                {/* Label chip */}
                <span className="text-xs border border-[#B8CCF5] bg-background text-mistral-black px-3 py-1 rounded-[3px] w-fit">
                  {product.label}
                </span>

                {/* Tagline */}
                <h3 className="text-lg font-semibold text-mistral-black leading-snug">
                  {product.tagline}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-mistral-black-tint flex-1">
                  {product.description}
                </p>

                {/* Feature list with checkmarks */}
                <div className="flex flex-col gap-2.5">
                  {product.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2.5">
                      <CheckIcon />
                      <span className="text-sm text-mistral-black-tint leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA row — separated by divider, mirrors "Start now" in reference */}
              <div className="border-t border-[#B8CCF5]">
                <a
                  href={product.href}
                  className="group flex items-center justify-between w-full px-6 py-4 transition-colors hover:bg-mistral-beige-deeper/30"
                >
                  <span className="text-sm font-medium text-mistral-black">
                    {product.cta}
                  </span>
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
