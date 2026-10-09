// Demo da Mango Intelligence: o texto original riscado e a versão reescrita letra a letra.
export const IA_ABAS = ['Deixar profissional', 'Resumir', 'Deixar amigável'];
export const IA_ORIGINAL = 'oi, então, o relatório vai atrasar um pouco pq deu ruim no arquivo, mas amanhã eu mando sem falta blz';
export const IA_VERSOES = [
  'Olá! O relatório terá um pequeno atraso devido a um problema no arquivo. Envio a versão final amanhã, sem falta.',
  'Relatório atrasado por problema no arquivo; entrega amanhã.',
  'Oi! Tive um probleminha com o arquivo, então o relatório vai atrasar um tiquinho. Amanhã ele chega, prometo! 🙂',
];

export function textoDigitado(versao, k) {
  return { texto: versao.slice(0, k), digitando: k < versao.length };
}
