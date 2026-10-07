import type { OstPlayRequest } from "../types/OstPlayRequest";

export interface OstAudioPlayerProps {
  onClose: () => void;
  request: OstPlayRequest;
}
