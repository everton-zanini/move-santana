"use client";

import Image from "next/image";
import { m } from "motion/react";
import { site, finalCta } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { fadeUp, staggerContainer } from "@/lib/motion-variants";

export function Footer() {
  return (
    <footer className="border-t border-move-gray-800">
      <Container className="py-16 sm:py-24">
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <m.p
            variants={fadeUp}
            className="font-accent text-xs uppercase tracking-[0.3em] text-move-yellow sm:text-sm"
          >
            {site.slogan}
          </m.p>
          <m.p variants={fadeUp} className="font-display text-3xl uppercase text-move-white sm:text-4xl">
            {finalCta.heading}
          </m.p>
          <m.p
            variants={fadeUp}
            className="font-display text-4xl uppercase leading-none text-move-coral sm:text-6xl"
          >
            {finalCta.subheading}
          </m.p>

          <m.div variants={fadeUp} className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button href={finalCta.primaryHref} variant="coral">
              {finalCta.primaryLabel}
            </Button>
            <Button href="#conecte" variant="outline" showArrow={false}>
              {finalCta.secondaryLabel}
            </Button>
          </m.div>
        </m.div>
      </Container>

      <Container className="flex flex-col items-center gap-4 border-t border-move-gray-800 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <Image
          src="/logos/move-wordmark-white.png"
          alt="Move Santana"
          width={140}
          height={39}
          className="h-auto w-28 opacity-80"
        />
        <p className="text-xs text-move-gray-500">
          {site.church.name} · {site.church.address}
        </p>
      </Container>
    </footer>
  );
}
