"use client";

import { useState } from "react";

// FAQ accordion per landing-page-spec §26. Seven questions covering AI
// accuracy, data sourcing, integration, and procurement — the exact set
// committee buyers raise during enterprise evaluation.

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "How does Columbus source its data?",
    a: "We aggregate from 80+ verified datasets — Census, USGS, OpenStreetMap, parcel databases, environmental records, and licensed proprietary feeds. Every layer cites its origin and last-updated timestamp.",
  },
  {
    q: "Does Columbus train on our data?",
    a: "No. Customer prompts, datasets, and outputs are never used to train our models. Your data sits in your tenant; we don't read it for model improvement, ever.",
  },
  {
    q: "What happens when Columbus is wrong?",
    a: "Every output ships with a reasoning trace — every dataset pulled, every weighting applied, every inference made. Low-confidence outputs are flagged and require human sign-off before they leave the platform.",
  },
  {
    q: "How is this different from a general-purpose chatbot?",
    a: "A general chatbot reads articles and writes text. Columbus reads geographic data — coordinates, parcels, terrain, demographics — and produces maps, layers, and reports grounded in verified sources.",
  },
  {
    q: "Can we self-host Columbus?",
    a: "Yes, for enterprise customers in regulated industries (healthcare, finance, government). Self-hosted deployments include full air-gap support and on-premises data pipelines.",
  },
  {
    q: "What integrates with our existing GIS stack?",
    a: "Columbus reads from and writes to ArcGIS, QGIS, Esri, FME, GeoServer, Mapbox, CARTO, and Snowflake. Outputs export as GeoJSON, Shapefile, GeoPackage, and KML.",
  },
  {
    q: "What does pricing look like?",
    a: "Pricing is custom based on team size, data volume, and deployment model. We're in early enterprise rollout — talk to founders for an early-access quote.",
  },
];

export function EnterpriseFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="relative py-10 md:py-[100px]">
      <div className="container bg-grid-pattern relative z-10">

        <div className="mb-10 md:mb-20 text-center" data-reveal>
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-mistral-black">
            Questions buyers actually ask.
          </h2>
        </div>

        <div className="max-w-3xl mx-auto" data-reveal data-reveal-delay="1">
          {FAQS.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className="border-t border-[#C7D7F8] last:border-b">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 py-5 text-left transition-colors hover:text-mistral-black/70"
                >
                  <span className="text-base md:text-lg font-medium text-mistral-black">
                    {faq.q}
                  </span>
                  <span
                    className={`size-5 shrink-0 transition-transform duration-200 text-mistral-black/50 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="size-full">
                      <path
                        d="M12 4v16M4 12h16"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-6 pr-12">
                    <p className="text-sm md:text-base text-mistral-black/65 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
