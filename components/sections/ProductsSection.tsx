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
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.getAttribute("data-index")));
          }
        });
      },
      { threshold: 0.4 }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="my-10 md:my-20">
      <div className="container">

        {/* Section heading — matches Section1 heading style exactly */}
        <div className="mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-normal">
            Three ways to experience frontier AI.
          </h2>
        </div>

        {/* ── Mobile: simple bordered vertical stack ── */}
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

        {/* ── Desktop: sticky-scroll two-column layout ── */}
        <div className="hidden md:flex gap-16 items-start">

          {/* Left column — scrollable product items */}
          <div className="flex-1 border-t border-[#B8CCF5]">
            {products.map((product, i) => (
              <div
                key={product.name}
                ref={(el) => { itemRefs.current[i] = el; }}
                data-index={String(i)}
                className="min-h-[80vh] flex flex-col justify-center py-20 border-b border-[#B8CCF5]"
              >
                <div
                  className="transition-opacity duration-500 max-w-md"
                  style={{ opacity: activeIndex === i ? 1 : 0.2 }}
                >
                  {/* Step number + product label */}
                  <div className="flex items-center gap-2 mb-8">
                    <span className="font-mono text-xs border border-[#B8CCF5] text-mistral-black px-2 py-1 rounded-[3px]">
                      {product.number}
                    </span>
                    <span className="text-xs bg-mistral-beige-deep text-mistral-black px-3 py-1 rounded-[3px]">
                      {product.label}
                    </span>
                  </div>

                  {/* Product name */}
                  <h3 className="text-5xl font-semibold text-mistral-black leading-none mb-5">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-mistral-black-tint mb-8">
                    {product.description}
                  </p>

                  {/* Feature list — left-bar bullets (screenshot 1 style) */}
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
              </div>
            ))}
          </div>

          {/* Right column — sticky visual panel */}
          <div
            className="flex-1 sticky"
            style={{
              top: "calc(var(--nav-height) + 16px)",
              height: "calc(100vh - var(--nav-height) - 32px)",
            }}
          >
            {/* Panel: bg-mistral-beige-deep with CSS grid overlay */}
            <div
              className="relative h-full border border-[#B8CCF5] overflow-hidden"
              style={{
                backgroundColor: "hsl(217 81% 92%)",
                backgroundImage:
                  "linear-gradient(to right, rgba(199,215,248,0.55) 1px, transparent 1px)," +
                  "linear-gradient(to bottom, rgba(199,215,248,0.55) 1px, transparent 1px)",
                backgroundSize: "36px 36px",
              }}
            >
              {/* One panel per product — fade between them */}
              {products.map((product, i) => (
                <div
                  key={product.name}
                  className="absolute inset-0 flex flex-col justify-between p-10 transition-opacity duration-500"
                  style={{
                    opacity: activeIndex === i ? 1 : 0,
                    pointerEvents: activeIndex === i ? "auto" : "none",
                  }}
                >
                  {/* Top row: step number + label */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs border border-[#B8CCF5] bg-background text-mistral-black px-2 py-1 rounded-[3px]">
                      {product.number}
                    </span>
                    <span className="text-xs border border-[#B8CCF5] bg-background text-mistral-black px-3 py-1 rounded-[3px]">
                      {product.label}
                    </span>
                  </div>

                  {/* Center: large product name */}
                  <div className="flex-1 flex items-center justify-center">
                    <span className="text-7xl xl:text-8xl font-semibold text-mistral-black leading-none text-center select-none">
                      {product.name}
                    </span>
                  </div>

                  {/* Bottom: three progress bars */}
                  <div className="flex gap-2">
                    {products.map((_, j) => (
                      <div
                        key={j}
                        className="h-px flex-1 transition-colors duration-500"
                        style={{
                          backgroundColor: j === activeIndex ? "hsl(0 0% 12%)" : "#C7D7F8",
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
