// Som de digitação gerado no navegador (Web Audio): ruído curto filtrado + um grave.
// ponytail: síntese aproximada; os PERFIS são o botão de calibração. Se soar falso, grave um áudio real.
export const PERFIS = {
  com: { tipo: 'lowpass',  freq: 900,  q: 0.7, decaimento: 0.05, grave: 110, eco: 0 },    // gasket + espuma
  sem: { tipo: 'bandpass', freq: 2600, q: 4,   decaimento: 0.2,  grave: 0,   eco: 0.35 }, // case vazio
};

let ctx;

function toc(p, t) {
  const dur = p.decaimento + 0.05;
  const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * dur), ctx.sampleRate);
  const dados = buffer.getChannelData(0);
  const queda = ctx.sampleRate * (p.decaimento / 5);
  for (let i = 0; i < dados.length; i++) dados[i] = (Math.random() * 2 - 1) * Math.exp(-i / queda);

  const fonte = ctx.createBufferSource();
  fonte.buffer = buffer;
  const filtro = ctx.createBiquadFilter();
  filtro.type = p.tipo; filtro.frequency.value = p.freq; filtro.Q.value = p.q;
  const ganho = ctx.createGain();
  ganho.gain.value = 0.5;
  fonte.connect(filtro).connect(ganho).connect(ctx.destination);
  if (p.eco) {
    const atraso = ctx.createDelay();
    atraso.delayTime.value = 0.045;
    const g = ctx.createGain();
    g.gain.value = p.eco;
    ganho.connect(atraso).connect(g).connect(ctx.destination);
  }
  fonte.start(t);

  if (p.grave) {
    const osc = ctx.createOscillator();
    osc.frequency.setValueAtTime(p.grave, t);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.35, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    osc.connect(g).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.06);
  }
}

// Seis toques, como uma palavra digitada. Só toca em resposta a um clique.
export function tocar(perfil) {
  ctx ??= new AudioContext();
  const p = PERFIS[perfil];
  for (let i = 0; i < 6; i++) toc(p, ctx.currentTime + 0.02 + i * 0.16 + Math.random() * 0.03);
}
