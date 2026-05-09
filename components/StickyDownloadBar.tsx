"use client";

import { useEffect, useState } from "react";

// Mobile sticky download bar per consumer-spec §25. Appears once the hero
// scrolls out of view (~80% of viewport height), sits at the bottom of the
// viewport, mobile-only (lg:hidden). Contains the primary CTA + a compact
// star-rating placeholder. Hides again when scrolling back into the hero.

export function StickyDownloadBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * 0.8;
      setVisible(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`lg:hidden fixed inset-x-3 bottom-3 z-40 transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      <div
        className="flex items-center justify-between gap-3 rounded-[14px] border border-[#C7D7F8] bg-background/95 backdrop-blur px-4 py-3"
        style={{ boxShadow: "0 12px 40px -8px rgba(15,30,80,0.18)" }}
      >
        <div className="flex flex-col leading-tight">
          <span className="text-[11px] font-semibold text-mistral-black">Try Elio</span>
          <span className="text-[10px] text-mistral-black/55">
            <span className="text-mistral-orange">★</span> 4.8 · Free, forever
          </span>
        </div>
        <a
          href="#"
          className="rounded-[7px] bg-mistral-black text-white text-xs font-medium px-4 py-2 shrink-0 transition-colors hover:bg-mistral-black/80"
        >
          Get the app
        </a>
      </div>
    </div>
  );
}
