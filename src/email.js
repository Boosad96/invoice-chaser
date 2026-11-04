// Email templates + Resend sending.
// Reminders never touch a customer's clients' money: they only ever contain
// a pay link the user pasted themselves. The app's own plan payments (USDT
// on BSC, verified on-chain) are handled in verify.js / index.js, not here.

export const DEFAULT_TEMPLATES = {
  1: {
    subject: 'Friendly reminder: invoice {{amount}} was due {{due_date}}',
    body: 'Hi {{client}},\n\nJust a friendly nudge — invoice {{amount}} was due on {{due_date}} and we have not seen the payment yet.\n\nIf you have already paid, please ignore this message. Otherwise you can pay here:\n{{pay_link}}\n\nThanks so much,\n{{business_name}}',
  },
  2: {
    subject: 'Second reminder: invoice {{amount}} is now overdue',
    body: 'Hi {{client}},\n\nThis is a second reminder that invoice {{amount}}, due on {{due_date}}, is still unpaid.\n\nPlease arrange payment as soon as you can, or reply to this email if there is an issue with the invoice:\n{{pay_link}}\n\nThanks,\n{{business_name}}',
  },
  3: {
    subject: 'Final notice: invoice {{amount}} overdue since {{due_date}}',
    body: 'Hi {{client}},\n\nThis is a final notice for invoice {{amount}}, which was due on {{due_date}} and remains unpaid.\n\nPlease pay now or contact us urgently to agree a payment plan:\n{{pay_link}}\n\n{{business_name}}',
  },
};

export const STEP_DAYS = { 1: 7, 2: 14, 3: 30 };

export function renderTemplate(text, vars) {
  let out = text;
  for (const [key, value] of Object.entries(vars)) {
    out = out.split('{{' + key + '}}').join(value == null ? '' : String(value));
  }
  return out;
}

export function formatMoney(cents, currency) {
  const symbols = { USD: '$', EUR: '€', GBP: '£', INR: '₹' };
  const symbol = symbols[currency] || currency + ' ';
  return symbol + (cents / 100).toFixed(2);
}

export function addDays(dateStr, days) {
  const d = new Date(dateStr + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function todayUTC() {
  return new Date().toISOString().slice(0, 10);
}

// Sends one email via Resend. Returns { ok, skipped, error }.
// If RESEND_API_KEY is not configured, the send is skipped (never faked).
export async function sendEmail(env, { to, subject, text }) {
  const key = env.RESEND_API_KEY;
  if (!key) return { ok: false, skipped: true, error: 'RESEND_API_KEY not configured' };
  const from = env.RESEND_FROM || 'onboarding@resend.dev';
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to, subject, text }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    return { ok: false, skipped: false, error: 'Resend ' + res.status + ': ' + detail.slice(0, 200) };
  }
  return { ok: true, skipped: false };
}
