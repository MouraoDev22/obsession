import styles from "./FooterAuthor.module.css";

const GITHUB_PROFILE_URL: string = "https://github.com/MouraoDev22";
const PROJECT_REPOSITORY_URL: string =
  "https://github.com/MouraoDev22/obsession";

/**
 * Informações do autor do projeto / Project author information.
 *
 * PT: identifica quem concebeu, desenhou e desenvolveu o site e oferece
 * links para o perfil e o repositório no GitHub.
 *
 * EN: identifies who conceived, designed and built the site, with links to
 * the GitHub profile and repository.
 */
export function FooterAuthor(): React.JSX.Element {
  return (
    <section className={styles.section} aria-label="Autor">
      <h2 className={styles.title}>Desenvolvido por</h2>
      <p className={styles.name}>Mourão</p>
      <p className={styles.role}>@MouraoDev22 · Design e desenvolvimento</p>
      <nav className={styles.links} aria-label="Perfis do autor">
        <a
          className={styles.link}
          href={GITHUB_PROFILE_URL}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a
          className={styles.link}
          href={PROJECT_REPOSITORY_URL}
          target="_blank"
          rel="noreferrer"
        >
          Repositório
        </a>
      </nav>
    </section>
  );
}
