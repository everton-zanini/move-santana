"use client";

import { useState } from "react";
import type { GalleryImage } from "@/types/gallery";
import { GalleryItem } from "@/components/gallery/GalleryItem";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import { cn } from "@/lib/utils";

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:grid sm:grid-cols-3 sm:auto-rows-[160px] sm:[grid-auto-flow:dense] sm:gap-4 sm:overflow-visible sm:px-0">
        {images.map((image, index) => (
          <GalleryItem
            key={image.id}
            image={image}
            onOpen={() => setActiveIndex(index)}
            className={cn(image.featured && "sm:col-span-2 sm:row-span-2")}
          />
        ))}
      </div>

      <GalleryLightbox
        images={images}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </>
  );
}
