import Moldura from './Moldura.jsx';
import Pilula from '../marca/Pilula.jsx';
import Ir from '../marca/Ir.jsx';
import { precoAPartir } from '../catalogo/produtos.js';
import './Aviso.css';

// Produto que ainda não tem página: nome grande, a frase e o caminho de volta.
export function EmBreve({ produto }) {
  return (
    <Moldura titulo={`${produto.nome} · em breve`} produto={produto.nome} inicio="/" comprar="/mangobook-pure">
      <section className="aviso">
        <div className="entra">
          <p className="olho manga">Em breve</p>
          <h1>{produto.nome}</h1>
        </div>
        <p className="frase">{produto.frase}</p>
        {produto.preco && <p className="preco">{precoAPartir(produto)}</p>}
        <div className="acoes">
          <Pilula href="/mangobook-pure">Conhecer o MangoBook Pure</Pilula>
          <Ir className="mais" href="/">Voltar pro início</Ir>
        </div>
      </section>
    </Moldura>
  );
}

export function NaoAchou() {
  return (
    <Moldura titulo="Essa página caiu do pé · Mango" produto="Mango" inicio="/" comprar="/mangobook-pure">
      <section className="aviso">
        <div className="entra">
          <p className="olho manga">404</p>
          <h1>Essa página caiu do pé.</h1>
        </div>
        <p className="frase">O endereço pode estar errado, ou a página ainda não nasceu.</p>
        <div className="acoes">
          <Pilula href="/">Voltar pro início</Pilula>
        </div>
      </section>
    </Moldura>
  );
}
