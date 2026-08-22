"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export function GameHUD({ onClose }: { onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // The background becomes `inert` the moment this overlay opens, which
    // blurs whatever was focused (the launcher button) without moving focus
    // anywhere — give keyboard users a real starting point inside it.
    closeButtonRef.current?.focus();
  }, []);

  return (
    <>
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Fechar modo exploração"
        className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-move-ink/80 text-move-white"
      >
        <X className="size-5" aria-hidden="true" />
      </button>

      <p
        aria-hidden="true"
        className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap font-accent text-[11px] uppercase tracking-widest text-move-gray-300"
      >
        Arraste pra olhar · toque numa porta pra entrar
      </p>
    </>
  );
}
