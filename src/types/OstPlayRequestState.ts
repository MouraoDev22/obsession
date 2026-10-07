import type { OstPlayRequest } from "./OstPlayRequest";

export type OstPlayRequestState = [
  playRequest: OstPlayRequest | null,
  setPlayRequest: React.Dispatch<React.SetStateAction<OstPlayRequest | null>>,
];
