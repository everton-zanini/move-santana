export interface MoveEvent {
  /** Slug used as React key and anchor target, e.g. "culto-de-jovens-set". */
  id: string;
  title: string;
  description: string;
  /** ISO 8601 with explicit timezone offset, e.g. "2026-09-12T19:30:00-03:00". */
  date: string;
  endDate?: string;
  location: string;
  imageSrc?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Pins this event as the one shown in the countdown, overriding date-based selection. */
  featured?: boolean;
}
