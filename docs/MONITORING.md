# Monitoring Setup

Both Sentry (error tracking) and UptimeRobot (uptime alerts) are free-tier. The code side is already done and wired to sit inert until you add the keys below — this doc is the remaining account-creation steps.

## Sentry (error tracking)

The SDK is installed and initialized in both apps, gated on an env var that isn't set yet — so nothing changes in production until you complete this.

1. Create a free account at [sentry.io](https://sentry.io).
2. Create two projects: one **React** project (frontend), one **Node/Express** project (backend).
3. Each project's setup page shows a DSN (`https://...@...ingest.sentry.io/...`). Copy both.
4. Add them as environment variables:
   - **Netlify** (Site settings → Environment variables): `VITE_SENTRY_DSN` = the React project's DSN.
   - **Railway** (backend service → Variables): `SENTRY_DSN` = the Node project's DSN.
5. Redeploy both (push to `main`, or trigger a redeploy manually).
6. Confirm it's live: trigger a real error in each environment and check it shows up in the Sentry dashboard within a minute or two — e.g. temporarily visit a broken admin action while logged in (frontend) or hit an endpoint with malformed input past validation (backend). Remove any test-only code after confirming.

**Where errors get reported from:**
- Frontend: `ErrorBoundary` (`frontend/src/components/ErrorBoundary.tsx`) reports any uncaught render error except the self-healing "stale deploy chunk" case, which just reloads instead.
- Backend: `Sentry.setupExpressErrorHandler` in `backend/src/index.ts` catches anything that reaches Express's error-handling middleware.

## UptimeRobot (uptime alerts)

No code needed — this is purely dashboard configuration.

1. Create a free account at [uptimerobot.com](https://uptimerobot.com) (50 monitors free, 5-minute checks).
2. Add a monitor for the frontend: type **HTTP(s)**, URL `https://masomonow.com`.
3. Add a second monitor for the backend: type **HTTP(s)**, URL `https://masomo-production.up.railway.app/health` (the existing `/health` route already returns a 200 with no auth needed — built for exactly this).
4. Set alert contacts to your email (and optionally SMS/Slack on the free tier's limits) under My Settings → Alert Contacts.
5. Optional: set the check interval to 5 minutes (free tier default) and enable the public status page if you ever want to share uptime with the client.

That's it — from here, both tools run themselves. Revisit this doc only if the DSNs rotate or a new environment (e.g. a staging Railway service) needs its own monitor.
