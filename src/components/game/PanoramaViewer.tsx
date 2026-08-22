"use client";

import { useRef } from "react";
import { panoramaHotspots } from "@/data/panoramaHotspots";
import { usePanoramaEngine } from "@/hooks/usePanoramaEngine";
import { DoorMarker } from "@/components/game/DoorMarker";
import { GyroscopePermissionButton } from "@/components/game/GyroscopePermissionButton";

/**
 * Look-around-and-tap exploration: drag (or Arrow keys) pans a placeholder
 * 360° backdrop, and each door is a real, clickable hotspot. Stands in for
 * a proper 360° photo of the space until one exists — swap the backdrop's
 * background-image for a real equirectangular photo later without touching
 * the panning/hotspot math.
 */
export function PanoramaViewer({
  active,
  onDoorReached,
}: {
  active: boolean;
  onDoorReached: (areaId: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const markerElsRef = useRef<Record<string, HTMLButtonElement | null>>({});

  const { focusHotspot, needsOrientationPermission, orientationPermission, requestOrientationPermission } =
    usePanoramaEngine(containerRef, backdropRef, markerElsRef, active);

  return (
    <div ref={containerRef} className="absolute inset-0 touch-none overflow-hidden bg-move-black">
      <div
        ref={backdropRef}
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[400%]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px), url(/logos/m-mark-black.png)",
          backgroundSize: "48px 48px, 200px auto",
          backgroundRepeat: "repeat, repeat-x",
          backgroundPosition: "0 0, 0 65%",
          backgroundColor: "var(--move-ink)",
        }}
      />

      {panoramaHotspots.map((hotspot) => (
        <DoorMarker
          key={hotspot.areaId}
          ref={(el) => {
            markerElsRef.current[hotspot.areaId] = el;
          }}
          areaId={hotspot.areaId}
          label={hotspot.label}
          onSelect={() => onDoorReached(hotspot.areaId)}
          onFocus={() => focusHotspot(hotspot.yawDeg)}
        />
      ))}

      {active && needsOrientationPermission && orientationPermission === "idle" && (
        <GyroscopePermissionButton onRequest={requestOrientationPermission} />
      )}
    </div>
  );
}
