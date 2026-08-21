"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { useKeySequence } from "@/hooks/useEasterEgg";
import { useReducedMotionPreference } from "@/providers/ReducedMotionProvider";
import { EASTER_EGG, Z_INDEX } from "@/lib/constants";
import { popIn } from "@/lib/motion-variants";

const MESSAGES = {
  keys: "Você digitou M-O-V-E. Continua assim, essa é a atitude 🔥",
  logo: "Você encontrou algo! Bora fazer parte do Move? 🙌",
} as const;

/**
 * Mounted once near the root. Renders nothing until triggered by either
 * the "move" key sequence (anywhere on the page) or the logo click-combo
 * custom event dispatched from HubMap/HeroGate. Skips the particle burst
 * under reduced motion but keeps the text message.
 */
export function EasterEggHandler() {
  const [message, setMessage] = useState<string | null>(null);
  const reducedMotion = useReducedMotionPreference();

  const reveal = useCallback((text: string) => {
    setMessage(text);
  }, []);

  useKeySequence(EASTER_EGG.keySequence, () => reveal(MESSAGES.keys));

  useEffect(() => {
    function onLogoTrigger() {
      reveal(MESSAGES.logo);
    }
    window.addEventListener(EASTER_EGG.logoTriggerEvent, onLogoTrigger);
    return () => window.removeEventListener(EASTER_EGG.logoTriggerEvent, onLogoTrigger);
  }, [reveal]);

  useEffect(() => {
    if (!message) return;
    const timeout = setTimeout(() => setMessage(null), 5000);
    return () => clearTimeout(timeout);
  }, [message]);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-6 flex justify-center px-4"
      style={{ zIndex: Z_INDEX.toast }}
      aria-live="polite"
    >
      <AnimatePresence>
        {message && (
          <m.div
            role="status"
            variants={popIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="pointer-events-auto flex items-center gap-2 rounded-2xl border border-move-coral bg-move-ink px-5 py-3 shadow-xl"
          >
            {!reducedMotion && <ConfettiBurst />}
            <span className="font-accent text-sm font-semibold text-move-white">{message}</span>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ConfettiBurst() {
  const pieces = Array.from({ length: 8 });
  return (
    <span aria-hidden="true" className="relative size-4">
      {pieces.map((_, i) => (
        <m.span
          key={i}
          className="absolute left-1/2 top-1/2 size-1.5 rounded-full"
          style={{ background: i % 2 === 0 ? "var(--move-yellow)" : "var(--move-coral)" }}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{
            x: Math.cos((i / pieces.length) * Math.PI * 2) * 24,
            y: Math.sin((i / pieces.length) * Math.PI * 2) * 24,
            opacity: 0,
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      ))}
    </span>
  );
}
