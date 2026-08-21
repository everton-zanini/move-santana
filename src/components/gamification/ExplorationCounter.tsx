"use client";

import { useExploration } from "@/hooks/useExploration";
import { ProgressRing } from "@/components/ui/ProgressRing";

/** Small, non-intrusive "X de N áreas exploradas" indicator. */
export function ExplorationCounter({ className }: { className?: string }) {
  const { visited, totalCount } = useExploration();

  return (
    <div className={className}>
      <ProgressRing current={visited.length} total={totalCount} />
      <span className="sr-only">
        Você explorou {visited.length} de {totalCount} áreas do Move
      </span>
    </div>
  );
}
