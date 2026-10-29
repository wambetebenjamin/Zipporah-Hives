import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const authConfigured = Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET && (process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET));
export const { handlers, auth } = NextAuth({
  providers: authConfigured ? [Google({ clientId: process.env.AUTH_GOOGLE_ID!, clientSecret: process.env.AUTH_GOOGLE_SECRET! })] : [],
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/account" },
});
