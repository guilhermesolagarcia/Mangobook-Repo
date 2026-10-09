const ITENS = [
  ['devices', 'Espelhar o Mangophone', 'Use o celular inteiro pela tela do notebook.'],
  ['copy', 'Copiar e colar entre os dois', 'Copie no celular, cole no notebook. Simples assim.'],
  ['phone', 'Ligações e mensagens', 'Atenda e responda sem procurar o celular.'],
  ['broadcast', 'MangoDrop', 'Mande fotos e arquivos pra quem está perto.'],
  ['wifi-high', 'Internet do celular', 'Sem wi-fi? O notebook usa a do Mangophone sozinho.'],
  ['arrows-clockwise', 'Continue de onde parou', 'Comece no celular e termine no notebook.'],
];

export default function Juntos() {
  return (
    <section className="sec branco" id="juntos" aria-labelledby="t-juntos">
      <p className="olho manga">Mango + Mangophone</p>
      <h2 className="titulo" id="t-juntos">Juntos ficam ainda mais doces.</h2>
      <div className="grade-6">
        {ITENS.map(([ico, t, s]) => <div className="it" key={t}><i className={`ico-l ph-light ph-${ico}`} aria-hidden="true"></i><b>{t}</b><span>{s}</span></div>)}
      </div>
    </section>
  );
}
