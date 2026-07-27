# Release Checklist

Reusable pre-release checklist — run through this before merging any significant feature to `main`, and in full before a major public launch push. Trimmed down from [thedaviddias/Front-End-Checklist](https://github.com/thedaviddias/Front-End-Checklist) to what's actually relevant to this stack (React/Vite/Tailwind + i18n frontend on Netlify, Express/Prisma/Postgres backend on Railway).

This is a living checklist, not a one-time record — unlike `docs/LAUNCH_CHECKLIST.md`, which documents a specific past launch pass and its fixes.

## 1. Head & meta
- [ ] Every new/changed page sets a unique title + description via `usePageMeta` (already standard site-wide as of the 2026-07-26 SEO metadata fix — keep it up for new pages)
- [ ] New routes added to `frontend/public/sitemap.xml`

## 2. i18n (EN/FR)
- [ ] New copy exists in both `frontend/src/i18n/locales/en/*.json` and `/fr/*.json`
- [ ] Native-speaker review done for new French copy — especially legal/compliance pages (Privacy, Terms)
- [ ] Exact IELTS/TEF/TCF score thresholds stay English-only in both locales (deliberate, compliance-sensitive — not a translation gap)
- [ ] Language toggle still works on every new/changed page

## 3. Accessibility
- [ ] Run WAVE or axe DevTools on new/changed pages — aim for 0 errors
- [ ] All images have meaningful `alt` text
- [ ] Keyboard-only pass: tab through the nav, any new form, and (if touched) the pathway finder quiz and chat widget
- [ ] Color contrast holds, especially gray-400/500 text on white backgrounds

## 4. Performance
- [ ] Run Lighthouse (mobile + desktop) on Home, Consultation, Pathway Finder, and any new page — screenshot the scores for the client report
- [ ] New images run through `sharp`/compressed and served as `.webp` where possible
- [ ] New routes are lazy-loaded in `App.tsx` (`lazy(() => import(...))`), not bundled into the main chunk

**Baseline scores, mobile Lighthouse against the live site (2026-07-26):**

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Home (`/`) | 71 | 94 | 100 | 92 |
| Consultation (`/consultation`) | 69 | 81 | 100 | 92 |

Not yet fixed — worth a follow-up pass, not required to launch:
- **Accessibility, site-wide**: `heading-order` (a heading level is skipped somewhere), `color-contrast` (a few low-opacity text elements — e.g. `text-navy/40`, `text-white/30` — fall under the minimum ratio), `label-content-name-mismatch` on the mobile menu toggle button.
- **Accessibility, Consultation page specifically** (lower score than Home): the `country`/`destinationInterest` `<select>` elements and the `FloatingField` text inputs (`frontend/src/components/ui/FloatingField.tsx`) have no programmatic label association — the visual `<label>` isn't wired via `htmlFor`/`id`, so screen readers can't reliably announce what each field is. Worth fixing by giving `FloatingField` an `id` prop and wiring `htmlFor`, and adding a visually-associated label (or `aria-label`) to the two selects.
- **Performance**: Largest Contentful Paint is the biggest drag on both pages (`largest-contentful-paint` scored 0.63 on Home, 0.38 on Consultation), measured under Lighthouse's mobile emulation. Both use the same `PhotoHero` component's hero image, already `.webp` (`frontend/public/images/seminars/seminar-2.webp`, 1400×933, 239KB) — but it's served at that same full size to every viewport. A `-thumb.webp` variant already exists in that folder (32KB) that could be wired up as the mobile source via `srcset`/`<picture>`, which would meaningfully help mobile LCP without touching desktop.

## 5. Security
- [ ] Every new API endpoint validates input with Zod server-side (existing pattern — keep it)
- [ ] `npm audit` clean, or new findings match the accepted list below
- [ ] No secrets committed — check `git status`/diff before pushing, especially `.env` files
- [ ] `express-rate-limit` still covers any new public-facing endpoint (currently applied to all of `/api`)
- [ ] `backend/src/index.ts`'s CORS `allowedOrigins` updated if a new frontend domain is added

**Known accepted `npm audit` findings (as of 2026-07-26):**
- Frontend: `vite`/`react-router-dom` moderate/high findings are dev-server-only (path traversal in the Vite dev server, not the static Netlify build) — fixing requires a major-version bump, deferred until a planned upgrade.
- Backend: `ts-node-dev`'s transitive `rimraf`→`glob`→`minimatch`→`brace-expansion` chain (high, DoS via glob expansion) is a dev-only tool dependency, not reachable from network input. `body-parser`'s DoS finding was fixed via `npm audit fix` (lockfile-only bump, already applied).

## 6. Testing
- [ ] `npm run test:e2e` green across Chromium/Firefox/WebKit (`frontend/e2e/`, added 2026-07-26 — covers nav smoke test, consultation booking, contact, login, pathway finder)
- [ ] Manually click through the actual Netlify deploy preview for the feature before merging (not just localhost)

## 7. Monitoring
- [ ] Sentry capturing errors on both frontend and backend once `VITE_SENTRY_DSN`/`SENTRY_DSN` are set — throw a test error after first setup to confirm delivery
- [ ] UptimeRobot monitor green on `masomonow.com` and the Railway API's `/health` endpoint
- [ ] Railway deploy logs / Netlify deploy log checked after deploy for startup errors

## 8. SEO
- [ ] Sitemap/robots.txt still accurate after any new-page or URL-structure change
- [ ] Re-submit sitemap in Google Search Console after a major structural change

## 9. Deploy
- [ ] All new env vars added to both Railway and Netlify dashboards (not just `.env.example`)
- [ ] Prisma migration created for any schema change — runs automatically via `railway.json`'s `prisma migrate deploy` on boot
- [ ] Confirm the target database is Railway's managed Postgres (the SQLite references in `docs/DEPLOYMENT.md` and `docs/LAUNCH_CHECKLIST.md` predate the migration — trust `backend/prisma/schema.prisma`'s `provider = "postgresql"` over those docs)

## 10. Client handoff
- [ ] Loom walkthrough recorded for any client-facing UI change
- [ ] `docs/STAFF_GUIDE.md` updated if an admin/staff workflow changed
