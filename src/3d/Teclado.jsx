import { useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { createKeyboardModel, PARTS } from '../teclado/modelo.js';
import { estado, ligarInvalidar } from './estado.js';
import { fatorDistancia } from './roteiro.js';

const APAGADA = 0.18;
// Pontos de referência no espaço do teclado (cm): borda esquerda das camadas e os cantos do perfil lateral.
const BORDA_CAMADA = new THREE.Vector3(-15.5, 0.6, 0);
const CANTOS = {
  fb: new THREE.Vector3(0, 0.12, 6.85), ft: new THREE.Vector3(0, 2.12, 6.85),
  tb: new THREE.Vector3(0, 0.12, -6.85), tt: new THREE.Vector3(0, 3.45, -6.85),
};
const v = new THREE.Vector3();
const offset = new THREE.Vector3();
const alvo = new THREE.Vector3();
const raiz = document.documentElement.style;

export default function Teclado() {
  const modelo = useMemo(() => createKeyboardModel(), []);
  const { camera, invalidate, size } = useThree();

  useEffect(() => {
    ligarInvalidar(invalidate);
    return () => ligarInvalidar(() => {});
  }, [invalidate]);

  // Materiais de cada camada (já são cópias por peça no modelo), prontos para apagar as fora de foco.
  const materiais = useMemo(() => PARTS.map((p) => {
    const lista = [];
    modelo.nodes[p.id].traverse((o) => { if (o.material) lista.push(...[o.material].flat()); });
    lista.forEach((m) => { m.transparent = true; });
    return lista;
  }), [modelo]);

  function publicar(nome, ponto) {
    v.copy(ponto).project(camera);
    raiz.setProperty(`--${nome}-x`, `${((v.x + 1) / 2) * size.width}px`);
    raiz.setProperty(`--${nome}-y`, `${((1 - v.y) / 2) * size.height}px`);
  }

  useFrame(() => {
    // câmera: mais longe em telas estreitas, sem mudar para onde ela olha
    const aspecto = size.width / size.height;
    offset.set(...estado.cam).sub(v.set(...estado.alvo)).multiplyScalar(fatorDistancia(aspecto));
    alvo.set(...estado.alvo);
    if (aspecto >= 1) alvo.x += estado.lateral; // em retrato o texto fica embaixo: o modelo continua centralizado
    camera.position.copy(alvo).add(offset);
    camera.lookAt(alvo);
    camera.updateMatrixWorld(); // a projeção das âncoras abaixo usa a câmera deste quadro, não a do anterior

    modelo.root.position.y = estado.subida;
    modelo.root.rotation.y = estado.giro + estado.balanco;
    PARTS.forEach((p, i) => {
      modelo.nodes[p.id].position.y = p.explode * estado.camadas[i];
      const opacidade = estado.ativa < 0 || estado.ativa === i ? 1 : APAGADA;
      for (const m of materiais[i]) { m.opacity = opacidade; m.depthWrite = opacidade === 1; }
    });
    modelo.root.updateMatrixWorld();

    if (estado.ativa >= 0) {
      publicar('ancora', modelo.nodes[PARTS[estado.ativa].id].localToWorld(BORDA_CAMADA.clone()));
    }
    raiz.setProperty('--cotas', String(estado.cotas));
    if (estado.cotas > 0) {
      for (const [nome, ponto] of Object.entries(CANTOS)) publicar(nome, modelo.root.localToWorld(ponto.clone()));
    }
  });

  return <primitive object={modelo.root} />;
}
