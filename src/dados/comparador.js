// Comparador "Qual MangoBook é o seu?": modelos e as specs que viram barras. Nome e preço vêm do catálogo.
import { produto, precoAPartir, parcela } from '../catalogo/produtos.js';

const PURE = produto('mangobook-pure'), PRIME = produto('mangobook-prime');
export const MODELOS = {
  pure: { nome: PURE.nome, desc: 'Leve, colorido e silencioso. Pra levar pra todo lado.', preco: precoAPartir(PURE), parc: parcela(PURE), tom: '#fff3d1',
    cores: ['var(--manga)', 'var(--rosa)', 'var(--folha)', 'var(--prata)'] },
  prime: { nome: PRIME.nome, desc: 'Tela maior, chip mais forte. Pra quem edita, compila e renderiza.', preco: precoAPartir(PRIME), parc: parcela(PRIME), tom: '#eceef3',
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
