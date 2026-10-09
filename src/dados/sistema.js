// Sanfona do MangoOS: cada item abre uma arrumação diferente na tela ao lado.
// a e b são as janelas: [left, top, width, height] em %.
export const ITENS_OS = [
  { titulo: 'Fácil de usar', texto: 'Tudo onde você espera. Arraste, solte, pronto. Se você usa um celular, já sabe usar o MangoBook.' },
  { titulo: 'Apps que já vêm', texto: 'Fotos, Notas, Agenda, Música e um editor de vídeo. Tudo incluído, sem assinatura escondida.' },
  { titulo: 'Seus apps favoritos', texto: 'Navegador, pacote de escritório, chat do trabalho e streaming. Os que você usa rodam aqui.' },
  { titulo: 'Do seu jeito', texto: 'Widgets na mesa, modo escuro, papel de parede na cor do seu notebook.' },
];

export const CENAS_OS = [
  { bg: 'linear-gradient(135deg,#ffd23f,#ff9f1c 50%,#ff5e7e)', a: [12, 14, 46, 52], b: [44, 30, 44, 48] },
  { bg: 'linear-gradient(135deg,#ff5e7e,#a46bff)', a: [8, 10, 38, 60], b: [50, 10, 42, 60] },
  { bg: 'linear-gradient(135deg,#3aa0ff,#7b5cff)', a: [18, 8, 64, 66], b: [60, 40, 30, 36] },
  { bg: 'linear-gradient(135deg,#3ddc97,#22b5e8)', a: [6, 8, 28, 30], b: [6, 44, 28, 30] },
];
