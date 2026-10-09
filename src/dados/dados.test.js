import test from 'node:test';
import assert from 'node:assert/strict';
import { proximaAba } from './abas.js';
import { CORES } from './cores.js';
import { USOS } from './usos.js';
import { IA_VERSOES, textoDigitado } from './ia.js';
import { CENAS_OS, ITENS_OS } from './sistema.js';
import { MODELOS, SPECS, larguraBarra } from './comparador.js';
import { ondas } from './ondas.js';

test('proximaAba avança, volta e dá a volta', () => {
  assert.equal(proximaAba(0, 'ArrowRight', 4), 1);
  assert.equal(proximaAba(3, 'ArrowRight', 4), 0);
  assert.equal(proximaAba(0, 'ArrowLeft', 4), 3);
  assert.equal(proximaAba(1, 'Enter', 4), null);
  assert.equal(proximaAba(1, 'ArrowDown', 4), null);
  assert.equal(proximaAba(1, 'ArrowDown', 4, 'hv'), 2);
  assert.equal(proximaAba(0, 'ArrowUp', 4, 'hv'), 3);
});

test('cores batem com o MARCA.md', () => {
  assert.deepEqual(CORES.map((c) => [c.id, c.tom]), [
    ['manga', '#fff3d1'], ['rosa', '#ffe8de'], ['folha', '#eaf6df'], ['prata', '#eef0f4'],
  ]);
});

test('quantidades das listas', () => {
  assert.equal(USOS.length, 4);
  assert.equal(IA_VERSOES.length, 3);
  assert.equal(CENAS_OS.length, 4);
  assert.equal(ITENS_OS.length, 4);
});

test('texto da IA digita até k letras e para no fim', () => {
  const v = IA_VERSOES[1];
  assert.deepEqual(textoDigitado(v, 4), { texto: v.slice(0, 4), digitando: true });
  assert.deepEqual(textoDigitado(v, v.length + 1), { texto: v, digitando: false });
});

test('specs formatadas como no protótipo', () => {
  const por = Object.fromEntries(SPECS.map((s) => [s.rot, s]));
  assert.equal(por['Tela'].fmt(13.6), '13,6"');
  assert.equal(por['Bateria'].fmt(18), '18 horas');
  assert.equal(por['Núcleos da CPU'].fmt(8), '8 núcleos');
  assert.equal(por['Leveza'].fmt(1.2), '1,2 kg');
  assert.equal(MODELOS.pure.preco, 'A partir de R$ 7.999');
});

test('largura da barra tem piso de 28%', () => {
  assert.equal(larguraBarra(24, 24), '100%');
  assert.equal(larguraBarra(1, 100), '28%');
});

test('ondas: 48 barras, 23 do meio acesas', () => {
  const o = ondas();
  assert.equal(o.length, 48);
  assert.equal(o.filter((b) => b.on).length, 23);
});
