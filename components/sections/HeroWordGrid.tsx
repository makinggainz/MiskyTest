"use client";

import { useEffect, useState } from "react";

const COLS = 6;
const ROWS = 3;
const CELLS = COLS * ROWS;
const CELL_W = 100 / COLS;
const CELL_H = 100 / ROWS;

const FINAL: (string | null)[] = [
  "The",       null,      "frontier", null,       "research",   null,
  null,        "Lab",     null,       "building", null,         "geospatial",
  "reasoning", null,      "for",      "the",      "real",       "world.",
];

const WORDS = FINAL.filter((w): w is string => w !== null);

const SCOOP_SIZE = "clamp(28px, 4vw, 64px)";
// 0=TL 1=TR 2=BR 3=BL — rows are all-left-then-all-right so no right-scoop is left-adjacent to a left-scoop
const SCOOP_CORNERS = [0, 3, 0, 1, 2, 1, 3, 0, 1, 2, 1, 2, 0, 3, 0, 3, 1, 2];
type ScoopDef = { pos: { top?: number; bottom?: number; left?: number; right?: number }; grad: string };
const SCOOP_DEFS: ScoopDef[] = [
  { pos: { top: 0, left: 0 },     grad: "100% 100%" },
  { pos: { top: 0, right: 0 },    grad: "0% 100%" },
  { pos: { bottom: 0, right: 0 }, grad: "0% 0%" },
  { pos: { bottom: 0, left: 0 },  grad: "100% 0%" },
];

function getAdjacent(idx: number): number[] {
  const row = Math.floor(idx / COLS);
  const col = idx % COLS;
  const adj: number[] = [];
  if (row > 0) adj.push(idx - COLS);
  if (row < ROWS - 1) adj.push(idx + COLS);
  if (col > 0) adj.push(idx - 1);
  if (col < COLS - 1) adj.push(idx + 1);
  return adj;
}

// Shuffle backward from the final state, then reverse → valid solve sequence
function buildShuffle(n: number) {
  const state = [...FINAL];
  const moves: { from: number; to: number }[] = [];
  for (let i = 0; i < n; i++) {
    const empties = state.flatMap((v, i) => (v === null ? [i] : []));
    const empty = empties[Math.floor(Math.random() * empties.length)];
    const neighbours = getAdjacent(empty).filter(j => state[j] !== null);
    if (!neighbours.length) continue;
    const from = neighbours[Math.floor(Math.random() * neighbours.length)];
    moves.push({ from, to: empty });
    const tmp = state[empty];
    state[empty] = state[from];
    state[from] = tmp;
  }
  const solveMoves = [...moves].reverse().map(m => ({ from: m.to, to: m.from }));
  return { scrambled: state as (string | null)[], solveMoves };
}

export function HeroWordGrid() {
  // Initialise to final positions (deterministic — no hydration mismatch)
  const [wordCell, setWordCell] = useState<Record<string, number>>(
    () => Object.fromEntries(WORDS.map(w => [w, FINAL.indexOf(w)]))
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { scrambled, solveMoves } = buildShuffle(48);

    // Snap to scrambled positions while still invisible
    const init: Record<string, number> = {};
    scrambled.forEach((w, i) => { if (w !== null) init[w] = i; });
    setWordCell(init);

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    // Reveal at scrambled positions, then start solving
    timeouts.push(setTimeout(() => setReady(true), 60));

    const START_DELAY = 560;
    const MOVE_INTERVAL = 135;

    solveMoves.forEach((move, idx) => {
      timeouts.push(
        setTimeout(() => {
          setWordCell(prev => {
            const word = Object.keys(prev).find(k => prev[k] === move.from);
            if (word === undefined) return prev;
            return { ...prev, [word]: move.to };
          });
        }, START_DELAY + idx * MOVE_INTERVAL)
      );
    });

    return () => { timeouts.forEach(clearTimeout); };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        aspectRatio: "2 / 1",
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.25) 1px, transparent 1px), " +
          "linear-gradient(to bottom, rgba(255,255,255,0.25) 1px, transparent 1px)",
        backgroundSize: `${CELL_W}% ${CELL_H}%`,
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.25)",
      }}
    >
      {/* Scoop corners — fixed per cell, independent of word positions */}
      {Array.from({ length: CELLS }, (_, i) => {
        const scoop = SCOOP_DEFS[SCOOP_CORNERS[i]];
        return (
          <div
            key={`scoop${i}`}
            style={{
              position: "absolute",
              left: `${(i % COLS) * CELL_W}%`,
              top: `${Math.floor(i / COLS) * CELL_H}%`,
              width: `${CELL_W}%`,
              height: `${CELL_H}%`,
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                ...scoop.pos,
                width: SCOOP_SIZE,
                height: SCOOP_SIZE,
                background: `radial-gradient(circle at ${scoop.grad}, transparent ${SCOOP_SIZE}, var(--color-background, #fff) ${SCOOP_SIZE})`,
              }}
            />
          </div>
        );
      })}

      {/* Words — absolutely positioned, animated into their final cells */}
      {WORDS.map(word => {
        const cellIdx = wordCell[word] ?? 0;
        const col = cellIdx % COLS;
        const row = Math.floor(cellIdx / COLS);
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
              transition: ready ? "left 0.11s ease-in-out, top 0.11s ease-in-out" : "none",
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
