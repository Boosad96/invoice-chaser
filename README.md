# Invoice Chaser — production app for Cloudflare Workers

An invoice-chasing web app for freelancers and solo trades. Visitors sign up,
add invoices (manually or by CSV), and the app sends reminder emails
automatically at day 7 (polite), day 14 (firmer), and day 30 (final) after an
invoice is due. Marking an invoice paid pauses its whole sequence instantly.

**The app never processes payments and never touches money.** Reminders only
carry a pay link the user pasted themselves (their own Stripe/PayPal link).

## Stack

- Cloudflare Workers (JavaScript, no build step, no dependencies)
- D1 (SQLite) for users, invoices, reminders, templates, sent log
- Workers Cron Trigger for the daily job (09:00 UTC, 1 of 5 free triggers)
- Resend for email, via the `RESEND_API_KEY` Worker secret (never in this repo)

## Features

- Email/password signup and login (PBKDF2-hashed passwords, HttpOnly sessions)
- Invoice CRUD + CSV import (client, email, amount, due date)
- Automatic day 7 / 14 / 30 reminder sequence, editable plain-text templates
  with placeholders: `{{client}}`, `{{amount}}`, `{{due_date}}`,
  `{{pay_link}}`, `{{business_name}}`
- Idempotent sending: every reminder is claimed (`pending` → `sending`) before
  it is sent and recorded once, so a retried cron can never double-send
- Mark paid (auto-skips pending reminders), pause/resume, delete
- Dashboard: overdue / on-track / paid counts, chase queue, upcoming sends,
  sent log, templates editor, settings (business name, currency)
- Free plan: 3 active invoices, with upgrade prompts (Starter $19/month for 25,
  Pro $49/month for 100 — display only, no payment processing in v1)
- AdSense-ready public pages (home, how it works, pricing, sample templates,
  FAQ, about, contact, privacy). No ad code is included yet, and ads must
  never go on login, signup, settings, or private dashboard pages.

## Deploy — option A: Cloudflare dashboard + Git (no CLI needed)

1. Push this repo to GitHub (it is already the source of truth).
2. In the Cloudflare dashboard, create a D1 database named
   `invoice-chaser-db`, then apply the migration in `migrations/0001_init.sql`
   (dashboard → D1 → your database → Console → paste the file and run it).
3. Create a Worker (Workers & Pages → Create → Connect to Git), connect this
   repo, and set the build command to none (there is no build step).
4. In the Worker → Settings → Variables, add a D1 binding named `DB`
   pointing at `invoice-chaser-db`. If the deploy complains about the
   placeholder `database_id` in `wrangler.toml`, replace it with your real
   database id (dashboard → D1 → your database → Settings shows it).
5. In the Worker → Settings → Variables → Secrets, add `RESEND_API_KEY`
   (from your Resend dashboard). Optionally add `RESEND_FROM` once your own
   domain is verified in Resend, e.g. `Invoice Chaser <reminders@yourdomain.com>`.
6. Deploy. Your public link is `https://invoice-chaser.<your-subdomain>.workers.dev`.
   A custom domain can be attached free later (needed for AdSense and for
   Resend to email strangers — see below).

## Deploy — option B: wrangler CLI

```bash
npm install -g wrangler
wrangler login
wrangler d1 create invoice-chaser-db   # copy the database_id it prints
# paste the id into wrangler.toml, replacing the placeholder
wrangler d1 migrations apply invoice-chaser-db --remote
wrangler secret put RESEND_API_KEY
wrangler deploy
```

Local development (uses a local D1 database, no secrets needed):

```bash
wrangler dev
```

## Email: read this before expecting real sends

- Without `RESEND_API_KEY`, the cron job logs a warning and sends nothing.
  Nothing is faked as sent.
- With a key but no verified domain, Resend only delivers mail sent from
  `onboarding@resend.dev` to your own Resend account email — fine for testing,
  not for customers.
- To email strangers, verify your own domain in Resend (SPF + DKIM DNS
  records) and set `RESEND_FROM` to an address on that domain. This needs a
  domain (~$10–15/year) — the same domain AdSense later needs.
- Resend's free tier is 3,000 emails/month capped at 100/day. The cron job
  stops at the cap and retries the next day, so it can never silently
  double-send or burn the quota.

## Free-tier limits to know about

- Workers: 100,000 requests/day, 10 ms CPU per invocation (database and email
  waiting time does not count against it). No pause or spin-down.
- D1: 5 GB storage, 5 million rows read/day — far above a few hundred users.
- Cron: 09:00 UTC daily (Cloudflare cron is UTC only). Reminders are
  day-granular, so this is fine for invoice chasing.

## Security notes

- Passwords are PBKDF2-SHA-256 hashed (100,000 iterations, random salt).
- Sessions are random 256-bit tokens in HttpOnly, SameSite=Lax cookies.
- Every invoice, reminder, template, and log query is scoped to the signed-in
  user on the server; the client never chooses whose data it sees.
- API POSTs refuse cross-origin requests.
- No secrets are committed in this repo. If a key ever leaks into git history,
  rotate it immediately (Resend dashboard → API keys).

## What is intentionally not in v1

- No automatic reply classification (replies go to your own inbox; pause
  manually from the dashboard).
- No payment-link webhooks or accounting sync (mark paid manually).
- No password reset email (needs a verified sending domain first).
- No real payment processing or checkout (pricing is display-only).
