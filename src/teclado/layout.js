// Layout 75% (refs/prompt-teclado-3d.md §4). Larguras em unidades de tecla (1u = 1,905 cm).
// Cada item é a largura da tecla; { gap } é um vão sem tecla; { knob } é a posição do knob.

export const U = 1.905;
export const ROW_GAP_AFTER_F = 0.25; // vão entre a fileira F e o resto, em u

const ones = (n) => Array(n).fill(1);

export const ROWS = [
  [1, { gap: 0.25 }, ...ones(4), { gap: 0.25 }, ...ones(4), { gap: 0.25 }, ...ones(4), { gap: 0.25 }, 1, { knob: 1 }],
  [...ones(13), 2, 1],
  [1.5, ...ones(12), 1.5, 1],
  [1.75, ...ones(11), 2.25, 1],
  [2.25, ...ones(10), 1.75, 1, 1],
  [1.25, 1.25, 1.25, 6.25, 1, 1, 1, 1, 1, 1],
];

export const WIDTH_U = 16;
export const DEPTH_U = ROWS.length + ROW_GAP_AFTER_F;

// Tipo de keycap, usado na cor (passe de materiais).
function kindOf(r, i, w, rowLength) {
  if ((r === 0 && i === 0) || (r === 3 && w === 2.25)) return 'accent'; // Esc e Enter
  if (w !== 1 || i === rowLength - 1 || r === 5 || (r === 4 && i >= 11)) return 'mod';
  return 'alpha';
}

// Lista de teclas com centro (x, z) em cm, no plano do deck.
// +X = direita, +Z = frente (lado do usuário). A fileira F fica atrás (z negativo).
export function keyPositions() {
  const keys = [];
  let knob = null;
  ROWS.forEach((row, r) => {
    const rowOffset = r + (r > 0 ? ROW_GAP_AFTER_F : 0);
    const z = (rowOffset + 0.5) * U - (DEPTH_U * U) / 2;
    let cursor = 0;
    const keyCount = row.filter((item) => typeof item === 'number').length;
    let keyIndex = 0;
    for (const item of row) {
      if (typeof item === 'object' && item.gap) { cursor += item.gap; continue; }
      const w = typeof item === 'number' ? item : item.knob;
      const x = (cursor + w / 2) * U - (WIDTH_U * U) / 2;
      if (typeof item === 'object' && item.knob) knob = { x, z };
      else {
        keys.push({ row: r, x, z, w, kind: kindOf(r, keyIndex, w, keyCount) });
        keyIndex++;
      }
      cursor += w;
    }
  });
  return { keys, knob };
}
