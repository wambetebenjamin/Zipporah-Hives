"use client";
import { signIn, signOut } from "next-auth/react";
import type { Messages } from "@/lib/i18n";
export function AuthActions({ configured, user, m }: { configured: boolean; user: string | null; m: Messages }) {
  if (!configured) return <p className="form-message">{m.account.unavailable}</p>;
  return <div className="auth-actions">{user ? <><p>{m.account.signedIn} {user}</p><button className="boxed-btn3" onClick={() => signOut({ redirectTo: "/account" })}>{m.account.signOut}</button></> : <button className="boxed-btn3" onClick={() => signIn("google", { redirectTo: "/account" })}>{m.account.signIn}</button>}</div>;
}
