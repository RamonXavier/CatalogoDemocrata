//npx serve

// Dados diretamente no script.js para funcionar sem servidor
const categorias = [
  { "nome": "Todos", "id": 0 }, // Categoria especial para mostrar todos os anúncios
  { "nome": "Restaurantes/Bares/Lanchonetes", "id": 4 },
  { "nome": "Mercados", "id": 1 },
  { "nome": "Padarias/Confeitarias", "id": 2 },
  { "nome": "Frete/Transporte/Guinchos", "id": 5 },
  { "nome": "Motoboys/Entregas", "id": 19 },
  { "nome": "Moda", "id": 15 },
  { "nome": "Materiais de construção", "id": 17 },
  { "nome": "Farmácias", "id": 3 },
  { "nome": "Mídia, Marketing e Publicidade", "id": 18 },
  { "nome": "Saúde/Bem-estar/Esportes", "id": 16 },
  { "nome": "Salão de beleza/Barbearia", "id": 7 },
  { "nome": "Eletricistas/Encanadores", "id": 6 },
  { "nome": "Costureiras/Alfaiates", "id": 8 },
  { "nome": "Limpeza", "id": 9 },
  { "nome": "Jardinagem", "id": 10 },
  { "nome": "Eletrônicos", "id": 11 },
  { "nome": "Pintores", "id": 12 },
  { "nome": "Em busca de emprego", "id": 13 },
  { "nome": "Vagas de emprego", "id": 14 },
  { "nome": "Outros", "id": 25 }
];

let todosItens = [];
let carregando = false;
let erroCarregamento = null;

async function carregarAnuncios() {
  carregando = true;
  erroCarregamento = null;
  mostrarLoading();

  try {
    const resp = await fetch('https://api-portal-democrata-jf.runasp.net/api/anuncio/googlesheets');
    if (!resp.ok) throw new Error('Erro ao buscar anúncios');
    const data = await resp.json();
    todosItens = data.map(item => ({
      id: item.id,
      nome: item.nome,
      categoria: Number(item.categoria),
      Descricao: item.descricao,
      Contato: item.contato,
      Whatsapp: item.whatsapp,
      Instagram: item.instagram,
      Facebook: item.facebook,
      imagens: [item.imagem1, item.imagem2, item.imagem3].filter(Boolean),
      logo: item.logo // garantir que a propriedade logo está presente
    }));
  } catch (err) {
    erroCarregamento = err.message;
  } finally {
    carregando = false;
    atualizarTela();
  }
}

function mostrarLoading() {
  const loadingOverlay = document.getElementById('loading-overlay');
  if (loadingOverlay) {
    loadingOverlay.style.display = 'flex';
  }
}

function esconderLoading() {
  const loadingOverlay = document.getElementById('loading-overlay');
  if (loadingOverlay) {
    loadingOverlay.style.display = 'none';
  }
}
function mostrarErro() {
  esconderLoading(); // Esconde o loading overlay
  cardsContainer.innerHTML = `<div class="erro" style="color:red; font-size:1.2em; text-align: center; padding: 20px;">${erroCarregamento}</div>`;
}

function atualizarTela() {
  if (erroCarregamento) {
    mostrarErro();
    return;
  }
  if (carregando) {
    mostrarLoading();
    return;
  }
  
  // Esconde o loading overlay quando não está mais carregando
  esconderLoading();
  
  // Atualiza o menu de categorias com as contagens após carregar os dados
  if (document.getElementById('category-list')) {
    montarMenuCategorias();
  }
  
  if (window.location.hash) {
    selecionarCategoriaPorHash();
  } else if (categorias.length > 0) {
    // Por padrão, seleciona a categoria "Todos" (primeira da lista)
    selecionarCategoria(categorias[0]);
  }
}

const categoryList = document.getElementById('category-list');
const cardsContainer = document.getElementById('cards-container');
const mainTitle = document.getElementById('main-title');

function montarMenuCategorias() {
  categoryList.innerHTML = '';
  
  // Calcula a quantidade de itens por categoria
  const categoriasComContagem = categorias.map(cat => {
    let quantidade;
    if (cat.id === 0) {
      // "Todos" = total de anúncios
      quantidade = todosItens.length;
    } else {
      // Conta itens da categoria específica
      quantidade = todosItens.filter(item => item.categoria == cat.id).length;
    }
    return {
      ...cat,
      quantidade: quantidade
    };
  });
  
  // Separa "Todos" das outras categorias
  const categoriaTodos = categoriasComContagem.find(cat => cat.id === 0);
  const outrasCategoriasOrdenadas = categoriasComContagem
    .filter(cat => cat.id !== 0)
    .sort((a, b) => b.quantidade - a.quantidade); // Ordem decrescente
  
  // Monta lista final: "Todos" primeiro, depois outras ordenadas
  const categoriasFinais = categoriaTodos ? 
    [categoriaTodos, ...outrasCategoriasOrdenadas] : 
    outrasCategoriasOrdenadas;
  
  // Cria os botões do menu
  categoriasFinais.forEach(cat => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    
    // Formato com destaque no número: "(quantidade) Nome da Categoria"
    btn.innerHTML = `<span style="background: #fcb900; color: #222; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 0.9em; margin-right: 8px;">${cat.quantidade}</span>${cat.nome}`;
    btn.onclick = () => selecionarCategoriaComRota(cat);
    btn.setAttribute('data-id', cat.id);
    
    // Destaque visual para categoria "Todos"
    if (cat.id === 0) {
      btn.style.fontWeight = 'bold';
      btn.style.borderLeft = '4px solid #fcb900';
      btn.style.backgroundColor = '#f8f9fa';
    }
    
    li.appendChild(btn);
    categoryList.appendChild(li);
  });
}

function selecionarCategoriaComRota(categoria) {
  // Atualiza o hash da URL para a categoria
  const nomeUrl = categoria.nome.toLowerCase().replace(/\s|\(\w+\)/g, '').normalize('NFD').replace(/[^\w]/g, '');
  window.location.hash = `/${nomeUrl}`;
  selecionarCategoria(categoria);
  
  // Fecha o menu mobile se estiver aberto
  const categoryList = document.getElementById('category-list');
  if (categoryList && categoryList.classList.contains('open')) {
    categoryList.classList.remove('open');
  }
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
  
  // Se categoria "Todos" (id: 0), mostra todos os anúncios
  // Caso contrário, filtra por categoria específica
  const itens = categoria.id === 0 ? todosItens : todosItens.filter(item => item.categoria == categoria.id);
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
  itensEmbaralhados.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    // Carrossel de imagens - ID único com timestamp e index para evitar conflitos
    const carouselId = `carousel-${item.id}-${Date.now()}-${index}`;
    let carouselHtml = `<div id="${carouselId}" class="carousel slide card-carousel">
      <div class="carousel-inner">`;
    item.imagens.forEach((img, idx) => {
      carouselHtml += `<div class="carousel-item${idx === 0 ? ' active' : ''}">
        <img src="${img}" class="d-block w-100 card-carousel-img" alt="Imagem ${idx+1}">
      </div>`;
    });
    carouselHtml += `</div>`;
    
    // Só adiciona os controles se houver mais de uma imagem
    if (item.imagens.length > 1) {
      carouselHtml += `
        <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Anterior</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Próxima</span>
        </button>`;
    }
    carouselHtml += `</div>`;
    card.innerHTML = `
      <svg width="100%" height="100%" viewBox="0 0 1440 490" xmlns="http://www.w3.org/2000/svg" class="onda-svg-topo"><path d="M 0,500 L 0,125 C 95.92820512820512,152.96666666666667 191.85641025641024,180.93333333333334 264,181 C 336.14358974358976,181.06666666666666 384.50256410256407,153.23333333333335 463,126 C 541.4974358974359,98.76666666666667 650.1333333333333,72.13333333333333 744,76 C 837.8666666666667,79.86666666666667 916.9641025641026,114.23333333333335 988,111 C 1059.0358974358974,107.76666666666665 1122.0102564102565,66.93333333333332 1196,63 C 1269.9897435897435,59.06666666666668 1354.9948717948719,92.03333333333333 1440,125 L 1440,500 L 0,500 Z" stroke="none" stroke-width="0" fill="#fcb900" fill-opacity="0.53"></path><path d="M 0,500 L 0,291 C 90.86666666666665,305.15128205128207 181.7333333333333,319.30256410256413 263,310 C 344.2666666666667,300.69743589743587 415.9333333333334,267.9410256410256 490,254 C 564.0666666666666,240.05897435897438 640.5333333333334,244.93333333333334 715,264 C 789.4666666666666,283.06666666666666 861.9333333333333,316.325641025641 938,327 C 1014.0666666666667,337.674358974359 1093.7333333333333,325.76410256410253 1178,316 C 1262.2666666666667,306.23589743589747 1351.1333333333332,298.6179487179487 1440,291 L 1440,500 L 0,500 Z" stroke="none" stroke-width="0" fill="#fcb900" fill-opacity="1"></path></svg>
      <div class="card-topo-onda">
        <img src="${item.logo ? item.logo : (item.imagens[0] || '')}" alt="Logo ${item.nome}" class="card-logo-perfil">
      </div>
      <div class="nome">${item.nome}</div>
      <div class="descricao">${item.Descricao}</div>
      <div class="contatos">
        <div class="contato-row">
          <a href="tel:${item.Contato.replace(/[^\d]/g, '')}" target="_blank">Ligar: ${item.Contato}</a>
          <button class="btn-copiar" data-contato="${item.Contato}" title="Copiar telefone">📋</button>
        </div>
        <div class="contato-row-whatsapp">
          <a href="https://wa.me/55${item.Whatsapp.replace(/[^\d]/g, '')}" class="btn btn-success" target="_blank">
            <img src="assets/img/sociais/whatsapp.png" alt="WhatsApp" style="width:20px; height:20px; margin-right:8px; vertical-align:middle;">
            WhatsApp
          </a>
        </div>
        <div class="redes-sociais" style="display:flex; gap:10px; margin-top:10px; justify-content:center;">
          ${item.Instagram ? `<a href="${item.Instagram}" target="_blank" title="Instagram">
            <img src="assets/img/sociais/instagram.png" alt="Instagram" style="width:32px; height:32px;">
          </a>` : ''}
          ${item.Facebook ? `<a href="${item.Facebook}" target="_blank" title="Facebook">
            <img src="assets/img/sociais/facebook.png" alt="Facebook" style="width:32px; height:32px;">
          </a>` : ''}
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
function mostrarToast(msg) {
  const toastEl = document.getElementById('toast-copiar');
  if (toastEl) {
    // Altera a mensagem do toast
    const body = toastEl.querySelector('.toast-body');
    if (body) body.textContent = msg || 'Telefone copiado!';
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }
}

// === CONFIGURAÇÕES ===
const API_DOTNET_URL = 'https://api-portal-democrata-jf.runasp.net/api/anuncio/criar'; // Nova URL da sua API .NET
// const GOOGLE_SCRIPT_URL = 'SUA_URL_DO_APPS_SCRIPT'; // Antigo Google Apps Script (não usado mais)

/*
// Função de upload de imagem para Freeimage.host (comentada por causa de CORS)
async function uploadImageToFreeImageHost(file) {
  const formData = new FormData();
  formData.append('key', FREEIMAGE_API_KEY);
  formData.append('action', 'upload');
  formData.append('source', file);

  const response = await fetch('https://freeimage.host/api/1/upload', {
    method: 'POST',
    body: formData
  });

  const data = await response.json();
  if (data.status_code === 200) {
    return data.image.url;
  } else {
    throw new Error('Erro ao fazer upload da imagem: ' + data.status_txt);
  }
}
*/

const form = document.getElementById('anuncioForm');
if (form) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Mostra o loading overlay
    mostrarLoading();
    
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = 'Enviando...';

    const formData = new FormData();
    // Adiciona todos os campos do formulário como texto, exceto arquivos
    Array.from(form.elements).forEach(el => {
      if (!el.name) return;
      if (el.type === 'file') {
        // Adiciona arquivos normalmente
        if (el.files && el.files.length > 0) {
          if (el.multiple) {
            Array.from(el.files).forEach(file => formData.append(el.name, file));
          } else {
            formData.append(el.name, el.files[0]);
          }
        }
      } else {
        formData.append(el.name, String(el.value));
      }
    });

    try {
      await fetch('https://api-portal-democrata-jf.runasp.net/api/anuncio/criar', {
        method: 'POST',
        body: formData // Envia todos os campos + arquivos
        // NÃO coloque o header 'Content-Type', o browser faz isso automaticamente!
      });
      
      // Esconde o loading overlay
      esconderLoading();
      
      statusDiv.textContent = 'Anúncio salvo com sucesso! Redirecionando...';
      // Exibe toast de sucesso
      mostrarToast('Anúncio salvo com sucesso!');
      
      // Redireciona para a página inicial após 2 segundos
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
    } catch (err) {
      // Esconde o loading overlay em caso de erro
      esconderLoading();
      statusDiv.textContent = 'Erro ao salvar anúncio: ' + err.message;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Preenche o select de categorias no form de anúncio, se existir
  const categoriaSelect = document.getElementById('categoria-select');
  if (categoriaSelect) {
    // Filtra a categoria "Todos" (id: 0) do formulário, pois é apenas para visualização
    const categoriasParaForm = categorias.filter(cat => cat.id !== 0);
    // Mantém o placeholder e adiciona as opções de categoria
    const optionsHtml = categoriasParaForm.map(cat => `<option value="${cat.id}">${cat.nome}</option>`).join('');
    categoriaSelect.innerHTML = `<option value="" disabled selected>👆 Selecione a categoria do seu anúncio</option>${optionsHtml}`;
  }
  
  // Máscara para telefone (Contato)
  const contatoInput = document.getElementById('Contato');
  if (contatoInput) {
    contatoInput.addEventListener('input', function(e) {
      let v = this.value.replace(/\D/g, '');
      if (v.length > 11) v = v.slice(0, 11);
      if (v.length > 6) {
        this.value = `(${v.slice(0,2)})${v.slice(2,7)}-${v.slice(7)}`;
      } else if (v.length > 2) {
        this.value = `(${v.slice(0,2)})${v.slice(2)}`;
      } else if (v.length > 0) {
        this.value = `(${v}`;
      }
    });
  }
  
  // Máscara para telefone (Whatsapp)
  const whatsappInput = document.getElementById('Whatsapp');
  if (whatsappInput) {
    whatsappInput.addEventListener('input', function(e) {
      let v = this.value.replace(/\D/g, '');
      if (v.length > 11) v = v.slice(0, 11);
      if (v.length > 6) {
        this.value = `(${v.slice(0,2)})${v.slice(2,7)}-${v.slice(7)}`;
      } else if (v.length > 2) {
        this.value = `(${v.slice(0,2)})${v.slice(2)}`;
      } else if (v.length > 0) {
        this.value = `(${v}`;
      }
    });
  }
  
  // Só carrega anúncios se estiver na página principal (index.html)
  if (document.getElementById('cards-container')) {
    carregarAnuncios();
  }
});

window.addEventListener('hashchange', selecionarCategoriaPorHash); 