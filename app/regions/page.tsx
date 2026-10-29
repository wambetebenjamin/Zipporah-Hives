import type { Metadata } from "next";
import { Disclaimer, PageHero, TextLink } from "@/components/Shared";
import { regions } from "@/lib/data";
import { getLocale, getMessages, localize } from "@/lib/i18n";
export const metadata: Metadata = { title: "Regions" };
export default async function RegionsPage() { const locale = await getLocale(); const m = getMessages(locale); return <><PageHero kicker={m.page.regionKicker} title={m.page.regionTitle} intro={m.page.regionIntro}/><section className="page-section"><div className="container"><div className="card-grid">{regions.map((region) => <article className="info-card" key={region.name.en}><h2>{localize(region.name, locale)}</h2><p>{localize(region.note, locale)}</p></article>)}</div><div className="section-end"><TextLink href="/keepers">{m.home.heroPrimary}</TextLink></div><Disclaimer m={m}/></div></section></>; }
