import type { Metadata } from "next";
import { auth, authConfigured } from "@/auth";
import { AuthActions } from "@/components/AuthActions";
import { SavedAccount } from "@/components/Saved";
import { PageHero } from "@/components/Shared";
import { getLocale, getMessages } from "@/lib/i18n";
export const metadata: Metadata = { title: "My account", robots: { index: false } };
export default async function AccountPage() { const locale = await getLocale(); const m = getMessages(locale); const session = authConfigured ? await auth() : null; const user = session?.user?.name || session?.user?.email || null; return <><PageHero kicker={m.page.accountKicker} title={m.page.accountTitle}/><section className="page-section"><div className="container"><AuthActions configured={authConfigured} user={user} m={m}/><SavedAccount m={m}/></div></section></>; }
