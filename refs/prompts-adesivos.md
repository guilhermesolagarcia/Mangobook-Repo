# Prompts dos adesivos (série 01)

Para gerar por IA os 13 adesivos que hoje estão em SVG em `escolhas/marca/adesivos.html`.
Prompts em inglês (os modelos de imagem entendem melhor). Cole o **bloco de estilo** no fim de cada prompt.

## Padrão Batmango (aprovado em 24/11, referência: `IA/STICKERS/batmango.png`)

Para os personagens. Feitos **um por um**; cada resultado vai para `IA/STICKERS/<nome>.png`.

```
Chibi full-body character sticker with chunky toy proportions: oversized head, small round body,
short stubby arms and legs, confident pose. The entire character is filled with ONE smooth horizontal
gradient from warm orange (#FF9F1C) on the left to hot pink (#FF3D7F) on the right, continuous across
body, head and accessories. Face features and emblems are flat cream-white negative-space cutouts (#FFF4EA).
No black outlines, no inner lines, no shading, no texture. Natural details keep their own flat colors:
brown stem, green leaf (#1FB57A). Thick white die-cut sticker border with a very thin light grey outer edge.
Transparent background, flat vector style, centered, no text.
```

## Mascote (candidato): v1 em `IA/STICKERS/mangy.png`

Gerado com um prompt **chibi** próprio (não o padrão Batmango): é uma linha separada, a do mascote.
O que a v1 acerta: estilo chibi, pose confiante, degradê laranja → rosa-choque, cabinho e folha, rosto com recorte creme.
O que refinar: o emblema do peito é uma **maçã** (cara de Apple, proibido no manual); a cabeça tem forma de
maçã/pêssego (redonda com afundado no topo), não de manga; um pouco de detalhe demais para virar ícone pequeno.

**Mascote v2**
```
Brand mascot sticker: a cheerful chibi kid whose head IS a ripe mango. The head has a true mango shape:
asymmetric kidney/teardrop silhouette, slightly tilted, wider at the bottom, smooth top with no dent,
a short brown stem set off-center near the upper shoulder of the fruit and one green leaf.
Mango-colored hair falls over the forehead in soft chunky bangs.
The face is one cream-white cutout area with big simple oval eyes (solid ovals with one small cream highlight),
a small open happy smile and two small blush dots. Small round body in a plain one-piece outfit,
short stubby arms and legs: one hand on the hip, the other fist raised confidently.
On the chest a small cream cutout emblem of a halved mango showing its oval seed (NOT an apple, no bite).
Plain rounded sneakers. Keep the cute chibi line style of the reference, but fewer details so it still
reads at small sizes. Whole character in one smooth gradient from orange (#FF9F1C) to hot pink (#FF3D7F),
cream-white (#FFF4EA) face and details, brown stem, green leaf (#1FB57A), thick white die-cut sticker border,
transparent background, flat vector.
```
Usar `IA/STICKERS/mangy.png` como imagem de referência, se a ferramenta aceitar.

Depois de aprovado: gerar uma **folha de personagem** (frente, costas, 3/4, 6 expressões) usando a v2 como imagem de
referência, para o mascote sair igual em todas as peças.

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
