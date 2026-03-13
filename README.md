# 🏙️ Ajuda Que Eu Te Ajudo

O **Ajuda Que Eu Te Ajudo** é uma plataforma baseada em microsserviços projetada para facilitar a denúncia de problemas urbanos (como ruas mal estruturadas, falta de quebra-molas e iluminação precária). O sistema conecta o cidadão diretamente aos órgãos responsáveis através de notificações automatizadas e moderação por IA.

---

## 🏗️ Arquitetura do Sistema

O ecossistema é dividido em três microsserviços especializados que utilizam comunicação **REST** e containers **Docker**:

### 1. Serviço Principal (Core)
* **Stack:** NestJS + MySQL.
* **Função:** Gerencia a autenticação de usuários, a persistência de dados críticos e a orquestração do fluxo de denúncias.

### 2. Serviço de Notificação
* **Stack:** NestJS + MongoDB.
* **Função:** Gerencia o envio de e-mails para os órgãos competentes (ex: prefeituras) e armazena o histórico de comunicações.

### 3. Serviço de Validação (IA)
* **Stack:** Python (FastAPI) + Integração Google Gemini.
* **Função:** Analisa a imagem enviada via modelo de visão (CNN) para validar:
    * **Segurança:** Filtro contra conteúdo ofensivo, sexual ou perturbador.
    * **Contexto:** Verificação se a imagem de fato representa um problema urbano.

---

## 🚀 Tecnologias Utilizadas

**Arquitetura**: Microsserviços

**Linguagem**: TypeScript, Python

**Framework**: NestJS, FastAPI

**Bancos de Dados**: MySQL e MongoDB

**IA**: Google Gemini API

**Infraestrutura**: Docker & Docker Compose

**Comunicação**: Requisições HTTP/REST

---
## 🛠️ Como Executar o Projeto
#### Pré-requisitos
- Docker e Docker Compose instalados.

- Uma API Key do Google Gemini (disponível no Google AI Studio).

#### Passo a Passo
Clonar o Repositório:

````Bash
git clone [https://github.com/CarlosHenri05/ajuda-que-eu-te-ajudo.git](https://github.com/CarlosHenri05/ajuda-que-eu-te-ajudo.git)
cd ajuda-que-eu-te-ajudo
`````
**Configuração de Variáveis de Ambiente**: Certifique-se de configurar os arquivos .env em cada serviço com as seguintes chaves básicas:

- Serviço 1: DATABASE_URL, JWT_SECRET, VAL_SERVICE_URL, MAIL_SERVICE_URL.

- Serviço 2: MONGO_URI, MAIL_HOST, MAIL_USER, MAIL_PASS.

- Serviço 3: GEMINI_API_KEY.

Subir via Docker Compose:

````Bash
docker-compose up -d --build
````
