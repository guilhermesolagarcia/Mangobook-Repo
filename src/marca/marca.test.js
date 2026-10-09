import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// src/marca vai ser copiada para o repositório da loja: nada aqui pode importar de fora da pasta.
test('src/marca só importa de dentro dela ou de pacotes', () => {
  const pasta = import.meta.dirname;
  const fora = [];
  for (const arq of readdirSync(pasta).filter((a) => /\.(jsx?|css)$/.test(a) && !a.endsWith('.test.js'))) {
    const texto = readFileSync(join(pasta, arq), 'utf8');
    for (const [, alvo] of texto.matchAll(/(?:import\s[^'"]*|import\s*|@import\s+)['"]([^'"]+)['"]/g)) {
      if (alvo.startsWith('../')) fora.push(`${arq} → ${alvo}`);
    }
  }
  assert.deepEqual(fora, []);
});
