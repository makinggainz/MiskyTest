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

// All words shifted 1 right in rows 0–1; world. shifted 2 right into row 2
const SCRAMBLED: (string | null)[] = [
  null,         "The",       "frontier",  "research",  "Lab",       "building",
  null,         "geospatial","reasoning", "for",       "the",       "real",
  null,         null,        "world.",    null,        null,        null,
];

// 12 moves — every word moves at least once, no backtracking:
// world. slides left 2 steps, then row 1 cascades left, then row 0 cascades left
const SOLVE_MOVES = [
  { word: "world.",     from: 14, to: 13 },
  { word: "world.",     from: 13, to: 12 },
  { word: "geospatial", from: 7,  to: 6  },
  { word: "reasoning",  from: 8,  to: 7  },
  { word: "for",        from: 9,  to: 8  },
  { word: "the",        from: 10, to: 9  },
  { word: "real",       from: 11, to: 10 },
  { word: "The",        from: 1,  to: 0  },
  { word: "frontier",   from: 2,  to: 1  },
  { word: "research",   from: 3,  to: 2  },
  { word: "Lab",        from: 4,  to: 3  },
  { word: "building",   from: 5,  to: 4  },
];

const WORDS = FINAL.filter((w): w is string => w !== null);

const FINAL_POS: Record<string, number> = {};
FINAL.forEach((w, i) => { if (w !== null) FINAL_POS[w] = i; });

const START_DELAY = 800;
const MOVE_INTERVAL = 350;
const TRANSITION_MS = 260;

export function HeroWordGrid() {
  const [wordCell, setWordCell] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    SCRAMBLED.forEach((w, i) => { if (w !== null) init[w] = i; });
    return init;
  });
  const [ready, setReady] = useState(false);
  const [arrived, setArrived] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    timeouts.push(setTimeout(() => setReady(true), 60));

    SOLVE_MOVES.forEach((move, idx) => {
      const t = START_DELAY + idx * MOVE_INTERVAL;
      timeouts.push(setTimeout(() => {
        setWordCell(prev => ({ ...prev, [move.word]: move.to }));
      }, t));
      // Blur fires just after the CSS transition settles, only when landing on final cell
      if (FINAL_POS[move.word] === move.to) {
        timeouts.push(setTimeout(() => {
          setArrived(a => new Set([...a, move.word]));
        }, t + TRANSITION_MS + 20));
      }
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
