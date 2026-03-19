# 🔐 RSS Angular Keycloak + State Management

Este projeto é um ecossistema de demonstração de autenticação moderna, integrando Angular 21 com Keycloak 24 via OpenID Connect (OIDC). O diferencial técnico reside na persistência do estado de autenticação em um State Store customizado e no uso de Signals para reatividade.

<div align="center">
  <img src="docs/prints/home-page.png" alt="Página home" width="80%">
  <p><em>Demonstração da Toolbar com autenticação ativa e nome formatado.</em></p>
</div>

## 🛠️ Stack Tecnológica

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Keycloak](https://img.shields.io/badge/Keycloak-000000?style=for-the-badge&logo=keycloak&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)

* **Framework:** [Angular 21](https://v21.angular.dev) (Standalone Components, Signals, New App Initializer)
* **Identity Provider:** [Keycloak 24](https://www.keycloak.org/) (Dockerized, OIDC - Authorization Code Flow + PKCE)
* **State Management:** [@rssbr/state-store](https://www.npmjs.com/package/@rssbr/state-store) (Biblioteca open source para gerenciamento de estados)
* **UI Library:** [Angular Material](https://material.angular.io)


## ⚡ Inicialização Rápida (Developer Experience)

O projeto foi configurado para que o ambiente de identidade seja efêmero e consistente. Toda vez que o comando de inicialização é executado, o banco de dados do Keycloak é resetado para garantir que as configurações do realm-export.json (CORS, Clients, Users) estejam sempre sincronizadas.

**Pré-requisitos**

- Docker & Docker Compose.
- Node.js 20+ & npm.

**Executando o ecossistema completo**

Na raiz do projeto, execute apenas:

```bash
npm start
```

**O que acontece por baixo dos panos?**
O script executa um prestart que remove volumes antigos do Docker (down -v),
sobe o Keycloak com a flag --import-realm e, em seguida, inicia o servidor do Angular com o comando ng serve.

## 🏗️ Arquitetura de Autenticação

A aplicação utiliza o fluxo **Authorization Code Flow** com **PKCE**.

**Diferenciais Implementados:**

- **Silent SSO Check:** Utiliza um iframe (silent-check-sso.html) para validar a sessão sem redirecionamentos visuais para o usuário.
- **Token Claims Extraction:** Em vez de múltiplas chamadas à API de perfil, os dados do usuário (Nome, E-mail, Roles) são extraídos diretamente do **JWT (ID Token)** via tokenParsed, reduzindo a latência e evitando problemas de CORS desnecessários.
- **App Initializer:** O boot do Angular é bloqueado até que o handshake com o Keycloak seja concluído, garantindo que a Toolbar nunca exiba estados inconsistentes.

## 🔑 Credenciais de Acesso (Ambiente Local)

> [!IMPORTANT]
> **Keycloak Admin Console**
> - **URL:** `http://localhost:8080`
> - **Admin/Senha:** `admin` / `admin`

> [!NOTE]
> **Usuário de Teste (App)**
> - **Realm:** `RssRealm`
> - **Usuário:** `user`
> - **Senha:** `123456`

## 🎨 Componentes Customizados

- **TitleCaseCustomPipe:** Pipe inteligente para formatação de nomes brasileiros, ignorando preposições (de, da, dos, etc).
- **UserToolbar:** Componente reativo que consome o AuthService via Signals.

## 📂 Estrutura do Projeto

- **core/**: Singleton services, guards globais e modelos de estado (Auth, Keycloak).
- **pages/**: Componentes de página (Smart Components) que representam as rotas.
- **shared/**: Pipes, diretivas e componentes reutilizáveis (Dumb Components).
- **public/**: Arquivos estáticos servidos na raiz (ex: silent-check-sso.html).

<div align="center">
  <hr>
  <p>Desenvolvido com 💻 e ☕ por <strong>Rodrigo S. Santos</strong></p>
  <img src="https://img.shields.io/badge/Local-Imbé%2C%20RS-blue?style=flat-square&logo=googlemaps&logoColor=white" alt="Local">
  <a href="mailto:rodrigoss.br%40gmail.com" target="_blank">
    <img src="https://img.shields.io/badge/Email-rodrigoss.br%40gmail.com-green?style=flat-square&logo=gmail&logoColor=white" alt="Email">
  </a>
  <p>© 2026 Todos os direitos reservados.</p>
</div>
