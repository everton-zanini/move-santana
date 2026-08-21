import {
  Compass,
  CalendarDays,
  Image as ImageIcon,
  Info,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";

/** Shared area → icon mapping, used by BottomTabBar and the in-game door markers. */
export const AREA_ICONS: Record<string, LucideIcon> = {
  move: Compass,
  eventos: CalendarDays,
  galeria: ImageIcon,
  sobre: Info,
  conecte: MessageCircle,
};
