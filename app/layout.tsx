import type { Metadata, Viewport } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Experience } from "@/components/Experience";
import { getLocale, getMessages } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Zipporah Hives | Sweet work. Shared hives.", template: "%s | Zipporah Hives" },
  description: "A practical directory and knowledge hub for African beekeepers, honey cooperatives and pollinator-friendly practices.",
  applicationName: "Zipporah Hives",
  openGraph: { title: "Zipporah Hives", description: "Sweet work. Shared hives.", type: "website" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, userScalable: true, viewportFit: "cover" };
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale(); const m = getMessages(locale);
  return <html lang={locale}><head><link rel="stylesheet" href="/template/css/bootstrap.min.css"/><link rel="stylesheet" href="/template/css/animate.css"/><link rel="stylesheet" href="/template/css/style-local.css"/><link rel="stylesheet" href="/site.css"/></head><body><a href="#main-content" className="skip-link">{m.common.skip}</a><Header locale={locale} m={m}/><main id="main-content">{children}</main><Footer m={m}/><Experience m={m}/></body></html>;
}
