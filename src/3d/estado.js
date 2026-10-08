// Estado único do palco 3D. As cenas escrevem com definir(); o Teclado lê a cada quadro.
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
