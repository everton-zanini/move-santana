import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const TONE_CLASSES = {
  coral: "bg-move-coral text-move-black",
  yellow: "bg-move-yellow text-move-black",
  outline: "border border-move-gray-500 text-move-gray-300",
} as const;

export function Badge({
  children,
  tone = "coral",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof TONE_CLASSES;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 font-accent text-xs font-semibold uppercase tracking-widest",
        TONE_CLASSES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
