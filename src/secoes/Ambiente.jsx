import './Ambiente.css';

export default function Ambiente() {
  return (
    <section className="sec tile" id="ambiente" aria-labelledby="t-ambiente">
      <p className="olho" style={{ color: '#0f7a4e' }}>Meio ambiente</p>
      <h2 className="titulo" id="t-ambiente">Doce com o planeta também.</h2>
      <div className="ambiente">
        <div><b>60%</b><span>do peso do notebook vem de material reciclado.</span></div>
        <div><b>100%</b><span>da embalagem é de fibra, sem plástico.</span></div>
        <div><b>75%</b><span>da energia usada na fabricação é renovável.</span></div>
      </div>
    </section>
  );
}
