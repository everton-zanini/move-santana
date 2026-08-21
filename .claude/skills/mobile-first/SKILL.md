---
name: mobile-first
description: Mobile-first rules for Move Santana — breakpoints, touch targets, and the hub-map-to-rail transformation.
---

# Mobile First — Move Santana

A maioria dos visitantes acessa pelo celular. Todo componente é desenhado/revisado mobile-first.

## Ordem de verificação

Projete e teste sempre nesta ordem, nunca ao contrário:

1. 360px (Android compacto)
2. 390px (iPhone padrão)
3. 412px (Android padrão)
4. Tablet (~768px)
5. Desktop 1440px
6. Desktop 1920px

Tailwind aqui é mobile-first por padrão (classes sem prefixo = mobile; `sm:`/`md:`/`lg:` adicionam para telas maiores) — nunca escreva a versão desktop primeiro e "encolha" depois.

## Regra específica deste projeto: hub → rail, nunca 1:1

`HubMap.tsx` (o mapa em cruz com MOVE no centro) é **desktop-only** (`hidden md:block`). No mobile, a mesma lista de áreas (`src/data/areas.ts`) vira `MobileNavRail.tsx` — um carrossel horizontal com `scroll-snap`, não uma versão minúscula do mapa. Se uma área nova for adicionada em `areas.ts`, ela precisa aparecer corretamente nos dois componentes — não tente unificar num só componente responsivo com o mapa espremido.

## Touch e interação

- Toda área clicável tem no mínimo `min-h-12` (48px) — ver `Button.tsx`, `BottomTabBar.tsx`.
- Carrosséis (`MobileNavRail`, `EventList`, `GalleryGrid`) usam `scroll-snap` nativo, nunca uma lib de swipe — mais leve e funciona com touch/trackpad/teclado de graça.
- Efeitos de mouse (parallax, cursor customizado, hub hover) são `hidden`/gated via `useIsTouchDevice` — nunca tente adaptar hover para touch, apenas remova.
- `BottomTabBar` fixo respeita `env(safe-area-inset-bottom)` para não colidir com a barra de gestos do iOS.

## Performance mobile

Toda imagem usa `next/image` com `sizes` correto para o breakpoint mobile real (não assuma desktop e deixe o browser reamostrar). Nenhuma animação pesada (partículas, cursor customizado) roda em touch — ver `performance` skill.
