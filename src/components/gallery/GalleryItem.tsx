import Image from "next/image";
import type { GalleryImage } from "@/types/gallery";
import { cn } from "@/lib/utils";

export function GalleryItem({
  image,
  onOpen,
  className,
}: {
  image: GalleryImage;
  onOpen: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group relative min-w-48 shrink-0 snap-start overflow-hidden rounded-2xl bg-move-ink sm:min-w-0 sm:shrink sm:h-full sm:w-full",
        className,
      )}
      aria-label={`Ver foto: ${image.alt}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        sizes="(max-width: 640px) 45vw, 33vw"
        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-full"
      />
    </button>
  );
}
