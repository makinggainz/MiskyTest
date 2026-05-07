"use client";

import { useEffect, useRef } from "react";

const TAU = Math.PI * 2;
const SPOKES = 14;
const RING_FRACS = [0.20, 0.38, 0.56, 0.76];

export function HeroCityCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    function draw() {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      if (!w || !h) return;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.64;
      const cy = h * 0.50;
      const r = Math.min(w, h) * 0.38;
      const rings = RING_FRACS.map((f) => f * r);
      const far = Math.hypot(w, h);

      ctx.strokeStyle = "#ffffff";
      ctx.lineCap = "round";

      // Radial spokes — full canvas extent, thinning beyond city boundary
      for (let i = 0; i < SPOKES; i++) {
        const a = i * (TAU / SPOKES) - Math.PI / 2;
        const ex = cx + Math.cos(a) * far;
        const ey = cy + Math.sin(a) * far;

        // Inner segment (center → city edge): full weight
        ctx.globalAlpha = 0.9;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
        ctx.stroke();

        // Outer extension (city edge → canvas edge): lighter + thinner
        ctx.globalAlpha = 0.35;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
        ctx.lineTo(ex, ey);
        ctx.stroke();
      }

      ctx.globalAlpha = 0.9;

      // Ring roads
      for (const rr of rings) {
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(cx, cy, rr, 0, TAU);
        ctx.stroke();
      }

      // Outer city boundary — slightly bolder
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, TAU);
      ctx.stroke();

      ctx.globalAlpha = 1;
    }

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
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
