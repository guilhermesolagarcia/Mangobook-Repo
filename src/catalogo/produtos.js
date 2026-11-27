// Catálogo único da Mango: loja, menu, rodapé, comparador e páginas leem daqui.
// Trocar um preço aqui muda o site inteiro. preco null = a tabela de preços ainda vai ser inventada.
// status: 'lancado' tem página própria; 'em-breve' cai na página "em breve".
export const PRODUTOS = [
  { id: 'mangobook-pure', nome: 'MangoBook Pure', linha: 'MangoBook', frase: 'Doce por fora, rápido por dentro.', preco: 7999, status: 'lancado' },
  { id: 'mangobook-prime', nome: 'MangoBook Prime', linha: 'MangoBook', frase: 'Tela maior, chip mais forte. Pra quem cria.', preco: 12999, status: 'em-breve' },
  { id: 'go-d1', nome: 'Go D1', linha: 'Go', frase: 'Copia num, cola no outro.', preco: null, status: 'em-breve' },
  { id: 'mangopad', nome: 'Mangopad', linha: 'Mangopad', frase: 'Caneta, desenho e uma segunda tela pro MangoBook.', preco: null, status: 'em-breve' },
  { id: 'mango-seeds', nome: 'Mango Seeds', linha: 'Acessórios', frase: 'Som bem alto.', preco: null, status: 'em-breve' },
  { id: 'mango-peels', nome: 'Mango Peels', linha: 'Acessórios', frase: 'Adesivos pra deixar o seu com a sua cara.', preco: null, status: 'em-breve' },
];

export const rota = (p) => `/${p.id}`;
export const produto = (id) => PRODUTOS.find((p) => p.id === id);

// Menu do topo: [rótulo, endereço, fica no celular?]
export const MENU = [
  ['Loja', '/loja'],
  ['MangoBook', '/mangobook-pure', true],
  ['Go D1', '/go-d1'],
  ['Mangopad', '/mangopad'],
  ['Acessórios', '/mango-seeds'],
];

const reais = (v) => v.toLocaleString('pt-BR', { minimumFractionDigits: v % 1 ? 2 : 0, maximumFractionDigits: 2 });
export const precoAPartir = (p) => `A partir de R$ ${reais(p.preco)}`;
export const parcela = (p, vezes = 12) => `ou ${vezes}x de R$ ${reais(Math.round(p.preco / vezes * 100) / 100)} sem juros`;
