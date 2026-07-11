# Masomo Now — Student Management Platform

International education consultancy site + admin CRM for **Masomo Now**, the francophone-Africa division of ELIMU International Education Connections. Live at [masomonow.com](https://masomonow.com).

## Project Structure

```
masomo-now/
├── frontend/          # React 18 + TypeScript + Vite + Tailwind CSS — deployed to Netlify
├── backend/           # Node.js + Express + TypeScript + Prisma + SQLite — deployed to Railway
├── docs/
│   ├── DEPLOYMENT.md       # architecture, env vars, redeploy process
│   ├── STAFF_GUIDE.md      # how to use the admin CRM
│   └── LAUNCH_CHECKLIST.md # go-live readiness checklist
└── README.md
```

## Live Site

| | |
|---|---|
| Public site | https://masomonow.com (Netlify) |
| Staff login | https://masomonow.com/login |
| API | https://masomo-production.up.railway.app (Railway) |

Pushing to `main` triggers an automatic redeploy on both Netlify and Railway — there's no manual deploy step. See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for details.

## Public Routes

`/`, `/about`, `/destinations`, `/fmc-pilot`, `/pathway-finder`, `/services`, `/consultation`, `/privacy`, `/terms`

## Admin Routes (require login)

`/admin` (dashboard), `/admin/leads`, `/admin/consultations`, `/admin/users`

See [`docs/STAFF_GUIDE.md`](docs/STAFF_GUIDE.md) for how to use these.

## Local Development

### 1. Prerequisites
- Node.js v18+
- Git

No external database server is needed — the backend uses SQLite, which is just a file on disk.

### 2. Install dependencies

```bash
cd frontend && npm install
cd ../backend && npm install
```

### 3. Configure environment variables

```bash
cd backend && cp .env.example .env
cd ../frontend && cp .env.example .env
```

Defaults in `.env.example` work out of the box for local dev (SQLite file, `localhost` URLs). See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for what each variable does.

### 4. Set up the database

```bash
cd backend
npx prisma migrate dev
npm run db:seed
```

This creates `admin@masomonow.com` as a seed admin account (see `backend/prisma/seed.ts` for the password — rotate it after first login in any real deployment).

### 5. Run both dev servers

```bash
# Terminal 1
cd backend && npm run dev   # http://localhost:5000

# Terminal 2
cd frontend && npm run dev  # http://localhost:5173
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Tailwind CSS, React Router v6, Vite |
| Backend | Node.js, Express, TypeScript |
| Database | SQLite, Prisma ORM |
| Auth | JWT |
| Email | Resend / Nodemailer (lead + consultation notifications) |
| Hosting | Netlify (frontend), Railway (backend) |
| Domain | GoDaddy (registrar) → Netlify (DNS) |
