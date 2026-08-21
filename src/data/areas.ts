import type { MoveArea } from "@/types/area";

// Define os nós do "mapa" do Move. A ordem/posição aqui alimenta tanto o
// HubMap (desktop) quanto o MobileNavRail — adicionar uma área nova aqui,
// criar a seção correspondente em components/sections e apontar o `id` para
// o mesmo valor é o suficiente para ela aparecer na navegação.
export const areas: MoveArea[] = [
  {
    id: "move",
    label: "MOVE",
    description: "Quem somos",
    position: "center",
  },
  {
    id: "eventos",
    label: "EVENTOS",
    description: "Próximo encontro",
    position: "top",
  },
  {
    id: "galeria",
    label: "GALERIA",
    description: "Fotos e vídeos",
    position: "left",
  },
  {
    id: "sobre",
    label: "SOBRE",
    description: "A nossa história",
    position: "right",
  },
  {
    id: "conecte",
    label: "CONECTE-SE",
    description: "Redes e contato",
    position: "bottom",
  },
];
