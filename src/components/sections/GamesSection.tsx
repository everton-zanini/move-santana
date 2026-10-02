"use client";

import { m } from "motion/react";
import { arcadeGames, COMING_SOON_SLOTS } from "@/data/games";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GameCard } from "@/components/games/GameCard";
import { fadeUp } from "@/lib/motion-variants";

export function GamesSection() {
  return (
    <section id="jogos" className="scroll-mt-20 border-t border-move-gray-800 py-16 sm:py-24">
      <m.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
        <Container>
          <SectionHeading
            eyebrow="Fliperama Move"
            title="JOGOS"
            description="Escolha um jogo e aperte start."
            align="center"
            className="mx-auto"
          />
          <p className="mt-4 text-center font-accent text-sm uppercase tracking-[0.3em] text-move-yellow motion-safe:animate-pulse">
            ▶ Press Start
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {arcadeGames.map((game, i) => (
              <GameCard key={game.id} game={game} index={i} />
            ))}
            {Array.from({ length: COMING_SOON_SLOTS }, (_, i) => (
              <div
                key={i}
                className="flex min-h-64 items-center justify-center border-4 border-dashed border-move-gray-700 p-4 text-center font-accent text-sm uppercase tracking-widest text-move-gray-500"
              >
                Em breve
              </div>
            ))}
          </div>
        </Container>
      </m.div>
    </section>
  );
}
