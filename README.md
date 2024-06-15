Tibia Status Tracker
Tibia Status Tracker é uma aplicação que permite rastrear a quantidade de jogadores online em servidores Tibia específicos. A aplicação utiliza Node.js e TypeScript para estabelecer conexões de rede, obter informações de jogadores e atualizar um banco de dados com os dados coletados.

Funcionalidades
Conexão com servidores Tibia para obter a quantidade de jogadores online.
Atualização de um banco de dados Prisma com as informações coletadas.
Suporte a múltiplos servidores Tibia.
API RESTful para registrar usuários, adicionar servidores e rastrear jogadores.
Tecnologias Utilizadas
Node.js
TypeScript
Express
Prisma
PostgreSQL (ou outro banco de dados suportado pelo Prisma)
JWT para autenticação
Requisitos
Node.js v14 ou superior
PostgreSQL (ou outro banco de dados configurado no Prisma)
npm ou yarn
Instalação
Clone o repositório:

bash
Copiar código
git clone https://github.com/pedroiampietro/tibia-status-tracker.git
cd tibia-status-tracker
Instale as dependências:

bash
Copiar código
npm install
ou

bash
Copiar código
yarn install
Configure o banco de dados no arquivo .env:

env
Copiar código
DATABASE_URL="postgresql://usuario:senha@localhost:5432/tibia-status-tracker"
SECRET_KEY="sua_chave_secreta_para_jwt"
Execute as migrações do Prisma para configurar o banco de dados:

bash
Copiar código
npx prisma migrate dev --name init
Inicie o servidor:

bash
Copiar código
npm run dev
ou

bash
Copiar código
yarn dev
Uso
Registrar um Usuário
Endpoint: POST /auth/register

json
Copiar código
{
"email": "usuario@exemplo.com",
"password": "senha"
}
Login
Endpoint: POST /auth/login

json
Copiar código
{
"email": "usuario@exemplo.com",
"password": "senha"
}
Adicionar um Servidor
Endpoint: POST /server/add

Header: Authorization: Bearer <token_jwt>

json
Copiar código
{
"ip": "fast-baiak.com",
"port": 7171
}
Rastrear Servidores
Endpoint: GET /server/track

Header: Authorization: Bearer <token_jwt>

Resposta:

json
Copiar código
{
"message": "Tracking complete"
}
Listar Servidores
Endpoint: GET /server

Header: Authorization: Bearer <token_jwt>

Resposta:

json
Copiar código
[
{
"id": 1,
"ip": "fast-baiak.com",
"port": 7171,
"playersCount": 123,
"userId": 1
}
]
Estrutura do Projeto
lua
Copiar código
tibia-status-tracker/
│
├── prisma/
│ ├── schema.prisma
│ └── migrations/
│
├── src/
│ ├── controllers/
│ │ ├── authController.ts
│ │ └── serverController.ts
│ │
│ ├── middlewares/
│ │ └── authMiddleware.ts
│ │
│ ├── utils/
│ │ ├── playerTracker.ts
│ │ ├── socketConnection.ts
│ │ └── outputMessage.ts
│ │
│ ├── routes/
│ │ ├── authRoutes.ts
│ │ └── serverRoutes.ts
│ │
│ ├── prismaClient.ts
│ └── index.ts
│
├── .env
├── package.json
├── tsconfig.json
└── README.md
Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

Licença
Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.

Contato
Para mais informações, entre em contato.

Este README fornece uma visão geral do projeto, como configurá-lo e como utilizá-lo. Sinta-se à vontade para ajustá-lo conforme necessário.
