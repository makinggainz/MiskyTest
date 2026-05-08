"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";

const products = [
  {
    number: "01",
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
    number: "02",
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
    number: "03",
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
      <circle cx="7.22"  cy="6.589"  r="1.28" fill="currentColor" />
      <circle cx="4.658" cy="4.018"  r="1.28" fill="currentColor" />
      <circle cx="2.099" cy="1.46"   r="1.28" fill="currentColor" />
      <circle cx="4.658" cy="9.151"  r="1.28" fill="currentColor" />
      <circle cx="2.099" cy="11.718" r="1.28" fill="currentColor" />
    </svg>
  );
}

export function ProductsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const containerTop = containerRef.current.offsetTop;
      const scrollableDistance =
        containerRef.current.offsetHeight - window.innerHeight;
      if (scrollableDistance <= 0) return;
      const scrolled = window.scrollY - containerTop;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      setActiveIndex(
        Math.min(products.length - 1, Math.floor(progress * products.length))
      );
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCard = (index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const scrollableDistance =
      containerRef.current.offsetHeight - window.innerHeight;
    // nudge slightly past the zone boundary so the index registers
    const target =
      containerTop +
      Math.max(
        0,
        Math.min(
          scrollableDistance,
          ((index + 0.05) / products.length) * scrollableDistance
        )
      );
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  // Cards slide up from below and stack. Past cards peek below the active
  // card to create a physical deck effect.
  const cardStyle = (i: number): React.CSSProperties => {
    const diff = i - activeIndex;
    let transform: string;
    if (diff > 0) {
      transform = "translateY(110%)";
    } else if (diff === 0) {
      transform = "translateY(0px) scale(1)";
    } else {
      const steps = Math.abs(diff);
      transform = `translateY(${steps * 22}px) scale(${1 - steps * 0.025})`;
    }
    return {
      transform,
      zIndex: i + 1,
      transition: "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
    };
  };

  return (
    // Outer container is N × 100vh tall — this is what the user scrolls through.
    <div
      ref={containerRef}
      style={{ height: `${products.length * 100}vh` }}
    >
      {/* Sticky frame stays in viewport while the outer container scrolls past */}
      <div className="sticky top-0 h-screen flex items-center bg-background">
        <div className="container">
          <div className="flex gap-12 lg:gap-20 items-center">

            {/* ── Left: heading + numbered nav ─────────────────────────── */}
            <div className="w-64 lg:w-80 flex-shrink-0 flex flex-col gap-10">
              <h2 className="text-3xl lg:text-4xl font-normal leading-tight text-mistral-black">
                We&rsquo;re all about maps and data.
              </h2>

              {/* Numbered circle buttons with connecting line */}
              <div className="relative flex flex-col">
                {/* Vertical connector behind the circles */}
                <div
                  className="absolute left-5 top-5 bottom-5 w-px"
                  style={{ background: "var(--color-mistral-beige-deeper, #C7D7F8)" }}
                />

                {products.map((product, i) => (
                  <button
                    key={product.number}
                    onClick={() => scrollToCard(i)}
                    className="group relative flex items-center gap-4 py-3.5 text-left"
                    aria-label={`Jump to ${product.label}`}
                  >
                    {/* Circle */}
                    <span
                      className="relative z-10 flex size-10 rounded-full items-center justify-center text-xs font-semibold flex-shrink-0"
                      style={{
                        background:
                          activeIndex === i
                            ? "var(--color-mistral-black)"
                            : "var(--color-background)",
                        color:
                          activeIndex === i
                            ? "#fff"
                            : "rgba(0,0,0,0.35)",
                        border:
                          activeIndex === i
                            ? "1.5px solid var(--color-mistral-black)"
                            : "1.5px solid rgba(0,0,0,0.15)",
                        transform: activeIndex === i ? "scale(1.12)" : "scale(1)",
                        transition:
                          "background 0.35s ease, color 0.35s ease, transform 0.35s ease, border-color 0.35s ease",
                      }}
                    >
                      {product.number}
                    </span>

                    {/* Label */}
                    <span
                      className="text-sm font-medium leading-none"
                      style={{
                        color:
                          activeIndex === i
                            ? "var(--color-mistral-black)"
                            : "rgba(0,0,0,0.35)",
                        transition: "color 0.35s ease",
                      }}
                    >
                      {product.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Right: stacked card deck ──────────────────────────────── */}
            {/* No overflow-hidden here — past cards peek below the active card */}
            <div className="relative flex-1" style={{ height: "72vh" }}>
              {products.map((product, i) => (
                <div
                  key={product.tagline}
                  className="absolute inset-0 flex flex-col border border-[#C7D7F8] rounded-[20px] overflow-hidden bg-background"
                  style={cardStyle(i)}
                >
                  {/* Card label header */}
                  <div className="px-5 pt-5 pb-3">
                    <span className="text-xs font-medium text-mistral-black-tint tracking-wide uppercase">
                      {product.label}
                    </span>
                  </div>

                  {/* Product image */}
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
                    <h3 className="text-base font-semibold text-mistral-black leading-snug">
                      {product.tagline}
                    </h3>
                    <div className="flex flex-col gap-2 flex-1">
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

                  {/* CTA */}
                  <div className="px-5 pb-5 pt-1">
                    <a
                      href={product.href}
                      className="group rounded-full flex items-center justify-between w-full px-5 py-2.5 bg-mistral-black text-white text-sm font-medium transition-colors hover:bg-mistral-black/80"
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
        </div>
      </div>
    </div>
  );
}
