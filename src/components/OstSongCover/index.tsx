import type { OstSongCoverProps } from "../../interfaces/OstSongCoverProps";
import styles from "./OstSongCover.module.css";

export function OstSongCover({ cover }: OstSongCoverProps): React.JSX.Element {
  return <img src={cover} alt="" className={styles.song_cover} />;
}
