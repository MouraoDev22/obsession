import type { ReactNode } from "react";

import { FooterAbout } from "../FooterAbout";
import { FooterAuthor } from "../FooterAuthor";
import { FooterCredits } from "../FooterCredits";
import { FooterLinks } from "../FooterLinks";

import styles from "./Footer.module.css";

/**
 * Rodapé da página / Page footer.
 *
 * PT: reúne as informações do projeto dentro da moldura vertical da página —
 * finalidade, autor, ficha técnica do filme, links oficiais de escuta/compra
 * e a linha de direitos autorais.
 *
 * EN: gathers the project information inside the page's vertical frame —
 * purpose, author, movie credits, official streaming/purchase links and the
 * copyright line.
 */
export function Footer({ children }: React.PropsWithChildren): ReactNode {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <FooterAbout />
        <FooterAuthor />
        <FooterCredits />
        <FooterLinks />
      </div>

      {children}

      <p className={styles.legal}>
        <span>Filme © 2025 Obsession Movie Production Inc.</span>
        <span aria-hidden="true">·</span>
        <span>Trilha © Back Lot Music</span>
        <span aria-hidden="true">·</span>
        <span>Projeto de fã, sem fins lucrativos</span>
      </p>
    </footer>
  );
}
