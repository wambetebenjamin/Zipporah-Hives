import { notFound } from "next/navigation";
import Link from "next/link";
import { SaveButton } from "@/components/Saved";
import { Disclaimer, PageHero, TextLink } from "@/components/Shared";
import { keepers } from "@/lib/data";
import { getLocale, getMessages, localize } from "@/lib/i18n";
export async function generateStaticParams() { return keepers.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return { title: keepers.find((keeper) => keeper.slug === slug)?.name || "Keeper" }; }
export default async function KeeperPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const keeper = keepers.find((entry) => entry.slug === slug); if (!keeper) notFound();
  const locale = await getLocale(); const m = getMessages(locale);
  return <><PageHero kicker={m.directory.listedAs} title={keeper.name} intro={localize(keeper.place, locale)}/><section className="page-section"><div className="container"><Link className="text-link" href="/keepers">← {m.common.back}</Link><div className="prose"><h2>{m.directory.learnAbout}</h2><p>{localize(keeper.summary, locale)}</p><dl className="detail-list"><div><dt>{m.common.region}</dt><dd>{localize(keeper.place, locale)}</dd></div><div><dt>{m.common.scale}</dt><dd>{keeper.scale === "large" ? m.directory.large : m.common.notPublished}</dd></div><div><dt>{m.common.contact}</dt><dd>{m.directory.website}</dd></div></dl><div className="auth-actions"><TextLink href={keeper.website} external>{m.common.visitWebsite}</TextLink><SaveButton slug={keeper.slug} m={m}/></div><p className="photo-note">{m.directory.publicNote}</p><Disclaimer m={m}/></div></div></section></>;
}
