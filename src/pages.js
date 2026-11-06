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
    ['/templates', 'Sample templates'], ['/reminder-email-generator', 'Free tools'], ['#more-tools', 'More tools'], ['/blog', 'Guides'], ['/faq', 'FAQ'], ['/about', 'About'], ['/contact', 'Contact'],
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
  return '<!DOCTYPE html><html lang="en"><head><!-- Google tag (gtag.js) --><script async src="https://www.googletagmanager.com/gtag/js?id=G-00Q0MX10EP"></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag("js", new Date());gtag("config", "G-00Q0MX10EP");</script><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
    + '<title>' + esc(title) + ' — Invoice Chaser</title><meta name="description" content="' + esc(description) + '">'
    + '<meta name="robots" content="' + robots + '"><link rel="canonical" href="' + canonical + '"><link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2214%22%20fill%3D%22%230b6b5e%22%2F%3E%3Ctext%20x%3D%2232%22%20y%3D%2245%22%20font-size%3D%2238%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%20font-family%3D%22sans-serif%22%20font-weight%3D%22bold%22%3E%E2%9C%93%3C%2Ftext%3E%3C%2Fsvg%3E">' + og + jsonld
    + '<style>' + CSS + '</style></head>'
    + '<body><header><nav class="nav"><a class="logo" href="/"><span class="logo-badge">✓</span>Invoice Chaser</a>' + nav
    + '<a href="/login">Sign in</a><a class="btn" href="/signup">Start free</a></nav></header>'
    + '<main>' + body + '</main>'
    + '<footer><nav class="nav"><span>Invoice Chaser — built for freelancers and solo trades.</span>'
    + '<a href="/privacy">Privacy</a><a href="/about">About</a><a href="/contact">Contact</a></nav>'
    + '<p id="more-tools" style="max-width:1000px;margin:0 auto;padding:0 20px 18px;font-size:14px;color:var(--muted)">Free tools on this site: <a href="/reminder-email-generator">Reminder generator</a> · <a href="/invoice-template">Invoice template</a> · <a href="/late-fee-calculator">Late fee calculator</a> · <a href="/us-late-fee-calculator">US late fee calculator</a> · <a href="/invoice-reminder-email-template">Reminder templates</a> · <a href="/small-business-cash-flow-forecast-template">Cash flow forecast</a><br>More free tools from the same maker: <a href="https://tax.paychaserhq.com/">Income Tax Act 2025 Section Mapper — old section to new section, TDS codes</a> · <a href="https://complaints.paychaserhq.com/">e-Jagriti &amp; RERA Complaint Generator — find your forum, fee and steps</a> · <a href="https://succession.paychaserhq.com/">Succession Certificate &amp; Legal Heir Helper — which certificate, petition draft &amp; court fees</a></p></footer></body></html>';
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
  <p>Invoice Chaser never touches your clients' money. It only sends reminders — your clients pay you through your own Stripe, PayPal, or bank link. The only payment Invoice Chaser itself takes is your plan subscription, paid in USDT on BNB Smart Chain.</p></div>
  <div class="card"><h2 style="margin-top:0">Free tools</h2><p>Six free tools, no sign-up, everything runs in your browser: <a href="/reminder-email-generator">generate a day 7, 14 or 30 reminder email</a>, <a href="/invoice-template">build an invoice</a>, <a href="/late-fee-calculator">work out a late fee</a> on an overdue invoice, use the <a href="/us-late-fee-calculator">US late fee calculator with state caps</a>, copy an <a href="/invoice-reminder-email-template">invoice reminder email template</a>, or plan the next 13 weeks with the <a href="/small-business-cash-flow-forecast-template">small business cash flow forecast template</a>. More free tools from the same maker: the <a href="https://tax.paychaserhq.com/">Income Tax Act 2025 Section Mapper</a>, the <a href="https://complaints.paychaserhq.com/">e-Jagriti &amp; RERA Complaint Generator</a> and the <a href="https://succession.paychaserhq.com/">Succession Certificate &amp; Legal Heir Helper</a>.</p></div><script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","name":"Invoice Chaser","url":"https://paychaserhq.com"},{"@type":"WebSite","name":"Invoice Chaser","url":"https://paychaserhq.com"}]}</script>`, '/', {
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
  </script>`, '/contact', { description: 'Contact Invoice Chaser: questions, feedback, or a bug to report about automatic invoice reminders.' });
}

export function privacyPage() {
  return layout('Privacy', `
  <h1>Privacy</h1>
  <p><strong>What we collect.</strong> Your account email, business name, and the invoices you enter (client names, client emails, amounts, due dates, and any pay link you paste). We also store the reminders we send on your behalf and your email templates.</p>
  <p><strong>What we never do.</strong> We never process payments, hold your money, or sell your data. Your clients' details are used only to send the reminders you asked for.</p>
  <p><strong>Cookies.</strong> We use one strictly necessary cookie to keep you signed in. We do not use tracking cookies in this version.</p>
  <p><strong>Future advertising.</strong> If display advertising (for example Google AdSense) is enabled later, Google and its partners may use cookies to serve ads on public pages of this site. Those cookies will never be used inside private pages (dashboard, login, signup, settings), and this page will be updated before any ad code goes live.</p>
  <p><strong>Deletion.</strong> Delete an invoice and it is gone from your dashboard. To delete your whole account, contact us through the contact page.</p>`, '/privacy', { description: 'Invoice Chaser privacy: what we collect, what we never do, cookies, future advertising, and deletion.' });
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
  <div class="card"><h3><a href="/blog/invoice-reminder-templates">Invoice reminder email templates for freelancers</a></h3><p>Three ready-to-use templates — day 7 polite, day 14 firmer, day 30 final — with the placeholders explained and tips for making them sound like you.</p></div>
  <div class="card"><h3><a href="/blog/late-fee">How to charge a late fee on an unpaid invoice</a></h3><p>Standard rates, what your terms must say, how to calculate the fee, and what to do if the client refuses — with a free calculator.</p></div>`, '/blog', {
    description: 'Guides for freelancers on getting paid: reminder emails, clients who do not pay, templates, and charging late fees.',
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
  <p>The hardest part of reminders is not writing one — it is sending the second and third on time, every time, for every invoice. That is what Invoice Chaser does: you add the invoice once, and the day 7, 14 and 30 reminders go out on schedule in your own words, with your own pay link in every message. The free plan covers 3 active invoices, and you can <a href="/signup">start free here</a>. The full set of default templates is on the <a href="/templates">sample templates page</a>. Or generate a single reminder right now with the <a href="/reminder-email-generator">free reminder email generator</a>.</p>
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
  <p>A late fee only helps if it was in your terms or contract before the work started. Adding one after the fact, in anger, usually creates a dispute about the fee instead of payment of the invoice. For the next job, put payment terms in writing up front: due date, what happens if payment is late, and a deposit for larger jobs. Work out what the fee comes to with the <a href="/late-fee-calculator">free late fee calculator</a>.</p>
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
  <p>These three templates are the defaults every Invoice Chaser account starts with, and you can rewrite all of them. Add an invoice once and the day 7, 14 and 30 reminders go out on schedule, in your words, with your pay link. The <a href="/signup">free plan covers 3 active invoices</a>, and the full set lives on the <a href="/templates">sample templates page</a>. Need just one reminder? Generate it with the <a href="/reminder-email-generator">free reminder email generator</a>.</p>
  <p>Related: <a href="/blog/payment-reminder-email">How to write a payment reminder email that actually gets paid</a> · <a href="/blog/client-not-paying">What to do when a client doesn't pay your invoice</a> · <a href="/invoice-reminder-email-template">Invoice reminder email templates — generator + letter sample</a></p>`, path, { description, jsonld: articleJsonld(path, headline, description) });
}
export function articleLateFee() {
  const path = '/blog/late-fee';
  const headline = 'How to charge a late fee on an unpaid invoice';
  const description = 'How to charge a late fee on an unpaid invoice: standard rates, what your terms must say, how to calculate it, and what to do if the client refuses.';
  return layout(headline, `
  <h1>${headline}</h1>
  <p>A late fee is not a punishment. It is a term you agree up front that puts a price on late payment, so paying on time becomes the cheaper option for the client. Used well, it prevents late payment more than it penalises it. Used badly — invented after the invoice is already late, or set so high it looks like a penalty — it creates a dispute about the fee instead of payment of the invoice.</p>
  <h2>The one rule: agree it first</h2>
  <p>A late fee can usually only be enforced if it was in your terms or contract before the work started. That means the time to set your late fee is now, on your next invoice, not when an invoice is already 60 days overdue. Put it in writing in two places: your contract or quote, and the payment terms on the invoice itself. One sentence is enough, and you can copy one from the <a href="/late-fee-calculator">free late fee calculator</a>.</p>
  <h2>What rate is standard</h2>
  <p>The most common small-business term is 1.5% per month, about 18% a year, often with a flat fee of $25 to $50 on top for being late at all. Some freelancers use 1% a month; some use a flat fee only. Higher rates look aggressive and risk being unenforceable where caps apply. Whatever you choose, apply it consistently — different rates for different clients invite arguments.</p>
  <h2>How to calculate it</h2>
  <p>Most terms work like this: monthly interest on the unpaid balance, pro-rated by day, plus any flat fee, with interest always charged on the original amount and never on earlier fees. The formula is invoice amount times monthly rate times days late divided by 30, plus the flat fee. Example: a $2,000 invoice at 1.5% a month that is 45 days late accrues $45 in interest; with a $25 flat fee, the total late charge is $70 and the client now owes $2,070. Work out your own figures with the <a href="/late-fee-calculator">late fee calculator</a>.</p>
  <h2>Grace periods and part-payments</h2>
  <p>A grace period of a few days is good practice: it covers bank delays and weekends without an argument, and it costs you almost nothing. If a client pays part of the invoice, the fee should apply to the remaining balance only — charging interest on money already received is the fastest way to turn a late payer into a dispute.</p>
  <h2>If the client refuses the fee</h2>
  <p>Do not let the fee become the argument. If a good client pays the invoice but disputes a small fee, waiving the fee once for prompt payment is often worth more than the fee itself. If the client refuses to pay anything, go back to the chase itself: remind, call, set a deadline, pause work. The steps are in <a href="/blog/client-not-paying">what to do when a client does not pay your invoice</a>.</p>
  <h2>Prevent the next one</h2>
  <p>The cheapest late fee is the one you never need. Ask for a deposit on larger jobs, print payment terms and a due date on every invoice, include a payment link, and run reminders on a schedule — day 7, day 14, day 30 — instead of relying on memory. The <a href="/reminder-email-generator">free reminder email generator</a> writes each reminder for you, and Invoice Chaser sends the whole sequence automatically.</p>
  <p>This guide is general information, not legal advice. Late fee caps and statutory interest rules vary by country and region, so check the rules where you and your client are before relying on a rate.</p>
  <p>Related: <a href="/blog/client-not-paying">What to do when a client doesn't pay your invoice</a> · <a href="/blog/payment-reminder-email">How to write a payment reminder email that actually gets paid</a></p>`, path, { description, jsonld: articleJsonld(path, headline, description) });
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
    + '<p style="margin-top:16px">Want all three sent automatically at day 7, 14 and 30, without copying anything? <a href="/signup">Start free with Invoice Chaser</a> — 3 active invoices free. Need the invoice itself first? Use the <a href="/invoice-template">free invoice template</a>. Charging a late fee? Work it out with the <a href="/late-fee-calculator">free late fee calculator</a>. Prefer copy-paste text? See the <a href="/invoice-reminder-email-template">invoice reminder email templates</a>.</p></section>'
    + '<section><h2>How the reminder sequence works</h2><p>One reminder rarely gets an invoice paid; a sequence does. Day 7 is a polite nudge that assumes the payment was forgotten. Day 14 is firmer: it states the invoice is overdue and asks for payment or a reply. Day 30 is a final notice that asks for payment now or a payment plan. Each step escalates only as far as needed, so you do not burn a client relationship on the first email or waste weeks being too polite on the last one.</p><p>Three rules make any reminder work. First, put the facts in one place: invoice number, amount, due date. Second, give one clear action: a single payment link, not three ways to pay. Third, check the amount and date before sending: a reminder with the wrong amount destroys your credibility for the whole chase. This generator writes the email; you copy it and send it. If you want all three sent automatically on schedule, Invoice Chaser does that from your dashboard.</p><h2>Frequently asked questions</h2><h3>Should I send a reminder before the due date?</h3><p>A short heads-up a day or two before is fine for large invoices, but the sequence that matters starts after the due date: day 7, day 14, day 30.</p><h3>What if the client replies to my reminder?</h3><p>Pause the sequence and answer them. A reply usually means a query, a cash-flow problem, or a promised date. All three are resolved faster in conversation than with another email.</p><h3>How many reminders should I send?</h3><p>Three written reminders is the standard: polite, firmer, final. If the third gets no reply, call. A phone call resolves what email cannot.</p><h3>Does this tool send the email for me?</h3><p>No. It generates the text for you to copy into your own mail app. Automatic sending, on schedule, is what the Invoice Chaser app does.</p><script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Should I send a reminder before the due date?","acceptedAnswer":{"@type":"Answer","text":"A short heads-up a day or two before is fine for large invoices, but the sequence that matters starts after the due date: day 7, day 14, day 30."}},{"@type":"Question","name":"What if the client replies to my reminder?","acceptedAnswer":{"@type":"Answer","text":"Pause the sequence and answer them. A reply usually means a query, a cash-flow problem, or a promised date. All three are resolved faster in conversation than with another email."}},{"@type":"Question","name":"How many reminders should I send?","acceptedAnswer":{"@type":"Answer","text":"Three written reminders is the standard: polite, firmer, final. If the third gets no reply, call. A phone call resolves what email cannot."}},{"@type":"Question","name":"Does this tool send the email for me?","acceptedAnswer":{"@type":"Answer","text":"No. It generates the text for you to copy into your own mail app. Automatic sending, on schedule, is what the Invoice Chaser app does."}}]}</script></section>'
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
    + 'function prefill(id,key){var v=new URLSearchParams(window.location.search).get(key);if(v){document.getElementById(id).value=v;}}prefill("g-biz","biz");prefill("g-client","client");prefill("g-inv","inv");prefill("g-amt","amt");prefill("g-due","due");prefill("g-link","link");prefill("g-cur","cur");genDay(7);'
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
    + '<section><h2>What a good invoice includes</h2><p>A good invoice has five things: your business name and contact, the client name and contact, an invoice number, issue and due dates, and itemised work with quantities and rates. Add your payment details and one clear instruction for how to pay: bank transfer, payment link, or both. The template above builds all of this in your browser; print it to PDF or download it as a file.</p><p>Two additions prevent most late payments. First, payment terms on the invoice itself: a due date and, if you charge them, a late-fee clause. Work out the fee with the <a href="/late-fee-calculator">free late fee calculator</a> and paste the clause into your terms. Second, a payment link: invoices with one link get paid faster than invoices that ask the client to work out how to pay. If the invoice still goes unpaid, generate the follow-up with the <a href="/reminder-email-generator">free reminder email generator</a>.</p><h2>Frequently asked questions</h2><h3>Do I need to register a business to use this invoice?</h3><p>No. Freelancers and sole traders can invoice under their own name. Tax registration rules, such as GST or VAT, depend on where you are and how much you earn, so check your local rules.</p><h3>What payment terms should I put on my invoice?</h3><p>Net 14 or Net 30 are the most common. Shorter terms get you paid sooner. Whatever you choose, print the due date on the invoice, not just the term.</p><h3>Should I include a late fee clause?</h3><p>Yes, if you intend to charge one. A late fee can usually only be enforced if it was in your agreed terms before the work started. Add the clause now, not after the invoice is already late.</p><h3>Can I use this template for tax invoices?</h3><p>It covers the standard fields, but tax invoices have specific requirements that vary by country. Check what your tax authority requires before relying on it for a tax invoice.</p><script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Do I need to register a business to use this invoice?","acceptedAnswer":{"@type":"Answer","text":"No. Freelancers and sole traders can invoice under their own name. Tax registration rules, such as GST or VAT, depend on where you are and how much you earn, so check your local rules."}},{"@type":"Question","name":"What payment terms should I put on my invoice?","acceptedAnswer":{"@type":"Answer","text":"Net 14 or Net 30 are the most common. Shorter terms get you paid sooner. Whatever you choose, print the due date on the invoice, not just the term."}},{"@type":"Question","name":"Should I include a late fee clause?","acceptedAnswer":{"@type":"Answer","text":"Yes, if you intend to charge one. A late fee can usually only be enforced if it was in your agreed terms before the work started. Add the clause now, not after the invoice is already late."}},{"@type":"Question","name":"Can I use this template for tax invoices?","acceptedAnswer":{"@type":"Answer","text":"It covers the standard fields, but tax invoices have specific requirements that vary by country. Check what your tax authority requires before relying on it for a tax invoice."}}]}</script></section>'
    + '<script type="application/ld+json">{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Invoice Chaser invoice template","applicationCategory":"BusinessApplication","operatingSystem":"Web","url":"https://paychaserhq.com/invoice-template","description":"Free invoice template for freelancers: build an invoice with live preview, print to PDF or download."}</script>'
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

export function lateFeeCalculatorPage() {
  const jsonld = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Invoice Chaser Late Fee Calculator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: SITE_URL + '/late-fee-calculator',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: 'Work out the late fee on an overdue invoice: enter the amount, due date and your rate to see the fee and total now due. Free, no sign-up.',
  });
  const body = '<section class="hero"><p class="eyebrow">Free tool</p><h1>Late fee calculator</h1>'
    + '<p style="font-size:19px">Work out what a late-paying client owes. Enter the invoice amount, due date and your late-fee terms — free, no sign-up, nothing leaves your browser.</p></section>'
    + '<section><div class="card" style="max-width:720px">'
    + '<label>Invoice amount<br><span style="display:flex;gap:8px"><select id="l-cur" style="padding:10px"><option value="$">$ USD</option><option value="£">£ GBP</option><option value="€">€ EUR</option><option value="₹">₹ INR</option></select>'
    + '<input id="l-amt" type="number" min="0" placeholder="e.g. 2500" style="flex:1;padding:10px;margin:0"></span></label>'
    + '<label style="display:block;margin-top:12px">Due date<br><input id="l-due" type="date" style="width:100%;padding:10px;margin:6px 0 12px"></label>'
    + '<span style="display:flex;gap:8px"><label style="flex:1">Late fee (% per month)<br><input id="l-rate" type="number" value="1.5" min="0" step="0.1" style="width:100%;padding:10px;margin:6px 0 12px"></label>'
    + '<label style="flex:1">Flat late fee (optional)<br><input id="l-flat" type="number" value="0" min="0" style="width:100%;padding:10px;margin:6px 0 12px"></label></span>'
    + '<label>Grace days (optional)<br><input id="l-grace" type="number" value="0" min="0" style="width:100%;padding:10px;margin:6px 0 12px"></label>'
    + '<p><button class="btn" onclick="calcLate()">Calculate late fee</button></p>'
    + '<div id="l-results"></div>'
    + '<label>Copyable clause for your payment terms<br><textarea id="l-clause" rows="3" readonly style="width:100%;padding:10px;margin:6px 0 12px;background:#f4f6f8"></textarea></label>'
    + '<p><button class="btn" onclick="copyClause()">Copy clause</button> <span id="l-copied" style="color:#0b6b5e"></span></p>'
    + '<p style="font-size:14px;color:#555">This calculator does the arithmetic only — it is not legal or financial advice. A late fee can usually only be charged if it was in your agreed terms before the work started, and many places cap the rate, so check the limits where you and your client are.</p>'
    + '</div>'
    + '<p style="margin-top:16px">Fee worked out? Send the follow-up with the <a href="/reminder-email-generator">free reminder email generator</a>, or let <a href="/signup">Invoice Chaser chase it automatically at day 7, 14 and 30</a>. Need the invoice itself? Use the <a href="/invoice-template">free invoice template</a>. Charging a US client? Use the <a href="/us-late-fee-calculator">US late fee calculator with state caps and a built-in reminder email</a>.</p></section>'
    + '<section><h2>How a late fee is calculated</h2><p>Most freelance late fees have two parts: a monthly percentage on the unpaid balance and, sometimes, a flat fee for being late at all. This calculator charges the monthly rate pro-rated by day: a $2,000 invoice at 1.5% a month that is 45 days late accrues $45 in interest. The flat fee is added once, only if the invoice is past its grace period. Interest here is simple, never compounded: it is always charged on the original invoice amount, never on earlier fees.</p><p>The most common small-business term is 1.5% a month, about 18% a year, often with a flat $25 to $50 on top. Whatever you choose, it only works if it was in your agreed terms before the work started. A fee invented after the invoice is already late usually creates a dispute about the fee instead of payment of the invoice. Caps and statutory interest rules vary by country and, in the US, by state, so check the limits where you and your client are.</p><h2>Frequently asked questions</h2><h3>What is a standard late fee for a freelancer?</h3><p>1.5% per month is the most common term, often with a flat fee of $25 to $50 on top. Some contracts use 1% a month. Higher rates risk being unenforceable where caps apply.</p><h3>Can I charge a late fee if it was not in my terms?</h3><p>Usually not as a contract fee. If your terms said nothing about late fees, ask for payment first and add the term to your next invoice. Some places give statutory interest by law even without a term, so check the rules where you are.</p><h3>Does the late fee compound?</h3><p>In this calculator, no. Interest is simple and always calculated on the original invoice amount. If your contract says interest compounds, the real figure will be higher.</p><h3>What if the client pays part of the invoice?</h3><p>This calculator assumes the whole invoice is unpaid. For a partial payment, enter the remaining balance as the invoice amount to work out the fee on what is still owed.</p><script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is a standard late fee for a freelancer?","acceptedAnswer":{"@type":"Answer","text":"1.5% per month is the most common term, often with a flat fee of $25 to $50 on top. Some contracts use 1% a month. Higher rates risk being unenforceable where caps apply."}},{"@type":"Question","name":"Can I charge a late fee if it was not in my terms?","acceptedAnswer":{"@type":"Answer","text":"Usually not as a contract fee. If your terms said nothing about late fees, ask for payment first and add the term to your next invoice. Some places give statutory interest by law even without a term, so check the rules where you are."}},{"@type":"Question","name":"Does the late fee compound?","acceptedAnswer":{"@type":"Answer","text":"In this calculator, no. Interest is simple and always calculated on the original invoice amount. If your contract says interest compounds, the real figure will be higher."}},{"@type":"Question","name":"What if the client pays part of the invoice?","acceptedAnswer":{"@type":"Answer","text":"This calculator assumes the whole invoice is unpaid. For a partial payment, enter the remaining balance as the invoice amount to work out the fee on what is still owed."}}]}</script></section>'
    + '<script>'
    + 'function lnum(id,def){var v=parseFloat(document.getElementById(id).value);return isNaN(v)?def:v;}'
    + 'function lmoney(n){var c=document.getElementById("l-cur").value;return c+Number(n).toFixed(2);}'
    + 'function calcLate(){'
    + 'var amt=lnum("l-amt",0);var rate=lnum("l-rate",1.5);var flat=lnum("l-flat",0);var grace=Math.max(0,Math.floor(lnum("l-grace",0)));'
    + 'var dueStr=document.getElementById("l-due").value;var res=document.getElementById("l-results");'
    + 'if(!amt||!dueStr){res.innerHTML="<p>Enter an invoice amount and a due date to calculate.</p>";return;}'
    + 'var due=new Date(dueStr+"T00:00:00Z");var today=new Date();today.setUTCHours(0,0,0,0);'
    + 'var daysOver=Math.floor((today-due)/86400000);'
    + 'var chargeable=Math.max(0,daysOver-grace);'
    + 'var interest=amt*(rate/100)*(chargeable/30);var fee=chargeable>0?flat:0;var total=amt+interest+fee;'
    + 'var html="<p>Days overdue: <b>"+daysOver+"</b><br>Chargeable days (after "+grace+" grace day(s)): <b>"+chargeable+"</b><br>Interest at "+rate+"% per month, pro-rated daily: <b>"+lmoney(interest)+"</b><br>Flat late fee: <b>"+lmoney(fee)+"</b><br>Total late charges: <b>"+lmoney(interest+fee)+"</b><br><b>Total now due: "+lmoney(total)+"</b></p>";'
    + 'if(daysOver<=0){html="<p>This invoice is not overdue yet — it is due on "+dueStr+".</p>"+html;}'
    + 'res.innerHTML=html;'
    + 'var clause="Payment due within 30 days of the invoice date. Invoices unpaid after the due date incur a late fee of "+rate+"% per month (pro-rated daily)"+(flat>0?(" plus a flat fee of "+lmoney(flat)):"")+" after a grace period of "+grace+" day(s).";'
    + 'document.getElementById("l-clause").value=clause;document.getElementById("l-copied").textContent="";}'
    + 'function copyClause(){var el=document.getElementById("l-clause");el.select();try{navigator.clipboard.writeText(el.value);}catch(e){document.execCommand("copy");}document.getElementById("l-copied").textContent="Clause copied — paste it into your payment terms.";}'
    + 'function lprefill(id,key){var v=new URLSearchParams(window.location.search).get(key);if(v){document.getElementById(id).value=v;}}lprefill("l-amt","amt");lprefill("l-due","due");lprefill("l-rate","rate");lprefill("l-flat","flat");lprefill("l-grace","grace");lprefill("l-cur","cur");calcLate();'
    + '</script>';
  return layout('Free late fee calculator', body, '/late-fee-calculator', {
    description: 'Free late fee calculator for freelancers. Enter the amount, due date and your rate to work out the late fee and total now due — no sign-up.',
    jsonld: jsonld,
  });
}

// US state late-fee caps. Single source of truth for the table and the
// state selector below. Filled from research:
// ~/workspace/keyword-mining/us-state-late-fee-caps.json
// Fields: state, code, cap (max contract rate %/yr, or null), statutory
// (default rate %/yr when no term agreed, or null), note, status
// ('verified' = 2+ sources agree, 'single-source', 'unverified',
// 'no-cap-found'). NEVER guess a number: unverified states show '—'.
const US_STATE_CAPS = [
  {"state": "Alabama", "code": "AL", "cap": 8, "statutory": 6, "note": "No late-fee cap; 8% ceiling on agreed interest in written loan/forbearance contracts (any rate allowed on $2,000+).", "status": "verified"},
  {"state": "Alaska", "code": "AK", "cap": 10, "statutory": 10.5, "note": "No cap on flat late fees; agreed interest capped at the greater of 10% or 5 pts over the 12th Federal Reserve District rate (contracts over $25,000 exempt).", "status": "verified"},
  {"state": "Arizona", "code": "AZ", "cap": null, "statutory": 10, "note": "No late-fee cap; parties may agree any interest rate in writing; a fee must be a reasonable estimate of loss, not a penalty.", "status": "verified"},
  {"state": "Arkansas", "code": "AR", "cap": 17, "statutory": 6, "note": "No cap on flat late fees; 17% constitutional ceiling on contract interest.", "status": "verified"},
  {"state": "California", "code": "CA", "cap": null, "statutory": 10, "note": "No late-fee cap; usury does not reach late charges on overdue invoices for goods sold on credit.", "status": "verified"},
  {"state": "Colorado", "code": "CO", "cap": 45, "statutory": 8, "note": "No cap on flat late fees; agreed interest in a written instrument capped at 45%/yr.", "status": "verified"},
  {"state": "Connecticut", "code": "CT", "cap": 12, "statutory": 8, "note": "No late-fee cap; 12% ceiling on interest on loans of money (no maximum on loans over $10,000).", "status": "verified"},
  {"state": "Delaware", "code": "DE", "cap": null, "statutory": null, "note": "No late-fee cap; agreed interest limited to the Federal Reserve discount rate + 5 pts (floating); corporations/LLCs cannot plead usury; loans over $100,000 uncapped. Both the cap and the default rate are the same floating formula (Fed discount rate + 5 pts); no fixed number can be given.", "status": "verified"},
  {"state": "District of Columbia", "code": "DC", "cap": 24, "statutory": 6, "note": "No cap on flat late fees; 24%/yr cap on interest on a written payment instrument (business loans over $2,500 exempt; whether an ordinary invoice counts is unsettled).", "status": "single-source"},
  {"state": "Florida", "code": "FL", "cap": 18, "statutory": 7.87, "note": "No cap on flat late fees; 18%/yr usury ceiling on interest (25% criminal threshold on loans over $500,000); 5% delinquency charge allowed on commercial installment contracts.", "status": "verified"},
  {"state": "Georgia", "code": "GA", "cap": 18, "statutory": 7, "note": "Late-fee rule: up to 1.5%/month (18%/yr) on commercial-account balances 30+ days overdue.", "status": "verified"},
  {"state": "Hawaii", "code": "HI", "cap": null, "statutory": 10, "note": "No late-fee cap; written contracts may set any rate not prohibited for non-consumer credit.", "status": "verified"},
  {"state": "Idaho", "code": "ID", "cap": null, "statutory": 12, "note": "No late-fee cap; written contracts may set their own rate.", "status": "verified"},
  {"state": "Illinois", "code": "IL", "cap": 9, "statutory": 5, "note": "No cap on flat late fees; 9%/yr ceiling on interest in written contracts unless an exemption applies (corporation loans, wholesaler-retailer credit, business loans).", "status": "verified"},
  {"state": "Indiana", "code": "IN", "cap": null, "statutory": 8, "note": "No late-fee cap; interest caps cover consumer credit only.", "status": "verified"},
  {"state": "Iowa", "code": "IA", "cap": null, "statutory": 5, "note": "No late-fee cap; business credit may agree any rate in writing and cannot plead usury.", "status": "verified"},
  {"state": "Kansas", "code": "KS", "cap": null, "statutory": 10, "note": "No late-fee cap; the 15% written-contract interest limit does not apply to business transactions.", "status": "verified"},
  {"state": "Kentucky", "code": "KY", "cap": 19, "statutory": 8, "note": "No cap on flat late fees; written interest limited to the lesser of 19% or 4 pts over the 90-day commercial-paper rate on amounts $15,000 or less (no limit above $15,000).", "status": "verified"},
  {"state": "Louisiana", "code": "LA", "cap": null, "statutory": 7.5, "note": "No late-fee cap; commercial debts are exempt from the 12% contract-interest limit.", "status": "verified"},
  {"state": "Maine", "code": "ME", "cap": null, "statutory": null, "note": "No late-fee cap; parties may agree any finance charge on non-consumer credit. No automatic invoice rate: with no interest term, a court awards prejudgment interest at the 1-year Treasury bill rate + 3% (except small claims).", "status": "verified"},
  {"state": "Maryland", "code": "MD", "cap": null, "statutory": 6, "note": "No late-fee cap; the fee must state its amount, when it applies and when it is charged — a disclosed fee is not treated as interest or a penalty.", "status": "verified"},
  {"state": "Massachusetts", "code": "MA", "cap": 20, "statutory": 6, "note": "No late-fee cap; 20%/yr criminal-usury line on loans (AG-notice exception); unsettled whether it reaches invoice late fees.", "status": "verified"},
  {"state": "Michigan", "code": "MI", "cap": 25, "statutory": 5, "note": "No late-fee cap; 25% criminal-usury line for business credit; 7% ceiling on written interest excluding credit-sale time-price differentials.", "status": "verified"},
  {"state": "Minnesota", "code": "MN", "cap": null, "statutory": 6, "note": "No late-fee cap and no interest/fee limit on credit to a corporation, LLC, partnership or other organization.", "status": "verified"},
  {"state": "Mississippi", "code": "MS", "cap": 10, "statutory": 8, "note": "No cap on obligations over $2,000; for $2,000 or less, a written rate is limited to the greater of 10%/yr or 5 pts over the Fed discount rate on 90-day commercial paper.", "status": "single-source"},
  {"state": "Missouri", "code": "MO", "cap": null, "statutory": 9, "note": "No late-fee cap; parties may agree any rate, fee or charge on business/commercial credit.", "status": "verified"},
  {"state": "Montana", "code": "MT", "cap": 18, "statutory": 10, "note": "Late-charge rule: up to 1.5%/month (18%/yr) on goods sold at retail, from 30 days (services not covered).", "status": "single-source"},
  {"state": "Nebraska", "code": "NE", "cap": 16, "statutory": 12, "note": "Open-account charges up to 1 1/3%/month (16%/yr) on balances unpaid 30+ days after statement; the 16% ceiling does not apply to corporations, partnerships, LLCs or trusts.", "status": "single-source"},
  {"state": "Nevada", "code": "NV", "cap": null, "statutory": 8.75, "note": "No late-fee cap; parties may agree any rate and fees in writing.", "status": "verified"},
  {"state": "New Hampshire", "code": "NH", "cap": null, "statutory": 10, "note": "No late-fee cap; 10%/yr legal rate for business transactions unless the parties agree otherwise in writing.", "status": "verified"},
  {"state": "New Jersey", "code": "NJ", "cap": 16, "statutory": 6, "note": "No late-fee cap for corporations, LLCs or LLPs; 16%/yr ceiling on written loan interest (those entities cannot plead usury; loans $50,000+ exempt).", "status": "single-source"},
  {"state": "New Mexico", "code": "NM", "cap": 15, "statutory": 15, "note": "No late-fee cap for business-entity debtors; for other debtors, open-account interest limited to 15%/yr from 30 days after last delivery unless a higher rate is agreed.", "status": "verified"},
  {"state": "New York", "code": "NY", "cap": 16, "statutory": 9, "note": "No late-fee cap (charge must be a reasonable estimate of loss); 16% civil-usury ceiling on loans/forbearances, 25% criminal threshold; corporations cannot raise civil usury as a defense.", "status": "verified"},
  {"state": "North Carolina", "code": "NC", "cap": null, "statutory": 8, "note": "No late-fee cap; limits on late charges cover loans/open-end credit, not exempt loans (credit to non-natural persons and business-purpose credit).", "status": "verified"},
  {"state": "North Dakota", "code": "ND", "cap": null, "statutory": 6, "note": "No late-fee cap for most business customers; the interest ceiling (5.5 pts over the average 6-month T-bill rate, minimum 7%) does not apply to corporations, LLCs, cooperatives, trusts, partnerships filing a partnership return, or amounts over $35,000.", "status": "verified"},
  {"state": "Ohio", "code": "OH", "cap": null, "statutory": 7, "note": "No late-fee cap; a fee must be reasonable, not a penalty.", "status": "verified"},
  {"state": "Oklahoma", "code": "OK", "cap": null, "statutory": 6, "note": "No late-fee cap for business invoices; a fixed late fee must be a reasonable estimate of loss.", "status": "single-source"},
  {"state": "Oregon", "code": "OR", "cap": null, "statutory": 9, "note": "No late-fee cap for business invoices.", "status": "single-source"},
  {"state": "Pennsylvania", "code": "PA", "cap": null, "statutory": 6, "note": "No late-fee cap; the 6% interest limit (41 P.S. § 201) covers loans of $50,000 or less and does not apply to business loans of any amount; corporations cannot raise it as a defense.", "status": "verified"},
  {"state": "Rhode Island", "code": "RI", "cap": 21, "statutory": 12, "note": "No late-fee cap; loan interest capped at 21%/yr (or prime + 9 pts if higher), commercial loans over $1,000,000 exempt.", "status": "verified"},
  {"state": "South Carolina", "code": "SC", "cap": null, "statutory": 8.75, "note": "No late-fee cap.", "status": "verified"},
  {"state": "South Dakota", "code": "SD", "cap": 18, "statutory": 15, "note": "Cap on the interest rate shown on an invoice/bill/statement: 18%/yr; written agreements otherwise have no limit; no cap on a flat late fee.", "status": "verified"},
  {"state": "Tennessee", "code": "TN", "cap": 10, "statutory": 10, "note": "No cap on flat late fees; interest limited to 10%/yr, or the weekly formula rate (4 pts over average prime, 24% maximum) with a signed written contract.", "status": "verified"},
  {"state": "Texas", "code": "TX", "cap": 10, "statutory": 6, "note": "No cap on flat late fees; interest limited to 10%/yr unless a written agreement adopts the optional Chapter 303 ceiling (18% for business credit).", "status": "verified"},
  {"state": "Utah", "code": "UT", "cap": null, "statutory": 10, "note": "No late-fee cap; parties may agree any interest rate.", "status": "verified"},
  {"state": "Vermont", "code": "VT", "cap": null, "statutory": 12, "note": "No late-fee cap; corporations and business borrowers may agree rates above the 12% general rate.", "status": "verified"},
  {"state": "Virginia", "code": "VA", "cap": null, "statutory": 6, "note": "No general late-fee cap; Va. Code § 6.2-400 allows up to 5% of an overdue installment if the contract states it (7-day grace; payment within 7 days counts as on time).", "status": "single-source"},
  {"state": "Washington", "code": "WA", "cap": null, "statutory": 12, "note": "No late-fee cap; usury cannot be pleaded on transactions made mainly for business purposes.", "status": "verified"},
  {"state": "West Virginia", "code": "WV", "cap": null, "statutory": 6, "note": "No late-fee cap; corporations, partnerships and LLCs cannot plead usury; usury limits do not apply to business-purpose loans/installment sales.", "status": "verified"},
  {"state": "Wisconsin", "code": "WI", "cap": null, "statutory": 5, "note": "No late-fee cap; the usury limit does not cover business loans or forbearances.", "status": "verified"},
  {"state": "Wyoming", "code": "WY", "cap": null, "statutory": 7, "note": "No late-fee cap; the consumer credit code covers only personal/family/household credit.", "status": "verified"},
];

export function usLateFeeCalculatorPage() {
  const jsonld = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Invoice Chaser US Late Fee Calculator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: SITE_URL + '/us-late-fee-calculator',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: 'Free US late fee calculator for freelancers and small businesses. Work out the late fee on an overdue invoice, check your state\'s cap, copy a late-fee clause and generate the reminder email — no sign-up.',
  });
  const faqJsonld = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Can I charge a late fee on an overdue invoice in the US?', acceptedAnswer: { '@type': 'Answer', text: 'Usually yes, if the late fee was in your agreed payment terms before the work started. A fee invented after the invoice is already late is hard to enforce. Some states also give statutory interest by law even without a term — check your state in the table below.' } },
      { '@type': 'Question', name: 'What is a normal late fee for a freelancer in the US?', acceptedAnswer: { '@type': 'Answer', text: '1% to 2% per month is the normal range, with 1.5% a month the most common term, often with a flat $25 to $50 fee on top. Above 2% a month is unusual and may not be enforceable in states with caps.' } },
      { '@type': 'Question', name: 'How is the late fee calculated — pro-rated or per month?', acceptedAnswer: { '@type': 'Answer', text: 'Both methods exist. Pro-rated daily divides the monthly rate by 30 and charges for each day late. Per month started charges a full month for any part of a month — a $2,400 invoice at 1.5% a month that is 40 days late costs $48 pro-rated but $72 per month started. Your contract should say which one applies; this calculator shows both.' } },
      { '@type': 'Question', name: 'What is my state\'s late fee cap?', acceptedAnswer: { '@type': 'Answer', text: 'Caps vary by state and many states have no late-fee-specific cap — the contract rate governs, subject to general interest limits. Pick your state in the calculator above to see its cap and statutory rate, or read the full state table below.' } },
      { '@type': 'Question', name: 'Does the late fee compound?', acceptedAnswer: { '@type': 'Answer', text: 'In this calculator, no. Interest is simple and always calculated on the original invoice amount, never on earlier fees. If your contract says interest compounds, the real figure will be higher.' } },
      { '@type': 'Question', name: 'What if the client pays part of the invoice?', acceptedAnswer: { '@type': 'Answer', text: 'This calculator assumes the whole invoice is unpaid. For a partial payment, enter the remaining balance as the invoice amount to work out the fee on what is still owed.' } },
    ],
  });
  const stateOptions = US_STATE_CAPS.map((s) => '<option value="' + s.code + '">' + s.state + '</option>').join('');
  const capRows = US_STATE_CAPS.length === 0
    ? '<tr><td colspan="4">State caps are being verified against official sources and will appear here shortly.</td></tr>'
    : US_STATE_CAPS.map((s) => '<tr><td><b>' + s.state + '</b></td><td>' + (s.cap == null ? '—' : s.cap + '%/yr') + '</td><td>' + (s.statutory == null ? '—' : s.statutory + '%/yr') + '</td><td>' + s.note + (s.status !== 'verified' ? ' <i>(' + s.status + ')</i>' : '') + '</td></tr>').join('');
  const body = '<section class="hero"><p class="eyebrow">Free tool · United States</p><h1>Late fee calculator (US)</h1>'
    + '<p style="font-size:19px">Work out the late fee on an overdue invoice, check your state\'s cap, copy a late-fee clause and generate the reminder email — free, no sign-up, nothing leaves your browser.</p></section>'
    + '<section><div class="card" style="max-width:720px">'
    + '<label>Invoice amount (USD)<br><input id="u-amt" type="number" min="0" placeholder="e.g. 2400" style="width:100%;padding:10px;margin:6px 0 12px"></label>'
    + '<label>Due date<br><input id="u-due" type="date" style="width:100%;padding:10px;margin:6px 0 12px"></label>'
    + '<span style="display:flex;gap:8px"><label style="flex:1">Late fee (% per month)<br><input id="u-rate" type="number" value="1.5" min="0" step="0.1" style="width:100%;padding:10px;margin:6px 0 12px"></label>'
    + '<label style="flex:1">Flat late fee (optional)<br><input id="u-flat" type="number" value="0" min="0" style="width:100%;padding:10px;margin:6px 0 12px"></label></span>'
    + '<span style="display:flex;gap:8px"><label style="flex:1">Grace days (optional)<br><input id="u-grace" type="number" value="0" min="0" style="width:100%;padding:10px;margin:6px 0 12px"></label>'
    + '<label style="flex:1">Your state<br><select id="u-state" style="width:100%;padding:10px;margin:6px 0 12px"><option value="">Select a state…</option>' + stateOptions + '</select></label></span>'
    + '<label>How your terms charge interest<br><select id="u-method" style="width:100%;padding:10px;margin:6px 0 12px"><option value="daily">Pro-rated daily (monthly rate ÷ 30 × days late)</option><option value="monthly">Per month started (a full month for any part of a month)</option></select></label>'
    + '<div id="u-capinfo"></div>'
    + '<p><button class="btn" onclick="calcLateUS()">Calculate late fee</button></p>'
    + '<div id="u-results"></div>'
    + '<label>Copyable clause for your payment terms<br><textarea id="u-clause" rows="3" readonly style="width:100%;padding:10px;margin:6px 0 12px;background:#f4f6f8"></textarea></label>'
    + '<p><button class="btn" onclick="copyClauseUS()">Copy clause</button> <span id="u-copied" style="color:#0b6b5e"></span></p>'
    + '<h3 style="margin-top:28px">Generate the reminder email</h3>'
    + '<span style="display:flex;gap:8px"><label style="flex:1">Invoice number (optional)<br><input id="u-inv" type="text" placeholder="e.g. INV-0042" style="width:100%;padding:10px;margin:6px 0 12px"></label>'
    + '<label style="flex:1">Stage<br><select id="u-stage" style="width:100%;padding:10px;margin:6px 0 12px"><option value="friendly">Friendly nudge</option><option value="firm">Firm follow-up</option><option value="final">Final notice</option></select></label></span>'
    + '<p><button class="btn ghost" onclick="genReminderUS()">Generate reminder email</button></p>'
    + '<label>Your reminder email — copy and send<br><textarea id="u-email" rows="10" readonly style="width:100%;padding:10px;margin:6px 0 12px;background:#f4f6f8"></textarea></label>'
    + '<p><button class="btn" onclick="copyEmailUS()">Copy email</button> <span id="u-ecopied" style="color:#0b6b5e"></span></p>'
    + '<p style="font-size:14px;color:#555">This calculator does the arithmetic only — it is not legal or financial advice. A late fee can usually only be charged if it was in your agreed terms before the work started, and many states cap the rate, so check the table below for where you and your client are.</p>'
    + '</div>'
    + '<p style="margin-top:16px">Want all three reminders sent automatically at day 7, 14 and 30, without copying anything? <a href="/signup">Start free with Invoice Chaser</a> — 3 active invoices free. Need the invoice itself? Use the <a href="/invoice-template">free invoice template</a>. Prefer the plain calculator without state caps? Use the <a href="/late-fee-calculator">free late fee calculator</a>.</p></section>'
    + '<section><h2>How a late fee is calculated</h2><p>Most US freelance late fees have two parts: a monthly percentage on the unpaid balance and, sometimes, a flat fee for being late at all. This calculator shows both common methods. Pro-rated daily divides the monthly rate by 30 and charges for each day late: a $2,400 invoice at 1.5% a month that is 40 days late accrues $48. Per month started charges a full month for any part of a month, so the same invoice costs $72 — that is the method BillGrid uses in its worked example. Interest here is simple, never compounded: it is always charged on the original invoice amount, never on earlier fees. The flat fee is added once, only if the invoice is past its grace period.</p><p>The most common small-business term is 1.5% a month, about 18% a year, often with a flat $25 to $50 on top. Whatever you choose, it only works if it was in your agreed terms before the work started. A fee invented after the invoice is already late usually creates a dispute about the fee instead of payment of the invoice. Caps and statutory interest rules vary by state — pick your state above to check yours.</p>'
    + '<h2>Late fee caps by state</h2><p>US states set their own limits. Some cap the contract rate itself; others only set a statutory rate that applies when no rate was agreed, and a few have no specific late-fee cap at all — then the contract rate governs, subject to general interest limits. “—” in the contract-rate column means the state sets no ceiling on business invoices; “—” in the statutory column means no fixed rate exists (Delaware uses a floating formula; Maine has no automatic rate). State caps last checked 6 November 2026.</p>'
    + '<div style="overflow-x:auto"><table><thead><tr><th>State</th><th>Max contract rate</th><th>Statutory rate (no term agreed)</th><th>What it means</th></tr></thead><tbody>' + capRows + '</tbody></table></div>'
    + '<p style="font-size:14px;color:#555">Sources: state statutes and official state pages, Nolo and FindLaw state guides. Figures are for commercial, non-consumer debts; consumer debts and loans often have different caps. In most states the figure shown is a cap on agreed interest, not a cap on a late fee itself — a late fee must be a reasonable estimate of loss, not a penalty. This table is general information, not legal advice — check your state\'s current statute before relying on a figure.</p>'
    + '<h2>Frequently asked questions</h2><h3>Can I charge a late fee on an overdue invoice in the US?</h3><p>Usually yes, if the late fee was in your agreed payment terms before the work started. A fee invented after the invoice is already late is hard to enforce. Some states also give statutory interest by law even without a term — check your state in the table above.</p><h3>What is a normal late fee for a freelancer in the US?</h3><p>1% to 2% per month is the normal range, with 1.5% a month the most common term, often with a flat $25 to $50 fee on top. Above 2% a month is unusual and may not be enforceable in states with caps.</p><h3>How is the late fee calculated — pro-rated or per month?</h3><p>Both methods exist. Pro-rated daily divides the monthly rate by 30 and charges for each day late. Per month started charges a full month for any part of a month — a $2,400 invoice at 1.5% a month that is 40 days late costs $48 pro-rated but $72 per month started. Your contract should say which one applies; this calculator shows both.</p><h3>What is my state\'s late fee cap?</h3><p>Caps vary by state and many states have no late-fee-specific cap — the contract rate governs, subject to general interest limits. Pick your state in the calculator above to see its cap and statutory rate, or read the full state table above.</p><h3>Does the late fee compound?</h3><p>In this calculator, no. Interest is simple and always calculated on the original invoice amount. If your contract says interest compounds, the real figure will be higher.</p><h3>What if the client pays part of the invoice?</h3><p>This calculator assumes the whole invoice is unpaid. For a partial payment, enter the remaining balance as the invoice amount to work out the fee on what is still owed.</p><script type="application/ld+json">' + faqJsonld + '</script></section>'
    + '<script>'
    + 'var US_CAPS=' + JSON.stringify(US_STATE_CAPS) + ';'
    + 'function unum(id,def){var v=parseFloat(document.getElementById(id).value);return isNaN(v)?def:v;}'
    + 'function umoney(n){return "$"+Number(n).toFixed(2);}'
    + 'function uEvent(name){try{if(typeof gtag==="function"){gtag("event",name);}}catch(e){}}'
    + 'function uStateCap(){var code=document.getElementById("u-state").value;if(!code)return null;for(var i=0;i<US_CAPS.length;i++){if(US_CAPS[i].code===code)return US_CAPS[i];}return null;}'
    + 'function uShowCap(){var el=document.getElementById("u-capinfo");var s=uStateCap();var rate=unum("u-rate",1.5);if(!s){el.innerHTML="";return;}'
    + 'var html="<p style=\\"font-size:14px\\">";'
    + 'if(s.cap!=null){html+="Max contract rate in "+s.state+": <b>"+s.cap+"%/yr</b>. ";if(rate*12>s.cap){html+="<b style=\\"color:#b45309\\">Your rate of "+rate+"%/mo ("+(rate*12).toFixed(1)+"%/yr) is above this cap — a court may not enforce the excess.</b> ";}}'
    + 'else{html+="No verified contract-rate cap found for "+s.state+" — the agreed rate governs, subject to general interest limits. ";}'
    + 'if(s.statutory!=null){html+="If your terms said nothing, the statutory rate is <b>"+s.statutory+"%/yr</b>. ";}'
    + 'if(rate>2){html+="<b style=\\"color:#b45309\\">Above 2%/mo is unusual and may be unenforceable in some states.</b>";}'
    + 'html+="</p>";el.innerHTML=html;}'
    + 'function calcLateUS(){'
    + 'var amt=unum("u-amt",0);var rate=unum("u-rate",1.5);var flat=unum("u-flat",0);var grace=Math.max(0,Math.floor(unum("u-grace",0)));'
    + 'var dueStr=document.getElementById("u-due").value;var res=document.getElementById("u-results");'
    + 'uShowCap();'
    + 'if(!amt||!dueStr){res.innerHTML="<p>Enter an invoice amount and a due date to calculate.</p>";return;}'
    + 'var due=new Date(dueStr+"T00:00:00Z");var today=new Date();today.setUTCHours(0,0,0,0);'
    + 'var daysOver=Math.floor((today-due)/86400000);'
    + 'var chargeable=Math.max(0,daysOver-grace);'
    + 'var intDaily=amt*(rate/100)*(chargeable/30);'
    + 'var monthsStarted=chargeable>0?Math.ceil(chargeable/30):0;'
    + 'var intMonthly=amt*(rate/100)*monthsStarted;'
    + 'var fee=chargeable>0?flat:0;'
    + 'var method=document.getElementById("u-method").value;'
    + 'var interest=method==="monthly"?intMonthly:intDaily;'
    + 'var total=amt+interest+fee;'
    + 'var html="<p>Days overdue: <b>"+daysOver+"</b><br>Chargeable days (after "+grace+" grace day(s)): <b>"+chargeable+"</b><br>Interest pro-rated daily: <b>"+umoney(intDaily)+"</b><br>Interest per month started ("+monthsStarted+" month(s)): <b>"+umoney(intMonthly)+"</b><br>Flat late fee: <b>"+umoney(fee)+"</b><br>Total late charges ("+(method==="monthly"?"per month started":"pro-rated daily")+"): <b>"+umoney(interest+fee)+"</b><br><b>Total now due: "+umoney(total)+"</b></p>";'
    + 'if(daysOver<=0){html="<p>This invoice is not overdue yet — it is due on "+dueStr+".</p>"+html;}'
    + 'res.innerHTML=html;'
    + 'var methodText=method==="monthly"?"per month started":"pro-rated daily";'
    + 'var clause="Payment due within 30 days of the invoice date. Invoices unpaid after the due date incur a late fee of "+rate+"% per month ("+methodText+")"+(flat>0?(" plus a flat fee of "+umoney(flat)):"")+" after a grace period of "+grace+" day(s).";'
    + 'document.getElementById("u-clause").value=clause;document.getElementById("u-copied").textContent="";uEvent("calculate_late_fee_us");}'
    + 'function copyClauseUS(){var el=document.getElementById("u-clause");el.select();try{navigator.clipboard.writeText(el.value);}catch(e){document.execCommand("copy");}document.getElementById("u-copied").textContent="Clause copied — paste it into your payment terms.";uEvent("copy_clause_us");}'
    + 'function genReminderUS(){'
    + 'var amt=unum("u-amt",0);var dueStr=document.getElementById("u-due").value;var inv=document.getElementById("u-inv").value||"[invoice number]";'
    + 'var stage=document.getElementById("u-stage").value;var res=document.getElementById("u-results").innerText||"";'
    + 'var totalLine="";var m=res.match(/Total now due: \\$[0-9,.]+/);if(m){totalLine=m[0]+". ";}'
    + 'var feeLine="";var f=res.match(/Total late charges[^:]*: \\$[0-9,.]+/);if(f){feeLine=f[0]+". ";}'
    + 'var email="";'
    + 'if(stage==="friendly"){email="Subject: Reminder: invoice "+inv+" due "+(dueStr||"[due date]")+"\\n\\nHi,\\n\\nJust a quick reminder that invoice "+inv+" for "+umoney(amt)+" is due on "+(dueStr||"[due date]")+". I have attached a copy for your convenience.\\n\\nIf you have already sent payment, please ignore this note.\\n\\nThanks,";}'
    + 'else if(stage==="firm"){email="Subject: Second notice: invoice "+inv+" is overdue\\n\\nHi,\\n\\nI am following up on invoice "+inv+" for "+umoney(amt)+", which was due on "+(dueStr||"[due date]")+" and is now overdue. "+feeLine+totalLine+"\\n\\nPlease arrange payment by [date, 5 working days away]. If there is a problem with the invoice, please tell me today so we can fix it.\\n\\nThanks,";}'
    + 'else{email="Subject: Final notice: invoice "+inv+"\\n\\nHi,\\n\\nDespite my earlier reminders, invoice "+inv+" for "+umoney(amt)+" (due "+(dueStr||"[due date]")+") remains unpaid. "+feeLine+totalLine+"\\n\\nPlease arrange payment in full by [date, 7 days away]. If I do not receive payment by then, I will have to pause further work and consider next steps.\\n\\nThanks,";}'
    + 'document.getElementById("u-email").value=email;document.getElementById("u-ecopied").textContent="";uEvent("generate_reminder_us");}'
    + 'function copyEmailUS(){var el=document.getElementById("u-email");el.select();try{navigator.clipboard.writeText(el.value);}catch(e){document.execCommand("copy");}document.getElementById("u-ecopied").textContent="Email copied — paste it into your mail app.";uEvent("copy_reminder_us");}'
    + 'document.getElementById("u-state").addEventListener("change",uShowCap);'
    + 'function uprefill(id,key){var v=new URLSearchParams(window.location.search).get(key);if(v){document.getElementById(id).value=v;}}uprefill("u-amt","amt");uprefill("u-due","due");uprefill("u-rate","rate");uprefill("u-flat","flat");uprefill("u-grace","grace");uprefill("u-state","state");uprefill("u-method","method");calcLateUS();'
    + '</script>';
  return layout('Late fee calculator (US) — state caps & reminder email', body, '/us-late-fee-calculator', {
    description: 'Free US late fee calculator for freelancers and small businesses. Work out the late fee on an overdue invoice, check your state\'s cap, copy a late-fee clause and generate the reminder email — no sign-up.',
    jsonld: jsonld,
  });
}

export function invoiceReminderEmailTemplatePage() {
  const jsonld = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Invoice Chaser Invoice Reminder Email Templates',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: SITE_URL + '/invoice-reminder-email-template',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: '9 free invoice reminder email templates and a late payment reminder letter sample. Fill in your invoice details and copy, or generate one instantly — no sign-up.',
  });
  const faqJsonld = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What should an invoice reminder email say?', acceptedAnswer: { '@type': 'Answer', text: 'Put the facts in one place — invoice number, amount and due date — and give one clear action, a single payment link. Match the tone to the stage: a polite nudge at day 7, firmer at day 14, final at day 30.' } },
      { '@type': 'Question', name: 'How many reminder emails should I send?', acceptedAnswer: { '@type': 'Answer', text: 'Three written reminders is the standard: day 7, day 14 and day 30. If the third gets no reply, call. A phone call resolves what email cannot.' } },
      { '@type': 'Question', name: 'Should I mention a late fee in the reminder?', acceptedAnswer: { '@type': 'Answer', text: 'Only if the late fee was in your agreed payment terms before the work started. Work out the fee with the US late fee calculator and state the total now due.' } },
      { '@type': 'Question', name: 'Is a letter better than an email for chasing an invoice?', acceptedAnswer: { '@type': 'Answer', text: 'Email is faster and works for most reminders. A formal letter is right when email gets no reply, for larger amounts, or when you need a paper trail. The sample letter below covers that case.' } },
      { '@type': 'Question', name: 'Do these templates work outside the US?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — replace the placeholders with your details. Late-fee rules differ by country and, in the US, by state, so check your local rules before adding a fee.' } },
    ],
  });
  const tpl = (n, title, subject, body) => '<div class="card"><h3>' + n + '. ' + title + '</h3><p><strong>Subject:</strong> ' + subject + '</p><p id="tpl-' + n + '">' + body + '</p><p><button class="btn ghost" onclick="copyTpl(\'tpl-' + n + '\')">Copy template ' + n + '</button></p></div>';
  const body = '<section class="hero"><p class="eyebrow">Free tool · Templates + generator</p><h1>Invoice reminder email templates</h1>'
    + '<p style="font-size:19px">9 free invoice reminder email templates and a late payment reminder letter sample. Fill in your invoice below and generate one instantly, or copy any template and send it yourself — no sign-up, nothing leaves your browser.</p></section>'
    + '<section><div class="card" style="max-width:720px">'
    + '<label>Your business name<br><input id="t-biz" type="text" placeholder="e.g. Abhi Designs" style="width:100%;padding:10px;margin:6px 0 12px"></label>'
    + '<label>Client name<br><input id="t-client" type="text" placeholder="e.g. Priya Sharma" style="width:100%;padding:10px;margin:6px 0 12px"></label>'
    + '<label>Invoice number (optional)<br><input id="t-inv" type="text" placeholder="e.g. INV-1042" style="width:100%;padding:10px;margin:6px 0 12px"></label>'
    + '<label>Amount<br><span style="display:flex;gap:8px"><select id="t-cur" style="padding:10px"><option value="$">$ USD</option><option value="£">£ GBP</option><option value="€">€ EUR</option><option value="₹">₹ INR</option></select>'
    + '<input id="t-amt" type="text" placeholder="e.g. 250" style="flex:1;padding:10px;margin:0"></span></label>'
    + '<label style="display:block;margin-top:12px">Due date<br><input id="t-due" type="date" style="width:100%;padding:10px;margin:6px 0 12px"></label>'
    + '<span style="display:flex;gap:8px"><label style="flex:1">Late fee (optional)<br><input id="t-fee" type="text" placeholder="e.g. $25" style="width:100%;padding:10px;margin:6px 0 12px"></label>'
    + '<label style="flex:1">Total now due (optional)<br><input id="t-total" type="text" placeholder="e.g. $275" style="width:100%;padding:10px;margin:6px 0 12px"></label></span>'
    + '<label>Payment link (optional)<br><input id="t-link" type="text" placeholder="e.g. https://pay.example.com/inv-1042" style="width:100%;padding:10px;margin:6px 0 12px"></label>'
    + '<p><button class="btn" onclick="genTpl(\'before\')">Before due date</button> <button class="btn" onclick="genTpl(7)">Day 7 — polite</button> <button class="btn" onclick="genTpl(14)">Day 14 — firmer</button> <button class="btn" onclick="genTpl(30)">Day 30 — final</button></p>'
    + '<label>Subject<br><input id="t-subject" type="text" readonly style="width:100%;padding:10px;margin:6px 0 12px;background:#f4f6f8"></label>'
    + '<label>Email<br><textarea id="t-email" rows="10" readonly style="width:100%;padding:10px;margin:6px 0 12px;background:#f4f6f8"></textarea></label>'
    + '<p><button class="btn" onclick="copyTplField(\'t-email\',\'Email copied — paste it into your mail app and send.\')">Copy email</button> <button class="btn" onclick="copyTplField(\'t-subject\',\'Subject copied.\')">Copy subject</button></p>'
    + '<p id="t-copied" style="color:#0b6b5e"></p>'
    + '<h3 style="margin-top:28px">Generate the formal letter version</h3>'
    + '<p><button class="btn ghost" onclick="genLetter()">Generate reminder letter</button></p>'
    + '<label>Your reminder letter — copy and send or print<br><textarea id="t-letter" rows="14" readonly style="width:100%;padding:10px;margin:6px 0 12px;background:#f4f6f8"></textarea></label>'
    + '<p><button class="btn" onclick="copyTplField(\'t-letter\',\'Letter copied — paste it into your document and print.\')">Copy letter</button></p>'
    + '</div>'
    + '<p style="margin-top:16px">Want all three reminders sent automatically at day 7, 14 and 30, without copying anything? <a href="/signup">Start free with Invoice Chaser</a> — 3 active invoices free. Charging a late fee? Work it out with the <a href="/us-late-fee-calculator">US late fee calculator with state caps</a>. Need the invoice itself? Use the <a href="/invoice-template">free invoice template</a>.</p></section>'
    + '<section><h2>The templates</h2><p>Placeholders: <code>{{client}}</code> is the client name, <code>{{invoice_number}}</code> is the invoice number, <code>{{amount}}</code> is the invoice amount, <code>{{due_date}}</code> is the original due date, <code>{{pay_link}}</code> is your payment link, <code>{{business_name}}</code> is your business name, <code>{{late_fee}}</code> is the late fee, <code>{{total_due}}</code> is the total now due. Replace every placeholder before sending — a reminder with the wrong amount destroys your credibility for the whole chase.</p><p id="t-tpl-copied" style="color:#0b6b5e"></p>'
    + tpl(1, 'Before the due date — friendly heads-up', 'Heads-up: invoice {{invoice_number}} for {{amount}} due {{due_date}}', 'Hi {{client}},<br><br>Just a quick heads-up that invoice {{invoice_number}} for {{amount}} is due on {{due_date}}.<br><br>You can pay here: {{pay_link}}<br><br>Thanks so much,<br>{{business_name}}')
    + tpl(2, 'Day 7 — polite nudge', 'Friendly reminder: invoice {{invoice_number}} for {{amount}} due {{due_date}}', 'Hi {{client}},<br><br>Just a friendly reminder that invoice {{invoice_number}} for {{amount}} was due on {{due_date}}.<br><br>If you have already sent payment, please ignore this note — and thank you. If not, you can settle it here: {{pay_link}}<br><br>Thanks so much,<br>{{business_name}}')
    + tpl(3, 'Day 14 — firmer follow-up', 'Follow-up: invoice {{invoice_number}} for {{amount}} is now overdue', 'Hi {{client}},<br><br>I am following up on invoice {{invoice_number}} for {{amount}}, which was due on {{due_date}} and is now overdue.<br><br>Could you let me know when payment will be sent? If there is an issue with the invoice, I would rather fix it now than chase it later.<br><br>You can pay here: {{pay_link}}<br><br>Thanks,<br>{{business_name}}')
    + tpl(4, 'Day 30 — final notice', 'Final notice: invoice {{invoice_number}} for {{amount}} — action needed', 'Hi {{client}},<br><br>This is a final reminder about invoice {{invoice_number}} for {{amount}}, due on {{due_date}}.<br><br>Please arrange payment within 7 days, or reply with a date you will pay by. If I do not hear from you, I will have to pause further work and consider next steps.<br><br>Payment link: {{pay_link}}<br><br>Regards,<br>{{business_name}}')
    + tpl(5, 'With a late fee', 'Invoice {{invoice_number}} overdue — {{late_fee}} late fee now applies', 'Hi {{client}},<br><br>Invoice {{invoice_number}} for {{amount}} was due on {{due_date}} and is still unpaid. Under our payment terms a late fee of {{late_fee}} now applies, so the total due is {{total_due}}.<br><br>Please pay here: {{pay_link}}<br><br>If you have already paid, please ignore this note.<br><br>Thanks,<br>{{business_name}}')
    + tpl(6, 'Partial payment received', 'Thank you — balance of {{amount}} still due on invoice {{invoice_number}}', 'Hi {{client}},<br><br>Thank you for the partial payment on invoice {{invoice_number}}. A balance of {{amount}} is still outstanding from the original due date of {{due_date}}.<br><br>Please settle the balance here: {{pay_link}}<br><br>Thanks,<br>{{business_name}}')
    + tpl(7, 'Client disputes the invoice', 'Re: invoice {{invoice_number}} — let us sort this out', 'Hi {{client}},<br><br>Thank you for flagging the question on invoice {{invoice_number}} for {{amount}}, due {{due_date}}. I would rather fix it now than chase it later.<br><br>Could you tell me which line or amount looks wrong? I will pause the reminder sequence while we sort it out, and reissue the invoice if anything needs correcting.<br><br>Thanks,<br>{{business_name}}')
    + tpl(8, 'Retainer / recurring invoice', 'Your retainer invoice {{invoice_number}} for {{amount}} is due {{due_date}}', 'Hi {{client}},<br><br>Your monthly retainer invoice {{invoice_number}} for {{amount}} is due on {{due_date}}.<br><br>You can pay here: {{pay_link}}<br><br>Thanks so much,<br>{{business_name}}')
    + tpl(9, 'Short version — text or WhatsApp', '(no subject — send as a message)', 'Hi {{client}}, quick one — invoice {{invoice_number}} for {{amount}} was due {{due_date}} and is still open. Could you check it when you get a moment? Pay here: {{pay_link}} — thanks, {{business_name}}')
    + '<h2>Late payment reminder letter sample</h2><p>Use a formal letter when email gets no reply, for larger amounts, or when you need a paper trail. Send it on your letterhead if you have one, keep a copy, and note the date you sent it.</p>'
    + '<div class="card" id="tpl-letter"><p>{{business_name}}<br>[Your address]<br>[City, State ZIP]<br>[Email] | [Phone]</p><p>[Date]</p><p>{{client}}<br>[Client address]</p><p><strong>Re: Overdue invoice {{invoice_number}} — {{amount}} due {{due_date}}</strong></p><p>Dear {{client}},</p><p>I am writing about invoice {{invoice_number}} for {{amount}}, which was due on {{due_date}} and remains unpaid. Under our payment terms a late fee of {{late_fee}} applies, bringing the total now due to {{total_due}}.</p><p>Please arrange payment in full within 14 days of this letter. If payment has already been sent, please disregard this letter and accept my thanks.</p><p>If there is a problem with the invoice, please contact me straight away so we can resolve it.</p><p>Yours sincerely,<br><br>[Your name]<br>{{business_name}} | [Phone] | [Email]</p><p><button class="btn ghost" onclick="copyTpl(\'tpl-letter\')">Copy letter sample</button></p></div>'
    + '<h2>How the reminder sequence works</h2><p>One reminder rarely gets an invoice paid; a sequence does. Before the due date is a heads-up that assumes nothing is wrong. Day 7 is a polite nudge that assumes the payment was forgotten. Day 14 is firmer: it states the invoice is overdue and asks for payment or a reply. Day 30 is a final notice that asks for payment now or a payment plan. Each step escalates only as far as needed, so you do not burn a client relationship on the first email or waste weeks being too polite on the last one.</p><p>Three rules make any reminder work. First, put the facts in one place: invoice number, amount, due date. Second, give one clear action: a single payment link, not three ways to pay. Third, check the amount and date before sending: a reminder with the wrong amount destroys your credibility for the whole chase. This page writes the email or letter; you copy it and send it. If you want all three sent automatically on schedule, Invoice Chaser does that from your dashboard.</p>'
    + '<h2>Frequently asked questions</h2><h3>What should an invoice reminder email say?</h3><p>Put the facts in one place — invoice number, amount and due date — and give one clear action, a single payment link. Match the tone to the stage: a polite nudge at day 7, firmer at day 14, final at day 30.</p><h3>How many reminder emails should I send?</h3><p>Three written reminders is the standard: day 7, day 14 and day 30. If the third gets no reply, call. A phone call resolves what email cannot.</p><h3>Should I mention a late fee in the reminder?</h3><p>Only if the late fee was in your agreed payment terms before the work started. Work out the fee with the <a href="/us-late-fee-calculator">US late fee calculator</a> and state the total now due.</p><h3>Is a letter better than an email for chasing an invoice?</h3><p>Email is faster and works for most reminders. A formal letter is right when email gets no reply, for larger amounts, or when you need a paper trail. The sample letter above covers that case.</p><h3>Do these templates work outside the US?</h3><p>Yes — replace the placeholders with your details. Late-fee rules differ by country and, in the US, by state, so check your local rules before adding a fee.</p><script type="application/ld+json">' + faqJsonld + '</script></section>'
    + '<script>'
    + 'function tval(id){return document.getElementById(id).value.trim();}'
    + 'function tEvent(name){try{if(typeof gtag==="function"){gtag("event",name);}}catch(e){}}'
    + 'function genTpl(stage){'
    + 'var biz=tval("t-biz")||"Your Business";var client=tval("t-client")||"there";var inv=tval("t-inv");'
    + 'var amt=tval("t-amt")||"___";var cur=document.getElementById("t-cur").value;var due=tval("t-due")||"the due date";'
    + 'var fee=tval("t-fee");var total=tval("t-total");var link=tval("t-link");var invRef=inv?("invoice "+inv):"your invoice";var amtStr=cur+amt;'
    + 'var subject="",text="";'
    + 'if(stage==="before"){subject="Heads-up: "+invRef+" for "+amtStr+" due "+due;'
    + 'text="Hi "+client+",\\n\\nJust a quick heads-up that "+invRef+" for "+amtStr+" is due on "+due+".\\n\\nYou can pay here:"+(link?(" "+link):"")+"\\n\\nThanks so much,\\n"+biz;}'
    + 'else if(stage===7){subject="Friendly reminder: "+invRef+" for "+amtStr+" due "+due;'
    + 'text="Hi "+client+",\\n\\nJust a friendly reminder that "+invRef+" for "+amtStr+" was due on "+due+".\\n\\nIf you have already sent payment, please ignore this note — and thank you. If not, you can settle it here:"+(link?(" "+link):"")+"\\n\\nThanks so much,\\n"+biz;}'
    + 'else if(stage===14){subject="Follow-up: "+invRef+" for "+amtStr+" is now overdue";'
    + 'text="Hi "+client+",\\n\\nI am following up on "+invRef+" for "+amtStr+", which was due on "+due+" and is now overdue.\\n\\nCould you let me know when payment will be sent? If there is an issue with the invoice, I would rather fix it now than chase it later."+(link?("\\n\\nYou can pay here: "+link):"")+"\\n\\nThanks,\\n"+biz;}'
    + 'else{subject="Final notice: "+invRef+" for "+amtStr+" — action needed";'
    + 'text="Hi "+client+",\\n\\nThis is a final reminder about "+invRef+" for "+amtStr+", due on "+due+".\\n\\nPlease arrange payment within 7 days, or reply with a date you will pay by. If I do not hear from you, I will have to pause further work and consider next steps."+(link?("\\n\\nPayment link: "+link):"")+"\\n\\nRegards,\\n"+biz;}'
    + 'document.getElementById("t-subject").value=subject;document.getElementById("t-email").value=text;'
    + 'document.getElementById("t-copied").textContent="";tEvent("generate_reminder_template");}'
    + 'function genLetter(){'
    + 'var biz=tval("t-biz")||"Your Business";var client=tval("t-client")||"there";var inv=tval("t-inv")||"[invoice number]";'
    + 'var amt=tval("t-amt")||"___";var cur=document.getElementById("t-cur").value;var due=tval("t-due")||"[due date]";'
    + 'var fee=tval("t-fee")||"[late fee]";var total=tval("t-total")||"[total due]";'
    + 'var letter=biz+"\\n[Your address]\\n[City, State ZIP]\\n[Email] | [Phone]\\n\\n[Date]\\n\\n"+client+"\\n[Client address]\\n\\nRe: Overdue invoice "+inv+" — "+cur+amt+" due "+due+"\\n\\nDear "+client+",\\n\\nI am writing about invoice "+inv+" for "+cur+amt+", which was due on "+due+" and remains unpaid. Under our payment terms a late fee of "+fee+" applies, bringing the total now due to "+total+".\\n\\nPlease arrange payment in full within 14 days of this letter. If payment has already been sent, please disregard this letter and accept my thanks.\\n\\nIf there is a problem with the invoice, please contact me straight away so we can resolve it.\\n\\nYours sincerely,\\n\\n[Your name]\\n"+biz+" | [Phone] | [Email]";'
    + 'document.getElementById("t-letter").value=letter;document.getElementById("t-copied").textContent="";tEvent("generate_reminder_letter");}'
    + 'function copyTplField(id,msg){var el=document.getElementById(id);el.select();try{navigator.clipboard.writeText(el.value);}catch(e){document.execCommand("copy");}document.getElementById("t-copied").textContent=msg;tEvent("copy_reminder_template");}'
    + 'function copyTpl(id){var el=document.getElementById(id);var txt=el.innerText||el.textContent;try{navigator.clipboard.writeText(txt);}catch(e){var r=document.createRange();r.selectNodeContents(el);var s=window.getSelection();s.removeAllRanges();s.addRange(r);document.execCommand("copy");s.removeAllRanges();}document.getElementById("t-tpl-copied").textContent="Template copied — replace the placeholders and send.";tEvent("copy_reminder_template");}'
    + 'function tprefill(id,key){var v=new URLSearchParams(window.location.search).get(key);if(v){document.getElementById(id).value=v;}}tprefill("t-biz","biz");tprefill("t-client","client");tprefill("t-inv","inv");tprefill("t-amt","amt");tprefill("t-due","due");tprefill("t-fee","fee");tprefill("t-total","total");tprefill("t-link","link");tprefill("t-cur","cur");genTpl(7);'
    + '</script>';
  return layout('Invoice reminder email templates (free) — generator + letter sample', body, '/invoice-reminder-email-template', {
    description: '9 free invoice reminder email templates and a late payment reminder letter sample. Fill in your invoice details and copy, or generate one instantly — no sign-up.',
    jsonld: jsonld,
  });
}

export function cashFlowForecastPage() {
  const jsonld = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Invoice Chaser 13-Week Cash Flow Forecast',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: SITE_URL + '/small-business-cash-flow-forecast-template',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: 'Free small business cash flow forecast template. Enter your starting cash, invoices and bills to see your balance for the next 13 weeks and find the week you run short — download as CSV, no sign-up.',
  });
  const faqJsonld = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Why 13 weeks?', acceptedAnswer: { '@type': 'Answer', text: 'Thirteen weeks is one quarter: short enough to forecast accurately, long enough to catch the next rent and payroll cycles and the invoices due after them. Re-run it weekly and it stays current.' } },
      { '@type': 'Question', name: 'What counts as money in?', acceptedAnswer: { '@type': 'Answer', text: 'Invoices due in that week, using the due date — not the invoice date — plus any other income. Overdue invoices land in week 1: that money should already be in your account, so chase it now.' } },
      { '@type': 'Question', name: 'What if my balance goes negative?', acceptedAnswer: { '@type': 'Answer', text: 'That is the point of the forecast: it flags the week before it happens. Chase the invoice due before that week, delay a one-off bill, or arrange a short-term buffer before the week arrives.' } },
      { '@type': 'Question', name: 'Does this replace my accountant\'s forecast?', acceptedAnswer: { '@type': 'Answer', text: 'No. This is a quick check for freelancers and small businesses. For tax or loan decisions, use your books and your accountant.' } },
      { '@type': 'Question', name: 'Can I download the forecast?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — the Download CSV button saves the 13-week table as a spreadsheet you can open in Excel or Google Sheets, edit and reuse every week.' } },
    ],
  });
  const invRow = '<div class="c-row" style="display:flex;gap:8px;margin-bottom:8px"><input type="text" placeholder="Invoice / client" style="flex:2;padding:10px;margin:0"><input type="number" min="0" placeholder="Amount $" style="flex:1;padding:10px;margin:0"><input type="date" style="flex:1;padding:10px;margin:0"><button type="button" class="btn ghost" style="padding:10px 14px" onclick="this.parentNode.remove()">×</button></div>';
  const outRow = '<div class="c-row" style="display:flex;gap:8px;margin-bottom:8px"><input type="text" placeholder="Bill / what it is" style="flex:2;padding:10px;margin:0"><input type="number" min="0" placeholder="Amount $" style="flex:1;padding:10px;margin:0"><input type="date" style="flex:1;padding:10px;margin:0"><button type="button" class="btn ghost" style="padding:10px 14px" onclick="this.parentNode.remove()">×</button></div>';
  const body = '<section class="hero"><p class="eyebrow">Free tool · 13-week planner</p><h1>Small business cash flow forecast template</h1>'
    + '<p style="font-size:19px">Enter your starting cash, the invoices clients owe you and the bills you have to pay — and see your balance for the next 13 weeks, with the week you run short flagged in red. Free, no sign-up, nothing leaves your browser.</p></section>'
    + '<section><div class="card" style="max-width:760px">'
    + '<span style="display:flex;gap:8px"><label style="flex:1">Starting cash in the bank ($)<br><input id="c-cash" type="number" min="0" placeholder="e.g. 5000" style="width:100%;padding:10px;margin:6px 0 12px"></label>'
    + '<label style="flex:1">Other income per week ($)<br><input id="c-income" type="number" min="0" value="0" style="width:100%;padding:10px;margin:6px 0 12px"></label></span>'
    + '<h3>Regular bills — every week</h3>'
    + '<span style="display:flex;gap:8px"><label style="flex:1">Rent / workspace ($/week)<br><input id="c-rent" type="number" min="0" value="0" style="width:100%;padding:10px;margin:6px 0 12px"></label>'
    + '<label style="flex:1">Payroll / your pay ($/week)<br><input id="c-payroll" type="number" min="0" value="0" style="width:100%;padding:10px;margin:6px 0 12px"></label>'
    + '<label style="flex:1">Other weekly bills ($/week)<br><input id="c-other" type="number" min="0" value="0" style="width:100%;padding:10px;margin:6px 0 12px"></label></span>'
    + '<h3>Money in — invoices clients owe you</h3><p style="font-size:14px">Use the due date, not the invoice date. An invoice already overdue lands in week 1.</p>'
    + '<div id="c-invoices">' + invRow + invRow + invRow + '</div>'
    + '<p><button class="btn ghost" onclick="cAddRow(\'c-invoices\',\'inv\')">+ Add invoice</button></p>'
    + '<h3>Money out — one-off bills</h3><p style="font-size:14px">Tax bills, equipment, annual subscriptions — anything that is not weekly.</p>'
    + '<div id="c-outflows">' + outRow + '</div>'
    + '<p><button class="btn ghost" onclick="cAddRow(\'c-outflows\',\'out\')">+ Add one-off bill</button></p>'
    + '<p><button class="btn" onclick="calcFlow()">Forecast my next 13 weeks</button></p>'
    + '<div id="c-results"></div>'
    + '<p><button class="btn ghost" onclick="downloadFlowCSV()">Download CSV</button> <button class="btn ghost" onclick="copyFlowSummary()">Copy summary</button> <span id="c-copied" style="color:#0b6b5e"></span></p>'
    + '<p style="font-size:14px;color:#555">This is a planning estimate, not financial advice. It assumes every invoice is paid on its due date — in real life some are late, so treat the forecast as the best case and keep a buffer.</p>'
    + '</div>'
    + '<p style="margin-top:16px">An invoice in the forecast is only money if the client pays it. Chase it with the <a href="/invoice-reminder-email-template">invoice reminder email templates</a> or let <a href="/signup">Invoice Chaser chase it automatically at day 7, 14 and 30</a>. Charging a late fee? Work it out with the <a href="/us-late-fee-calculator">US late fee calculator with state caps</a>.</p></section>'
    + '<section><h2>How the 13-week forecast works</h2><p>Thirteen weeks is one quarter. You start with the cash in the bank today. Every invoice you add lands in the week its due date falls in; every weekly bill repeats for all 13 weeks; every one-off bill lands in the week its date falls in. The running balance is last week\'s balance plus this week\'s money in, minus this week\'s money out. A week that ends below zero is flagged — that is the week you run short, and the whole point of the forecast is to see it coming while you can still do something about it.</p><p><strong>Worked example.</strong> Starting cash $5,000. One invoice of $2,400 due in week 2, another of $1,800 due in week 5. Rent $400 a week and pay $900 a week, so $1,300 goes out every week. Week 1 ends at $3,700. Week 2 adds $2,400 and ends at $4,800. Week 5 adds $1,800 and ends at $2,700. By week 7 the balance is $100, and week 8 ends at −$1,200 — the shortfall week. Seeing that in week 1 gives you seven weeks to chase the week-2 invoice early, delay a one-off bill, or arrange a buffer.</p>'
    + '<h2>Frequently asked questions</h2><h3>Why 13 weeks?</h3><p>Thirteen weeks is one quarter: short enough to forecast accurately, long enough to catch the next rent and payroll cycles and the invoices due after them. Re-run it weekly and it stays current.</p><h3>What counts as money in?</h3><p>Invoices due in that week, using the due date — not the invoice date — plus any other income. Overdue invoices land in week 1: that money should already be in your account, so chase it now.</p><h3>What if my balance goes negative?</h3><p>That is the point of the forecast: it flags the week before it happens. Chase the invoice due before that week, delay a one-off bill, or arrange a short-term buffer before the week arrives.</p><h3>Does this replace my accountant\'s forecast?</h3><p>No. This is a quick check for freelancers and small businesses. For tax or loan decisions, use your books and your accountant.</p><h3>Can I download the forecast?</h3><p>Yes — the Download CSV button saves the 13-week table as a spreadsheet you can open in Excel or Google Sheets, edit and reuse every week.</p><script type="application/ld+json">' + faqJsonld + '</script></section>'
    + '<script>'
    + 'var cCSV="";var cSummary="";'
    + 'function cEvent(name){try{if(typeof gtag==="function"){gtag("event",name);}}catch(e){}}'
    + 'function cmoney(n){return "$"+Number(n).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});}'
    + 'function cnum(el,def){var v=parseFloat(el.value);return isNaN(v)?def:v;}'
    + 'function cAddRow(id,kind){var d=document.createElement("div");d.innerHTML=(kind==="inv"?'
    + JSON.stringify(invRow) + ':' + JSON.stringify(outRow)
    + ');document.getElementById(id).appendChild(d.firstChild);}'
    + 'function cWeekOf(dateStr,today){var d=new Date(dateStr+"T00:00:00");var diff=Math.floor((d-today)/86400000);if(diff<0)return 0;var w=Math.floor(diff/7);return w>12?-1:w;}'
    + 'function cRows(id){var out=[];var rows=document.getElementById(id).querySelectorAll(".c-row");for(var i=0;i<rows.length;i++){var ins=rows[i].querySelectorAll("input");var label=ins[0].value.trim();var amt=parseFloat(ins[1].value);var date=ins[2].value;if(!isNaN(amt)&&amt>0&&date){out.push({label:label||"Item",amt:amt,date:date});}}return out;}'
    + 'function calcFlow(){'
    + 'var cash=cnum(document.getElementById("c-cash"),0);var income=cnum(document.getElementById("c-income"),0);'
    + 'var rent=cnum(document.getElementById("c-rent"),0);var payroll=cnum(document.getElementById("c-payroll"),0);var other=cnum(document.getElementById("c-other"),0);'
    + 'var invs=cRows("c-invoices");var outs=cRows("c-outflows");'
    + 'var res=document.getElementById("c-results");'
    + 'if(cash===0&&invs.length===0&&income===0){res.innerHTML="<p>Enter your starting cash or add at least one invoice to forecast.</p>";return;}'
    + 'var today=new Date();today.setHours(0,0,0,0);'
    + 'var weeks=[];for(var w=0;w<13;w++){weeks.push({inn:income,out:rent+payroll+other});}'
    + 'var ignored=0;'
    + 'for(var i=0;i<invs.length;i++){var wi=cWeekOf(invs[i].date,today);if(wi<0){ignored++;continue;}weeks[wi].inn+=invs[i].amt;}'
    + 'for(var j=0;j<outs.length;j++){var wo=cWeekOf(outs[j].date,today);if(wo<0){ignored++;continue;}weeks[wo].out+=outs[j].amt;}'
    + 'var running=cash;var lowest=cash;var lowestWeek=0;var firstShort=-1;var totIn=0;var totOut=0;'
    + 'var html="<div style=\\"overflow-x:auto\\"><table><thead><tr><th>Week</th><th>Week ending</th><th>Money in</th><th>Money out</th><th>Net</th><th>Balance</th></tr></thead><tbody>";'
    + 'var csv="Week,Week ending,Money in,Money out,Net,Running balance\\n";'
    + 'for(var k=0;k<13;k++){var net=weeks[k].inn-weeks[k].out;running+=net;totIn+=weeks[k].inn;totOut+=weeks[k].out;'
    + 'if(running<lowest){lowest=running;lowestWeek=k+1;}if(firstShort<0&&running<0){firstShort=k+1;}'
    + 'var end=new Date(today.getTime()+(k*7+6)*86400000);var endStr=end.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});'
    + 'var neg=running<0?" style=\\"background:#fef2f2;color:#991b1b\\"":"";'
    + 'html+="<tr"+neg+"><td>Week "+(k+1)+"</td><td>"+endStr+"</td><td>"+cmoney(weeks[k].inn)+"</td><td>"+cmoney(weeks[k].out)+"</td><td>"+cmoney(net)+"</td><td><b>"+cmoney(running)+"</b></td></tr>";'
    + 'csv+=(k+1)+","+endStr+","+weeks[k].inn.toFixed(2)+","+weeks[k].out.toFixed(2)+","+net.toFixed(2)+","+running.toFixed(2)+"\\n";}'
    + 'html+="</tbody></table></div>";'
    + 'var summary="<p><b>Starting cash:</b> "+cmoney(cash)+"<br><b>Total money in (13 weeks):</b> "+cmoney(totIn)+"<br><b>Total money out (13 weeks):</b> "+cmoney(totOut)+"<br><b>Lowest balance:</b> "+cmoney(lowest)+" (week "+lowestWeek+")<br>";'
    + 'if(firstShort>0){summary+="<b style=\\"color:#991b1b\\">Cash runs short in week "+firstShort+" — chase the invoices due before then or delay a one-off bill.</b>";}'
    + 'else{summary+="<b style=\\"color:#0b6b5e\\">No shortfall — cash stays positive for all 13 weeks.</b>";}'
    + 'if(ignored>0){summary+="<br><span style=\\"font-size:14px\\">"+ignored+" item(s) fall after week 13 and are not in this forecast.</span>";}'
    + 'summary+="</p>";'
    + 'res.innerHTML=summary+html;cCSV=csv;'
    + 'cSummary="13-week cash flow forecast\\nStarting cash: "+cmoney(cash)+"\\nTotal in: "+cmoney(totIn)+"\\nTotal out: "+cmoney(totOut)+"\\nLowest balance: "+cmoney(lowest)+" (week "+lowestWeek+")\\n"+(firstShort>0?("Cash runs short in week "+firstShort+"."):("No shortfall in 13 weeks."));'
    + 'document.getElementById("c-copied").textContent="";cEvent("calculate_cash_flow");}'
    + 'function downloadFlowCSV(){if(!cCSV){document.getElementById("c-copied").textContent="Forecast first, then download.";return;}var blob=new Blob([cCSV],{type:"text/csv"});var a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="cash-flow-forecast-13-week.csv";document.body.appendChild(a);a.click();a.remove();document.getElementById("c-copied").textContent="CSV downloaded — open it in Excel or Google Sheets.";cEvent("download_cash_flow_csv");}'
    + 'function copyFlowSummary(){if(!cSummary){document.getElementById("c-copied").textContent="Forecast first, then copy.";return;}try{navigator.clipboard.writeText(cSummary);}catch(e){var ta=document.createElement("textarea");ta.value=cSummary;document.body.appendChild(ta);ta.select();document.execCommand("copy");ta.remove();}document.getElementById("c-copied").textContent="Summary copied.";cEvent("copy_cash_flow_summary");}'
    + 'function cprefill(id,key){var v=new URLSearchParams(window.location.search).get(key);if(v){document.getElementById(id).value=v;}}cprefill("c-cash","cash");calcFlow();'
    + '</script>';
  return layout('Small business cash flow forecast template — free 13-week planner', body, '/small-business-cash-flow-forecast-template', {
    description: 'Free small business cash flow forecast template. Enter your starting cash, invoices and bills to see your balance for the next 13 weeks and find the week you run short — download as CSV, no sign-up.',
    jsonld: jsonld,
  });
}
