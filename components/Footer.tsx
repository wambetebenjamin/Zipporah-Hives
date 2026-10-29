import Link from "next/link";
import type { Messages } from "@/lib/i18n";
import { whatsappLink } from "@/lib/links";

export function Footer({ m }: { m: Messages }) {
  return <footer className="footer"><div className="footer_top"><div className="container"><div className="row">
    <div className="col-lg-3 col-md-6"><div className="footer_widget"><Link href="/" className="wordmark footer-wordmark"><span>zipporah<span className="wordmark-accent">.</span></span><small>HIVES</small></Link><p className="footer-description">{m.global.footerAbout}</p></div></div>
    <div className="col-lg-3 col-md-6"><div className="footer_widget"><h2 className="footer_title">{m.global.footerExplore}</h2><ul className="links"><li><Link href="/keepers">{m.nav.keepers}</Link></li><li><Link href="/coops">{m.nav.coops}</Link></li><li><Link href="/guides">{m.nav.guides}</Link></li><li><Link href="/plants">{m.nav.plants}</Link></li><li><Link href="/regions">{m.nav.regions}</Link></li></ul></div></div>
    <div className="col-lg-3 col-md-6"><div className="footer_widget"><h2 className="footer_title">{m.global.footerInfo}</h2><ul className="links"><li><Link href="/about">{m.nav.about}</Link></li><li><Link href="/safety">{m.nav.safety}</Link></li><li><Link href="/privacy">{m.nav.privacy}</Link></li><li><Link href="/terms">{m.nav.terms}</Link></li><li><Link href="/contact">{m.nav.contact}</Link></li></ul></div></div>
    <div className="col-lg-3 col-md-6"><div className="footer_widget"><h2 className="footer_title">{m.global.footerContact}</h2><ul className="links"><li><a href={whatsappLink()} target="_blank" rel="noreferrer">{m.common.whatsapp}</a></li><li><Link href="/join">{m.nav.join}</Link></li><li><Link href="/account">{m.nav.account}</Link></li></ul></div></div>
  </div><p className="footer-disclaimer">{m.common.disclaimer}</p></div></div>
  <div className="copy-right_text"><div className="container"><div className="bordered_1px"/><p className="copy_right">© {new Date().getFullYear()} Zipporah Hives. {m.global.footerRights} {m.global.templateCredit} <a href="https://colorlib.com" target="_blank" rel="noreferrer">Colorlib</a>.</p></div></div></footer>;
}
