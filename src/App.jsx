import Icones from './marca/Icones.jsx';
import Navbar from './marca/Navbar.jsx';
import Abertura from './secoes/Abertura.jsx';
import Destaques from './secoes/Destaques.jsx';
import Amor from './secoes/Amor.jsx';
import Cores from './secoes/Cores.jsx';
import Desempenho from './secoes/Desempenho.jsx';
import Bateria from './secoes/Bateria.jsx';
import Sentidos from './secoes/Sentidos.jsx';
import Ia from './secoes/Ia.jsx';
import Sistema from './secoes/Sistema.jsx';
import Juntos from './secoes/Juntos.jsx';
import Seguranca from './secoes/Seguranca.jsx';
import Motivos from './secoes/Motivos.jsx';
import Comparar from './secoes/Comparar.jsx';
import Ambiente from './secoes/Ambiente.jsx';
import Final from './secoes/Final.jsx';
import Rodape from './marca/Rodape.jsx';

// A ordem dos imports é a ordem do CSS: Navbar → seções na ordem da página → Rodapé.
export default function App() {
  return (
    <>
      <Icones />
      <Navbar />
      <main>
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
      </main>
      <Rodape />
    </>
  );
}
