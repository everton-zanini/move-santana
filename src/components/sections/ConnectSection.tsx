"use client";

import { m } from "motion/react";
import { socialLinks } from "@/data/social";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialGrid } from "@/components/social/SocialGrid";
import { fadeUp } from "@/lib/motion-variants";

export function ConnectSection() {
  return (
    <section id="conecte" className="scroll-mt-20 border-t border-move-gray-800 py-16 sm:py-24">
      <Container>
        <m.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
          <SectionHeading
            eyebrow="Conecte-se"
            title="ENCONTRE A GENTE ONLINE"
            description="Segue, entra no grupo, se conecta. É por aqui que a gente combina tudo."
            align="center"
            className="mx-auto"
          />
          <div className="mt-10">
            <SocialGrid links={socialLinks} />
          </div>
        </m.div>
      </Container>
    </section>
  );
}
