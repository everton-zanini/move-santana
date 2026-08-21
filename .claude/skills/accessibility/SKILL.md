---
name: accessibility
description: Concrete a11y checklist for Move Santana — keyboard path through the hub nav and scroll-snap rails, focus styling, ARIA live regions, and no color-only signaling.
---

# Accessibility — Move Santana

## Checklist ao tocar navegação/interação

- **Teclado no hub**: `HubNode`/nós do `MobileNavRail`/`BottomTabBar` são `<a href="#id">` reais — funcionam com Tab/Enter nativamente. Não troque por `<div onClick>`.
- **Foco visível**: já garantido globalmente por `:focus-visible` em `globals.css` (contorno amarelo grosso) — não sobrescreva `outline: none` em nenhum componente novo.
- **Carrosséis** (`MobileNavRail`, `EventList`, `GalleryGrid` no mobile): sempre incluir `role="group" aria-roledescription="carrossel"` no container e, quando o scroll-snap não for suficiente para navegação via teclado, botões prev/next visíveis (ver `MobileNavRail`).
- **Skip link**: `SkipToContent.tsx` deve continuar apontando para `#main`. Não remova.

## Estados e feedback

- Nenhum indicador de estado depende só de cor. `aria-current="true"` nos nós ativos do hub/rail/tab-bar, badge "✓" com texto/contraste no node visitado (não é só uma bolinha colorida).
- Toasts com conteúdo informativo real (`UnlockToast`, `EasterEggHandler`) usam `aria-live="polite"` e `role="status"` — a mensagem é lida mesmo se o usuário não estiver olhando pra tela.
- `EventCountdown` usa `role="timer"` com `aria-label`; o fallback SSR (data formatada) garante que quem usa leitor de tela sem JS ainda recebe a informação.

## Imagens e mídia

- `GalleryImage.alt` é obrigatório no tipo (`src/types/gallery.ts`) — nunca adicione uma imagem à galeria sem `alt` descritivo real (não "foto 1").
- Logos decorativas repetidas (ex.: marca no `HubMap`) podem ter `alt` curto ou vazio quando puramente decorativas ao lado de texto equivalente; a wordmark no Hero/Footer leva `alt="Move Santana"` porque é a única representação textual do nome ali.

## Reduced motion

`prefers-reduced-motion: reduce` já corta drasticamente as animações globais (ver `animations` skill + regra em `globals.css`). Ao criar um efeito novo fora do Framer Motion (canvas, rAF manual), sempre gate com `useReducedMotionPreference()` antes de rodar qualquer loop de animação.
