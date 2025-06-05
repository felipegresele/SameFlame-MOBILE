SameFlame 🔥

Aplicativo móvel de resgate e auxílio em incêndios, desenvolvido em React Native

📚 Descrição da Global Solution

O SameFlame foi idealizado para conectar rapidamente pessoas em situação de risco devido a incêndios — urbanos ou florestais — com as autoridades competentes. A proposta foi apresentada e validada na disciplina Global Solution como resposta ao desafio de criar uma solução que salve vidas, reduza danos materiais e democratize o acesso a informações de emergência.

O app permite:

Funcionalidade

Descrição resumida

Botão de emergência

Envia automaticamente as coordenadas atuais do usuário para bombeiros/equipes de resgate.

Mapa em tempo real

Exibe a posição do usuário, focos de incêndio ativos, alertas oficiais e abrigos próximos.

Relato de incêndios

Usuários podem marcar o local no mapa, anexar detalhes (tipo de fogo, intensidade, observações) e submeter o alerta.

Histórico de alertas

Lista completa dos alertas criados, com possibilidade de editar ou excluir cada item (CRUD).

Autenticação

Tela de login/cadastro protegida por JWT para liberar todas as funcionalidades.

👥 Integrantes do Grupo

Felipe Horta Gresele   |  RM556955
Arthur Cardoso Carinhanha   |  RM550615
João Henrique Dias | RM556221

QA & Documentação

🗂️ Repositório do GitHub Classroom

https://github.com/<ORG>/<REPO-SAMEFLAME>

Cole o endereço exato do repositório acima e remova esta observação.

📺 Vídeo de Demonstração (até 5 min)

Assista no YouTube

🏆 Critérios de Avaliação & Como Atendemos

Item

Pontos

Como atendemos

5 telas + Navegação

10 pts

Login/Cadastro · Home/Mapa · Emergência · Relatar Incêndio · Histórico/Detalhe │ Implementado com Expo Router seguindo boas práticas de acessibilidade.

CRUD via API (Java)

40 pts

Operações Create / Read / Update / Delete para recursos alerts e users, usando Axios com tratamento de erros, loaders e toasts.

Estilização

10 pts

Identidade visual própria (cores quentes, ícones custom, fontes urbanas), respeitando Material Design.

Arquitetura do Código

20 pts

Estrutura modular (components • screens • services • routes • styles); ESLint + Prettier; SOLID.

Vídeo

20 pts

Gravação em dispositivo real + narração.

Total possível: 100 pts.

📱 Telas Principais

Login / Cadastro

Home / Mapa em tempo real (inclui Botão de Emergência fixo)

Relatar Incêndio (seleção de ponto no mapa + formulário)

Histórico de Alertas (lista paginada com filtros)

Detalhe do Alerta (edit / delete)

(Imagens ou GIFs de cada tela serão inseridos após o commit das capturas.)

🔄 Endpoints Principais (REST)

API de Usuário (cadastro)

Método

Rota

Descrição

POST

/usuario

Criação de novo usuário

API de Login (autenticação com JWT)

Método

Rota

Descrição

POST

/login

Login do usuário usando email e password e retorno do token JWT

API de Denúncias (alertas de incêndio)

Método

Rota

Descrição

GET

/denuncia

Lista todos os alertas do usuário

POST

/denuncia

Cria novo alerta

GET

/denuncia/:id

Detalhes de um alerta

PUT

/denuncia/:id

Atualiza um alerta

DELETE

/denuncia/:id

Remove um alerta

API de Endereço (relacionado à denúncia)

Método

Rota

Descrição

POST

/endereco

Cria um endereço vinculado a uma denúncia

PUT

/endereco/:id

Atualiza os dados de endereço

GET

/endereco/:id

Detalhes de endereço

Back‑end REST construído em Java 17 + Spring Boot, persistindo em PostgreSQL. Todas as requisições protegidas por autenticação JWT após login.

🗄️ Arquitetura de Pastas (Frontend)

src/
├── assets/       # Ícones, imagens, fontes
├── pages/        # 5+ telas principais (BoasVindas, Login, Cadastro, Emergência, Alerta, Editar Alerta, Historico, Mapa, RelatarIncendio)
├── types/        # Expo Router config
└── App.tsx       # Entry point

⚙️ Instalação & Execução

Requisitos

Node ≥18

Expo CLI (npm install -g expo-cli)

Java 17 + Maven (backend)

ORACLE - SQL DEVELOPER (ou Docker Compose)

Passo a Passo

# Clonar repositório
git clone https://github.com/felipegresele/SameFlame-MOBILE.git
cd SameFlame-MOBILE

# Front‑end
npm install
npx expo start  # Expo abrirá o QR‑Code

# Back‑end (em nova aba)
cd server
./mvnw spring-boot:run  # http://localhost:8080

✨ Estilo & Temas

Cores: Laranja‑fogo (orange), Cinza‑grafite ("#333"), Branco‑gelo.

Fonte principal: Poppins (Google Fonts).

Ícones: Lucide + custom SVGs.

Diretrizes: Material Design 3 / Human Interface Guidelines.


