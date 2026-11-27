"""Recorta as folhas do Mangy (arte-ia/mangy) em adesivos soltos com fundo transparente.

Uso: python scripts/recortar-mascote.py  ->  design/marca/mascote/<folha>-<n>.webp
O fundo é o que encosta na borda e tem a cor do canto (branco ou cinza da IA).
"""
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage

ORIGEM = Path('arte-ia/mangy')
SAIDA = Path('design/marca/mascote')
TOL = 10        # ponytail: tolerância fixa de cor do fundo; subir se sobrar halo, descer se comer a borda branca
INTEIRAS = {'six-colors'}  # adesivos encostados: fica a fileira inteira
# ponytail: adesivos cuja borda branca vaza pelo contorno da IA; a borda é refeita com BORDA px. Lista manual.
REFAZER_BORDA = {'expressions-6'}
BORDA = 12
MIN_AREA = 0.004  # fração da imagem: abaixo disso é sujeira


def fundo(rgb):
    canto = np.median(np.concatenate([rgb[:8, :8].reshape(-1, 3), rgb[-8:, -8:].reshape(-1, 3)]), axis=0)
    perto = np.abs(rgb.astype(int) - canto).max(axis=2) <= TOL
    rot, n = ndimage.label(perto)
    # semente: cantos + regiões grandes na beira. A borda branca de um adesivo que encosta
    # na beira também toca a beira, mas é pequena, então não vira fundo.
    borda = np.unique(np.concatenate([rot[0], rot[-1], rot[:, 0], rot[:, -1]]))
    areas = ndimage.sum(np.ones_like(rot), rot, borda)
    sementes = {rot[0, 0], rot[0, -1], rot[-1, 0], rot[-1, -1]} | {b for b, a in zip(borda, areas) if a > .03 * rot.size}
    return np.isin(rot, [x for x in sementes if x > 0])


def recortar(arq, inteira=False):
    rgb = np.asarray(Image.open(arq).convert('RGB'))
    bg = fundo(rgb)
    # alfa com 1 px de transição na borda, pra não serrilhar
    alfa = np.clip(ndimage.uniform_filter(np.where(bg, 0., 255.), 3), 0, 255).astype(np.uint8)
    alfa[~bg] = 255
    rot, n = ndimage.label(~bg)
    if inteira:
        rot = (rot > 0).astype(int); n = 1
    caixas = ndimage.find_objects(rot)
    areas = ndimage.sum(np.ones_like(rot), rot, range(1, n + 1))
    grandes = {i + 1: {'caixa': [[s.start, s.stop] for s in caixas[i]], 'rots': {i + 1}}
               for i in range(n) if areas[i] >= MIN_AREA * bg.size}
    # peças pequenas (zzz, !!, brilhos) entram no adesivo grande mais perto
    for i in range(n):
        if i + 1 in grandes or areas[i] < 40:
            continue
        (y0, y1), (x0, x1) = [(s.start, s.stop) for s in caixas[i]]
        cy, cx = (y0 + y1) / 2, (x0 + x1) / 2
        g = min(grandes.values(), key=lambda g: max(g['caixa'][0][0] - cy, cy - g['caixa'][0][1], 0) ** 2
                + max(g['caixa'][1][0] - cx, cx - g['caixa'][1][1], 0) ** 2)
        g['caixa'] = [[min(g['caixa'][0][0], y0), max(g['caixa'][0][1], y1)], [min(g['caixa'][1][0], x0), max(g['caixa'][1][1], x1)]]
        g['rots'].add(i + 1)
    pecas = list(grandes.values())
    # ordem de leitura: linha (pelo topo, em faixas de 60% da altura) e depois x
    pecas.sort(key=lambda g: (round(g['caixa'][0][0] / max(1, (g['caixa'][0][1] - g['caixa'][0][0]) * .6)), g['caixa'][1][0]))
    for k, g in enumerate(pecas, 1):
        sl = tuple(slice(max(0, a - 4), b + 4) for a, b in g['caixa'])
        a = alfa[sl].copy()
        # tira pedaços de adesivos vizinhos que caem dentro da caixa
        dono = np.isin(ndimage.grey_dilation(rot[sl], size=5), list(g['rots']))
        a[~dono] = 0
        if f'{arq.stem}-{k}' in REFAZER_BORDA:
            y, x = np.ogrid[-BORDA:BORDA + 1, -BORDA:BORDA + 1]
            a[ndimage.binary_dilation(a > 128, structure=x * x + y * y <= BORDA * BORDA)] = 255
        Image.fromarray(np.dstack([rgb[sl], a])).save(SAIDA / f'{arq.stem}-{k}.webp', quality=88, method=6)
    return len(pecas)


def mono(recorte, nome):
    """Versão de uma cor: o que tem cor vira tinta (branco), o creme e a borda viram vazado.
    Sai como máscara: no CSS, mask:url(...) + background pinta de qualquer cor."""
    rgba = np.asarray(Image.open(SAIDA / recorte).convert('RGBA')).astype(float)
    mx, mn = rgba[..., :3].max(axis=2), rgba[..., :3].min(axis=2)
    sat = (mx - mn) / np.maximum(mx, 1)
    # ponytail: corte fixo de saturação (creme ~0.07, degradê ~0.9); ajustar se a IA mudar o creme
    tinta = np.clip((sat - .2) / .25, 0, 1) * rgba[..., 3] / 255
    a = (tinta * 255).astype(np.uint8)
    ys, xs = np.nonzero(a > 8)
    a = a[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    Image.fromarray(np.dstack([np.full(a.shape + (3,), 255, np.uint8), a])).save(SAIDA / nome, quality=90, method=6)


if __name__ == '__main__':
    SAIDA.mkdir(parents=True, exist_ok=True)
    for arq in sorted(ORIGEM.glob('*.png')):
        print(arq.name, recortar(arq, inteira=arq.stem in INTEIRAS))
    mono('mangy-final-1.webp', 'mono-corpo.webp')
    mono('expressions-1.webp', 'mono-cabeca.webp')
    # teste: a máscara tem que ter tinta (cabelo/corpo) e vazado (rosto) dentro do contorno
    m = np.asarray(Image.open(SAIDA / 'mono-cabeca.webp'))[..., 3]
    assert (m > 200).mean() > .25 and (m < 20).mean() > .15, 'máscara mono saiu cheia ou vazia demais'
    print('mono ok')
