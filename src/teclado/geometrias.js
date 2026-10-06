// Geometrias procedurais reutilizadas pelo modelo do teclado. Unidade: cm.
import * as THREE from 'three';

// Contorno de retângulo arredondado como lista de pontos [x, z], sentido anti-horário.
export function roundedRectPoints(w, d, r, segPerCorner = 5) {
  const pts = [];
  const corners = [
    [w / 2 - r, d / 2 - r, 0],
    [-w / 2 + r, d / 2 - r, Math.PI / 2],
    [-w / 2 + r, -d / 2 + r, Math.PI],
    [w / 2 - r, -d / 2 + r, (3 * Math.PI) / 2],
  ];
  for (const [cx, cz, start] of corners) {
    for (let i = 0; i <= segPerCorner; i++) {
      const a = start + (i / segPerCorner) * (Math.PI / 2);
      pts.push([cx + Math.cos(a) * r, cz + Math.sin(a) * r]);
    }
  }
  return pts;
}

export function roundedRectShape(w, d, r) {
  const pts = roundedRectPoints(w, d, r, 6);
  return new THREE.Shape(pts.map(([x, z]) => new THREE.Vector2(x, z)));
}

// Keycap perfil Cherry: corpo afunilado, cantos arredondados, topo com concavidade
// cilíndrica (dish) e inclinação por fileira. A base (y = 0) fica aberta, como uma keycap real.
export function keycapGeometry({ width, depth, height, tiltDeg, dish = 0.05 }) {
  const ringBottom = roundedRectPoints(width, depth, 0.12);
  const topW = width - 0.5;
  const topD = depth - 0.55;
  const ringTop = roundedRectPoints(topW, topD, 0.22);
  const n = ringBottom.length;
  const tilt = Math.tan(THREE.MathUtils.degToRad(tiltDeg));
  const topShiftZ = -0.06; // o topo fica levemente puxado para trás

  // Altura do topo num ponto (x, z) do plano do topo: inclinação + concavidade.
  const halfW = topW / 2;
  const topY = (x, z) => height + z * tilt - dish * (1 - Math.min(1, (x / halfW) ** 2));

  const positions = [];
  const ring = (pts, yFn, scale = 1, dz = 0) =>
    pts.map(([x, z]) => {
      const px = x * scale;
      const pz = z * scale + dz;
      return [px, yFn(px, pz - dz), pz];
    });

  const rings = [
    ring(ringBottom, () => 0),
    ring(ringTop, (x, z) => topY(x, z) - 0.06, 1.0, topShiftZ), // fim da lateral
    ring(ringTop, (x, z) => topY(x, z), 0.96, topShiftZ),         // borda do topo (arredonda a aresta)
    ring(ringTop, (x, z) => topY(x, z), 0.64, topShiftZ),
    ring(ringTop, (x, z) => topY(x, z), 0.32, topShiftZ),
  ];
  rings.forEach((r) => r.forEach((p) => positions.push(...p)));
  const center = positions.length / 3;
  positions.push(0, topY(0, 0), topShiftZ);

  const index = [];
  for (let k = 0; k < rings.length - 1; k++) {
    const a0 = k * n;
    const b0 = (k + 1) * n;
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      index.push(a0 + i, b0 + j, a0 + j, a0 + i, b0 + i, b0 + j);
    }
  }
  const last = (rings.length - 1) * n;
  for (let i = 0; i < n; i++) index.push(last + i, center, last + ((i + 1) % n));

  // UV planar (x, z) em cm, para as texturas de grão do PBT
  const uvs = [];
  for (let i = 0; i < positions.length; i += 3) uvs.push(positions[i], positions[i + 2]);

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(index);
  geo.computeVertexNormals();
  return geo;
}

// Separa os triângulos de uma geometria em dois grupos de material conforme a normal da face.
// Usado para dar acabamento polido só às faces chanfradas viradas para cima.
export function splitByFaceNormal(geometry, isSecond) {
  const src = geometry.index ? geometry.toNonIndexed() : geometry;
  const names = Object.keys(src.attributes);
  const first = Object.fromEntries(names.map((n) => [n, []]));
  const second = Object.fromEntries(names.map((n) => [n, []]));
  const p = src.attributes.position;
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), n = new THREE.Vector3();
  for (let i = 0; i < p.count; i += 3) {
    a.fromBufferAttribute(p, i); b.fromBufferAttribute(p, i + 1); c.fromBufferAttribute(p, i + 2);
    n.subVectors(c, b).cross(b.clone().sub(a).negate()).normalize();
    const target = isSecond(n) ? second : first;
    for (const name of names) {
      const attr = src.attributes[name];
      for (let k = 0; k < 3; k++) for (let j = 0; j < attr.itemSize; j++) target[name].push(attr.array[(i + k) * attr.itemSize + j]);
    }
  }
  const out = new THREE.BufferGeometry();
  for (const name of names) {
    const size = src.attributes[name].itemSize;
    out.setAttribute(name, new THREE.Float32BufferAttribute([...first[name], ...second[name]], size));
  }
  const firstCount = first.position.length / 3;
  out.addGroup(0, firstCount, 0);
  out.addGroup(firstCount, second.position.length / 3, 1);
  return out; // as normais originais vêm copiadas (cantos continuam suaves)
}

// Base em cunha com cantos arredondados: extruda o contorno e corta o topo por um plano inclinado.
export function wedgeCaseGeometry({ w, d, r, frontH, rearH }) {
  const geo = new THREE.ExtrudeGeometry(roundedRectShape(w, d, r), {
    depth: 1, bevelEnabled: false, curveSegments: 6,
  });
  geo.rotateX(Math.PI / 2); // contorno no plano XZ; extrusão para -Y
  geo.translate(0, 1, 0);   // de y = 0 (fundo) até y = 1 (topo)
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    if (pos.getY(i) > 0.5) {
      const t = (d / 2 - pos.getZ(i)) / d; // 0 na frente, 1 atrás
      pos.setY(i, frontH + (rearH - frontH) * t);
    }
  }
  geo.computeVertexNormals();
  return geo;
}

// Anel da moldura: contorno externo com o recorte das teclas, chanfrado em cima e embaixo.
export function frameGeometry({ w, d, r, wellW, wellD, wellR, height, chamfer }) {
  const shape = roundedRectShape(w - chamfer * 2, d - chamfer * 2, Math.max(0.05, r - chamfer));
  const hole = roundedRectShape(wellW + chamfer * 2, wellD + chamfer * 2, wellR + chamfer);
  shape.holes.push(new THREE.Path(hole.getPoints().reverse()));
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: height - chamfer * 2,
    bevelEnabled: true,
    bevelThickness: chamfer,
    bevelSize: chamfer,
    bevelSegments: 1, // 1 segmento = chanfro reto, não arredondado
    curveSegments: 6,
  });
  geo.rotateX(-Math.PI / 2);
  geo.translate(0, chamfer, 0);
  return geo;
}

// Plate com um furo quadrado de 1,4 cm para cada switch.
export function plateGeometry({ w, d, thickness, holes }) {
  const shape = roundedRectShape(w, d, 0.2);
  for (const { x, z } of holes) {
    const s = 0.7;
    // y do contorno vira -z depois da rotação, por isso o sinal invertido
    shape.holes.push(new THREE.Path([
      new THREE.Vector2(x - s, -z - s), new THREE.Vector2(x - s, -z + s),
      new THREE.Vector2(x + s, -z + s), new THREE.Vector2(x + s, -z - s),
    ]));
  }
  const geo = new THREE.ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: false });
  geo.rotateX(-Math.PI / 2);
  return geo;
}

// Knob: perfil de torno com o topo chanfrado.
export function knobGeometry({ radius, height }) {
  const c = 0.1;
  const pts = [
    [0.001, 0], [radius, 0], [radius, height - c], [radius - c, height], [0.001, height],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  return new THREE.LatheGeometry(pts, 40);
}
