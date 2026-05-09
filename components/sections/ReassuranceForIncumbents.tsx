import { MapShape } from "@/components/MapShape";

// Reassurance section per landing-page-spec §22 + §38.5 — final
// objection-handler for the GIS practitioner who's spent a decade in
// QGIS/ArcGIS and worries Columbus wants to replace their toolbox.

const INTEGRATIONS = [
  "ArcGIS Pro",
  "QGIS",
  "Esri",
  "FME",
  "GeoServer",
  "Mapbox",
  "CARTO",
  "Snowflake",
] as const;

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

export function ReassuranceForIncumbents() {
  return (
    <section className="relative py-10 md:py-[100px]">
      <MapShape placement="top-right" />
      <div className="container bg-grid-pattern relative z-10">

        <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-center" data-reveal>

          {/* Left: text + CTA */}
          <div className="w-full lg:flex-1 lg:max-w-[480px] flex flex-col gap-6">
            <span className="text-xs uppercase tracking-widest font-semibold text-mistral-black/45">
              For the GIS analyst
            </span>
            <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-mistral-black">
              Joins your stack. Doesn&rsquo;t replace it.
            </h2>
            <p className="text-base md:text-lg text-mistral-black/65 leading-relaxed">
              You&rsquo;ve spent years inside QGIS, ArcGIS, and your data pipelines. Columbus reads from them and writes back to them — your toolbox just got an analyst that never sleeps.
            </p>
            <p className="text-sm text-mistral-black/55 leading-relaxed">
              Outputs export as GeoJSON, Shapefile, GeoPackage, and KML. Custom layers stay editable in your existing GIS of record.
            </p>
            <div className="pt-2">
              <a
                href="#"
                className="group rounded-[7px] inline-flex items-center gap-2 px-5 py-2.5 bg-mistral-black text-white text-sm font-medium transition-colors hover:bg-mistral-black/80"
              >
                For practitioners
                <span className="text-mistral-orange transition-transform group-hover:translate-x-0.5">
                  <ArrowIcon />
                </span>
              </a>
            </div>
          </div>

          {/* Right: integrations grid */}
          <div className="w-full lg:flex-1" data-reveal data-reveal-delay="1">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {INTEGRATIONS.map((tool) => (
                <div
                  key={tool}
                  className="border border-[#C7D7F8] rounded-[10px] bg-background px-5 py-4 flex items-center gap-3"
                >
                  <span className="size-2 rounded-full bg-mistral-orange shrink-0" aria-hidden="true" />
                  <span className="text-sm font-medium text-mistral-black">{tool}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
