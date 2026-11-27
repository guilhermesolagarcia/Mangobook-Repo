import Moldura from './Moldura.jsx';
import Abertura from '../secoes/Abertura.jsx';
import Destaques from '../secoes/Destaques.jsx';
import Amor from '../secoes/Amor.jsx';
import Cores from '../secoes/Cores.jsx';
import Desempenho from '../secoes/Desempenho.jsx';
import Bateria from '../secoes/Bateria.jsx';
import Sentidos from '../secoes/Sentidos.jsx';
import Ia from '../secoes/Ia.jsx';
import Sistema from '../secoes/Sistema.jsx';
import Juntos from '../secoes/Juntos.jsx';
import Seguranca from '../secoes/Seguranca.jsx';
import Motivos from '../secoes/Motivos.jsx';
import Comparar from '../secoes/Comparar.jsx';
import Ambiente from '../secoes/Ambiente.jsx';
import Final from '../secoes/Final.jsx';

// A ordem dos imports é a ordem do CSS: Moldura (navbar e rodapé) → seções na ordem da página.
export default function MangoBookPure() {
  return (
    <Moldura titulo="MangoBook Pure">
      <Abertura />
      <Destaques />
      <Amor />
      <Cores />
      <Desempenho />
      <Bateria />
      <Sentidos />
      <Ia />
      <Sistema />
      <Juntos />
      <Seguranca />
      <Motivos />
      <Comparar />
      <Ambiente />
      <Final />
    </Moldura>
  );
}
