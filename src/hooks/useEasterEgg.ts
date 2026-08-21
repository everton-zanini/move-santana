"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Returns an onClick handler that fires `onTrigger` after `count` clicks
 * land within `windowMs` of each other (resets if the gap is too long).
 */
export function useClickCombo(count: number, windowMs: number, onTrigger: () => void) {
  const clicksRef = useRef<number[]>([]);

  return useCallback(() => {
    const now = Date.now();
    clicksRef.current = [...clicksRef.current, now].filter((t) => now - t <= windowMs);

    if (clicksRef.current.length >= count) {
      clicksRef.current = [];
      onTrigger();
    }
  }, [count, windowMs, onTrigger]);
}

/**
 * Listens for a sequence of keys typed anywhere on the page and fires
 * `onMatch` once the sequence completes. Ignores input while focus is
 * inside a form field so it never interferes with real typing.
 */
export function useKeySequence(sequence: readonly string[], onMatch: () => void) {
  const progressRef = useRef(0);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const isFormField =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      if (isFormField) return;

      const expected = sequence[progressRef.current];
      if (event.key.toLowerCase() === expected) {
        progressRef.current += 1;
        if (progressRef.current === sequence.length) {
          progressRef.current = 0;
          onMatch();
        }
      } else {
        progressRef.current = event.key.toLowerCase() === sequence[0] ? 1 : 0;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sequence, onMatch]);
}
