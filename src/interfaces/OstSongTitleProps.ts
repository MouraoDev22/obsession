import type { OstSong } from "./OstSong";

/**
 * Propriedades do título da música / Properties of the song title.
 */
export interface OstSongTitleProps {
  /** Título da música exibido como cabeçalho (`h3`) /
   * Song title displayed as a heading (`h3`). */
  title: OstSong["title"];
}
