"use client";

import { useEffect, useRef, useState } from "react";

const products = [
  {
    number: "01",
    label: "Enterprise",
    name: "Columbus",
    description:
      "Full-scale enterprise platform — team management, advanced deployments, and compliance-ready AI tooling built for organisations at scale.",
    href: "/ColumbusDesign",
    features: [
      "Team management at any scale",
      "Compliance-ready AI tooling",
      "Advanced deployment pipelines",
    ],
  },
  {
    number: "02",
    label: "Consumer",
    name: "Elio",
    description:
      "Your personal AI companion — search, create, and explore intelligently. Designed for individuals who want frontier AI in their everyday life.",
    href: "#",
    features: [
      "Search and create intelligently",
      "Frontier AI in everyday life",
      "Personalized to your workflow",
    ],
  },
  {
    number: "03",
    label: "Research",
    name: "Research",
    description:
      "Frontier models, open-source releases, and published papers. Explore the science powering our products and the broader AI research community.",
    href: "#",
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

  /* Scroll-based activation ------------------------------------------------ */
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

  /* Click nav item → smooth scroll to that product's position -------------- */
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
            Three ways to experience frontier AI.
          </h2>
        </div>

        {/* ── Mobile: simple bordered vertical list ── */}
        <div className="md:hidden flex flex-col border border-[#B8CCF5] divide-y divide-[#B8CCF5]">
          {products.map((product) => (
            <div key={product.name} className="flex flex-col gap-4 p-6">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs border border-[#B8CCF5] text-mistral-black px-2 py-1 rounded-[3px]">
                  {product.number}
                </span>
                <span className="text-xs bg-mistral-beige-deep text-mistral-black px-3 py-1 rounded-[3px]">
                  {product.label}
                </span>
              </div>
              <h3 className="text-3xl font-semibold text-mistral-black leading-none">
                {product.name}
              </h3>
              <p className="text-sm leading-relaxed text-mistral-black-tint">
                {product.description}
              </p>
              <a href={product.href} className="group inline-flex self-start">
                <span className="inline-flex items-center gap-2 bg-mistral-black text-white text-sm px-5 py-2 rounded-[3px] transition-colors hover:bg-mistral-black/80">
                  Explore {product.name}
                  <span className="text-mistral-orange transition-transform group-hover:translate-x-0.5">
                    <ArrowIcon />
                  </span>
                </span>
              </a>
            </div>
          ))}
        </div>

        {/* ── Desktop: sticky 3-column scroll ── */}
        {/* Outer tall container provides scroll distance (3× viewport height) */}
        <div
          ref={scrollContainerRef}
          className="hidden md:block relative"
          style={{ height: "300vh" }}
        >
          {/* Sticky panel — fills viewport below the nav */}
          <div
            className="sticky border border-[#B8CCF5] overflow-hidden"
            style={{
              top: "calc(var(--nav-height) + 16px)",
              height: "calc(100vh - var(--nav-height) - 32px)",
            }}
          >
            <div className="flex h-full divide-x divide-[#B8CCF5]">

              {/* ── Col 1: Left numbered navigation ── */}
              <div className="w-[200px] xl:w-[220px] shrink-0 flex flex-col divide-y divide-[#B8CCF5]">
                {products.map((product, i) => (
                  <button
                    key={product.name}
                    onClick={() => scrollToProduct(i)}
                    className="flex items-center gap-3 w-full px-5 py-5 text-left transition-colors cursor-pointer"
                    style={{
                      backgroundColor:
                        activeIndex === i ? "hsl(217 81% 92%)" : "transparent",
                      borderLeft:
                        activeIndex === i
                          ? "2px solid hsl(0 0% 12%)"
                          : "2px solid transparent",
                    }}
                  >
                    <span className="font-mono text-xs text-mistral-black-tint shrink-0 tabular-nums">
                      {product.number}
                    </span>
                    <span
                      className="text-xs font-semibold tracking-[0.12em] uppercase transition-colors"
                      style={{
                        color:
                          activeIndex === i
                            ? "hsl(0 0% 12%)"
                            : "hsl(0 0% 24%)",
                      }}
                    >
                      {product.name}
                    </span>
                  </button>
                ))}

                {/* Spacer so nav items don't stretch full height on 3-item list */}
                <div className="flex-1 border-t border-[#B8CCF5]" />
              </div>

              {/* ── Col 2: Center visual panel ── */}
              <div
                className="flex-1 relative overflow-hidden"
                style={{
                  backgroundColor: "hsl(217 81% 92%)",
                  backgroundImage:
                    "linear-gradient(to right, rgba(199,215,248,0.55) 1px, transparent 1px)," +
                    "linear-gradient(to bottom, rgba(199,215,248,0.55) 1px, transparent 1px)",
                  backgroundSize: "36px 36px",
                }}
              >
                {products.map((product, i) => (
                  <div
                    key={product.name}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-6 transition-opacity duration-500"
                    style={{
                      opacity: activeIndex === i ? 1 : 0,
                      pointerEvents: activeIndex === i ? "auto" : "none",
                    }}
                  >
                    {/* Product name as large typographic statement */}
                    <span className="text-[clamp(4rem,9vw,8rem)] font-semibold text-mistral-black leading-none text-center select-none px-8">
                      {product.name}
                    </span>

                    {/* Bottom progress indicator */}
                    <div className="absolute bottom-8 left-8 right-8 flex gap-2">
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

              {/* ── Col 3: Right description panel ── */}
              <div className="w-[280px] xl:w-[320px] shrink-0 relative overflow-hidden bg-background">
                {products.map((product, i) => (
                  <div
                    key={product.name}
                    className="absolute inset-0 flex flex-col justify-center px-8 py-10 transition-opacity duration-500"
                    style={{
                      opacity: activeIndex === i ? 1 : 0,
                      pointerEvents: activeIndex === i ? "auto" : "none",
                    }}
                  >
                    {/* Step number */}
                    <span className="font-mono text-xs border border-[#B8CCF5] text-mistral-black px-2 py-1 rounded-[3px] w-fit mb-6">
                      {product.number}
                    </span>

                    {/* Product name */}
                    <h3 className="text-2xl xl:text-3xl font-semibold text-mistral-black leading-tight mb-4">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-mistral-black-tint mb-8">
                      {product.description}
                    </p>

                    {/* Feature list — left-bar bullets */}
                    <div className="flex flex-col gap-4 mb-10">
                      {product.features.map((feature) => (
                        <div key={feature} className="flex gap-3">
                          <div className="w-px shrink-0 bg-[#B8CCF5]" />
                          <span className="text-sm text-mistral-black-tint leading-relaxed">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <a href={product.href} className="group inline-flex self-start">
                      <span className="inline-flex items-center gap-2 bg-mistral-black text-white text-sm px-5 py-2 rounded-[3px] transition-colors hover:bg-mistral-black/80">
                        Explore {product.name}
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
    </section>
  );
}
