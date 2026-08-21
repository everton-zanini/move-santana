import type { GalleryImage } from "@/types/gallery";

// TODO: substitua pelos registros reais em public/gallery/*.jpg — mantenha
// `width`/`height` corretos (evita layout shift) e um `alt` descritivo.
export const galleryImages: GalleryImage[] = [
  {
    id: "culto-01",
    src: "/gallery/placeholder-1.svg",
    alt: "Jovens reunidos durante o culto do Move Santana",
    width: 1200,
    height: 1500,
    featured: true,
  },
  {
    id: "culto-02",
    src: "/gallery/placeholder-2.svg",
    alt: "Banda de louvor do Move se apresentando no palco",
    width: 1600,
    height: 1067,
  },
  {
    id: "encontro-01",
    src: "/gallery/placeholder-3.svg",
    alt: "Grupo de jovens conversando e rindo depois do encontro",
    width: 1200,
    height: 1200,
  },
  {
    id: "retiro-01",
    src: "/gallery/placeholder-4.svg",
    alt: "Jovens do Move em roda durante o retiro",
    width: 1600,
    height: 1067,
  },
  {
    id: "jogos-01",
    src: "/gallery/placeholder-5.svg",
    alt: "Dinâmica em equipe na Noite de Jogos do Move",
    width: 1200,
    height: 1500,
  },
  {
    id: "culto-03",
    src: "/gallery/placeholder-6.svg",
    alt: "Momento de oração em conjunto no culto de jovens",
    width: 1600,
    height: 1067,
  },
];
