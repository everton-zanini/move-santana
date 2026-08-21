"use client";

import { createContext, useContext, type ReactNode } from "react";
import { areas } from "@/data/areas";
import { useActiveSection } from "@/hooks/useActiveSection";

const ActiveSectionContext = createContext<string | null>(null);

const sectionIds = areas.map((area) => area.id);

/**
 * Runs the single shared IntersectionObserver (via useActiveSection) once
 * for the whole tree, so HubMap/MobileNavRail/BottomTabBar all read the
 * same active-section value without each mounting their own observer.
 */
export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const activeId = useActiveSection(sectionIds);
  return <ActiveSectionContext.Provider value={activeId}>{children}</ActiveSectionContext.Provider>;
}

export function useActiveSectionId(): string | null {
  return useContext(ActiveSectionContext);
}
