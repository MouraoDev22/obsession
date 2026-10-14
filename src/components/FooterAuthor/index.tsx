import type { FooterAuthorLink } from "../../interfaces/FooterAuthorLink";
import type { FooterAuthorProps } from "../../interfaces/FooterAuthorProps";

import styles from "./FooterAuthor.module.css";

export function FooterAuthor({ author }: FooterAuthorProps): React.JSX.Element {
  return (
    <section className={styles.section} aria-label="Autor">
      <h2 className={styles.title}>Desenvolvido por</h2>
      <p className={styles.name}>{author.name}</p>
      <p className={styles.role}>{author.role}</p>
      <nav className={styles.links} aria-label="Perfis do autor">
        {author.links.map(
          ({ href, label }: FooterAuthorLink): React.JSX.Element => (
            <a
              key={href}
              className={styles.link}
              href={href}
              target="_blank"
              rel="noreferrer"
            >
              {label}
            </a>
          ),
        )}
      </nav>
    </section>
  );
}
