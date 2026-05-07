"use client";

import { useEffect, useRef } from "react";

const TAU = Math.PI * 2;

function hash(n: number): number {
  return Math.abs(Math.sin(n * 127.1 + 311.7) * 43758.5453) % 1;
}

// ── Madrid street structure ───────────────────────────────────────────────────
// Bearings from north, clockwise — clustered near the 8 compass points like
// Madrid's real arterial layout (N, NE, E, SE, S, SW, W, NW corridors)
const SPOKE_DEG = [
  0, 12, 24,          // N cluster
  42, 55,             // NE
  75, 90, 102,        // E cluster
  118, 134,           // SE
  154, 170, 184,      // S cluster
  207, 224,           // SW
  244, 262, 278,      // W cluster
  300, 322,           // NW
];
// Convert to canvas radians [0, 2π), sorted ascending
const SPOKE_ANGLES = SPOKE_DEG
  .map((d) => ((d - 90 + 360) % 360) * (Math.PI / 180))
  .sort((a, b) => a - b);

// 8 ring roads at non-uniform radii — denser near center (like Madrid's M-10/M-20/M-30/M-40)
const RING_FRACS = [0.09, 0.18, 0.28, 0.39, 0.51, 0.63, 0.76, 0.90];
const CITY_R_FRAC = 0.40;
const CITY_CX_FRAC = 0.64;
const CITY_CY_FRAC = 0.50;

// ── cars ──────────────────────────────────────────────────────────────────────
const CAR_COLORS = ["#e84a4a", "#ffd93d", "#69c76c", "#4d8cff", "#f8f8f8", "#ff8c42"];
const CAR_W = 8;
const CAR_H = 4;
const BASE_SPEED_PX_S = 52;

interface Car {
  type: "ring" | "spoke";
  idx: number;
  progress: number;
  speedPerSec: number;
  dir: 1 | -1;
  lane: 0 | 1;
  color: string;
}

function buildCars(rings: number[]): Car[] {
  const cars: Car[] = [];
  for (let ri = 0; ri < rings.length; ri++) {
    const base = BASE_SPEED_PX_S / (TAU * rings[ri]);
    const count = 6 + ri * 2;
    for (let i = 0; i < count; i++) {
      const s = ri * 1000 + i * 37;
      cars.push({
        type: "ring", idx: ri,
        progress: hash(s),
        speedPerSec: base * (0.8 + hash(s + 1) * 0.4),
        dir: hash(s + 2) > 0.5 ? 1 : -1,
        lane: i % 2 === 0 ? 0 : 1,
        color: CAR_COLORS[Math.floor(hash(s + 3) * CAR_COLORS.length)],
      });
    }
  }
  for (let si = 0; si < SPOKE_ANGLES.length; si++) {
    const isMajor = si % 3 === 0;
    const count = isMajor ? 3 : 2;
    for (let i = 0; i < count; i++) {
      const s = 5000 + si * 100 + i * 17;
      cars.push({
        type: "spoke", idx: si,
        progress: hash(s),
        speedPerSec: 0.06 + hash(s + 1) * 0.06,
        dir: i % 2 === 0 ? 1 : -1,
        lane: i % 2 === 0 ? 0 : 1,
        color: CAR_COLORS[Math.floor(hash(s + 3) * CAR_COLORS.length)],
      });
    }
  }
  return cars;
}

// ── static scene ─────────────────────────────────────────────────────────────
function buildStaticScene(
  w: number, h: number,
  cx: number, cy: number,
  r: number, rings: number[],
): HTMLCanvasElement {
  const off = document.createElement("canvas");
  off.width = w; off.height = h;
  const oc = off.getContext("2d")!;

  const ns = SPOKE_ANGLES.length;
  const far = Math.hypot(w, h);

  oc.strokeStyle = "#ffffff";
  oc.lineCap = "round";
  oc.lineJoin = "round";

  // 1. Faint spoke extensions into countryside
  oc.globalAlpha = 0.25;
  oc.lineWidth = 0.7;
  for (let si = 0; si < ns; si++) {
    const a = SPOKE_ANGLES[si];
    oc.beginPath();
    oc.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    oc.lineTo(cx + Math.cos(a) * far, cy + Math.sin(a) * far);
    oc.stroke();
  }

  // 2. Secondary connecting arc-streets between adjacent spokes
  //    These simulate the cross-streets within city blocks.
  //    Drawn at midpoints between ring levels; denser toward center.
  for (let ri = 0; ri < rings.length - 1; ri++) {
    const midR = (rings[ri] + rings[ri + 1]) * 0.5;
    const isInner = ri < 4;
    const probDraw = isInner ? 1.0 : 0.55;
    oc.lineWidth = isInner ? 0.65 : 0.50;
    oc.globalAlpha = isInner ? 0.80 : 0.55;
    for (let si = 0; si < ns; si++) {
      if (!isInner && hash(ri * 97 + si * 31 + 7) > probDraw) continue;
      const a1 = SPOKE_ANGLES[si];
      const a2 = si + 1 < ns ? SPOKE_ANGLES[si + 1] : SPOKE_ANGLES[0] + TAU;
      oc.beginPath();
      oc.arc(cx, cy, midR, a1, a2);
      oc.stroke();
    }
  }

  // 3. Irregular short streets in historic core (innermost zone)
  //    Mimics Madrid's winding medieval street pattern near Sol/Austrias
  oc.lineWidth = 0.55;
  oc.globalAlpha = 0.70;
  const coreR = rings[2];
  for (let i = 0; i < 40; i++) {
    const angle = hash(i * 37 + 11) * TAU;
    const dist = hash(i * 41 + 13) * coreR * 0.88;
    const len = coreR * (0.06 + hash(i * 47 + 17) * 0.14);
    const dir = hash(i * 53 + 19) * TAU;
    oc.beginPath();
    oc.moveTo(cx + Math.cos(angle) * dist, cy + Math.sin(angle) * dist);
    oc.lineTo(
      cx + Math.cos(angle) * dist + Math.cos(dir) * len,
      cy + Math.sin(angle) * dist + Math.sin(dir) * len,
    );
    oc.stroke();
  }

  // 4. Gran Vía analog — prominent diagonal cutting through upper city
  oc.lineWidth = 2.0;
  oc.globalAlpha = 0.92;
  oc.beginPath();
  oc.moveTo(cx - r * 0.98, cy - r * 0.08);
  oc.lineTo(cx + r * 0.95, cy - r * 0.20);
  oc.stroke();

  // 5. Castellana / Paseo del Prado analog — N-S boulevard, slightly E of center
  oc.lineWidth = 2.0;
  oc.globalAlpha = 0.92;
  oc.beginPath();
  oc.moveTo(cx + r * 0.13, cy - r * 1.05);
  oc.lineTo(cx + r * 0.09, cy + r * 1.05);
  oc.stroke();

  // 6. Ensanche secondary grid overlay in NE quadrant (Salamanca district analog)
  //    Slightly rotated rectangular streets in the NE sector
  oc.lineWidth = 0.55;
  oc.globalAlpha = 0.55;
  const gridAngle = 0.42; // radians tilt (approx Salamanca grid angle)
  const gridOrigin = { x: cx + r * 0.35, y: cy - r * 0.35 };
  const gridSpacing = r * 0.09;
  for (let i = -4; i <= 4; i++) {
    // Horizontal grid lines
    oc.beginPath();
    oc.moveTo(gridOrigin.x - r * 0.5, gridOrigin.y + i * gridSpacing - r * 0.02);
    oc.lineTo(gridOrigin.x + r * 0.3, gridOrigin.y + i * gridSpacing + r * 0.02);
    oc.stroke();
    // Vertical grid lines
    oc.beginPath();
    oc.moveTo(gridOrigin.x + i * gridSpacing + r * 0.01, gridOrigin.y - r * 0.4);
    oc.lineTo(gridOrigin.x + i * gridSpacing - r * 0.01, gridOrigin.y + r * 0.4);
    oc.stroke();
  }
  oc.globalAlpha = 1;

  // 7. Ring roads — full concentric circles
  //    Major rings (M-30 at index 4, M-40 at index 6) are thicker
  for (let ri = 0; ri < rings.length; ri++) {
    const isMajorRing = ri === 4 || ri === 6;
    oc.lineWidth = isMajorRing ? 1.8 : 1.2;
    oc.globalAlpha = isMajorRing ? 0.92 : 0.85;
    oc.beginPath();
    oc.arc(cx, cy, rings[ri], 0, TAU);
    oc.stroke();
  }

  // 8. Radial spokes — main arteries, with hierarchy
  oc.globalAlpha = 1;
  for (let si = 0; si < ns; si++) {
    const a = SPOKE_ANGLES[si];
    const isMajor = si % 3 === 0; // every 3rd spoke is a main artery
    oc.lineWidth = isMajor ? 1.5 : 0.95;
    oc.globalAlpha = isMajor ? 0.92 : 0.78;
    oc.beginPath();
    oc.moveTo(cx, cy);
    oc.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    oc.stroke();
  }

  oc.globalAlpha = 1;
  return off;
}

// ── component ─────────────────────────────────────────────────────────────────
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
      const LANE = 3;
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
          const a = SPOKE_ANGLES[car.idx];
          const t = car.dir === 1 ? car.progress : 1 - car.progress;
          x = cx + Math.cos(a) * r * t;
          y = cy + Math.sin(a) * r * t;
          heading = car.dir === 1 ? a : a + Math.PI;
          x += Math.cos(a + Math.PI / 2) * ls * LANE;
          y += Math.sin(a + Math.PI / 2) * ls * LANE;
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
      if (!w || !h) return;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cx = w * CITY_CX_FRAC;
      const cy = h * CITY_CY_FRAC;
      const r = Math.min(w, h) * CITY_R_FRAC;
      const rings = RING_FRACS.map((f) => f * r);
      sceneRef.current = { w, h, cx, cy, r, rings };
      staticRef.current = buildStaticScene(w, h, cx, cy, r, rings);
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
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
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
