import type { MoveEvent } from "@/types/event";

/**
 * Resolves which event should drive the countdown: an explicit `featured`
 * event wins if it's still in the future, otherwise the soonest upcoming one.
 */
export function getNextEvent(
  events: readonly MoveEvent[],
  now: Date = new Date(),
): MoveEvent | null {
  const upcoming = events
    .filter((event) => new Date(event.date).getTime() >= now.getTime())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (upcoming.length === 0) return null;

  const featured = upcoming.find((event) => event.featured);
  return featured ?? upcoming[0];
}

export function formatEventDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}

export function formatEventDay(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit" });
}

export function formatEventMonth(iso: string): string {
  return new Date(iso)
    .toLocaleDateString("pt-BR", { month: "short" })
    .replace(".", "")
    .toUpperCase();
}

export function formatEventTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export function getCountdownParts(targetIso: string, now: Date = new Date()): CountdownParts {
  const diff = new Date(targetIso).getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isPast: false,
  };
}
