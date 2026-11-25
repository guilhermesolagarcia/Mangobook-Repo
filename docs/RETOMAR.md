# RETOMAR — onde paramos

Última sessão: **24/11/2026**, branch `planejamento-ecossistema`.
Plano geral: livro "Ecossistema Mango" (link no `CLAUDE.md`). Spec e plano do kit: `docs/superpowers/specs|plans/2026-11-24-design-system-kit*`.

## Pronto

- `escolhas/marca/prancha.html` — prancha da marca (cores, tipo, peças, aplicações, tom de voz, 06 Campanhas), 6 temas de degradê (`?v=manga|arco-iris|uva|oceano|folha|noite`).
- `escolhas/marca/logo.html` — versões, fundos, respiro, tamanhos, não fazer.
- `escolhas/marca/adesivos.html` — **rascunho** em SVG (v5). Vai ser substituído por adesivos feitos por IA.
- `scripts/kit.mjs` — `npm run dev` + `node scripts/kit.mjs` gera PNGs em `docs/imagens/kit/`.
- `refs/prompts-adesivos.md` — prompts de todos os adesivos + **padrão Batmango**.

## Decisões desta sessão

- **Adesivos agora são feitos por IA, um por um.** Padrão aprovado: `IA/STICKERS/batmango.png`
  (corpo inteiro chibi, um degradê laranja → rosa-choque, detalhes vazados em creme, sem linha preta,
  folha verde e cabinho marrom chapados, borda branca grossa, fundo transparente).
- Rosa dos adesivos: mais choque (~`#FF3D7F`) que o rosa da marca (`#FF5E7E`). Confirmar.
- Adesivos não precisam falar da Mango; só usar a estética.
- Não temos limite de escopo: pode fazer bastante, desde que um por um e bem feito.

## A virada: a system-2 (Blazo) mostra o que falta

`refs/systems/system-2.png` é um sistema de marca **inteiro que nasce de um mascote**. Tudo deriva dele:

| No Blazo | O que é | Como seria na Mango |
|---|---|---|
| **Mascote dentro do logo** | o "O" de BLAZO é a cabeça do mascote (chama) | o "O" de MANGO vira o mascote (ou o caroço) |
| **Logo + slogan fixo** em 4 fundos | "IGNITE YOUR BITE" sempre embaixo, em preto, vermelho, branco | lockup MANGO + "Nossa cor são todas." em claro, escuro, cor, degradê |
| **Só os olhos** como elemento | faixas com só os olhos bravos do mascote | os olhos do mascote viram assinatura (avatar, loading, rodapé) |
| **Mascote em 9 versões** | cores e expressões diferentes, como adesivos | mascote nas **6 cores da marca** (encaixa perfeito em "nossa cor são todas") |
| **Escala com o mascote** | Rookie → Challenger → Final Boss (nível de pimenta) | escala de **maturação**: Verde → Madura → Doce demais (níveis de produto, planos, conquistas) |
| **Parede de palavras** | padrão de gírias repetidas (TASTY, HOT, MUNCHEESE) | padrão com os microtextos ("Descascando…", "Doce.", "Caroço.") |
| **Cartaz tipográfico** | frases gritadas em blocos (BITE ME, EAT ME) | cartaz com frases curtas da marca |
| **Textura** | linhas tipo digital/topografia vermelhas no preto | textura de linhas nas 6 cores (fundo de pôster, embalagem) |
| **Ícones de app** | mascote em quadrados: cheio, invertido, contorno | ícone do app Mango com o mascote |
| **Selos circulares** | "EST. 2026", "STREET FOOD", "BURGERS THAT BITE BACK" | "MANGO · EST. 2026 · NOSSA COR SÃO TODAS" |
| **3 fontes com papel definido** | título display, subtítulo condensado, corpo | hoje só Inter; avaliar uma display para campanhas e adesivos |
| **Paleta curta + 1 degradê** | vermelho, preto, branco + rampa amarelo → vermelho | as 6 cores + o degradê laranja → rosa do Batmango |
| **Adesivos do próprio mascote** | a marca *é* os adesivos | adesivos de marca + adesivos soltos de estética |

**Diferença central:** a Mango hoje é só a camada "Apple" (limpa, logo mínimo, sem personagem). O Blazo tem uma
**camada expressiva** (mascote, gíria, selo, adesivo). Proposta: ter as duas — a limpa para produto e loja, a
expressiva para campanhas, merch, adesivos e redes.

## Próximos passos (na ordem)

1. **Decidir o mascote oficial.** Candidato natural: o personagem do padrão Batmango sem fantasia (manga chibi em degradê, olhos vazados).
2. **Prancha `escolhas/marca/mascote.html`** no estilo Blazo: lockups com mascote, mascote nas 6 cores e expressões,
   só os olhos, ícones de app, selos circulares, escala de maturação, parede de palavras, textura.
   Imagens do mascote por IA (padrão Batmango); pranchas em código.
3. **Adesivos por IA, um por um.** Próximo: **Manga veloz** (prompt pronto em `refs/prompts-adesivos.md`).
   Depois urso, kaiju, rabisco; depois padrão próprio para letreiros e selos.
4. Do plano do kit: `cartoes.html` (cartão-presente) e `apps.html` (ícones do MangoOS).

## Texto para colar numa sessão nova

> Lê o `docs/RETOMAR.md`. Vamos continuar o kit da marca: primeiro decidir o mascote oficial e montar a prancha do mascote no estilo da system-2 (Blazo), depois seguir os adesivos por IA um por um no padrão Batmango.
