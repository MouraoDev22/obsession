# Interface audit / Auditoria de interface

## Português

Auditoria de 22 de novembro de 2026. A identidade original foi preservada: tipografia Anton/Space Mono, preto/vermelho, capas e composição A/B. Correções concentradas em estados do player, foco, responsividade e preferências de movimento.

O player anuncia status, impede ação antes da inicialização e recupera erros ao trocar de faixa. Ao fechar, devolve foco à faixa. Sua altura reserva espaço no documento. Créditos empilham quando o contêiner fica estreito. Parallax reage à preferência de movimento em tempo real; textura e indicador mantêm aparência estática após 4,5 segundos de animação.

Veja `PR.md` para procedimentos, resultados, limitações e evidências em inglês. As edições locais dos READMEs foram preservadas durante a auditoria e posteriormente incorporadas à atualização da documentação nesta mesma branch, a pedido do autor. Os resultados de navegador se referem à auditoria de implementação, não a uma nova execução para a atualização textual.

## English

Audit performed on November 22, 2026. Original Anton/Space Mono typography, black/red palette, artwork and A/B composition are preserved. Changes target player states, keyboard focus, responsive behavior and motion preferences.

The player announces status, prevents actions before initialization and recovers video errors when switching tracks. Closing restores focus to the invoking track. Its measured height reserves document space. Credits stack in narrow containers. Parallax responds to live motion preference changes; grain and indicator retain their static appearance after 4.5 seconds of animation.

Playwright ran with installed Microsoft Edge, both against Vite development and production preview. Layout was checked at 320, 390, 768, 1023, 1024 and 1440 CSS pixels. Enlarged root text at 200% no longer overflows the credits. Real YouTube reported playing, pause, resume, switch and reopen; no human audio listening was performed. Simulated YouTube covered buffering and error recovery. No complete WCAG conformance, screen-reader, Safari, Firefox or physical-device testing is claimed.

The root READMEs contained pre-existing edits initially excluded from the audit commits. At the author's request, those edits were subsequently incorporated into the documentation update on the same branch. The PR description and merge message are in English; the project READMEs and these audit notes retain their English and Portuguese versions. Browser results refer to the implementation audit, not a new run for the documentation-only update. No runtime or test dependencies were added. Playwright scripts ran externally as temporary audit tools, not a committed test suite.
