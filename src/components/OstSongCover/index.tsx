import type { OstSongCoverProps } from "../../interfaces/OstSongCoverProps";

import styles from "./OstSongCover.module.css";

export function OstSongCover({ cover }: OstSongCoverProps): React.JSX.Element {
  return (
    <img
      src={cover}
      alt=""
      className={styles.song_cover}
      width={88}
      height={88}
      loading="lazy"
      decoding="async"
      onError={(event: React.SyntheticEvent<HTMLImageElement>): void => {
        const image: HTMLImageElement = event.currentTarget;
        if (image.dataset.fallback) {
          image.style.visibility = "hidden";
          return;
        }
        image.dataset.fallback = "true";
        image.src = "/obsession.png";
        return;
      }}
    />
  );
}
