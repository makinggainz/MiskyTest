"use client";

import { useEffect, useState } from "react";

const COLS = 6;
const CELL_W = 100 / COLS;
const CELL_H = 100 / 3;

// Dense final state — words fill cols 0–4, col 5 always empty
const FINAL: (string | null)[] = [
  "The",        "frontier",  "research",  "Lab",       "building",  null,
  "geospatial", "reasoning", "for",       "the",       "real",      null,
  "world.",     null,        null,        null,        null,        null,
];

// Row 1 shifted one position right — open slot at index 6
const SCRAMBLED: (string | null)[] = [
  "The",        "frontier",  "research",  "Lab",       "building",  null,
  null,         "geospatial","reasoning", "for",       "the",       "real",
  "world.",     null,        null,        null,        null,        null,
];

// 5 deterministic moves: row-1 cascade left, each word landing exactly on its final cell
const SOLVE_MOVES = [
  { word: "geospatial", from: 7,  to: 6  },
  { word: "reasoning",  from: 8,  to: 7  },
  { word: "for",        from: 9,  to: 8  },
  { word: "the",        from: 10, to: 9  },
  { word: "real",       from: 11, to: 10 },
];

const WORDS = FINAL.filter((w): w is string => w !== null);

const FINAL_POS: Record<string, number> = {};
FINAL.forEach((w, i) => { if (w !== null) FINAL_POS[w] = i; });

// Words already in their final position in the starting state
function initialArrived(): Set<string> {
  const s = new Set<string>();
  SCRAMBLED.forEach((w, i) => { if (w !== null && FINAL_POS[w] === i) s.add(w); });
  return s;
}

const START_DELAY = 1000;
const MOVE_INTERVAL = 500;
const TRANSITION_MS = 300;

export function HeroWordGrid() {
  const [wordCell, setWordCell] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    SCRAMBLED.forEach((w, i) => { if (w !== null) init[w] = i; });
    return init;
  });
  const [ready, setReady] = useState(false);
  const [arrived, setArrived] = useState<Set<string>>(initialArrived);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    timeouts.push(setTimeout(() => setReady(true), 60));

    SOLVE_MOVES.forEach((move, idx) => {
      const t = START_DELAY + idx * MOVE_INTERVAL;
      // Slide the word
      timeouts.push(setTimeout(() => {
        setWordCell(prev => ({ ...prev, [move.word]: move.to }));
      }, t));
      // Blur fires just after the CSS transition completes
      timeouts.push(setTimeout(() => {
        setArrived(a => new Set([...a, move.word]));
      }, t + TRANSITION_MS + 20));
    });

    return () => { timeouts.forEach(clearTimeout); };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        aspectRatio: "2 / 1",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.25)",
      }}
    >
      {WORDS.map(word => {
        const cellIdx = wordCell[word] ?? 0;
        const col = cellIdx % COLS;
        const row = Math.floor(cellIdx / COLS);
        const isArrived = arrived.has(word);
        return (
          <div
            key={word}
            style={{
              position: "absolute",
              left: `${col * CELL_W}%`,
              top: `${row * CELL_H}%`,
              width: `${CELL_W}%`,
              height: `${CELL_H}%`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "clamp(0.9rem, 1.8vw, 1.4rem)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.25)",
              background: isArrived ? "rgba(255,255,255,0.12)" : "transparent",
              backdropFilter: isArrived ? "blur(12px)" : "none",
              transition: ready
                ? `left ${TRANSITION_MS}ms ease-in-out, top ${TRANSITION_MS}ms ease-in-out, background 0.5s ease`
                : "none",
              opacity: ready ? 1 : 0,
              zIndex: 2,
              pointerEvents: "none",
            }}
          >
            {word}
          </div>
        );
      })}
    </div>
  );
}
