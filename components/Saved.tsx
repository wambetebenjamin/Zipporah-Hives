"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icons";
import { keepers } from "@/lib/data";
import type { Messages } from "@/lib/i18n";

const key = "zipporah-hives-saved-keepers";
export const draftKey = "zipporah-hives-listing-draft";
function readSaved(): string[] {
  try { const value: unknown = JSON.parse(localStorage.getItem(key) || "[]"); return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : []; } catch { return []; }
}
function useSaved() {
  const [saved, setSaved] = useState<string[]>([]);
  useEffect(() => {
    const update = () => setSaved(readSaved());
    update(); window.addEventListener("storage", update); window.addEventListener("zipporah-saved", update);
    return () => { window.removeEventListener("storage", update); window.removeEventListener("zipporah-saved", update); };
  }, []);
  function toggle(slug: string) {
    const existing = readSaved(); const next = existing.includes(slug) ? existing.filter((item) => item !== slug) : [...existing, slug];
    try { localStorage.setItem(key, JSON.stringify(next)); setSaved(next); window.dispatchEvent(new Event("zipporah-saved")); } catch { /* Browser storage may be disabled. */ }
  }
  return { saved, toggle };
}
export function SaveButton({ slug, m }: { slug: string; m: Messages }) {
  const { saved, toggle } = useSaved(); const active = saved.includes(slug);
  return <button className="save-button" type="button" aria-pressed={active} onClick={() => toggle(slug)}><Icon name="heart" size={17}/>{active ? m.common.saved : m.common.save}</button>;
}
export function SavedAccount({ m }: { m: Messages }) {
  const { saved, toggle } = useSaved(); const [draft, setDraft] = useState(false);
  useEffect(() => { try { setDraft(localStorage.getItem(draftKey) === "prepared"); } catch { setDraft(false); } }, []);
  const items = keepers.filter((keeper) => saved.includes(keeper.slug));
  return <div className="account-sections"><section className="account-card"><h2>{m.account.localTitle}</h2><p>{m.account.localNote}</p>{items.length ? <ul>{items.map((keeper) => <li key={keeper.slug}><Link href={`/keepers/${keeper.slug}`}>{keeper.name}</Link><button className="clear-button" onClick={() => toggle(keeper.slug)}>{m.common.remove}</button></li>)}</ul> : <p>{m.account.empty}</p>}<Link href="/keepers" className="text-link">{m.account.browse} <Icon name="arrow" size={18}/></Link></section><section className="account-card"><h2>{m.account.listingTitle}</h2><p>{m.account.listingNote}</p><p>{draft ? m.account.draft : m.account.noDraft}</p><Link href="/join" className="text-link">{m.nav.join} <Icon name="arrow" size={18}/></Link></section></div>;
}
