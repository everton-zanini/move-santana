"use client";

import { m } from "motion/react";
import { Container } from "@/components/ui/Container";
import { useCountdown } from "@/hooks/useCountdown";
import { fadeUp, staggerContainer } from "@/lib/motion-variants";

const LAUNCH_DATE = new Date("2026-10-03T19:00:00-03:00");

const UNITS = [
  { key: "days", label: "Dias" },
  { key: "hours", label: "Horas" },
  { key: "minutes", label: "Minutos" },
  { key: "seconds", label: "Segundos" },
] as const;

export function LaunchCountdown() {
  const countdown = useCountdown(LAUNCH_DATE);

  return (
    <Container className="max-w-3xl">
      <m.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-12 text-center"
      >
        {countdown?.isComplete ? (
          <m.p
            variants={fadeUp}
            className="font-display text-4xl uppercase tracking-wide text-move-yellow sm:text-5xl"
          >
            Chegou a hora!
          </m.p>
        ) : (
          <div className="grid grid-cols-4 gap-3 sm:gap-6">
            {UNITS.map((unit) => (
              <m.div key={unit.key} variants={fadeUp} className="flex flex-col items-center">
                <span className="font-display text-4xl text-move-yellow tabular-nums sm:text-6xl md:text-7xl">
                  {countdown ? String(countdown[unit.key]).padStart(2, "0") : "--"}
                </span>
                <span className="mt-2 font-accent text-xs uppercase tracking-widest text-move-gray-300 sm:text-sm">
                  {unit.label}
                </span>
              </m.div>
            ))}
          </div>
        )}

        <m.p
          variants={fadeUp}
          className="font-display text-2xl uppercase tracking-wide text-move-white sm:text-3xl md:text-4xl"
        >
          Uma nova história começa
        </m.p>
      </m.div>
    </Container>
  );
}
