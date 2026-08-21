"use client";

import type { ReactNode } from "react";
import { useCallback } from "react";
import { useClickCombo } from "@/hooks/useEasterEgg";
import { EASTER_EGG } from "@/lib/constants";

/** Wraps the hub logo: acts as a normal link to #move, but 5 quick clicks trigger the easter egg. */
export function LogoClickTrigger({ children }: { children: ReactNode }) {
  const triggerEasterEgg = useCallback(() => {
    window.dispatchEvent(new CustomEvent(EASTER_EGG.logoTriggerEvent));
  }, []);

  const handleClick = useClickCombo(
    EASTER_EGG.logoClickCount,
    EASTER_EGG.logoClickWindowMs,
    triggerEasterEgg,
  );

  return (
    <a href="#move" onClick={handleClick} aria-label="Ir para a área Move">
      {children}
    </a>
  );
}
