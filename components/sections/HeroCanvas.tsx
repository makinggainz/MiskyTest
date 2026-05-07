"use client";

import { useEffect, useRef } from "react";

const GRID = 32;
const DOT_R = 1.5;
const CIRCLE_SIZE = 20;
const HOVER_R = 180;
const DOT_COLOR = "#C7D7F8";
const FALLBACK_COLOR = "#5582EA";
const POP_MS = 420;
const FADE_MS = 200;

// easeOutBack — overshoots 1.0 slightly then settles, producing the "pop" feel
function easeOutBack(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}


interface AnimEntry {
  startTime: number;
  active: boolean;
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);
  const earthImgRef = useRef<HTMLImageElement | null>(null);
  const animRef = useRef<Map<string, AnimEntry>>(new Map());

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/images/earth-satellite.jpg";
    img.onload = () => { earthImgRef.current = img; };

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let width = 0;
    let height = 0;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      width = canvas!.offsetWidth;
      height = canvas!.offsetHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const mouse = mouseRef.current;
      const now = performance.now();
      const earthImg = earthImgRef.current;
      const anim = animRef.current;
      const cols = Math.ceil(width / GRID) + 1;
      const rows = Math.ceil(height / GRID) + 1;

      // ── update animation state ────────────────────────────────────────────
      if (mouse) {
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const x = col * GRID;
            const y = row * GRID;
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const key = `${col},${row}`;
            const cur = anim.get(key);
            if (dist < HOVER_R) {
              if (!cur || !cur.active) anim.set(key, { startTime: now, active: true });
            } else {
              if (cur?.active) anim.set(key, { startTime: now, active: false });
            }
          }
        }
      } else {
        // mouse left canvas — start fade-out for all active entries
        for (const [key, entry] of anim) {
          if (entry.active) anim.set(key, { startTime: now, active: false });
        }
      }

      // ── draw ──────────────────────────────────────────────────────────────
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * GRID;
          const y = row * GRID;
          const key = `${col},${row}`;
          const entry = anim.get(key);

          if (!entry) {
            ctx.beginPath();
            ctx.arc(x, y, DOT_R, 0, Math.PI * 2);
            ctx.fillStyle = DOT_COLOR;
            ctx.fill();
            continue;
          }

          const elapsed = now - entry.startTime;
          let scale: number;
          let alpha: number;

          if (entry.active) {
            const t = Math.min(elapsed / POP_MS, 1);
            scale = easeOutBack(t);
            alpha = Math.min(t * 4, 1); // opacity reaches 1 quickly
          } else {
            const t = Math.min(elapsed / FADE_MS, 1);
            scale = 1 - t;
            alpha = 1 - t;
            if (t >= 1) {
              anim.delete(key);
              // draw the dot now that the entry is cleaned up
              ctx.beginPath();
              ctx.arc(x, y, DOT_R, 0, Math.PI * 2);
              ctx.fillStyle = DOT_COLOR;
              ctx.fill();
              continue;
            }
          }

          // distance-based opacity falloff while active
          if (entry.active && mouse) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < HOVER_R) {
              alpha *= Math.pow(1 - dist / HOVER_R, 1.2);
            }
          }

          if (scale < 0.01 || alpha < 0.01) continue;

          const drawSize = CIRCLE_SIZE * scale;
          const radius = drawSize / 2;

          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);

          if (earthImg && earthImg.naturalWidth > 0) {
            ctx.clip();
            const iw = earthImg.naturalWidth;
            const ih = earthImg.naturalHeight;
            const sampleW = (CIRCLE_SIZE / width) * iw;
            const sampleH = (CIRCLE_SIZE / height) * ih;
            const rawSx = (x / width) * iw - sampleW / 2;
            const rawSy = (y / height) * ih - sampleH / 2;
            const sx = Math.max(0, Math.min(rawSx, iw - sampleW));
            const sy = Math.max(0, Math.min(rawSy, ih - sampleH));
            ctx.drawImage(
              earthImg,
              sx, sy, sampleW, sampleH,
              x - drawSize / 2, y - drawSize / 2, drawSize, drawSize,
            );
          } else {
            ctx.fillStyle = FALLBACK_COLOR;
            ctx.fill();
          }

          ctx.restore();
        }
      }
    }

    function loop() {
      draw();
      rafRef.current = requestAnimationFrame(loop);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const parent = canvas.parentElement!;
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = null; };

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
