<div align="center">

# 🎧 Obsession — Player da Trilha Sonora Original

**Um player web cinematográfico para a trilha sonora original do filme _Obsession_.**

[English](README.md) · [Português (PT-BR)](README.pt-BR.md)

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![React Compiler](https://img.shields.io/badge/React%20Compiler-enabled-FF4785?logo=react&logoColor=white)
![CSS Modules](https://img.shields.io/badge/Styling-CSS%20Modules-36454F)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-2EA44F)

</div>

---

## 📖 Sobre

**Obsession** é uma aplicação web de página única que apresenta a trilha sonora original do filme _Obsession_ como uma capa de disco virtual. Navegue pela lista dividida em **Lado A** e **Lado B**, selecione uma faixa para reproduzi-la pela YouTube IFrame Player API e explore a página com o efeito parallax que acompanha o cursor.

O projeto é uma demonstração de desenvolvimento frontend moderno: **React 19**, **React Compiler**, **TypeScript** em modo estrito, **Vite 8** e zero frameworks de UI — apenas CSS Modules feitos à mão.

## ✨ Funcionalidades

- 🎵 **26 faixas da trilha** — divididas igualmente entre Lado A e Lado B, com numeração reiniciada em cada lado (`A01`–`A13` e `B01`–`B13`).
- ▶️ **Player fixo de áudio** — reproduz as faixas através de um embed oculto da YouTube IFrame API, com botão de tocar/pausar, status em tempo real ("Carregando… / Tocando / Pausado") e botão de fechar.
- 🖼️ **Capas das faixas** — imagens servidas de `public/`, com carregamento sob demanda e a capa do álbum como alternativa quando uma imagem não está disponível.
- 🌀 **Fundo parallax** — o fundo da página se move na direção oposta ao cursor, movido por variáveis CSS e controlado com `requestAnimationFrame`.
- 📎 **Rodapé orientado a dados** — finalidade do projeto, autor, ficha técnica do filme e links oficiais do Spotify/compra vivem em arquivos JSON em `src/data/`.
- ♿ **Recursos de acessibilidade** — controles nomeados, anúncios de status, restauração de foco e suporte em tempo real a `prefers-reduced-motion`.
- 🧼 **Tipagem estrita** — pastas dedicadas de `interfaces/` e `types/`, tipos de retorno explícitos em todo o código e props tipadas em todos os componentes.
- ⚡ **React Compiler** — memoização automática ativada via preset Babel para desempenho ótimo de renderização.
- 🌐 **Análise robusta de URLs do YouTube** — suporta os formatos `youtu.be/<id>`, `/watch?v=`, `/embed/`, `/shorts/` e `/live/`.

## 🖼️ Criando Capas para as Faixas

Abra o [prompt Obsession Cover Images](docs/OBSESSION-COVER-IMAGES.md) em uma LLM com capacidade de edição ou geração de imagens. Envie a imagem de origem e a imagem de referência de estilo para cada capa; o prompt define o tratamento consistente em vermelho e preto e a saída em 1254 × 1254 px.

## 🛠️ Stack Tecnológica

| Categoria         | Ferramenta                                                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Framework         | [React 19](https://react.dev/)                                                                                          |
| Linguagem         | [TypeScript 7](https://www.typescriptlang.org/)                                                                         |
| Build             | [Vite 8](https://vite.dev/) com [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react)                   |
| Compiler          | [React Compiler](https://react.dev/learn/react-compiler) (via `@rolldown/plugin-babel` + `babel-plugin-react-compiler`) |
| Estilos           | CSS Modules + custom properties CSS                                                                                     |
| Fontes            | Google Fonts — _Anton_ e _Space Mono_                                                                                   |
| Reprodução        | [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference)                                 |
| Lint / Formatação | ESLint 10 + `typescript-eslint`, Prettier (com plugins de ordenação CSS, imports e JSON)                                |

## 🚀 Início Rápido

### Pré-requisitos

- [Node.js](https://nodejs.org/) **20.19+** ou **22.12+** (exigido pelo Vite 8)
- npm (já vem com o Node.js)

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/MouraoDev22/obsession.git
cd obsession

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível na URL local exibida no terminal (normalmente `http://localhost:5173`).

## 📜 Scripts

| Script            | Descrição                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| `npm run dev`     | Inicia o servidor de desenvolvimento do Vite com HMR                                                      |
| `npm run build`   | Executa ESLint, formata o repositório com Prettier, verifica tipos com `tsc -b` e gera o build em `dist/` |
| `npm run preview` | Serve o build de produção localmente                                                                      |
| `npm run lint`    | Executa o ESLint em todo o projeto                                                                        |
| `npm run format`  | Formata o código com o Prettier                                                                           |

`npm run build` e `npm run format` formatam arquivos em todo o repositório. Revise o diff depois. Para validar sem formatação global, execute separadamente `npm run lint`, `npx prettier --check <arquivos-alterados>`, `npx tsc -b` e `npx vite build`. Não há script `npm test` configurado.

## 📂 Estrutura do Projeto

```
obsession/
├── docs/
│   ├── AI-TOOLS.md                    # Orientações do agente de IA e skills locais
│   └── OBSESSION-COVER-IMAGES.md      # Prompt reutilizável em inglês para capas
├── public/                  # Assets estáticos (capas, favicon, ícones)
├── src/
│   ├── assets/              # Imagens empacotadas pelo Vite (fundo etc.)
│   ├── components/          # Componentes de UI (um CSS Module por componente)
│   │   ├── Main/            # Wrapper de layout <main>
│   │   ├── Footer/          # Wrapper <footer> (sobre · autor · ficha · links)
│   │   ├── FooterAbout/     # Seção sobre a finalidade do projeto
│   │   ├── FooterAuthor/    # Seção do autor (links do GitHub)
│   │   ├── FooterCredits/   # Ficha técnica do filme (direção, trilha…)
│   │   ├── FooterLinks/     # Links oficiais do Spotify/compra
│   │   ├── OstHero/         # Cabeçalho/hero da trilha sonora
│   │   ├── OstSongList/     # Lista de faixas Lado A / Lado B
│   │   ├── OstSongCard/     # Card clicável da faixa
│   │   ├── OstSongCover/    # Imagem de capa da faixa
│   │   ├── OstSongTitle/    # Título da faixa + identificador
│   │   └── OstAudioPlayer/  # Player fixo no rodapé (embed do YouTube)
│   ├── data/
│   │   ├── credits.json      # Ficha técnica do filme (direção, estúdios…)
│   │   ├── links.json        # Links oficiais do Spotify/compra
│   │   ├── project.json      # Finalidade, autor e linhas de direitos
│   │   └── songs.json        # Dados da trilha (fonte única de verdade)
│   ├── interfaces/          # Interfaces compartilhadas de props e estado
│   ├── types/               # Aliases de tipo (OstPlayRequest, OstSongs, …)
│   └── utils/
│       ├── parallax/        # Utilitário estático de fundo que segue o cursor
│       ├── smoothScroll/    # Métodos estáticos Lenis para página e containers
│       └── youtube/         # Loader estático da IFrame API + parser de ID
├── index.html               # HTML de entrada (fontes, lang, meta)
├── vite.config.ts           # Presets do Vite + React + React Compiler
└── tsconfig*.json           # Project references do TypeScript estrito
```

## 🎼 Adicionando ou Editando Faixas

A lista do catálogo está em [`src/data/songs.json`](src/data/songs.json). Para editar uma faixa, altere o objeto existente. Cada `id` deve ser único; mantenha os IDs como strings e preserve a ordem atual do catálogo. Para uma nova faixa, use o próximo ID numérico disponível (atualmente `27`), adicione a capa em `public/` e então inclua o objeto:

```json
{
  "cover": "/minha-nova-faixa.png",
  "id": "27",
  "title": "Minha Nova Faixa",
  "youtubeUrl": "https://www.youtube.com/watch?v=XXXXXXXXXXX"
}
```

| Campo        | Descrição                                                                                                                |
| ------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `id`         | Chave de texto única, usada nas listas do React. Preserve IDs e ordem; para nova faixa, use o próximo número disponível. |
| `cover`      | Caminho a partir da raiz para uma imagem em `public/` (por exemplo, `/minha-nova-faixa.png`). O arquivo precisa existir. |
| `title`      | Título da faixa, exibido na lista e no player.                                                                           |
| `youtubeUrl` | Qualquer formato comum de link do YouTube — o ID do vídeo é extraído automaticamente.                                    |

> A lista é dividida pelo ponto médio em tempo de execução: se a quantidade for ímpar, o Lado A recebe uma faixa a mais. A numeração reinicia em `01` em cada lado. Após alterar o catálogo, confira a contagem e a divisão exibidas na aplicação; disponibilidade e direitos dos vídeos do YouTube devem ser verificados separadamente.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request. Para enviar um pull request:

1. Faça um fork do repositório ou crie uma branch de funcionalidade a partir de `main`.
2. Faça commits focados, com mensagens claras (Conventional Commits é recomendado).
3. Execute as verificações aplicáveis e registre os resultados reais.
4. Envie sua branch e abra um pull request usando o [template de PR](.github/pull_request_template.md).

Para alterações somente de documentação, confira a formatação e os links Markdown. Para alterações de código, execute conforme aplicável `npm run lint`, `npx prettier --check <arquivos-alterados>`, `npx tsc -b` e `npx vite build`. Não use `npm run build` como atalho de validação: ele também executa o Prettier com `--write` em todo o repositório. Registre somente verificações realmente executadas e evite alterações de formatação não relacionadas.

## 🤖 Documentação do Agente de IA

As skills locais de agente e seus papéis documentados, observações de uso e limites de procedência estão descritos em [Documentação de ferramentas de IA e agente](docs/AI-TOOLS.md). A presença de uma skill no repositório não significa que ela foi usada em toda alteração; o documento diferencia as skills disponíveis das utilizadas nesta atualização documental.

## 📄 Licença

Licença MIT.

---

<div align="center">
  <sub>Feito com ❤️ usando React, TypeScript e Vite.</sub>
</div>
