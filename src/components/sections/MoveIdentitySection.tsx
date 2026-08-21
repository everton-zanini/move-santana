"use client";

import { m } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sticker } from "@/components/ui/Sticker";
import { HubMap } from "@/components/navigation/HubMap";
import { MobileNavRail } from "@/components/navigation/MobileNavRail";
import { GameLauncherButton } from "@/components/game/GameLauncherButton";
import { fadeUp, staggerContainer } from "@/lib/motion-variants";

export function MoveIdentitySection() {
  return (
    <section id="move" className="scroll-mt-20 py-16 sm:py-24">
      <m.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <m.div variants={fadeUp}>
          <Sticker className="mb-4">é sobre isso</Sticker>
          <SectionHeading
            eyebrow="O que é o Move?"
            title="NÃO SOMOS SÓ UM CULTO."
            description="Somos uma galera. Uma comunidade. Um lugar pra crescer, fazer amigos de verdade e descobrir o que Deus tem pra sua vida — sem enrolação, sem máscara."
            className="mx-auto text-center"
            align="center"
          />
        </m.div>

        <m.div variants={fadeUp} className="mt-12">
          <div className="hidden md:block">
            <HubMap />
          </div>
          <div className="md:hidden">
            <p className="mb-4 text-center font-accent text-xs uppercase tracking-widest text-move-gray-300">
              Explora o Move
            </p>
            <MobileNavRail />
          </div>
        </m.div>

        <m.div variants={fadeUp} className="mt-8 flex justify-center">
          <GameLauncherButton />
        </m.div>
      </m.div>
    </section>
  );
}
