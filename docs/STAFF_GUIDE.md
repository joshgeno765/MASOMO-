# Staff Guide — Using the Admin CRM

This is a walkthrough of the admin portal at **masomonow.com/admin** for anyone on the team handling inquiries and consultations day to day.

## Logging In

Go to **masomonow.com/login**. This page isn't linked anywhere on the public site on purpose — bookmark it. Enter your email and password and you'll land on the Dashboard.

If you don't have an account yet, an Admin needs to create one for you from the Team page (see below).

## The Sidebar

Once logged in, four sections are available on the left:

- **Dashboard** — a quick snapshot
- **Leads** — everyone who's inquired through the site
- **Consultations** — everyone who's booked a consultation call
- **Team** — who has login access

Your email is shown at the bottom of the sidebar, with a **Sign out** link below it.

## Dashboard

A one-glance summary: total inquiries, how many are brand new, how many have a consultation scheduled, and how many have converted. Below that, a pipeline breakdown and the 6 most recent leads. Click "View all" on either panel to jump to the full Leads page.

## Leads

Every inquiry submitted through the website's contact/consultation forms lands here as a **lead**, moving through a pipeline:

`New → Contacted → Consultation Scheduled → Application Started → Converted` (or `Closed` if it doesn't go anywhere)

**To work a lead:**
1. Use the tabs at the top to filter by stage, or the search box to find someone by name, email, or phone.
2. Click **Open** on any row to see their full details — country, destination interest, their original message, when they submitted.
3. Update their **Status** as they move through the pipeline, and add **Notes** for anything another team member should know (what you discussed on a call, what documents they still owe, etc.).
4. Click **Save**. Notes and status are shared across the team — anyone who opens that lead next sees what you wrote.

## Consultations

Every booked consultation call shows up here, with its own pipeline: `Scheduled → Confirmed → Completed` (or `Cancelled` / `No Show`).

Opening a consultation shows the same kind of detail as a lead — plus a **WhatsApp** quick-link that opens a chat directly with that person's number, and the original inquiry message that led to the booking (if there is one).

Update the status and notes the same way as Leads — e.g. mark a call **Confirmed** once you've spoken to them to lock in the time, **Completed** after it happens, or **No Show** if they don't join.

## Team

This is where login accounts are managed — who can access `/admin` at all.

**To add someone to the team:**
1. Click **+ Add Account**.
2. Enter their email, a password (8+ characters — share it with them securely, e.g. in person or over a call, not by email), and pick their role (**Counselor** or **Admin**).
3. Click **Create Account**. They can log in immediately with what you set.

**Admin vs. Counselor:** Admin can manage Team accounts (create/deactivate logins); both roles can work Leads and Consultations the same way.

**Removing access:** there's no delete — use **Deactivate** next to their name. A deactivated account can no longer log in, but its history (notes, status changes) stays intact. Reactivate the same way if they come back.

**Note:** the very first account (`admin@masomonow.com`) was created automatically when the site was set up, with a password that's been sitting in the project's source code. See `docs/LAUNCH_CHECKLIST.md` item 2 — create yourself a personal account and deactivate that default one before treating this as fully launched.
