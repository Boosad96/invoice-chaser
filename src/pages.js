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

const SITE_URL = 'https://invoice-chaser.agentid-mints.workers.dev';

export function layout(title, body, active, meta = {}) {
  const links = [
    ['/', 'Home'], ['/how-it-works', 'How it works'], ['/pricing', 'Pricing'],
    ['/templates', 'Sample templates'], ['/faq', 'FAQ'], ['/about', 'About'], ['/contact', 'Contact'],
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
    + '<a href="/privacy">Privacy</a><a href="/about">About</a><a href="/contact">Contact</a></nav></footer></body></html>';
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
    <div class="stat"><b>$0 touched</b><span>never processes payments</span></div>
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
  <p>Invoice Chaser never processes payments and never touches your money. It only sends reminders. Your clients pay you through your own Stripe, PayPal, or bank link.</p></div>`, '/', {
    description: 'Automatic invoice reminder software for freelancers and solo trades. Polite, firmer, then final email reminders at day 7, 14 and 30 after an invoice is due — free for 3 active invoices.',
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
    description: 'How automatic invoice reminders work: add invoices or import a CSV, and Invoice Chaser sends day 7, 14 and 30 reminders by email until the invoice is marked paid.',
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
  <p>Every plan includes the full reminder sequence, editable templates, CSV import, and the dashboard. Paid plans are display-only in this version — checkout is added when billing launches, and you will never be charged without explicitly choosing a plan.</p>`, '/pricing', {
    description: 'Invoice Chaser pricing: free for 3 active invoices, Starter $19/month for 25, Pro $49/month for 100. Every plan includes the full day 7, 14 and 30 reminder sequence.',
  });
}

export function templatesPage() {
  return layout('Sample reminder templates', `
  <h1>Sample reminder templates</h1>
  <p>These are the three default templates every account starts with. You can rewrite all of them. Placeholders: <code>{{client}}</code>, <code>{{amount}}</code>, <code>{{due_date}}</code>, <code>{{pay_link}}</code>, <code>{{business_name}}</code>.</p>
  <div class="card"><h3>Day 7 — Polite nudge</h3><p><strong>Subject:</strong> Friendly reminder: invoice {{amount}} was due {{due_date}}</p><p>Hi {{client}},<br><br>Just a friendly nudge — invoice {{amount}} was due on {{due_date}} and we have not seen the payment yet.<br><br>If you have already paid, please ignore this message. Otherwise you can pay here:<br>{{pay_link}}<br><br>Thanks so much,<br>{{business_name}}</p></div>
  <div class="card"><h3>Day 14 — Firmer follow-up</h3><p><strong>Subject:</strong> Second reminder: invoice {{amount}} is now overdue</p><p>Hi {{client}},<br><br>This is a second reminder that invoice {{amount}}, due on {{due_date}}, is still unpaid.<br><br>Please arrange payment as soon as you can, or reply to this email if there is an issue with the invoice:<br>{{pay_link}}<br><br>Thanks,<br>{{business_name}}</p></div>
  <div class="card"><h3>Day 30 — Final notice</h3><p><strong>Subject:</strong> Final notice: invoice {{amount}} overdue since {{due_date}}</p><p>Hi {{client}},<br><br>This is a final notice for invoice {{amount}}, which was due on {{due_date}} and remains unpaid.<br><br>Please pay now or contact us urgently to agree a payment plan:<br>{{pay_link}}<br><br>{{business_name}}</p></div>`, '/templates', {
    description: 'Free invoice reminder email templates: a polite day 7 nudge, a firmer day 14 follow-up, and a day 30 final notice — with placeholders for client, amount, due date and pay link.',
  });
}

export function faqPage() {
  const qa = [
    ['Does Invoice Chaser touch my money?', 'No. It never processes payments, holds funds, or takes a cut. It sends reminders only. Clients pay you through your own payment link or bank details.'],
    ['What happens when a client pays?', 'Mark the invoice paid in your dashboard and every pending reminder for it stops immediately. Nothing further is sent for that invoice.'],
    ['Can I pause chasing one client?', 'Yes. Pause any invoice while a query is being sorted out. Paused invoices send nothing until you resume them.'],
    ['Do I need accounting software?', 'No. Invoices are typed in or imported from a CSV. No Xero, QuickBooks, or other integration is required.'],
    ['What if a client replies to a reminder?', 'Replies go to your own email inbox (reminders are sent from your business). If a client promises payment or disputes the invoice, pause it from your dashboard.'],
    ['Can a reminder be sent twice by mistake?', 'No. Every reminder is recorded as sent the moment it goes out, and the daily job only ever picks up reminders still marked pending.'],
    ['Is there a free plan?', 'Yes — 3 active invoices, free, with the full sequence and templates. Starter ($19/month, 25 invoices) and Pro ($49/month, 100 invoices) are shown on the pricing page; checkout is not live in this version.'],
    ['Will you show ads?', 'Not in this version. If display advertising is added later, it will appear only on public pages like this one — never inside your private dashboard, login, signup, or settings pages.'],
  ];
  const jsonld = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qa.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  });
  return layout('Frequently asked questions', `
  <h1>Frequently asked questions</h1>
  <div class="card"><h3>Does Invoice Chaser touch my money?</h3><p>No. It never processes payments, holds funds, or takes a cut. It sends reminders only. Clients pay you through your own payment link or bank details.</p></div>
  <div class="card"><h3>What happens when a client pays?</h3><p>Mark the invoice paid in your dashboard and every pending reminder for it stops immediately. Nothing further is sent for that invoice.</p></div>
  <div class="card"><h3>Can I pause chasing one client?</h3><p>Yes. Pause any invoice while a query is being sorted out. Paused invoices send nothing until you resume them.</p></div>
  <div class="card"><h3>Do I need accounting software?</h3><p>No. Invoices are typed in or imported from a CSV. No Xero, QuickBooks, or other integration is required.</p></div>
  <div class="card"><h3>What if a client replies to a reminder?</h3><p>Replies go to your own email inbox (reminders are sent from your business). If a client promises payment or disputes the invoice, pause it from your dashboard — automatic reply classification is a planned feature, not a v1 promise.</p></div>
  <div class="card"><h3>Can a reminder be sent twice by mistake?</h3><p>No. Every reminder is recorded as sent the moment it goes out, and the daily job only ever picks up reminders still marked pending.</p></div>
  <div class="card"><h3>Is there a free plan?</h3><p>Yes — 3 active invoices, free, with the full sequence and templates. Starter ($19/month, 25 invoices) and Pro ($49/month, 100 invoices) are shown on the pricing page; checkout is not live in this version.</p></div>
  <div class="card"><h3>Will you show ads?</h3><p>Not in this version. If display advertising is added later, it will appear only on public pages like this one — never inside your private dashboard, login, signup, or settings pages.</p></div>`, '/faq', {
    description: 'Invoice Chaser FAQ: does it touch your money, what happens when a client pays, pausing one client, accounting software, duplicate reminders, and the free plan.',
    jsonld,
  });
}

export function aboutPage() {
  return layout('About', `
  <h1>About Invoice Chaser</h1>
  <p>Invoice Chaser exists for one frustrating, ordinary problem: freelancers and solo trades send an invoice, then forget — or dread — the follow-up, while the money sits unpaid. Accounting tools generate the invoice and stop; this tool handles what happens after it.</p>
  <p>It is a small, focused product: one workflow (remind, escalate, stop when paid), email only, no per-customer service, no money movement. It is built for people who work from a phone and a spreadsheet, not a finance department.</p>`, '/about', {
    description: 'About Invoice Chaser: automatic invoice reminders for freelancers and solo trades — one workflow (remind, escalate, stop when paid), email only, no money movement.',
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
