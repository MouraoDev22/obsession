import type { OstSongTitleProps } from "../../interfaces/OstSongTitleProps";

import styles from "./OstSongTitle.module.css";

export function OstSongTitle({
  title,
  trackLabel,
}: OstSongTitleProps): React.JSX.Element {
  return (
    <span className={styles.song_title}>
      {trackLabel && (
        <span className={styles.song_track} aria-hidden="true">
          {trackLabel}
        </span>
      )}
      {title}
    </span>
  );
}
