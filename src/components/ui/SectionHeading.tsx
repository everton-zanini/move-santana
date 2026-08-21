import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="font-accent text-sm font-semibold uppercase tracking-[0.2em] text-move-coral">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 font-display text-4xl uppercase leading-[0.95] tracking-tight text-move-white sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-move-gray-300 sm:text-lg">{description}</p>
      )}
    </div>
  );
}
