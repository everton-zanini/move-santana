"use client";

import { createContext, useCallback, useMemo, useRef, useState, type ReactNode } from "react";

export interface MusicPlayerContextValue {
  isPlaying: boolean;
  toggle: () => void;
}

export const MusicPlayerContext = createContext<MusicPlayerContextValue | null>(null);

/**
 * Site-wide background track. Never autoplays — browsers block unmuted
 * audio without a user gesture anyway, and starting sound on someone
 * unprompted is bad manners regardless. `<audio>` lives here (mounted once
 * at the layout root) so it keeps playing across the single-page site
 * instead of restarting whenever a section re-renders.
 */
export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [isPlaying]);

  const value = useMemo<MusicPlayerContextValue>(() => ({ isPlaying, toggle }), [isPlaying, toggle]);

  return (
    <MusicPlayerContext.Provider value={value}>
      <audio ref={audioRef} src="/audio/trilha-sonora.mp3" loop preload="none" />
      {children}
    </MusicPlayerContext.Provider>
  );
}
