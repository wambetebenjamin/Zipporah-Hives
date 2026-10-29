# Zipporah Hives

Sweet work. Shared hives.

An independent directory and practical learning resource for African beekeepers, honey cooperatives and pollinator-friendly practices. The Next.js application ports the supplied Colorlib Anipat template: its original Bootstrap and theme styles, Poppins and Open Sans typefaces, component classes, spacing and animations are retained under `public/template`. Colour tokens in `public/site.css` map to the original palette; additions cover page content, accessible controls and responsive behaviour. Colorlib attribution is retained in the footer. The original stylesheet remains unchanged as `style.css`; `style-local.css` removes only its duplicate Google Fonts imports so the same typefaces can be served locally.

## Local setup

1. Install Node 24 and run `nvm use`.
2. Run `npm ci`.
3. Copy `.env.example` to `.env.local` and fill in any integrations you intend to enable.
4. Run `npm run dev` and visit the local development URL.
5. Run `npm run lint`, `npm run typecheck`, `npm run build` and `npm audit --audit-level=high` before deploying.

The requested NextAuth beta declares a peer dependency on Next 14 and 15, not Next 16. `.npmrc` uses `legacy-peer-deps` to allow the explicitly requested combination. The `@auth/core` override applies the patched core release, but the pinned NextAuth package itself is still reported as critically vulnerable by `npm audit`. The requested audit gate therefore does not pass. Do not enable production sign-in until the dependency is upgraded to a patched release and the audit and OAuth flow are retested.

## Configuration

- `NEXT_PUBLIC_WHATSAPP_NUMBER` defaults to `254112272061`. Use digits only, including country code.
- The `en`, `sw` and `fr` message dictionaries live in `lib/i18n.ts`. A necessary language cookie preserves the user's choice. Add a locale in `lib/locale.ts` and its translated messages and content to extend the site.
- Google OAuth is optional. Set `AUTH_SECRET` to a long random secret, `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET`. Register `https://YOUR_DOMAIN/api/auth/callback/google` with the provider, and set `NEXTAUTH_URL` when needed. `NEXTAUTH_SECRET` is accepted as an alternative to `AUTH_SECRET`. Until configured, account sign-in is disabled safely.
- For the listing form, create separate reCAPTCHA v3 and v2 checkbox keys for the deployment host. Set `NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY`, `RECAPTCHA_V3_SECRET_KEY`, `NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY` and `RECAPTCHA_V2_SECRET_KEY`. The server checks the v3 action, hostname and score; a score below 0.5 requires a v2 challenge bound to the same draft. Without keys, the form is disabled and visitors can contact the site on WhatsApp. Public keys are compiled at build time, so redeploy after changing them.
- A successful form check prepares a WhatsApp draft. The visitor must open WhatsApp, review and send it. The site does not receive or store the request and does not claim it was sent or reviewed. Saved keepers and draft indicators use browser storage and do not sync between devices, even when signed in.
- Cookie choice uses `zipporah-hives-cookie-consent`. No analytics are installed. reCAPTCHA is loaded only when the protected form is submitted.

Do not commit `.env.local` or secrets. Configure secrets in the Vercel project settings.

## Content and credits

Public directory entries are sourced from the organisations' public pages, not represented as verified members. Confirm information and contact details before making arrangements. Illustrative images are free Pexels photographs; see `image-credits.md` for photographers, sources and alt text. The four current photographs include low-resolution search previews, and the beekeeper photographs have not been verified as African. They do not represent the organisations or regions pictured in the directory. The site is not a buyer, certifier, insurer or veterinary service, and visitors handle their own transactions and hive health.

## Accessibility and validation

A Chromium check covered 14 pages at 320, 375, 768, 1024 and 1440 pixels in English, Swahili and French, with no horizontal overflow or undersized visible controls in those states. Mobile navigation, the filter sheet, saved keepers and language switching were exercised. The reCAPTCHA route was tested with mocked verification, not live Google keys. These checks are not a complete accessibility audit.

Automated axe checks on the homepage, directory, join and account pages found WCAG AA colour-contrast failures with the preserved default template palette. A higher-contrast variant is provided for the browser or operating system `prefers-contrast: more` setting; those four pages had no automated WCAG A/AA violations in that mode. A compliant default palette requires an approved change to the original design colours.

## Deployment

The included `vercel.json` requests the `cdg1` region and security headers. Import the Git repository as a Next.js project, choose Node 24, configure the environment variables in Vercel, and deploy. Configure Google OAuth and both reCAPTCHA keys for the final hostname before expecting account sign-in or protected listing drafts to work.
