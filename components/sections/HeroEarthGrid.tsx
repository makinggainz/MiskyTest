"use client";

/* eslint-disable @next/next/no-img-element */

// ── Globe geometry ─────────────────────────────────────────────────────────────
const CELL   = 44;               // image circle diameter (px)
const GAP    = 6;                // gap between circles
const SPC    = CELL + GAP;       // = 50px grid spacing
const GLOB_R = 330;              // globe radius (px) → ~660px diameter
const HALF   = Math.ceil(GLOB_R / SPC);  // = 7
const COLS   = HALF * 2 + 1;    // = 15
const ROWS   = HALF * 2 + 1;    // = 15
// ~137 circles inside the sphere — enough resolution to read continents

// Longitude offset: -15° puts the Atlantic in the centre, showing both
// Americas on the left and Europe/Africa on the right.
const ROT = -15;

// ── Multi-ellipse continent map ────────────────────────────────────────────────
// Each entry: [lonCenter°, latCenter°, lonRadius°, latRadius°]
// More ellipses per continent = more accurate silhouette
const LAND_RGNS: [number, number, number, number][] = [
  // ── North America ──
  [-154,  63, 12,  8],   // Alaska
  [ -98,  57, 28, 12],   // Canada (main body)
  [ -70,  50, 16, 10],   // Eastern Canada / Maritimes
  [ -96,  40, 22, 11],   // Continental USA
  [-118,  43, 10,  9],   // Pacific Northwest
  [-102,  24, 12, 10],   // Mexico / Central America tip

  // ── South America ──
  [ -62,   5, 14, 10],   // Venezuela / Colombia / Guyana
  [ -58, -15, 14, 17],   // Brazil / Bolivia
  [ -65, -38, 11, 15],   // Argentina / Chile

  // ── Europe ──
  [   5,  51, 14, 10],   // Western Europe (France/Germany/UK)
  [  15,  64, 10,  8],   // Scandinavia
  [  25,  53, 14,  8],   // Eastern Europe / Poland / Baltic
  [  -8,  40,  6,  8],   // Iberian Peninsula

  // ── Africa ──
  [  13,  24, 25, 14],   // North Africa (Sahara band)
  [   3,   8, 15, 14],   // West Africa
  [  35,   5, 16, 16],   // East Africa (Ethiopia/Kenya/Tanzania)
  [  23, -25, 15, 14],   // Southern Africa
  [  28,  10, 10, 10],   // Central Africa (Congo basin)

  // ── Russia / Northern Asia ──
  [  50,  57, 22, 12],   // Western Russia / Urals
  [  90,  60, 28, 12],   // Central Siberia
  [ 142,  62, 18, 10],   // Eastern Siberia / Kamchatka

  // ── Middle East / South Asia ──
  [  40,  30, 14, 12],   // Arabian Peninsula / Middle East
  [  80,  22, 10, 14],   // India subcontinent

  // ── East / Southeast Asia ──
  [ 108,  33, 20, 15],   // China / Korea
  [ 108,  12, 14, 12],   // Southeast Asia (mainland + large islands)
  [ 122,  25,  8,  8],   // Taiwan / Philippines area
  [ 138,  36,  5, 10],   // Japan

  // ── Oceania ──
  [ 133, -25, 18, 13],   // Australia (main)
  [ 150, -28,  8,  8],   // Eastern Australia / Queensland

  // ── Islands / other ──
  [ -42,  73, 14,  9],   // Greenland
  [  47, -20,  4,  8],   // Madagascar
  [  -3,  54,  5,  5],   // UK / Ireland
];

// Low noise (0.04) keeps continent edges clean at this resolution
function coastNoise(lon: number, lat: number) {
  return 0.04 * (
    Math.sin(lon * 3.7 + lat * 2.3) * 0.5 +
    Math.sin(lon * 7.1 - lat * 4.9) * 0.3 +
    Math.cos(lon * 5.3 + lat * 8.1) * 0.2
  );
}

function isLand(lon: number, lat: number): boolean {
  if (lat < -70) return true; // Antarctica
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
    (lon > -8   && lon < 40  && lat > 14 && lat < 30) || // Sahara
    (lon > 35   && lon < 62  && lat > 15 && lat < 30) || // Arabian Desert
    (lon > 75   && lon < 105 && lat > 35 && lat < 48) || // Gobi
    (lon > 113  && lon < 142 && lat > -33 && lat < -20)|| // Australian Outback
    (lon > -120 && lon < -100 && lat > 25 && lat < 38)    // US Southwest / Sonoran
  );
}

// ── Image pools — 25-30 URLs each, colour-matched to terrain ──────────────────
// Using Pexels CDN (explicit hotlinking policy) + some Unsplash
const fmt = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop`;

const IMGS = {
  ocean: [
    fmt(2754659), fmt(3654856), fmt(2274725), fmt(1645881), fmt(1554662),
    fmt(1659448), fmt(5915681), fmt(2662116), fmt(1580849), fmt(6643949),
    fmt(1879703), fmt(2441099), fmt(5343682), fmt(6174476), fmt(1437396),
    fmt(3302188), fmt(1646953), fmt(2166927), fmt(1519046904),
    "https://images.unsplash.com/photo-1513553404607-988bf2703777?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1527515234283-d93c5f8486a0?w=300&h=300&fit=crop",
  ],
  land: [
    fmt(5345029), fmt(9872103), fmt(9052726), fmt(2738062), fmt(2902939),
    fmt(4361099), fmt(2827793), fmt(3974028), fmt(5575956), fmt(6099028),
    fmt(1396122), fmt(1309738), fmt(1726745), fmt(4357571), fmt(8567826),
    fmt(1643409), fmt(2260819), fmt(3537982), fmt(4577793), fmt(1629236),
    "https://images.unsplash.com/photo-1622572860925-daa5e4219d53?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1559770968-53924e9b32de?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1510694853838-e4a8c978f518?w=300&h=300&fit=crop",
  ],
  desert: [
    fmt(1199969), fmt(1451241), fmt(1619316), fmt(1131573), fmt(8869297),
    fmt(1741696), fmt(2537978), fmt(1021703), fmt(1128318), fmt(3225527),
    fmt(1450353), fmt(1329545), fmt(1707215), fmt(2166928),
    "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1547235001-d703406d3f17?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1547234935-80c7145ec969?w=300&h=300&fit=crop",
  ],
  polar: [
    fmt(3225517), fmt(3225521), fmt(3225523), fmt(3822834), fmt(4153870),
    fmt(1816958), fmt(906982),  fmt(1366942), fmt(167699),  fmt(1366919),
    "https://images.unsplash.com/photo-1614630669107-f48325791b57?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1610011722905-a2d4b5fca8c0?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1553085912-c1f2f489dcf4?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1518873890627-d4b177c06e51?w=300&h=300&fit=crop",
  ],
  urban: [
    fmt(1815387), fmt(4356144), fmt(1681031), fmt(6048400), fmt(6414948),
    fmt(7740397), fmt(1109354), fmt(1454912), fmt(1816358), fmt(2846217),
    fmt(3214982), fmt(3862619), fmt(4127440), fmt(5012281), fmt(6567607),
    fmt(8133108), fmt(327345),  fmt(466685),  fmt(1105766),
    "https://images.unsplash.com/photo-1483653364400-eedcfb9f1f88?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1513171920216-2640b288471b?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1503642551022-c011aafb3c88?w=300&h=300&fit=crop",
  ],
} as const;

type Terrain = keyof typeof IMGS;

// ── Deterministic helpers ──────────────────────────────────────────────────────
function sr(a: number, b: number) {
  const h = Math.sin(a * 127.1 + b * 311.7 + 1.0) * 43758.5453;
  return h - Math.floor(h);
}

function pick(col: number, row: number, pool: readonly string[]) {
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

// Pre-compute once at module load — deterministic, SSR-safe
const CELLS = Array.from({ length: COLS * ROWS }, (_, i) => {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const t   = cellTerrain(col, row);
  return { col, row, url: t ? pick(col, row, IMGS[t]) : null };
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
      {/* Globe — right-anchored, vertically centred */}
      <div
        aria-hidden="true"
        className="hidden lg:grid"
        style={{
          position: "absolute",
          top: "50%",
          right: "3%",
          transform: "translateY(-50%)",
          width: GRID_W,
          height: GRID_H,
          gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`,
          gridTemplateRows: `repeat(${ROWS}, ${CELL}px)`,
          gap: GAP,
          zIndex: 0,
        }}
      >
        {CELLS.map(({ col, row, url }) => (
          <div key={`${col}-${row}`} style={{ borderRadius: "50%", overflow: "hidden" }}>
            {url && (
              <img
                src={url}
                alt=""
                width={CELL}
                height={CELL}
                loading={row < 4 ? "eager" : "lazy"}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => {
                  const el = e.currentTarget.closest("div") as HTMLElement | null;
                  if (el) el.style.opacity = "0";
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Gradient keeps text readable */}
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
