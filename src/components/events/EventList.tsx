import type { MoveEvent } from "@/types/event";
import { EventCard } from "@/components/events/EventCard";
import { getNextEvent } from "@/lib/date";

export function EventList({ events }: { events: MoveEvent[] }) {
  const next = getNextEvent(events);

  return (
    <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} featured={event.id === next?.id} />
      ))}
    </div>
  );
}
