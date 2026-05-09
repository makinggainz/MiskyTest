/* eslint-disable @next/next/no-img-element */
import { MapShape } from "@/components/MapShape";

function ArrowIcon() {
  return (
    <svg className="size-3 shrink-0" viewBox="0 0 9 13" fill="none" aria-hidden="true">
      <circle cx="7.22" cy="6.589" r="1.28" fill="currentColor" />
      <circle cx="4.658" cy="4.018" r="1.28" fill="currentColor" />
      <circle cx="2.099" cy="1.46" r="1.28" fill="currentColor" />
      <circle cx="4.658" cy="9.151" r="1.28" fill="currentColor" />
      <circle cx="2.099" cy="11.718" r="1.28" fill="currentColor" />
    </svg>
  );
}

function SupportChatVisual() {
  return (
    <div
      className="relative h-[360px] md:h-[480px] rounded-[20px] overflow-hidden"
      style={{ background: "#f0f3f8" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, #c7d2e0 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Header */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between bg-white border border-[#C7D7F8] rounded-full px-4 py-2 shadow-sm">
        <div className="flex items-center gap-2.5">
          <span
            className="size-7 rounded-full flex items-center justify-center text-[11px] font-semibold text-white"
            style={{ background: "#dde3ea", color: "#1f2b5c" }}
          >
            M
          </span>
          <div className="flex flex-col">
            <span className="text-[12px] font-semibold text-mistral-black leading-none">Maya</span>
            <span className="text-[10px] text-mistral-black/45 leading-none mt-0.5">Geospatial researcher · online</span>
          </div>
        </div>
        <span className="size-2 rounded-full bg-emerald-500" aria-hidden="true" />
      </div>

      {/* Conversation */}
      <div className="absolute inset-x-6 bottom-6 flex flex-col gap-2.5" style={{ maxWidth: "440px", marginLeft: "auto", marginRight: "auto" }}>
        <div className="self-end max-w-[85%] bg-white rounded-[16px] rounded-br-[5px] shadow-sm px-4 py-3">
          <p className="text-[12px] leading-relaxed text-mistral-black">
            We need parcel-level zoning for three counties in Texas. Do you have it?
          </p>
        </div>
        <div className="bg-white/90 rounded-[14px] rounded-bl-[5px] shadow-sm px-4 py-3 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span
              className="size-4 shrink-0 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
              style={{ background: "#1f2b5c" }}
            >
              M
            </span>
            <span className="text-[11px] font-medium text-mistral-black/70">Maya</span>
          </div>
          <p className="text-[12px] leading-relaxed text-mistral-black/80 pl-6">
            Yes — Travis, Williamson and Hays. I&rsquo;ll drop the layer into your project right now and ping you when it&rsquo;s indexed.
          </p>
          <p className="text-[11px] text-mistral-black/45 pl-6 italic">
            Typing… 2 minutes ago
          </p>
        </div>
        <div className="self-end max-w-[85%] bg-white rounded-[16px] rounded-br-[5px] shadow-sm px-4 py-3">
          <p className="text-[12px] leading-relaxed text-mistral-black">
            Perfect, thank you.
          </p>
        </div>
      </div>
    </div>
  );
}

export function EnterpriseFeatureBlocks() {
  return (
    <section className="relative py-10 md:py-[100px]">
      <MapShape placement="top-right" />
      <div className="container bg-grid-pattern relative z-10">

        {/* Generative Geodata — image left, text right */}
        <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-center" data-reveal>
          <div className="w-full lg:flex-1" data-reveal data-reveal-delay="1">
            <div className="relative h-[360px] md:h-[480px] rounded-[20px] overflow-hidden">
              <img
                src="/images/usecases/gmap.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
          <div
            className="w-full lg:flex-1 lg:max-w-[480px] flex flex-col gap-6"
            data-reveal
            data-reveal-delay="1"
          >
            <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-mistral-black">
              Generative geodata.
            </h2>
            <p className="text-xl md:text-2xl font-normal tracking-tight leading-snug text-mistral-black/60">
              AI-generated geospatial datasets where surveying is too slow or too expensive.
            </p>
            <p className="text-sm text-mistral-black/55 leading-relaxed">
              Columbus fills the gaps in your data with synthesised layers grounded in our verified base maps. Use them for prospecting, scenario planning, or anywhere a real survey would take twelve weeks you don&rsquo;t have.
            </p>
            <div className="pt-2">
              <a
                href="#"
                className="group rounded-[7px] inline-flex items-center gap-2 px-5 py-2.5 bg-mistral-black text-white text-sm font-medium transition-colors hover:bg-mistral-black/80"
              >
                Learn about generative data
                <span className="text-mistral-orange transition-transform group-hover:translate-x-0.5">
                  <ArrowIcon />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* 24/7 Human Support — text left, image right */}
        <div
          className="mt-20 md:mt-[100px] flex flex-col lg:flex-row-reverse gap-10 md:gap-16 items-center"
          data-reveal
        >
          <div className="w-full lg:flex-1" data-reveal data-reveal-delay="1">
            <SupportChatVisual />
          </div>
          <div
            className="w-full lg:flex-1 lg:max-w-[480px] flex flex-col gap-6"
            data-reveal
            data-reveal-delay="1"
          >
            <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-mistral-black">
              24/7 human support.
            </h2>
            <p className="text-xl md:text-2xl font-normal tracking-tight leading-snug text-mistral-black/60">
              Real humans on call. Find a dataset, get a platform tip, hand off to a researcher.
            </p>
            <p className="text-sm text-mistral-black/55 leading-relaxed">
              Every enterprise account ships with a dedicated team you can reach in-product. Two minutes to a typed answer, ten to a video call. No tickets, no escalation tree.
            </p>
            <div className="pt-2">
              <a
                href="#"
                className="group rounded-[7px] inline-flex items-center gap-2 px-5 py-2.5 bg-mistral-black text-white text-sm font-medium transition-colors hover:bg-mistral-black/80"
              >
                Meet the team
                <span className="text-mistral-orange transition-transform group-hover:translate-x-0.5">
                  <ArrowIcon />
                </span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
