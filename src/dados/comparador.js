// Comparador "Qual MangoBook é o seu?": modelos e as specs que viram barras.
export const MODELOS = {
  pure: { nome: 'MangoBook Pure', desc: 'Leve, colorido e silencioso. Pra levar pra todo lado.', preco: 'A partir de R$ 7.999', parc: 'ou 12x de R$ 666,58 sem juros', tom: '#fff3d1',
    cores: ['var(--manga)', 'var(--rosa)', 'var(--folha)', 'var(--prata)'] },
  prime: { nome: 'MangoBook Prime', desc: 'Tela maior, chip mais forte. Pra quem edita, compila e renderiza.', preco: 'A partir de R$ 12.999', parc: 'ou 12x de R$ 1.083,25 sem juros', tom: '#eceef3',
    cores: ['var(--prata)', '#3a3a3c'] },
};

const decimal = (v) => v.toFixed(1).replace('.', ',');

export const SPECS = [
  { rot: 'Tela', pure: 13.6, prime: 15.3, max: 16, fmt: (v) => decimal(v) + '"' },
  { rot: 'Bateria', pure: 18, prime: 22, max: 24, fmt: (v) => v + ' horas' },
  { rot: 'Núcleos da CPU', pure: 8, prime: 12, max: 12, fmt: (v) => v + ' núcleos' },
  { rot: 'Leveza', pure: 1.2, prime: 1.5, max: 1.6, fmt: (v) => decimal(v) + ' kg', inverso: true },
];

export function larguraBarra(v, max) {
  return Math.max(28, (v / max) * 100) + '%';
}
