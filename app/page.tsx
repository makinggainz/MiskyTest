"use client";

import { useEffect, useRef, useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { Section1 } from "@/components/sections/Section1";
import { Section2 } from "@/components/sections/Section2";
import { Section3 } from "@/components/sections/Section3";

// X-axis cube: scroll down tips the cube forward (top face comes to front).
//
// Cube face positions (local-space transforms on each face div):
//   Front  rotateX(0deg)    translateZ(halfH)  → visible at cube rotateX(0)
//   Top    rotateX(-90deg)  translateZ(halfH)  → visible at cube rotateX(+90)
//   Back   rotateX(180deg)  translateZ(halfH)  → visible at cube rotateX(+180)
//   Bottom rotateX(+90deg)  translateZ(halfH)  → visible at cube rotateX(+270)
//
// Scroll mapping: cubeAngle = (scrollY / innerHeight) * 90

const FACES = 4;
const PERSPECTIVE = 1400;

export default function CubePage() {
  const [angle, setAngle] = useState(0);
  const [halfH, setHalfH] = useState(450);
  const angleRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    // Geometry: half the viewport height = distance from cube center to each face
    const updateHalfH = () => setHalfH(window.innerHeight / 2);
    updateHalfH();
    window.addEventListener("resize", updateHalfH);

    // Hide layout footer — it has no place in the cube layout
    const footer = document.querySelector("footer") as HTMLElement | null;
    if (footer) footer.style.display = "none";

    // Snap scrolling: every 100vh is one face
    const html = document.documentElement;
    const prevSnap = html.style.scrollSnapType;
    html.style.scrollSnapType = "y mandatory";

    const onScroll = () => {
      targetRef.current = (window.scrollY / window.innerHeight) * 90;
    };

    // Smooth lerp so the cube lingers mid-rotation and shows its 3D structure
    const tick = () => {
      const diff = targetRef.current - angleRef.current;
      angleRef.current += Math.abs(diff) < 0.005 ? diff : diff * 0.13;
      setAngle(angleRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", updateHalfH);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
      html.style.scrollSnapType = prevSnap;
      if (footer) footer.style.display = "";
    };
  }, []);

  const faceStyle = (rotX: number): React.CSSProperties => ({
    position: "absolute",
    inset: 0,
    overflow: "hidden",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    transform: `rotateX(${rotX}deg) translateZ(${halfH}px)`,
  });

  return (
    <>
      {/* Scroll track — provides the scrollable height and snap points */}
      <div aria-hidden="true">
        {Array.from({ length: FACES }).map((_, i) => (
          <div key={i} style={{ height: "100vh", scrollSnapAlign: "start" }} />
        ))}
      </div>

      {/* Fixed 3D scene */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          perspective: `${PERSPECTIVE}px`,
          perspectiveOrigin: "50% 50%",
          backgroundColor: "#080808",
          overflow: "hidden",
        }}
      >
        {/* The cube */}
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            transform: `rotateX(${angle}deg)`,
          }}
        >
          {/* Face 0 — Hero (front) */}
          <div style={faceStyle(0)}>
            <Hero />
          </div>

          {/* Face 1 — Section1 (top → becomes front at +90°) */}
          <div style={faceStyle(-90)}>
            <Section1 />
          </div>

          {/* Face 2 — Section2 (back → becomes front at +180°) */}
          <div style={faceStyle(180)}>
            <Section2 />
          </div>

          {/* Face 3 — Section3 (bottom → becomes front at +270°) */}
          <div style={faceStyle(90)}>
            <Section3 />
          </div>
        </div>
      </div>
    </>
  );
}
