"use client";

import type { ReactNode } from "react";
import { useGameOverlay } from "@/hooks/useGameOverlay";

/**
 * The game overlay is a `<div role="dialog">`, not a native `<dialog>`, so
 * nothing stops Tab from reaching focusable elements in the page behind it
 * on its own. `inert` removes the entire background from the tab order
 * (and from click/AT access) while the overlay is open — the standard fix,
 * simpler and more robust than hand-rolling a focus-trap keydown handler.
 */
export function BackgroundInertGate({ children }: { children: ReactNode }) {
  const { isOpen } = useGameOverlay();
  return <div inert={isOpen}>{children}</div>;
}
