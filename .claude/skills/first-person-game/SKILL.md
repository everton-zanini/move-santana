---
name: first-person-game
description: Conventions for the optional raycasting "modo exploração" mini-game — open-world map generation, engine loop, D-pad/drag/keyboard input, the explicit door-open button, and its opt-in/reduced-motion rules.
---

# Modo Exploração (jogo em primeira pessoa) — Move Santana

Camada **opcional** sobre a navegação real (hub/scroll), nunca a substitui. Canvas 2D, raycasting DDA estilo Wolfenstein, mundo aberto (prédios num plaza) — sem WebGL/Three.js, sem dependência nova.

Já existiu uma versão em "modo panorama" (olhar de um ponto fixo, sem andar) e uma com giroscópio — nenhuma das duas ficou boa (o giroscópio "não ficou bom" no feedback do usuário) e ambas foram revertidas. O código de referência de qualquer fase anterior sempre está no histórico do git se precisar consultar; não hesite em usar `git show <commit>:<path>` em vez de reconstruir do zero.

## Regra de ouro: nunca é o único caminho

O jogo é ativado só por `GameLauncherButton.tsx`, que **some inteiramente** (não desabilita) quando `useReducedMotionPreference()` é `true` — movimento contínuo em primeira pessoa é gatilho clássico de motion sickness, e a navegação real já cobre as mesmas seções. Qualquer novo ponto de entrada pro jogo precisa do mesmo gate. `GameOverlayProvider.open()` também recusa silenciosamente nesse caso (defesa extra).

## Mapa é gerado, nunca hand-typed

`src/data/gameMap.ts` deriva o grid inteiro de `src/data/areas.ts` (posição `top/left/right/bottom` → prédio + porta na face voltada pro centro do plaza). Se adicionar uma área nova em `areas.ts` (ver skill `landing-page`), o mapa do jogo já a inclui automaticamente **se** ela usar uma das 4 posições cardinais já suportadas — não há um 5º braço. Não edite `grid`/`doors` à mão.

## Portas abrem por botão, não por contato

Diferente de versões anteriores, **andar até uma porta não abre ela automaticamente**. `useGameEngine.ts` calcula a cada frame, por proximidade (`findFacedDoor`, distância direta jogador↔porta, não pelo raycast — ver comentário no código sobre por que o raycast falha bem na porta), qual porta (se houver) está a até `GAME.doorOpenRangeUnits` de distância, e só chama `onFacedDoorChange` quando esse valor **muda** (não every frame — mantém o React state update raro). `DoorOpenButton.tsx` (canto inferior direito) fica desabilitado até isso ser não-nulo; `Enter`/`E` no teclado faz o mesmo. Tocar direto na porta (`DoorMarker`) também funciona, como atalho.

## Motor (`useGameEngine.ts`)

Mesmo esqueleto de loop de `ParticleField.tsx`: `requestAnimationFrame`, pausa em `visibilitychange`, delta clampado (`GAME.maxDelta`). Estado do jogador vive em `useRef`, nunca `useState`. Nunca fira o padrão de "congelar em vez de desmontar" — o motor continua rodando/renderizando até `GameOverlay` desmontar; a navegação real só acontece depois do flash (`DoorTransitionFlash`).

## Input: teclado + D-pad + arrastar, tudo somado

- **Andar** (frente/trás + strafe): `useKeyboardMoveState` (WASD/setas) — inalterado desde a versão original. No touch, o D-pad 8-bit (`DPad.tsx`, canto inferior esquerdo, só monta com `useIsTouchDevice()`) contribui só o eixo frente/trás (sem strafe) via `combineInput` (`lib/gameInput.ts`) — soma em vez de escolher por dispositivo, mesma lógica de sempre.
- **Olhar** (`useDragLook`, idêntico mouse/touch): arrastar continua funcionando sempre. Os outros dois botões do D-pad **giram** a câmera (`dpadTurnRef`, radianos/segundo enquanto pressionado) — não fazem strafe.
- **Sem giroscópio.** Foi tentado e removido — não reintroduza sem um pedido explícito do usuário.

## Renderização

Resolução interna baixa (`GAME.renderWidth/renderHeight`, hoje 320×200) escalada via CSS com `image-rendering: pixelated`. Paredes normais usam a textura gerada em `lib/gameTextures.ts` (logo + frase de `WALL_PHRASES`, cicladas por posição no grid). **Portas não têm textura** — são uma cor amarela lisa (`DOOR_COLOR` em `useGameEngine.ts`, mesmo tom de `--move-yellow`, sombreada por distância/lado via `mixColor` igual às paredes) — de propósito, pra se destacar contra as paredes coral. O visual "porta" de verdade é o `DoorMarker.tsx` (painel amarelo com ícone+rótulo+maçaneta) posicionado por cima via `lib/doorMarkers.ts::updateDoorMarkers`, ancorado no centro vertical da coluna de parede (que é sempre o horizonte, paredes são sempre simétricas ao redor dele). `MoveArea.showIcon` (default `true`) existe pra permitir esconder o ícone numa área específica, se algum dia for necessário — hoje todas as áreas, incluindo `comece`/"FAÇA PARTE", mostram ícone (`AREA_ICONS`) tanto no `DoorMarker` quanto no `BottomTabBar`.

## Integração com a gamificação existente

Ao abrir uma porta (por qualquer um dos três caminhos), `GameSession` chama `useExploration().markVisited(areaId)` **imediatamente** e só depois anima o flash e faz `scrollIntoView` pra seção. O contador de exploração existente (`ExplorationProvider`) é a fonte única de verdade — não crie um contador separado.
