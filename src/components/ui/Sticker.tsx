import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Decorative rotated label — street-poster "sticker" accent. Purely visual. */
export function Sticker({
  children,
  rotate = "-3deg",
  tone = "yellow",
  className,
}: {
  children: ReactNode;
  rotate?: string;
  tone?: "yellow" | "coral";
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block select-none rounded-md px-3 py-1 font-accent text-xs font-bold uppercase tracking-widest shadow-[0_4px_0_0_rgba(0,0,0,0.4)]",
        tone === "yellow" ? "bg-move-yellow text-move-black" : "bg-move-coral text-move-black",
        className,
      )}
      style={{ transform: `rotate(${rotate})` }}
    >
      {children}
    </span>
  );
}
