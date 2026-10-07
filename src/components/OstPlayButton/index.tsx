import type { OstPlayButtonProps } from "../../interfaces/OstPlayButtonProps";
import styles from "./OstPlayButton.module.css";

export function OstPlayButton({
  onPlay,
  song,
}: OstPlayButtonProps): React.JSX.Element {
  const handlePlay: () => void = (): void => {
    onPlay(song);
    return;
  };

  return (
    <button
      type="button"
      className={styles.play_btn}
      onClick={handlePlay}
      aria-label={`Play ${song.name}`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
    </button>
  );
}
