---
name: first-person-game
description: Conventions for the optional panorama "modo exploração" mini-experience — hotspot generation, drag/keyboard input, tutorial/loading sequencing, and its opt-in/reduced-motion rules.
---

# Modo Exploração (panorama) — Move Santana

Camada **opcional** sobre a navegação real (hub/scroll), nunca a substitui. Cena panorâmica falso-360°: arrastar (ou setas) gira a câmera, tocar numa porta navega. CSS + DOM puro — sem canvas, sem WebGL/Three.js, sem dependência nova.

## Regra de ouro: nunca é o único caminho

O jogo é ativado só por `GameLauncherButton.tsx`, que **some inteiramente** (não desabilita) quando `useReducedMotionPreference()` é `true` — a navegação real já cobre as mesmas seções. Qualquer novo ponto de entrada precisa do mesmo gate. `GameOverlayProvider.open()` também recusa silenciosamente nesse caso (defesa extra).

## Hotspots são gerados, nunca hand-typed

`src/data/panoramaHotspots.ts` deriva a lista de portas de `src/data/areas.ts`, distribuindo-as uniformemente em 360° (`360 / areas.length` por área, na ordem do array) — não há cenário panorâmico real ainda (foto 360°), então a distribuição por `position` (top/left/right/bottom) do hub map não se aplica aqui. Se adicionar uma área nova em `areas.ts` (ver skill `landing-page`), ela já ganha uma porta automaticamente, só reespaçada. Não edite `panoramaHotspots.ts` à mão.

## Fases da sessão (`GameSession.tsx`)

Cada abertura do modo passa por 3 fases, sempre na mesma ordem, sempre do zero (o componente **remonta** a cada abertura, então nunca precisa de reset manual):

1. `tutorial` — `GameTutorialScreen`, dois passos em pixel art ("arraste pra olhar" / "toque na porta pra entrar"), avança automaticamente após `PANORAMA.tutorialMs` ou ao tocar em qualquer lugar da tela.
2. `loading` — `GameLoadingScreen` com a barra de progresso pixel-art, puramente ilustrativa (não reflete carregamento real de asset nenhum — não há textura pra carregar).
3. `ready` — `PanoramaViewer` fica interativo.

Ao adicionar uma nova etapa introdutória, estenda esse enum (`GamePhase` em `types/game.ts`) em vez de empilhar mais booleanos soltos.

## Motor (`usePanoramaEngine.ts`)

Loop `requestAnimationFrame` que lê o delta acumulado de `useDragLook` (mesmo hook, idêntico em mouse e touch) e as setas `ArrowLeft`/`ArrowRight`, escreve o yaw resultante direto no DOM (`backdropRef.style.transform` + `updateHotspotMarkers`) — **não** via `useState`, pra não re-renderizar a 60fps arrastando. Diferente do raycaster antigo, não há física/tempo-dependência real aqui (yaw só muda por input discreto), então o loop não precisa de clamp de delta nem pausa em `visibilitychange`.

## Projeção dos hotspots (`lib/panoramaProjection.ts`)

`projectHotspot(yaw, hotspotYaw, fovDeg)` é matemática pura (sem DOM) — diferença angular normalizada pra `[-180,180]`, mapeada linearmente pro `PANORAMA.fovDeg` visível. Fora do FOV, o hotspot fica `opacity:0` **e** `pointer-events:none` (não só invisível — senão ele intercepta cliques destinados ao fundo). `DoorMarker` é um `<button>` real e navegável por Tab; ao ganhar foco, `PanoramaViewer` chama `focusHotspot` pra centralizar a câmera nele — é assim que teclado alcança uma porta que está fora do FOV atual sem precisar "arrastar" via teclado primeiro.

## Cenário placeholder

`PanoramaViewer`'s backdrop é uma textura CSS repetível (marca d'água do logo + estrelas via `radial-gradient`), **não** uma foto 360° real — ainda não existe uma. Quando houver, troque só o `backgroundImage`/`backgroundSize` do backdrop por uma foto equirretangular; a matemática de pan (`translateX(-(yaw/360)*100%)`) e a projeção dos hotspots não mudam.

## Integração com a gamificação existente

Ao tocar numa porta, `GameSession` chama `useExploration().markVisited(areaId)` **imediatamente** (não espera o `IntersectionObserver` da página real) e só depois anima o flash (`DoorTransitionFlash`) e faz `scrollIntoView` pra seção. O contador de exploração existente (`ExplorationProvider`) continua sendo a fonte única de verdade também pro progresso feito dentro do modo panorama — não crie um contador separado.
