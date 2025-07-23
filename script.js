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
  { "nome": "Mercado Democrata", "id": 1, "categoria": 1, "Descricao": "Tudo para sua casa, aberto todos os dias.", "Contato": "(32)3232-1001", "Whatsapp": "(32)9999-1001", "imagens": [
    "assets/img/propagandas/image.png",
    "assets/img/propagandas/image2.png",
    "assets/img/propagandas/image3.png"
  ] },
  { "nome": "Padaria Pão Quente", "id": 2, "categoria": 2, "Descricao": "Pães fresquinhos e café da manhã.", "Contato": "(32)3232-1002", "Whatsapp": "(32)9999-1002", "imagens": [
    "assets/img/propagandas/image.png",
    "assets/img/propagandas/image2.png",
    "assets/img/propagandas/image3.png"
  ] },
  { "nome": "Farmácia Popular", "id": 3, "categoria": 3, "Descricao": "Medicamentos e perfumaria.", "Contato": "(32)3232-1003", "Whatsapp": "(32)9999-1003", "imagens": [
    "assets/img/propagandas/image.png",
    "assets/img/propagandas/image2.png",
    "assets/img/propagandas/image3.png"
  ] },
  { "nome": "Restaurante Sabor Mineiro", "id": 4, "categoria": 4, "Descricao": "Comida caseira e marmitex.", "Contato": "(32)3232-1004", "Whatsapp": "(32)9999-1004", "imagens": [
    "assets/img/propagandas/image.png",
    "assets/img/propagandas/image2.png",
    "assets/img/propagandas/image3.png"
  ] },
  { "nome": "Lanchonete do Zé", "id": 5, "categoria": 5, "Descricao": "Lanches rápidos e sucos naturais.", "Contato": "(32)3232-1005", "Whatsapp": "(32)9999-1005", "imagens": [
    "assets/img/propagandas/image.png",
    "assets/img/propagandas/image2.png",
    "assets/img/propagandas/image3.png"
  ] },
  { "nome": "Frete do João", "id": 6, "categoria": 6, "Descricao": "Fretes e pequenas mudanças.", "Contato": "(32)3232-1006", "Whatsapp": "(32)9999-1006", "imagens": [
    "assets/img/propagandas/image.png",
    "assets/img/propagandas/image2.png",
    "assets/img/propagandas/image3.png"
  ] },
  { "nome": "Eletricista Carlos", "id": 7, "categoria": 7, "Descricao": "Serviços elétricos em geral.", "Contato": "(32)3232-1007", "Whatsapp": "(32)9999-1007", "imagens": [
    "assets/img/propagandas/image.png",
    "assets/img/propagandas/image2.png",
    "assets/img/propagandas/image3.png"
  ] },
  { "nome": "Encanador Pedro", "id": 8, "categoria": 8, "Descricao": "Consertos e instalações hidráulicas.", "Contato": "(32)3232-1008", "Whatsapp": "(32)9999-1008", "imagens": [
    "assets/img/propagandas/image.png",
    "assets/img/propagandas/image2.png",
    "assets/img/propagandas/image3.png"
  ] },
  { "nome": "Salão da Maria", "id": 9, "categoria": 9, "Descricao": "Cortes, escovas e tinturas.", "Contato": "(32)3232-1009", "Whatsapp": "(32)9999-1009", "imagens": [
    "assets/img/propagandas/image.png",
    "assets/img/propagandas/image2.png",
    "assets/img/propagandas/image3.png"
  ] },
  { "nome": "Ana Souza", "id": 10, "categoria": 10, "Descricao": "Procuro vaga de cuidadora de idosos.", "Contato": "(32)3232-1010", "Whatsapp": "(32)9999-1010", "imagens": [
    "assets/img/propagandas/image.png",
    "assets/img/propagandas/image2.png",
    "assets/img/propagandas/image3.png"
  ] },
  { "nome": "Mercado Bom Preço", "id": 11, "categoria": 1, "Descricao": "Ofertas diárias e entrega em casa.", "Contato": "(32)3232-1011", "Whatsapp": "(32)9999-1011", "imagens": [
    "assets/img/propagandas/image.png",
    "assets/img/propagandas/image2.png",
    "assets/img/propagandas/image3.png"
  ] },
  { "nome": "Padaria Democrata", "id": 12, "categoria": 2, "Descricao": "Pães, bolos e doces.", "Contato": "(32)3232-1012", "Whatsapp": "(32)9999-1012", "imagens": [
    "assets/img/propagandas/image.png",
    "assets/img/propagandas/image2.png",
    "assets/img/propagandas/image3.png"
  ] },
  { "nome": "Farmácia Saúde", "id": 13, "categoria": 3, "Descricao": "Atendimento 24h.", "Contato": "(32)3232-1013", "Whatsapp": "(32)9999-1013", "imagens": [
    "assets/img/propagandas/image.png",
    "assets/img/propagandas/image2.png",
    "assets/img/propagandas/image3.png"
  ] },
  { "nome": "Restaurante da Praça", "id": 14, "categoria": 4, "Descricao": "Almoço e jantar todos os dias.", "Contato": "(32)3232-1014", "Whatsapp": "(32)9999-1014", "imagens": [
    "assets/img/propagandas/image.png",
    "assets/img/propagandas/image2.png",
    "assets/img/propagandas/image3.png"
  ] },
  { "nome": "Lanchonete Sabor e Arte", "id": 15, "categoria": 5, "Descricao": "Sanduíches e salgados.", "Contato": "(32)3232-1015", "Whatsapp": "(32)9999-1015", "imagens": [
    "assets/img/propagandas/image.png",
    "assets/img/propagandas/image2.png",
    "assets/img/propagandas/image3.png"
  ] }
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
    // Carrossel de imagens
    const carouselId = `carousel-${item.id}`;
    let carouselHtml = `<div id="${carouselId}" class="carousel slide card-carousel" data-bs-ride="carousel">
      <div class="carousel-inner">`;
    item.imagens.forEach((img, idx) => {
      carouselHtml += `<div class="carousel-item${idx === 0 ? ' active' : ''}">
        <img src="${img}" class="d-block w-100 card-carousel-img" alt="Imagem ${idx+1}">
      </div>`;
    });
    carouselHtml += `</div>
      <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Próxima</span>
      </button>
    </div>`;
    card.innerHTML = `
      <svg width="100%" height="100%" viewBox="0 0 1440 490" xmlns="http://www.w3.org/2000/svg" class="onda-svg-topo"><path d="M 0,500 L 0,125 C 95.92820512820512,152.96666666666667 191.85641025641024,180.93333333333334 264,181 C 336.14358974358976,181.06666666666666 384.50256410256407,153.23333333333335 463,126 C 541.4974358974359,98.76666666666667 650.1333333333333,72.13333333333333 744,76 C 837.8666666666667,79.86666666666667 916.9641025641026,114.23333333333335 988,111 C 1059.0358974358974,107.76666666666665 1122.0102564102565,66.93333333333332 1196,63 C 1269.9897435897435,59.06666666666668 1354.9948717948719,92.03333333333333 1440,125 L 1440,500 L 0,500 Z" stroke="none" stroke-width="0" fill="#fcb900" fill-opacity="0.53"></path><path d="M 0,500 L 0,291 C 90.86666666666665,305.15128205128207 181.7333333333333,319.30256410256413 263,310 C 344.2666666666667,300.69743589743587 415.9333333333334,267.9410256410256 490,254 C 564.0666666666666,240.05897435897438 640.5333333333334,244.93333333333334 715,264 C 789.4666666666666,283.06666666666666 861.9333333333333,316.325641025641 938,327 C 1014.0666666666667,337.674358974359 1093.7333333333333,325.76410256410253 1178,316 C 1262.2666666666667,306.23589743589747 1351.1333333333332,298.6179487179487 1440,291 L 1440,500 L 0,500 Z" stroke="none" stroke-width="0" fill="#fcb900" fill-opacity="1"></path></svg>
      <div class="card-topo-onda">
        <img src="${item.imagens[0]}" alt="Logo ${item.nome}" class="card-logo-perfil">
      </div>
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
      ${carouselHtml}
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