import type { OstPlayRequest } from "../types/OstPlayRequest";

/**
 * Propriedades do player de áudio / Properties of the audio player.
 */
export interface OstAudioPlayerProps {
  /** Fecha o player e interrompe a reprodução /
   * Closes the player and stops playback. */
  onClose: () => void;
  /** Notifica quando a reprodução começa ou termina de vez (fim da faixa ou
   * erro); pausar não dispara este callback. /
   * Reports when playback starts or fully stops (track ended or error);
   * pausing does not fire this callback. */
  onPlaybackChange: (isPlaying: boolean) => void;
  /** Requisição com a música a ser reproduzida /
   * Request with the song to be played. */
  playRequest: OstPlayRequest;
}
