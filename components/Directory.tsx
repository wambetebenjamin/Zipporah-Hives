"use client";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { Icon } from "@/components/Icons";
import { SaveButton } from "@/components/Saved";
import { keepers } from "@/lib/data";
import { localize, type Locale } from "@/lib/locale";
import type { Messages } from "@/lib/i18n";

type Props = { locale: Locale; m: Messages };
export function Directory({ locale, m }: Props) {
  const [query, setQuery] = useState(""); const [country, setCountry] = useState("all"); const [scale, setScale] = useState("all"); const [contact, setContact] = useState("all");
  const dialog = useRef<HTMLDialogElement>(null);
  const countries = [...new Set(keepers.map((keeper) => keeper.country))];
  const results = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    return keepers.filter((keeper) => (country === "all" || keeper.country === country) && (scale === "all" || keeper.scale === scale) && (contact === "all" || contact === "website") && (!term || `${keeper.name} ${keeper.country} ${localize(keeper.place, locale)} ${localize(keeper.summary, locale)}`.toLocaleLowerCase().includes(term)));
  }, [query, country, scale, contact, locale]);
  function reset() { setQuery(""); setCountry("all"); setScale("all"); setContact("all"); }
  const fields = (prefix: string) => <div className="filter-fields">
    <div className="field"><label htmlFor={`${prefix}-search`}>{m.directory.searchLabel}</label><input id={`${prefix}-search`} type="search" placeholder={m.directory.searchPlaceholder} value={query} onChange={(event) => setQuery(event.target.value)} /></div>
    <div className="field"><label htmlFor={`${prefix}-country`}>{m.directory.country}</label><select id={`${prefix}-country`} value={country} onChange={(event) => setCountry(event.target.value)}><option value="all">{m.directory.allCountries}</option>{countries.map((item) => <option key={item} value={item}>{item}</option>)}</select></div>
    <div className="field"><label htmlFor={`${prefix}-scale`}>{m.directory.scaleBand}</label><select id={`${prefix}-scale`} value={scale} onChange={(event) => setScale(event.target.value)}><option value="all">{m.directory.allScales}</option><option value="small">{m.directory.small}</option><option value="medium">{m.directory.medium}</option><option value="large">{m.directory.large}</option><option value="unknown">{m.directory.unknown}</option></select></div>
    <div className="field"><label htmlFor={`${prefix}-contact`}>{m.directory.contactPreference}</label><select id={`${prefix}-contact`} value={contact} onChange={(event) => setContact(event.target.value)}><option value="all">{m.common.all}</option><option value="website">{m.directory.website}</option></select></div>
  </div>;
  return <><div className="directory-toolbar">{fields("desktop")}<button type="button" className="filter-button" onClick={() => dialog.current?.showModal()}><Icon name="filter" size={20}/>{m.common.filters}</button></div>
    <dialog ref={dialog} className="filter-sheet" aria-labelledby="filter-title"><div className="sheet-head"><h2 id="filter-title">{m.common.filters}</h2><button type="button" aria-label={m.common.close} onClick={() => dialog.current?.close()}><Icon name="close"/></button></div>{fields("mobile")}<button type="button" className="boxed-btn3" onClick={() => dialog.current?.close()}>{m.common.apply}</button> <button type="button" className="clear-button" onClick={reset}>{m.common.clear}</button></dialog>
    <div className="result-line"><span role="status">{results.length} {m.directory.results}</span><button type="button" className="clear-button" onClick={reset}>{m.common.clear}</button></div>
    {results.length ? <div className="card-grid">{results.map((keeper) => <article className="info-card flex" key={keeper.slug}><p className="card-kicker">{m.directory.listedAs}</p><h2>{keeper.name}</h2><p>{localize(keeper.summary, locale)}</p><dl><dt>{m.common.region}</dt><dd>{localize(keeper.place, locale)}</dd><dt>{m.common.scale}</dt><dd>{keeper.scale === "large" ? m.directory.large : m.common.notPublished}</dd><dt>{m.common.contact}</dt><dd>{m.directory.website}</dd></dl><div className="card-actions"><Link className="text-link" href={`/keepers/${keeper.slug}`}>{m.directory.details} <Icon name="arrow" size={18}/></Link><SaveButton slug={keeper.slug} m={m}/></div></article>)}</div> : <p className="empty-state" role="status">{m.common.noResults}</p>}
  </>;
}
