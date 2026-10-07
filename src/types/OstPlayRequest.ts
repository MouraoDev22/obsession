import type { OstSong } from "../interfaces/OstSong";

/**
 * Requisição de reprodução enviada ao player / Play request sent to the player.
 *
 * Indica qual música deve ser tocada / Indicates which song should be played.
 */
export type OstPlayRequest = {
  /** Música escolhida pelo usuário / Song chosen by the user. */
  song: OstSong;
};
