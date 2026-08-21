"use client";

import { useEffect, useState } from "react";
import { useExploration } from "@/hooks/useExploration";

/**
 * One shared IntersectionObserver over every area's `<section id>`. Drives
 * hub highlighting, keeps the URL hash in sync (via `replaceState`, so it
 * never triggers a real navigation/scroll jump), and marks areas as
 * explored — all from a single observer instead of one per section.
 */
export function useActiveSection(sectionIds: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { markVisited } = useExploration();

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        const id = visible.target.id;
        setActiveId(id);
        markVisited(id);

        if (window.location.hash !== `#${id}`) {
          window.history.replaceState(null, "", `#${id}`);
        }
      },
      { threshold: [0.3, 0.5, 0.7], rootMargin: "-15% 0px -15% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds, markVisited]);

  return activeId;
}
