import type { OstPlayRequest } from "../types/OstPlayRequest";

/**
 * Propriedades do player de áudio / Properties of the audio player.
 */
export interface OstAudioPlayerProps {
  /** Fecha o player e interrompe a reprodução /
   * Closes the player and stops playback. */
  onClose: () => void;
  /** Requisição com a música a ser reproduzida /
   * Request with the song to be played. */
  playRequest: OstPlayRequest;
}
