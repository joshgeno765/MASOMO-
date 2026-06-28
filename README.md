# Masomo Now — Student Management Platform
## Phase 1: Website + CRM

Built by Joshua Geno | Deadline: July 15, 2026

---

## Project Structure

```
masomo-now/
├── frontend/          # React 18 + TypeScript + Tailwind CSS
├── backend/           # Node.js + Express + TypeScript
└── README.md
```

---

## Quick Start

### 1. Prerequisites
Make sure you have installed:
- Node.js v18+ → https://nodejs.org
- MySQL 8 → https://dev.mysql.com/downloads/
- Git → https://git-scm.com

### 2. Clone & Install

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 3. Set Up the Database

Open MySQL and run:
```sql
CREATE DATABASE masomo_now;
CREATE USER 'masomo'@'localhost' IDENTIFIED BY 'yourpassword';
GRANT ALL PRIVILEGES ON masomo_now.* TO 'masomo'@'localhost';
FLUSH PRIVILEGES;
```

### 4. Configure Environment Variables

**Backend** — copy and edit:
```bash
cd backend
cp .env.example .env
# Edit .env with your MySQL credentials
```

**Frontend** — copy and edit:
```bash
cd frontend
cp .env.example .env
```

### 5. Run Database Migrations

```bash
cd backend
npx prisma migrate dev --name init
npx prisma db seed
```

### 6. Start Development Servers

Open two terminals:

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

Open http://localhost:5173 in your browser. Done!

---

## Week 1 Pages Built
- `/` — Home Page
- `/about` — About Page  
- `/contact` — Contact Page (wired to backend)

## API Endpoints (Week 1)
- `POST /api/leads` — Submit inquiry from contact form
- `GET /api/leads` — List all leads (admin only)
- `GET /health` — Health check

---

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Tailwind CSS, React Router v6 |
| Backend | Node.js, Express, TypeScript |
| Database | MySQL 8, Prisma ORM |
| Auth | JWT (Week 3) |
| Email | Nodemailer (Week 2) |
| Hosting | DigitalOcean |
