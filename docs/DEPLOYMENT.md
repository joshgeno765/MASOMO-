# Deployment & Architecture

## How the pieces fit together

```
GoDaddy (domain registrar)
    │  DNS for masomonow.com → Netlify
    ▼
Netlify  ──serves──  frontend/  (React + Vite static build)
    │
    │  every API call from the browser goes to
    ▼
Railway  ──runs──  backend/  (Express + Prisma)
    │
    ▼
SQLite database file (must live on a persistent Railway volume — see docs/LAUNCH_CHECKLIST.md #1)
```

- **Frontend**: `frontend/` — React 18 + TypeScript + Vite, built to static files and served by Netlify. Build config lives in `netlify.toml` (repo root): `base = "frontend"`, `command = "npm run build"`, `publish = "dist"`.
- **Backend**: `backend/` — Express + TypeScript + Prisma, run as a long-lived Node process on Railway. Build/deploy config lives in `backend/railway.json`.
- **Database**: SQLite (`backend/prisma/schema.prisma`). A single file — fine for this scale, but the file's location on Railway matters (see checklist).

## Deploying

There is no manual deploy step. Pushing to `main` on GitHub triggers:
- **Netlify**: rebuilds and republishes the frontend automatically.
- **Railway**: runs `npm install && npm run build`, then on start runs `npx prisma migrate deploy && node dist/index.js` — so any pending Prisma migrations are applied automatically before the server starts.

Both platforms are watching the same GitHub repo/branch — one `git push` updates both.

## Live URLs

| | |
|---|---|
| Frontend | https://masomonow.com and https://www.masomonow.com (Netlify) |
| Backend API | https://masomo-production.up.railway.app (Railway) |

The frontend calls the API directly at the Railway URL (`frontend/.env.production` → `VITE_API_URL`) — there's no custom `api.masomonow.com` subdomain today (optional, not required — see checklist).

## Environment Variables

### `backend/.env` (see `backend/.env.example`)

| Variable | Purpose | Notes |
|---|---|---|
| `DATABASE_URL` | Path to the SQLite file | Local dev: `file:./dev.db` or similar. Production: must point at a path on a persistent Railway volume. |
| `PORT` | Port the Express server listens on | Railway sets this automatically in production. |
| `NODE_ENV` | `development` or `production` | |
| `FRONTEND_URL` | Extra allowed CORS origin | The allowed-origins list is actually hardcoded in `backend/src/index.ts` (`localhost:5173`, `masomojoshua.netlify.app`, `masomonow.com`, `www.masomonow.com`) plus whatever `FRONTEND_URL` adds — update that array directly if a new frontend origin is ever needed. |
| `JWT_SECRET` / `JWT_REFRESH_SECRET` | Sign staff login tokens | Must be long, random, and kept secret — never reuse the example placeholder values in production. |
| `RESEND_API_KEY` | **Actually required for email** | The backend uses [Resend](https://resend.com) (`backend/src/lib/email.ts`) for lead/consultation notification emails, not the `SMTP_*` variables. Without this set, emails silently no-op (`if (!process.env.RESEND_API_KEY) return`) — no crash, but no notification either. |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | Unused | Leftover from an earlier plan to use Nodemailer/SMTP. Safe to ignore or remove from `.env.example` — not read anywhere in `backend/src`. |

### `frontend/.env` (see `frontend/.env.example`)

| Variable | Purpose |
|---|---|
| `VITE_API_URL` | Base URL the frontend calls for all API requests. Local dev: `http://localhost:5000`. Production (`frontend/.env.production`): the Railway URL above. |

## CORS

`backend/src/index.ts` whitelists specific origins by exact string match (not a wildcard):

```
localhost:5173, masomojoshua.netlify.app, masomonow.com, www.masomonow.com, + FRONTEND_URL env var
```

If the site is ever served from another domain/subdomain, add it to the `allowedOrigins` array here — setting `FRONTEND_URL` alone only adds one more origin, it doesn't replace the hardcoded list.

## Content Security Policy

`netlify.toml` sets a strict CSP on every response. The one line that's coupled to the backend's URL:

```
connect-src 'self' https://masomo-production.up.railway.app;
```

If the backend ever moves to a different Railway URL or a custom `api.masomonow.com` subdomain, this line must be updated too, or the browser will block all API calls from the deployed frontend (CORS passing on the server side isn't enough — the browser enforces CSP independently).

## Database

SQLite via Prisma. Schema: `backend/prisma/schema.prisma`. Models: `User` (auth + roles), `Lead` (CRM inbox), `Appointment` (consultation bookings), plus `Student`/`Counselor`/`Application`/`Notification`/`AuditLog` for future phases.

- **Migrations**: `npx prisma migrate dev` (local) / `npx prisma migrate deploy` (runs automatically on Railway deploy — see `backend/railway.json`).
- **Seeding**: `npm run db:seed` (`backend/prisma/seed.js`) creates the initial admin account. Only needed once per environment — re-running is safe (it upserts, doesn't duplicate).
- **Backups**: not currently automated. Since it's a single SQLite file, the simplest backup is periodically copying that file off the Railway volume. Worth setting up before real student data accumulates.
