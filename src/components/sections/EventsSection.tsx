"use client";

import { m } from "motion/react";
import { events } from "@/data/events";
import { getNextEvent } from "@/lib/date";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EventCountdown } from "@/components/events/EventCountdown";
import { EventList } from "@/components/events/EventList";
import { fadeUp, staggerContainer } from "@/lib/motion-variants";

export function EventsSection() {
  const next = getNextEvent(events);

  return (
    <section id="eventos" className="scroll-mt-20 border-t border-move-gray-800 py-16 sm:py-24">
      <Container>
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <m.div variants={fadeUp} className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="Next Move" title="PRÓXIMOS ENCONTROS" />
            {next && <EventCountdown targetIso={next.date} />}
          </m.div>

          <m.div variants={fadeUp} className="mt-10 -mx-5 sm:mx-0">
            <EventList events={events} />
          </m.div>
        </m.div>
      </Container>
    </section>
  );
}
