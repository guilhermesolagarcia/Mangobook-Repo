// Protótipo descartável: compara 3 aberturas do hero com o modelo real.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createKeyboardModel } from '../src/teclado/modelo.js';

gsap.registerPlugin(ScrollTrigger);

const v = new URLSearchParams(location.search).get('v') || 'a';
document.querySelector(`.bar a[href="?v=${v}"]`)?.setAttribute('aria-current', 'page');
document.getElementById('desc').textContent = {
  a: 'gira de frente para cima e emenda no exploded view',
  b: 'começa colado no knob e afasta até o teclado inteiro',
  c: 'teclado parado girando sozinho, só o texto se move',
}[v];

// ---- cena ----
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
document.body.prepend(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf5f5f7);
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.9;

const camera = new THREE.PerspectiveCamera(30, innerWidth / innerHeight, 0.1, 500);

scene.add(new THREE.HemisphereLight(0xffffff, 0xd0d2d6, 0.5));
const key = new THREE.DirectionalLight(0xffffff, 1.5);
key.position.set(-20, 40, 25);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
key.shadow.radius = 6;
Object.assign(key.shadow.camera, { left: -30, right: 30, top: 30, bottom: -30 });
scene.add(key);

const floor = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.ShadowMaterial({ opacity: 0.12 }));
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

const model = createKeyboardModel();
scene.add(model.root);

// ---- shader: faixa de luz que varre o metal ----
// Uma gaussiana na diagonal do mundo, somada à cor final dos materiais metálicos.
const uSweep = { value: -40 };
model.root.traverse((o) => {
  for (const m of [o.material].flat()) {
    if (!m || m.metalness !== 1 || m.userData.sweep) continue;
    m.userData.sweep = true;
    m.onBeforeCompile = (sh) => {
      sh.uniforms.uSweep = uSweep;
      sh.vertexShader = sh.vertexShader
        .replace('#include <common>', '#include <common>\nvarying vec3 vWPos;')
        .replace('#include <project_vertex>', '#include <project_vertex>\nvWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;');
      sh.fragmentShader = sh.fragmentShader
        .replace('#include <common>', '#include <common>\nuniform float uSweep;\nvarying vec3 vWPos;')
        .replace('#include <dithering_fragment>', `#include <dithering_fragment>
          float band = exp(-pow((vWPos.x + vWPos.z * 0.7 - uSweep) / 1.6, 2.0));
          gl_FragColor.rgb += band * 0.28;`);
    };
  }
});

// ---- estado animado pelo scroll ----
// c = posição da câmera, t = alvo, ry = giro do teclado, ex = desmontar
const POSES = {
  frente: { cx: 0, cy: 5, cz: 70, tx: 0, ty: 4, tz: 0, ry: -0.35 },
  cima:   { cx: 0, cy: 58, cz: 26, tx: 0, ty: 0, tz: 2, ry: 0 },
  knob:   { cx: 19, cy: 7, cz: 4, tx: 14, ty: 3, tz: -5, ry: 0 },
  tres4:  { cx: -28, cy: 24, cz: 40, tx: 0, ty: 2, tz: 0, ry: 0 },
  lado:   { cx: -46, cy: 34, cz: 40, tx: 0, ty: 8, tz: 0, ry: 0 },
};
const s = { ...(v === 'b' ? POSES.knob : v === 'c' ? POSES.tres4 : POSES.frente), ex: 0 };

const hero = gsap.timeline({ scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom bottom', scrub: 1 } });
hero.to('.hint', { autoAlpha: 0, duration: 0.1 }, 0);
if (v === 'a') {
  hero.to(s, { ...POSES.cima, ease: 'power2.inOut', duration: 1 }, 0)
      .to('.titulo, .sub', { y: -120, autoAlpha: 0, stagger: 0.05, duration: 0.4 }, 0.1)
      .to(uSweep, { value: 40, ease: 'none', duration: 1 }, 0);
} else if (v === 'b') {
  gsap.set('.titulo, .sub', { autoAlpha: 0, y: 40 });
  hero.to(s, { ...POSES.tres4, ease: 'power2.inOut', duration: 1 }, 0)
      .to(uSweep, { value: 40, ease: 'none', duration: 1 }, 0)
      .to('.titulo, .sub', { autoAlpha: 1, y: 0, stagger: 0.05, duration: 0.3 }, 0.6);
} else {
  hero.to('.titulo', { y: -220, duration: 1, ease: 'none' }, 0)
      .to('.sub', { y: -120, duration: 1, ease: 'none' }, 0)
      .to('.titulo, .sub', { autoAlpha: 0, duration: 0.3 }, 0.7);
  gsap.to(uSweep, { value: 40, duration: 4, repeat: -1, repeatDelay: 2, ease: 'none' });
}

// Exploded view logo em seguida, com a mesma câmera (mostra se emenda bem).
gsap.timeline({ scrollTrigger: { trigger: '#explode', start: 'top top', end: 'bottom bottom', scrub: 1 } })
  .to(s, { ...POSES.lado, ex: 1, ease: 'power2.inOut', duration: 1 }, 0)
  .from('.exp-titulo', { autoAlpha: 0, y: 30, duration: 0.3 }, 0.1);

if (matchMedia('(prefers-reduced-motion: reduce)').matches) ScrollTrigger.getAll().forEach((t) => { t.animation.progress(1); t.kill(); });

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

const clock = new THREE.Clock();
renderer.setAnimationLoop(() => {
  const spin = v === 'c' ? clock.getElapsedTime() * 0.25 : 0;
  model.root.rotation.y = s.ry + spin;
  model.setExplode(s.ex);
  camera.position.set(s.cx, s.cy, s.cz);
  camera.lookAt(s.tx, s.ty, s.tz);
  renderer.render(scene, camera);
});
