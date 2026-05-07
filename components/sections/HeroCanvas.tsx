"use client";

import { useEffect, useRef } from "react";

// ── Grid ──────────────────────────────────────────────────────────────────────
const GRID = 32;

// ── Dot geometry ──────────────────────────────────────────────────────────────
const DOT_R_MIN  = 1.5;
const DOT_R_MAX  = 4.5;
const GLOW_BLUR  = 8;
const GLOW_COLOR = "rgba(37,99,235,0.4)";

// ── Color stops ───────────────────────────────────────────────────────────────
const COLOR_LOW  = { r: 199, g: 215, b: 248 }; // #C7D7F8
const COLOR_MID  = { r:  96, g: 165, b: 250 }; // #60A5FA
const COLOR_HIGH = { r:  37, g:  99, b: 235 }; // #2563EB

// ── Height field ──────────────────────────────────────────────────────────────
const SIGMA    = 160;
const SIGMA_SQ = SIGMA * SIGMA;

// ── Ambient noise ─────────────────────────────────────────────────────────────
const NOISE_AMP = 0.07;
const NOISE_FX  = 1 / 180;
const NOISE_FY  = 1 / 150;
const NOISE_TX  = 0.25;
const NOISE_TY  = 0.18;

// ── Mouse smoothing & decay ───────────────────────────────────────────────────
const MOUSE_LERP = 0.12;
const DECAY_MS   = 600;

// ── Edges ─────────────────────────────────────────────────────────────────────
const EDGE_THRESHOLD = 0.08;
const EDGE_OPACITY   = 0.6;
const EDGE_W_BASE    = 0.5;
const EDGE_W_SCALE   = 1.5;

// ── Contour rings ─────────────────────────────────────────────────────────────
const CONTOUR_LEVELS  = [0.85, 0.65, 0.45, 0.28, 0.14] as const;
const CONTOUR_OPACITY = 0.25;
const CONTOUR_W       = 0.75;

const TAU = Math.PI * 2;

// ── Pure helpers ──────────────────────────────────────────────────────────────

function lerpColor(
  a: { r: number; g: number; b: number },
  b: { r: number; g: number; b: number },
  t: number,
): string {
  const r  = Math.round(a.r + (b.r - a.r) * t);
  const g  = Math.round(a.g + (b.g - a.g) * t);
  const bl = Math.round(a.b + (b.b - a.b) * t);
  return `rgb(${r},${g},${bl})`;
}

function heightToColor(h: number): string {
  if (h <= 0.5) return lerpColor(COLOR_LOW, COLOR_MID,  h / 0.5);
  return               lerpColor(COLOR_MID, COLOR_HIGH, (h - 0.5) / 0.5);
}

function computeH(
  x: number,
  y: number,
  mx: number,
  my: number,
  weight: number,
  tSec: number,
): number {
  const dx = x - mx;
  const dy = y - my;
  const hMouse = weight > 0 ? weight * Math.exp(-(dx * dx + dy * dy) / (2 * SIGMA_SQ)) : 0;
  const hNoise = NOISE_AMP * Math.sin(x * NOISE_FX + tSec * NOISE_TX) * Math.cos(y * NOISE_FY + tSec * NOISE_TY);
  return Math.max(0, Math.min(1, hMouse + hNoise));
}

function contourRadius(hLevel: number): number {
  return SIGMA * Math.sqrt(-2 * Math.log(hLevel));
}

// ── Component ─────────────────────────────────────────────────────────────────

export function HeroCanvas() {
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const rafRef         = useRef<number>(0);
  const rawMouseRef    = useRef<{ x: number; y: number } | null>(null);
  const smoothMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouseActiveRef = useRef<boolean>(false);
  const decayStartRef  = useRef<number>(0);
  const decayPeakRef   = useRef<number>(0);

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
      ctx.clearRect(0, 0, width, height);
      const tSec = now / 1000;

      // ── 1. Resolve mouse state ────────────────────────────────────────────
      let mouseWeight = 0;
      let effectiveMx = smoothMouseRef.current.x;
      let effectiveMy = smoothMouseRef.current.y;

      if (mouseActiveRef.current) {
        const raw = rawMouseRef.current!;
        smoothMouseRef.current.x += (raw.x - smoothMouseRef.current.x) * MOUSE_LERP;
        smoothMouseRef.current.y += (raw.y - smoothMouseRef.current.y) * MOUSE_LERP;
        effectiveMx = smoothMouseRef.current.x;
        effectiveMy = smoothMouseRef.current.y;
        mouseWeight = 1;
      } else if (decayPeakRef.current > 0) {
        const elapsed = now - decayStartRef.current;
        const t = Math.min(elapsed / DECAY_MS, 1);
        mouseWeight = (1 - t) * decayPeakRef.current;
        if (t >= 1) decayPeakRef.current = 0;
      }

      // ── 2. Build height map ───────────────────────────────────────────────
      const cols = Math.ceil(width  / GRID) + 1;
      const rows = Math.ceil(height / GRID) + 1;
      const hMap = new Float32Array(cols * rows);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          hMap[row * cols + col] = computeH(
            col * GRID, row * GRID,
            effectiveMx, effectiveMy,
            mouseWeight, tSec,
          );
        }
      }

      // ── 3. Draw edges ─────────────────────────────────────────────────────
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const h1 = hMap[row * cols + col];

          if (col + 1 < cols) {
            const h2   = hMap[row * cols + (col + 1)];
            const minH = Math.min(h1, h2);
            if (minH > EDGE_THRESHOLD) {
              ctx.beginPath();
              ctx.moveTo(col * GRID,       row * GRID);
              ctx.lineTo((col + 1) * GRID, row * GRID);
              ctx.strokeStyle = heightToColor(minH);
              ctx.globalAlpha = minH * EDGE_OPACITY;
              ctx.lineWidth   = EDGE_W_BASE + minH * EDGE_W_SCALE;
              ctx.stroke();
            }
          }

          if (row + 1 < rows) {
            const h2   = hMap[(row + 1) * cols + col];
            const minH = Math.min(h1, h2);
            if (minH > EDGE_THRESHOLD) {
              ctx.beginPath();
              ctx.moveTo(col * GRID, row * GRID);
              ctx.lineTo(col * GRID, (row + 1) * GRID);
              ctx.strokeStyle = heightToColor(minH);
              ctx.globalAlpha = minH * EDGE_OPACITY;
              ctx.lineWidth   = EDGE_W_BASE + minH * EDGE_W_SCALE;
              ctx.stroke();
            }
          }
        }
      }

      ctx.globalAlpha = 1;

      // ── 4. Draw dots ──────────────────────────────────────────────────────
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const h = hMap[row * cols + col];
          const x = col * GRID;
          const y = row * GRID;
          const r = DOT_R_MIN + (DOT_R_MAX - DOT_R_MIN) * h;

          if (h > 0.7) {
            ctx.shadowBlur  = GLOW_BLUR * ((h - 0.7) / 0.3);
            ctx.shadowColor = GLOW_COLOR;
          } else {
            ctx.shadowBlur = 0;
          }

          ctx.beginPath();
          ctx.arc(x, y, r, 0, TAU);
          ctx.fillStyle = heightToColor(h);
          ctx.fill();
        }
      }

      ctx.shadowBlur = 0;

      // ── 5. Draw contour rings ─────────────────────────────────────────────
      if (mouseWeight > 0.05) {
        ctx.save();
        ctx.lineWidth = CONTOUR_W;
        for (const hLevel of CONTOUR_LEVELS) {
          if (hLevel * mouseWeight < 0.05) continue;
          const ringR = contourRadius(hLevel);
          ctx.beginPath();
          ctx.arc(effectiveMx, effectiveMy, ringR, 0, TAU);
          ctx.strokeStyle = heightToColor(hLevel);
          ctx.globalAlpha = CONTOUR_OPACITY * mouseWeight;
          ctx.stroke();
        }
        ctx.restore();
      }
    }

    function loop(now: number) {
      draw(now);
      rafRef.current = requestAnimationFrame(loop);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const parent = canvas.parentElement!;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      rawMouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      if (!mouseActiveRef.current) {
        smoothMouseRef.current = { ...rawMouseRef.current };
        mouseActiveRef.current = true;
        decayPeakRef.current   = 0;
      }
    };

    const onLeave = () => {
      if (!mouseActiveRef.current) return;
      mouseActiveRef.current = false;
      decayStartRef.current  = performance.now();
      decayPeakRef.current   = 1.0;
      rawMouseRef.current    = null;
    };

    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
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
