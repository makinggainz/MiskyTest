"use client";

import { useEffect, useRef } from "react";

// ── constants ────────────────────────────────────────────────────────────────
const TAU = Math.PI * 2;
const SPOKES = 14;
const RING_FRACS = [0.20, 0.38, 0.56, 0.76];
const CITY_CX_FRAC = 0.64;
const CITY_CY_FRAC = 0.50;
const CITY_R_FRAC = 0.38;
const CAR_W = 9;
const CAR_H = 4;
const BASE_SPEED_PX_S = 52;

// Page background #F1F5FE
const PAGE_BG = "rgba(241,245,254,";

function hash(n: number): number {
  return Math.abs(Math.sin(n * 127.1 + 311.7) * 43758.5453) % 1;
}

// ── zone helpers ─────────────────────────────────────────────────────────────
type ZoneType = "park" | "commercial" | "urban";
function getZoneType(depth: number, spoke: number): ZoneType {
  const v = hash(depth * 17 + spoke * 7 + 3);
  if (v < 0.11) return "park";
  if (v < 0.20) return "commercial";
  return "urban";
}

// depth 0 = outermost zone, 3 = innermost (just above center)
function wallColor(depth: number): string {
  return ["#9898b8", "#8888b0", "#7878a8", "#6868a0"][Math.min(depth, 3)];
}

function courtyardColor(depth: number): string {
  if (depth <= 1) return "#a8c888"; // greener in outer rings
  return "#9898b0";                 // grey interior in dense core
}

// ── static scene ─────────────────────────────────────────────────────────────
function buildStaticScene(
  w: number, h: number,
  cx: number, cy: number,
  r: number, rings: number[],
): HTMLCanvasElement {
  const off = document.createElement("canvas");
  off.width = w;
  off.height = h;
  const oc = off.getContext("2d")!;

  // 1. Countryside base — light green
  oc.fillStyle = "#c4d4a0";
  oc.fillRect(0, 0, w, h);

  // 2. Farm fields (outside city, scattered rectangles)
  const farmPalette = ["#c9d896", "#bfd890", "#d5c98a", "#dce0a2", "#b8cc80", "#d4d4a0", "#a8c078"];
  for (let i = 0; i < 100; i++) {
    const angle = hash(i * 3.1 + 1) * TAU;
    const dist = r * (1.06 + hash(i * 7.3 + 2) * 1.6);
    const fx = cx + Math.cos(angle) * dist;
    const fy = cy + Math.sin(angle) * dist;
    if (fx < -180 || fx > w + 180 || fy < -180 || fy > h + 180) continue;
    const fw = 50 + hash(i * 5.1 + 3) * 130;
    const fh = 32 + hash(i * 11.3 + 4) * 90;
    const rot = hash(i * 13.7 + 5) * Math.PI;
    oc.save();
    oc.translate(fx, fy);
    oc.rotate(rot);
    oc.fillStyle = farmPalette[Math.floor(hash(i * 17.1 + 6) * farmPalette.length)];
    oc.fillRect(-fw / 2, -fh / 2, fw, fh);
    oc.restore();
  }

  // 3. Tree dots in countryside
  oc.fillStyle = "#6aa860";
  for (let i = 0; i < 220; i++) {
    const angle = hash(i * 4.7 + 99) * TAU;
    const dist = r * (1.04 + hash(i * 8.1 + 12) * 1.55);
    const tx = cx + Math.cos(angle) * dist;
    const ty = cy + Math.sin(angle) * dist;
    if (tx < 0 || tx > w || ty < 0 || ty > h) continue;
    const tr = 3 + hash(i * 9.3 + 33) * 5;
    oc.beginPath();
    oc.arc(tx, ty, tr, 0, TAU);
    oc.fill();
  }

  // 4. City zone sectors — building perimeter + courtyard inset
  const allR = [...rings, r];
  const spokeStep = TAU / SPOKES;
  const INSET = 0.13;

  for (let ri = allR.length - 1; ri >= 1; ri--) {
    const outerRad = allR[ri];
    const innerRad = allR[ri - 1];
    const depth = allR.length - 1 - ri; // 0=outermost zone
    const arcSpan = spokeStep;
    const radRange = outerRad - innerRad;

    for (let si = 0; si < SPOKES; si++) {
      const a1 = si * spokeStep - Math.PI / 2;
      const a2 = a1 + arcSpan;
      const ztype = getZoneType(depth, si);

      const fillColor =
        ztype === "park" ? "#78b870" :
        ztype === "commercial" ? "#c8b870" :
        wallColor(depth);

      // Full sector (building walls / zone base)
      oc.beginPath();
      oc.arc(cx, cy, outerRad, a1, a2);
      oc.arc(cx, cy, innerRad, a2, a1, true);
      oc.closePath();
      oc.fillStyle = fillColor;
      oc.fill();

      // Inset courtyard (only if sector is large enough)
      const a1i = a1 + INSET * arcSpan;
      const a2i = a2 - INSET * arcSpan;
      const iri = innerRad + INSET * radRange;
      const ori = outerRad - INSET * radRange;
      if (a2i > a1i + 0.01 && ori > iri + 4) {
        const ctColor =
          ztype === "park" ? "#8ccc80" :
          ztype === "commercial" ? "#d4c890" :
          courtyardColor(depth);

        oc.beginPath();
        oc.arc(cx, cy, ori, a1i, a2i);
        oc.arc(cx, cy, iri, a2i, a1i, true);
        oc.closePath();
        oc.fillStyle = ctColor;
        oc.fill();

        // Tree dots in park courtyards
        if (ztype === "park") {
          oc.fillStyle = "#4a9040";
          const tCount = 5 + Math.floor(hash(si * 31 + ri * 7 + 22) * 5);
          for (let ti = 0; ti < tCount; ti++) {
            const ta = a1i + (0.1 + hash(ti * 7 + si * 31 + ri * 11) * 0.8) * (a2i - a1i);
            const tr = iri + (0.15 + hash(ti * 11 + si * 37 + ri * 13) * 0.7) * (ori - iri);
            oc.beginPath();
            oc.arc(cx + Math.cos(ta) * tr, cy + Math.sin(ta) * tr, 3 + hash(ti * 17 + si * 43) * 4, 0, TAU);
            oc.fill();
          }
        }
      }
    }
  }

  // 5. City center circle (dense core)
  oc.beginPath();
  oc.arc(cx, cy, rings[0], 0, TAU);
  oc.fillStyle = "#5858a0";
  oc.fill();
  // small courtyard in center
  oc.beginPath();
  oc.arc(cx, cy, rings[0] * 0.55, 0, TAU);
  oc.fillStyle = "#9898b0";
  oc.fill();

  // 6. River — drawn after city zones so it cuts through
  oc.save();
  oc.strokeStyle = "#5090c0";
  oc.lineWidth = 15;
  oc.lineCap = "round";
  oc.lineJoin = "round";
  oc.beginPath();
  oc.moveTo(w * 0.02, h * 0.16);
  oc.bezierCurveTo(
    cx - r * 0.5, cy - r * 0.08,
    cx - r * 0.08, cy + r * 0.56,
    w * 0.98, h * 0.96,
  );
  oc.stroke();
  // river shimmer highlight
  oc.strokeStyle = "rgba(160,210,250,0.4)";
  oc.lineWidth = 5;
  oc.beginPath();
  oc.moveTo(w * 0.02, h * 0.16);
  oc.bezierCurveTo(
    cx - r * 0.5, cy - r * 0.08,
    cx - r * 0.08, cy + r * 0.56,
    w * 0.98, h * 0.96,
  );
  oc.stroke();
  oc.restore();

  // 7. Extend radial spokes to canvas edges (countryside roads, thin)
  for (let si = 0; si < SPOKES; si++) {
    const a = si * spokeStep - Math.PI / 2;
    const edgeX = cx + Math.cos(a) * Math.max(w, h) * 1.5;
    const edgeY = cy + Math.sin(a) * Math.max(w, h) * 1.5;
    oc.beginPath();
    oc.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    oc.lineTo(edgeX, edgeY);
    oc.strokeStyle = "rgba(255,255,255,0.60)";
    oc.lineWidth = 2;
    oc.stroke();
  }

  // 8. Ring roads — white
  for (const rr of rings) {
    oc.beginPath();
    oc.arc(cx, cy, rr, 0, TAU);
    oc.strokeStyle = "#f8f8f4";
    oc.lineWidth = 5;
    oc.stroke();
  }
  // Outer city boundary ring
  oc.beginPath();
  oc.arc(cx, cy, r, 0, TAU);
  oc.strokeStyle = "#f8f8f4";
  oc.lineWidth = 4;
  oc.stroke();

  // 9. Radial spokes — white
  for (let si = 0; si < SPOKES; si++) {
    const a = si * spokeStep - Math.PI / 2;
    oc.beginPath();
    oc.moveTo(cx, cy);
    oc.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    oc.strokeStyle = "#f8f8f4";
    oc.lineWidth = 4;
    oc.stroke();
  }

  // 10. Cloud blobs at edges (blurred white)
  oc.save();
  oc.filter = "blur(38px)";
  oc.fillStyle = "rgba(255,255,255,0.72)";
  const clouds = [
    { x: 0,       y: 0       },
    { x: w,       y: 0       },
    { x: 0,       y: h       },
    { x: w,       y: h       },
    { x: w * 0.3, y: 0       },
    { x: w * 0.7, y: 0       },
    { x: w * 0.15, y: h * 0.5 },
    { x: w * 0.85, y: h * 0.4 },
    { x: 0,       y: h * 0.6  },
    { x: w,       y: h * 0.7  },
  ];
  for (const { x, y } of clouds) {
    oc.beginPath();
    oc.ellipse(x, y, 130 + hash(x + y) * 70, 90 + hash(x * 2 + y) * 50, hash(x + y * 2) * Math.PI, 0, TAU);
    oc.fill();
  }
  oc.restore();

  // 11. Soft radial vignette to page background
  const vig = oc.createRadialGradient(cx, cy, r * 0.5, cx, cy, Math.max(w, h) * 0.76);
  vig.addColorStop(0, PAGE_BG + "0)");
  vig.addColorStop(1, PAGE_BG + "0.82)");
  oc.fillStyle = vig;
  oc.fillRect(0, 0, w, h);

  // 12. Left-side gradient for text legibility
  const lg = oc.createLinearGradient(0, 0, w * 0.56, 0);
  lg.addColorStop(0, PAGE_BG + "0.96)");
  lg.addColorStop(0.52, PAGE_BG + "0.40)");
  lg.addColorStop(1, PAGE_BG + "0)");
  oc.fillStyle = lg;
  oc.fillRect(0, 0, w, h);

  return off;
}

// ── cars ──────────────────────────────────────────────────────────────────────
interface Car {
  type: "ring" | "radial";
  idx: number;
  progress: number;
  speedPerSec: number;
  dir: 1 | -1;
  lane: 0 | 1;
  color: string;
}

function buildCars(rings: number[]): Car[] {
  const palette = ["#e84a4a", "#ffd93d", "#69c76c", "#4d8cff", "#f8f8f8", "#ff8c42", "#e04fd8", "#56c9e8"];
  const cars: Car[] = [];

  for (let ri = 0; ri < rings.length; ri++) {
    const circ = TAU * rings[ri];
    const baseSpd = BASE_SPEED_PX_S / circ;
    const count = 8 + ri * 3;
    for (let i = 0; i < count; i++) {
      const s = ri * 1000 + i * 37;
      cars.push({
        type: "ring", idx: ri,
        progress: hash(s),
        speedPerSec: baseSpd * (0.82 + hash(s + 1) * 0.38),
        dir: hash(s + 2) > 0.5 ? 1 : -1,
        lane: i % 2 === 0 ? 0 : 1,
        color: palette[Math.floor(hash(s + 3) * palette.length)],
      });
    }
  }

  for (let si = 0; si < SPOKES; si++) {
    const count = 2 + (hash(si * 31 + 7) > 0.55 ? 1 : 0);
    for (let i = 0; i < count; i++) {
      const s = 5000 + si * 100 + i * 17;
      cars.push({
        type: "radial", idx: si,
        progress: hash(s),
        speedPerSec: 0.07 + hash(s + 1) * 0.06,
        dir: i % 2 === 0 ? 1 : -1,
        lane: i % 2 === 0 ? 0 : 1,
        color: palette[Math.floor(hash(s + 3) * palette.length)],
      });
    }
  }

  return cars;
}

// ── scene state ───────────────────────────────────────────────────────────────
interface Scene { w: number; h: number; cx: number; cy: number; r: number; rings: number[] }

export function HeroCityCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const staticRef = useRef<HTMLCanvasElement | null>(null);
  const carsRef = useRef<Car[]>([]);
  const sceneRef = useRef<Scene>({ w: 0, h: 0, cx: 0, cy: 0, r: 0, rings: [] });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    function drawCars() {
      const { cx, cy, r, rings } = sceneRef.current;
      if (!rings.length) return;
      const spokeStep = TAU / SPOKES;
      const LANE = 3.5;
      for (const car of carsRef.current) {
        let x: number, y: number, heading: number;
        const ls = car.lane === 0 ? -1 : 1;
        if (car.type === "ring") {
          const rr = rings[car.idx];
          const angle = car.progress * TAU * car.dir;
          x = cx + Math.cos(angle) * rr;
          y = cy + Math.sin(angle) * rr;
          heading = angle + (car.dir > 0 ? Math.PI / 2 : -Math.PI / 2);
          x += Math.cos(angle) * ls * LANE;
          y += Math.sin(angle) * ls * LANE;
        } else {
          const a = car.idx * spokeStep - Math.PI / 2;
          const t = car.dir === 1 ? car.progress : 1 - car.progress;
          x = cx + Math.cos(a) * r * t;
          y = cy + Math.sin(a) * r * t;
          heading = car.dir === 1 ? a : a + Math.PI;
          const perp = a + Math.PI / 2;
          x += Math.cos(perp) * ls * LANE;
          y += Math.sin(perp) * ls * LANE;
        }
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(heading);
        ctx.fillStyle = car.color;
        ctx.fillRect(-CAR_W / 2, -CAR_H / 2, CAR_W, CAR_H);
        ctx.restore();
      }
    }

    function init() {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      if (w === 0 || h === 0) return;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cx = w * CITY_CX_FRAC;
      const cy = h * CITY_CY_FRAC;
      const cityR = Math.min(w, h) * CITY_R_FRAC;
      const rings = RING_FRACS.map((f) => f * cityR);
      sceneRef.current = { w, h, cx, cy, r: cityR, rings };
      staticRef.current = buildStaticScene(w, h, cx, cy, cityR, rings);
      carsRef.current = buildCars(rings);
    }

    let lastNow = -1;
    function loop(now: number) {
      const dt = lastNow < 0 ? 0 : Math.min((now - lastNow) / 1000, 0.05);
      lastNow = now;
      const { w, h } = sceneRef.current;
      ctx.clearRect(0, 0, w, h);
      if (staticRef.current) ctx.drawImage(staticRef.current, 0, 0);
      for (const car of carsRef.current) {
        car.progress += car.speedPerSec * dt;
        if (car.progress >= 1) car.progress -= 1;
      }
      drawCars();
      rafRef.current = requestAnimationFrame(loop);
    }

    init();
    const ro = new ResizeObserver(init);
    ro.observe(canvas);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
      }}
      aria-hidden="true"
    />
  );
}
