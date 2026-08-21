"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import type { GalleryImage } from "@/types/gallery";
import { fadeIn } from "@/lib/motion-variants";
import { Z_INDEX } from "@/lib/constants";

export function GalleryLightbox({
  images,
  activeIndex,
  onClose,
  onNavigate,
}: {
  images: GalleryImage[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = activeIndex !== null;
  const image = isOpen ? images[activeIndex] : null;

  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight" && activeIndex !== null) {
        onNavigate((activeIndex + 1) % images.length);
      }
      if (event.key === "ArrowLeft" && activeIndex !== null) {
        onNavigate((activeIndex - 1 + images.length) % images.length);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeIndex, images.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {isOpen && image && (
        <m.div
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 flex items-center justify-center bg-move-black/90 p-4"
          style={{ zIndex: Z_INDEX.toast }}
          onClick={onClose}
        >
          <div
            className="relative max-h-full max-w-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="max-h-[80vh] w-auto rounded-xl object-contain"
            />
            <p className="mt-2 text-center text-sm text-move-gray-300">{image.alt}</p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-move-ink text-move-white"
          >
            <X className="size-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNavigate((activeIndex! - 1 + images.length) % images.length);
            }}
            aria-label="Foto anterior"
            className="absolute left-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-move-ink text-move-white sm:left-4"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNavigate((activeIndex! + 1) % images.length);
            }}
            aria-label="Próxima foto"
            className="absolute right-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-move-ink text-move-white sm:right-4"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </m.div>
      )}
    </AnimatePresence>
  );
}
