"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";
import { Z_INDEX } from "@/lib/constants";

export function MusicToggleButton() {
  const { isPlaying, toggle } = useMusicPlayer();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isPlaying}
      aria-label={isPlaying ? "Pausar música de fundo" : "Tocar música de fundo"}
      className="fixed left-4 top-4 flex size-11 items-center justify-center rounded-full border border-move-gray-700 bg-move-black/80 text-move-white backdrop-blur transition-colors hover:border-move-yellow hover:text-move-yellow"
      style={{ zIndex: Z_INDEX.nav }}
    >
      {isPlaying ? (
        <Volume2 className="size-5" aria-hidden="true" />
      ) : (
        <VolumeX className="size-5" aria-hidden="true" />
      )}
    </button>
  );
}
