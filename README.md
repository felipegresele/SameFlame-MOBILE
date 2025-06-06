
# SameFlame 🔥

Aplicativo móvel de resgate e auxílio em incêndios, desenvolvido em React Native.

## 📚 Descrição da Global Solution

O SameFlame foi idealizado para conectar rapidamente pessoas em situação de risco devido a incêndios — urbanos ou florestais — com as autoridades competentes. A proposta foi apresentada e validada na disciplina Global Solution como resposta ao desafio de criar uma solução que salve vidas, reduza danos materiais e democratize o acesso a informações de emergência.

## 📲 Funcionalidades

| Funcionalidade       | Descrição resumida |
|----------------------|--------------------|
| **Botão de emergência** | Envia automaticamente as coordenadas atuais do usuário para bombeiros/equipes de resgate. |
| **Mapa em tempo real** | Exibe a posição do usuário, focos de incêndio ativos, alertas oficiais e abrigos próximos. |
| **Relato de Alerta**   | Usuário pode adicionar um alerta para a equipe de resgate e tem acesso a todos os alertas cadastrados no momento e pode atualiza-los ou deletar caso precise|
| **Relato de incêndios** | Usuários podem marcar o local no mapa, anexar detalhes (tipo de fogo, intensidade, observações) e submeter o alerta. |
| **Histórico de alertas** | Lista completa dos alertas criados, com possibilidade de editar ou excluir cada item (CRUD). |
| **Autenticação** | Tela de login/cadastro protegida por JWT para liberar todas as funcionalidades para só entrar somente usuários cadastrados e autenticados corretamente. |

## 👥 Integrantes do Grupo

- Felipe Horta Gresele | RM556955
- Arthur Cardoso Carinhanha | RM550615
- João Henrique Dias | RM556221

## 🧪 QA & Documentação

### 🗂️ Repositórios do GitHub

- Frontend: https://github.com/felipegresele/SameFlame-MOBILE
- Backend (Java): https://github.com/felipegresele/SameFlame-JAVA

### 📺 Vídeo de Demonstração

Assista no YouTube: https://www.youtube.com/watch?v=zQPjXA3CF1o

## 🏆 Critérios de Avaliação & Como Atendemos

| Item | Pontos | Como atendemos |
|------|--------|----------------|
| 5 telas + Navegação | 10 pts | Login/Cadastro · Home/Mapa · Emergência · Relatar Incêndio · Histórico/Detalhe │ Implementado com Expo Router seguindo boas práticas de acessibilidade. |
| CRUD via API (Java) | 40 pts | Operações Create / Read / Update / Delete para recursos `alerts` e `users`, usando Axios com tratamento de erros. |
| Estilização | 10 pts | Identidade visual própria (cores quentes, ícones custom, fontes urbanas), respeitando Material Design. |
| Arquitetura do Código | 20 pts | Estrutura modular (`pages`, `routes`, `types`); ESLint + Prettier; SOLID. |
| Vídeo | 20 pts | Gravação em dispositivo real + narração. |
| **Total possível:** | **100 pts** | |

## 📱 Telas Principais

- Login / Cadastro
- Home / Mapa em tempo real (inclui Botão de Emergência fixo)
- Relatar Incêndio (seleção de ponto no mapa + formulário)
- Adicionar Alerta (formúlario com informações para o usuário preencher sobre o alerta e sua localização)
- Histórico de Alertas (lista dos alertas cadastrados salvos no sistema com opção de atualizar ou deletar)
- Editar Alerta (Alterar algum campo caso necessario)

(Imagens ou GIFs de cada tela serão inseridos após o commit das capturas.)

## 🔄 Endpoints Principais (REST)

### API de Usuário

| Método | Rota     | Descrição |
|--------|----------|-----------|
| POST   | /usuario | Criação de novo usuário |

### API de Login

| Método | Rota   | Descrição |
|--------|--------|-----------|
| POST   | /login | Login do usuário usando email e password e retorno do token JWT |

### API de Denúncias

| Método | Rota           | Descrição            |
|--------|----------------|----------------------|
| GET    | /denuncia      | Lista todos os alertas do usuário |
| POST   | /denuncia      | Cria novo alerta |
| GET    | /denuncia/:id  | Detalhes de um alerta |
| PUT    | /denuncia/:id  | Atualiza um alerta |
| DELETE | /denuncia/:id  | Remove um alerta |

### API de Endereço

| Método | Rota            | Descrição                     |
|--------|-----------------|-------------------------------|
| POST   | /endereco       | Cria um endereço vinculado a uma denúncia |
| PUT    | /endereco/:id   | Atualiza os dados de endereço |
| GET    | /endereco/:id   | Detalhes de endereço          |

> **Back-end REST construído em Java 17 + Spring Boot, persistindo em Oracle SQL Developer. Todas as requisições protegidas por autenticação JWT após login.**

## 🗄️ Arquitetura de Pastas (Frontend)

```
src/
├── assets/       # Ícones, imagens, fontes
├── pages/        # Telas principais (BoasVindas, Login, Cadastro, Emergência, Alerta, Editar Alerta, Historico, Mapa, RelatarIncendio)
├── types/        # Expo Router config
└── App.tsx       # Entry point
```

## ⚙️ Instalação & Execução

### Requisitos

- Node ≥18
- Expo CLI (`npm install -g expo-cli`)
- Java 17 + Maven
- Oracle SQL Developer (ou Docker Compose para banco Oracle)

### Passo a Passo

```bash
# Clonar repositório do frontend
git clone https://github.com/felipegresele/SameFlame-MOBILE.git
npm install
npx expo start  # Expo abrirá o QR-Code

# Clonar repositório do backend
git clone https://github.com/felipegresele/SameFlame-JAVA.git
cd SameFlame-JAVA
./mvn spring-boot:run  # Executa o backend em http://localhost:8080
```

## ✨ Estilo & Temas

- **Cores**: Laranja-fogo (orange), Cinza-grafite (`#333`), Branco-gelo.
- **Ícones**: SVGs personalizados(Logo SafeFlame).
- **Diretrizes**: Material Design 3 / Human Interface Guidelines.
