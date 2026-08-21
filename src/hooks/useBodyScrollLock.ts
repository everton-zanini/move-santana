"use client";

import { useEffect } from "react";

/** Locks `document.body` scroll while `active` is true. Restores the previous value on cleanup. */
export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [active]);
}
