// Teclado FORGE 75: modelo procedural, peça por peça.
// Passe atual: MATERIAIS (PBR por peça; cores e acabamentos de refs/prompt-teclado-3d.md §5).
// Base: modelo-3d/object-sculpt-spec.json + refs/prompt-teclado-3d.md.
// Unidade: 1 = 1 cm. +Y para cima, +Z para a frente, +X para a direita.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { U, WIDTH_U, DEPTH_U, keyPositions } from './layout.js';
import {
  keycapGeometry, wedgeCaseGeometry, frameGeometry, plateGeometry, knobGeometry, splitByFaceNormal,
} from './geometrias.js';
import { createMaterials } from './materiais.js';

// ---- medidas (cm) ----
const KEYS_W = WIDTH_U * U;              // 30,48
const KEYS_D = DEPTH_U * U;              // 11,91
const CASE_W = 32.5;
const CASE_D = 13.7;
const CASE_R = 0.6;                      // raio dos cantos vistos de cima
const FRONT_H = 2.0;                     // altura total na frente
const TILT = THREE.MathUtils.degToRad(6);
const FRAME_H = 1.4;                     // altura da moldura (case de cima)
const CHAMFER = 0.12;
const BASE_FRONT_H = FRONT_H - FRAME_H;  // 0,6
const BASE_REAR_H = BASE_FRONT_H + CASE_D * Math.tan(TILT);
const FEET_H = 0.12;
const WELL_W = KEYS_W + 0.5;
const WELL_D = KEYS_D + 0.4;
const INNER_W = WELL_W - 0.3;
const INNER_D = WELL_D - 0.3;
const KEYCAP_Y = 1.6;                    // onde a keycap começa (no deck)
const SWITCH_Y = 0.61;                   // em cima da PCB

// Perfil Cherry por fileira: altura da keycap (cm) e inclinação do topo (graus, + = frente mais alta).
const ROW_PROFILE = [
  { h: 0.86, tilt: -7 },
  { h: 0.82, tilt: -4 },
  { h: 0.74, tilt: -1 },
  { h: 0.70, tilt: 1 },
  { h: 0.74, tilt: 4 },
  { h: 0.74, tilt: 4 },
];

// Peças de cima para baixo e o deslocamento de cada uma no exploded view.
export const PARTS = [
  { id: 'keycaps',  nome: 'Keycaps',                       explode: 15.0 },
  { id: 'moldura',  nome: 'Moldura (case de cima) + knob', explode: 11.5 },
  { id: 'switches', nome: 'Switches',                      explode: 9.0 },
  { id: 'plate',    nome: 'Plate',                         explode: 6.5 },
  { id: 'gaskets',  nome: 'Gaskets',                       explode: 4.8 },
  { id: 'pcb',      nome: 'PCB',                           explode: 3.2 },
  { id: 'espuma',   nome: 'Espuma',                        explode: 1.6 },
  { id: 'base',     nome: 'Base (case de baixo)',          explode: 0 },
];

function box(w, h, d, x = 0, y = 0, z = 0) {
  const geo = new THREE.BoxGeometry(w, h, d);
  geo.translate(x, y + h / 2, z); // apoiado em y
  return geo;
}

function mesh(name, geo, mat) {
  const m = new THREE.Mesh(geo, mat);
  m.name = name;
  return m;
}

function part(id, ...meshes) {
  const node = new THREE.Group();
  node.name = id;
  node.userData.part = id;
  for (const m of meshes) {
    m.castShadow = m.receiveShadow = true;
    // cópia por peça: o destaque do clique não acende outras peças com o mesmo material
    m.material = Array.isArray(m.material) ? m.material.map((x) => x.clone()) : m.material.clone();
    node.add(m);
  }
  return node;
}

export function createKeyboardModel() {
  const root = new THREE.Group();
  root.name = 'forge-75';
  const body = new THREE.Group(); // tudo em cima dos pés
  body.position.y = FEET_H;
  root.add(body);
  const { keys, knob } = keyPositions();
  const nodes = {};
  const mat = createMaterials();

  // ---------------- base (case de baixo) ----------------
  const baseMeshes = [
    mesh('base-cunha', wedgeCaseGeometry({ w: CASE_W, d: CASE_D, r: CASE_R, frontH: BASE_FRONT_H, rearH: BASE_REAR_H }), mat.case),
    mesh('faixa-frontal', box(CASE_W - 2, 0.12, 0.04, 0, 0.24, CASE_D / 2), mat.azulAnodizado),
    mesh('porta-usb-c', box(0.9, 0.32, 0.06, 0, BASE_REAR_H / 2 - 0.16, -CASE_D / 2), mat.porta),
  ];
  // pés de borracha e parafusos (embaixo)
  for (const [x, z] of [[-12.5, -5], [12.5, -5], [-12.5, 5], [12.5, 5]]) {
    baseMeshes.push(mesh('pe', box(3.0, FEET_H, 0.8, x, -FEET_H, z), mat.borracha));
  }
  const screwGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.03, 16);
  for (const x of [-10, 0, 10]) {
    for (const z of [-4.5, 4.5]) {
      const s = mesh('parafuso', screwGeo, mat.parafuso);
      s.position.set(x, -0.014, z);
      baseMeshes.push(s);
    }
  }
  baseMeshes.forEach((m) => { m.userData.explodeWithParent = true; });
  nodes.base = part('base', ...baseMeshes);
  body.add(nodes.base);

  // ---------------- deck: tudo em cima da base, inclinado 6° ----------------
  const deck = new THREE.Group();
  deck.name = 'deck';
  deck.position.set(0, (BASE_FRONT_H + BASE_REAR_H) / 2, 0);
  deck.rotation.x = TILT;
  body.add(deck);

  // moldura + knob
  const knobMesh = mesh('knob', knobGeometry({ radius: 0.9, height: 1.2 }), mat.knob);
  knobMesh.position.set(knob.x, KEYCAP_Y, knob.z);
  nodes.moldura = part('moldura',
    // faces chanfradas viradas para cima ganham alumínio polido (a faixa prateada da referência)
    mesh('moldura-anel', splitByFaceNormal(frameGeometry({
      w: CASE_W, d: CASE_D, r: CASE_R, wellW: WELL_W, wellD: WELL_D, wellR: 0.3, height: FRAME_H, chamfer: CHAMFER,
    }), (n) => n.y > 0.3 && n.y < 0.95), [mat.case, mat.chanfro]),
    knobMesh,
  );

  // espuma e PCB (com chip e conector USB)
  nodes.espuma = part('espuma', mesh('espuma-placa', box(INNER_W, 0.35, INNER_D), mat.espuma));
  nodes.pcb = part('pcb',
    mesh('pcb-placa', box(INNER_W, 0.16, INNER_D, 0, 0.45), mat.pcb),
    mesh('pcb-chip', box(1.0, 0.1, 1.0, 3.2, 0.61, -INNER_D / 2 + 2.2), mat.chip),
    mesh('pcb-conector-usb', box(0.95, 0.35, 0.8, 0, 0.61, -INNER_D / 2 + 0.4), mat.conector),
  );

  // plate com os furos dos switches
  const plateMesh = mesh('plate-chapa', plateGeometry({ w: INNER_W, d: INNER_D, thickness: 0.15, holes: keys }), mat.plate);
  plateMesh.position.y = 1.1;
  nodes.plate = part('plate', plateMesh);

  // gaskets: 4 tiras atrás e 4 na frente, embaixo da plate
  const gasketGeo = box(2.6, 0.15, 0.5);
  const gaskets = [];
  for (const side of [-1, 1]) {
    for (let i = 0; i < 4; i++) {
      const g = mesh(`gasket-${side < 0 ? 'tras' : 'frente'}-${i + 1}`, gasketGeo, mat.gasket);
      g.position.set((i - 1.5) * (INNER_W / 4), 0.95, side * (INNER_D / 2 - 0.25));
      gaskets.push(g);
    }
  }
  nodes.gaskets = part('gaskets', ...gaskets);

  // switches: corpo (base + topo afunilado) e stem em cruz, um por tecla (instancing)
  const housingGeo = mergeGeometries([
    box(1.4, 0.55, 1.4),
    new THREE.CylinderGeometry(0.62 * Math.SQRT2, 0.7 * Math.SQRT2, 0.5, 4, 1)
      .rotateY(Math.PI / 4).translate(0, 0.55 + 0.25, 0),
  ]);
  const stemGeo = mergeGeometries([box(0.42, 0.36, 0.12, 0, 1.05), box(0.12, 0.36, 0.42, 0, 1.05)]);
  const housing = new THREE.InstancedMesh(housingGeo, mat.switchCorpo, keys.length);
  housing.name = 'switch-corpo';
  const stems = new THREE.InstancedMesh(stemGeo, mat.switchStem, keys.length);
  stems.name = 'switch-stem';
  const mtx = new THREE.Matrix4();
  keys.forEach((k, i) => {
    mtx.makeTranslation(k.x, SWITCH_Y, k.z);
    housing.setMatrixAt(i, mtx);
    stems.setMatrixAt(i, mtx);
  });
  nodes.switches = part('switches', housing, stems);

  // keycaps: uma geometria por tecla, juntadas por tipo (1 objeto, 3 materiais)
  const byKind = { alpha: [], mod: [], accent: [] };
  for (const k of keys) {
    const { h, tilt } = ROW_PROFILE[k.row];
    const geo = keycapGeometry({ width: k.w * U - 0.1, depth: U - 0.1, height: h, tiltDeg: tilt });
    geo.translate(k.x, KEYCAP_Y, k.z);
    byKind[k.kind].push(geo);
  }
  const kinds = ['alpha', 'mod', 'accent'];
  const capsGeo = mergeGeometries(kinds.map((kind) => mergeGeometries(byKind[kind])), true);
  const capsMesh = mesh('keycaps-conjunto', capsGeo, [mat.keycapAlpha, mat.keycapMod, mat.keycapAccent]);
  nodes.keycaps = part('keycaps', capsMesh);

  for (const p of PARTS) if (p.id !== 'base') deck.add(nodes[p.id]);

  // ---- exploded view: 0 = montado, 1 = todo separado ----
  function setExplode(t) {
    for (const p of PARTS) {
      if (p.id !== 'base') nodes[p.id].position.y = p.explode * t;
    }
  }

  // Sobe até achar a peça a que um objeto clicado pertence.
  function partOf(object) {
    for (let o = object; o; o = o.parent) if (o.userData.part) return o.userData.part;
    return null;
  }

  return { root, nodes, setExplode, partOf, keyCount: keys.length };
}
