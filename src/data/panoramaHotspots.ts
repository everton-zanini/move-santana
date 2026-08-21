import { areas } from "@/data/areas";
import type { PanoramaHotspot } from "@/types/game";

// No real 360° photo yet — spread doors evenly around the circle in the
// order areas.ts already defines, rather than areas.ts's top/left/right/bottom
// `position` (which describes the hub map layout, not a physical panorama).
export const panoramaHotspots: PanoramaHotspot[] = areas.map((area, i) => ({
  areaId: area.id,
  label: area.label,
  yawDeg: (360 / areas.length) * i,
}));
