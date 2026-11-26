// Tira PNG de cada prancha em cada tema com o Chrome instalado (sem dependência).
// Uso: npm run dev (em outro terminal) e depois: node scripts/kit.mjs [base] [prancha]
import { execFileSync } from 'node:child_process';
import { mkdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { TEMAS } from '../escolhas/marca/temas.js';

const base = process.argv[2] ?? 'http://localhost:5173';
const so = process.argv[3];
const chrome = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
// ponytail: altura fixa por prancha; se a prancha crescer, aumente aqui
const PRANCHAS = { prancha: 3870, logo: 2520, adesivos: 1760, mascote: 10100 };
const saida = resolve('docs/imagens/kit');
mkdirSync(saida, { recursive: true });

for (const [nome, altura] of Object.entries(PRANCHAS)) {
  if (so && so !== nome) continue;
  for (const { id } of TEMAS) {
    const arquivo = resolve(saida, `${nome}-${id}.png`);
    execFileSync(chrome, ['--headless=new', '--hide-scrollbars', '--force-device-scale-factor=2', '--virtual-time-budget=4000',
      `--window-size=1440,${altura}`, `--screenshot=${arquivo}`, `${base}/escolhas/marca/${nome}.html?v=${id}&print=1`], { stdio: 'ignore' });
    console.log(`${nome}-${id}.png  ${(statSync(arquivo).size / 1024).toFixed(0)} KB`);
  }
}
