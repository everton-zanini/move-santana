"use client";

import { m } from "motion/react";
import { MapPin, Clock } from "lucide-react";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion-variants";

export function AboutSection() {
  return (
    <section id="sobre" className="scroll-mt-20 border-t border-move-gray-800 py-16 sm:py-24">
      <Container>
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-10 sm:grid-cols-2 sm:items-center"
        >
          <m.div variants={fadeUp}>
            <SectionHeading
              eyebrow="Sobre"
              title="DE ONDE A GENTE VEM"
              description={`O Move Santana é a juventude da ${site.church.name}. Um espaço pra viver a fé de um jeito real, com música boa, gente de verdade e Jesus no centro de tudo.`}
            />
            <blockquote className="mt-6 border-l-2 border-move-coral pl-4 font-accent text-sm italic text-move-yellow sm:text-base">
              “{site.slogan}”
            </blockquote>
          </m.div>

          <m.div variants={fadeUp} className="flex flex-col gap-4 rounded-3xl border border-move-gray-700 bg-move-ink p-6">
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-move-coral" aria-hidden="true" />
              <div>
                <p className="font-accent text-xs uppercase tracking-widest text-move-gray-300">
                  Quando
                </p>
                <p className="text-move-white">Cultos de jovens quinzenais — confira a data certa em Eventos</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-move-coral" aria-hidden="true" />
              <div>
                <p className="font-accent text-xs uppercase tracking-widest text-move-gray-300">
                  Onde
                </p>
                <p className="text-move-white">{site.church.address}</p>
              </div>
            </div>
          </m.div>
        </m.div>
      </Container>
    </section>
  );
}
