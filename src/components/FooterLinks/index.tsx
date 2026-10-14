import type { FooterLink } from "../../interfaces/FooterLink";
import type { FooterLinksProps } from "../../interfaces/FooterLinksProps";

import styles from "./FooterLinks.module.css";

export function FooterLinks({ links }: FooterLinksProps): React.JSX.Element {
  return (
    <section className={styles.section} aria-label="Links oficiais">
      <h2 className={styles.title}>Links oficiais</h2>
      <ul className={styles.list}>
        {links.map(({ hint, href, label }: FooterLink): React.JSX.Element => (
          <li key={href}>
            <a
              className={styles.link}
              href={href}
              target="_blank"
              rel="noreferrer"
            >
              <span className={styles.link_label}>{label}</span>
              <span className={styles.link_hint}>{hint}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
