// Estado único do palco 3D. As cenas escrevem a pose com escrever() (só o dono); o Teclado lê a cada quadro.
import { POSES, N_CAMADAS } from './roteiro.js';

export const estado = {
  cam: [...POSES.frente.cam],
  alvo: [...POSES.frente.alvo],
  giro: POSES.frente.giro,
  lateral: 0,  // cm: desvio do alvo em x, só em telas largas
  camadas: Array(N_CAMADAS).fill(0),
  ativa: -1,
  cotas: 0,
  subida: 0,   // cm: deslocamento vertical da entrada
  balanco: 0,  // rad: giro lento enquanto ninguém rola
};

let invalidar = () => {};
export function ligarInvalidar(fn) { invalidar = fn; }
export function definir(parcial) {
  Object.assign(estado, parcial);
  invalidar();
}

// Dono do palco: só a cena que está no meio da tela escreve a pose. Sem isso, os scrubs de cenas vizinhas
// gravam no mesmo quadro ao pular por âncora, e vence quem foi criado por último, não quem está na tela.
// Ao trocar de dono, a pose vai do que está na tela até o que o novo dono pede, misturando por `duracao` s.
let dono = null;
let ultimo = null;       // última pose pedida pelo dono atual
let de = null;           // pose na tela quando o dono mudou
let mistura = 1;         // 0..1
// movimento reduzido: a troca de dono é instantânea
let duracao = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 0.8;
let relogio = null;

const POSE = ['cam', 'alvo', 'giro', 'lateral', 'camadas'];
const lerp = (a, b, t) => (Array.isArray(a) ? a.map((v, i) => v + (b[i] - v) * t) : a + (b - a) * t);
const suaveMistura = (t) => t * t * (3 - 2 * t);

function aplicar() {
  if (!ultimo) return;
  if (mistura >= 1) { definir(ultimo); return; }
  const t = suaveMistura(mistura);
  const misturado = { ...ultimo };
  for (const k of POSE) if (k in ultimo) misturado[k] = lerp(de[k], ultimo[k], t);
  definir(misturado);
}

export function configurarMistura(segundos) { duracao = segundos; }

export function assumir(nome) {
  if (dono === nome) return;
  dono = nome;
  ultimo = null;
  if (relogio) cancelAnimationFrame(relogio);
  if (duracao <= 0) { mistura = 1; return; }
  de = Object.fromEntries(POSE.map((k) => [k, Array.isArray(estado[k]) ? [...estado[k]] : estado[k]]));
  mistura = 0;
  const inicio = performance.now();
  const passo = (agora) => {
    mistura = Math.min(1, (agora - inicio) / (duracao * 1000));
    aplicar();
    relogio = mistura < 1 ? requestAnimationFrame(passo) : null;
  };
  relogio = requestAnimationFrame(passo);
}

export function escrever(nome, parcial) {
  if (nome !== dono) return;
  ultimo = parcial;
  aplicar();
}

// O dono troca a própria pose com transição (ex.: escolher outra aba).
export function transitar(nome, parcial) {
  if (nome !== dono) return;
  dono = null;
  assumir(nome);
  escrever(nome, parcial);
}
