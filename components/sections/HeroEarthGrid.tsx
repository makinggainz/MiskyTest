"use client";

/* eslint-disable @next/next/no-img-element */

// ── Globe geometry ─────────────────────────────────────────────────────────────
const CELL   = 60;              // image circle diameter (px)
const GAP    = 8;               // gap between circles (px)
const SPC    = CELL + GAP;      // grid spacing = 68px
const GLOB_R = 295;             // globe radius (px)
const HALF   = Math.ceil(GLOB_R / SPC); // steps from centre = 5
const COLS   = HALF * 2 + 1;   // = 11
const ROWS   = HALF * 2 + 1;   // = 11
const ROT    = 15;              // longitude rotation (°) — puts Europe/Africa front-and-centre

// ── Continent map ─────────────────────────────────────────────────────────────
const LAND_RGNS: [number, number, number, number][] = [
  [-100,  52, 43, 26],  // North America
  [ -58, -12, 22, 32],  // South America
  [  25,   5, 28, 40],  // Africa
  [  15,  54, 22, 18],  // Europe
  [  95,  47, 55, 30],  // Asia
  [ 135, -28, 18, 13],  // Australia
  [ -44,  72, 18,  8],  // Greenland
];

function coastNoise(lon: number, lat: number) {
  return 0.10 * (
    Math.sin(lon * 3.7 + lat * 2.3) * 0.5 +
    Math.sin(lon * 7.1 - lat * 4.9) * 0.3 +
    Math.cos(lon * 5.3 + lat * 8.1) * 0.2
  );
}

function isLand(lon: number, lat: number): boolean {
  if (lat < -62) return true;
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
    (lon > -15  && lon < 55  && lat > 13 && lat < 32)  || // Sahara / Arabia
    (lon >  55  && lon < 75  && lat > 15 && lat < 35)  || // Arabian Peninsula
    (lon > 115  && lon < 145 && lat > -30 && lat < -18)|| // Australian outback
    (lon > -120 && lon < -95 && lat > 25 && lat < 38)     // US Southwest
  );
}

// ── Image pools — colour-matched to terrain ───────────────────────────────────
const IMGS = {
  ocean: [
    "https://images.pexels.com/photos/2754659/pexels-photo-2754659.jpeg?w=400&h=400&fit=crop",
    "https://images.pexels.com/photos/3654856/pexels-photo-3654856.jpeg?w=400&h=400&fit=crop",
    "https://images.pexels.com/photos/2274725/pexels-photo-2274725.jpeg?w=400&h=400&fit=crop",
    "https://images.pexels.com/photos/1645881/pexels-photo-1645881.jpeg?w=400&h=400&fit=crop",
    "https://images.pexels.com/photos/1554662/pexels-photo-1554662.jpeg?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1513553404607-988bf2703777?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1527515234283-d93c5f8486a0?w=400&h=400&fit=crop",
  ],
  land: [
    "https://images.pexels.com/photos/5345029/pexels-photo-5345029.jpeg?w=400&h=400&fit=crop",
    "https://images.pexels.com/photos/9872103/pexels-photo-9872103.jpeg?w=400&h=400&fit=crop",
    "https://images.pexels.com/photos/9052726/pexels-photo-9052726.jpeg?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1622572860925-daa5e4219d53?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1559770968-53924e9b32de?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1510694853838-e4a8c978f518?w=400&h=400&fit=crop",
  ],
  desert: [
    "https://images.pexels.com/photos/1199969/pexels-photo-1199969.jpeg?w=400&h=400&fit=crop",
    "https://images.pexels.com/photos/1451241/pexels-photo-1451241.jpeg?w=400&h=400&fit=crop",
    "https://images.pexels.com/photos/1619316/pexels-photo-1619316.jpeg?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1547235001-d703406d3f17?w=400&h=400&fit=crop",
  ],
  polar: [
    "https://images.unsplash.com/photo-1614630669107-f48325791b57?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1610011722905-a2d4b5fca8c0?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1553085912-c1f2f489dcf4?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1518873890627-d4b177c06e51?w=400&h=400&fit=crop",
  ],
  urban: [
    "https://images.pexels.com/photos/1815387/pexels-photo-1815387.jpeg?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1483653364400-eedcfb9f1f88?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1513171920216-2640b288471b?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1503642551022-c011aafb3c88?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1476385822777-70eabacbd41f?w=400&h=400&fit=crop",
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

function terrain(col: number, row: number): Terrain | null {
  const nx = (col - HALF) * SPC / GLOB_R;
  const ny = (row - HALF) * SPC / GLOB_R;
  if (nx * nx + ny * ny > 1) return null;

  const nz  = Math.sqrt(1 - nx * nx - ny * ny);
  const lon = ((Math.atan2(nx, nz) * 180 / Math.PI + ROT) % 360 + 360) % 360 - 180;
  const lat = Math.asin(Math.max(-1, Math.min(1, -ny))) * 180 / Math.PI;

  if (Math.abs(lat) > 62) return "polar";
  if (isLand(lon, lat)) {
    if (isDesert(lon, lat)) return "desert";
    if (sr(col * 7 + row * 3, col + row) < 0.18) return "urban";
    return "land";
  }
  return "ocean";
}

// Pre-computed at module load — deterministic, SSR-safe
const CELLS = Array.from({ length: COLS * ROWS }, (_, i) => {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const t   = terrain(col, row);
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
      {/* Globe — hidden on small screens, right-anchored on lg+ */}
      <div
        aria-hidden="true"
        className="hidden lg:block"
        style={{
          position: "absolute",
          top: "50%",
          right: "4%",
          transform: "translateY(-50%)",
          width: GRID_W,
          height: GRID_H,
          display: "grid",
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
                loading={row < 3 ? "eager" : "lazy"}
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

      {/* Left-to-right gradient so hero text is always legible */}
      <div
        aria-hidden="true"
        className="hidden lg:block"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, var(--color-background) 38%, transparent 65%)",
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
