// Public marketing pages. These are the ONLY pages that may ever carry
// display ads. Ads must NEVER appear on /login, /signup, /app, settings, or
// any private page. No ad code is included in v1.

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const CSS = `
:root{--ink:#14202e;--muted:#55636f;--line:#e2e8ee;--brand:#0b6b5e;--brand2:#0e8a78;--accent:#f59e0b;--bg:#f6f7f8;--card:#fff}
*{box-sizing:border-box}body{margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:var(--ink);line-height:1.6;background:var(--bg)}
a{color:var(--brand)}header{border-bottom:1px solid var(--line);background:#fff}
.nav{max-width:1000px;margin:0 auto;padding:16px 20px;display:flex;gap:20px;flex-wrap:wrap;align-items:center}
.nav .logo{font-weight:800;font-size:21px;color:var(--ink);text-decoration:none;margin-right:auto;display:flex;align-items:center;gap:10px}
.logo-badge{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:8px;background:var(--brand);color:#fff;font-size:18px;font-weight:800}
.nav a{color:var(--muted);text-decoration:none;font-size:15px}.nav a:hover{color:var(--ink)}
.btn{display:inline-block;background:var(--brand);color:#fff!important;text-decoration:none;padding:12px 22px;border-radius:10px;font-weight:700;border:0;cursor:pointer;box-shadow:0 2px 8px rgba(11,107,94,.25)}
.btn:hover{background:var(--brand2)}
.btn.ghost{background:#fff;color:var(--ink)!important;border:1px solid var(--line);box-shadow:none}
main{max-width:1000px;margin:0 auto;padding:36px 20px 72px}
h1{font-size:44px;line-height:1.15;margin:10px 0 14px;letter-spacing:-.5px}h2{margin-top:36px;font-size:24px}h3{margin:0 0 6px}p{color:var(--muted)}
.hero{padding:36px 0 24px}.eyebrow{font-size:13px;font-weight:800;letter-spacing:1.5px;color:var(--brand);text-transform:uppercase;margin:0}
.card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:22px;margin:16px 0;box-shadow:0 1px 3px rgba(20,32,46,.06)}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}
label{display:block;margin:14px 0 4px;font-weight:600}
input,textarea,select{width:100%;padding:10px;border:1px solid var(--line);border-radius:8px;font-size:16px}
table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:10px;border-bottom:1px solid var(--line);font-size:15px}
footer{border-top:1px solid var(--line);background:#fff}footer .nav{font-size:14px}
code{background:#eef2f5;padding:2px 6px;border-radius:4px;font-size:14px}
pre{background:#0f172a;color:#e2e8f0;padding:16px;border-radius:10px;overflow:auto;font-size:14px}
.note{background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;margin:16px 0}
.hero-panel{background:linear-gradient(135deg,#07332d 0%,#0b6b5e 60%,#0e8a78 100%);border-radius:20px;padding:44px 36px;color:#fff;box-shadow:0 16px 40px rgba(7,51,45,.3)}
.hero-grid{display:grid;grid-template-columns:1.2fr .8fr;gap:28px;align-items:center}
.hero-panel .eyebrow{color:#fbbf24}.hero-panel h1{color:#fff;font-size:50px}
.hero-panel p{color:#cde8e2}.hero-panel .btn.ghost{background:transparent;color:#fff!important;border:1px solid rgba(255,255,255,.5);box-shadow:none}
.hero-visual svg{width:100%;height:auto;display:block;filter:drop-shadow(0 10px 24px rgba(0,0,0,.3))}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:24px 0}
.stat{background:#fff;border:1px solid var(--line);border-radius:14px;padding:18px;text-align:center;box-shadow:0 1px 3px rgba(20,32,46,.06)}
.stat b{display:block;font-size:26px;color:var(--brand)}.stat span{color:var(--muted);font-size:14px}
@media(max-width:640px){h1{font-size:32px}.nav{gap:12px}.hero{padding:24px 0 16px}.hero-grid{grid-template-columns:1fr}.hero-panel{padding:28px 22px}.hero-panel h1{font-size:36px}.stats{grid-template-columns:1fr}}
`;

const SITE_URL = 'https://paychaserhq.com';

export function layout(title, body, active, meta = {}) {
  const links = [
    ['/', 'Home'], ['/how-it-works', 'How it works'], ['/pricing', 'Pricing'],
    ['/templates', 'Sample templates'], ['/reminder-email-generator', 'Free tools'], ['/blog', 'Guides'], ['/faq', 'FAQ'], ['/about', 'About'], ['/contact', 'Contact'],
  ];
  const nav = links.map(([href, label]) =>
    '<a href="' + href + '"' + (active === href ? ' style="color:#1c2430;font-weight:600"' : '') + '>' + label + '</a>').join('');
  const description = meta.description || 'Invoice Chaser chases unpaid invoices for freelancers and solo trades, automatically, by email.';
  const canonical = SITE_URL + (active === '/' ? '/' : active);
  const robots = meta.robots || 'index, follow';
  const og = '<meta property="og:title" content="' + esc(title) + ' — Invoice Chaser">'
    + '<meta property="og:description" content="' + esc(description) + '">'
    + '<meta property="og:type" content="website">'
    + '<meta property="og:url" content="' + canonical + '">'
    + '<meta name="twitter:card" content="summary">'
    + '<meta name="twitter:title" content="' + esc(title) + ' — Invoice Chaser">'
    + '<meta name="twitter:description" content="' + esc(description) + '">';
  const jsonld = meta.jsonld ? '<script type="application/ld+json">' + meta.jsonld + '</script>' : '';
  return '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
    + '<title>' + esc(title) + ' — Invoice Chaser</title><meta name="description" content="' + esc(description) + '">'
    + '<meta name="robots" content="' + robots + '"><link rel="canonical" href="' + canonical + '">' + og + jsonld
    + '<style>' + CSS + '</style></head>'
    + '<body><header><nav class="nav"><a class="logo" href="/"><span class="logo-badge">✓</span>Invoice Chaser</a>' + nav
    + '<a href="/login">Sign in</a><a class="btn" href="/signup">Start free</a></nav></header>'
    + '<main>' + body + '</main>'
    + '<footer><nav class="nav"><span>Invoice Chaser — built for freelancers and solo trades.</span>'
    + '<a href="/privacy">Privacy</a><a href="/about">About</a><a href="/contact">Contact</a><a href="/reminder-email-generator">Reminder generator</a><a href="/invoice-template">Invoice template</a></nav></footer></body></html>';
}

export function homePage() {
  const jsonld = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Invoice Chaser',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: SITE_URL + '/',
    description: 'Automatic invoice reminder software for freelancers and solo trades. Polite, firmer, then final email reminders at day 7, 14 and 30 after an invoice is due.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Free plan: 3 active invoices' },
  });
  return layout('Automatic invoice reminders for freelancers', `
  <section class="hero-panel"><div class="hero-grid"><div>
  <p class="eyebrow">Automatic invoice reminders</p><h1>Unpaid invoices chase themselves.</h1>
  <p style="font-size:19px">Invoice Chaser is automatic invoice reminder software for freelancers and solo trades. It sends polite, firmer, then final reminders at day 7, 14 and 30 after an invoice is due — so you stop losing money to forgotten follow-ups, without the awkward phone call.</p>
  <p><a class="btn" href="/signup">Start free — 3 active invoices</a> &nbsp; <a class="btn ghost" href="/how-it-works">See how it works</a></p></div>
  <div class="hero-visual"><svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Invoice marked paid after automatic reminders">
    <rect x="45" y="15" width="210" height="200" rx="14" fill="#ffffff"/>
    <rect x="65" y="35" width="110" height="12" rx="6" fill="#14202e"/>
    <rect x="65" y="58" width="170" height="7" rx="3.5" fill="#cbd5e1"/>
    <rect x="65" y="73" width="150" height="7" rx="3.5" fill="#cbd5e1"/>
    <rect x="65" y="95" width="170" height="1.5" fill="#e2e8f0"/>
    <rect x="65" y="108" width="90" height="7" rx="3.5" fill="#94a3b8"/>
    <rect x="65" y="123" width="90" height="7" rx="3.5" fill="#94a3b8"/>
    <rect x="65" y="138" width="90" height="7" rx="3.5" fill="#94a3b8"/>
    <rect x="185" y="105" width="50" height="40" rx="8" fill="#ecfdf5"/>
    <text x="210" y="131" text-anchor="middle" font-family="system-ui,sans-serif" font-size="15" font-weight="800" fill="#0b6b5e">$100</text>
    <g transform="rotate(-12 195 175)"><rect x="155" y="160" width="80" height="30" rx="15" fill="none" stroke="#f59e0b" stroke-width="2.5"/><text x="195" y="180" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" font-weight="800" fill="#f59e0b" letter-spacing="2">PAID</text></g>
    <g><rect x="8" y="150" width="86" height="30" rx="15" fill="#0b6b5e"/><text x="51" y="170" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#ffffff">Day 7 ✓ sent</text></g>
    <g><rect x="205" y="30" width="86" height="30" rx="15" fill="#f59e0b"/><text x="248" y="50" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#ffffff">Day 30 ✓ final</text></g>
  </svg></div></div></section>
  <div class="stats">
    <div class="stat"><b>3 free</b><span>active invoices, no card</span></div>
    <div class="stat"><b>7 · 14 · 30</b><span>day reminder sequence</span></div>
    <div class="stat"><b>USDT checkout</b><span>pay with crypto, no card</span></div>
  </div>
  <div class="grid">
    <div class="card"><h3>1. Add the invoice</h3><p>Type it in or import a CSV. Client name, email, amount, due date — done in under a minute.</p></div>
    <div class="card"><h3>2. Reminders run themselves</h3><p>A polite nudge at day 7, a firmer reminder at day 14, a final notice at day 30. You edit every template.</p></div>
    <div class="card"><h3>3. Paid? It stops.</h3><p>Mark an invoice paid and its whole sequence pauses instantly. Nobody gets chased after paying.</p></div>
  </div>
  <div class="card"><h2 style="margin-top:0">Why unpaid invoices pile up</h2>
  <p>Most late payments are not disputes. The client meant to pay, the invoice slipped down their inbox, and nobody followed up. A single polite reminder recovers a large share of overdue invoices — the problem is that freelancers send it late, or never, because chasing feels awkward and admin eats the day. An automated reminder sequence fixes exactly that: the follow-up goes out on schedule, in a polite tone, every time.</p></div>
  <div class="card"><h2 style="margin-top:0">How the day 7, 14 and 30 sequence works</h2>
  <p>Day 7 is a friendly nudge that assumes the payment was simply forgotten. Day 14 is firmer and asks for payment or a reply about the invoice. Day 30 is a final notice that asks for payment now or a payment plan. Each step uses a template you can rewrite in your own voice, with your own payment link in every message. <a href="/how-it-works">See the full sequence</a>, or read the <a href="/templates">sample reminder templates</a> before you sign up.</p></div>
  <div class="card"><h2 style="margin-top:0">Who it is for</h2>
  <p>Plumbers, electricians, builders, designers, writers, consultants — anyone who sends invoices and then forgets to chase them. No accounting software required. If a client pays through your own payment link, paste it on the invoice and every reminder carries it.</p></div>
  <div class="card"><h2 style="margin-top:0">What it never does</h2>
  <p>Invoice Chaser never touches your clients' money. It only sends reminders — your clients pay you through your own Stripe, PayPal, or bank link. The only payment Invoice Chaser itself takes is your plan subscription, paid in USDT on BNB Smart Chain.</p></div>`, '/', {
    description: 'Automatic invoice reminder software for freelancers and solo trades. Polite, firmer, then final reminders at day 7, 14 and 30 after an invoice is due.',
    jsonld,
  });
}

export function howItWorksPage() {
  return layout('How it works', `
  <h1>How it works</h1>
  <div class="card"><h3>Step 1 — Sign up free</h3><p>Create an account with your email and business name. The free plan covers 3 active invoices.</p></div>
  <div class="card"><h3>Step 2 — Add invoices</h3><p>Add them one by one, or import a CSV with columns: client name, client email, amount, due date. An optional pay-link field puts your own payment link into every reminder.</p></div>
  <div class="card"><h3>Step 3 — The sequence runs daily</h3><p>Every morning the app checks what is overdue and unpaid, and sends the next step: day 7 polite, day 14 firmer, day 30 final. Each reminder is recorded once, so a retry can never double-send it.</p></div>
  <div class="card"><h3>Step 4 — Paid, paused, or promised</h3><p>Mark an invoice paid and its reminders stop at once. Pause any invoice while a client sorts out a query. The dashboard shows what is overdue, what is on track, what was sent, and what is due to send next.</p></div>
  <div class="card"><h3>Step 5 — Templates are yours</h3><p>Every template is plain text you can rewrite in your own voice, with placeholders for client, amount, due date, pay link, and business name.</p></div>`, '/how-it-works', {
    description: 'How automatic invoice reminders work: add invoices or import a CSV, and Invoice Chaser sends day 7, 14 and 30 reminders until the invoice is marked paid.',
  });
}

export function pricingPage() {
  return layout('Pricing', `
  <h1>Simple pricing</h1>
  <p>Start free. Upgrade only when you have more unpaid invoices than the free plan covers.</p>
  <table><tr><th>Plan</th><th>Active invoices</th><th>Price</th></tr>
  <tr><td><strong>Free</strong></td><td>3</td><td>$0</td></tr>
  <tr><td><strong>Starter</strong></td><td>25</td><td>$19 / month</td></tr>
  <tr><td><strong>Pro</strong></td><td>100</td><td>$49 / month</td></tr></table>
  <p>Every plan includes the full reminder sequence, editable templates, CSV import, and the dashboard. Pay with USDT on BNB Smart Chain — no card needed. Choose a plan and pay the exact amount; your plan upgrades automatically once the payment is verified on-chain, and lasts 30 days.</p>
  <p><a class="btn" href="/pay?plan=starter">Pay $19 USDT — Starter</a> &nbsp; <a class="btn" href="/pay?plan=pro">Pay $49 USDT — Pro</a> &nbsp; <a class="btn ghost" href="/signup">Start free</a></p>`, '/pricing', {
    description: 'Invoice Chaser pricing: free for 3 active invoices, Starter $19/month for 25, Pro $49/month for 100. Every plan includes the full day 7, 14 and 30 sequence.',
  });
}

export function payPage(plan, notice) {
  const price = plan === 'pro' ? 49 : 19;
  const limit = plan === 'pro' ? 100 : 25;
  const name = plan === 'pro' ? 'Pro' : 'Starter';
  const note = notice ? `<div class="card" style="border-left:5px solid ${notice.type === 'success' ? '#0b6b5e' : '#b91c1c'}"><p style="margin:0">${notice.text}</p></div>` : '';
  return layout('Pay with USDT — ' + name, `
  <h1>Pay for ${name} — $${price}</h1>
  <p>${name} gives you ${limit} active invoices, the full day 7, 14 and 30 reminder sequence, editable templates, CSV import, and the dashboard — for 30 days from the moment your payment is verified.</p>
  ${note}
  <div class="card"><h3 style="margin-top:0">Step 1 — Send exactly $${price} USDT</h3>
  <p>Send <strong>$${price} USDT</strong> on <strong>BNB Smart Chain (BEP-20)</strong> to this wallet. Copy the address exactly — do not type it by hand.</p>
  <p><code style="word-break:break-all">0xB202F2AB1257de36c0A52f8d1c227CCba4a95Fd2</code></p>
  <p class="note" style="color:#b91c1c"><strong>BNB Smart Chain only.</strong> USDT sent on Ethereum, Tron, or any other network will not be detected and cannot be recovered. Send exactly $${price} — a different amount will not upgrade your plan automatically.</p></div>
  <div class="card"><h3 style="margin-top:0">Step 2 — Paste your transaction hash</h3>
  <p>After sending, paste the transaction hash (it starts with 0x) below. We check BNB Smart Chain for the exact payment and upgrade your plan automatically — usually within a minute of confirmation.</p>
  <form method="POST" action="/api/payments/submit">
  <input type="hidden" name="plan" value="${plan}">
  <p><input type="text" name="tx_hash" placeholder="0x…" required style="width:100%;max-width:560px"></p>
  <p><button class="btn" type="submit">Verify payment and activate ${name}</button></p>
  </form>
  <p class="note">You must be signed in to submit a payment. Crypto payments are final — USDT cannot be reversed once sent, so double-check the amount and address before you send. Your plan lasts 30 days; renew the same way before it expires.</p></div>
  <p><a href="/pricing">Back to pricing</a> · <a href="/faq">Questions? Read the FAQ</a></p>`, '/pay', {
    description: 'Pay for Invoice Chaser ' + name + ' ($' + price + '/month, ' + limit + ' active invoices) with USDT on BNB Smart Chain. Payment is verified on-chain and the plan activates automatically.',
  });
}

export function templatesPage() {
  return layout('Sample reminder templates', `
  <h1>Sample reminder templates</h1>
  <p>These are the three default templates every account starts with. You can rewrite all of them. Placeholders: <code>{{client}}</code>, <code>{{amount}}</code>, <code>{{due_date}}</code>, <code>{{pay_link}}</code>, <code>{{business_name}}</code>.</p>
  <p>Want the reasoning behind each one — when to send it and what to change? Read the <a href="/blog/invoice-reminder-templates">invoice reminder templates guide</a>, or browse all <a href="/blog">guides for getting paid</a>.</p>
  <div class="card"><h3>Day 7 — Polite nudge</h3><p><strong>Subject:</strong> Friendly reminder: invoice {{amount}} was due {{due_date}}</p><p>Hi {{client}},<br><br>Just a friendly nudge — invoice {{amount}} was due on {{due_date}} and we have not seen the payment yet.<br><br>If you have already paid, please ignore this message. Otherwise you can pay here:<br>{{pay_link}}<br><br>Thanks so much,<br>{{business_name}}</p></div>
  <div class="card"><h3>Day 14 — Firmer follow-up</h3><p><strong>Subject:</strong> Second reminder: invoice {{amount}} is now overdue</p><p>Hi {{client}},<br><br>This is a second reminder that invoice {{amount}}, due on {{due_date}}, is still unpaid.<br><br>Please arrange payment as soon as you can, or reply to this email if there is an issue with the invoice:<br>{{pay_link}}<br><br>Thanks,<br>{{business_name}}</p></div>
  <div class="card"><h3>Day 30 — Final notice</h3><p><strong>Subject:</strong> Final notice: invoice {{amount}} overdue since {{due_date}}</p><p>Hi {{client}},<br><br>This is a final notice for invoice {{amount}}, which was due on {{due_date}} and remains unpaid.<br><br>Please pay now or contact us urgently to agree a payment plan:<br>{{pay_link}}<br><br>{{business_name}}</p></div>`, '/templates', {
    description: 'Free invoice reminder email templates: a polite day 7 nudge, a firmer day 14 follow-up, and a day 30 final notice, with placeholders for client and amount.',
  });
}

export function faqPage() {
  const qa = [
    ['Does Invoice Chaser touch my money?', 'For your clients\u2019 money: no. Invoice Chaser never holds client funds or takes a cut — clients pay you through your own payment link or bank details. The only payment Invoice Chaser itself takes is your plan subscription, paid in USDT on BNB Smart Chain.'],
    ['What happens when a client pays?', 'Mark the invoice paid in your dashboard and every pending reminder for it stops immediately. Nothing further is sent for that invoice.'],
    ['Can I pause chasing one client?', 'Yes. Pause any invoice while a query is being sorted out. Paused invoices send nothing until you resume them.'],
    ['Do I need accounting software?', 'No. Invoices are typed in or imported from a CSV. No Xero, QuickBooks, or other integration is required.'],
    ['What if a client replies to a reminder?', 'Replies go to your own email inbox (reminders are sent from your business). If a client promises payment or disputes the invoice, pause it from your dashboard.'],
    ['Can a reminder be sent twice by mistake?', 'No. Every reminder is recorded as sent the moment it goes out, and the daily job only ever picks up reminders still marked pending.'],
    ['Is there a free plan?', 'Yes — 3 active invoices, free, with the full sequence and templates. Starter ($19/month, 25 invoices) and Pro ($49/month, 100 invoices) are paid from the payment page in USDT on BNB Smart Chain; the plan activates automatically once the payment is verified on-chain.'],
    ['Will you show ads?', 'Not in this version. If display advertising is added later, it will appear only on public pages like this one — never inside your private dashboard, login, signup, settings, or payment pages.'],
  ];
  const jsonld = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qa.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  });
  return layout('Frequently asked questions', `
  <h1>Frequently asked questions</h1>
  <div class="card"><h3>Does Invoice Chaser touch my money?</h3><p>For your clients' money: no. Invoice Chaser never holds client funds or takes a cut — clients pay you through your own payment link or bank details. The only payment Invoice Chaser itself takes is your plan subscription, paid in USDT on BNB Smart Chain.</p></div>
  <div class="card"><h3>What happens when a client pays?</h3><p>Mark the invoice paid in your dashboard and every pending reminder for it stops immediately. Nothing further is sent for that invoice.</p></div>
  <div class="card"><h3>Can I pause chasing one client?</h3><p>Yes. Pause any invoice while a query is being sorted out. Paused invoices send nothing until you resume them.</p></div>
  <div class="card"><h3>Do I need accounting software?</h3><p>No. Invoices are typed in or imported from a CSV. No Xero, QuickBooks, or other integration is required.</p></div>
  <div class="card"><h3>What if a client replies to a reminder?</h3><p>Replies go to your own email inbox (reminders are sent from your business). If a client promises payment or disputes the invoice, pause it from your dashboard — automatic reply classification is a planned feature, not a v1 promise.</p></div>
  <div class="card"><h3>Can a reminder be sent twice by mistake?</h3><p>No. Every reminder is recorded as sent the moment it goes out, and the daily job only ever picks up reminders still marked pending.</p></div>
  <div class="card"><h3>Is there a free plan?</h3><p>Yes — 3 active invoices, free, with the full sequence and templates. Starter ($19/month, 25 invoices) and Pro ($49/month, 100 invoices) are paid from the <a href="/pay">payment page</a> in USDT on BNB Smart Chain; the plan activates automatically once the payment is verified on-chain.</p></div>
  <div class="card"><h3>Will you show ads?</h3><p>Not in this version. If display advertising is added later, it will appear only on public pages like this one — never inside your private dashboard, login, signup, settings, or payment pages.</p></div>`, '/faq', {
    description: 'Invoice Chaser FAQ: does it touch your money, what happens when a client pays, pausing one client, accounting software, duplicate reminders, and the free plan.',
    jsonld,
  });
}

export function aboutPage() {
  return layout('About', `
  <h1>About Invoice Chaser</h1>
  <p>Invoice Chaser exists for one frustrating, ordinary problem: freelancers and solo trades send an invoice, then forget — or dread — the follow-up, while the money sits unpaid. Accounting tools generate the invoice and stop; this tool handles what happens after it.</p>
  <p>It is a small, focused product: one workflow (remind, escalate, stop when paid), email only, no per-customer service, no money movement between you and your clients. It is built for people who work from a phone and a spreadsheet, not a finance department.</p>`, '/about', {
    description: 'About Invoice Chaser: automatic invoice reminders for freelancers and solo trades — one workflow (remind, escalate, stop when paid), email only.',
  });
}

export function contactPage() {
  return layout('Contact', `
  <h1>Contact</h1>
  <p>Questions, feedback, or a bug to report? Send a message and it is stored for the site owner to read.</p>
  <form method="post" action="/api/contact" id="contactForm">
    <label for="name">Name</label><input id="name" name="name" required>
    <label for="email">Email</label><input id="email" name="email" type="email" required>
    <label for="message">Message</label><textarea id="message" name="message" rows="5" required></textarea>
    <p><button class="btn" type="submit">Send message</button></p>
  </form>
  <p id="contactResult"></p>
  <script>
  document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    var res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: document.getElementById('name').value, email: document.getElementById('email').value, message: document.getElementById('message').value }) });
    document.getElementById('contactResult').textContent = res.ok ? 'Thanks — your message was received.' : 'Something went wrong. Please try again.';
    if (res.ok) e.target.reset();
  });
  </script>`, '/contact');
}

export function privacyPage() {
  return layout('Privacy', `
  <h1>Privacy</h1>
  <p><strong>What we collect.</strong> Your account email, business name, and the invoices you enter (client names, client emails, amounts, due dates, and any pay link you paste). We also store the reminders we send on your behalf and your email templates.</p>
  <p><strong>What we never do.</strong> We never process payments, hold your money, or sell your data. Your clients' details are used only to send the reminders you asked for.</p>
  <p><strong>Cookies.</strong> We use one strictly necessary cookie to keep you signed in. We do not use tracking cookies in this version.</p>
  <p><strong>Future advertising.</strong> If display advertising (for example Google AdSense) is enabled later, Google and its partners may use cookies to serve ads on public pages of this site. Those cookies will never be used inside private pages (dashboard, login, signup, settings), and this page will be updated before any ad code goes live.</p>
  <p><strong>Deletion.</strong> Delete an invoice and it is gone from your dashboard. To delete your whole account, contact us through the contact page.</p>`, '/privacy');
}

export function loginPage(error) {
  return layout('Sign in', `
  <h1>Sign in</h1>
  ${error ? '<div class="note">' + esc(error) + '</div>' : ''}
  <form method="post" action="/api/auth/login">
    <label for="email">Email</label><input id="email" name="email" type="email" required>
    <label for="password">Password</label><input id="password" name="password" type="password" required>
    <p><button class="btn" type="submit">Sign in</button></p>
  </form>
  <p>No account yet? <a href="/signup">Create a free account</a>.</p>`, '/login', { robots: 'noindex, follow' });
}

export function signupPage(error) {
  return layout('Create your free account', `
  <h1>Create your free account</h1>
  <p>Free for up to 3 active invoices. No card required.</p>
  ${error ? '<div class="note">' + esc(error) + '</div>' : ''}
  <form method="post" action="/api/auth/signup">
    <label for="email">Email</label><input id="email" name="email" type="email" required>
    <label for="business">Business name</label><input id="business" name="business" required>
    <label for="password">Password (at least 8 characters)</label><input id="password" name="password" type="password" required minlength="8">
    <p><button class="btn" type="submit">Create account</button></p>
  </form>
  <p>Already have an account? <a href="/login">Sign in</a>.</p>`, '/signup', { robots: 'noindex, follow' });
}

function articleJsonld(path, headline, description) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    author: { '@type': 'Organization', name: 'Invoice Chaser', url: SITE_URL + '/' },
    publisher: { '@type': 'Organization', name: 'Invoice Chaser', url: SITE_URL + '/' },
    mainEntityOfPage: SITE_URL + path,
  });
}

export function blogIndexPage() {
  return layout('Guides for getting paid', `
  <h1>Guides for getting paid</h1>
  <p>Practical guides for freelancers and solo trades on chasing unpaid invoices without losing the client — or your temper.</p>
  <div class="card"><h3><a href="/blog/payment-reminder-email">How to write a payment reminder email that actually gets paid</a></h3><p>The five parts every reminder needs, subject lines that get opened, and the tone ladder from friendly nudge to final notice.</p></div>
  <div class="card"><h3><a href="/blog/client-not-paying">What to do when a client doesn't pay your invoice</a></h3><p>Work through the steps in order: check the boring stuff first, remind, call, set a deadline, pause work — and what to do before the next invoice so it doesn't happen again.</p></div>
  <div class="card"><h3><a href="/blog/invoice-reminder-templates">Invoice reminder email templates for freelancers</a></h3><p>Three ready-to-use templates — day 7 polite, day 14 firmer, day 30 final — with the placeholders explained and tips for making them sound like you.</p></div>`, '/blog', {
    description: 'Guides for freelancers and solo trades on getting paid: payment reminder emails, what to do when a client does not pay, and ready-to-use templates.',
  });
}

export function articlePaymentReminderEmail() {
  const path = '/blog/payment-reminder-email';
  const headline = 'How to write a payment reminder email that actually gets paid';
  const description = 'A payment reminder email works when it is polite, specific, and makes paying easy. Here are the five parts every reminder needs, plus a full example.';
  return layout(headline, `
  <h1>${headline}</h1>
  <p>Most late payments are not disputes. The client meant to pay, the invoice slipped down their inbox, and nobody followed up. A good reminder email fixes exactly that — it jogs the memory, removes every obstacle to paying, and keeps the relationship intact. A bad one does the opposite: it sounds angry, vague, or accusatory, and the client puts it off again.</p>
  <h2>Why most reminders fail</h2>
  <p>Three common faults kill otherwise fair reminders. First, vagueness: an email that says "just checking in on my invoice" without an amount, a date, or an invoice number forces the client to go digging — and they will do it later, which means never. Second, no clear action: if there is no pay link or payment instruction, even a willing client has to work out how to pay. Third, the wrong tone: opening with a threat on the first reminder burns goodwill you may need later, while being too apologetic about asking for your own money signals that payment is optional. It is not.</p>
  <h2>The five parts of a reminder that works</h2>
  <p><strong>1. A subject line that says what it is.</strong> "Friendly reminder: invoice $100 was due 10 November" beats "Quick question" every time. The client should know in one glance what the email is about and whether it needs them today.</p>
  <p><strong>2. A friendly opener that assumes the best.</strong> "Just a friendly nudge — this may simply have been forgotten" costs nothing and keeps the door open. Assume forgetfulness, not bad faith, until you have evidence otherwise.</p>
  <p><strong>3. The facts, all in one place.</strong> Invoice number, amount, due date. Never make the client search for these. One line is enough: "Invoice INV-014, $100, due 10 November."</p>
  <p><strong>4. One clear action.</strong> A single pay link, or one set of payment instructions. If you give three ways to pay and a paragraph of bank details, you have given them a reason to postpone.</p>
  <p><strong>5. A polite close with an out.</strong> "If you have already paid, please ignore this message" removes the embarrassment of a client who paid yesterday. End with your name and business, not a legal threat.</p>
  <h2>The tone ladder: day 7, day 14, day 30</h2>
  <p>One reminder is rarely the whole story. A sequence works better than a single email because it escalates gradually. Day 7 is a polite nudge that assumes forgetfulness. Day 14 is firmer: it states the invoice is now overdue and asks for payment or a reply. Day 30 is a final notice: it asks for payment now or a payment plan, and it is the right place — the only place — to mention next steps. Sending the day 30 tone on day 7 is the fastest way to lose a client; sending the day 7 tone on day 30 is the fastest way to never be paid.</p>
  <h2>A full example (day 7)</h2>
  <div class="card"><p><strong>Subject:</strong> Friendly reminder: invoice $100 was due 10 November</p><p>Hi Sarah,<br><br>Just a friendly nudge — invoice INV-014 for $100 was due on 10 November and we have not seen the payment yet.<br><br>If you have already paid, please ignore this message. Otherwise you can pay here:<br>[your pay link]<br><br>Thanks so much,<br>Alex, Alex Plumbing</p></div>
  <h2>Mistakes to avoid</h2>
  <p>Do not threaten consequences in the first reminder. Do not copy in the client's boss or team to apply pressure — it embarrasses people and rarely speeds payment. Do not send the same email twice because you forgot you sent it; duplicate reminders make you look disorganised and train clients to ignore you. And do not chase by email forever: if two written reminders get no reply, a short phone call resolves what email cannot, because it is much harder to ignore a person than an inbox.</p>
  <h2>Make it automatic</h2>
  <p>The hardest part of reminders is not writing one — it is sending the second and third on time, every time, for every invoice. That is what Invoice Chaser does: you add the invoice once, and the day 7, 14 and 30 reminders go out on schedule in your own words, with your own pay link in every message. The free plan covers 3 active invoices, and you can <a href="/signup">start free here</a>. The full set of default templates is on the <a href="/templates">sample templates page</a>.</p>
  <p>Related: <a href="/blog/client-not-paying">What to do when a client doesn't pay your invoice</a> · <a href="/blog/invoice-reminder-templates">Invoice reminder email templates for freelancers</a></p>`, path, { description, jsonld: articleJsonld(path, headline, description) });
}

export function articleClientNotPaying() {
  const path = '/blog/client-not-paying';
  const headline = "What to do when a client doesn't pay your invoice";
  const description = 'When a client does not pay: check the boring stuff, remind politely, call, set a firm deadline, pause work, and prevent it next time.';
  return layout(headline, `
  <h1>${headline}</h1>
  <p>An unpaid invoice is stressful because it mixes money with a relationship. The way through it is to work the steps in order, from the least confrontational to the firmest, and to give each step a fair chance before moving on. Jumping straight to threats feels satisfying for an afternoon and usually costs you the client and the payment both.</p>
  <h2>Step 0: check the boring stuff first</h2>
  <p>Before you assume bad faith, rule out the unglamorous causes. Did the invoice actually reach the right person — not a general inbox, not an ex-employee? Is the amount right, and does it match what was quoted? Did you include how to pay? A surprising share of "unpaid" invoices turn out to be an email in spam, an invoice sent to the wrong address, or a client waiting on a corrected invoice. Fixing one of these takes five minutes and saves weeks.</p>
  <h2>Step 1: send a polite reminder (around day 7)</h2>
  <p>Send a short, friendly reminder with the invoice number, amount, due date, and a pay link. Assume it was forgotten. Most late payments resolve right here — which is why a reminder sequence matters more than any single dramatic action. If you want the wording, see <a href="/blog/payment-reminder-email">how to write a payment reminder email that actually gets paid</a>.</p>
  <h2>Step 2: call them</h2>
  <p>If a second written reminder gets no reply, pick up the phone. A call is harder to ignore than an inbox, and it tells you in two minutes what email cannot: whether there is a query, a cash-flow problem, or simply a busy person who keeps meaning to pay. Stay calm and factual, ask when payment will be made, and write down what they say. A promised date from a call is worth more than three unanswered emails.</p>
  <h2>Step 3: send a firmer written notice with a deadline (around day 14–30)</h2>
  <p>Put it in writing: the amount, the original due date, and a specific date by which payment (or a payment plan) is needed. A deadline turns an open-ended chase into a decision. This is also the point to state, plainly and without anger, what happens next if the deadline passes — for example, that work will pause, or that the matter will be passed on. Only promise consequences you are actually prepared to follow through on.</p>
  <h2>Step 4: pause future work</h2>
  <p>Do not keep delivering work to a client who has not paid for the last job. Pausing is not punishment; it is the natural consequence, and it is often the moment a client finds the money. Tell them clearly that work resumes when the account is current. If the client genuinely cannot pay at once, a written payment plan — dates and amounts — is better than an indefinite wait.</p>
  <h2>Step 5: late fees, only if they were agreed</h2>
  <p>A late fee only helps if it was in your terms or contract before the work started. Adding one after the fact, in anger, usually creates a dispute about the fee instead of payment of the invoice. For the next job, put payment terms in writing up front: due date, what happens if payment is late, and a deposit for larger jobs.</p>
  <h2>Last resorts: mediation and small claims</h2>
  <p>If everything above fails, the remaining routes are mediation or a small-claims process. The rules, limits, and costs vary by country and region, and the effort is only worth it above a certain amount — chasing a small invoice through a court often costs more in time than the invoice is worth. For a large sum, get professional advice before acting rather than relying on general guidance from an article. Keep every email, invoice, and note of every call: a paper trail is what makes any formal route possible.</p>
  <h2>Prevent the next one</h2>
  <p>The cheapest unpaid invoice is the one that never happens. Ask for a deposit on larger jobs. Put payment terms on every invoice. Include a pay link so paying takes one click. And put reminders on a schedule — day 7, day 14, day 30 — instead of relying on memory, because memory is exactly what fails when you are busy doing the work. Invoice Chaser runs that schedule for you; the <a href="/signup">free plan covers 3 active invoices</a>.</p>
  <p>Related: <a href="/blog/payment-reminder-email">How to write a payment reminder email that actually gets paid</a> · <a href="/blog/invoice-reminder-templates">Invoice reminder email templates for freelancers</a></p>`, path, { description, jsonld: articleJsonld(path, headline, description) });
}

export function articleReminderTemplates() {
  const path = '/blog/invoice-reminder-templates';
  const headline = 'Invoice reminder email templates for freelancers';
  const description = 'Three ready-to-use invoice reminder email templates: a polite day 7 nudge, a firmer day 14 follow-up, and a day 30 final notice, with placeholders explained.';
  return layout(headline, `
  <h1>${headline}</h1>
  <p>Copy these, replace the placeholders, and send. They follow the day 7, 14 and 30 sequence: each one is a little firmer than the last, and none of them burns the relationship before it has to. Placeholders: <code>{{client}}</code> is the client name, <code>{{amount}}</code> is the invoice amount, <code>{{due_date}}</code> is the original due date, <code>{{pay_link}}</code> is your payment link, <code>{{business_name}}</code> is your business name.</p>
  <h2>Template 1 — Day 7, polite nudge</h2>
  <div class="card"><p><strong>Subject:</strong> Friendly reminder: invoice {{amount}} was due {{due_date}}</p><p>Hi {{client}},<br><br>Just a friendly nudge — invoice {{amount}} was due on {{due_date}} and we have not seen the payment yet.<br><br>If you have already paid, please ignore this message. Otherwise you can pay here:<br>{{pay_link}}<br><br>Thanks so much,<br>{{business_name}}</p></div>
  <p>Use this for the first reminder, about a week after the due date. The tone assumes forgetfulness, and the "already paid" line saves an embarrassed client from an awkward reply.</p>
  <h2>Template 2 — Day 14, firmer follow-up</h2>
  <div class="card"><p><strong>Subject:</strong> Second reminder: invoice {{amount}} is now overdue</p><p>Hi {{client}},<br><br>This is a second reminder that invoice {{amount}}, due on {{due_date}}, is still unpaid.<br><br>Please arrange payment as soon as you can, or reply to this email if there is an issue with the invoice:<br>{{pay_link}}<br><br>Thanks,<br>{{business_name}}</p></div>
  <p>The change in tone is deliberate: "second reminder" and "still unpaid" signal that this is no longer a nudge, while the invitation to reply catches genuine queries before they become excuses.</p>
  <h2>Template 3 — Day 30, final notice</h2>
  <div class="card"><p><strong>Subject:</strong> Final notice: invoice {{amount}} overdue since {{due_date}}</p><p>Hi {{client}},<br><br>This is a final notice for invoice {{amount}}, which was due on {{due_date}} and remains unpaid.<br><br>Please pay now or contact us urgently to agree a payment plan:<br>{{pay_link}}<br><br>{{business_name}}</p></div>
  <p>Short, direct, and the right place to ask for a payment plan as the alternative to payment. If this gets no reply, the next step is a phone call, not a fourth email — see <a href="/blog/client-not-paying">what to do when a client doesn't pay</a>.</p>
  <h2>How to make them sound like you</h2>
  <p>Swap "Hi" for whatever you normally use. If you are on first-name terms, use the first name; if the client is a company, address the person who approved the work. Keep the facts line intact — amount, due date, pay link — and rewrite the sentences around it in your own voice. One link only: two pay links do not double the chance of payment, they halve the chance the client clicks either. And never send a template without checking the amount and date first; a reminder with the wrong amount destroys your credibility for the whole chase.</p>
  <h2>Use them automatically</h2>
  <p>These three templates are the defaults every Invoice Chaser account starts with, and you can rewrite all of them. Add an invoice once and the day 7, 14 and 30 reminders go out on schedule, in your words, with your pay link. The <a href="/signup">free plan covers 3 active invoices</a>, and the full set lives on the <a href="/templates">sample templates page</a>.</p>
  <p>Related: <a href="/blog/payment-reminder-email">How to write a payment reminder email that actually gets paid</a> · <a href="/blog/client-not-paying">What to do when a client doesn't pay your invoice</a></p>`, path, { description, jsonld: articleJsonld(path, headline, description) });
}

export function reminderEmailGeneratorPage() {
  const jsonld = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Invoice Chaser Reminder Email Generator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: SITE_URL + '/reminder-email-generator',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: 'Generate a polite day 7, firm day 14, and final day 30 invoice reminder email in seconds. Free tool — enter client, amount and due date, copy and send.',
  });
  const body = '<section class="hero"><p class="eyebrow">Free tool</p><h1>Reminder email generator</h1>'
    + '<p style="font-size:19px">Fill in the invoice, pick day 7, 14 or 30, and get a ready-to-send reminder email. Free, no sign-up, nothing leaves your browser.</p></section>'
    + '<section><div class="card" style="max-width:720px">'
    + '<label>Your business name<br><input id="g-biz" type="text" placeholder="e.g. Abhi Designs" style="width:100%;padding:10px;margin:6px 0 12px"></label>'
    + '<label>Client name<br><input id="g-client" type="text" placeholder="e.g. Priya Sharma" style="width:100%;padding:10px;margin:6px 0 12px"></label>'
    + '<label>Invoice number (optional)<br><input id="g-inv" type="text" placeholder="e.g. INV-1042" style="width:100%;padding:10px;margin:6px 0 12px"></label>'
    + '<label>Amount<br><span style="display:flex;gap:8px"><select id="g-cur" style="padding:10px"><option value="$">$ USD</option><option value="£">£ GBP</option><option value="€">€ EUR</option><option value="₹">₹ INR</option></select>'
    + '<input id="g-amt" type="text" placeholder="e.g. 250" style="flex:1;padding:10px;margin:0"></span></label>'
    + '<label style="display:block;margin-top:12px">Due date<br><input id="g-due" type="date" style="width:100%;padding:10px;margin:6px 0 12px"></label>'
    + '<label>Payment link (optional)<br><input id="g-link" type="text" placeholder="e.g. https://pay.example.com/inv-1042" style="width:100%;padding:10px;margin:6px 0 12px"></label>'
    + '<p><button class="btn" onclick="genDay(7)" id="g-d7">Day 7 — polite nudge</button> '
    + '<button class="btn" onclick="genDay(14)" id="g-d14">Day 14 — firmer follow-up</button> '
    + '<button class="btn" onclick="genDay(30)" id="g-d30">Day 30 — final notice</button></p>'
    + '<label>Subject<br><input id="g-subject" type="text" readonly style="width:100%;padding:10px;margin:6px 0 12px;background:#f4f6f8"></label>'
    + '<label>Email<br><textarea id="g-body" rows="12" readonly style="width:100%;padding:10px;margin:6px 0 12px;background:#f4f6f8"></textarea></label>'
    + '<p><button class="btn" onclick="copyEmail()">Copy email</button> <button class="btn" onclick="copySubject()">Copy subject</button></p>'
    + '<p id="g-copied" style="color:#0b6b5e"></p>'
    + '</div>'
    + '<p style="margin-top:16px">Want all three sent automatically at day 7, 14 and 30, without copying anything? <a href="/signup">Start free with Invoice Chaser</a> — 3 active invoices free. Need the invoice itself first? Use the <a href="/invoice-template">free invoice template</a>.</p></section>'
    + '<script>'
    + 'function gval(id){return document.getElementById(id).value.trim();}'
    + 'function genDay(day){'
    + 'var biz=gval("g-biz")||"Your Business";var client=gval("g-client")||"there";var inv=gval("g-inv");'
    + 'var amt=gval("g-amt")||"___";var cur=document.getElementById("g-cur").value;var due=gval("g-due")||"the due date";'
    + 'var link=gval("g-link");var invRef=inv?("invoice "+inv):"your invoice";var amtStr=cur+amt;'
    + 'var subject="",text="";'
    + 'if(day===7){subject="Friendly reminder: "+invRef+" for "+amtStr+" due "+due;'
    + 'text="Hi "+client+",\\n\\nJust a friendly reminder that "+invRef+" for "+amtStr+" was due on "+due+".\\n\\nIf you have already sent payment, please ignore this note — and thank you. If not, you can settle it here:"+(link?(" "+link):"")+"\\n\\nThanks so much,\\n"+biz;}'
    + 'else if(day===14){subject="Follow-up: "+invRef+" for "+amtStr+" is now overdue";'
    + 'text="Hi "+client+",\\n\\nI am following up on "+invRef+" for "+amtStr+", which was due on "+due+" and is now overdue.\\n\\nCould you let me know when payment will be sent? If there is an issue with the invoice, I would rather fix it now than chase it later."+(link?("\\n\\nYou can pay here: "+link):"")+"\\n\\nThanks,\\n"+biz;}'
    + 'else{subject="Final notice: "+invRef+" for "+amtStr+" — action needed";'
    + 'text="Hi "+client+",\\n\\nThis is a final reminder about "+invRef+" for "+amtStr+", due on "+due+".\\n\\nPlease arrange payment within 7 days, or reply with a date you will pay by. If I do not hear from you, I will have to pause further work and consider next steps."+(link?("\\n\\nPayment link: "+link):"")+"\\n\\nRegards,\\n"+biz;}'
    + 'document.getElementById("g-subject").value=subject;document.getElementById("g-body").value=text;'
    + 'document.getElementById("g-copied").textContent="";}'
    + 'function copyText(id,msg){var el=document.getElementById(id);el.select();try{navigator.clipboard.writeText(el.value);}catch(e){document.execCommand("copy");}document.getElementById("g-copied").textContent=msg;}'
    + 'function copyEmail(){copyText("g-body","Email copied — paste it into your mail app and send.");}'
    + 'function copySubject(){copyText("g-subject","Subject copied.");}'
    + 'genDay(7);'
    + '</script>';
  return layout('Free reminder email generator', body, '/reminder-email-generator', {
    description: 'Generate a polite day 7, firm day 14, and final day 30 invoice reminder email in seconds. Free tool — enter client, amount and due date, copy and send.',
    jsonld: jsonld,
  });
}

export function invoiceTemplatePage() {
  const body = '<style>@media print{header,footer,.no-print{display:none !important}main{padding:0}.inv{border:none;box-shadow:none}}</style>'
    + '<section class="hero no-print"><p class="eyebrow">Free tool</p><h1>Free invoice template</h1>'
    + '<p style="font-size:19px">Fill it in below, then print it to PDF or download it as a file. Free, no sign-up, nothing leaves your browser.</p></section>'
    + '<section class="no-print"><div class="card" style="max-width:720px">'
    + '<label>Your business name<br><input id="t-biz" type="text" placeholder="e.g. Abhi Designs" style="width:100%;padding:10px;margin:6px 0 12px"></label>'
    + '<label>Your address / contact<br><input id="t-bizaddr" type="text" placeholder="e.g. Baharampur, West Bengal · you@example.com" style="width:100%;padding:10px;margin:6px 0 12px"></label>'
    + '<label>Client name<br><input id="t-client" type="text" placeholder="e.g. Priya Sharma" style="width:100%;padding:10px;margin:6px 0 12px"></label>'
    + '<label>Client address / contact<br><input id="t-clientaddr" type="text" placeholder="e.g. Client company, city · client@example.com" style="width:100%;padding:10px;margin:6px 0 12px"></label>'
    + '<span style="display:flex;gap:8px"><label style="flex:1">Invoice number<br><input id="t-inv" type="text" placeholder="INV-1042" style="width:100%;padding:10px;margin:6px 0 12px"></label>'
    + '<label style="flex:1">Currency<br><select id="t-cur" style="width:100%;padding:10px;margin:6px 0 12px"><option value="$">$ USD</option><option value="£">£ GBP</option><option value="€">€ EUR</option><option value="₹">₹ INR</option></select></label></span>'
    + '<span style="display:flex;gap:8px"><label style="flex:1">Issue date<br><input id="t-issue" type="date" style="width:100%;padding:10px;margin:6px 0 12px"></label>'
    + '<label style="flex:1">Due date<br><input id="t-due" type="date" style="width:100%;padding:10px;margin:6px 0 12px"></label></span>'
    + '<table id="t-items" style="width:100%;border-collapse:collapse"><tr><th style="text-align:left">Item</th><th>Qty</th><th>Rate</th><th>Amount</th><th></th></tr></table>'
    + '<p><button class="btn" onclick="addRow()">+ Add item</button></p>'
    + '<label>Tax % (optional)<br><input id="t-tax" type="number" value="0" min="0" style="width:100%;padding:10px;margin:6px 0 12px"></label>'
    + '<label>Payment details / notes<br><input id="t-notes" type="text" placeholder="e.g. Pay by bank transfer within 14 days. UPI / account details here." style="width:100%;padding:10px;margin:6px 0 12px"></label>'
    + '<p><button class="btn" onclick="window.print()">Print / Save as PDF</button> <button class="btn" onclick="downloadInvoice()">Download as file</button></p>'
    + '</div></section>'
    + '<section><div class="card inv" id="t-preview" style="max-width:720px"></div>'
    + '<p class="no-print" style="margin-top:16px">Invoice sent? If it goes unpaid, generate the follow-up with the <a href="/reminder-email-generator">free reminder email generator</a> — or let <a href="/signup">Invoice Chaser send all three reminders automatically</a>.</p></section>'
    + '<script>'
    + 'function escHtml(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}'
    + 'function addRow(d,q,r){var tb=document.getElementById("t-items");var tr=document.createElement("tr");'
    + 'tr.innerHTML="<td><input class=\\"it-desc\\" type=\\"text\\" placeholder=\\"Work done\\" value=\\""+(d||"")+"\\" style=\\"width:100%;padding:8px\\"></td>"'
    + '+ "<td><input class=\\"it-qty\\" type=\\"number\\" value=\\""+(q||1)+"\\" min=\\"0\\" style=\\"width:64px;padding:8px\\"></td>"'
    + '+ "<td><input class=\\"it-rate\\" type=\\"number\\" value=\\""+(r||0)+"\\" min=\\"0\\" style=\\"width:88px;padding:8px\\"></td>"'
    + '+ "<td class=\\"it-amt\\" style=\\"padding:8px\\"></td><td><button onclick=\\"this.parentNode.parentNode.remove();recalc();\\">×</button></td>";'
    + 'tb.appendChild(tr);tr.querySelectorAll("input").forEach(function(el){el.addEventListener("input",recalc);});recalc();}'
    + 'function money(n){var c=document.getElementById("t-cur").value;return c+Number(n).toFixed(2);}'
    + 'function recalc(){var rows=document.querySelectorAll("#t-items tr");var sub=0,itemsHtml="";'
    + 'for(var i=1;i<rows.length;i++){var d=rows[i].querySelector(".it-desc").value;var q=parseFloat(rows[i].querySelector(".it-qty").value)||0;var r=parseFloat(rows[i].querySelector(".it-rate").value)||0;var a=q*r;sub+=a;'
    + 'rows[i].querySelector(".it-amt").textContent=money(a);'
    + 'itemsHtml+="<tr><td style=\\"padding:8px;border-top:1px solid #e5e8ec\\">"+escHtml(d)+"</td><td style=\\"padding:8px;border-top:1px solid #e5e8ec\\">"+q+"</td><td style=\\"padding:8px;border-top:1px solid #e5e8ec\\">"+money(r)+"</td><td style=\\"padding:8px;border-top:1px solid #e5e8ec\\">"+money(a)+"</td></tr>";}'
    + 'var tax=parseFloat(document.getElementById("t-tax").value)||0;var taxAmt=sub*tax/100;var total=sub+taxAmt;'
    + 'var p=document.getElementById("t-preview");'
    + 'p.innerHTML="<h2 style=\\"margin-top:0\\">INVOICE</h2><p><b>"+escHtml(document.getElementById("t-biz").value||"Your Business")+"</b><br>"+escHtml(document.getElementById("t-bizaddr").value)+"</p>"'
    + '+ "<p>Bill to:<br><b>"+escHtml(document.getElementById("t-client").value||"Client")+"</b><br>"+escHtml(document.getElementById("t-clientaddr").value)+"</p>"'
    + '+ "<p>Invoice: "+escHtml(document.getElementById("t-inv").value)+" &nbsp;|&nbsp; Issued: "+escHtml(document.getElementById("t-issue").value)+" &nbsp;|&nbsp; Due: "+escHtml(document.getElementById("t-due").value)+"</p>"'
    + '+ "<table style=\\"width:100%;border-collapse:collapse\\"><tr><th style=\\"text-align:left\\">Item</th><th>Qty</th><th>Rate</th><th>Amount</th></tr>"+itemsHtml+"</table>"'
    + '+ "<p style=\\"text-align:right\\">Subtotal: "+money(sub)+"<br>Tax ("+tax+"%): "+money(taxAmt)+"<br><b>Total due: "+money(total)+"</b></p>"'
    + '+ "<p>"+escHtml(document.getElementById("t-notes").value)+"</p>";}'
    + 'function downloadInvoice(){var html="<!DOCTYPE html><html><head><meta charset=\\"utf-8\\"><title>Invoice</title></head><body>"+document.getElementById("t-preview").innerHTML+"</body></html>";'
    + 'var blob=new Blob([html],{type:"text/html"});var a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="invoice.html";a.click();}'
    + 'document.querySelectorAll("#t-biz,#t-bizaddr,#t-client,#t-clientaddr,#t-inv,#t-issue,#t-due,#t-tax,#t-notes").forEach(function(el){el.addEventListener("input",recalc);});'
    + 'document.getElementById("t-cur").addEventListener("change",recalc);'
    + 'addRow("Design work",1,250);addRow("",1,0);'
    + '</script>';
  return layout('Free invoice template', body, '/invoice-template', {
    description: 'Free invoice template for freelancers and solo trades. Fill in your business, client and items, then print to PDF or download — no sign-up needed.',
  });
}
