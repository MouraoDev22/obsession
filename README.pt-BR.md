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

**Obsession** é uma aplicação web de página única que apresenta a trilha sonora original completa do filme _Obsession_ — **26 faixas de Rock Burwell** — como uma capa de disco virtual cuidadosamente construída. Navegue pela lista de faixas dividida em **Lado A** e **Lado B**, clique em qualquer música e ouça através de um player do YouTube fixo no rodapé da página, acompanhado de um fundo com efeito parallax que segue o cursor.

O projeto é uma demonstração de desenvolvimento frontend moderno: **React 19**, **React Compiler**, **TypeScript** em modo estrito, **Vite 8** e zero frameworks de UI — apenas CSS Modules feitos à mão.

## ✨ Funcionalidades

- 🎵 **Trilha completa com 26 faixas** — organizadas em Lado A / Lado B com identificadores de faixa estilo cassete (`A01`, `B13`…).
- ▶️ **Player fixo de áudio** — reproduz as faixas através de um embed oculto da YouTube IFrame API, com botão de tocar/pausar, status em tempo real ("Carregando… / Tocando / Pausado") e botão de fechar.
- 🖼️ **Capas personalizadas** — cada faixa possui sua própria imagem de capa servida de `public/`.
- 🌀 **Fundo parallax** — o fundo da página se move na direção oposta ao cursor, movido por variáveis CSS e controlado com `requestAnimationFrame`.
- ♿ **Acessível** — marcação semântica, `aria-label`s nos controles e respeito total à media query `prefers-reduced-motion` (o efeito parallax é desativado quando o sistema pede por movimento reduzido).
- 🧼 **Tipagem estrita** — pastas dedicadas de `interfaces/` e `types/`, tipos de retorno explícitos em todo o código e props tipadas em todos os componentes.
- ⚡ **React Compiler** — memoização automática ativada via preset Babel para desempenho ótimo de renderização.
- 🌐 **Análise robusta de URLs do YouTube** — suporta os formatos `youtu.be/<id>`, `/watch?v=`, `/embed/`, `/shorts/` e `/live/`.

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

| Script            | Descrição                                                                     |
| ----------------- | ----------------------------------------------------------------------------- |
| `npm run dev`     | Inicia o servidor de desenvolvimento do Vite com HMR                          |
| `npm run build`   | Faz a verificação de tipos com `tsc -b` e gera o build de produção em `dist/` |
| `npm run preview` | Serve o build de produção localmente                                          |
| `npm run lint`    | Executa o ESLint em todo o projeto                                            |
| `npm run format`  | Formata o código com o Prettier                                               |

## 📂 Estrutura do Projeto

```
obsession/
├── public/                  # Assets estáticos (capas, favicon, ícones)
├── src/
│   ├── assets/              # Imagens empacotadas pelo Vite (fundo etc.)
│   ├── components/          # Componentes de UI (um CSS Module por componente)
│   │   ├── Main/            # Wrapper de layout <main>
│   │   ├── OstHero/         # Cabeçalho/hero da trilha sonora
│   │   ├── OstSongList/     # Lista de faixas Lado A / Lado B
│   │   ├── OstSongCard/     # Card clicável da faixa
│   │   ├── OstSongCover/    # Imagem de capa da faixa
│   │   ├── OstSongTitle/    # Título da faixa + identificador
│   │   └── OstAudioPlayer/  # Player fixo no rodapé (embed do YouTube)
│   ├── data/
│   │   └── songs.json       # Dados da trilha (fonte única de verdade)
│   ├── interfaces/          # Interfaces compartilhadas de props/estado
│   ├── types/               # Aliases de tipo (OstPlayRequest, OstSongs, …)
│   └── utils/
│       ├── parallax/        # Efeito de fundo que segue o cursor
│       └── youtube/         # Loader da IFrame API + parser de ID de vídeo
├── index.html               # HTML de entrada (fontes, lang, meta)
├── vite.config.ts           # Presets do Vite + React + React Compiler
└── tsconfig*.json           # Project references do TypeScript estrito
```

## 🎼 Adicionando ou Editando Faixas

A lista de faixas é totalmente orientada a dados. Para adicionar uma nova faixa, acrescente um objeto em [`src/data/songs.json`](src/data/songs.json):

```json
{
  "cover": "/minha-nova-faixa.png",
  "id": "27",
  "title": "Minha Nova Faixa",
  "youtubeUrl": "https://www.youtube.com/watch?v=XXXXXXXXXXX"
}
```

| Campo        | Descrição                                                                             |
| ------------ | ------------------------------------------------------------------------------------- |
| `id`         | Chave única e estável, usada nas listas do React.                                     |
| `cover`      | Caminho da imagem de capa dentro de `public/`.                                        |
| `title`      | Título da faixa, exibido na lista e no player.                                        |
| `youtubeUrl` | Qualquer formato comum de link do YouTube — o ID do vídeo é extraído automaticamente. |

> As faixas são divididas igualmente entre o Lado A e o Lado B em tempo de execução, então não é preciso agrupar manualmente.

## 🧠 Notas de Arquitetura

- **Fluxo de estado:** o `App` mantém o estado atual de `OstPlayRequest`. Selecionar uma faixa dispara uma requisição; pedir a _mesma_ faixa novamente alterna tocar/pausar; o botão de fechar limpa a requisição e desmonta o player.
- **Carregamento do YouTube:** o script da IFrame API é carregado **uma única vez** e a promessa resultante é armazenada em cache, então reproduções posteriores nunca recarregam a API. Em caso de falha, o cache é reiniciado para permitir nova tentativa, e a interface mostra um link "Abrir no YouTube" como alternativa.
- **Parallax via variáveis CSS:** como `body::before` não é acessível via JavaScript, o deslocamento é gravado nas custom properties `--parallax-x` / `--parallax-y` e consumido pelo `transform` definido em `App.css` — mantendo o efeito no compositor.
- **React Compiler:** ativado pelo `reactCompilerPreset` em `vite.config.ts`, eliminando a necessidade de memoização manual com `useMemo`/`useCallback`.

## ♿ Acessibilidade

- Todos os elementos interativos são `<button>`s reais com `aria-label`s descritivos.
- O efeito parallax respeita a media query `prefers-reduced-motion`.
- Elementos decorativos são marcados com `aria-hidden="true"`.
- Cor/status sempre é acompanhado de texto (ex.: status do player), nunca comunicado apenas por cor.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request:

1. Faça um fork do repositório e crie sua branch: `git checkout -b feature/minha-feature`
2. Faça commit das suas alterações: `git commit -m "feat: adiciona minha feature"`
3. Envie para a branch: `git push origin feature/minha-feature`
4. Abra um Pull Request.

Por favor, execute `npm run lint` e `npm run format` antes de enviar.

## 📄 Licença

Este repositório ainda não possui um arquivo de licença. Todos os direitos da trilha sonora pertencem aos seus respectivos donos; este projeto é uma homenagem de fã sem fins comerciais.

---

<div align="center">
  <sub>Feito com ❤️ usando React, TypeScript e Vite.</sub>
</div>
