"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Icon } from "@/components/Icons";
import { whatsappLink } from "@/lib/links";
import { localeCookie, type Locale } from "@/lib/locale";
import type { Messages } from "@/lib/i18n";

export function Header({ locale, m }: { locale: Locale; m: Messages }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    function keydown(event: KeyboardEvent) { if (event.key === "Escape") setOpen(false); }
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, []);
  const links = [
    ["/", m.nav.home], ["/keepers", m.nav.keepers], ["/coops", m.nav.coops],
    ["/guides", m.nav.guides], ["/plants", m.nav.plants], ["/regions", m.nav.regions],
  ];
  function changeLanguage(value: string) {
    Cookies.set(localeCookie, value, { expires: 365, sameSite: "lax", secure: location.protocol === "https:" });
    router.refresh();
  }
  const language = <label className="language-select"><span className="sr-only">{m.nav.language}</span><select aria-label={m.nav.language} value={locale} onChange={(event) => changeLanguage(event.target.value)}><option value="en">EN</option><option value="sw">SW</option><option value="fr">FR</option></select></label>;
  return <header className="header-area">
    <div className="header-top_area"><div className="container top-line"><span>{m.global.top}</span><a href={whatsappLink()} target="_blank" rel="noreferrer">{m.common.whatsapp} <span aria-hidden="true">↗</span></a></div></div>
    <div className="main-header-area"><div className="container header-inner">
      <Link href="/" className="wordmark" aria-label="Zipporah Hives, home"><span>zipporah<span className="wordmark-accent">.</span></span><small>HIVES</small></Link>
      <nav className="desktop-nav" aria-label={m.nav.menu}>{links.map(([href, label]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>)}</nav>
      <div className="header-actions">{language}<Link className="account-link" href="/account">{m.nav.account}</Link><Link className="header-join" href="/join">{m.nav.join}</Link><button className="menu-toggle" aria-label={open ? m.common.close : m.nav.menu} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}><Icon name={open ? "close" : "menu"}/></button></div>
    </div>
    {open && <nav id="mobile-navigation" className="mobile-navigation container" aria-label={m.nav.menu}>{links.map(([href, label]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>)}<Link href="/about">{m.nav.about}</Link><Link href="/account">{m.nav.account}</Link><Link href="/join">{m.nav.join}</Link></nav>}
    </div>
  </header>;
}
