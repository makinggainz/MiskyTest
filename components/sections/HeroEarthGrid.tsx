"use client";

/* eslint-disable @next/next/no-img-element */

// ── Globe geometry ─────────────────────────────────────────────────────────────
const CELL   = 44;
const GAP    = 6;
const SPC    = CELL + GAP;       // 50px
const GLOB_R = 330;
const HALF   = Math.ceil(GLOB_R / SPC);  // 7
const COLS   = HALF * 2 + 1;    // 15
const ROWS   = HALF * 2 + 1;    // 15
// ~137 cells inside the circle

// Atlantic-facing view: Americas left, Europe/Africa right
const ROT = -15;

// ── Continent map ─────────────────────────────────────────────────────────────
const LAND_RGNS: [number, number, number, number][] = [
  [-154,  63, 12,  8],  // Alaska
  [ -98,  57, 28, 12],  // Canada (main)
  [ -70,  50, 16, 10],  // Eastern Canada
  [ -96,  40, 22, 11],  // Continental USA
  [-118,  43, 10,  9],  // Pacific Northwest
  [-102,  24, 12, 10],  // Mexico
  [ -62,   5, 14, 10],  // Venezuela / Colombia
  [ -58, -15, 14, 17],  // Brazil
  [ -65, -38, 11, 15],  // Argentina / Chile
  [   5,  51, 14, 10],  // Western Europe
  [  15,  64, 10,  8],  // Scandinavia
  [  25,  53, 14,  8],  // Eastern Europe
  [  -8,  40,  6,  8],  // Iberian Peninsula
  [  13,  24, 25, 14],  // North Africa
  [   3,   8, 15, 14],  // West Africa
  [  35,   5, 16, 16],  // East Africa
  [  23, -25, 15, 14],  // Southern Africa
  [  28,  10, 10, 10],  // Central Africa
  [  50,  57, 22, 12],  // Western Russia
  [  90,  60, 28, 12],  // Siberia
  [ 142,  62, 18, 10],  // Eastern Siberia
  [  40,  30, 14, 12],  // Middle East
  [  80,  22, 10, 14],  // India
  [ 108,  33, 20, 15],  // China / Korea
  [ 108,  12, 14, 12],  // SE Asia
  [ 138,  36,  5, 10],  // Japan
  [ 133, -25, 18, 13],  // Australia
  [ 150, -28,  8,  8],  // Eastern Australia
  [ -42,  73, 14,  9],  // Greenland
  [  47, -20,  4,  8],  // Madagascar
  [  -3,  54,  5,  5],  // UK / Ireland
];

function coastNoise(lon: number, lat: number) {
  return 0.04 * (
    Math.sin(lon * 3.7 + lat * 2.3) * 0.5 +
    Math.sin(lon * 7.1 - lat * 4.9) * 0.3 +
    Math.cos(lon * 5.3 + lat * 8.1) * 0.2
  );
}

function isLand(lon: number, lat: number): boolean {
  if (lat < -70) return true;
  for (const [cx, cy, rx, ry] of LAND_RGNS) {
    let d = lon - cx;
    if (d >  180) d -= 360;
    if (d < -180) d += 360;
    const n = coastNoise(lon * 0.05, lat * 0.05);
    if ((d / rx) ** 2 + ((lat - cy) / ry) ** 2 < (1 + n) ** 2) return true;
  }
  return false;
}

function isDesert(lon: number, lat: number): boolean {
  return (
    (lon > -8   && lon < 40  && lat > 14 && lat < 30) ||
    (lon > 35   && lon < 62  && lat > 15 && lat < 30) ||
    (lon > 75   && lon < 105 && lat > 35 && lat < 48) ||
    (lon > 113  && lon < 142 && lat > -33 && lat < -20) ||
    (lon > -120 && lon < -100 && lat > 25 && lat < 38)
  );
}

// ── Terrain types & fallback palette ─────────────────────────────────────────
// Each circle gets a solid background colour matching its terrain.
// Images are layered on top — if one fails, the colour shows through.
type Terrain = "ocean" | "land" | "desert" | "polar" | "urban";

const FALLBACK: Record<Terrain, string> = {
  ocean:  "hsl(217,72%,46%)",   // deep Atlantic blue
  land:   "hsl(140,42%,37%)",   // forest green
  desert: "hsl(34,58%,48%)",    // sandy amber
  polar:  "hsl(210,52%,86%)",   // icy pale blue
  urban:  "hsl(220,14%,46%)",   // slate gray
};

// ── Image pools — only confirmed-working Pexels IDs ───────────────────────────
// URL format Pexels CDN accepts: /photos/{id}/pexels-photo-{id}.jpeg
const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?w=400&h=400&fit=crop`;

const IMGS: Record<Terrain, string[]> = {
  ocean: [
    px(2754659), px(3654856), px(2274725), px(1645881), px(1554662),
    px(1659448), px(5915681), px(2662116), px(6643949), px(2441099),
    px(1879703), px(1437396), px(1646953), px(3408354),
    "https://images.unsplash.com/photo-1513553404607-988bf2703777?w=400&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1527515234283-d93c5f8486a0?w=400&h=400&fit=crop&auto=format",
  ],
  land: [
    px(5345029), px(9872103), px(9052726), px(2738062), px(2827793),
    px(1396122), px(1309738), px(1726745), px(8567826), px(1643409),
    "https://images.unsplash.com/photo-1622572860925-daa5e4219d53?w=400&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=400&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1559770968-53924e9b32de?w=400&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1510694853838-e4a8c978f518?w=400&h=400&fit=crop&auto=format",
  ],
  desert: [
    px(1199969), px(1451241), px(1619316), px(1131573), px(8869297),
    px(2166927), px(2166928),
    "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1547235001-d703406d3f17?w=400&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1547234935-80c7145ec969?w=400&h=400&fit=crop&auto=format",
  ],
  polar: [
    px(3225517), px(3225521), px(3225523), px(906982), px(167699),
    "https://images.unsplash.com/photo-1614630669107-f48325791b57?w=400&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1610011722905-a2d4b5fca8c0?w=400&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1553085912-c1f2f489dcf4?w=400&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1518873890627-d4b177c06e51?w=400&h=400&fit=crop&auto=format",
  ],
  urban: [
    px(1815387), px(4356144), px(1681031), px(1109354), px(327345),
    px(466685),  px(1105766),
    "https://images.unsplash.com/photo-1483653364400-eedcfb9f1f88?w=400&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1513171920216-2640b288471b?w=400&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1503642551022-c011aafb3c88?w=400&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1476385822777-70eabacbd41f?w=400&h=400&fit=crop&auto=format",
  ],
};

// ── Deterministic helpers ──────────────────────────────────────────────────────
function sr(a: number, b: number) {
  const h = Math.sin(a * 127.1 + b * 311.7 + 1.0) * 43758.5453;
  return h - Math.floor(h);
}

function pick(col: number, row: number, pool: string[]) {
  const h = Math.sin(col * 317.1 + row * 193.7 + 7.3) * 43758.5453;
  return pool[Math.floor((h - Math.floor(h)) * pool.length)];
}

function cellTerrain(col: number, row: number): Terrain | null {
  const nx = (col - HALF) * SPC / GLOB_R;
  const ny = (row - HALF) * SPC / GLOB_R;
  if (nx * nx + ny * ny > 1) return null;

  const nz  = Math.sqrt(1 - nx * nx - ny * ny);
  const lon = ((Math.atan2(nx, nz) * 180 / Math.PI + ROT) % 360 + 360) % 360 - 180;
  const lat = Math.asin(Math.max(-1, Math.min(1, -ny))) * 180 / Math.PI;

  if (Math.abs(lat) > 70) return "polar";
  if (Math.abs(lat) > 60 && sr(col * 5 + row, col) < 0.55) return "polar";
  if (isLand(lon, lat)) {
    if (isDesert(lon, lat)) return "desert";
    if (sr(col * 7 + row * 3, col + row) < 0.15) return "urban";
    return "land";
  }
  return "ocean";
}

const CELLS = Array.from({ length: COLS * ROWS }, (_, i) => {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const t   = cellTerrain(col, row);
  return {
    col,
    row,
    terrain: t,
    url: t ? pick(col, row, IMGS[t]) : null,
  };
});

const GRID_W = COLS * CELL + (COLS - 1) * GAP;
const GRID_H = ROWS * CELL + (ROWS - 1) * GAP;

// ── Component ─────────────────────────────────────────────────────────────────
export function HeroEarthGrid() {
  return (
    <section
      className="relative overflow-hidden bg-background"
      style={{ minHeight: "100vh" }}
    >
      {/* Globe */}
      <div
        aria-hidden="true"
        className="hidden lg:block"
        style={{
          position: "absolute",
          top: "50%",
          right: "3%",
          transform: "translateY(-50%)",
          width: GRID_W,
          height: GRID_H,
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`,
          gridTemplateRows: `repeat(${ROWS}, ${CELL}px)`,
          gap: `${GAP}px`,
          zIndex: 0,
        }}
      >
        {CELLS.map(({ col, row, terrain, url }) => (
          <div
            key={`${col}-${row}`}
            style={{
              borderRadius: "50%",
              overflow: "hidden",
              // Solid terrain colour is always visible — image layers on top
              background: terrain ? FALLBACK[terrain] : "transparent",
            }}
          >
            {url && (
              <img
                src={url}
                alt=""
                width={CELL}
                height={CELL}
                loading={row < 4 ? "eager" : "lazy"}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => {
                  // Hide only the img — the background colour stays visible
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Gradient — text legibility */}
      <div
        aria-hidden="true"
        className="hidden lg:block"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, var(--color-background) 35%, transparent 62%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Hero text */}
      <div
        className="container relative flex items-center"
        style={{ minHeight: "100vh", zIndex: 2, paddingTop: "var(--nav-height, 80px)" }}
      >
        <div className="flex flex-col items-start gap-6 max-w-[520px]">
          <h1 className="text-4xl sm:text-5xl lg:text-[56px]/[1.05] tracking-tight font-bold text-mistral-black">
            <span className="block">The frontier research Lab</span>
            <span className="block">building geospatial</span>
            <span className="block">reasoning for the real world.</span>
          </h1>
          <p className="text-base text-mistral-black/60">
            AI foundationally built for maps
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              className="rounded-xl px-5 py-2 text-sm flex items-center gap-2 transition-colors bg-mistral-black text-white hover:bg-mistral-black/80"
              href="https://mistral.ai/contact"
            >
              For consumer
            </a>
            <a
              className="rounded-xl px-5 py-2 text-sm flex items-center gap-2 transition-colors bg-mistral-black text-white hover:bg-mistral-black/80"
              href="http://console.mistral.ai"
            >
              For enterprise
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
