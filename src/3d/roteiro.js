// Roteiro do palco 3D: funções puras de progresso (0 a 1) para estado do teclado.
// Unidade das poses: cm, a mesma do modelo. Ordem das camadas = PARTS de src/teclado/modelo.js.

// lateral (cm): desvio do alvo em x aplicado só em telas largas, para o modelo abrir espaço ao texto à esquerda.
export const POSES = {
  frente:    { cam: [0, 5, 70],     alvo: [0, 4, 0],   giro: -0.35, lateral: 0 },
  cima:      { cam: [0, 58, 26],    alvo: [0, 0, 2],   giro: 0,     lateral: 0 },
  explodido: { cam: [-44, 34, 54],  alvo: [0, 7, 0],   giro: 0,     lateral: -11 },
  lado:      { cam: [-64, 9, 0.01], alvo: [0, 3, 0],   giro: 0,     lateral: 0 },
  knob:      { cam: [34, 18, 14],   alvo: [11, 1, -5], giro: 0,     lateral: 0 },
  portas:    { cam: [6, 18, -72],   alvo: [0, 0, 0],   giro: 0,     lateral: 0 },
};

export const N_CAMADAS = 8;
// Fatias da cena "Por dentro": até 0.72 sobem as camadas; até 0.82 elas se juntam; o resto gira para o lado.
export const FASES = { camadas: 0.72, junta: 0.82 };
const GASKETS = 4;

export const clamp01 = (t) => Math.min(1, Math.max(0, t));
export const suave = (t) => { const x = clamp01(t); return x * x * (3 - 2 * x); };
const mix = (a, b, t) => a + (b - a) * t;
const mix3 = (a, b, t) => a.map((v, i) => mix(v, b[i], t));
const camadasIguais = (v) => Array(N_CAMADAS).fill(v);

function entrePoses(a, b, t) {
  const s = suave(t);
  return { cam: mix3(a.cam, b.cam, s), alvo: mix3(a.alvo, b.alvo, s), giro: mix(a.giro, b.giro, s), lateral: mix(a.lateral, b.lateral, s) };
}

export function estadoAbertura(p) {
  return { ...entrePoses(POSES.frente, POSES.cima, clamp01(p)), camadas: camadasIguais(0), ativa: -1, cotas: 0 };
}

export function estadoPorDentro(progresso) {
  const p = clamp01(progresso);
  if (p <= FASES.camadas) {
    const f = (p / FASES.camadas) * N_CAMADAS; // 0..8: qual camada está subindo
    return {
      ...entrePoses(POSES.cima, POSES.explodido, f), // chega na pose explodida durante a 1ª camada
      camadas: camadasIguais(0).map((_, i) => clamp01(f - i)),
      ativa: Math.min(N_CAMADAS - 1, Math.floor(f)),
      cotas: 0,
    };
  }
  if (p <= FASES.junta) {
    const t = (p - FASES.camadas) / (FASES.junta - FASES.camadas);
    return { ...entrePoses(POSES.explodido, POSES.explodido, 0), camadas: camadasIguais(1 - suave(t)), ativa: -1, cotas: 0 };
  }
  const t = (p - FASES.junta) / (1 - FASES.junta);
  return { ...entrePoses(POSES.explodido, POSES.lado, t), camadas: camadasIguais(0), ativa: -1, cotas: clamp01((t - 0.6) / 0.4) };
}

export const ABAS = ['camadas', 'som', 'knob', 'portas'];

export function estadoAba(aba) {
  const base = { camadas: camadasIguais(0), ativa: -1, cotas: 0 };
  if (aba === 'camadas') return { ...entrePoses(POSES.explodido, POSES.explodido, 0), ...base, camadas: camadasIguais(1) };
  if (aba === 'som') return { ...entrePoses(POSES.explodido, POSES.explodido, 0), ...base, camadas: camadasIguais(0.6), ativa: GASKETS };
  return { ...entrePoses(POSES[aba], POSES[aba], 0), ...base };
}

// Telas mais estreitas que 16:10 afastam a câmera, para o teclado (32,5 cm) caber na largura.
export function fatorDistancia(aspecto) {
  return Math.max(1, 1.6 / aspecto);
}
