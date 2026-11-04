import type { OstSongCardProps } from "../../interfaces/OstSongCardProps";

import styles from "./OstSongCard.module.css";

export function OstSongCard({
  children,
  isActive,
  onPlay,
  song,
}: OstSongCardProps): React.JSX.Element {
  const handlePlay: () => void = (): void => {
    onPlay(song);
    return;
  };

  return (
    <button
      type="button"
      className={`${styles.song_card} ${
        isActive ? styles.song_card_active : ""
      }`}
      onClick={handlePlay}
      aria-label={`${isActive ? "Tocar ou pausar" : "Tocar"} ${song.title}`}
      aria-current={isActive}
    >
      {children}
      <span className={styles.song_action} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor">
          {isActive ? (
            <path d="M5 9h2v6H5zm4-5h2v16H9zm4 3h2v10h-2zm4 3h2v4h-2z" />
          ) : (
            <path d="m9 5 11 7-11 7z" />
          )}
        </svg>
      </span>
    </button>
  );
}
