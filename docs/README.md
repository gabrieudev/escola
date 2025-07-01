<h1 align="center" style="font-weight: bold;">Escola 📚</h1>

<p align="center">
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="ExpressJS">
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="NodeJS">
  <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="Postgres">
  <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
  <img src="https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white" alt="Swagger">
</p>

<p align="center">
 <a href="#estrutura">Estrutura do projeto</a> •
 <a href="#der">Diagrama de Entidade-Relacionamento</a> •
 <a href="#inicio">Primeiros Passos</a> •
 <a href="#interacao">Interação</a> •
 <a href="#contribuir">Contribuir</a>
</p>

<p align="center">
  <b>API desenvolvida durante a disciplina de Programação III para auxiliar no aprendizado de React.</b>
</p>

<h2 id="estrutura">📂 Estrutura do projeto</h2>

```yaml
├── backend/                          # Backend
│   ├── src/                          # Código fonte
│   │   ├── domain/                   # Camada de domínio
│   │   ├── package/                  # Pacotes
│   │   │   └── typeorm/              # Módulo do TypeORM
│   │   ├── infra/                    # Camada de infraestrutura
│   │   │   ├── api/                  # API
│   │   │   │   └── express/          # Framework
│   │   │   │       ├── entities/     # Entidades (TypeORM)
│   │   │   │       ├── routes/       # Rotas
│   │   │   │       ├── schemas/      # Esquemas de validação de input
│   │   │   │       └── middlewares/  # Middlewares
│   │   │   └── repositories/         # Repositórios
│   │   │       └── persistence/      # Banco de dados
│   │   ├── usecases/                 # Camada de casos de uso
│   │   └── utils/                    # Arquivos globalmente reutilizáveis
│   └── Dockerfile                    # Dockerfile
├── docs/                             # Documentação do projeto
├── database/                         # Script de DDL
└── docker-compose.yml                # Conteinerização (API e banco Postgres)
```

<h2 id="der">📊 Diagrama de Entidade-Relacionamento</h2>

<img src="./images/erd.png" alt="Diagrama de Entidade-Relacionamento">

<h2 id="inicio">🚀 Primeiros Passos</h2>

<h3>Pré-requisitos</h3>

-   [Docker Compose](https://docs.docker.com/compose/install/)
-   [Git](https://git-scm.com/downloads)

<h3>Clonando</h3>

```bash
git clone https://github.com/gabrieudev/escola.git
```

<h3>Inicializando</h3>

Execute o seguinte comando dentro do projeto:

```bash
docker compose up -d --build
```

<h2 id="interacao">🌐 Interação</h2>

Agora você poderá visualizar e interagir com todos os endpoints em [http://localhost:3000/docs](http://localhost:3000/docs).

> Caso prefira, você também pode interagir com a API através do link em produção: [https://escola-rkhq.onrender.com/docs](https://escola-rkhq.onrender.com/docs).

<h2 id="contribuir">📫 Contribuir</h2>

Contribuições são muito bem vindas! Caso queira contribuir, faça um fork do repositório e crie um pull request.

1. `git clone https://github.com/gabrieudev/escola.git`
2. `git checkout -b feature/NOME`
3. Siga os padrões de commits.
4. Abra um Pull Request explicando o problema resolvido ou a funcionalidade desenvolvida. Se houver, anexe screenshots das modificações visuais e aguarde a revisão!
