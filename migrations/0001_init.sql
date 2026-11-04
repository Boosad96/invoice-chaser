-- Invoice Chaser — initial D1 schema.
-- Applied with: wrangler d1 migrations apply invoice-chaser-db --remote

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  business_name TEXT NOT NULL DEFAULT '',
  currency TEXT NOT NULL DEFAULT 'USD',
  plan TEXT NOT NULL DEFAULT 'free',
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  expires_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS invoices (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  due_date TEXT NOT NULL,
  pay_link TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'open',
  paused INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_invoices_user ON invoices(user_id, status);

CREATE TABLE IF NOT EXISTS reminders (
  id TEXT PRIMARY KEY,
  invoice_id TEXT NOT NULL REFERENCES invoices(id),
  step INTEGER NOT NULL,
  scheduled_date TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  UNIQUE(invoice_id, step)
);
CREATE INDEX IF NOT EXISTS idx_reminders_due ON reminders(status, scheduled_date);

CREATE TABLE IF NOT EXISTS templates (
  user_id TEXT NOT NULL REFERENCES users(id),
  step INTEGER NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  PRIMARY KEY (user_id, step)
);

CREATE TABLE IF NOT EXISTS sent_log (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  invoice_id TEXT NOT NULL,
  step INTEGER NOT NULL,
  to_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  method TEXT NOT NULL DEFAULT 'resend',
  sent_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL
);
