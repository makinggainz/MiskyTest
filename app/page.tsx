"use client";

import { useEffect, useRef, useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { Section1 } from "@/components/sections/Section1";
import { Section2 } from "@/components/sections/Section2";
import { Section3 } from "@/components/sections/Section3";

// X-axis cube: scroll down tips the cube forward (top face comes to front).
// Transition arc: face fills screen → cube zooms out (full cube visible in
// space) → cube zooms back in → next face fills screen.
//
// Face local-space positions:
//   Front  rotateX(  0°) translateZ(halfH)  → front at cube angle 0°
//   Top    rotateX(-90°) translateZ(halfH)  → front at cube angle +90°
//   Back   rotateX(180°) translateZ(halfH)  → front at cube angle +180°
//   Bottom rotateX(+90°) translateZ(halfH)  → front at cube angle +270°

const FACES = 4;
const PERSPECTIVE = 1400;
const FACE_RADIUS = 22; // border-radius on each face (px)
const MIN_SCALE = 0.36; // cube shrinks to this at the midpoint of each rotation
const LERP = 0.12;

export default function CubePage() {
  const [cube, setCube] = useState({ angle: 0, scale: 1 });
  const [halfH, setHalfH] = useState(450);
  const angleRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef(0);
  const starCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // ── geometry ──────────────────────────────────────────────────────────
    const updateHalfH = () => setHalfH(window.innerHeight / 2);
    updateHalfH();

    // ── star field ────────────────────────────────────────────────────────
    function drawStars() {
      const sc = starCanvasRef.current;
      if (!sc) return;
      const ctx = sc.getContext("2d")!;
      sc.width = window.innerWidth;
      sc.height = window.innerHeight;
      ctx.clearRect(0, 0, sc.width, sc.height);
      for (let i = 0; i < 240; i++) {
        const x = Math.random() * sc.width;
        const y = Math.random() * sc.height;
        // varied sizes and opacities give a sense of depth
        const r = Math.random() < 0.15 ? Math.random() * 1.2 + 1 : Math.random() * 0.8 + 0.2;
        const a = Math.random() * 0.55 + 0.35;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a.toFixed(2)})`;
        ctx.fill();
      }
      // a handful of slightly brighter, slightly blurred "hero" stars
      for (let i = 0; i < 12; i++) {
        const x = Math.random() * sc.width;
        const y = Math.random() * sc.height;
        const r = Math.random() * 1.5 + 1.5;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,0.9)`;
        ctx.fill();
      }
    }
    drawStars();

    // ── hide layout footer ────────────────────────────────────────────────
    const footer = document.querySelector("footer") as HTMLElement | null;
    if (footer) footer.style.display = "none";

    // ── scroll snap (one face per gesture) ────────────────────────────────
    const html = document.documentElement;
    const prevSnap = html.style.scrollSnapType;
    html.style.scrollSnapType = "y mandatory";

    // ── scroll listener ───────────────────────────────────────────────────
    const onScroll = () => {
      targetRef.current = (window.scrollY / window.innerHeight) * 90;
    };

    // ── rAF: lerp angle, derive scale from mid-rotation progress ──────────
    const tick = () => {
      const diff = targetRef.current - angleRef.current;
      angleRef.current += Math.abs(diff) < 0.004 ? diff : diff * LERP;

      // progress ∈ [0, 1] within the current 90° segment
      // 0 = sitting on a face, 0.5 = mid-rotation, 1 = next face
      const progress = (angleRef.current / 90) % 1;
      const scale = 1 - (1 - MIN_SCALE) * Math.sin(progress * Math.PI);

      setCube({ angle: angleRef.current, scale });
      rafRef.current = requestAnimationFrame(tick);
    };

    // ── resize ────────────────────────────────────────────────────────────
    const onResize = () => { updateHalfH(); drawStars(); };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
      html.style.scrollSnapType = prevSnap;
      if (footer) footer.style.display = "";
    };
  }, []);

  const faceStyle = (rotX: number): React.CSSProperties => ({
    position: "absolute",
    inset: 0,
    overflow: "hidden",
    borderRadius: FACE_RADIUS,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    transform: `rotateX(${rotX}deg) translateZ(${halfH}px)`,
  });

  return (
    <>
      {/* Scroll track: 4 snap points, scroll-snap-stop: always prevents
          one gesture from jumping multiple faces */}
      <div aria-hidden="true">
        {Array.from({ length: FACES }).map((_, i) => (
          <div
            key={i}
            style={{ height: "100vh", scrollSnapAlign: "start", scrollSnapStop: "always" }}
          />
        ))}
      </div>

      {/* ── Fixed scene ──────────────────────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          perspective: `${PERSPECTIVE}px`,
          perspectiveOrigin: "50% 50%",
          backgroundColor: "#060608",
          overflow: "hidden",
        }}
      >
        {/* Star field — behind everything */}
        <canvas
          ref={starCanvasRef}
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          aria-hidden="true"
        />

        {/* The cube */}
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            // scale3d keeps the Z-axis proportional so perspective depth is preserved
            transform: `rotateX(${cube.angle}deg) scale3d(${cube.scale},${cube.scale},${cube.scale})`,
          }}
        >
          {/* Face 0 — Hero (front) */}
          <div style={faceStyle(0)}>
            <Hero />
          </div>

          {/* Face 1 — Section1 (top → front at +90°) */}
          <div style={faceStyle(-90)}>
            <Section1 />
          </div>

          {/* Face 2 — Section2 (back → front at +180°) */}
          <div style={faceStyle(180)}>
            <Section2 />
          </div>

          {/* Face 3 — Section3 (bottom → front at +270°) */}
          <div style={faceStyle(90)}>
            <Section3 />
          </div>
        </div>
      </div>
    </>
  );
}
