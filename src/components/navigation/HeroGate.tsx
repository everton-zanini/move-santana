"use client";

import Image from "next/image";
import { m } from "motion/react";
import { ChevronDown } from "lucide-react";
import { site, heroCta } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { ParticleField } from "@/components/effects/ParticleField";
import { ParallaxLayer } from "@/components/effects/ParallaxLayer";
import { fadeUp, staggerContainer } from "@/lib/motion-variants";

export function HeroGate() {
  return (
    <section className="scanlines relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 text-center">
      <ParticleField />

      <ParallaxLayer
        intensity={14}
        className="pointer-events-none absolute -left-16 top-16 h-40 w-40 rounded-full bg-move-coral/20 blur-3xl sm:h-64 sm:w-64"
      >
        <div />
      </ParallaxLayer>
      <ParallaxLayer
        intensity={-10}
        className="pointer-events-none absolute -right-10 bottom-24 h-48 w-48 rounded-full bg-move-yellow/15 blur-3xl sm:h-72 sm:w-72"
      >
        <div />
      </ParallaxLayer>

      <m.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center gap-6"
      >
        <m.div variants={fadeUp}>
          <Image
            src="/logos/move-graffiti-white.png"
            alt="Move Santana"
            width={468}
            height={119}
            priority
            className="h-auto w-[min(85vw,460px)] drop-shadow-[0_0_28px_rgba(255,248,0,0.25)]"
          />
        </m.div>

        <m.p
          variants={fadeUp}
          className="font-accent text-lg font-bold uppercase tracking-[0.35em] text-move-coral sm:text-xl"
        >
          Santana
        </m.p>

        <m.p
          variants={fadeUp}
          className="font-display text-3xl uppercase leading-[0.95] text-move-white sm:text-5xl md:text-6xl"
        >
          {site.tagline}
        </m.p>

        <m.p variants={fadeUp} className="max-w-md text-base text-move-gray-300 sm:text-lg">
          {site.subtagline}
        </m.p>

        <m.p
          variants={fadeUp}
          className="max-w-sm font-accent text-sm italic text-move-yellow sm:text-base"
        >
          “{site.slogan}”
        </m.p>

        <m.div variants={fadeUp}>
          <Button href="#move" variant="coral">
            {heroCta.label}
          </Button>
        </m.div>
      </m.div>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-8 flex flex-col items-center gap-1 text-move-gray-500"
      >
        <span className="font-accent text-[10px] uppercase tracking-[0.3em]">
          {heroCta.scrollLabel}
        </span>
        <ChevronDown className="size-4 animate-bounce" aria-hidden="true" />
      </m.div>
    </section>
  );
}
