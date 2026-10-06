import type { ReactNode } from "react";

import type { OstDataProps } from "../../types/OstDataProps";
import styles from "./OstData.module.css";

export function OstData({ data }: OstDataProps): React.JSX.Element {
  return (
    <ul className={styles._1}>
      <li className={styles._2}>
        <button></button>
        <h3>{data as ReactNode}</h3>
      </li>
    </ul>
  );
}
