"use client";

import { useEffect, useState } from "react";
import { m } from "motion/react";
import { PANORAMA } from "@/lib/constants";

const STEP_MS = PANORAMA.tutorialMs / 2;

// 6-wide pixel sprites — same "square blocks, no anti-aliasing" language as
// the loading screen's pixel-art progress bar.
const CURSOR_GLYPH = [
  [1, 0, 0, 0, 0, 0],
  [1, 1, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0],
  [1, 1, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 0],
  [1, 1, 0, 1, 1, 0],
  [1, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 1],
];

const DOOR_GLYPH = [
  [1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1],
];

function PixelGlyph({ matrix, className }: { matrix: number[][]; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${matrix[0].length}, 1fr)`,
        gridTemplateRows: `repeat(${matrix.length}, 1fr)`,
      }}
    >
      {matrix.flatMap((row, y) =>
        row.map((cell, x) => (
          <div key={`${x}-${y}`} className={cell ? "bg-current" : "bg-transparent"} />
        )),
      )}
    </div>
  );
}

/** Two-step pixel-art cue, shown before every session — tap anywhere to skip it. */
export function GameTutorialScreen({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<0 | 1>(0);

  useEffect(() => {
    const advance = setTimeout(() => setStep(1), STEP_MS);
    const finish = setTimeout(onComplete, PANORAMA.tutorialMs);
    return () => {
      clearTimeout(advance);
      clearTimeout(finish);
    };
  }, [onComplete]);

  return (
    <button
      type="button"
      onClick={onComplete}
      aria-label="Pular tutorial"
      className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-move-black px-8 text-center"
    >
      {step === 0 ? (
        <m.div
          animate={{ x: [0, 0, -20, -20, 20, 20, 0, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, times: [0, 0.1, 0.3, 0.4, 0.6, 0.7, 0.9, 1] }}
        >
          <PixelGlyph matrix={CURSOR_GLYPH} className="size-14 text-move-yellow" />
        </m.div>
      ) : (
        <div className="relative">
          <PixelGlyph matrix={DOOR_GLYPH} className="size-14 text-move-coral" />
          <m.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1, 0.55, 1, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, times: [0, 0.35, 0.5, 0.65, 1] }}
          >
            <span className="size-3 bg-move-yellow" />
          </m.div>
        </div>
      )}

      <p className="font-accent text-sm font-semibold uppercase tracking-widest text-move-white">
        {step === 0 ? "Arraste pra olhar" : "Toque na porta pra entrar"}
      </p>
      <p className="font-accent text-[10px] uppercase tracking-[0.3em] text-move-gray-500">
        Toque em qualquer lugar pra continuar
      </p>
    </button>
  );
}
