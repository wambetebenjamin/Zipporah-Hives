import type { Metadata } from "next";
import { Directory } from "@/components/Directory";
import { Disclaimer, PageHero } from "@/components/Shared";
import { getLocale, getMessages } from "@/lib/i18n";
export const metadata: Metadata = { title: "Keepers" };
export default async function KeepersPage() { const locale = await getLocale(); const m = getMessages(locale); return <><PageHero kicker={m.page.directoryKicker} title={m.page.directoryTitle} intro={m.page.directoryIntro}/><section className="page-section"><div className="container"><Directory locale={locale} m={m}/><Disclaimer m={m}/></div></section></>; }
