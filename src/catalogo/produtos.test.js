import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUTOS, MENU, produto, rota, precoAPartir, parcela } from './produtos.js';

test('ids únicos e em formato de endereço', () => {
  const ids = PRODUTOS.map((p) => p.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) assert.match(id, /^[a-z0-9-]+$/);
});

test('status só lancado ou em-breve; preço é número ou null', () => {
  for (const p of PRODUTOS) {
    assert.ok(['lancado', 'em-breve'].includes(p.status), p.id);
    assert.ok(p.preco === null || p.preco > 0, p.id);
  }
});

test('todo link do menu vai pra loja ou pra um produto do catálogo', () => {
  for (const [, href] of MENU) assert.ok(href === '/loja' || produto(href.slice(1)), href);
});

test('preço e parcela no formato da página do MangoBook', () => {
  const pure = produto('mangobook-pure');
  assert.equal(rota(pure), '/mangobook-pure');
  assert.equal(precoAPartir(pure), 'A partir de R$ 7.999');
  assert.equal(parcela(pure), 'ou 12x de R$ 666,58 sem juros');
  assert.equal(parcela(produto('mangobook-prime')), 'ou 12x de R$ 1.083,25 sem juros');
});
