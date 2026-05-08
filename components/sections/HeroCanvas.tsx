"use client";

import { useEffect, useRef } from "react";

// ── Grid ──────────────────────────────────────────────────────────────────────
const GRID = 20;
const TAU  = Math.PI * 2;

// ── Animation phases (ms from first frame) ────────────────────────────────────
const PHASE_FADE_END = 600;   // earth fades in at centre
const PHASE_SPIN_END = 2600;  // spinning at centre
const PHASE_MOVE_END = 4000;  // moving to right side

// ── Earth params ──────────────────────────────────────────────────────────────
const EARTH_R_FACTOR = 0.30;   // radius = min(w,h) * factor
const EARTH_FINAL_X  = 0.75;   // final centre as fraction of width
const ROT_SPEED_SPIN = 0.55;   // rad/sec during intro
const ROT_SPEED_IDLE = 0.12;   // rad/sec at rest

// ── Colours — Mistral sunshine palette ───────────────────────────────────────
// Using design-system vars: --color-mistral-sunshine-{50…950}
// Hex refs: 950=#0E256E 900=#12369C 800=#1340B3 750=#154ACC 700=#1B57DC
//           600=#2663EB 500=#5582EA 400=#7EA0EE 300=#A8C0F4 200=#C7D7F8 100=#DCE7FB

type RGB = { r: number; g: number; b: number };

const BG_DOT:   RGB = { r: 21,  g: 74,  b: 204 }; // sunshine-750 #154ACC
const OCEAN_A:  RGB = { r: 38,  g: 99,  b: 235 }; // sunshine-600 #2663EB  (deeper)
const OCEAN_B:  RGB = { r: 85,  g: 130, b: 234 }; // sunshine-500 #5582EA  (tropical)
const LAND_A:   RGB = { r: 18,  g: 54,  b: 156 }; // sunshine-900 #12369C  (lowland)
const LAND_B:   RGB = { r: 19,  g: 64,  b: 179 }; // sunshine-800 #1340B3  (highland)
const ICE_A:    RGB = { r: 168, g: 192, b: 244 }; // sunshine-300 #A8C0F4  (ice shelf)
const ICE_B:    RGB = { r: 220, g: 231, b: 251 }; // sunshine-100 #DCE7FB  (snow cap)

// ── Simplified continent ellipses [lonCentre°, latCentre°, lonR°, latR°] ─────
const LAND_REGIONS: [number, number, number, number][] = [
  [-100,  52,  43, 26],  // North America
  [ -58, -12,  22, 32],  // South America
  [  25,   5,  28, 40],  // Africa
  [  15,  54,  22, 18],  // Europe
  [  95,  47,  55, 30],  // Asia
  [ 135, -28,  18, 13],  // Australia
  [ -44,  72,  18,  8],  // Greenland
];

// ── Pure helpers ──────────────────────────────────────────────────────────────

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpRGB(a: RGB, b: RGB, t: number): RGB {
  return { r: lerp(a.r, b.r, t), g: lerp(a.g, b.g, t), b: lerp(a.b, b.b, t) };
}

function toCSS(c: RGB): string {
  return `rgb(${Math.round(c.r)},${Math.round(c.g)},${Math.round(c.b)})`;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Trigonometric coast-line roughness (deterministic, periodic)
function coastNoise(lon: number, lat: number): number {
  return 0.10 * (
    Math.sin(lon * 3.7 + lat * 2.3) * 0.5 +
    Math.sin(lon * 7.1 - lat * 4.9) * 0.3 +
    Math.cos(lon * 5.3 + lat * 8.1) * 0.2
  );
}

function isLand(lonDeg: number, latDeg: number): boolean {
  if (latDeg < -62) return true; // Antarctica
  for (const [cx, cy, rx, ry] of LAND_REGIONS) {
    let dlon = lonDeg - cx;
    if (dlon >  180) dlon -= 360;
    if (dlon < -180) dlon += 360;
    const noise     = coastNoise(lonDeg * 0.05, latDeg * 0.05);
    const threshold = (1 + noise) * (1 + noise);
    if ((dlon / rx) ** 2 + ((latDeg - cy) / ry) ** 2 < threshold) return true;
  }
  return false;
}

function earthColor(lonDeg: number, latDeg: number, nz: number): string {
  // Limb darkening — edges of sphere appear dimmer
  const ld  = 0.40 + 0.60 * nz * nz;
  const abs = Math.abs(latDeg);
  const ice  = abs > 70;
  const land = !ice && isLand(lonDeg, latDeg);

  let base: RGB;
  if (ice) {
    base = lerpRGB(ICE_A, ICE_B, Math.min((abs - 70) / 20, 1));
  } else if (land) {
    // Subtle terrain shading via trig variation
    const t = 0.5 + 0.5 * Math.sin(lonDeg * 0.13 + latDeg * 0.17);
    base = lerpRGB(LAND_A, LAND_B, t);
  } else {
    // Ocean: brighter in tropics, deeper toward poles
    const t = Math.max(0, 1 - abs / 55) * 0.7;
    base = lerpRGB(OCEAN_A, OCEAN_B, t);
  }

  return toCSS({ r: base.r * ld, g: base.g * ld, b: base.b * ld });
}

// ── Component ─────────────────────────────────────────────────────────────────

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const startRef  = useRef<number>(0); // set on first frame
  const rotRef    = useRef<number>(0); // accumulated rotation (rad)
  const lastRef   = useRef<number>(0); // prev frame timestamp for delta

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let width = 0;
    let height = 0;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      width  = canvas!.offsetWidth;
      height = canvas!.offsetHeight;
      canvas!.width  = width  * dpr;
      canvas!.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(now: number) {
      // Initialise start time on first frame
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;

      // Frame-rate-independent delta time (capped at 50ms to avoid jumps)
      const dt = lastRef.current ? Math.min((now - lastRef.current) / 1000, 0.05) : 0;
      lastRef.current = now;

      // ── Phase resolution ────────────────────────────────────────────────────
      let earthCx: number;
      const earthCy = height / 2;
      let earthAlpha: number;
      let rotSpeed: number;

      if (elapsed < PHASE_FADE_END) {
        earthCx    = width / 2;
        earthAlpha = elapsed / PHASE_FADE_END;
        rotSpeed   = ROT_SPEED_SPIN * 0.4;
      } else if (elapsed < PHASE_SPIN_END) {
        earthCx    = width / 2;
        earthAlpha = 1;
        rotSpeed   = ROT_SPEED_SPIN;
      } else if (elapsed < PHASE_MOVE_END) {
        const t = easeInOutCubic(
          (elapsed - PHASE_SPIN_END) / (PHASE_MOVE_END - PHASE_SPIN_END),
        );
        earthCx    = lerp(width / 2, width * EARTH_FINAL_X, t);
        earthAlpha = 1;
        rotSpeed   = ROT_SPEED_SPIN;
      } else {
        earthCx    = width * EARTH_FINAL_X;
        earthAlpha = 1;
        rotSpeed   = ROT_SPEED_IDLE;
      }

      rotRef.current += rotSpeed * dt;

      const earthR = Math.min(width, height) * EARTH_R_FACTOR;

      // ── Clear ───────────────────────────────────────────────────────────────
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width  / GRID) + 1;
      const rows = Math.ceil(height / GRID) + 1;

      // ── Background dots — same grid as Earth dots, full canvas ─────────────
      // Faint everywhere; Earth disc + coloured dots make the globe obvious.
      ctx.globalAlpha = 0.13;
      ctx.fillStyle = toCSS(BG_DOT);
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          ctx.beginPath();
          ctx.arc(col * GRID + GRID / 2, row * GRID + GRID / 2, 1.3, 0, TAU);
          ctx.fill();
        }
      }

      // ── Earth backdrop disc ──────────────────────────────────────────────────
      ctx.globalAlpha = earthAlpha * 0.92;
      ctx.beginPath();
      ctx.arc(earthCx, earthCy, earthR, 0, TAU);
      ctx.fillStyle = "rgb(10,28,90)"; // deep navy behind the globe
      ctx.fill();

      // ── Earth dots (at half-grid offsets — between the grid dots) ────────────
      // One extra col/row of earth dots to cover the shifted positions
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x  = col * GRID + GRID / 2;
          const y  = row * GRID + GRID / 2;
          const dx = x - earthCx;
          const dy = y - earthCy;

          if (dx * dx + dy * dy > earthR * earthR) continue;

          const nx = dx / earthR;
          const ny = dy / earthR;
          const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));

          const lon    = Math.atan2(nx, nz) + rotRef.current;
          const lat    = Math.asin(-ny);
          const lonDeg = ((lon * 180 / Math.PI) % 360 + 540) % 360 - 180;
          const latDeg = lat * 180 / Math.PI;

          const r = 1.3;

          ctx.globalAlpha = earthAlpha;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, TAU);
          ctx.fillStyle = earthColor(lonDeg, latDeg, nz);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
    }

    function loop(now: number) {
      draw(now);
      rafRef.current = requestAnimationFrame(loop);
    }

    resize();
    const ro = new ResizeObserver(resize);
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
      aria-hidden="true"
    />
  );
}
