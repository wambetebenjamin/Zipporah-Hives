"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import Lenis from "lenis";
import { Icon } from "@/components/Icons";
import { whatsappLink } from "@/lib/links";
import type { Messages } from "@/lib/i18n";

const consentKey = "zipporah-hives-cookie-consent";

export function Experience({ m }: { m: Messages }) {
  const [consent, setConsent] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [voiceError, setVoiceError] = useState(false);
  useEffect(() => { setConsent(Boolean(Cookies.get(consentKey))); }, []);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const lenis = new Lenis({ duration: 1.2, touchMultiplier: 2, smoothWheel: true });
    let frame = 0;
    const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(frame); lenis.destroy(); };
  }, []);
  useEffect(() => () => { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); }, []);
  function chooseConsent(value: "accepted" | "declined") {
    Cookies.set(consentKey, value, { expires: 365, sameSite: "lax", secure: location.protocol === "https:" });
    setConsent(true);
  }
  function playVoice() {
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) { setVoiceError(true); return; }
    if (speaking) { window.speechSynthesis.cancel(); setSpeaking(false); return; }
    const utterance = new SpeechSynthesisUtterance(m.global.voiceText);
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.find((voice) => voice.lang.toLowerCase() === "en-ke") || voices.find((voice) => voice.lang.toLowerCase().startsWith("en-")) || null;
    utterance.lang = "en-KE"; utterance.rate = 0.95; utterance.pitch = 1.1;
    utterance.onend = () => setSpeaking(false); utterance.onerror = () => { setSpeaking(false); setVoiceError(true); };
    setVoiceError(false); setSpeaking(true); window.speechSynthesis.speak(utterance);
  }
  return <>
    <button className="floating-action floating-voice" type="button" onClick={playVoice} aria-label={speaking ? m.global.stopVoice : m.global.voice} aria-pressed={speaking}><Icon name={speaking ? "stop" : "sound"} size={25}/></button>
    <a className="floating-action floating-whatsapp" href={whatsappLink()} aria-label={m.common.whatsapp} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={28}/></a>
    {voiceError && <p className="voice-error" role="status">{m.global.voiceUnavailable}</p>}
    {!consent && <section className="cookie-banner" role="region" aria-label={m.global.cookieTitle}><div><h2>{m.global.cookieTitle}</h2><p>{m.global.cookieText} <Link href="/privacy">{m.global.cookiePrivacy}</Link></p></div><div className="cookie-actions"><button type="button" className="boxed-btn3" onClick={() => chooseConsent("accepted")}>{m.global.accept}</button><button type="button" className="cookie-decline" onClick={() => chooseConsent("declined")}>{m.global.decline}</button></div></section>}
  </>;
}
