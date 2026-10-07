import type { OstSongs } from "../types/OstSongs";
import type { OstSong } from "./OstSong";

/**
 * Propriedades da lista de músicas / Properties of the song list.
 */
export interface OstSongListProps {
  /** Músicas exibidas na lista / Songs rendered in the list. */
  songs: OstSongs;
  /** Chamado com a música que deve ser reproduzida /
   * Called with the song that should be played. */
  onPlay: (song: OstSong) => void;
}
