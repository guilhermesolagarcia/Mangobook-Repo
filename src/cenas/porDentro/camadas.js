// Uma entrada por camada, na mesma ordem de PARTS (src/teclado/modelo.js).
// Valores de refs/prompt-teclado-3d.md.
export const CAMADAS = [
  { id: 'keycaps', nome: 'Keycaps de PBT.', funcao: 'Plástico fosco que não fica brilhante com o uso. A altura muda de fileira em fileira para acompanhar os dedos.', dado: 'Perfil Cherry · 82 teclas' },
  { id: 'moldura', nome: 'Moldura e knob.', funcao: 'A parte de cima do case, com a faixa prateada polida no chanfro. O knob de alumínio escovado vai preso nela.', dado: 'Alumínio anodizado' },
  { id: 'switches', nome: 'Switches.', funcao: 'Corpo escuro, haste azul. Saem e entram sem solda, então você troca o som e o peso quando quiser.', dado: 'Hot-swap' },
  { id: 'plate', nome: 'Plate de alumínio.', funcao: 'A chapa que segura cada switch no lugar. É ela que define o quanto o teclado cede ao digitar.', dado: '1,5 mm' },
  { id: 'gaskets', nome: 'Gaskets de Poron.', funcao: 'Tiras de borracha entre a plate e o case. Seguram o impacto de cada tecla: a digitação fica macia e o som desce de tom.', dado: 'Em cima e embaixo da plate' },
  { id: 'pcb', nome: 'PCB.', funcao: 'A placa que lê as teclas, com um soquete para cada switch e o conector USB-C.', dado: '82 soquetes · 8000 Hz' },
  { id: 'espuma', nome: 'Espuma.', funcao: 'Preenche o vazio entre a placa e o fundo e tira o eco do case.', dado: '3,5 mm' },
  { id: 'base', nome: 'Base em cunha.', funcao: 'O fundo de alumínio já vem inclinado, com a faixa azul na frente, a USB-C atrás e quatro pés de borracha.', dado: '6° de inclinação' },
];
