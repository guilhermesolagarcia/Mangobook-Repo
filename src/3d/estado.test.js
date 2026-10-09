import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { estado, assumir, escrever, configurarMistura } from './estado.js';
import { POSES, estadoAbertura, estadoPorDentro } from './roteiro.js';

const pertoV = (a, b) => a.forEach((v, i) => assert.ok(Math.abs(v - b[i]) < 1e-9, `${a} != ${b}`));

beforeEach(() => configurarMistura(0)); // sem transição: o efeito de cada escrita é imediato

test('só o dono da cena escreve no palco', () => {
  assumir('abertura');
  escrever('abertura', estadoAbertura(0));
  escrever('porDentro', estadoPorDentro(1));
  pertoV(estado.cam, POSES.frente.cam);
});

test('pular para o topo: a escrita atrasada do scrub da cena 3 é ignorada', () => {
  assumir('porDentro');
  escrever('porDentro', estadoPorDentro(0.9));
  // âncora "Visão geral": a abertura assume, mas o scrub da cena 3 ainda grava no mesmo quadro (e por último)
  assumir('abertura');
  escrever('abertura', estadoAbertura(0));
  escrever('porDentro', estadoPorDentro(0));
  pertoV(estado.cam, POSES.frente.cam);
});

test('voltar a ser dono reaplica a última pose pedida pela cena', () => {
  assumir('porDentro');
  escrever('porDentro', estadoPorDentro(1));
  assumir('abas');
  escrever('abas', estadoAbertura(0));
  assumir('porDentro');
  escrever('porDentro', estadoPorDentro(1));
  pertoV(estado.cam, POSES.lado.cam);
});
