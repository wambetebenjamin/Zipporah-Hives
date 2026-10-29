"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { draftKey } from "@/components/Saved";
import { whatsappLink } from "@/lib/links";
import type { Messages } from "@/lib/i18n";

type Recaptcha = { ready: (callback: () => void) => void; execute: (key: string, options: { action: string }) => Promise<string>; render: (element: HTMLElement, options: { sitekey: string }) => number; getResponse: (widget: number) => string; reset: (widget: number) => void };
declare global { interface Window { grecaptcha?: Recaptcha } }
const v3Key = process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY || "";
const v2Key = process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY || "";
function loadCaptcha(): Promise<Recaptcha> {
  if (window.grecaptcha) return new Promise((resolve) => window.grecaptcha!.ready(() => resolve(window.grecaptcha!)));
  return new Promise((resolve, reject) => {
    const script = document.createElement("script"); script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(v3Key)}`; script.async = true; script.defer = true;
    script.onload = () => window.grecaptcha ? window.grecaptcha.ready(() => resolve(window.grecaptcha!)) : reject(new Error("reCAPTCHA unavailable"));
    script.onerror = () => reject(new Error("reCAPTCHA unavailable")); document.head.appendChild(script);
  });
}
export function JoinForm({ m }: { m: Messages }) {
  const [busy, setBusy] = useState(false); const [message, setMessage] = useState(""); const [result, setResult] = useState(""); const [ticket, setTicket] = useState(""); const [fallback, setFallback] = useState(false);
  const captchaElement = useRef<HTMLDivElement>(null); const widget = useRef<number | null>(null);
  useEffect(() => {
    if (!fallback || !captchaElement.current || !window.grecaptcha || !v2Key) return;
    try { widget.current = window.grecaptcha.render(captchaElement.current, { sitekey: v2Key }); } catch { setMessage(m.forms.captchaError); }
  }, [fallback, m.forms.captchaError]);
  function changed() { if (fallback) { setFallback(false); setTicket(""); widget.current = null; setMessage(""); } setResult(""); }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage(""); setResult("");
    if (!v3Key) { setMessage(m.forms.captchaUnavailable); return; }
    const form = new FormData(event.currentTarget);
    const listing = { name: String(form.get("name") || ""), type: String(form.get("type") || ""), place: String(form.get("place") || ""), scale: String(form.get("scale") || ""), preference: String(form.get("preference") || ""), contact: String(form.get("contact") || ""), description: String(form.get("description") || ""), permission: form.get("permission") === "on" };
    if (!listing.name.trim() || !listing.place.trim() || !listing.contact.trim() || !listing.description.trim() || !listing.permission) { setMessage(m.forms.required); return; }
    setBusy(true);
    try {
      const captcha = await loadCaptcha();
      const token = fallback && widget.current !== null ? captcha.getResponse(widget.current) : await captcha.execute(v3Key, { action: "listing" });
      if (!token) { setMessage(m.forms.fallback); return; }
      const response = await fetch("/api/listing", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ listing, token, version: fallback ? "v2" : "v3", ticket }) });
      const data: { fallback?: boolean; ticket?: string; url?: string; error?: string } = await response.json();
      if (data.fallback && data.ticket) { setTicket(data.ticket); setFallback(true); setMessage(m.forms.fallback); }
      else if (response.ok && data.url) { setResult(data.url); setMessage(""); setFallback(false); try { localStorage.setItem(draftKey, "prepared"); } catch { /* Storage is optional. */ } }
      else { setMessage(data.error === "unavailable" ? m.forms.captchaUnavailable : m.forms.captchaError); if (fallback && widget.current !== null) captcha.reset(widget.current); }
    } catch { setMessage(m.forms.captchaError); } finally { setBusy(false); }
  }
  return <form className="listing-form" onSubmit={submit} onChange={changed}>
    {!v3Key && <p className="form-message error">{m.forms.captchaUnavailable} <a href={whatsappLink()} target="_blank" rel="noreferrer">{m.common.whatsapp}</a></p>}
    <div className="form-grid">
      <div className="field"><label htmlFor="name">{m.forms.name} *</label><input id="name" name="name" maxLength={100} placeholder={m.forms.namePlaceholder} required/></div>
      <div className="field"><label htmlFor="type">{m.forms.type} *</label><select id="type" name="type" defaultValue="keeper"><option value="keeper">{m.forms.keeper}</option><option value="coop">{m.forms.coop}</option></select></div>
      <div className="field"><label htmlFor="place">{m.forms.place} *</label><input id="place" name="place" maxLength={100} placeholder={m.forms.placePlaceholder} required/></div>
      <div className="field"><label htmlFor="scale">{m.forms.scale}</label><input id="scale" name="scale" inputMode="numeric" maxLength={30}/></div>
      <div className="field"><label htmlFor="preference">{m.forms.preference} *</label><select id="preference" name="preference" defaultValue="whatsapp"><option value="whatsapp">{m.forms.whatsapp}</option><option value="phone">{m.forms.phone}</option><option value="email">{m.forms.email}</option><option value="website">{m.forms.website}</option></select></div>
      <div className="field"><label htmlFor="contact">{m.forms.contactValue} *</label><input id="contact" name="contact" maxLength={160} placeholder={m.forms.contactPlaceholder} required/></div>
      <div className="field full"><label htmlFor="description">{m.forms.description} *</label><textarea id="description" name="description" maxLength={1200} placeholder={m.forms.descriptionPlaceholder} required/></div>
      <div className="full"><label className="checkbox-label"><input name="permission" type="checkbox" required/><span>{m.forms.permission} *</span></label></div>
    </div>
    <p className="form-help">{m.forms.privacy}</p>
    {fallback && <div ref={captchaElement} aria-label={m.forms.fallback}/>}
    {message && <p className="form-message error" role="alert">{message} <a href={whatsappLink()} target="_blank" rel="noreferrer">{m.common.whatsapp}</a></p>}
    {result && <div className="form-message success" role="status"><p>{m.forms.ready}</p><a className="boxed-btn3" href={result} target="_blank" rel="noreferrer">{m.forms.openWhatsapp}</a></div>}
    <div className="form-actions"><button className="boxed-btn3" type="submit" disabled={busy || !v3Key}>{busy ? m.forms.working : m.forms.submit}</button></div>
  </form>;
}
