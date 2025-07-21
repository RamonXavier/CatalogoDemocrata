// Dados diretamente no script.js para funcionar sem servidor
const categorias = [
  { "nome": "Mercado", "id": 1 },
  { "nome": "Padaria", "id": 2 },
  { "nome": "Farmácia", "id": 3 },
  { "nome": "Restaurante", "id": 4 },
  { "nome": "Lanchonete", "id": 5 },
  { "nome": "Frete", "id": 6 },
  { "nome": "Eletricista", "id": 7 },
  { "nome": "Encanador", "id": 8 },
  { "nome": "Cabeleireiro(a)", "id": 9 },
  { "nome": "Em busca de emprego", "id": 10 }
];

const todosItens = [
  { "nome": "Mercado Democrata", "id": 1, "categoria": 1, "Descricao": "Tudo para sua casa, aberto todos os dias.", "Contato": "(32)3232-1001", "Whatsapp": "(32)9999-1001", "urlImagem": "https://cdn-icons-png.flaticon.com/512/862/862819.png" },
  { "nome": "Padaria Pão Quente", "id": 2, "categoria": 2, "Descricao": "Pães fresquinhos e café da manhã.", "Contato": "(32)3232-1002", "Whatsapp": "(32)9999-1002", "urlImagem": "https://cdn-icons-png.flaticon.com/512/862/862819.png" },
  { "nome": "Farmácia Popular", "id": 3, "categoria": 3, "Descricao": "Medicamentos e perfumaria.", "Contato": "(32)3232-1003", "Whatsapp": "(32)9999-1003", "urlImagem": "https://cdn-icons-png.flaticon.com/512/862/862819.png" },
  { "nome": "Restaurante Sabor Mineiro", "id": 4, "categoria": 4, "Descricao": "Comida caseira e marmitex.", "Contato": "(32)3232-1004", "Whatsapp": "(32)9999-1004", "urlImagem": "https://cdn-icons-png.flaticon.com/512/862/862819.png" },
  { "nome": "Lanchonete do Zé", "id": 5, "categoria": 5, "Descricao": "Lanches rápidos e sucos naturais.", "Contato": "(32)3232-1005", "Whatsapp": "(32)9999-1005", "urlImagem": "https://cdn-icons-png.flaticon.com/512/862/862819.png" },
  { "nome": "Frete do João", "id": 6, "categoria": 6, "Descricao": "Fretes e pequenas mudanças.", "Contato": "(32)3232-1006", "Whatsapp": "(32)9999-1006", "urlImagem": "https://cdn-icons-png.flaticon.com/512/862/862819.png" },
  { "nome": "Eletricista Carlos", "id": 7, "categoria": 7, "Descricao": "Serviços elétricos em geral.", "Contato": "(32)3232-1007", "Whatsapp": "(32)9999-1007", "urlImagem": "https://cdn-icons-png.flaticon.com/512/862/862819.png" },
  { "nome": "Encanador Pedro", "id": 8, "categoria": 8, "Descricao": "Consertos e instalações hidráulicas.", "Contato": "(32)3232-1008", "Whatsapp": "(32)9999-1008", "urlImagem": "https://cdn-icons-png.flaticon.com/512/862/862819.png" },
  { "nome": "Salão da Maria", "id": 9, "categoria": 9, "Descricao": "Cortes, escovas e tinturas.", "Contato": "(32)3232-1009", "Whatsapp": "(32)9999-1009", "urlImagem": "https://cdn-icons-png.flaticon.com/512/862/862819.png" },
  { "nome": "Ana Souza", "id": 10, "categoria": 10, "Descricao": "Procuro vaga de cuidadora de idosos.", "Contato": "(32)3232-1010", "Whatsapp": "(32)9999-1010", "urlImagem": "https://cdn-icons-png.flaticon.com/512/862/862819.png" },
  { "nome": "Mercado Bom Preço", "id": 11, "categoria": 1, "Descricao": "Ofertas diárias e entrega em casa.", "Contato": "(32)3232-1011", "Whatsapp": "(32)9999-1011", "urlImagem": "https://cdn-icons-png.flaticon.com/512/862/862819.png" },
  { "nome": "Padaria Democrata", "id": 12, "categoria": 2, "Descricao": "Pães, bolos e doces.", "Contato": "(32)3232-1012", "Whatsapp": "(32)9999-1012", "urlImagem": "https://cdn-icons-png.flaticon.com/512/862/862819.png" },
  { "nome": "Farmácia Saúde", "id": 13, "categoria": 3, "Descricao": "Atendimento 24h.", "Contato": "(32)3232-1013", "Whatsapp": "(32)9999-1013", "urlImagem": "https://cdn-icons-png.flaticon.com/512/862/862819.png" },
  { "nome": "Restaurante da Praça", "id": 14, "categoria": 4, "Descricao": "Almoço e jantar todos os dias.", "Contato": "(32)3232-1014", "Whatsapp": "(32)9999-1014", "urlImagem": "https://cdn-icons-png.flaticon.com/512/862/862819.png" },
  { "nome": "Lanchonete Sabor e Arte", "id": 15, "categoria": 5, "Descricao": "Sanduíches e salgados.", "Contato": "(32)3232-1015", "Whatsapp": "(32)9999-1015", "urlImagem": "https://cdn-icons-png.flaticon.com/512/862/862819.png" }
];

const categoryList = document.getElementById('category-list');
const cardsContainer = document.getElementById('cards-container');
const mainTitle = document.getElementById('main-title');

function montarMenuCategorias() {
  categoryList.innerHTML = '';
  categorias.forEach(cat => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = cat.nome;
    btn.onclick = () => selecionarCategoriaComRota(cat);
    btn.setAttribute('data-id', cat.id);
    li.appendChild(btn);
    categoryList.appendChild(li);
  });
}

function selecionarCategoriaComRota(categoria) {
  // Atualiza o hash da URL para a categoria
  const nomeUrl = categoria.nome.toLowerCase().replace(/\s|\(\w+\)/g, '').normalize('NFD').replace(/[^\w]/g, '');
  window.location.hash = `/${nomeUrl}`;
  selecionarCategoria(categoria);
}

function selecionarCategoriaPorHash() {
  const hash = window.location.hash;
  if (!hash.startsWith('#/')) return;
  const nomeUrl = hash.slice(2).toLowerCase();
  const cat = categorias.find(c => c.nome.toLowerCase().replace(/\s|\(\w+\)/g, '').normalize('NFD').replace(/[^\w]/g, '') === nomeUrl);
  if (cat) selecionarCategoria(cat);
}

function selecionarCategoria(categoria) {
  mainTitle.textContent = categoria.nome;
  document.querySelectorAll('#category-list button').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-id') == categoria.id);
  });
  const itens = todosItens.filter(item => item.categoria === categoria.id);
  mostrarCartoes(itens);
}

function mostrarCartoes(itens) {
  cardsContainer.innerHTML = '';
  if (itens.length === 0) {
    cardsContainer.innerHTML = '<p style="font-size:1.2em;">Nenhum item encontrado nesta categoria.</p>';
    return;
  }
  // Embaralha os itens antes de exibir
  const itensEmbaralhados = [...itens].sort(() => Math.random() - 0.5);
  itensEmbaralhados.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${item.urlImagem}" alt="${item.nome}">
      <div class="nome">${item.nome}</div>
      <div class="descricao">${item.Descricao}</div>
      <div class="contatos">
        <div class="contato-row">
          <a href="tel:${item.Contato.replace(/[^\d]/g, '')}" target="_blank">Ligar: ${item.Contato}</a>
          <button class="btn-copiar" data-contato="${item.Contato}" title="Copiar telefone">📋</button>
        </div>
        <div class="contato-row-whatsapp">
          <a href="https://wa.me/55${item.Whatsapp.replace(/[^\d]/g, '')}" class="btn btn-success" target="_blank">WhatsApp</a>
        </div>
      </div>
    `;
    cardsContainer.appendChild(card);
  });

  // Adiciona evento de copiar para todos os botões criados
  document.querySelectorAll('.btn-copiar').forEach(btn => {
    btn.addEventListener('click', function() {
      const contato = this.getAttribute('data-contato');
      navigator.clipboard.writeText(contato);
      mostrarToast();
    });
  });
}

// Função para exibir o toast do Bootstrap
function mostrarToast() {
  const toastEl = document.getElementById('toast-copiar');
  if (toastEl) {
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  montarMenuCategorias();
  if (window.location.hash) {
    selecionarCategoriaPorHash();
  } else if (categorias.length > 0) {
    selecionarCategoria(categorias[0]);
  }
});

window.addEventListener('hashchange', selecionarCategoriaPorHash); 