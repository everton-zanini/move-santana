import type { MoveEvent } from "@/types/event";

// TODO: substitua pelos eventos reais. Basta adicionar/remover objetos deste
// array — a seção de Eventos e o countdown se atualizam automaticamente.
// `date`/`endDate` sempre em ISO 8601 com o fuso explícito (-03:00 = Brasília).
export const events: MoveEvent[] = [
  {
    id: "culto-de-jovens-ago",
    title: "Culto de Jovens",
    description:
      "Uma noite de louvor, palavra e presença de Deus. Vem com a galera.",
    date: "2026-08-29T19:00:00-03:00",
    location: "Igreja Verbo da Vida Santana",
    ctaLabel: "Quero ir",
    ctaHref: "#conecte",
    featured: true,
  },
  {
    id: "noite-de-jogos",
    title: "Noite de Jogos MOVE",
    description: "Competição, resenha e muita zoeira antes do culto.",
    date: "2026-09-12T19:30:00-03:00",
    location: "Salão do Move — Igreja Verbo da Vida Santana",
    ctaLabel: "Confirmar presença",
    ctaHref: "#conecte",
  },
  {
    id: "retiro-move",
    title: "Retiro Move",
    description: "Um fim de semana pra desacelerar, se conectar e crescer.",
    date: "2026-10-03T08:00:00-03:00",
    endDate: "2026-10-04T17:00:00-03:00",
    location: "Sítio Recanto — a confirmar",
    ctaLabel: "Saiba mais",
    ctaHref: "#conecte",
  },
];
