import type { FooterAuthorInfo } from "./FooterAuthorInfo";
import type { FooterCredit } from "./FooterCredit";
import type { FooterLink } from "./FooterLink";

export interface FooterProps {
  about: string[];
  author: FooterAuthorInfo;
  copyright: string[];
  credits: FooterCredit[];
  officialLinks: FooterLink[];
}
