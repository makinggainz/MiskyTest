/* eslint-disable @next/next/no-img-element */

const products = [
  {
    label: "Enterprise",
    name: "Columbus",
    description:
      "Full-scale enterprise platform — team management, advanced deployments, and compliance-ready AI tooling built for organisations at scale.",
    href: "/ColumbusDesign",
    visual: {
      gradient: "linear-gradient(140deg, #0E256E 0%, #1340B3 60%, #2663EB 100%)",
      accent: "#A8C0F4",
    },
  },
  {
    label: "Consumer",
    name: "Elio",
    description:
      "Your personal AI companion — search, create, and explore intelligently. Designed for individuals who want frontier AI in their everyday life.",
    href: "#",
    visual: {
      gradient: "linear-gradient(140deg, #1B57DC 0%, #5582EA 60%, #7EA0EE 100%)",
      accent: "#DCE7FB",
    },
  },
  {
    label: "Research",
    name: "Research",
    description:
      "Frontier models, open-source releases, and published papers. Explore the science powering our products and the broader AI research community.",
    href: "#",
    visual: {
      gradient: "linear-gradient(140deg, #154ACC 0%, #2663EB 60%, #A8C0F4 100%)",
      accent: "#EEF3FE",
    },
  },
];

function ArrowIcon() {
  return (
    <svg className="size-3 shrink-0" width="24" viewBox="0 0 9 13" fill="none" aria-hidden="true">
      <circle cx="7.22" cy="6.589" r="1.28" fill="currentColor" />
      <circle cx="4.658" cy="4.018" r="1.28" fill="currentColor" />
      <circle cx="2.099" cy="1.46" r="1.28" fill="currentColor" />
      <circle cx="4.658" cy="9.151" r="1.28" fill="currentColor" />
      <circle cx="2.099" cy="11.718" r="1.28" fill="currentColor" />
    </svg>
  );
}

export function ProductsSection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container">
        <div className="mb-10 md:mb-14">
          <p className="text-xs font-medium tracking-widest uppercase text-mistral-black-tint mb-3">Our offerings</p>
          <h2 className="text-3xl md:text-4xl text-mistral-black">Three ways to experience frontier AI.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.name}
              className="flex flex-col rounded-[16px] overflow-hidden border border-[#C7D7F8] bg-white"
            >
              {/* Visual panel */}
              <div
                className="relative h-52 flex flex-col justify-between p-7 overflow-hidden"
                style={{ background: product.visual.gradient }}
              >
                {/* Subtle dot grid decoration */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-10"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern id={`dots-${product.name}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1.5" fill="white" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#dots-${product.name})`} />
                </svg>

                {/* Category label */}
                <span
                  className="relative z-10 self-start text-xs font-medium px-3 py-1 rounded-[8px]"
                  style={{ background: "rgba(255,255,255,0.18)", color: product.visual.accent }}
                >
                  {product.label}
                </span>

                {/* Large product name */}
                <h3
                  className="relative z-10 text-4xl font-semibold text-white"
                >
                  {product.name}
                </h3>
              </div>

              {/* Content panel */}
              <div className="flex flex-col gap-5 p-7 flex-1">
                <p className="text-sm leading-relaxed text-mistral-black-tint flex-1">
                  {product.description}
                </p>

                <a href={product.href} className="group inline-flex items-center gap-2 self-start">
                  <span className="inline-flex items-center gap-2 rounded-[8px] bg-mistral-black text-white text-sm px-5 py-2 transition-colors hover:bg-mistral-black/80">
                    Explore {product.name}
                    <span className="ml-1 transition-transform group-hover:translate-x-0.5 text-mistral-orange">
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
