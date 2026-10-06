# Site Mango FORGE 75: design

Data: 2026-10-06 · Branch: `prototipo-mango` · Status: aguardando revisão

## Objetivo

Página de lançamento de produto, contada pelo scroll, para o **Mango FORGE 75**: um teclado mecânico fictício de uma marca que parodia a Apple. É peça de portfólio: o sucesso é parecer um lançamento real de nível Apple e mostrar domínio de 3D em tempo real, scroll e motion (ver `PRODUCT.md`).

## Decisões já tomadas

| Tema | Decisão | Onde está |
|---|---|---|
| Identidade | Direção "Galeria": clara, estilo Apple | `escolhas/galeria-v2.html` |
| Marca | Mango, logo "D · Caroço", sem a mordida | `public/mango.svg` |
| Estrutura | 7 cenas, na ordem da página do MacBook Pro | `escolhas/estrutura.html` |
| Cena 3 | 4 momentos: camadas explicadas, vista lateral com cotas, abas, tabela de specs | `escolhas/cena3.html` |
| Stack | React 19 + Vite, @react-three/fiber, GSAP ScrollTrigger, liquid-glass-react, @shadergradient/react | `package.json` |
| Gradiente | Só como luz de estúdio atrás do teclado 3D (faz o papel da foto do produto). Nenhum gradiente decorativo no resto. | esta conversa |

## Sistema visual

Base: `.ferramentas/1-design-ui/awesome-design-md/design-md/apple/DESIGN.md`, com Inter no lugar da SF Pro.

- **Cores:** texto `#1d1d1f`; fundos `#fff` e `#f5f5f7`; faixa escura `#000`, com texto `#f5f5f7` e secundário `#86868b`. Um único azul de ação, `#0066cc` (foco `#0071e3`; links no escuro `#2997ff`). O cobalto `#2563eb` só aparece no produto.
- **Ritmo:** seções inteiras, sem bordas, alternando claro e escuro. A troca de cor separa as seções.
- **Tipo:** Inter com `opsz` e `cv11`/`ss01`. Títulos 600, com tracking negativo proporcional ao tamanho. Corpo 17px/1.44. Pesos 300/400/600, nunca 500.
- **Forma:** pílula para ações; raio de 18px nos cards. Os tiles de página não têm raio.
- **Profundidade:** uma única sombra, `rgba(0,0,0,.22) 3px 5px 30px`, só no produto. Vidro (backdrop blur / liquid glass) só em controles flutuantes: barras, abas, seletor de cor, pontos do carrossel.
- **Interação:** `scale(0.95)` ao pressionar, sempre.
- **Rodapé:** sempre avisa que é uma paródia de portfólio, sem relação com a Apple.

## Arquitetura

```
index.html
src/
  main.jsx            monta <App/>
  App.jsx             barras + as 7 cenas em ordem
  estilos/tokens.css  tokens acima (CSS custom properties)
  cenas/              um componente por cena (Abertura, Destaques, PorDentro, Cores, Switch, Numeros, Reserva)
  3d/Palco.jsx        <Canvas> R3F fixo atrás da página, com o shadergradient de luz de estúdio
  3d/Teclado.jsx      envolve createKeyboardModel() de src/teclado (sem reescrever o modelo)
  3d/roteiro.js       estado do 3D por cena: câmera, giro, explode, camada ativa, cor
  som/digitacao.js    som sintetizado (Web Audio), sem arquivo de áudio
src/teclado/          modelo atual, intocado (exceto expor os materiais para a troca de cor)
```

- **Um canvas só** para a página inteira. Cada cena escreve num estado único (`roteiro.js`), e o `useFrame` lê esse estado. As cenas não falam com o three diretamente.
- **GSAP ScrollTrigger** controla o progresso das cenas com scrub, e **R3F** só desenha. Animação ligada ao scroll usa scrub; animação disparada usa `toggleActions`, nunca as duas no mesmo trigger (regra do `ROTEIRO.md`).
- Canvas com DPR limitado a 2 e render só quando há mudança (`frameloop="demand"` + `invalidate()` no scroll).

## Cenas

1. **Abertura** (claro): a frase "Pesado do jeito certo." e os botões Reservar / Saiba mais. O teclado sobe, assenta e gira com o scroll até a vista de cima, com o shadergradient de luz de estúdio atrás.
2. **Destaques** (`#f5f5f7`): carrossel de cards grandes com scroll-snap, arrastável, com pontos em liquid glass que avançam sozinhos e têm pausa.
3. **Por dentro** (escuro), seção travada:
   - (a) 8 camadas sobem uma por vez; a ativa acende e o texto mostra nome, função e dado, com uma linha até a peça; o trilho de progresso é clicável;
   - (b) a câmera gira para a lateral e as cotas 20/33/135 mm e 6° aparecem;
   - (c) abas de vidro: Camadas, Som, Knob, Portas;
   - (d) a seção termina no claro, com a tabela de specs.
4. **Cores** (claro): seletor de vidro com 4 cores, e a troca de material no próprio modelo com transição suave.
5. **Switch** (escuro): close num switch; segurar a barra de espaço ou o dedo aperta o switch, e a curva de força acompanha em menos de 100 ms.
6. **Números** (claro): 8000 Hz, 0,125 ms e 82 contam até o valor uma vez, ao entrar na tela.
7. **Reserva + rodapé** (`#f5f5f7`): convite final, um botão e o rodapé Mango.

## Som da aba "Som"

Sintetizado com Web Audio, sem gravação: um "toc" feito de ruído filtrado com um grave curto.
- "Com gasket": passa-baixa mais fechado e decaimento curto.
- "Sem": passa-banda mais agudo, decaimento longo e um eco leve (ressonância do case vazio).

O som só toca no clique, nunca sozinho.

## Acessibilidade e casos de borda

- `prefers-reduced-motion`: sem scrub; o teclado aparece na pose final de cada cena e as camadas já separadas, com transições de opacidade.
- `prefers-reduced-transparency`: o vidro vira um fundo sólido.
- Sem WebGL: cada cena mostra o recorte equivalente da foto `refs/teclado.png`, para a página continuar legível.
- Teclado: abas, trilho, seletor de cor e carrossel navegáveis por Tab/setas, com anel de foco `#0071e3`.
- Mobile: o canvas segue fixo; a cena 3 troca as linhas de rótulo por texto embaixo do modelo; a tabela vira uma coluna.

## Verificação

- `npm run build` sem erros.
- Captura das 7 cenas em 1440px e 390px (Chrome headless) antes de cada entrega.
- Detector do impeccable (`impeccable detect`) nos arquivos de UI.
- Um teste pequeno para `roteiro.js` (mapa de progresso → estado do 3D), que é a única lógica com ramificações.

## Fora do escopo agora

Página de compra/configurador real, comparação de modelos, outras páginas da Mango, i18n.

## Ordem de construção

1. Base React: tokens, barras e rodapé, com a Galeria v2 migrada.
2. Palco 3D + Abertura.
3. Por dentro (a cena mais importante).
4. Destaques, Cores, Switch, Números, Reserva.
5. Acessibilidade, fallbacks e passada de polish.
