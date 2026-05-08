"use client";

import { useEffect, useRef, useState } from "react";

const products = [
  {
    label: "Enterprise",
    name: "Columbus",
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
    name: "Elio",
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
    name: "Foundation Model",
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
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const el = scrollContainerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      setActiveIndex(
        Math.min(products.length - 1, Math.floor(progress * products.length))
      );
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToProduct = (index: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollable = el.offsetHeight - window.innerHeight;
    const elTop = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elTop + (index / products.length) * scrollable,
      behavior: "smooth",
    });
  };

  return (
    <section className="my-10 md:my-20">
      <div className="container">

        {/* Section heading */}
        <div className="mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-normal">
            We&rsquo;re all about maps and data. Our current offerings:
          </h2>
        </div>

        {/* ── Mobile: simple bordered vertical list ── */}
        <div className="md:hidden flex flex-col border border-[#B8CCF5] divide-y divide-[#B8CCF5]">
          {products.map((product) => (
            <div key={product.name} className="flex flex-col overflow-hidden">
              <img
                src={product.image}
                alt={product.tagline}
                className="w-full h-48 object-cover"
              />
              <div className="flex flex-col gap-4 p-6">
                <span className="text-xs bg-mistral-beige-deep text-mistral-black px-3 py-1 rounded-[3px] w-fit">
                  {product.label}
                </span>
                <p className="text-sm leading-relaxed text-mistral-black-tint">
                  {product.description}
                </p>
                <a href={product.href} className="group inline-flex self-start">
                  <span className="inline-flex items-center gap-2 bg-mistral-black text-white text-sm px-5 py-2 rounded-[3px] transition-colors hover:bg-mistral-black/80">
                    {product.cta}
                    <span className="text-mistral-orange transition-transform group-hover:translate-x-0.5">
                      <ArrowIcon />
                    </span>
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* ── Desktop: sticky 3-column scroll ── */}
        <div
          ref={scrollContainerRef}
          className="hidden md:block relative"
          style={{ height: "300vh" }}
        >
          <div
            className="sticky flex items-center"
            style={{
              top: "var(--nav-height)",
              height: "calc(100vh - var(--nav-height))",
            }}
          >
            <div className="flex gap-12 xl:gap-16 items-center w-full">

              {/* ── Left nav: standalone text list ── */}
              <div className="flex flex-col gap-1 shrink-0 w-[160px] xl:w-[180px]">
                {products.map((product, i) => (
                  <button
                    key={product.name}
                    onClick={() => scrollToProduct(i)}
                    className="flex flex-col gap-0.5 py-3 text-left w-full cursor-pointer transition-all"
                    style={{
                      borderLeft: `2px solid ${activeIndex === i ? "hsl(0 0% 12%)" : "transparent"}`,
                      paddingLeft: "12px",
                    }}
                  >
                    <span
                      className="text-sm font-semibold uppercase tracking-[0.1em] transition-colors leading-none"
                      style={{ color: activeIndex === i ? "hsl(0 0% 12%)" : "hsl(0 0% 55%)" }}
                    >
                      {product.name}
                    </span>
                    <span
                      className="text-xs transition-colors"
                      style={{ color: activeIndex === i ? "hsl(0 0% 35%)" : "hsl(0 0% 65%)" }}
                    >
                      {product.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* ── Right panel: image + description at ~45vh ── */}
              <div
                className="flex-1 border border-[#B8CCF5] overflow-hidden flex divide-x divide-[#B8CCF5]"
                style={{ height: "45vh" }}
              >

                {/* Center: product image */}
                <div className="flex-1 relative overflow-hidden bg-mistral-beige-deep">
                  {products.map((product, i) => (
                    <div
                      key={product.name}
                      className="absolute inset-0 transition-opacity duration-500"
                      style={{
                        opacity: activeIndex === i ? 1 : 0,
                        pointerEvents: activeIndex === i ? "auto" : "none",
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.tagline}
                        className="absolute inset-0 w-full h-full object-cover"
                      />

                      {/* Progress bars */}
                      <div className="absolute bottom-5 left-6 right-6 flex gap-2">
                        {products.map((_, j) => (
                          <div
                            key={j}
                            className="h-px flex-1 transition-colors duration-500"
                            style={{
                              backgroundColor:
                                j === activeIndex ? "hsl(0 0% 12%)" : "#C7D7F8",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right: description */}
                <div className="w-[260px] xl:w-[300px] shrink-0 relative overflow-hidden bg-background">
                  {products.map((product, i) => (
                    <div
                      key={product.name}
                      className="absolute inset-0 flex flex-col justify-center px-7 py-8 transition-opacity duration-500"
                      style={{
                        opacity: activeIndex === i ? 1 : 0,
                        pointerEvents: activeIndex === i ? "auto" : "none",
                      }}
                    >
                      <span className="text-xs bg-mistral-beige-deep text-mistral-black px-3 py-1 rounded-[3px] w-fit mb-5">
                        {product.label}
                      </span>

                      <h3 className="text-xl xl:text-2xl font-semibold text-mistral-black leading-tight mb-3">
                        {product.tagline}
                      </h3>

                      <p className="text-sm leading-relaxed text-mistral-black-tint mb-6">
                        {product.description}
                      </p>

                      <div className="flex flex-col gap-3 mb-7">
                        {product.features.map((feature) => (
                          <div key={feature} className="flex gap-3">
                            <div className="w-px shrink-0 bg-[#B8CCF5]" />
                            <span className="text-sm text-mistral-black-tint leading-relaxed">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <a href={product.href} className="group inline-flex self-start">
                        <span className="inline-flex items-center gap-2 bg-mistral-black text-white text-sm px-5 py-2 rounded-[3px] transition-colors hover:bg-mistral-black/80">
                          {product.cta}
                          <span className="text-mistral-orange transition-transform group-hover:translate-x-0.5">
                            <ArrowIcon />
                          </span>
                        </span>
                      </a>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
