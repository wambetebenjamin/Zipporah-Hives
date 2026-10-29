import type { Metadata } from "next";
import { Disclaimer, PageHero, TextLink } from "@/components/Shared";
import { guides } from "@/lib/learning";
import { getLocale, getMessages, localize } from "@/lib/i18n";
export const metadata: Metadata = { title: "Guides" };
export default async function GuidesPage() { const locale = await getLocale(); const m = getMessages(locale); return <><PageHero kicker={m.page.guideKicker} title={m.page.guideTitle} intro={m.page.guideIntro}/><section className="page-section"><div className="container"><div className="card-grid">{guides.map((guide) => <article className="info-card" key={guide.title.en}><h2>{localize(guide.title, locale)}</h2><p>{localize(guide.text, locale)}</p></article>)}</div><div className="section-end"><TextLink href="/safety">{m.nav.safety}</TextLink></div><Disclaimer m={m}/></div></section></>; }
