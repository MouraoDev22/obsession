import type { OstPlayRequest } from "./OstPlayRequest";

/**
 * Forma do estado retornado por `useState<OstPlayRequest | null>()` /
 * Shape of the state returned by `useState<OstPlayRequest | null>()`.
 *
 * Tupla `[valor, setter]` consumida em `App.tsx` /
 * `[value, setter]` tuple consumed in `App.tsx`.
 */
export type OstPlayRequestState = [
  /** Requisição atual ou `null` com o player fechado /
   * Current request or `null` while the player is closed. */
  playRequest: OstPlayRequest | null,
  /** Atualiza a requisição de reprodução / Updates the play request. */
  setPlayRequest: React.Dispatch<React.SetStateAction<OstPlayRequest | null>>,
];
