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

// Page background color = hsl(220 89% 97%) = #F1F5FE
const PAGE_BG = "rgba(241,245,254,";

function hash(n: number): number {
  return Math.abs(Math.sin(n * 127.1 + 311.7) * 43758.5453) % 1;
}

function zoneColor(depth: number, spoke: number): string {
  const v = hash(depth * 17 + spoke * 7 + 3);
  if (v < 0.12) return "#8fc88a";
  if (v < 0.22) return "#d4c4a8";
  const urb = ["#c4bcd0", "#b0a4c4", "#9488b4", "#7868a4"];
  return urb[Math.min(depth, 3)];
}

interface Car {
  type: "ring" | "radial";
  idx: number;
  progress: number;
  speedPerSec: number;
  dir: 1 | -1;
  lane: 0 | 1;
  color: string;
}

interface Scene {
  w: number; h: number;
  cx: number; cy: number;
  r: number;
  rings: number[];
}

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

    // ── static scene ──────────────────────────────────────────────────────────
    function buildStatic(w: number, h: number, cx: number, cy: number, r: number, rings: number[]): HTMLCanvasElement {
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const oc = off.getContext("2d")!;

      // 1. Countryside base
      oc.fillStyle = "#dde0d4";
      oc.fillRect(0, 0, w, h);

      // 2. Farm fields scattered outside city radius
      const farmPalette = ["#c9d896", "#d5c98a", "#bace8c", "#dce0a2", "#c2b87a", "#d4d4a0", "#cad8a8"];
      for (let i = 0; i < 95; i++) {
        const angle = hash(i * 3 + 1) * TAU;
        const dist = r * (1.06 + hash(i * 7 + 2) * 1.6);
        const fx = cx + Math.cos(angle) * dist;
        const fy = cy + Math.sin(angle) * dist;
        if (fx < -160 || fx > w + 160 || fy < -160 || fy > h + 160) continue;
        const fw = 55 + hash(i * 5 + 3) * 130;
        const fh = 35 + hash(i * 11 + 4) * 90;
        const rot = hash(i * 13 + 5) * Math.PI;
        oc.save();
        oc.translate(fx, fy);
        oc.rotate(rot);
        oc.fillStyle = farmPalette[Math.floor(hash(i * 17 + 6) * farmPalette.length)];
        oc.fillRect(-fw / 2, -fh / 2, fw, fh);
        oc.restore();
      }

      // 3. River (drawn before city so city fills on top)
      oc.save();
      oc.strokeStyle = "#7ab8d8";
      oc.lineWidth = 16;
      oc.lineCap = "round";
      oc.lineJoin = "round";
      oc.beginPath();
      oc.moveTo(w * 0.02, h * 0.18);
      oc.bezierCurveTo(w * 0.22, h * 0.36, w * 0.45, h * 0.43, w * 0.68, h * 0.62);
      oc.bezierCurveTo(w * 0.80, h * 0.73, w * 0.91, h * 0.84, w * 0.99, h * 0.95);
      oc.stroke();
      oc.restore();

      // 4. City zone sectors (outer to inner)
      const allR = [...rings, r]; // ring0…ring3 + city edge
      for (let ri = allR.length - 1; ri >= 1; ri--) {
        const outerRad = allR[ri];
        const innerRad = allR[ri - 1];
        const depth = allR.length - 1 - ri; // 0=outermost zone, 3=innermost
        for (let si = 0; si < SPOKES; si++) {
          const a1 = si * (TAU / SPOKES) - Math.PI / 2;
          const a2 = (si + 1) * (TAU / SPOKES) - Math.PI / 2;
          oc.beginPath();
          oc.arc(cx, cy, outerRad, a1, a2);
          oc.arc(cx, cy, innerRad, a2, a1, true);
          oc.closePath();
          oc.fillStyle = zoneColor(depth, si);
          oc.fill();
        }
      }

      // 5. City center circle
      oc.beginPath();
      oc.arc(cx, cy, rings[0], 0, TAU);
      oc.fillStyle = "#7068a0";
      oc.fill();

      // 6. Ring roads
      for (const rr of rings) {
        oc.beginPath();
        oc.arc(cx, cy, rr, 0, TAU);
        oc.strokeStyle = "#7a8190";
        oc.lineWidth = 4;
        oc.stroke();
      }
      oc.beginPath();
      oc.arc(cx, cy, r, 0, TAU);
      oc.strokeStyle = "#7a8190";
      oc.lineWidth = 3;
      oc.stroke();

      // 7. Radial spokes
      const spokeStep = TAU / SPOKES;
      for (let si = 0; si < SPOKES; si++) {
        const a = si * spokeStep - Math.PI / 2;
        oc.beginPath();
        oc.moveTo(cx, cy);
        oc.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
        oc.strokeStyle = "#7a8190";
        oc.lineWidth = 3.5;
        oc.stroke();
      }

      // 8. Radial vignette fading to page background at edges
      const vig = oc.createRadialGradient(cx, cy, r * 0.55, cx, cy, Math.max(w, h) * 0.78);
      vig.addColorStop(0, PAGE_BG + "0)");
      vig.addColorStop(1, PAGE_BG + "0.94)");
      oc.fillStyle = vig;
      oc.fillRect(0, 0, w, h);

      // 9. Left-side gradient for text readability
      const lg = oc.createLinearGradient(0, 0, w * 0.58, 0);
      lg.addColorStop(0, PAGE_BG + "0.97)");
      lg.addColorStop(0.55, PAGE_BG + "0.42)");
      lg.addColorStop(1, PAGE_BG + "0)");
      oc.fillStyle = lg;
      oc.fillRect(0, 0, w, h);

      return off;
    }

    // ── cars ─────────────────────────────────────────────────────────────────
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
            type: "ring",
            idx: ri,
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
            type: "radial",
            idx: si,
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

    // ── draw cars each frame ──────────────────────────────────────────────────
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

    // ── init / resize ─────────────────────────────────────────────────────────
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

      staticRef.current = buildStatic(w, h, cx, cy, cityR, rings);
      carsRef.current = buildCars(rings);
    }

    // ── animation loop ────────────────────────────────────────────────────────
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
