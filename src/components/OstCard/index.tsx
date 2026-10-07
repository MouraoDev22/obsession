import type { OstCardProps } from "../../interfaces/OstCardProps";
import styles from "./OstPlayButton.module.css";

export function OstCard({
  children,
  onPlay,
  song,
}: OstCardProps): React.JSX.Element {
  const handlePlay: () => void = (): void => {
    onPlay(song);
    return;
  };

  return (
    <button
      type="button"
      className={styles.ost_card}
      onClick={handlePlay}
      aria-label={`Play ${song.name}`}
    >
      {children}
    </button>
  );
}
