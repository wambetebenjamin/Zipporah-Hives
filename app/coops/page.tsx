import type { Metadata } from "next";
import { Disclaimer, PageHero, TextLink } from "@/components/Shared";
import { cooperatives } from "@/lib/data";
import { getLocale, getMessages, localize } from "@/lib/i18n";
export const metadata: Metadata = { title: "Cooperatives" };
export default async function CoopsPage() { const locale = await getLocale(); const m = getMessages(locale); return <><PageHero kicker={m.page.coopKicker} title={m.page.coopTitle} intro={m.page.coopIntro}/><section className="page-section"><div className="container"><p className="intro-copy">{m.directory.publicNote}</p><div className="card-grid">{cooperatives.map((coop) => <article className="info-card flex" key={coop.name}><p className="card-kicker">{localize(coop.place, locale)}</p><h2>{coop.name}</h2><p>{localize(coop.description, locale)}</p><TextLink href={coop.website} external>{m.common.visitWebsite}</TextLink></article>)}</div><Disclaimer m={m}/></div></section></>; }
