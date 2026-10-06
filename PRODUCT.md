# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React 19 + Vite, Three.js via @react-three/fiber, GSAP (ScrollTrigger) para o scroll. Libs pedidas pelo usuário: liquid-glass-react e @shadergradient/react. Migrado de HTML puro em 2026-10-06 para poder usar essas libs.

## Users

Quem vê o site é quem avalia o trabalho do autor: recrutadores, clientes e a comunidade de front-end/3D. Dentro da ficção, o FORGE 75 fala com o público de um lançamento da Apple: gente que quer o melhor objeto e paga por isso. *(Inferido da resposta "estilo apple"; confirmar se o público da ficção for mais específico.)*

## Product Purpose

Peça de portfólio/estudo: uma página de lançamento de produto, contada pelo scroll, para um teclado mecânico fictício. O sucesso é parecer um lançamento real de nível Apple e mostrar domínio de 3D em tempo real, scroll e motion.

## Positioning

FORGE 75: teclado mecânico 75%, case de alumínio usinado, gasket mount, hot-swap. O diferencial mostrado é o objeto montado camada por camada (exploded view) com o modelo 3D procedural do próprio projeto, e não renders prontos.

## Capabilities and Constraints

- Modelo 3D procedural em `src/teclado/` (82 teclas + knob, peças nomeadas e desmontáveis). Unidade 1 = 1 cm.
- O roteiro de cenas está em `ROTEIRO.md` (hero, exploded view, switch, customização, specs, CTA); o hero ainda não está definido.
- Os números das specs (8000 Hz, 0,125 ms, 1,8 kg) são ficção do roteiro.
- Precisa rodar liso num PC médio (o modelo foi feito para até ~60 mil triângulos).

## Brand Commitments

- Marca: **Mango**, paródia fictícia da Apple (outra fruta, sem a mordida). Logo escolhido: "D · Caroço", a manga cortada com o caroço vazado, em `public/mango.svg`. O produto se chama **Mango FORGE 75**.
- Todo rodapé deixa claro que é paródia de portfólio, sem relação com a Apple.
- Cores do produto (fixas no modelo): grafite `#45484d`, cobalto `#2563EB` (Esc, Enter, faixa da frente), prata polida no chanfro.
- Site claro, estilo Apple: o usuário escolheu a direção "Galeria" em `escolhas/identidade.html`.
- Idioma: português do Brasil.

## Evidence on Hand

- Imagens de referência geradas por IA: `refs/teclado.png`, `refs/imagem-angulos-teclado.png`.
- Nada de depoimentos, imprensa, preço ou clientes. Por ser fictício, nada disso deve ser inventado como se fosse real.

## Product Principles

1. O objeto é o protagonista; a interface sai da frente.
2. Todo movimento precisa explicar alguma coisa do produto (camadas, curso do switch, material), não só enfeitar.
3. Os números servem de prova, não são o argumento.
4. Ser crível como lançamento real, sem fingir fatos que não existem.

## Accessibility & Inclusion

Respeitar `prefers-reduced-motion` (camadas aparecem já separadas, sem scrub), conforme `ROTEIRO.md`.
