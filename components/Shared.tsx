import Link from "next/link";
import { Icon } from "@/components/Icons";
import type { Messages } from "@/lib/i18n";

export function PageHero({ kicker, title, intro }: { kicker: string; title: string; intro?: string }) {
  return <section className="bradcam_area page-hero"><div className="container"><div className="row"><div className="col-lg-9"><p className="eyebrow light">{kicker}</p><h1>{title}</h1>{intro && <p className="page-hero-intro">{intro}</p>}</div></div></div></section>;
}
export function SectionTitle({ title, intro, centered = false }: { title: string; intro?: string; centered?: boolean }) {
  return <div className={`section_title${centered ? " text-center section-title-centered" : ""}`}><h2>{title}</h2>{intro && <p>{intro}</p>}</div>;
}
export function TextLink({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) {
  const className = "text-link";
  return external ? <a className={className} href={href} target="_blank" rel="noreferrer">{children} <Icon name="arrow" size={18}/></a> : <Link className={className} href={href}>{children} <Icon name="arrow" size={18}/></Link>;
}
export function Disclaimer({ m }: { m: Messages }) { return <p className="disclaimer">{m.common.disclaimer}</p>; }
