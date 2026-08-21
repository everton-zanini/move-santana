---
name: first-person-game
description: Conventions for the optional raycasting "modo exploração" mini-game — map generation, engine loop, input handling, and its opt-in/reduced-motion rules.
---

# Modo Exploração (jogo em primeira pessoa) — Move Santana

Camada **opcional** sobre a navegação real (hub/scroll), nunca a substitui. Canvas 2D, raycasting DDA estilo Wolfenstein — sem WebGL/Three.js, sem dependência nova.

## Regra de ouro: nunca é o único caminho

O jogo é ativado só por `GameLauncherButton.tsx`, que **some inteiramente** (não desabilita) quando `useReducedMotionPreference()` é `true` — movimento contínuo em primeira pessoa é gatilho clássico de motion sickness, e a navegação real já cobre as mesmas seções. Qualquer novo ponto de entrada pro jogo precisa do mesmo gate. `GameOverlayProvider.open()` também recusa silenciosamente nesse caso (defesa extra).

## Mapa é gerado, nunca hand-typed

`src/data/gameMap.ts` deriva o grid inteiro de `src/data/areas.ts` (posição `top/left/right/bottom` → corredor + porta). Se adicionar uma área nova em `areas.ts` (ver skill `landing-page`), o mapa do jogo já a inclui automaticamente **se** ela usar uma das 4 posições cardinais já suportadas — não há um 5º braço. Não edite `grid`/`doors` à mão.

## Motor (`useGameEngine.ts`)

Mesmo esqueleto de loop de `ParticleField.tsx`: `requestAnimationFrame`, pausa em `visibilitychange`, delta clampado (`GAME.maxDelta`). Estado do jogador vive em `useRef`, nunca `useState` — a 60fps, `setState` a cada frame recriaria a árvore React sem necessidade. Ao atingir uma porta, o motor congela o processamento de input/movimento (`doorFiredRef`) mas continua renderizando até o `GameOverlay` desmontar.

## Input unificado, não por dispositivo

`combineInput` (`lib/gameInput.ts`) **soma** teclado + joystick em vez de escolher um por tipo de dispositivo — teclado físico e joystick touch nunca coexistem na prática, então somar é seguro e evita um branch de plataforma. "Olhar" (`useDragLook`) é idêntico em desktop (mouse) e mobile (touch) — é o único controle de fato unificado entre plataformas, por decisão de produto.

Simultaneidade joystick + olhar no mobile é resolvida por **captura de pointer**, não por lista de exclusão: `VirtualJoystick` fica visualmente por cima do canvas e qualquer toque que comece dentro do seu círculo é capturado (`setPointerCapture`) só por ele; qualquer outro toque no canvas vai para `useDragLook` como um `pointerId` diferente. Ao adicionar um novo controle touch, siga o mesmo padrão em vez de checar "é o mesmo dedo do joystick?" manualmente.

## Renderização

Resolução interna baixa (`GAME.renderWidth/renderHeight`, hoje 320×200) escalada via CSS com `image-rendering: pixelated` — visual retrô de propósito **e** barato em qualquer celular. Sem texturas: cor plana por tipo de célula (parede = coral, porta = amarelo), escurecida nas faces N/S, com fog linear pra `--move-black` por distância (`mixColor` em `lib/raycaster.ts`). Não adicione sprites/texturas sem repensar o orçamento de performance mobile.

## Integração com a gamificação existente

Ao atingir uma porta, `GameOverlay` chama `useExploration().markVisited(areaId)` **imediatamente** (não espera o `IntersectionObserver` da página real) e só depois anima o flash e faz `scrollIntoView` pra seção. Isso significa que o contador de exploração já existente (`ExplorationProvider`) é a fonte única de verdade também para progresso feito dentro do jogo — não crie um contador separado pro modo jogo.
