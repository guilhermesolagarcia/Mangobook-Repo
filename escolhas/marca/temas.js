// Temas de degradê das pranchas (spec 2026-11-24). Cores em temas.css.
export const TEMAS = [
  { id: 'manga', nome: 'Manga' },
  { id: 'arco-iris', nome: 'Arco-íris' },
  { id: 'uva', nome: 'Uva' },
  { id: 'oceano', nome: 'Oceano' },
  { id: 'folha', nome: 'Folha' },
  { id: 'noite', nome: 'Noite' },
];

export const temaDaUrl = search => {
  const v = new URLSearchParams(search).get('v');
  return TEMAS.some(t => t.id === v) ? v : 'manga';
};

// Aplica o tema no <html> e desenha o seletor; trocar atualiza a URL (?v=) sem recarregar.
export function iniciarTemas() {
  const html = document.documentElement;
  const aplicar = id => {
    html.dataset.tema = id;
    picker.querySelectorAll('button').forEach(b => b.toggleAttribute('data-active', b.dataset.id === id));
    const url = new URL(location.href);
    url.searchParams.set('v', id);
    history.replaceState(null, '', url);
  };
  const picker = document.createElement('nav');
  picker.className = 'proto-picker';
  picker.setAttribute('aria-label', 'Tema de cor');
  picker.innerHTML = TEMAS.map(t => `<button class="proto-picker-item" data-id="${t.id}"><i style="background:var(--t-${t.id})"></i>${t.nome}</button>`).join('');
  picker.addEventListener('click', e => { const b = e.target.closest('button'); if (b) aplicar(b.dataset.id); });
  // ponytail: print do kit passa ?print=1 para esconder o seletor
  if (!new URLSearchParams(location.search).has('print')) document.body.append(picker);
  aplicar(temaDaUrl(location.search));
}
