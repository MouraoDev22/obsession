import type { FooterProps } from "../../interfaces/FooterProps";
import type { ReactNode } from "react";

import { FooterAbout } from "../FooterAbout";
import { FooterAuthor } from "../FooterAuthor";
import { FooterCredits } from "../FooterCredits";
import { FooterLinks } from "../FooterLinks";

import styles from "./Footer.module.css";

export function Footer({
  about,
  author,
  children,
  copyright,
  credits,
  officialLinks,
}: React.PropsWithChildren<FooterProps>): ReactNode {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <FooterAbout paragraphs={about} />
        <FooterAuthor author={author} />
        <FooterCredits credits={credits} />
        <FooterLinks links={officialLinks} />
      </div>

      {children}

      <p className={styles.legal}>
        {copyright.map((line: string, index: number): React.JSX.Element => (
          <span key={line}>
            {index > 0 && <span aria-hidden="true">{"· "}</span>}
            {line}
          </span>
        ))}
      </p>
    </footer>
  );
}
