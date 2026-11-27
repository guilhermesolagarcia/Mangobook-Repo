# Prompt do teclado 3D (entrada da img2threejs)

Referência visual: `refs/teclado.png` (principal) e `refs/imagem-angulos-teclado.png` (outras vistas).
A imagem é **inspiração**: copiamos o visual, mas o layout das teclas segue a tabela abaixo, não a imagem.

Uso: modelo para o navegador, na hero e no exploded view. Precisa rodar liso: até ~60 mil triângulos.

---

## 1. O que é

Teclado mecânico, layout 75%, case de alumínio usinado. É um objeto rígido e geométrico, com simetria quase bilateral (o knob quebra a simetria no canto de trás à direita).

## 2. Forma geral

- Footprint: **325 × 135 mm** (largura × profundidade).
- Altura do case: **20 mm na frente, 33 mm atrás**. A diferença dá uma inclinação de ~6°, e a lateral forma uma cunha.
- Cantos do case arredondados, com raio de ~6 mm vistos de cima.
- As teclas ficam numa área rebaixada, cercada por uma moldura de ~9 mm.

## 3. Peças (de cima para baixo, na ordem do exploded view)

| # | Peça | Como é |
|---|---|---|
| 1 | **Keycaps** | 82 keycaps no perfil Cherry, sem legenda. Topo levemente côncavo, laterais inclinadas, cantos arredondados. A altura muda por fileira (o perfil é esculpido). |
| 2 | **Knob** | Cilindro de 18 mm de diâmetro e 12 mm de altura, alumínio prateado escovado, com serrilha fina na lateral. |
| 3 | **Switches** | 82 switches: corpo inferior escuro, corpo superior translúcido e stem em cruz azul. Ficam embaixo de cada keycap. |
| 4 | **Plate** | Chapa de alumínio de 1,5 mm com um furo quadrado (14 mm) para cada switch. |
| 5 | **Gaskets** | Tiras de borracha (Poron) presas nas bordas da plate, em cima e embaixo. |
| 6 | **PCB** | Placa de 1,6 mm, preta fosca, com 82 soquetes hot-swap e alguns chips. |
| 7 | **Espuma** | Placa de espuma cinza-escura de 3,5 mm, entre a PCB e o fundo. |
| 8 | **Moldura (case de cima)** | A borda de alumínio que aparece em volta das teclas. Leva a **faixa prateada polida** no chanfro superior. |
| 9 | **Base (case de baixo)** | A parte de baixo da cunha. Leva a **faixa azul** embutida na lateral da frente, a porta USB-C no centro da traseira, 4 pés de borracha e 6 parafusos embaixo. |

Detalhes de superfície (serrilha do knob, parafusos, pés, faixa azul) andam **junto da peça** a que pertencem no exploded view. Não voam soltos.

## 4. Layout das teclas (correto, 16 unidades de largura)

1 unidade (1u) = 19,05 mm. As larguras estão em "u".

| Fileira | Teclas, da esquerda para a direita |
|---|---|
| F | Esc · *(vão 0,25)* · F1–F4 · *(vão 0,25)* · F5–F8 · *(vão 0,25)* · F9–F12 · *(vão 0,25)* · Del · **Knob** |
| *(vão de 0,25u entre a fileira F e o resto)* | |
| Números | ` 1 2 3 4 5 6 7 8 9 0 - = (1u cada) · Backspace 2u · Home |
| Q | Tab 1,5u · Q W E R T Y U I O P [ ] · \ 1,5u · PgUp |
| A | Caps 1,75u · A S D F G H J K L ; ' · **Enter 2,25u** · PgDn |
| Z | Shift 2,25u · Z X C V B N M , . / · Shift 1,75u · ↑ · End |
| Base | Ctrl 1,25u · Win 1,25u · Alt 1,25u · Espaço 6,25u · Alt · Fn · Ctrl · ← ↓ → |

Total: **82 teclas + 1 knob**. A seta ↑ fica alinhada em cima da ↓.

## 5. Materiais

| Peça | Cor | Material |
|---|---|---|
| Moldura e base | Grafite escuro (`#45484d`) | Alumínio anodizado: metálico, acetinado (rugosidade ~0,45), textura jateada fina |
| Faixa do chanfro | Prata clara | Alumínio polido: metálico, quase espelhado (rugosidade ~0,15) |
| Faixa da frente | Azul cobalto (`#2563EB`) | Anodizado azul, acetinado |
| Keycaps alfanuméricas | Cinza-azulado médio (`#5b6068`) | PBT: plástico fosco (rugosidade ~0,7), sem brilho |
| Keycaps modificadoras | Cinza-azulado escuro (`#3d4148`) | PBT fosco |
| Esc e Enter | Azul cobalto (`#2563EB`) | PBT fosco |
| Knob | Prata (`#c8cacd`) | Alumínio escovado |
| Plate | Prata fosca | Alumínio |
| PCB | Preto | Fosco |
| Gaskets e espuma | Cinza-escuro | Borracha e espuma, totalmente foscas |

## 6. O que a imagem não mostra (e decidimos aqui)

- **Interior** (switches, plate, PCB, espuma, gaskets): nada disso aparece na imagem, então segue a construção real de um teclado gasket mount.
- **Fundo e traseira:** vêm da `imagem-angulos-teclado.png` (pés, parafusos, USB-C).
- **Lateral:** a vista lateral da imagem está errada. Vale a cunha descrita no item 2.

---

## Decisões (guiadas pelo impeccable)

1. **Case em 2 peças: moldura + base.** A moldura sobe primeiro e revela o interior. Com 1 peça só, o case seria um bloco sólido escondendo as camadas.
2. **Knob preso na moldura.** Ele sobe junto com ela. Detalhe de superfície acompanha a peça a que pertence, e um knob voando sozinho competiria com a sequência principal.
3. **Switches em dois níveis:**
   - **Os 82 da montagem:** sólidos, sem transparência. Corpo escuro e stem azul visível, feitos com instancing (uma única chamada de desenho).
   - **Um switch "herói"** detalhado (corpo translúcido, mola, stem) que só aparece no close-up da cena do switch.
   - Motivo: 82 peças translúcidas pesam na GPU e dão erro de ordem de transparência, justamente num PC médio, e o detalhe só é percebido de perto.
