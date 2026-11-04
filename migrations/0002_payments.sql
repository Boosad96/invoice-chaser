-- Invoice Chaser — USDT plan payments (migration 0002).
-- Run ONCE in the D1 Console (dashboard) for invoice-chaser-db, or:
--   wrangler d1 migrations apply invoice-chaser-db --remote
-- The payments table is safe to re-run (IF NOT EXISTS). The ALTER TABLE
-- line errors with "duplicate column" if run twice — that error is safe
-- to ignore; it just means the column is already there.

ALTER TABLE users ADD COLUMN plan_until TEXT;

CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  plan TEXT NOT NULL,
  amount_usdt TEXT NOT NULL,
  tx_hash TEXT NOT NULL UNIQUE,
  from_address TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'confirmed',
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_payments_user ON payments(user_id, created_at);
