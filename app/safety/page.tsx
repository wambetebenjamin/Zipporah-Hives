import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer, PageHero } from "@/components/Shared";
import { getLocale, getMessages } from "@/lib/i18n";
import { information } from "@/lib/information";
import { whatsappLink } from "@/lib/links";
export const metadata: Metadata = { title: "Safety" };
export default async function InformationPage() {
  const locale = await getLocale(); const m = getMessages(locale);
  return <><PageHero kicker={m.page.safetyKicker} title={m.page.safetyTitle}/><section className="page-section"><div className="container"><div className="prose">{information.safety[locale].map((block) => <section key={block.heading}><h2>{block.heading}</h2><p>{block.text}</p></section>)}
    <Disclaimer m={m}/>
    <div className="auth-actions" style={{ marginTop: 30 }}><a className="boxed-btn3" href={whatsappLink()} target="_blank" rel="noreferrer">{m.common.whatsapp}</a><Link className="text-link" href="/join">{m.nav.join}</Link></div>
  </div></div></section></>;
}
