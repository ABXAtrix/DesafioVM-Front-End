# Cloud Manager — Frontend (Angular)

Aplicação **frontend** desenvolvida em **Angular**, responsável pela interface visual do sistema **Cloud Manager**, permitindo o gerenciamento de **Máquinas Virtuais (VMs)** de forma intuitiva, segura e interativa.

Este projeto faz parte de um **desafio técnico (nível júnior)** e consome a **Cloud Manager API (Backend)** via requisições HTTP.

---

## Visão Geral

O **Cloud Manager Frontend** fornece uma experiência rica ao usuário, oferecendo:

- Autenticação segura com JWT
- Dashboard interativo e dinâmico
- Listagem, cadastro e gerenciamento de VMs
- Filtros e paginação de dados
- Monitoramento de tarefas executadas
- Interface moderna e responsiva
- Integração completa com a API REST

---

## Arquitetura do Frontend

A aplicação segue uma separação clara de responsabilidades:

- **Modules**: Organização por domínio
- **Components**: Camada de visualização
- **Services**: Comunicação com a API e regras de negócio
- **Guards**: Proteção de rotas autenticadas
- **Interceptors**: Inclusão automática do token JWT nas requisições

---

## Segurança e Autenticação

- Autenticação baseada em **JWT**
- Token armazenado de forma segura no cliente
- Rotas protegidas por **AuthGuard**
- Interceptor HTTP para envio automático do token

---

## Tecnologias Utilizadas

- | Tecnologia | Descrição |
- | **Angular** | Framework principal do frontend |
- | **TypeScript** | Linguagem base |
- | **Angular Router** | Controle de rotas |
- | **HttpClient** | Comunicação com a API |
- | **JWT** | Autenticação via token |
- | **CSS** | Estilização da aplicação |

---

## Instalação e Execução

### Pré-requisitos

- Node.js (versão LTS)
- Angular CLI
- Backend em execução (Cloud Manager API)

### Instalação das Dependências

```
npm install
```

---

## Configuração do Ambiente

Configure o arquivo de ambiente:
```
// src/environments/environment.ts

export const environment = {
  production: false,
  apiUrl: 'http://localhost:sua_url_backend'
};
```
---
## Executar a Aplicação

```
ng serve
```

A aplicação estará disponível em:

```
http://localhost:url_front_end
```
---
## Funcionalidades Implementadas
- Autenticação

- Login de usuário

- Logout

- Persistência de sessão via JWT

- Redirecionamento automático para rotas protegidas


### Dashboard

- Visualização geral das máquinas virtuais

- Indicadores de status das VMs

- Atualização dinâmica dos dados

### Máquinas Virtuais

- Listagem de VMs do usuário

- Cadastro de novas VMs

- Atualização de dados

- Remoção de VMs

- Controle de estados:

- START

- STOP

- SUSPEND

- Paginação e filtros

### Usuários

- Visualização e edição do próprio perfil

- Validação de campos (e-mail, limites, etc.)


### Auditoria e Tarefas

- Visualização do histórico de tarefas executadas

- Monitoramento de ações realizadas nas VMs

---

## Integração com o Backend

A aplicação consome a Cloud Manager API, utilizando os endpoints documentados no backend para:

- Autenticação

- Gerenciamento de VMs

- Gerenciamento de usuários

- Consulta de tarefas e auditoria
---

## Requisitos Implementados

- Interface responsiva e intuitiva

- Dashboard interativo e dinâmico

- Comunicação segura com API REST

- Autenticação via JWT

- Proteção de rotas

- Separação de cargos

- Filtros e paginação

- Separação de responsabilidades no frontend

- Tratamento de erros e feedback ao usuário

---

# Escopo do Projeto

Este repositório contempla exclusivamente o frontend da aplicação, desenvolvido em Angular, conforme especificado no desafio técnico.