// Visualizador dos passes do modelo: girar, desmontar e clicar nas peças.
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { createKeyboardModel, PARTS } from './teclado/modelo.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
document.body.prepend(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe9eaec);
// Ambiente de estúdio para os metais terem o que refletir.
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.9;

const camera = new THREE.PerspectiveCamera(30, innerWidth / innerHeight, 0.1, 500);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 3, 0);

// Luz neutra de revisão: principal, preenchimento e contorno.
scene.add(new THREE.HemisphereLight(0xffffff, 0xb0b3b8, 0.35));
const key = new THREE.DirectionalLight(0xffffff, 1.6);
key.position.set(-20, 40, 25);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
Object.assign(key.shadow.camera, { left: -30, right: 30, top: 30, bottom: -30 });
scene.add(key);
const rim = new THREE.DirectionalLight(0xffffff, 0.8);
rim.position.set(25, 15, -30);
scene.add(rim);

const floor = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.ShadowMaterial({ opacity: 0.18 }));
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

const model = createKeyboardModel();
scene.add(model.root);

// Câmeras de revisão (as mesmas vistas da imagem de ângulos).
const VIEWS = {
  34: { pos: [-28, 26, 38], target: [0, 2, 0] },
  topo: { pos: [0, 62, 0.01], target: [0, 0, 0] },
  frente: { pos: [0, 4, 60], target: [0, 2, 0] },
  lado: { pos: [-60, 4, 0], target: [0, 2, 0] },
};
function setView(name) {
  const v = VIEWS[name];
  camera.position.set(...v.pos);
  controls.target.set(...v.target);
  controls.update();
}
setView('34');
document.querySelectorAll('[data-view]').forEach((b) => b.addEventListener('click', () => setView(b.dataset.view)));

// Fundo claro (revisão) ou escuro (como no site)
const fundo = document.getElementById('fundo');
fundo.addEventListener('click', () => {
  const escuro = fundo.getAttribute('aria-pressed') !== 'true';
  fundo.setAttribute('aria-pressed', String(escuro));
  fundo.textContent = escuro ? 'Fundo claro' : 'Fundo escuro';
  scene.background.setHex(escuro ? 0x0e0f11 : 0xe9eaec);
  floor.material.opacity = escuro ? 0.5 : 0.18;
  document.body.classList.toggle('escuro', escuro);
});

// Desmontar
const slider = document.getElementById('explode');
slider.addEventListener('input', () => model.setExplode(Number(slider.value)));

// Clicar numa peça: destaca e mostra o nome.
const picked = document.getElementById('picked');
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let highlighted = null;
function highlight(id) {
  if (highlighted) model.nodes[highlighted].traverse((o) => [o.material].flat().forEach((mt) => mt?.emissive?.setHex(0x000000)));
  highlighted = id;
  if (id) model.nodes[id].traverse((o) => [o.material].flat().forEach((mt) => mt?.emissive?.setHex(0x1d4ed8)));
  picked.textContent = id ? PARTS.find((p) => p.id === id).nome : 'nenhuma';
}
let downAt = null;
renderer.domElement.addEventListener('pointerdown', (e) => { downAt = [e.clientX, e.clientY]; });
renderer.domElement.addEventListener('pointerup', (e) => {
  if (!downAt || Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]) > 4) return; // foi arrasto
  pointer.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObject(model.root, true)[0];
  highlight(hit ? model.partOf(hit.object) : null);
});

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

renderer.setAnimationLoop(() => {
  controls.update();
  renderer.render(scene, camera);
});
