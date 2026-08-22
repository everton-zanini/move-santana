---
name: landing-page
description: Section composition, copy tone, and the end-to-end recipe for adding a new "area" to the Move Santana one-page hub experience.
---

# Landing Page — Move Santana

## Modelo de navegação (não mude sem motivo forte)

O site é **uma única página** (`/`). O "mapa de game" (`HubMap`/`MobileNavRail`) é navegação real que rola suavemente até seções sempre presentes no DOM (`<section id="...">`) — não são rotas separadas. Isso existe para manter SEO/acessibilidade simples e permitir que o mobile vire um rail de cards sem duplicar conteúdo. Ver decisão arquitetural no plano do projeto antes de propor rotas por área.

## Como adicionar uma área nova, ponta a ponta

1. Adicione a entrada em `src/data/areas.ts` (id, label, description, position no grid).
2. Crie o componente da seção em `src/components/sections/NovaAreaSection.tsx`, com `<section id="mesmo-id-do-passo-1">` — ou, como a área "comece" faz, aponte o `id` para uma seção já existente (o `<footer id="comece">`) em vez de criar uma seção nova, se o destino já existir na página.
3. Inclua a seção em `src/app/page.tsx`, na ordem desejada (pule este passo se reaproveitar uma seção existente, como no caso acima).
4. Se a área tiver conteúdo editável (links, textos, etc.), crie o tipo em `src/types/` e os dados em `src/data/`.
5. Nada mais precisa mudar — `HubMap`, `MobileNavRail`, `BottomTabBar` e o contador de exploração leem `areas.ts` dinamicamente.

## Ordem e propósito de cada seção

Hero (gate) → Move (identidade + mapa de exploração) → Galeria (prova social/vibe) → Sobre (contexto institucional mínimo, com dia/horário fixo do culto) → Conecte (canais) → Footer (CTA final "Comece" + reforço institucional). Não existe mais uma seção dedicada a "próximos eventos" — o culto é recorrente (todo último sábado do mês) e essa informação fixa mora no card "Quando" da seção Sobre; a área "comece" no mapa de navegação leva direto ao CTA final, não a uma seção de eventos.

## Tom de voz

Direto, jovem, sem clichê de "jovens do século XXI" e sem linguagem corporativa/institucional pesada. Frases curtas, fáceis de ler no celular. Toda copy nova deve soar como "escrita por jovens pra jovens", nunca como comunicado oficial de igreja. Textos ficam em `src/data/site.ts` e dentro de cada componente de seção — nunca hardcode string de copy em componentes genéricos (`ui/*`).

## CTAs

Todo CTA usa `components/ui/Button.tsx` com `variant="coral"` para a ação primária de cada seção e `variant="outline"` para secundária — não crie um novo estilo de botão ad-hoc.
