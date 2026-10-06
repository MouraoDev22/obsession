import type { OstDataProps } from "../../types/OstDataProps";
import { OstPlayButton } from "../OstPlayButton";
import { OstSongTitle } from "../OstSongTitle";
import styles from "./OstData.module.css";

export function OstData({ data }: OstDataProps): React.JSX.Element {
  return (
    <ul className={styles._1}>
      {data.map((song): React.JSX.Element => (
        <li className={styles._2} key={song.id}>
          <OstPlayButton link={song.link} />
          <OstSongTitle title={song.name} />
        </li>
      ))}
    </ul>
  );
}
