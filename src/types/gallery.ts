export interface GalleryImage {
  id: string;
  src: string;
  /** Required (not optional) so every image ships real alt text. */
  alt: string;
  width: number;
  height: number;
  eventId?: string;
  featured?: boolean;
}
