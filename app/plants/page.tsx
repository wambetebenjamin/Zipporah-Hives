import type { Metadata } from "next";
import { Disclaimer, PageHero, TextLink } from "@/components/Shared";
import { plants } from "@/lib/learning";
import { getLocale, getMessages, localize } from "@/lib/i18n";
export const metadata: Metadata = { title: "Plants" };
export default async function PlantsPage() { const locale = await getLocale(); const m = getMessages(locale); return <><PageHero kicker={m.page.plantsKicker} title={m.page.plantsTitle} intro={m.page.plantsIntro}/><section className="page-section"><div className="container"><div className="card-grid">{plants.map((plant) => <article className="info-card" key={plant.title.en}><h2>{localize(plant.title, locale)}</h2><p>{localize(plant.text, locale)}</p></article>)}</div><div className="section-end"><TextLink href="/regions">{m.home.regionsCta}</TextLink></div><Disclaimer m={m}/></div></section></>; }
