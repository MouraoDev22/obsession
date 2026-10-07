import type { ReactNode } from "react";

import type { OstSong } from "./OstSong";

/**
 * Propriedades do card de música / Properties of the song card.
 */
export interface OstSongCardProps {
  /** Conteúdo visual do card, normalmente capa + título /
   * Visual content of the card, usually cover + title. */
  children: ReactNode;
  /** Chamado com a música escolhida quando o card é clicado /
   * Called with the chosen song when the card is clicked. */
  onPlay: (song: OstSong) => void;
  /** Música representada pelo card / Song represented by the card. */
  song: OstSong;
}
