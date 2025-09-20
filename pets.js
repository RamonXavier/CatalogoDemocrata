// Configurações da API
const API_BASE_URL = 'https://api-portal-democrata-jf.runasp.net/api/Pet';

// Variáveis globais
let todosPets = [];
let petsFiltrados = [];
let petEditando = null;
let termoPesquisa = '';

// Função para mostrar/ocultar loading
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

// Função para mostrar toast
function mostrarToast(mensagem = 'Operação realizada com sucesso!') {
    const toastEl = document.getElementById('toast-pets');
    if (toastEl) {
        const body = toastEl.querySelector('.toast-body');
        if (body) body.textContent = mensagem;
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    }
}

// Função para carregar todos os pets
async function carregarPets() {
    mostrarLoading();
    
    try {
        const response = await fetch(`${API_BASE_URL}/todos`);
        if (!response.ok) {
            throw new Error('Erro ao carregar pets');
        }
        
        const data = await response.json();
        
        // Extrair os pets da estrutura aninhada da API
        if (data && data.data && data.data.pets) {
            todosPets = data.data.pets || [];
        } else if (data && data.pets) {
            todosPets = data.pets || [];
        } else if (Array.isArray(data)) {
            todosPets = data;
        } else {
            todosPets = [];
        }
        
        // Embaralhar os pets para exibição aleatória
        petsFiltrados = [...todosPets].sort(() => Math.random() - 0.5);
        
        exibirPets();
    } catch (error) {
        console.error('Erro ao carregar pets:', error);
        mostrarErro('Erro ao carregar pets: ' + error.message);
    } finally {
        esconderLoading();
    }
}

// Função para exibir pets na tela
function exibirPets() {
    const container = document.getElementById('pets-container');
    if (!container) return;
    
    if (petsFiltrados.length === 0) {
        container.innerHTML = `
            <div class="no-pets">
                <h3>🐾 Nenhum pet encontrado</h3>
                <p>Não há pets perdidos cadastrados no momento.</p>
                <button class="btn-pet btn-novo-pet" onclick="abrirModalNovoPet()">
                    ➕ Cadastrar o primeiro pet
                </button>
            </div>
        `;
        return;
    }
    
    const petsHtml = petsFiltrados.map(pet => criarCardPet(pet)).join('');
    container.innerHTML = `<div class="pets-grid">${petsHtml}</div>`;
    
    // Adicionar eventos aos botões
    adicionarEventosCards();
}

// Função para criar o HTML de um card de pet
function criarCardPet(pet) {
    const contato1 = pet.contatodono1 || '';
    const contato2 = pet.contatodono2 || '';
    
    // Coletar todas as imagens disponíveis
    const imagens = [pet.imgpet1, pet.imgpet2, pet.imgpet3].filter(Boolean);
    
    // Se não há imagens, usar imagem padrão
    if (imagens.length === 0) {
        imagens.push('assets/img/artes/svg.png');
    }
    
    // Gerar HTML do carrossel
    const carouselId = `pet-carousel-${pet.id}-${Date.now()}`;
    let carouselHtml = `<div id="${carouselId}" class="carousel slide pet-carousel">`;
    carouselHtml += '<div class="carousel-inner">';
    
    imagens.forEach((img, index) => {
        carouselHtml += `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${img}" class="d-block w-100 pet-image" alt="Foto ${index + 1} do ${pet.nomepet}" 
                     onerror="this.src='assets/img/artes/svg.png'">
            </div>
        `;
    });
    
    carouselHtml += '</div>';
    
    // Adicionar controles apenas se houver mais de uma imagem
    if (imagens.length > 1) {
        carouselHtml += `
            <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Anterior</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Próxima</span>
            </button>
        `;
    }
    
    carouselHtml += '</div>';
    
    return `
        <div class="pet-card" data-pet-id="${pet.id}">
            ${carouselHtml}
            <div class="pet-info">
                <div class="pet-name">${pet.nomepet || 'Nome não informado'}</div>
                <div class="pet-description">${pet.descricao || 'Descrição não informada'}</div>
                
                <div class="pet-owner">
                    <strong>Dono:</strong> ${pet.nomedono1 || 'Nome não informado'}
                    ${pet.nomedono2 ? `<br><strong>Dono 2:</strong> ${pet.nomedono2}` : ''}
                </div>
                
                <div class="pet-contacts">
                    ${contato1 ? `
                        <a href="tel:${contato1.replace(/[^\d]/g, '')}" class="btn-contact btn-phone">
                            📞 Ligar
                        </a>
                        <a href="https://wa.me/55${contato1.replace(/[^\d]/g, '')}" class="btn-contact btn-whatsapp" target="_blank">
                            💬 WhatsApp
                        </a>
                    ` : ''}
                    ${contato2 ? `
                        <a href="tel:${contato2.replace(/[^\d]/g, '')}" class="btn-contact btn-phone">
                            📞 Ligar 2
                        </a>
                        <a href="https://wa.me/55${contato2.replace(/[^\d]/g, '')}" class="btn-contact btn-whatsapp" target="_blank">
                            💬 WhatsApp 2
                        </a>
                    ` : ''}
                </div>
                
                <div class="pet-actions">
                    <a href="https://wa.me/553291375797?text=Olá! Gostaria de editar informações do pet ${pet.nomepet || 'perdido'}. ID: ${pet.id}" 
                       class="btn-edit" target="_blank">
                        ✏️ Editar
                    </a>
                    <a href="https://wa.me/553291375797?text=Olá! Gostaria de excluir o pet ${pet.nomepet || 'perdido'} da lista. ID: ${pet.id}" 
                       class="btn-delete" target="_blank">
                        🗑️ Excluir
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Função para adicionar eventos aos cards
function adicionarEventosCards() {
    // Eventos já são adicionados via onclick nos botões
}

// Função para abrir modal de novo pet
function abrirModalNovoPet() {
    petEditando = null;
    document.getElementById('petModalLabel').textContent = 'Cadastrar Pet Perdido';
    document.getElementById('btnSalvarText').textContent = 'Cadastrar Pet';
    document.getElementById('petForm').reset();
    
    const modal = new bootstrap.Modal(document.getElementById('petModal'));
    modal.show();
}

// Funções de edição e exclusão removidas - agora são feitas via WhatsApp

// Função para salvar pet (criar ou editar)
async function salvarPet(formData) {
    const url = petEditando ? 
        `${API_BASE_URL}/${petEditando.id}` : 
        `${API_BASE_URL}/criar`;
    
    const method = petEditando ? 'PUT' : 'POST';
    
    const response = await fetch(url, {
        method: method,
        body: formData
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao salvar pet: ${errorText}`);
    }
    
    return await response.json();
}

// Função para mostrar erro
function mostrarErro(mensagem) {
    const container = document.getElementById('pets-container');
    if (container) {
        container.innerHTML = `
            <div class="no-pets">
                <h3>❌ Erro</h3>
                <p>${mensagem}</p>
                <button class="btn-pet btn-novo-pet" onclick="carregarPets()">
                    🔄 Tentar Novamente
                </button>
            </div>
        `;
    }
}

// Função para aplicar filtros de pesquisa
function aplicarFiltros() {
    if (!termoPesquisa.trim()) {
        // Embaralhar novamente quando não há pesquisa
        petsFiltrados = [...todosPets].sort(() => Math.random() - 0.5);
    } else {
        const termo = termoPesquisa.toLowerCase();
        const filtrados = todosPets.filter(pet => {
            return (
                (pet.nomepet && pet.nomepet.toLowerCase().includes(termo)) ||
                (pet.descricao && pet.descricao.toLowerCase().includes(termo)) ||
                (pet.nomedono1 && pet.nomedono1.toLowerCase().includes(termo)) ||
                (pet.nomedono2 && pet.nomedono2.toLowerCase().includes(termo)) ||
                (pet.contatodono1 && pet.contatodono1.includes(termo)) ||
                (pet.contatodono2 && pet.contatodono2.includes(termo))
            );
        });
        // Embaralhar também os resultados da pesquisa
        petsFiltrados = filtrados.sort(() => Math.random() - 0.5);
    }
    
    exibirPets();
}

// Função para aplicar máscara de telefone
function aplicarMascaraTelefone(input) {
    input.addEventListener('input', function(e) {
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

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Carregar pets
    carregarPets();
    
    // Configurar pesquisa
    const searchInput = document.getElementById('search-pets-input');
    const clearSearchBtn = document.getElementById('clear-pets-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            termoPesquisa = e.target.value.trim();
            
            if (clearSearchBtn) {
                clearSearchBtn.style.display = termoPesquisa ? 'block' : 'none';
            }
            
            aplicarFiltros();
        });
    }
    
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', function() {
            if (searchInput) {
                searchInput.value = '';
                termoPesquisa = '';
                this.style.display = 'none';
                aplicarFiltros();
            }
        });
    }
    
    // Configurar formulário
    const petForm = document.getElementById('petForm');
    if (petForm) {
        petForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const btnSalvar = document.getElementById('btnSalvarPet');
            const btnSalvarText = document.getElementById('btnSalvarText');
            const btnSalvarSpinner = document.getElementById('btnSalvarSpinner');
            
            // Mostrar loading no botão
            btnSalvar.disabled = true;
            btnSalvarText.style.display = 'none';
            btnSalvarSpinner.style.display = 'inline-block';
            
            try {
                const formData = new FormData(this);
                await salvarPet(formData);
                
                mostrarToast(petEditando ? 'Pet atualizado com sucesso!' : 'Pet cadastrado com sucesso!');
                
                // Fechar modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('petModal'));
                modal.hide();
                
                // Recarregar lista
                await carregarPets();
                
            } catch (error) {
                console.error('Erro ao salvar pet:', error);
                mostrarToast('Erro ao salvar pet: ' + error.message, 'error');
            } finally {
                // Restaurar botão
                btnSalvar.disabled = false;
                btnSalvarText.style.display = 'inline';
                btnSalvarSpinner.style.display = 'none';
            }
        });
    }
    
    // Aplicar máscaras de telefone
    aplicarMascaraTelefone(document.getElementById('ContatoDono1'));
    aplicarMascaraTelefone(document.getElementById('ContatoDono2'));
    
    // Limpar formulário quando modal é fechado
    const petModal = document.getElementById('petModal');
    if (petModal) {
        petModal.addEventListener('hidden.bs.modal', function() {
            document.getElementById('petForm').reset();
            petEditando = null;
        });
    }
});
