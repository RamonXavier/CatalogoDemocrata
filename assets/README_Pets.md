# Sistema de Pets Perdidos - Portal Democrata

Este sistema permite gerenciar pets perdidos da comunidade, facilitando o reconhecimento de animais e o contato com seus donos.

## Configuração do Google Apps Script

### 1. Criar uma nova planilha no Google Sheets
- Acesse [Google Sheets](https://sheets.google.com)
- Crie uma nova planilha
- Renomeie a aba para "PetsPerdidos"

### 2. Configurar o Google Apps Script
1. No Google Sheets, vá em **Extensões** > **Apps Script**
2. Cole o código do arquivo `GoogleAppsScript_Pets.js`
3. Salve o projeto com um nome descritivo (ex: "Portal Democrata - Pets")
4. Execute a função `testarScript()` para verificar se está funcionando
5. **IMPORTANTE**: Copie a URL do script e atualize no arquivo `PetService.cs` na linha:
   ```csharp
   private const string GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/SEU_SCRIPT_ID_AQUI/exec";
   ```

### 3. Configurar permissões
1. No Apps Script, vá em **Executar** > **Permissões**
2. Autorize o script a acessar sua planilha
3. Configure o script para ser executado por qualquer usuário (para uso público)

## Estrutura da Planilha

A planilha terá as seguintes colunas:
- **Id**: Identificador único do pet
- **NomePet**: Nome do animal
- **Descricao**: Descrição detalhada do pet
- **ContatoDono1**: Telefone/WhatsApp do primeiro dono
- **ContatoDono2**: Telefone/WhatsApp do segundo dono (opcional)
- **NomeDono1**: Nome do primeiro dono
- **NomeDono2**: Nome do segundo dono (opcional)
- **ImgPet1**: URL da primeira imagem
- **ImgPet2**: URL da segunda imagem (opcional)
- **ImgPet3**: URL da terceira imagem (opcional)

## Endpoints da API

### 1. Criar Pet Perdido
```
POST /api/pet/criar
Content-Type: multipart/form-data

Campos:
- NomePet (string, obrigatório)
- Descricao (string, obrigatório)
- ContatoDono1 (string, obrigatório)
- ContatoDono2 (string, opcional)
- NomeDono1 (string, obrigatório)
- NomeDono2 (string, opcional)
- ImgPet1 (file, opcional)
- ImgPet2 (file, opcional)
- ImgPet3 (file, opcional)
```

### 2. Buscar Todos os Pets
```
GET /api/pet/todos
```

### 3. Buscar Pets com Filtros
```
POST /api/pet/buscar
Content-Type: application/json

{
  "filtros": {
    "nomePet": "Rex",
    "nomeDono1": "João",
    "contatoDono1": "11999999999"
  }
}
```

### 4. Buscar Pet por ID
```
GET /api/pet/{id}
```

### 5. Atualizar Pet
```
PUT /api/pet/{id}
Content-Type: multipart/form-data

Campos: (mesmos do criar, todos opcionais exceto o ID)
```

### 6. Deletar Pet
```
DELETE /api/pet/{id}
```

### 7. Buscar Pets (Compatibilidade)
```
GET /api/pet/googlesheets
```

## Exemplo de Uso

### Criar um pet perdido:
```javascript
const formData = new FormData();
formData.append('NomePet', 'Rex');
formData.append('Descricao', 'Cachorro perdido, porte médio, cor marrom');
formData.append('ContatoDono1', '11999999999');
formData.append('NomeDono1', 'João Silva');
formData.append('ImgPet1', arquivoImagem);

fetch('/api/pet/criar', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => console.log(data));
```

### Buscar pets com filtro:
```javascript
fetch('/api/pet/buscar', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    filtros: {
      nomePet: 'Rex'
    }
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

## Funcionalidades

- ✅ **CRUD Completo**: Criar, ler, atualizar e deletar pets
- ✅ **Upload de Imagens**: Integração com Cloudinary para armazenar fotos
- ✅ **Filtros de Busca**: Buscar por nome do pet, nome do dono ou contato
- ✅ **Validação de Dados**: Validação de entrada e tratamento de erros
- ✅ **Resposta Padronizada**: Estrutura consistente de resposta da API
- ✅ **Documentação Swagger**: Endpoints documentados automaticamente

## Configurações Necessárias

1. **Google Apps Script**: URL do script deve ser atualizada no `PetService.cs`
2. **Cloudinary**: Configuração já está usando as mesmas credenciais do `AnuncioController`
3. **CORS**: Configurado para permitir requisições de qualquer origem

## Próximos Passos

1. Atualizar a URL do Google Apps Script no `PetService.cs`
2. Testar todos os endpoints
3. Integrar com o frontend
4. Implementar notificações (opcional)
5. Adicionar geolocalização (opcional)
