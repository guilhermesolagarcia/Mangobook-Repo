# Prompts dos adesivos (série 01)

Para gerar por IA os 13 adesivos que hoje estão em SVG em `escolhas/marca/adesivos.html`.
Prompts em inglês (os modelos de imagem entendem melhor). Cole o **bloco de estilo** no fim de cada prompt.

## Padrão Batmango (aprovado em 24/11, referência: `IA/STICKERS/batmango.png`)

Para os personagens. Feitos **um por um**; cada resultado vai para `IA/STICKERS/<nome>.png`.

```
Chibi full-body character sticker with chunky toy proportions: oversized head, small round body,
short stubby arms and legs, confident pose. The entire character is filled with ONE smooth horizontal
gradient from warm orange (#FF9F1C) on the left to hot pink (#FD228A) on the right, continuous across
body, head and accessories. Face features and emblems are flat cream-white negative-space cutouts (#FFF4EA).
No black outlines, no inner lines, no shading, no texture. Natural details keep their own flat colors:
brown stem, green leaf (#1FB57A). Thick white die-cut sticker border with a very thin light grey outer edge.
Transparent background, flat vector style, centered, no text.
```

## Mascote: Mangy — APROVADO: `IA/MASCOTE/mangy-final.png` (24/11)

A versão final é a referência para todos os prompts abaixo (anexar sempre). Histórico: `IA/STICKERS/mangy.png` (v1), `IA/STICKERS/mangi.png` (v2).

Origem: o ChatGPT gerou o Mangy só com o **bloco do padrão Batmango**, sem descrever personagem nenhum. Ele mesmo
inventou a criança chibi (e por conta própria pôs fios de cabelo, traço nos olhos e brilho, que o usuário curtiu).

Acertos: chibi, pose confiante (mão na cintura, punho pra cima), degradê laranja → rosa-choque, cabinho e folha.
Refinar: o emblema do peito é uma **maçã** (símbolo da Apple, proibido no manual); a cabeça tem forma de
maçã/pêssego (redonda, afundado no topo), não de manga; um pouco de detalhe demais para funcionar pequeno.
Nome: "mangy" em inglês = "sarnento"; v2 salva como `IA/STICKERS/mangi.png` (maçã trocada por caroço, cabeça de manga; cabelo ficou simples demais, o da v1 era melhor; fundo xadrez FALSO desenhado: pedir fundo branco liso). Logo em PNG para o GPT: `IA/REFERENCIAS/logo-mango.png`. Ideia: cabeça do mascote = silhueta do logo (manga torta + folha solta, sem cabinho).

### Como gerar a série no ChatGPT
Tudo **na mesma conversa**, sempre anexando a versão aprovada e começando o pedido com:
`Use the attached image as the character reference. Keep the exact same character, face, hair, proportions, colors and sticker style. Plain solid white background, no checkerboard.`

### 1. Mangy v2 (anexar mangy.png)
```
Refine this character. Change only these things:
1. The head must have a real mango shape: asymmetric teardrop/kidney silhouette, slightly tilted,
   smooth top with no dent; the brown stem sits off-center near the upper shoulder of the fruit, one green leaf.
2. Replace the apple on the chest with a small cream emblem of a halved mango showing its oval seed. No apple, no bite.
3. Slightly fewer details (fewer hair strands, no clothing folds, no shoe laces) so it still reads at small sizes.
Keep everything else: chibi proportions, pose, face, orange to hot pink gradient, cream details, white die-cut border,
transparent background.
```

### 2. Folha de personagem
```
Character model sheet of this mascot on a plain light background: front view, three-quarter view, side view and back view,
standing in a row at the same scale, same colors and style. No text.
```

### 3. Seis expressões
```
Six sticker heads of this mascot in a 3x2 grid, each with a different expression: happy, laughing with eyes closed,
surprised, angry/determined, sleepy, winking with tongue out. Same head shape, same colors, white die-cut border on each.
```

### 4. Nas seis cores da marca
```
Six full-body stickers of this exact mascot in a row, identical pose, each one in a different two-color gradient:
orange to yellow (#FF9F1C to #FFD23F), pink to purple (#FF5E7E to #7B5CFF), blue to cyan (#2F7BFF to #22B5E8),
green to cyan (#1FB57A to #22B5E8), purple to blue (#7B5CFF to #2F7BFF), orange to hot pink (#FF9F1C to #FD228A).
Cream details, white die-cut borders.
```

### 5. Só os olhos (assinatura)
```
Only the eyes of this mascot, cropped, as a minimal graphic: the two eyes and the upper edge of the face cutout,
cream on a solid orange-to-hot-pink gradient bar, wide horizontal format. Make three versions: happy, determined, winking.
```

### 6. Ícone de app
```
App icon of this mascot: rounded square (squircle) with a smooth orange-to-hot-pink gradient background,
the mascot's head only, centered, in cream and white, simple enough to read at 64 px. Also one version
with a cream background and gradient head.
```

### 7. Selo circular
```
Round badge sticker: the mascot in the center waving, a ring around it with the text "MANGO · EST. 2026"
on top and "NOSSA COR SÃO TODAS" at the bottom in bold rounded capitals, cream ring, orange-to-hot-pink outer edge,
white die-cut border.
```

### 8. Escala de maturação
```
Three stickers of this mascot in a row as a ripeness scale, each with a small label below:
"VERDE" (mascot in green gradient #1FB57A to #3DDC97, shy), "MADURA" (orange to hot pink, confident pose),
"DOCE DEMAIS" (hot pink to purple #FD228A to #7B5CFF, sunglasses, ultra confident).
Bold rounded capital labels, white die-cut borders.
```

### 9. Com os produtos
```
The mascot proudly holding a small colorful laptop, and a second sticker of the mascot taking a selfie
with a small smartphone. Same style, white die-cut borders. No real brand logos on the devices.
```

## Bloco de estilo (primeira versão, para letreiros e selos)

```
Die-cut vinyl sticker, flat vector illustration, 2 to 3 solid colors maximum, bold simple shapes,
lots of negative space, thick clean white die-cut border around the whole shape, subtle soft drop shadow,
centered on a plain light grey background (#ececee), no texture unless stated, no outlines unless stated,
crisp edges, print-ready, high resolution.
Palette only: mango orange #FF9F1C, yellow #FFD23F, pink #FF5E7E, purple #7B5CFF, blue #2F7BFF,
cyan #22B5E8, green #1FB57A, ink #1D1D1F, cream #F5F2EC, white.
```

**Negativo** (quando a ferramenta aceitar): `photorealistic, 3D render, glossy, gradients everywhere, busy details, extra text, watermark, logo of real brands, drop shadow inside the art, thin border`

## Família "heróis" (degradê manga → rosa)

Mesmo degradê nos três: `smooth horizontal gradient from mango orange #FF9F1C on the left to pink #FF5E7E on the right, details are white negative-space cutouts`.

**Batmango**
```
A cute mango-shaped superhero character, round pear-like mango body with a small leaf on top,
wearing a cowl with two pointy ears, angry white cutout eyes, white lower-face mask area,
a small original white bat emblem on the chest, a short cape flowing to the right with a scalloped hem.
Whole figure filled with one smooth horizontal gradient mango orange to pink, all details as white cutouts.
```

**Manga veloz — padrão Batmango** (usar este)
```
A speedy mango character in a running pose, leaning forward, one leg stretched back.
Mango-shaped head with a brown stem and a green leaf on top. Instead of hair, three long spiky
quills shaped like pointed mango leaves sweep straight back from the head. Big determined cream-white
cutout eyes joined in the middle with small dark pupils, a cream-white cutout muzzle with a confident smirk.
Three short gradient speed streaks trail behind the body. Not blue, no gloves, no sneakers, no hedgehog features.
```
+ bloco do padrão Batmango.

**Manga veloz (primeira versão)**
```
Side-view head of a fast cartoon mango character, mango-shaped head facing left with a small leaf on top,
three long swept-back spikes behind the head like speed quills, big joined white eyes with black pupils,
white muzzle with a confident smirk, small black nose. Head and spikes in one smooth gradient mango orange to pink.
```

**Mango Club**
```
A bar of soap seen at a slight angle, rounded rectangle with a visible thicker side giving volume,
top face in a smooth gradient mango orange to pink, side face a darker purple-tinted shade,
tall condensed bold italic text stacked in two overlapping lines "MANGO" / "CLUB" in cream white
with a purple offset shadow, a few small white glossy soap highlights on the edges.
```

## Personagens

**Urso**
```
Three-quarter view head of a plush teddy bear, flat brown tones (#8A5A33 face, darker #5E3A1F side shading
as a flat second tone), large tan muzzle offset to the left, one ear in front and one behind,
huge eyes: cream sclera with thin dark outline, left iris gradient yellow to pink to purple,
right iris gradient green to cyan to blue, small black pupils, tiny white highlights and colored dots.
Subtle paper grain texture. Naive, art-toy feel.
```

**Kaiju kawaii (マンゴー)**
```
Round sticker in line-art style: cream circle with a thick black outline, purple sun rays radiating
from a small outlined sun in the upper left, a chubby kawaii mango monster standing on a ground line,
round mango body with a leaf on its head, big shiny black eyes, pink blush cheeks, small open mouth roaring
toward the sun with tiny roar lines, little raised arm, small leaf-shaped back plates and a short tail,
two outlined pine trees on the left. Below the circle, the katakana word "マンゴー" in a blocky heavy font,
purple fill with thick black outline, slightly tilted. Black line art on cream, only purple and pink as accents.
```

**Rabisco**
```
Hand-drawn doodle face with a thick black marker line, white face, purple zigzag scribble hair on top,
left eye drawn as an X, right eye a black dot, wavy crooked mouth. Childlike, messy-on-purpose, no fill colors
other than white and the purple hair.
```

## Letreiros e frases

**MANGO pichação** (melhor em modelo bom de texto: Ideogram, Recraft, GPT-image)
```
Graffiti throw-up lettering of the word "MANGO", fat round bubble letters slightly overlapping and tilted,
yellow to mango orange vertical gradient fill, dark purple inner outline, thick purple outer outline,
a few small white shine marks on the letters. Readable letters, the G clearly a G.
```

**Balão "FUCK IT, WE BALL."**
```
A comic speech bubble with an irregular angular hand-drawn shape and a pointed tail at the bottom,
white fill, thick black marker outline, inside the text "FUCK IT, WE BALL." in three lines,
black hand-lettered marker font, slightly rotated.
```

**Universidade Mango**
```
Varsity college patch: rounded square, purple outer frame, dark purple inner panel,
"UNIVERSIDADE" arched small at the top in cream varsity slab-serif letters, a huge yellow slab-serif "M"
with a cream outline in the center with a small green leaf on its top right corner,
"MANGO" in cream varsity letters at the bottom.
```

## Selos e cartazes

**SÃO PAULO**
```
Vertical travel poster sticker: black frame, white panel, "SÃO PAULO" in bold black sans-serif at the top,
"TERRA DA GAROA" small purple spaced capitals below, a big pink sun circle in the center,
black city skyline silhouette at the bottom including a wavy curved apartment building and a tall antenna tower,
black footer band with white text "MAIOR CIDADE DO HEMISFÉRIO SUL" and "SP · BRASIL".
```

**RIO**
```
Retro travel patch sticker: rounded rectangle with a thick purple frame, cream inner panel with a thin black border,
black silhouette of Sugarloaf Mountain with a cable car line, a pink sun behind it,
"RIO" in a rounded retro display font at bottom left, "DE JANEIRO" and "BRASIL · 1565" small at bottom right,
the last line in purple.
```

## Formas

**Estrela com rastro**
```
A white five-point star with a thick black outline and rounded corners, with three solid offset copies behind it
trailing diagonally down-left in pink, yellow and blue, like a retro motion trail.
```

**Explosão**
```
A simple eight-point starburst shape, no face or details, filled with a smooth diagonal gradient
yellow to mango orange to pink.
```

## Depois de gerar

- Gere em **PNG com fundo transparente** (ou fundo cinza liso e remova depois).
- Para virar **SVG**: Recraft já gera vetor direto; para os outros, `vectorizer.ai` ou Image Trace do Illustrator.
  O estilo chapado com 2 a 3 cores vetoriza limpo.
- Salvar em `public/adesivos/<nome>.png` (ou `.svg`) e trocar o SVG à mão em `escolhas/marca/adesivos.html` por `<img>`.
