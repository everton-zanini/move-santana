"use client";

import { useEffect, useState } from "react";
import { m } from "motion/react";
import { GAME } from "@/lib/constants";
import { PixelGlyph, CURSOR_GLYPH, DOOR_GLYPH, ARROW_GLYPH } from "@/components/game/PixelGlyph";

const STEP_MS = GAME.tutorialMs / 3;

const STEPS = [
  { caption: "Arraste pra olhar" },
  { caption: "Use o D-pad pra andar" },
  { caption: "Aperte o botão pra abrir a porta" },
] as const;

/** Three-step pixel-art cue, shown before every session — tap anywhere to skip it. */
export function GameTutorialScreen({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    const advance1 = setTimeout(() => setStep(1), STEP_MS);
    const advance2 = setTimeout(() => setStep(2), STEP_MS * 2);
    const finish = setTimeout(onComplete, GAME.tutorialMs);
    return () => {
      clearTimeout(advance1);
      clearTimeout(advance2);
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
      {step === 0 && (
        <m.div
          animate={{ x: [0, 0, -20, -20, 20, 20, 0, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, times: [0, 0.1, 0.3, 0.4, 0.6, 0.7, 0.9, 1] }}
        >
          <PixelGlyph matrix={CURSOR_GLYPH} className="size-14 text-move-yellow" />
        </m.div>
      )}

      {step === 1 && (
        <div className="relative size-24">
          <m.div
            className="absolute left-1/2 top-0 -translate-x-1/2"
            animate={{ opacity: [1, 1, 0.35, 0.35, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, times: [0, 0.2, 0.3, 0.8, 1] }}
          >
            <PixelGlyph matrix={ARROW_GLYPH} className="size-8 text-move-yellow" />
          </m.div>
          <PixelGlyph
            matrix={ARROW_GLYPH}
            className="absolute bottom-0 left-1/2 size-8 -translate-x-1/2 text-move-gray-500"
            style={{ transform: "translateX(-50%) rotate(180deg)" }}
          />
          <PixelGlyph
            matrix={ARROW_GLYPH}
            className="absolute left-0 top-1/2 size-8 -translate-y-1/2 text-move-gray-500"
            style={{ transform: "translateY(-50%) rotate(-90deg)" }}
          />
          <PixelGlyph
            matrix={ARROW_GLYPH}
            className="absolute right-0 top-1/2 size-8 -translate-y-1/2 text-move-gray-500"
            style={{ transform: "translateY(-50%) rotate(90deg)" }}
          />
        </div>
      )}

      {step === 2 && (
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
        {STEPS[step].caption}
      </p>
      <p className="font-accent text-[10px] uppercase tracking-[0.3em] text-move-gray-500">
        Toque em qualquer lugar pra continuar
      </p>
    </button>
  );
}
