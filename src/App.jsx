import Icones from './marca/Icones.jsx';
import Navbar from './marca/Navbar.jsx';
import Abertura from './secoes/Abertura.jsx';
import Destaques from './secoes/Destaques.jsx';
import Amor from './secoes/Amor.jsx';
import Cores from './secoes/Cores.jsx';
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
      </main>
      <Rodape />
    </>
  );
}
