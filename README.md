# Micro Pokedex

Projeto em monorepo com:

-   **Backend**: NestJS + Prisma
-   **Frontend**: Angular
-   **Banco de dados**: PostgreSQL (via Docker)

------------------------------------------------------------------------

## 📋 Pré-requisitos

Antes de começar, tenha instalado:

-   Node.js (\>= 18)
-   npm
-   Docker + Docker Compose
-   Angular CLI (`npm install -g @angular/cli`)
-   NestJS CLI (opcional)

------------------------------------------------------------------------

## 📦 Clonando o repositório

``` bash
git clone https://github.com/filipeabmoura/micro-pokedex.git
cd micro-pokedex
```

------------------------------------------------------------------------

## 🐘 Subindo o banco de dados (PostgreSQL)

O projeto usa PostgreSQL via Docker.

Na raiz do projeto, execute:

``` bash
docker compose up -d
```

Verifique se o container está rodando:

``` bash
docker ps
```

------------------------------------------------------------------------

## ⚙️ Backend (NestJS + Prisma)

### 1. Acessar a pasta do backend

``` bash
cd backend
```

### 2. Configurar variáveis de ambiente

``` bash
cp .env.example .env
```

Verifique se a variável `DATABASE_URL` está assim:

``` env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/micro_pokedex
```

### 3. Instalar dependências

``` bash
npm install
```

### 4. Gerar Prisma Client

``` bash
npx prisma generate
```

### 5. Rodar migrations

``` bash
npx prisma migrate dev
```

### 6. Subir o backend

``` bash
npm run start:dev
```

Backend disponível em:

    http://localhost:3000

------------------------------------------------------------------------

## 🖥 Frontend (Angular)

Abra **outro terminal**.

### 1. Acessar a pasta do frontend

``` bash
cd frontend
```

### 2. Instalar dependências

``` bash
npm install
```

### 3. Subir o frontend

``` bash
ng serve
```

Frontend disponível em:

    http://localhost:4200

------------------------------------------------------------------------

## 🚀 Fluxo resumido de execução

```bash
git clone https://github.com/filipeabmoura/micro-pokedex.git
cd micro-pokedex

docker compose up -d

cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev

cd frontend
npm install
ng serve

------------------------------------------------------------------------

---

## 📝 Convenção de Commits

Este projeto utiliza o padrão de **Commits Semânticos (Conventional Commits)**.

### Tipos de commit mais utilizados

- **feature**: nova funcionalidade
- **fix**: correção de bug
- **docs**: alterações na documentação
- **chore**: tarefas de manutenção (configs, deps, scripts)
- **refactor**: refatoração de código (sem mudança de comportamento)

### Exemplos

```bash
feature: adiciona cadastro de pokémons
fix: corrige erro de autenticação no login
docs(readme): adiciona instruções de setup do projeto
chore: atualiza dependências
refactor: simplifica serviço de autenticação
