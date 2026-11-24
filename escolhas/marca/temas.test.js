import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { TEMAS, temaDaUrl } from './temas.js';

test('temaDaUrl lê ?v= e cai no manga quando não existe', () => {
  assert.equal(temaDaUrl('?v=uva'), 'uva');
  assert.equal(temaDaUrl('?v=xyz'), 'manga');
  assert.equal(temaDaUrl(''), 'manga');
});

test('todo tema tem bloco no temas.css', () => {
  const css = readFileSync(new URL('./temas.css', import.meta.url), 'utf8');
  for (const { id } of TEMAS) assert.match(css, new RegExp(`\\[data-tema="${id}"\\]`), id);
});
