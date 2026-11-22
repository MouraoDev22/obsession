## Summary

Refina o layout cinematográfico em dois lados e corrige problemas de interface e acessibilidade sem substituir a identidade visual: Anton, Space Mono, preto/vermelho, capas, textura e parallax foram preservados.

Este PR inclui os commits de layout que já estavam na branch e a auditoria posterior. As alterações locais preexistentes em README.md e README.pt-BR.md não foram incluídas.

## Related issue

N/A.

## Type of change

- [x] Bug fix
- [x] UI, styling, or responsiveness
- [x] Accessibility or performance
- [x] Documentation, tooling, dependencies, or local skills — documentação/evidências; nenhuma dependência adicionada.

## Changes made

- Cards horizontais e painéis A/B com cabeçalhos sticky e rolagem independente no desktop; fluxo vertical no mobile (commits anteriores da branch).
- Fallback de capas e refinamento de tokens, player e rodapé (commits anteriores da branch).
- Mensagens do player em região de status, iframe oculto inerte e controle indisponível durante a inicialização.
- Recuperação de erro ao selecionar outra faixa e distinção de buffering.
- Restauração do foco à faixa ao fechar o player; marcação válida dentro dos botões.
- Reserva de espaço baseada na altura real do player e margem de rolagem nos painéis.
- Títulos do player podem quebrar linha; link de recuperação tem sublinhado persistente.
- Ficha técnica se reorganiza em contêineres estreitos, inclusive com texto ampliado.
- Parallax responde à mudança de movimento reduzido sem recarregar. Animações decorativas terminam após 4,5 segundos e mantêm a aparência estática.
- Contagem do hero derivada do catálogo. Lenis 1.3.26 já respeita movimento reduzido; sua implementação não foi duplicada.

## How to validate

**Environment:** Windows, Node 24.19.0, Playwright com Microsoft Edge headless. Vite em 5173; preview de produção em 4173.

**Steps and expected result:**

1. Executar `npm run dev`. Conferir 320, 390, 768, 1023, 1024 e 1440 px, com altura de 900 px: sem overflow horizontal.
2. Selecionar Obsession pelo teclado: player abre; controle fica indisponível até a API estar pronta; mensagens aparecem em uma região de status.
3. Pausar, selecionar a mesma faixa para retomar, trocar para Sandy, fechar e reabrir: estado e destaque acompanham a seleção; fechar devolve o foco à faixa e remove o iframe.
4. Bloquear a requisição `iframe_api`: mostrar mensagem de recuperação e link para YouTube, sem quebrar o layout mobile.
5. Em desktop, focar a sexta faixa: não fica sob o cabeçalho sticky. Rolar o lado A com wheel não move o lado B nem a página.
6. Alterar `prefers-reduced-motion` durante a sessão: parallax zera, transição do fundo fica em 0s e textura deixa de animar. Reativar permite parallax novamente.
7. Em 320 px, definir tamanho de fonte raiz em 200%: ficha técnica empilha campos e não cria overflow. Isto é teste de ampliação de texto, não zoom físico do navegador.
8. Executar `npm run lint`, `npx tsc -b` e `npx vite build`; iniciar `npm run preview` e repetir os cenários.

## Technical checks

| Check                             | Result / notes                                                                                                                                                                           |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run lint`                    | Passou.                                                                                                                                                                                  |
| Prettier nos arquivos alterados   | Passou; formatação limitada aos arquivos desta auditoria.                                                                                                                                |
| `npm run build`                   | Não executado literalmente: inclui escrita global do Prettier. ESLint, `npx tsc -b` e `npx vite build` foram executados separadamente com sucesso, preservando mudanças locais e skills. |
| Development server: `npm run dev` | Servidor Vite existente em 5173 validado com Playwright.                                                                                                                                 |
| Production preview                | `vite preview` iniciado em 4173 após build; matriz de layout/movimento repetida com sucesso.                                                                                             |

### Playback and YouTube integration

- [x] API real reportou reprodução, pausa, retomada pela mesma faixa, troca, fechamento e reabertura; não houve escuta humana.
- [x] Pausa preservou o card ativo; fechamento removeu o iframe; reabertura manteve apenas um iframe.
- [x] Estados de carregamento, reprodução, pausa, buffering, erro e recuperação foram exercitados com API simulada.
- [x] Falha de carregamento da API foi exercitada bloqueando a requisição, inclusive no preview.
- [ ] Final natural de faixa e regressão completa de URLs: não executados; parser não alterado.

### UI, accessibility, and motion

- [x] Layout mobile/desktop e ausência de overflow nos tamanhos documentados.
- [x] Reserva dinâmica para player e sua limpeza ao fechar.
- [x] Foco de teclado, retorno do foco, nomes dos controles e foco abaixo de cabeçalho sticky.
- [x] Estados acompanhados de texto/ícone; semântica revisada.
- [x] Parallax e preferência reduzida alterada em tempo real; rolagem A/B isolada.
- [x] Cleanup revisado no código e iframe/inset verificados em execução, com StrictMode do projeto.
- [ ] Auditoria completa de contraste e leitor de tela: não executada. Não se declara conformidade WCAG integral.
- [x] Sem exceções JavaScript nos cenários executados; nenhuma resposta HTTP 4xx/5xx na matriz de layout. A requisição bloqueada intencionalmente não representa falha de recurso da aplicação.

### Data, assets, and maintenance

- [x] CSS Modules, custom properties e estrutura existentes preservados.
- [x] Contagem do hero sincronizada; catálogo não alterado nesta auditoria.
- [x] Sem novas dependências, alterações de lockfile ou skills.
- [x] Notas de auditoria em português e inglês em `docs/audit/README.md`.
- [x] READMEs preexistentes excluídos dos commits. Evidências visuais incluídas intencionalmente; sem bundles de build.
- N/A: revisão externa de créditos/licenças/URLs; esses conteúdos não foram alterados na auditoria.

## Evidence

Capturas em `docs/audit/evidence/`:

- `obsession-before-390.png` e `obsession-before-1440.png`: referência inicial.
- `obsession-after-390.png` e `obsession-after-1440.png`: revisão posterior.
- `obsession-player-error.png`: erro de reprodução simulado em mobile.
- `obsession-validation.json`: medidas da matriz no preview.

As capturas iniciais completas contêm capas ainda não carregadas por lazy loading. As posteriores aguardam a decodificação das imagens; não interpretar essa diferença como correção nova das capas. A captura de erro foi feita durante a auditoria, antes dos últimos ajustes de espaçamento.

## Risks, limitations, and review notes

- Validação automatizada via Edge/Chromium; Safari, Firefox, leitor de tela e dispositivo físico não testados.
- Scripts Playwright foram executados como ferramentas temporárias externas ao repositório; não foi criada uma suíte npm test nem adicionada dependência.
- API real reportou estados esperados, mas áudio não foi ouvido; disponibilidade/autoplay continuam dependentes de YouTube e navegador.
- Testes de layout em erro usaram falha deliberada de rede; recuperação de erro de vídeo usou API simulada.
- Imagem de fundo original de aproximadamente 1,34 MB preservada; otimização de assets fora deste escopo.
- O PR inclui trabalho anterior da branch; a referência visual inicial da auditoria é c8c211e, não main.
