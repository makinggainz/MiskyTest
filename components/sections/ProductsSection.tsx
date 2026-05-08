const products = [
  {
    label: "Enterprise",
    name: "Columbus",
    description:
      "Full-scale enterprise platform — team management, advanced deployments, and compliance-ready AI tooling built for organisations at scale.",
    href: "/ColumbusDesign",
  },
  {
    label: "Consumer",
    name: "Elio",
    description:
      "Your personal AI companion — search, create, and explore intelligently. Designed for individuals who want frontier AI in their everyday life.",
    href: "#",
  },
  {
    label: "Research",
    name: "Research",
    description:
      "Frontier models, open-source releases, and published papers. Explore the science powering our products and the broader AI research community.",
    href: "#",
  },
];

function ArrowIcon() {
  return (
    <svg className="size-3 shrink-0" width="24" viewBox="0 0 9 13" fill="none" aria-hidden="true">
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
    <section className="overflow-hidden my-10 md:my-20">
      <div className="container">

        {/* Heading row — matches Section1's heading block exactly */}
        <div className="flex flex-col md:flex-row items-center text-center md:text-left justify-between md:items-end gap-4 mb-10 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-normal">
            Three ways to experience frontier AI.
          </h2>
        </div>

        {/* Single bordered container, items separated by divide-[#B8CCF5] —
            same border colour and divide pattern used in the value-props section */}
        <div className="flex flex-col md:flex-row border border-[#B8CCF5] overflow-hidden divide-y md:divide-y-0 md:divide-x divide-[#B8CCF5]">
          {products.map((product) => (
            <div key={product.name} className="flex-1 flex flex-col">

              {/* Visual panel — bg-mistral-beige-deep, the only secondary surface
                  used in content sections; product name is the visual centrepiece */}
              <div className="h-52 bg-mistral-beige-deep flex items-end p-6 md:p-8">
                <span className="text-5xl font-semibold text-mistral-black leading-none">
                  {product.name}
                </span>
              </div>

              {/* Content — sits directly on bg-background, no invented surface */}
              <div className="flex flex-col gap-xl p-6 md:p-8 flex-1">
                {/* Label — identical construction to Section1 feature chips */}
                <span className="w-fit bg-mistral-beige-deep text-mistral-black text-xs px-3 py-1 rounded-[3px]">
                  {product.label}
                </span>

                <p className="text-sm leading-relaxed text-mistral-black-tint flex-1">
                  {product.description}
                </p>

                {/* Button — identical to every CTA on the page */}
                <a href={product.href} className="group inline-flex self-start">
                  <span className="inline-flex items-center gap-2 bg-mistral-black text-white text-sm px-5 py-2 rounded-[3px] transition-colors hover:bg-mistral-black/80">
                    Explore {product.name}
                    <span className="text-mistral-orange transition-transform group-hover:translate-x-0.5">
                      <ArrowIcon />
                    </span>
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
