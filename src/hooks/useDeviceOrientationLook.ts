"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type OrientationPermission = "unnecessary" | "idle" | "granted" | "denied";

interface DeviceOrientationEventIOS {
  requestPermission?: () => Promise<"granted" | "denied">;
}

function getRequestPermissionFn(): (() => Promise<"granted" | "denied">) | null {
  if (typeof window === "undefined" || typeof DeviceOrientationEvent === "undefined") return null;
  const api = DeviceOrientationEvent as unknown as DeviceOrientationEventIOS;
  return typeof api.requestPermission === "function" ? api.requestPermission.bind(DeviceOrientationEvent) : null;
}

/**
 * Turning the phone physically changes `event.alpha` (compass heading) —
 * we track the delta between consecutive readings and feed it into yaw the
 * same way drag deltas are, rather than anchoring to a fixed "north" (phones
 * disagree on what alpha=0 means, but the *change* since last reading is
 * reliable everywhere).
 *
 * iOS Safari requires an explicit user-gesture permission prompt
 * (`requestPermission`) before it will ever fire the event; other browsers
 * don't gate it at all. `needsPermission` tells the caller whether to show
 * a button for that prompt.
 */
export function useDeviceOrientationLook(active: boolean) {
  const deltaRef = useRef(0);
  const lastAlphaRef = useRef<number | null>(null);
  const needsPermission = getRequestPermissionFn() !== null;
  const [permission, setPermission] = useState<OrientationPermission>(() => {
    if (typeof window === "undefined" || typeof DeviceOrientationEvent === "undefined") return "unnecessary";
    return needsPermission ? "idle" : "granted";
  });

  const requestPermission = useCallback(async () => {
    const fn = getRequestPermissionFn();
    if (!fn) return;
    try {
      setPermission((await fn()) === "granted" ? "granted" : "denied");
    } catch {
      setPermission("denied");
    }
  }, []);

  useEffect(() => {
    if (!active || permission !== "granted") return;

    function onOrientation(event: DeviceOrientationEvent) {
      if (event.alpha === null) return;
      const last = lastAlphaRef.current;
      lastAlphaRef.current = event.alpha;
      if (last === null) return;

      let delta = event.alpha - last;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;
      // Best-effort sign — alpha's rotation direction isn't fully
      // consistent across devices/browsers. Flip this if turning right
      // ends up looking left in practice.
      deltaRef.current -= delta;
    }

    window.addEventListener("deviceorientation", onOrientation);
    return () => {
      window.removeEventListener("deviceorientation", onOrientation);
      lastAlphaRef.current = null;
    };
  }, [active, permission]);

  return { deltaRef, needsPermission, permission, requestPermission };
}
