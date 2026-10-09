// Navegação por setas em abas e radiogroups: anda uma posição e dá a volta nas pontas.
// eixo 'h' só usa esquerda/direita; 'hv' também aceita cima/baixo (radiogroup de cores).
const PASSOS = { ArrowRight: 1, ArrowLeft: -1 };
const VERTICAIS = { ArrowDown: 1, ArrowUp: -1 };

export function proximaAba(i, tecla, total, eixo = 'h') {
  const passo = PASSOS[tecla] ?? (eixo === 'hv' ? VERTICAIS[tecla] : undefined);
  if (passo === undefined) return null;
  return (i + passo + total) % total;
}
