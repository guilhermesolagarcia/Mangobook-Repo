import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  POSES, N_CAMADAS, FASES, estadoAbertura, estadoPorDentro, estadoAba, ABAS, fatorDistancia,
} from './roteiro.js';

const perto = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} != ${b}`);
const pertoV = (a, b) => a.forEach((v, i) => perto(v, b[i]));

test('abertura vai da frente para cima', () => {
  pertoV(estadoAbertura(0).cam, POSES.frente.cam);
  pertoV(estadoAbertura(1).cam, POSES.cima.cam);
  perto(estadoAbertura(1).giro, POSES.cima.giro);
  assert.deepEqual(estadoAbertura(0.5).camadas, Array(N_CAMADAS).fill(0));
});

test('por dentro começa montado, na camada 0', () => {
  const e = estadoPorDentro(0);
  assert.deepEqual(e.camadas, Array(N_CAMADAS).fill(0));
  assert.equal(e.ativa, 0);
  pertoV(e.cam, POSES.cima.cam);
});

test('metade da primeira fatia levanta só metade das keycaps', () => {
  const e = estadoPorDentro(FASES.camadas / N_CAMADAS / 2);
  perto(e.camadas[0], 0.5);
  assert.ok(e.camadas.slice(1).every((c) => c === 0));
  assert.equal(e.ativa, 0);
});

test('fim da fase de camadas: todas em cima, a última ativa', () => {
  const e = estadoPorDentro(FASES.camadas);
  assert.ok(e.camadas.every((c) => c === 1));
  assert.equal(e.ativa, N_CAMADAS - 1);
  pertoV(e.cam, POSES.explodido.cam);
});

test('a camada ativa nunca volta enquanto o scroll avança', () => {
  let anterior = -1;
  for (let i = 0; i <= 200; i++) {
    const { ativa } = estadoPorDentro((i / 200) * FASES.camadas);
    assert.ok(ativa >= anterior);
    anterior = ativa;
  }
});

test('junta as camadas e termina de lado, com as cotas', () => {
  assert.ok(estadoPorDentro(FASES.junta).camadas.every((c) => c === 0));
  const fim = estadoPorDentro(1);
  pertoV(fim.cam, POSES.lado.cam);
  perto(fim.cotas, 1);
  assert.equal(fim.ativa, -1);
});

test('progresso fora de 0..1 é limitado (pular por âncora ou rolar demais)', () => {
  assert.deepEqual(estadoPorDentro(-3), estadoPorDentro(0));
  assert.deepEqual(estadoPorDentro(7), estadoPorDentro(1));
  assert.deepEqual(estadoAbertura(-1), estadoAbertura(0));
});

test('mesmo progresso, mesmo estado (rolar para trás não acumula)', () => {
  assert.deepEqual(estadoPorDentro(0.4), estadoPorDentro(0.4));
});

test('cada aba tem uma pose, e a aba Som destaca os gaskets', () => {
  for (const aba of ABAS) assert.equal(estadoAba(aba).camadas.length, N_CAMADAS);
  assert.equal(estadoAba('som').ativa, 4);
  pertoV(estadoAba('knob').cam, POSES.knob.cam);
});

test('tela estreita afasta a câmera; tela larga não mexe', () => {
  perto(fatorDistancia(16 / 9), 1);
  assert.ok(fatorDistancia(390 / 844) > 2);
});

test('deslocamento lateral do explodido acompanha o progresso e some fora dele', () => {
  perto(estadoAbertura(1).lateral, 0);
  perto(estadoPorDentro(FASES.camadas).lateral, POSES.explodido.lateral);
  assert.ok(POSES.explodido.lateral < 0);
  perto(estadoPorDentro(1).lateral, 0);
  perto(estadoAba('knob').lateral, 0);
});
