import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { whatsappLink } from "@/lib/links";

export const runtime = "nodejs";
type Listing = { name: string; type: string; place: string; scale: string; preference: string; contact: string; description: string; permission: boolean };
type Verification = { success?: boolean; score?: number; action?: string; hostname?: string };
function listingFrom(value: unknown): Listing | null {
  if (!value || typeof value !== "object") return null;
  const input = value as Record<string, unknown>;
  const string = (key: string, max: number) => typeof input[key] === "string" ? (input[key] as string).trim().slice(0, max) : "";
  const result: Listing = { name: string("name", 100), type: string("type", 40), place: string("place", 100), scale: string("scale", 30), preference: string("preference", 40), contact: string("contact", 160), description: string("description", 1200), permission: input.permission === true };
  if (!result.name || !result.place || !result.contact || !result.description || !result.permission || !["keeper", "coop"].includes(result.type) || !["whatsapp", "phone", "email", "website"].includes(result.preference)) return null;
  return result;
}
function digest(listing: Listing) { return createHash("sha256").update(JSON.stringify(listing)).digest("hex"); }
function signature(payload: string, secret: string) { return createHmac("sha256", secret).update(payload).digest("base64url"); }
function ticketFor(listing: Listing, secret: string) {
  const payload = Buffer.from(JSON.stringify({ digest: digest(listing), expires: Date.now() + 5 * 60_000 })).toString("base64url");
  return `${payload}.${signature(payload, secret)}`;
}
function validTicket(ticket: unknown, listing: Listing, secret: string) {
  if (typeof ticket !== "string" || ticket.length > 1000) return false;
  const [payload, signed, extra] = ticket.split("."); if (!payload || !signed || extra) return false;
  const a = Buffer.from(signed); const b = Buffer.from(signature(payload, secret));
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  try { const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as { digest?: string; expires?: number }; return data.digest === digest(listing) && typeof data.expires === "number" && data.expires > Date.now(); } catch { return false; }
}
async function verify(token: string, secret: string): Promise<Verification> {
  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", { method: "POST", body: new URLSearchParams({ secret, response: token }), cache: "no-store", signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error("reCAPTCHA verification failed");
  return await response.json() as Verification;
}
export async function POST(request: NextRequest) {
  const v3Secret = process.env.RECAPTCHA_V3_SECRET_KEY;
  if (!v3Secret || !process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  try {
    const body = await request.json() as { listing?: unknown; token?: unknown; version?: unknown; ticket?: unknown };
    const listing = listingFrom(body.listing);
    if (!listing || typeof body.token !== "string" || body.token.length < 10 || body.token.length > 8192) return NextResponse.json({ error: "invalid" }, { status: 400 });
    const host = (request.headers.get("host") || "").split(":")[0].toLowerCase();
    if (body.version === "v3") {
      const result = await verify(body.token, v3Secret);
      if (!result.success || result.action !== "listing" || result.hostname?.toLowerCase() !== host || typeof result.score !== "number") return NextResponse.json({ error: "verification" }, { status: 400 });
      if (result.score < 0.5) {
        if (!process.env.RECAPTCHA_V2_SECRET_KEY || !process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY) return NextResponse.json({ error: "unavailable" }, { status: 503 });
        return NextResponse.json({ fallback: true, ticket: ticketFor(listing, v3Secret) });
      }
    } else if (body.version === "v2") {
      if (!validTicket(body.ticket, listing, v3Secret) || !process.env.RECAPTCHA_V2_SECRET_KEY) return NextResponse.json({ error: "verification" }, { status: 400 });
      const result = await verify(body.token, process.env.RECAPTCHA_V2_SECRET_KEY);
      if (!result.success || result.hostname?.toLowerCase() !== host) return NextResponse.json({ error: "verification" }, { status: 400 });
    } else return NextResponse.json({ error: "invalid" }, { status: 400 });
    const message = ["Hello Zipporah Hives, I would like to request a directory listing.", `Name: ${listing.name}`, `Type: ${listing.type === "coop" ? "Cooperative or association" : "Keeper or apiary"}`, `Country and region: ${listing.place}`, listing.scale ? `Number of hives: ${listing.scale}` : "", `Preferred contact: ${listing.preference}`, `Contact details: ${listing.contact}`, `About our work: ${listing.description}`, "I have permission to share these details."].filter(Boolean).join("\n");
    return NextResponse.json({ url: whatsappLink(message) }, { headers: { "Cache-Control": "no-store" } });
  } catch { return NextResponse.json({ error: "verification" }, { status: 503 }); }
}
