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
- 🖼️ **Capas das faixas** — imagens servidas de `public/`, com carregamento sob demanda e a capa do álbum como alternativa quando uma imagem não está disponível.
- 🌀 **Fundo parallax** — o fundo da página se move na direção oposta ao cursor, movido por variáveis CSS e controlado com `requestAnimationFrame`.
- 📎 **Rodapé orientado a dados** — finalidade do projeto, autor, ficha técnica do filme e links oficiais do Spotify/compra vivem em arquivos JSON em `src/data/`.
- ♿ **Recursos de acessibilidade** — controles nomeados, anúncios de status, restauração de foco e suporte em tempo real a `prefers-reduced-motion`.
- 🧼 **Tipagem estrita** — pastas dedicadas de `interfaces/` e `types/`, tipos de retorno explícitos em todo o código e props tipadas em todos os componentes.
- ⚡ **React Compiler** — memoização automática ativada via preset Babel para desempenho ótimo de renderização.
- 🌐 **Análise robusta de URLs do YouTube** — suporta os formatos `youtu.be/<id>`, `/watch?v=`, `/embed/`, `/shorts/` e `/live/`.

### Layout das faixas e rolagem

- **Desktop (64rem ou mais):** cards horizontais em duas colunas, Lado A à esquerda e Lado B à direita, com cabeçalhos fixos dentro de cada painel.
- **Rolagem independente:** usar a roda do mouse sobre um painel, inclusive seu cabeçalho, rola somente aquele lado com inércia do Lenis. Chegar ao início ou fim não transfere a rolagem para a página. Mova o ponteiro para fora dos painéis para rolar a página.
- **Celular e telas menores:** o Lado A é seguido pelo Lado B no fluxo normal da página, sem áreas de rolagem aninhadas.
- **Teclado:** coloque o foco no painel para rolar com as setas ou use Tab para percorrer os botões das faixas. O foco permanece visível.
- **Identidade visual:** Anton, Space Mono, preto/vermelho, grão de filme e parallax foram mantidos com brilho cromático mais contido. A preferência por movimento reduzido desativa a entrada do título e a animação do grão.

O breakpoint dos painéis no CSS deve permanecer alinhado à exclusão do Lenis no utilitário de rolagem. A classe estática `SmoothScroll` oferece métodos separados para o documento e para containers; cada painel de faixa (Lado A / Lado B) continua com sua própria instância dedicada do Lenis, enquanto o Lenis global mantém a rolagem do documento principal.

### Estados do player e recuperação

- O controle de tocar/pausar fica indisponível até o player do YouTube estar pronto. O buffering exibe o status de carregamento, sem indicar que a reprodução já começou.
- Pausar preserva a faixa ativa. Fechar remove o player e devolve o foco do teclado à faixa que o abriu.
- Um erro de vídeo oferece o link sublinhado **Abrir no YouTube**; selecionar outra faixa permite recuperação. Se a própria API falhar ao carregar, feche e reabra o player para tentar novamente.
- A altura medida do player reserva espaço no documento. Títulos longos quebram linha e os créditos empilham em contêineres estreitos, inclusive com texto ampliado.
- A contagem de faixas do hero vem do catálogo. As animações decorativas do grão e do indicador terminam após 4,5 segundos, mantendo sua aparência estática.

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

`npm run build` e `npm run format` gravam alterações de formatação em todo o repositório. Revise o diff depois. Para validar sem formatação global, execute separadamente `npm run lint`, `npx prettier --check <arquivos-alterados>`, `npx tsc -b` e `npx vite build`, substituindo `<arquivos-alterados>` pelos caminhos reais. Não há script `npm test` configurado.

## 📂 Estrutura do Projeto

```
obsession/
├── docs/audit/              # Relatório, descrição do PR, mensagem de merge e evidências
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
│   ├── interfaces/          # Interfaces compartilhadas de props/estado
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

## 🎞️ Editando o Rodapé

O rodapé também é totalmente orientado a dados. O conteúdo dele vive em três arquivos JSON em [`src/data/`](src/data/):

| Arquivo                                 | Conteúdo                                                                                         |
| --------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [`project.json`](src/data/project.json) | Parágrafos de finalidade, autor (nome, cargo e links do GitHub) e as linhas de direitos autorais |
| [`credits.json`](src/data/credits.json) | Ficha técnica do filme (direção, compositor, estúdios, distribuição, estreia)                    |
| [`links.json`](src/data/links.json)     | Links oficiais de escuta/compra (`label` + `hint` + `href`) — Spotify, álbum e filme             |

Os dados são importados em [`src/App.tsx`](src/App.tsx) e repassados às seções do `Footer` como props tipadas, do mesmo jeito que `songs.json` alimenta a lista de faixas.

## 🧠 Notas de Arquitetura

- **Fluxo de estado:** o `App` mantém o estado atual de `OstPlayRequest`. Selecionar uma faixa dispara uma requisição; pedir a _mesma_ faixa novamente alterna tocar/pausar; o botão de fechar limpa a requisição e desmonta o player.
- **Conteúdo orientado a dados:** as faixas e o conteúdo do rodapé (finalidade, créditos, links oficiais) ficam em arquivos JSON importados pelo `App` e repassados como props tipadas.
- **Carregamento do YouTube:** o script da IFrame API é carregado **uma única vez** e a promessa resultante é armazenada em cache, então reproduções posteriores nunca recarregam a API. Em caso de falha, o cache é reiniciado para permitir nova tentativa, e a interface mostra um link "Abrir no YouTube" como alternativa.
- **Parallax via variáveis CSS:** como `body::before` não é acessível via JavaScript, o deslocamento é gravado nas custom properties `--parallax-x` / `--parallax-y` e consumido pelo `transform` definido em `App.css` — mantendo o efeito no compositor.
- **React Compiler:** ativado pelo `reactCompilerPreset` em `vite.config.ts`, eliminando a necessidade de memoização manual com `useMemo`/`useCallback`.
- **TypeScript 7 lado a lado:** o `tsc` roda o TypeScript 7 através do `@typescript/native`, enquanto `typescript` está aliasado para `@typescript/typescript6` para o `typescript-eslint` fazer lint com a API do TS 6 (o TS 7 ainda não expõe API programática). Essa é a [configuração oficial de side-by-side](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript) — mantenha-a até o typescript-eslint suportar TS 7 ([typescript-eslint#10940](https://github.com/typescript-eslint/typescript-eslint/issues/10940)).

## ♿ Acessibilidade

- Todos os elementos interativos são `<button>`s reais (controles) ou `<a>`s (links externos) com nomes acessíveis descritivos.
- O parallax responde a mudanças de `prefers-reduced-motion` sem recarregar. O Lenis respeita a preferência; as animações do hero, grão e indicador possuem alternativas de movimento reduzido.
- Mensagens do player usam `role="status"`; o embed oculto é inerte e excluído das tecnologias assistivas.
- Fechar o player devolve o foco à faixa que o abriu. O espaçamento de rolagem protege as faixas focadas dos cabeçalhos fixos dos painéis.
- Elementos decorativos são marcados com `aria-hidden="true"`.
- Cor/status sempre é acompanhado de texto (ex.: status do player), nunca comunicado apenas por cor.

### Validação e limitações

A auditoria usou Playwright com Microsoft Edge no desenvolvimento e no preview de produção em 320, 390, 768, 1023, 1024 e 1440 pixels CSS. Os testes cobriram overflow, texto ampliado a 200%, estados do player, restauração de foco, rolagem isolada dos painéis e preferências de movimento em tempo real. Os estados da API real do YouTube e a recuperação de erros simulados foram exercitados separadamente.

Esses testes não comprovam conformidade WCAG integral. Leitores de tela, Safari, Firefox, dispositivos físicos e escuta humana do áudio não foram testados. Os scripts temporários de Playwright não constituem uma suíte versionada. Consulte as [notas da auditoria](docs/audit/README.md) e o [relatório detalhado de validação em inglês](docs/audit/PR.md) para evidências e limitações.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request:

1. Faça um fork do repositório e crie sua branch: `git checkout -b feature/minha-feature`
2. Faça commit das suas alterações: `git commit -m "feat: adiciona minha feature"`
3. Envie para a branch: `git push origin feature/minha-feature`
4. Abra um Pull Request.

Execute o lint, confira a formatação dos arquivos alterados e valide os tipos e o build de produção antes de enviar. Use o [template de PR](.github/pull_request_template.md), registre somente verificações realmente executadas e evite incluir alterações de formatação não relacionadas.

## 📄 Licença

Licença MIT.

---

<div align="center">
  <sub>Feito com ❤️ usando React, TypeScript e Vite.</sub>
</div>
