import type { ReactNode } from "react";

import styles from "./Main.module.css";

export function Main({ children }: React.PropsWithChildren): ReactNode {
  return <main className={styles.main}>{children}</main>;
}
