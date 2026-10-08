import { Canvas } from '@react-three/fiber';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import * as THREE from 'three';
import Teclado from './Teclado.jsx';
import { POSES } from './roteiro.js';
import './palco.css';

// Em retrato o plano do gradiente não cobre a largura; a câmera dele chega mais perto.
const retrato = window.innerWidth < window.innerHeight;

const temWebGL = (() => {
  try { return Boolean(document.createElement('canvas').getContext('webgl2')); } catch { return false; }
})();
// as cenas escondem o que depende do 3D (linhas e cotas ancoradas no modelo)
if (!temWebGL) document.documentElement.classList.add('sem-webgl');

// Ambiente de estúdio para o alumínio ter o que refletir (o mesmo do visualizador).
function Estudio() {
  return (
    <>
      <hemisphereLight args={[0xffffff, 0xd0d2d6, 0.5]} />
      <directionalLight position={[-20, 40, 25]} intensity={1.5} castShadow
        shadow-mapSize={[2048, 2048]} shadow-radius={6}
        shadow-camera-left={-30} shadow-camera-right={30} shadow-camera-top={30} shadow-camera-bottom={-30} />
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[400, 400]} />
        <shadowMaterial opacity={0.12} depthWrite={false} />
      </mesh>
    </>
  );
}

function aoCriar({ gl, scene }) {
  gl.toneMapping = THREE.ACESFilmicToneMapping;
  scene.environment = new THREE.PMREMGenerator(gl).fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.9;
}

export default function Palco() {
  return (
    <div className="palco" aria-hidden="true">
      {temWebGL ? (
        <>
          <div className="palco-luz">
            <ShaderGradientCanvas pixelDensity={1} pointerEvents="none" style={{ position: 'absolute', inset: 0 }}>
              <ShaderGradient control="props" type="plane" animate="on" uSpeed={0.06} uStrength={0.3} uDensity={0.8}
                color1="#ffffff" color2="#dce6ff" color3="#f5f5f7" brightness={1.2} cDistance={retrato ? 1.4 : 3.6}
                lightType="3d" envPreset="city" grain="off" />
            </ShaderGradientCanvas>
          </div>
          <Canvas className="palco-canvas" shadows frameloop="demand" dpr={[1, 2]}
            gl={{ alpha: true, antialias: true }} onCreated={aoCriar}
            camera={{ fov: 30, near: 0.1, far: 500, position: POSES.frente.cam }}>
            <Estudio />
            <Teclado />
          </Canvas>
        </>
      ) : (
        <img className="palco-foto" src="/teclado.png" alt="" />
      )}
    </div>
  );
}
