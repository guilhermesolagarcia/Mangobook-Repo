import Palco from './3d/Palco.jsx';
import Barras from './ui/Barras.jsx';
import Rodape from './ui/Rodape.jsx';
import Abertura from './cenas/Abertura.jsx';
import PorDentro from './cenas/porDentro/PorDentro.jsx';
import Reserva from './cenas/Reserva.jsx';

export default function App() {
  return (
    <>
      <Palco />
      <Barras />
      <main>
        <Abertura />
        <PorDentro />
        <Reserva />
      </main>
      <Rodape />
    </>
  );
}
