import type { Metadata } from "next";
import { JoinForm } from "@/components/JoinForm";
import { Disclaimer, PageHero } from "@/components/Shared";
import { getLocale, getMessages } from "@/lib/i18n";
export const metadata: Metadata = { title: "Join the directory" };
export default async function JoinPage() { const locale = await getLocale(); const m = getMessages(locale); return <><PageHero kicker={m.page.joinKicker} title={m.page.joinTitle} intro={m.page.joinIntro}/><section className="page-section"><div className="container"><JoinForm m={m}/><Disclaimer m={m}/></div></section></>; }
