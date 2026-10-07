import type { OstDataProps } from "../../types/OstDataProps";
import { OstPlayButton } from "../OstPlayButton";
import { OstSongImg } from "../OstSongImg";
import { OstSongTitle } from "../OstSongTitle";
import styles from "./OstData.module.css";

export function OstData({ data, onPlay }: OstDataProps): React.JSX.Element {
  return (
    <ul className={styles._1}>
      {data.map((song): React.JSX.Element => (
        <li className={styles._2} key={song.id}>
          <OstPlayButton song={song} onPlay={onPlay} />
          <OstSongImg img={song.img} />
          <OstSongTitle title={song.name} />
        </li>
      ))}
    </ul>
  );
}
