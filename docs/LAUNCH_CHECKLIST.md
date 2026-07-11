# Launch Checklist

Status of masomonow.com going from "built" to "officially launched." Ordered by risk — do the top items first.

## 1. Confirm the database survives a redeploy (critical — data loss risk)

The backend uses SQLite (`backend/prisma/schema.prisma`, `provider = "sqlite"`). SQLite is a single file on disk. Railway's default container filesystem is **ephemeral** — it's wiped on every redeploy unless the `DATABASE_URL` file path is on a **persistent volume**.

**Action:** In the Railway dashboard, open the backend service → Settings → Volumes, and confirm a volume is mounted at the path your `DATABASE_URL` points to (e.g. `file:/data/prod.db`). If there's no volume, every future `git push` that triggers a redeploy will silently delete every lead, consultation, and user account collected so far.

This can't be verified from the repo — it's Railway dashboard configuration only.

## 2. Rotate the admin password

`backend/prisma/seed.ts` creates `admin@masomonow.com` with a hardcoded password, committed in plain text to git history. Anyone with read access to the repo can see it.

**Action** (no code change needed, ~2 minutes):
1. Log in at `/login` with the seed credentials.
2. Go to Admin → Users, create a personal ADMIN account with a strong password only you know.
3. Use the existing active/inactive toggle to deactivate `admin@masomonow.com`.

## 3. Remove the unauthenticated debug endpoint — done

`GET /debug` on the backend returned the admin account's id/email/role/status to any unauthenticated visitor. Confirmed live and responding before this fix. Removed in `backend/src/index.ts` as part of this launch pass — no further action needed.

## 4. Fix stale/missing environment variable documentation

- `backend/.env.example`'s `DATABASE_URL` example still shows a `mysql://` connection string; production is SQLite. Fixed in the rewritten `.env.example` reference in `docs/DEPLOYMENT.md` — update the actual `.env.example` file to match if you want the example to stop being misleading.
- The `resend` package is the actual email provider used in code (`backend/src/lib/email.ts`), but `RESEND_API_KEY` isn't listed in `.env.example` — the `SMTP_*` variables that are there are unused leftovers. Confirm `RESEND_API_KEY` is set in Railway's environment variables.

## 5. Email notification links pointed at the wrong domain — done

Every "View in Dashboard" link in the three lead/consultation notification emails (`backend/src/lib/email.ts`) hardcoded the old `masomojoshua.netlify.app` subdomain instead of the live `masomonow.com` domain. Fixed as part of this launch pass — staff clicking the link from an email notification now land on the real domain.

## 6. Optional polish (not required to launch)

- **Custom API subdomain**: the frontend currently calls the raw Railway URL (`masomo-production.up.railway.app`) directly. Pointing `api.masomonow.com` at Railway is cosmetic — only worth doing if you want to stop exposing the Railway hostname.
- **SEO basics**: `robots.txt` and `sitemap.xml` already exist in `frontend/public/` — no action needed.
- **Analytics**: intentionally not adding any. The Privacy Policy page states the site runs no analytics or tracking cookies — adding Google Analytics or similar would contradict a commitment already published to visitors.

## 7. Final pass before telling the client it's live

- Click through the real site end-to-end on masomonow.com (not just localhost/tests): submit a test lead, book a test consultation, confirm the email notification arrives, log into `/admin` and confirm the new lead/consultation shows up.
- Confirm `www.masomonow.com` and `masomonow.com` both resolve correctly (both already verified live as of this checklist).
- Send the client the Launch Summary document once items 1–2 and 4 above are confirmed done.
