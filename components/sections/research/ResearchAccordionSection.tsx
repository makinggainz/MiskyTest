"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { RESEARCH } from "@/content/research";

function DotArrow({ className = "" }: { className?: string }) {
  return (
    <svg className={`shrink-0 ${className}`} viewBox="0 0 9 13" fill="none" aria-hidden="true">
      <circle cx="7.22" cy="6.589" r="1.28" fill="currentColor" />
      <circle cx="4.658" cy="4.018" r="1.28" fill="currentColor" />
      <circle cx="2.099" cy="1.46" r="1.28" fill="currentColor" />
      <circle cx="4.658" cy="9.151" r="1.28" fill="currentColor" />
      <circle cx="2.099" cy="11.718" r="1.28" fill="currentColor" />
    </svg>
  );
}

function LineArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`shrink-0 ${className}`}
      width="12" height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Definition({
  term,
  title,
  body,
}: {
  term: string;
  title: string;
  body: string;
}) {
  return (
    <span className="relative inline-block group">
      <button
        type="button"
        className="underline decoration-dotted decoration-mistral-black/40 underline-offset-4 text-mistral-black hover:decoration-mistral-black/80"
      >
        {term}
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute left-0 top-full z-20 mt-2 w-[260px] opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0"
      >
        <span className="block border border-[#C7D7F8] rounded-[10px] bg-white p-4 shadow-sm">
          <span className="block text-xs font-semibold text-mistral-black mb-1">
            {title}
          </span>
          <span className="block text-xs leading-relaxed text-mistral-black/70">
            {body}
          </span>
        </span>
      </span>
    </span>
  );
}

function Plus({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="shrink-0 transition-transform duration-200"
      style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
    >
      <path
        d="M10 4v12M4 10h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

type GroupDef = (typeof RESEARCH.groups)[number];

function GroupBody({ group }: { group: GroupDef }) {
  return (
    <div className="flex flex-col gap-4 text-sm md:text-base text-mistral-black/75 leading-relaxed">
      {group.paragraphs.map((p, i) => (
        <p key={`p-${i}`}>{p}</p>
      ))}
      {group.paragraphsWithDefinitions?.map((seg, i) => (
        <p key={`d-${i}`}>
          {seg.before}
          <Definition
            term={seg.definition.term}
            title={seg.definition.title}
            body={seg.definition.body}
          />
          {seg.after}
        </p>
      ))}
      {group.paragraphsTrailing?.map((p, i) => (
        <p key={`t-${i}`}>{p}</p>
      ))}

      {group.products && (
        <div className="flex flex-wrap gap-2">
          {group.products.map((product) =>
            product.soon ? (
              <span
                key={product.name}
                className="inline-flex items-center gap-2 rounded-full border border-[#C7D7F8] bg-mistral-beige-deep px-4 py-2 text-xs text-mistral-black/55"
              >
                {product.name}
              </span>
            ) : (
              <a
                key={product.name}
                href={product.href ?? "#"}
                {...(product.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="inline-flex items-center gap-2 rounded-full border border-[#C7D7F8] bg-white px-4 py-2 text-xs text-mistral-black hover:bg-mistral-beige-deep transition-colors"
              >
                {product.glyph && (
                  <img
                    src={product.glyph}
                    alt=""
                    aria-hidden="true"
                    className="size-4 object-contain"
                  />
                )}
                <span>{product.name}</span>
              </a>
            ),
          )}
        </div>
      )}

      {group.link && (
        <a
          href={group.link.href}
          className="group mt-2 inline-flex items-center gap-2 text-sm text-mistral-black self-start"
        >
          <span>{group.link.text}</span>
          <span className="text-mistral-orange transition-transform group-hover:translate-x-0.5">
            <LineArrow className="size-3" />
          </span>
        </a>
      )}
    </div>
  );
}

export function ResearchAccordionSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="core-reasoning" className="py-10 md:py-[100px]">
      <div className="container">
        {/* Centered intro — single column, max-w-3xl */}
        <div className="text-center mb-10 md:mb-20 mx-auto max-w-3xl" data-reveal>
          <p className="text-xs font-medium text-mistral-black/50 uppercase tracking-wider">
            {RESEARCH.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl md:text-5xl font-normal tracking-tight text-mistral-black">
            {RESEARCH.title}
          </h2>
          <p className="mt-6 md:mt-12 text-sm md:text-base text-mistral-black/70 leading-relaxed">
            {RESEARCH.intro}
          </p>
        </div>

        {/* Aside as pull-quote callout */}
        <aside
          className="mb-10 md:mb-20 mx-auto max-w-3xl border border-[#C7D7F8] rounded-[20px] bg-mistral-beige-deep p-6 md:p-10 flex flex-col gap-6"
          data-reveal
          data-reveal-delay="1"
        >
          <p className="text-base md:text-lg text-mistral-black leading-relaxed">
            {RESEARCH.aside}
          </p>
          <a
            href={RESEARCH.asideCta.href}
            className="group inline-flex items-center gap-2 rounded-[7px] px-5 py-2 text-sm bg-mistral-black text-white transition-colors hover:bg-mistral-black/80 self-start"
          >
            <span>{RESEARCH.asideCta.text}</span>
            <span className="ml-2 inline-block text-mistral-orange transition-transform group-hover:translate-x-0.5">
              <DotArrow className="size-3" />
            </span>
          </a>
        </aside>

        {/* Intro line — small, centered, leading into the accordion */}
        <p
          className="text-sm md:text-base text-mistral-black/65 leading-relaxed max-w-3xl mx-auto text-center mb-10 md:mb-20"
          data-reveal
          data-reveal-delay="2"
        >
          {RESEARCH.introLine}
        </p>

        {/* Accordion — full width, prominent */}
        <div
          className="border-t border-mistral-black/10"
          data-reveal
          data-reveal-delay="3"
        >
          {RESEARCH.groups.map((group, i) => {
            const open = openIndex === i;
            return (
              <div key={group.title} className="border-b border-mistral-black/10">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  aria-expanded={open}
                  className="w-full flex items-center justify-between gap-6 py-5 md:py-6 text-left"
                >
                  <span className="text-base md:text-xl font-semibold text-mistral-black leading-snug">
                    {group.title}
                  </span>
                  <span className="text-mistral-black/55">
                    <Plus open={open} />
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="pb-6 md:pb-10 max-w-3xl">
                      <GroupBody group={group} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing article + decorative starburst accent */}
        <div
          className="mt-10 md:mt-20 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 md:gap-6 items-stretch"
          data-reveal
          data-reveal-delay="4"
        >
          <a
            href={RESEARCH.closingArticle.href}
            className="group block border border-[#C7D7F8] rounded-[20px] bg-mistral-beige-deep p-6 md:p-10 transition-colors hover:bg-mistral-beige-deep/80"
          >
            <p className="text-xs font-medium text-mistral-black/50 uppercase tracking-wider">
              {RESEARCH.closingArticle.kicker}
            </p>
            <p className="mt-3 text-lg md:text-2xl text-mistral-black font-semibold leading-snug">
              {RESEARCH.closingArticle.headlineStrong}
            </p>
          </a>
          <div
            className="hidden md:flex border border-[#C7D7F8] rounded-[8px] bg-mistral-beige-deep items-center justify-center overflow-hidden"
            aria-hidden="true"
          >
            <img
              src={RESEARCH.starburstImg}
              alt=""
              className="w-full h-full object-contain p-6"
              style={{ filter: "saturate(0) brightness(0.45)", opacity: 0.6 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
