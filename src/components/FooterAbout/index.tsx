import type { FooterAboutProps } from "../../interfaces/FooterAboutProps";

import styles from "./FooterAbout.module.css";

export function FooterAbout({
  paragraphs,
}: FooterAboutProps): React.JSX.Element {
  return (
    <section className={styles.section} aria-label="Sobre o projeto">
      <h2 className={styles.title}>Sobre o projeto</h2>
      {paragraphs.map((paragraph: string): React.JSX.Element => (
        <p key={paragraph} className={styles.text}>
          {paragraph}
        </p>
      ))}
    </section>
  );
}
