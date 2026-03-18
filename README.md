# RSS Angular Keycloak

Este projeto demonstra a integração de uma aplicação **Angular** com o **Keycloak** para gerenciamento de identidade e acesso (IAM), utilizando OpenID Connect (OIDC).

## 🚀 Como Executar o Ambiente

O ambiente de autenticação está containerizado com Docker para facilitar o setup inicial.

### Pré-requisitos
* Docker e Docker Compose instalados.
* Node.js e Angular CLI.

### 1. Subir o Keycloak
A partir da raiz do projeto, execute o comando abaixo para iniciar o Keycloak com o Realm e usuários pré-configurados:

```bash
docker compose -f keycloak/docker-compose.yml up -d
```

### 2. Acompanhar a Inicialização
Para garantir que o Realm foi importado corretamente, você pode monitorar os logs:

```bash
docker compose -f keycloak/docker-compose.yml logs -f
```

### 3. Acessar o Console
Após o container subir, o Keycloak estará disponível em:

 - **URL:** http://localhost:8080
 - **Usuário Admin:** admin
 - **Senha Admin:** admin

## 🛠️ Detalhes da Configuração do Keycloak
O projeto já vem com um Realm pré-configurado (RssRealm) que inclui:

- **Client ID:** angular-app
- **Usuário de Teste:** user / 123456
