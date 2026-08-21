import type { ReactNode } from "react";

/** Content read by screen readers but never shown visually. */
export function VisuallyHidden({ children }: { children: ReactNode }) {
  return <span className="sr-only">{children}</span>;
}
