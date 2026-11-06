// Invoice Chaser — Cloudflare Worker.
// Serves public pages, the private dashboard app, a JSON API, and a daily
// cron job that sends due reminders via Resend. The app never touches a
// customer's clients' money: reminders only carry a pay link the user pasted.
// The one payment the app itself takes is its own plan subscription, paid in
// USDT on BNB Smart Chain and verified on-chain before any upgrade.

import {
  newId, hashPassword, verifyPassword, createSession, getSessionUser,
  destroySession, sessionCookie, clearSessionCookie, requireSameOrigin,
} from './auth.js';
import {
  DEFAULT_TEMPLATES, STEP_DAYS, renderTemplate, formatMoney, addDays, todayUTC, sendEmail,
} from './email.js';
import {
  layout, homePage, howItWorksPage, pricingPage, templatesPage, faqPage,
  aboutPage, contactPage, privacyPage, loginPage, signupPage, payPage,
  blogIndexPage, articlePaymentReminderEmail, articleClientNotPaying, articleReminderTemplates, articleLateFee,
  reminderEmailGeneratorPage, invoiceTemplatePage, lateFeeCalculatorPage, usLateFeeCalculatorPage, invoiceReminderEmailTemplatePage, cashFlowForecastPage, irregularIncomeBudgetPage,
} from './pages.js';
import { appPage } from './app.js';
import {
  USDT_BEP20, PAY_TO, PLAN_PRICES, planUnits, formatUsdt, validTxHash, verifyUsdtPayment,
} from './verify.js';

const PLAN_LIMITS = { free: 3, starter: 25, pro: 100 };

// A paid plan only counts while its 30-day window is still open. Expired or
// missing plan_until falls back to free, so a lapsed subscription can never
// keep a higher limit by accident.
function effectivePlan(user) {
  if (!user) return 'free';
  if (user.plan !== 'starter' && user.plan !== 'pro') return 'free';
  if (!user.plan_until) return 'free';
  return new Date(user.plan_until).getTime() > Date.now() ? user.plan : 'free';
}
const CURRENCIES = ['USD', 'EUR', 'GBP', 'INR'];

// Permanent redirects for URLs visitors (and bots) guess that do not exist:
// /about-us instead of /about, /contact-us instead of /contact, and so on.
// Found in GA4 2026-11-06: 7 guessed paths in the last 28 days plus 5 more
// in Realtime. A 301 sends the visitor to the real page and tells Google
// the guessed URL is the canonical one.
const REDIRECTS = {
  '/about-us': '/about',
  '/contact-us': '/contact',
  '/privacy-policy': '/privacy',
  '/legal/privacy': '/privacy',
  '/legal/privacy-policy': '/privacy',
  '/support': '/contact',
  '/team': '/about',
  '/help': '/faq',
  '/legal': '/privacy',
  '/terms': '/privacy',
  '/impressum': '/about',
  '/imprint': '/about',
};

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}

function html(body, status = 200, headers = {}) {
  return new Response(body, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8', ...headers },
  });
}

function redirect(location, cookie) {
  const headers = { Location: location };
  if (cookie) headers['Set-Cookie'] = cookie;
  return new Response(null, { status: 302, headers });
}

async function readBody(request) {
  const type = request.headers.get('Content-Type') || '';
  try {
    if (type.includes('application/json')) return await request.json();
    if (type.includes('form')) {
      const form = await request.formData();
      const out = {};
      for (const [k, v] of form.entries()) out[k] = v;
      return out;
    }
    const text = await request.text();
    return text ? JSON.parse(text) : {};
  } catch {
    return {};
  }
}

function validEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validDate(s) {
  return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(Date.parse(s + 'T00:00:00Z'));
}

async function seedTemplates(db, userId) {
  for (const step of [1, 2, 3]) {
    await db.prepare('INSERT OR IGNORE INTO templates (user_id, step, subject, body) VALUES (?, ?, ?, ?)')
      .bind(userId, step, DEFAULT_TEMPLATES[step].subject, DEFAULT_TEMPLATES[step].body).run();
  }
}

async function getTemplates(db, userId) {
  const { results } = await db.prepare('SELECT step, subject, body FROM templates WHERE user_id = ? ORDER BY step')
    .bind(userId).all();
  const out = {};
  for (const step of [1, 2, 3]) {
    const row = results.find((r) => r.step === step);
    out[step] = row ? { subject: row.subject, body: row.body } : DEFAULT_TEMPLATES[step];
  }
  return out;
}

async function createInvoice(db, user, data) {
  const id = newId();
  const cents = Math.round(Number(data.amount) * 100);
  const now = new Date().toISOString();
  await db.prepare(
    'INSERT INTO invoices (id, user_id, client_name, client_email, amount_cents, currency, due_date, pay_link, status, paused, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  ).bind(id, user.id, data.client_name, data.client_email, cents, user.currency, data.due_date, data.pay_link || '', 'open', 0, now).run();
  for (const step of [1, 2, 3]) {
    await db.prepare('INSERT INTO reminders (id, invoice_id, step, scheduled_date, status) VALUES (?, ?, ?, ?, ?)')
      .bind(newId(), id, step, addDays(data.due_date, STEP_DAYS[step]), 'pending').run();
  }
  return id;
}

async function renderReminder(db, user, reminderId) {
  const row = await db.prepare(
    'SELECT r.*, i.client_name, i.client_email, i.amount_cents, i.currency, i.due_date, i.pay_link FROM reminders r JOIN invoices i ON i.id = r.invoice_id WHERE r.id = ? AND i.user_id = ?'
  ).bind(reminderId, user.id).first();
  if (!row) return null;
  const templates = await getTemplates(db, user.id);
  const tpl = templates[row.step];
  const vars = {
    client: row.client_name,
    amount: formatMoney(row.amount_cents, row.currency),
    due_date: row.due_date,
    pay_link: row.pay_link,
    business_name: user.business_name,
  };
  return {
    to: row.client_email,
    subject: renderTemplate(tpl.subject, vars),
    body: renderTemplate(tpl.body, vars),
    invoice: row,
  };
}

// ---- Daily cron job: send due reminders, exactly once each. ----
async function runDailyJob(env) {
  const today = todayUTC();
  if (!env.RESEND_API_KEY) {
    console.log('Invoice Chaser cron: RESEND_API_KEY not configured, nothing sent.');
    return;
  }
  const { results } = await env.DB.prepare(
    `SELECT r.id FROM reminders r JOIN invoices i ON i.id = r.invoice_id
     WHERE r.status = 'pending' AND r.scheduled_date <= ? AND i.status = 'open' AND i.paused = 0
     ORDER BY r.scheduled_date ASC LIMIT 90`
  ).bind(today).all();
  for (const { id } of results) {
    // Claim the reminder first: only the worker that flips pending -> sending sends it.
    const claimed = await env.DB.prepare("UPDATE reminders SET status = 'sending' WHERE id = ? AND status = 'pending'")
      .bind(id).run();
    if (claimed.meta.changes !== 1) continue;
    const row = await env.DB.prepare(
      'SELECT r.*, i.user_id FROM reminders r JOIN invoices i ON i.id = r.invoice_id WHERE r.id = ?'
    ).bind(id).first();
    if (!row) continue;
    const user = await env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(row.user_id).first();
    if (!user) {
      await env.DB.prepare("UPDATE reminders SET status = 'pending' WHERE id = ?").bind(id).run();
      continue;
    }
    const rendered = await renderReminder(env.DB, user, id);
    if (!rendered) {
      await env.DB.prepare("UPDATE reminders SET status = 'pending' WHERE id = ?").bind(id).run();
      continue;
    }
    const sent = await sendEmail(env, { to: rendered.to, subject: rendered.subject, text: rendered.body });
    if (!sent.ok) {
      console.log('Invoice Chaser cron: send failed for reminder ' + id + ': ' + sent.error);
      await env.DB.prepare("UPDATE reminders SET status = 'pending' WHERE id = ?").bind(id).run();
      if (sent.error && /429|quota|rate/i.test(sent.error)) break; // daily cap hit: stop, retry tomorrow
      continue;
    }
    await env.DB.prepare("UPDATE reminders SET status = 'sent' WHERE id = ?").bind(id).run();
    await env.DB.prepare(
      'INSERT INTO sent_log (id, user_id, invoice_id, step, to_email, subject, body, method, sent_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(newId(), user.id, row.invoice_id, row.step, rendered.to, rendered.subject, rendered.body, 'resend', new Date().toISOString()).run();
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';
    const method = request.method;
    const db = env.DB;

    // Public pages
    if (method === 'GET' && path === '/') return html(homePage());
    if (method === 'GET' && path === '/how-it-works') return html(howItWorksPage());
    if (method === 'GET' && path === '/pricing') return html(pricingPage());
    if (method === 'GET' && path === '/pay') {
      const plan = url.searchParams.get('plan');
      return html(payPage(plan === 'pro' ? 'pro' : 'starter'));
    }
    if (method === 'GET' && path === '/templates') return html(templatesPage());
    if (method === 'GET' && path === '/reminder-email-generator') return html(reminderEmailGeneratorPage());
    if (method === 'GET' && path === '/invoice-template') return html(invoiceTemplatePage());
    if (method === 'GET' && path === '/late-fee-calculator') return html(lateFeeCalculatorPage());
    if (method === 'GET' && path === '/us-late-fee-calculator') return html(usLateFeeCalculatorPage());
    if (method === 'GET' && path === '/invoice-reminder-email-template') return html(invoiceReminderEmailTemplatePage());
    if (method === 'GET' && path === '/small-business-cash-flow-forecast-template') return html(cashFlowForecastPage());
    if (method === 'GET' && path === '/irregular-income-budget-template-excel') return html(irregularIncomeBudgetPage());
    if (method === 'GET' && path === '/blog') return html(blogIndexPage());
    if (method === 'GET' && path === '/blog/payment-reminder-email') return html(articlePaymentReminderEmail());
    if (method === 'GET' && path === '/blog/client-not-paying') return html(articleClientNotPaying());
    if (method === 'GET' && path === '/blog/invoice-reminder-templates') return html(articleReminderTemplates());
    if (method === 'GET' && path === '/blog/late-fee') return html(articleLateFee());
    if (method === 'GET' && path === '/faq') return html(faqPage());
    if (method === 'GET' && path === '/about') return html(aboutPage());
    if (method === 'GET' && path === '/contact') return html(contactPage());
    if (method === 'GET' && path === '/privacy') return html(privacyPage());
    if (method === 'GET' && path === '/login') return html(loginPage());
    if (method === 'GET' && path === '/signup') return html(signupPage());
    if (method === 'GET' && path === '/app') return html(appPage());
    if (method === 'GET' && path === '/robots.txt') {
      return new Response('User-agent: *\nAllow: /\nDisallow: /app\nDisallow: /api/\nSitemap: https://paychaserhq.com/sitemap.xml\n', { headers: { 'Content-Type': 'text/plain' } });
    }
    if (method === 'GET' && path === '/sitemap.xml') {
      const pages = ['/', '/how-it-works', '/pricing', '/pay', '/templates', '/reminder-email-generator', '/invoice-template', '/late-fee-calculator', '/us-late-fee-calculator', '/invoice-reminder-email-template', '/small-business-cash-flow-forecast-template', '/irregular-income-budget-template-excel', '/blog', '/blog/payment-reminder-email', '/blog/client-not-paying', '/blog/invoice-reminder-templates', '/blog/late-fee', '/faq', '/about', '/contact', '/privacy'];
      const urls = pages.map((p) => '  <url><loc>https://paychaserhq.com' + p + '</loc></url>').join('\n');
      return new Response('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls + '\n</urlset>', { headers: { 'Content-Type': 'application/xml' } });
    }

    // Contact form (public, stores the message for the site owner)
    if (method === 'POST' && path === '/api/contact') {
      const body = await readBody(request);
      if (!body.name || !validEmail(body.email) || !body.message) return json({ error: 'Name, a valid email, and a message are required.' }, 400);
      await db.prepare('INSERT INTO contact_messages (id, name, email, message, created_at) VALUES (?, ?, ?, ?, ?)')
        .bind(newId(), String(body.name).slice(0, 200), body.email, String(body.message).slice(0, 5000), new Date().toISOString()).run();
      return json({ ok: true });
    }

    // Auth
    if (method === 'POST' && path === '/api/auth/signup') {
      const body = await readBody(request);
      if (!validEmail(body.email)) return html(signupPage('Enter a valid email address.'), 400);
      if (typeof body.password !== 'string' || body.password.length < 8) return html(signupPage('Password must be at least 8 characters.'), 400);
      if (!body.business) return html(signupPage('Business name is required.'), 400);
      const existing = await db.prepare('SELECT id FROM users WHERE email = ?').bind(body.email.toLowerCase()).first();
      if (existing) return html(signupPage('An account with that email already exists. Try signing in.'), 400);
      const { salt, hash } = await hashPassword(body.password);
      const id = newId();
      await db.prepare('INSERT INTO users (id, email, password_hash, salt, business_name, currency, plan, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
        .bind(id, body.email.toLowerCase(), hash, salt, String(body.business).slice(0, 200), 'USD', 'free', new Date().toISOString()).run();
      await seedTemplates(db, id);
      const token = await createSession(db, id);
      return redirect('/app', sessionCookie(token));
    }
    if (method === 'POST' && path === '/api/auth/login') {
      const body = await readBody(request);
      const user = await db.prepare('SELECT * FROM users WHERE email = ?').bind(String(body.email || '').toLowerCase()).first();
      if (!user || !(await verifyPassword(String(body.password || ''), user.salt, user.password_hash))) {
        return html(loginPage('Email or password is incorrect.'), 401);
      }
      const token = await createSession(db, user.id);
      return redirect('/app', sessionCookie(token));
    }
    if (method === 'POST' && path === '/api/auth/logout') {
      await destroySession(db, request);
      return json({ ok: true }, 200, { 'Set-Cookie': clearSessionCookie() });
    }

    // USDT plan payments: the customer pays first, then submits the BSC
    // transaction hash. The plan upgrades ONLY after the payment is verified
    // on-chain (exact USDT amount to the site wallet). Every confirmed or
    // flagged payment is emailed to the site owner as the payment report.
    if (method === 'POST' && path === '/api/payments/submit') {
      if (!requireSameOrigin(request)) return html(payPage('starter', { type: 'error', text: 'Cross-origin request refused.' }), 403);
      const user = await getSessionUser(db, request);
      if (!user) return html(payPage('starter', { type: 'error', text: 'Sign in first, then submit your payment.' }), 401);
      const body = await readBody(request);
      const plan = body.plan === 'pro' ? 'pro' : (body.plan === 'starter' ? 'starter' : null);
      const txHash = String(body.tx_hash || '').trim();
      if (!plan) return html(payPage('starter', { type: 'error', text: 'Choose a plan: Starter or Pro.' }), 400);
      if (!validTxHash(txHash)) return html(payPage(plan, { type: 'error', text: 'That does not look like a BSC transaction hash. It should start with 0x and be 66 characters long.' }), 400);
      try {
        const existing = await db.prepare('SELECT status FROM payments WHERE tx_hash = ?').bind(txHash.toLowerCase()).first();
        if (existing) {
          return html(payPage(plan, { type: 'error', text: existing.status === 'confirmed'
            ? 'This transaction was already claimed and the plan was upgraded.'
            : 'This transaction was already submitted and is under review by the site owner.' }), 400);
        }
        const result = await verifyUsdtPayment(txHash, planUnits(plan));
        if (result.state === 'confirmed') {
          const now = new Date();
          let base = now;
          if (user.plan === plan && user.plan_until && new Date(user.plan_until).getTime() > now.getTime()) {
            base = new Date(user.plan_until); // renewing early: extend from the current expiry
          }
          const until = new Date(base.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();
          await db.batch([
            db.prepare('INSERT INTO payments (id, user_id, plan, amount_usdt, tx_hash, from_address, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
              .bind(newId(), user.id, plan, String(PLAN_PRICES[plan]), txHash.toLowerCase(), result.from || '', 'confirmed', now.toISOString()),
            db.prepare('UPDATE users SET plan = ?, plan_until = ? WHERE id = ?').bind(plan, until, user.id),
          ]);
          if (env.OWNER_EMAIL) {
            try {
              await sendEmail(env, { to: env.OWNER_EMAIL,
                subject: 'Invoice Chaser: ' + plan + ' payment confirmed — $' + PLAN_PRICES[plan] + ' USDT',
                text: 'A customer just paid for the ' + plan + ' plan.\n\nAmount: $' + PLAN_PRICES[plan] + ' USDT\nTransaction: ' + txHash + '\nFrom: ' + (result.from || 'unknown') + '\nCustomer: ' + user.email + ' (' + user.business_name + ')\nPlan valid until: ' + until + '\n\nThe plan has been upgraded automatically. No action needed.' });
            } catch { /* owner email must never block the upgrade */ }
          }
          return html(payPage(plan, { type: 'success', text: 'Payment confirmed on-chain. Your ' + plan + ' plan is active until ' + until.slice(0, 10) + '. <a href="/app">Go to your dashboard</a>.' }));
        }
        if (result.state === 'wrong_amount') {
          await db.prepare('INSERT INTO payments (id, user_id, plan, amount_usdt, tx_hash, from_address, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
            .bind(newId(), user.id, plan, formatUsdt(result.amountUnits), txHash.toLowerCase(), result.from || '', 'flagged', new Date().toISOString()).run();
          if (env.OWNER_EMAIL) {
            try {
              await sendEmail(env, { to: env.OWNER_EMAIL,
                subject: 'Invoice Chaser: payment flagged — wrong amount for ' + plan,
                text: 'A customer sent USDT but not the exact plan amount.\n\nExpected: $' + PLAN_PRICES[plan] + ' USDT\nReceived: ' + formatUsdt(result.amountUnits) + ' USDT\nTransaction: ' + txHash + '\nFrom: ' + (result.from || 'unknown') + '\nCustomer: ' + user.email + ' (' + user.business_name + ')\n\nThe plan was NOT upgraded. Decide manually: refund, or upgrade by hand.' });
            } catch { /* never block the response */ }
          }
          return html(payPage(plan, { type: 'error', text: 'We found your payment, but it was ' + formatUsdt(result.amountUnits) + ' USDT instead of exactly $' + PLAN_PRICES[plan] + '. The plan was not upgraded. The site owner has been notified and will handle it — if you sent the wrong amount by mistake, contact us from the contact page with this transaction hash.' }), 400);
        }
        const reasons = {
          not_found: 'We could not find that transaction on BNB Smart Chain yet. Wait for it to confirm (usually under a minute) and submit again.',
          failed: 'That transaction failed on-chain, so no payment arrived. Check it on BscScan and try a new payment.',
          wrong_recipient: 'That transaction is real, but its USDT did not go to the Invoice Chaser wallet. Check the wallet address on the payment page and send again.',
          not_usdt: 'That transaction does not contain a USDT transfer. Only USDT on BNB Smart Chain (BEP-20) is accepted.',
          rpc_unavailable: 'BNB Smart Chain could not be reached right now. Nothing was charged or changed — try submitting again in a few minutes.',
        };
        return html(payPage(plan, { type: 'error', text: reasons[result.state] || 'Payment could not be verified. Nothing was changed — try again.' }), 400);
      } catch (e) {
        if (/no such table|no such column/i.test(String(e && e.message))) {
          return html(payPage(plan, { type: 'error', text: 'Payments are not set up yet — the database update has not been applied. Please try again later.' }), 503);
        }
        return html(payPage(plan, { type: 'error', text: 'Something went wrong while verifying the payment. Nothing was changed — please try again.' }), 500);
      }
    }

    // Everything below needs a session.
    if (path.startsWith('/api/')) {
      if (!requireSameOrigin(request)) return json({ error: 'Cross-origin request refused.' }, 403);
      const user = await getSessionUser(db, request);
      if (!user) return json({ error: 'Not signed in.' }, 401);

      if (method === 'GET' && path === '/api/me') {
        const active = await db.prepare("SELECT COUNT(*) AS n FROM invoices WHERE user_id = ? AND status = 'open'")
          .bind(user.id).first();
        return json({
          email: user.email, business_name: user.business_name, currency: user.currency,
          plan: effectivePlan(user), plan_limit: PLAN_LIMITS[effectivePlan(user)] || 3, plan_until: user.plan_until || null, active_count: active.n,
        });
      }

      if (method === 'GET' && path === '/api/invoices') {
        const { results } = await db.prepare('SELECT * FROM invoices WHERE user_id = ? ORDER BY due_date ASC')
          .bind(user.id).all();
        return json({ invoices: results });
      }

      if (method === 'POST' && path === '/api/invoices') {
        const body = await readBody(request);
        if (!body.client_name || !validEmail(body.client_email) || !(Number(body.amount) > 0) || !validDate(body.due_date)) {
          return json({ error: 'Client name, a valid client email, an amount above zero, and a due date (YYYY-MM-DD) are required.' }, 400);
        }
        const active = await db.prepare("SELECT COUNT(*) AS n FROM invoices WHERE user_id = ? AND status = 'open'")
          .bind(user.id).first();
        const plan = effectivePlan(user);
        if (active.n >= (PLAN_LIMITS[plan] || 3)) {
          return json({ error: 'Your ' + plan + ' plan allows ' + (PLAN_LIMITS[plan] || 3) + ' active invoices. Mark one paid, or upgrade from the pricing page.' }, 403);
        }
        const id = await createInvoice(db, user, body);
        return json({ ok: true, id });
      }

      if (method === 'POST' && path === '/api/invoices/import') {
        const body = await readBody(request);
        const rows = Array.isArray(body.invoices) ? body.invoices : [];
        let imported = 0, skipped = 0;
        for (const row of rows.slice(0, 200)) {
          if (!row.client_name || !validEmail(row.client_email) || !(Number(row.amount) > 0) || !validDate(row.due_date)) { skipped++; continue; }
          const active = await db.prepare("SELECT COUNT(*) AS n FROM invoices WHERE user_id = ? AND status = 'open'")
            .bind(user.id).first();
          if (active.n >= (PLAN_LIMITS[effectivePlan(user)] || 3)) { skipped++; continue; }
          await createInvoice(db, user, row);
          imported++;
        }
        return json({ ok: true, imported, skipped });
      }

      const invMatch = path.match(/^\/api\/invoices\/([^/]+)(?:\/(preview))?$/);
      if (invMatch) {
        const invId = decodeURIComponent(invMatch[1]);
        const inv = await db.prepare('SELECT * FROM invoices WHERE id = ? AND user_id = ?').bind(invId, user.id).first();
        if (!inv) return json({ error: 'Invoice not found.' }, 404);
        if (method === 'PATCH') {
          const body = await readBody(request);
          if (body.status === 'paid') {
            await db.prepare("UPDATE invoices SET status = 'paid' WHERE id = ?").bind(invId).run();
            await db.prepare("UPDATE reminders SET status = 'skipped' WHERE invoice_id = ? AND status = 'pending'").bind(invId).run();
            return json({ ok: true });
          }
          if (body.paused === 0 || body.paused === 1) {
            await db.prepare('UPDATE invoices SET paused = ? WHERE id = ?').bind(body.paused, invId).run();
            return json({ ok: true });
          }
          return json({ error: 'Nothing to update.' }, 400);
        }
        if (method === 'DELETE') {
          await db.prepare('DELETE FROM reminders WHERE invoice_id = ?').bind(invId).run();
          await db.prepare('DELETE FROM invoices WHERE id = ?').bind(invId).run();
          return json({ ok: true });
        }
        if (method === 'GET' && invMatch[2] === 'preview') {
          const rem = await db.prepare("SELECT id FROM reminders WHERE invoice_id = ? AND status = 'pending' ORDER BY step ASC LIMIT 1")
            .bind(invId).first();
          if (!rem) return json({ error: 'No pending reminders for this invoice.' }, 404);
          const rendered = await renderReminder(db, user, rem.id);
          return json(rendered);
        }
      }

      const remMatch = path.match(/^\/api\/reminders\/([^/]+)\/(preview|mark-sent)$/);
      if (remMatch) {
        const remId = decodeURIComponent(remMatch[1]);
        const action = remMatch[2];
        const rendered = await renderReminder(db, user, remId);
        if (!rendered) return json({ error: 'Reminder not found.' }, 404);
        if (method === 'GET' && action === 'preview') return json(rendered);
        if (method === 'POST' && action === 'mark-sent') {
          const claimed = await db.prepare("UPDATE reminders SET status = 'sent' WHERE id = ? AND status = 'pending'")
            .bind(remId).run();
          if (claimed.meta.changes !== 1) return json({ error: 'Reminder was already sent or skipped.' }, 409);
          await db.prepare(
            'INSERT INTO sent_log (id, user_id, invoice_id, step, to_email, subject, body, method, sent_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
          ).bind(newId(), user.id, rendered.invoice.invoice_id, rendered.invoice.step, rendered.to, rendered.subject, rendered.body, 'manual', new Date().toISOString()).run();
          return json({ ok: true });
        }
      }

      if (method === 'GET' && path === '/api/queue') {
        const upcoming = await db.prepare(
          `SELECT r.id AS reminder_id, r.step, r.scheduled_date, i.client_name FROM reminders r
           JOIN invoices i ON i.id = r.invoice_id
           WHERE i.user_id = ? AND r.status = 'pending' AND i.status = 'open' AND i.paused = 0
           ORDER BY r.scheduled_date ASC LIMIT 50`
        ).bind(user.id).all();
        const sent = await db.prepare(
          `SELECT s.*, i.client_name FROM sent_log s LEFT JOIN invoices i ON i.id = s.invoice_id
           WHERE s.user_id = ? ORDER BY s.sent_at DESC LIMIT 50`
        ).bind(user.id).all();
        return json({ upcoming: upcoming.results, sent: sent.results });
      }

      if (method === 'GET' && path === '/api/templates') {
        return json({ templates: await getTemplates(db, user.id) });
      }
      if (method === 'PUT' && path === '/api/templates') {
        const body = await readBody(request);
        const templates = body.templates || {};
        for (const step of [1, 2, 3]) {
          const t = templates[step] || templates[String(step)];
          if (!t || typeof t.subject !== 'string' || typeof t.body !== 'string') continue;
          await db.prepare('INSERT INTO templates (user_id, step, subject, body) VALUES (?, ?, ?, ?) ON CONFLICT(user_id, step) DO UPDATE SET subject = excluded.subject, body = excluded.body')
            .bind(user.id, step, t.subject.slice(0, 500), t.body.slice(0, 5000)).run();
        }
        return json({ ok: true });
      }

      if (method === 'PUT' && path === '/api/settings') {
        const body = await readBody(request);
        const business = typeof body.business_name === 'string' ? body.business_name.slice(0, 200) : user.business_name;
        const currency = CURRENCIES.includes(body.currency) ? body.currency : user.currency;
        await db.prepare('UPDATE users SET business_name = ?, currency = ? WHERE id = ?')
          .bind(business, currency, user.id).run();
        return json({ ok: true });
      }

      return json({ error: 'Not found.' }, 404);
    }

    if (method === 'GET' && REDIRECTS[path]) {
      return new Response(null, { status: 301, headers: { Location: REDIRECTS[path] } });
    }

    return html(layout('Not found', '<h1>Page not found</h1><p>That page does not exist. <a href="/">Back home</a>.</p>', '/404', { robots: 'noindex, follow' }), 404);
  },

  async scheduled(event, env) {
    await runDailyJob(env);
  },
};
