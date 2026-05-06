# NFe Manager

O **NFe Manager** permite armazenar informações de Notas Fiscais Eletrônicas (NF-e), possuindo métodos de consulta práticos. O sistema permite a importação de dados diretamente de arquivos XML, armazenamento local em SQLite e uma interface web para consulta das notas e seus respectivos itens.

---

## Tecnologias Utilizadas

- **Frontend:** React.js, TypeScript e Tailwind CSS.
- **Backend:** FastAPI (Python).
- **Banco de Dados:** SQLite.
- **Containerização:** Docker e Nginx.
- **Ingestão de Dados:** Script Python com interface gráfica (Tkinter/GUI).

## Estrutura do Projeto

O projeto é dividido em três componentes principais:

1.  **GUI de Importação (`gui.py`):** Um utilitário Python para ler XMLs e gravar no banco.
2.  **API REST:** Backend em FastAPI que serve os dados do SQLite.
3.  **Web Interface:** Frontend em React que consome a API.

### Esquema do Banco de Dados

O banco local possui duas tabelas relacionadas:

- **Notas:** Armazena o cabeçalho.
  - _Campos:_ Chave, número, valor total, CNPJ emitente, CNPJ destinatário, razão social, dia de emissão e hora da emissão.
- **Pedidos:** Itens vinculados à nota.
  - _Campos:_ ID do item, chave da nota correspondente (FK), descrição, quantidade, valor unitário e valor total.

---

## Como Executar

### 1. Requisitos

- Docker e Docker Compose instalados.
- Python 3 (necessário apenas para rodar o script de importação local).

### 2. Subindo o Ambiente (Docker)

Para construir as imagens e colocar a aplicação no ar, utilize o comando `docker-compose up --build`.

Este comando constrói as imagens e sobe o compose.

### 3. Inserindo XMLs

Execute o arquivo gui.py e selecione os arquivos .xml que deseja inserir no sistema.

### 4. Portas e Acesso

- **API**: Responde na porta host `5111`.
- **Frontend**: Responde na porta host `3003`.

Para utilizar a aplicação, acesse através do navegador:
-> [http://localhost:3003](http://localhost:3003)

> [!ATENÇÃO]
> **Aviso de CORS:** É obrigatório acessar via `localhost`. Tentar acessar pelo endereço IP da máquina resultará em bloqueio de CORS pelo navegador, impedindo a comunicação entre o frontend e o backend.

---

## Endpoints da API

Abaixo estão listadas as rotas disponíveis para consulta e gerenciamento das notas fiscais:

| Método     | Endpoint                    | Descrição                                            |
| :--------- | :-------------------------- | :--------------------------------------------------- |
| **GET**    | `/nfe`                      | Lista todas as notas cadastradas.                    |
| **GET**    | `/nfe/razao-social/{query}` | Busca notas por Razão Social.                        |
| **GET**    | `/nfe/numero/{query}`       | Busca notas pelo número da nota.                     |
| **GET**    | `/nfe/data/{intervalo}`     | Busca notas em um intervalo de data específico.      |
| **DELETE** | `/nfe/{id}`                 | Remove uma nota e todos os seus produtos vinculados. |
