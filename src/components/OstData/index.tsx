import type { OstDataProps } from "../../types/OstDataProps";
import { OstCard } from "../OstCard";
import { OstSongImg } from "../OstSongImg";
import { OstSongTitle } from "../OstSongTitle";
import styles from "./OstData.module.css";

export function OstData({ data, onPlay }: OstDataProps): React.JSX.Element {
  return (
    <ol className={styles.ost_list}>
      {data.map((song): React.JSX.Element => (
        <li key={song.id}>
          <OstCard song={song} onPlay={onPlay}>
            <OstSongImg img={song.img} />
            <OstSongTitle title={song.name} />
          </OstCard>
        </li>
      ))}
    </ol>
  );
}
