/* eslint-disable @next/next/no-img-element */

const CELL = 110;
const GAP  = 8;
const COLS = 14;
const ROWS = 9;

// Curated Unsplash aerial & satellite photo IDs
const PHOTO_IDS = [
  // Coastal & ocean
  "1507525428034-b723cf961d3e",
  "1476984251899-8d7592b50113",
  "1454789548928-9efd52dc4031",
  "1505118380757-91f5f5632de0",
  "1519046904884-53103b34b206",
  "1488998527040-81c37d44b9d6",
  // Aerial cities
  "1477959858617-67f85cf4f1df",
  "1449824913935-59a10b8d2000",
  "1484291470158-b8f8d608850d",
  "1534430480872-3498386e7856",
  "1480714378408-67cf0d13bc1b",
  "1512917774080-9991f1c4c750",
  "1531804792-2ab80a730ac2",
  "1486325212027-8081e485255e",
  "1541336032412-2048a678540d",
  "1493770348161-369560ae357d",
  // Mountains & terrain
  "1469854523086-cc02fe5d8800",
  "1444723121867-7a241d7f659f",
  "1506905925346-21bda4d32df4",
  "1490730141103-6cac27aaab94",
  "1505159940484-eb2b9f2588e2",
  "1426604966848-d7adac402bbc",
  // Desert & arid
  "1439853949212-36652a89a094",
  "1494587416117-f102a3cfc87d",
  "1552083974-a9faf40efa05",
  // Forest & nature
  "1501854140801-50d01698950b",
  "1448375240586-882707db888b",
  "1513151233558-d860c5398176",
  "1416431381279-4d4b3b2add55",
  // Farmland & fields
  "1415817337860-9cdf59f7e5fe",
  "1500534314209-a25ddb2bd429",
  "1500093112814-1b6e8a8c8428",
  // Rivers & water
  "1564071489-252b89e1a0e2",
  "1416941212319-c8e9d1fb9571",
  "1455582907688-a79a47d2f22d",
  // Satellite & earth
  "1451187580459-43490279c0fa",
  "1563295958-3c1da22d7d4e",
  "1520277739336-7bf615dbe1a1",
  "1462275646964-a0e3386b89fa",
  "1486523893739-65033a5b7fbc",
  "1502741383249-278a2c0a18a3",
  "1468413253946-f18fe899f972",
];

function imgUrl(id: string): string {
  return `https://images.unsplash.com/photo-${id}?w=400&h=400&fit=crop&crop=entropy&auto=format&q=75`;
}

// Deterministic pseudo-random [0, 1)
function sr(col: number, row: number): number {
  const h = Math.sin(col * 127.1 + row * 311.7 + 1.0) * 43758.5453;
  return h - Math.floor(h);
}

function imgIdx(col: number, row: number): number {
  const h = Math.sin(col * 317.1 + row * 193.7 + 7.3) * 43758.5453;
  return Math.floor((h - Math.floor(h)) * PHOTO_IDS.length);
}

// Cells in the left-centre block are kept sparse so the hero text reads cleanly
function hasImage(col: number, row: number): boolean {
  const r = sr(col, row);
  if (row >= 1 && row <= 5 && col >= 0 && col <= 7) return r < 0.08; // text zone — nearly empty
  if (row === 0 || row >= 7) return r < 0.90;                         // top & bottom — dense
  if (col >= 8) return r < 0.88;                                       // right half — dense
  return r < 0.45;                                                      // transition zone
}

const cells = Array.from({ length: COLS * ROWS }, (_, i) => {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  return { col, row, show: hasImage(col, row), idx: imgIdx(col, row) };
});

const GRID_W = COLS * CELL + (COLS + 1) * GAP;

export function HeroSatGrid() {
  return (
    <section
      className="relative overflow-hidden bg-background"
      style={{ minHeight: "100vh" }}
    >
      {/* Circular satellite image grid */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: GAP,
          bottom: GAP,
          width: GRID_W,
          left: "50%",
          transform: "translateX(-50%)",
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`,
          gridAutoRows: `${CELL}px`,
          gap: GAP,
        }}
      >
        {cells.map(({ col, row, show, idx }) => (
          <div
            key={`${col}-${row}`}
            style={{ borderRadius: "50%", overflow: "hidden" }}
          >
            {show && (
              <img
                src={imgUrl(PHOTO_IDS[idx])}
                alt=""
                width={CELL}
                height={CELL}
                loading={row === 0 ? "eager" : "lazy"}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Left gradient so text is legible */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, var(--color-background) 32%, transparent 62%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Hero text */}
      <div
        className="container relative flex items-center"
        style={{ minHeight: "100vh", zIndex: 2, paddingTop: "var(--nav-height, 80px)" }}
      >
        <div className="flex flex-col items-start gap-6 max-w-[540px]">
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
              className="rounded-full px-5 py-2 text-sm flex items-center gap-2 transition-colors bg-mistral-black text-white hover:bg-mistral-black/80"
              href="https://mistral.ai/contact"
            >
              For consumer
            </a>
            <a
              className="rounded-full px-5 py-2 text-sm flex items-center gap-2 transition-colors bg-mistral-black text-white hover:bg-mistral-black/80"
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
