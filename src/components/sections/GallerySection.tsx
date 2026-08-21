"use client";

import { m } from "motion/react";
import { galleryImages } from "@/data/gallery";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { fadeUp } from "@/lib/motion-variants";

export function GallerySection() {
  return (
    <section id="galeria" className="scroll-mt-20 border-t border-move-gray-800 py-16 sm:py-24">
      <m.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
        <Container>
          <SectionHeading eyebrow="Galeria" title="A VIBE É ESSA" align="center" className="mx-auto" />
        </Container>

        <div className="mt-10">
          <Container className="px-0 sm:px-8">
            <GalleryGrid images={galleryImages} />
          </Container>
        </div>
      </m.div>
    </section>
  );
}
