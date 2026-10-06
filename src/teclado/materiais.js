// Materiais PBR do teclado (refs/prompt-teclado-3d.md §5).
// Texturas procedurais com semente fixa: rugosidade e relevo são campos independentes,
// cada um com três faixas de frequência (macro, meso, micro).
import * as THREE from 'three';

export const CORES = {
  case: '#08090a',
  chanfro: '#d9dbde',
  azul: '#2563eb',
  alpha: '#41454c',
  mod: '#2b2e33',
  knob: '#c8cacd',
  plate: '#2a2c30',
};

// Ruído de valor com semente: determinístico, sem depender de DOM.
function noiseTexture({ size = 256, seed = 1, bands, base = 0.5 }) {
  let s = seed >>> 0;
  const rand = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  const grids = bands.map(({ cells }) => {
    const g = new Float32Array(cells * cells);
    for (let i = 0; i < g.length; i++) g[i] = rand() * 2 - 1;
    return g;
  });
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let v = base;
      bands.forEach(({ cells, amp }, b) => {
        const fx = (x / size) * cells, fy = (y / size) * cells;
        const x0 = Math.floor(fx), y0 = Math.floor(fy);
        const tx = fx - x0, ty = fy - y0;
        const at = (i, j) => grids[b][((j + cells) % cells) * cells + ((i + cells) % cells)];
        const sx = tx * tx * (3 - 2 * tx), sy = ty * ty * (3 - 2 * ty);
        const top = at(x0, y0) * (1 - sx) + at(x0 + 1, y0) * sx;
        const bot = at(x0, y0 + 1) * (1 - sx) + at(x0 + 1, y0 + 1) * sx;
        v += (top * (1 - sy) + bot * sy) * amp;
      });
      const c = Math.max(0, Math.min(255, Math.round(v * 255)));
      const i = (y * size + x) * 4;
      data[i] = data[i + 1] = data[i + 2] = c;
      data[i + 3] = 255;
    }
  }
  const tex = new THREE.DataTexture(data, size, size);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  tex.needsUpdate = true;
  return tex;
}

// Faixas: macro (manchas suaves), meso (grão), micro (quebra o brilho de perto).
const BANDS_PBT = [{ cells: 4, amp: 0.04 }, { cells: 48, amp: 0.06 }, { cells: 128, amp: 0.08 }];
const BANDS_FOAM = [{ cells: 8, amp: 0.08 }, { cells: 64, amp: 0.15 }, { cells: 128, amp: 0.12 }];

export function createMaterials() {
  const tex = {
    pbtRough: noiseTexture({ seed: 21, bands: BANDS_PBT, base: 0.5 }),
    pbtBump: noiseTexture({ seed: 22, bands: BANDS_PBT, base: 0.5 }),
    foamBump: noiseTexture({ seed: 31, bands: BANDS_FOAM, base: 0.5 }),
  };
  tex.pbtRough.repeat.set(0.6, 0.6);
  tex.pbtBump.repeat.set(0.6, 0.6);

  // Alumínio anodizado: metálico e acetinado, superfície lisa (sem textura de jateado).
  // envMapIntensity baixo: o anodizado escuro reflete pouco o ambiente.
  const anodizado = (cor, envMapIntensity = 1) =>
    new THREE.MeshPhysicalMaterial({ color: cor, metalness: 1, roughness: 0.55, envMapIntensity });
  // PBT: plástico fosco com textura levemente granulada.
  const pbt = (cor) => new THREE.MeshStandardMaterial({
    color: cor, metalness: 0, roughness: 0.82,
    roughnessMap: tex.pbtRough, bumpMap: tex.pbtBump, bumpScale: 0.35,
    side: THREE.DoubleSide, // a keycap é aberta embaixo, como uma de verdade
  });
  const fosco = (cor, roughness = 0.95) => new THREE.MeshStandardMaterial({ color: cor, metalness: 0, roughness });

  return {
    case: anodizado(CORES.case, 0.25),
    chanfro: new THREE.MeshPhysicalMaterial({ color: CORES.chanfro, metalness: 1, roughness: 0.14 }),
    azulAnodizado: anodizado(CORES.azul),
    keycapAlpha: pbt(CORES.alpha),
    keycapMod: pbt(CORES.mod),
    keycapAccent: pbt(CORES.azul),
    knob: new THREE.MeshPhysicalMaterial({
      color: CORES.knob, metalness: 1, roughness: 0.28, anisotropy: 0.7, // escovado
    }),
    plate: new THREE.MeshPhysicalMaterial({ color: CORES.plate, metalness: 1, roughness: 0.5 }),
    pcb: new THREE.MeshPhysicalMaterial({ color: '#141516', roughness: 0.55, clearcoat: 0.35, clearcoatRoughness: 0.4 }),
    chip: fosco('#0c0c0d', 0.6),
    conector: new THREE.MeshStandardMaterial({ color: '#9ea2a8', metalness: 1, roughness: 0.35 }),
    switchCorpo: fosco('#34363b', 0.55),
    switchStem: fosco(CORES.azul, 0.5),
    gasket: fosco('#26272a'),
    espuma: new THREE.MeshStandardMaterial({
      color: '#3a3b3e', roughness: 1, bumpMap: tex.foamBump, bumpScale: 2,
    }),
    borracha: fosco('#18191b', 0.9),
    parafuso: new THREE.MeshStandardMaterial({ color: '#2c2e31', metalness: 1, roughness: 0.4 }),
    porta: fosco('#0b0b0c', 0.7),
  };
}
