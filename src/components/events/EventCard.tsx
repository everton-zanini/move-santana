import { MapPin } from "lucide-react";
import type { MoveEvent } from "@/types/event";
import { formatEventDay, formatEventMonth, formatEventTime } from "@/lib/date";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function EventCard({ event, featured = false }: { event: MoveEvent; featured?: boolean }) {
  return (
    <article
      className="flex min-w-72 shrink-0 snap-start flex-col gap-4 rounded-3xl border border-move-gray-700 bg-move-ink p-6 sm:min-w-0"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-5xl leading-none text-move-white">
            {formatEventDay(event.date)}
          </span>
          <span className="font-accent text-sm font-bold uppercase text-move-coral">
            {formatEventMonth(event.date)}
          </span>
        </div>
        {featured && <Badge tone="yellow">Próximo</Badge>}
      </div>

      <div>
        <h3 className="font-display text-xl uppercase text-move-white sm:text-2xl">
          {event.title}
        </h3>
        <p className="mt-1 text-sm text-move-gray-300">{event.description}</p>
      </div>

      <div className="flex flex-col gap-1 font-accent text-xs text-move-gray-300">
        <span>{formatEventTime(event.date)}</span>
        <span className="flex items-center gap-1.5">
          <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
          {event.location}
        </span>
      </div>

      {event.ctaHref && (
        <Button href={event.ctaHref} variant="outline" className="self-start">
          {event.ctaLabel ?? "Ver evento"}
        </Button>
      )}
    </article>
  );
}
