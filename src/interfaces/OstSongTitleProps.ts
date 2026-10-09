import type { OstSong } from "./OstSong";

export interface OstSongTitleProps {
  title: OstSong["title"];
  /**
   * Rótulo retro da faixa no estilo LP (ex.: "A01").
   * Retro LP-style track label (e.g. "A01").
   */
  trackLabel?: string;
}
