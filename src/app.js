// Private dashboard single-page app. Served at /app. All data comes from
// /api/* and is always scoped to the signed-in user on the server side.
// NOTE: this file's inline script deliberately avoids backticks so it can be
// embedded in the template string below.

const APP_CSS = `
:root{--ink:#1c2430;--muted:#5b6775;--line:#e3e8ee;--brand:#0f766e;--bg:#f7f8f9;--card:#fff;--warn:#b45309}
*{box-sizing:border-box}body{margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:var(--ink);line-height:1.5;background:var(--bg)}
header{border-bottom:1px solid var(--line);background:#fff}
.top{max-width:1000px;margin:0 auto;padding:12px 20px;display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.top b{font-size:19px}.top span{color:var(--muted);font-size:14px}.top .sp{margin-left:auto}
button,.btn{background:var(--brand);color:#fff;border:0;padding:8px 14px;border-radius:8px;cursor:pointer;font-size:15px;text-decoration:none}
button.ghost,.btn.ghost{background:#fff;color:var(--ink);border:1px solid var(--line)}
button.danger{background:#b91c1c}
main{max-width:1000px;margin:0 auto;padding:20px}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px}
.card{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:16px;margin:12px 0}
.card h3{margin:0 0 4px}.card .n{font-size:30px;font-weight:800}
.tabs{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0}
.tabs button{background:#fff;color:var(--ink);border:1px solid var(--line)}
.tabs button.on{background:var(--ink);color:#fff}
label{display:block;margin:12px 0 4px;font-weight:600}
input,textarea,select{width:100%;padding:10px;border:1px solid var(--line);border-radius:8px;font-size:15px}
table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:9px;border-bottom:1px solid var(--line);font-size:14px;vertical-align:top}
.row{display:flex;gap:10px;flex-wrap:wrap}.row>*{flex:1;min-width:180px}
.note{background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:12px 16px;margin:12px 0}
.modal{position:fixed;inset:0;background:rgba(0,0,0,.45);display:none;align-items:flex-start;justify-content:center;padding:24px;overflow:auto}
.modal.open{display:flex}.modal .box{background:#fff;border-radius:12px;padding:20px;max-width:640px;width:100%}
pre.mail{white-space:pre-wrap;background:#f1f5f9;padding:14px;border-radius:8px;font-size:14px}
@media(max-width:640px){table{font-size:13px}.top{padding:10px 14px}}
`;

export function appPage() {
  return '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
    + '<title>Dashboard — Invoice Chaser</title><style>' + APP_CSS + '</style></head><body>'
    + '<header><div class="top"><b>Invoice Chaser</b><span id="who"></span><span class="sp"></span>'
    + '<a class="btn ghost" href="/">Public site</a><button class="ghost" id="logoutBtn">Sign out</button></div></header>'
    + '<main><div id="alert"></div>'
    + '<div class="cards">'
    + '<div class="card"><h3>Overdue</h3><div class="n" id="cOverdue">0</div></div>'
    + '<div class="card"><h3>On track</h3><div class="n" id="cTrack">0</div></div>'
    + '<div class="card"><h3>Paid</h3><div class="n" id="cPaid">0</div></div>'
    + '<div class="card"><h3>Active invoices</h3><div class="n" id="cActive">0 / 3</div><div id="planNote" style="color:#5b6775;font-size:13px"></div></div>'
    + '</div>'
    + '<div class="tabs">'
    + '<button class="on" data-tab="invoices">Invoices</button><button data-tab="queue">Chase queue</button>'
    + '<button data-tab="templates">Templates</button><button data-tab="settings">Settings</button></div>'
    + '<section id="tab-invoices">'
    + '<div class="card"><h3 style="margin-top:0">Add an invoice</h3>'
    + '<form id="addForm"><div class="row"><div><label>Client name</label><input name="client_name" required></div>'
    + '<div><label>Client email</label><input name="client_email" type="email" required></div></div>'
    + '<div class="row"><div><label>Amount</label><input name="amount" type="number" step="0.01" min="0" required></div>'
    + '<div><label>Due date</label><input name="due_date" type="date" required></div></div>'
    + '<label>Pay link (optional — your own Stripe / PayPal link)</label><input name="pay_link" placeholder="https://…">'
    + '<p><button type="submit">Add invoice</button></p></form></div>'
    + '<div class="card"><h3 style="margin-top:0">Import from CSV</h3>'
    + '<p style="color:#5b6775">Columns: client name, client email, amount, due date (YYYY-MM-DD). The first row may be a header.</p>'
    + '<input type="file" id="csvFile" accept=".csv,text/csv"><p><button id="csvBtn">Import CSV</button></p></div>'
    + '<div class="card"><h3 style="margin-top:0">Your invoices</h3><div id="invoiceList"></div></div>'
    + '</section>'
    + '<section id="tab-queue" style="display:none">'
    + '<div class="card"><h3 style="margin-top:0">Upcoming sends</h3><div id="upcoming"></div></div>'
    + '<div class="card"><h3 style="margin-top:0">Recently sent</h3><div id="sentLog"></div></div>'
    + '</section>'
    + '<section id="tab-templates" style="display:none">'
    + '<div class="card"><h3 style="margin-top:0">Reminder templates</h3>'
    + '<p style="color:#5b6775">Placeholders: {{client}}, {{amount}}, {{due_date}}, {{pay_link}}, {{business_name}}. When an invoice has no pay link, {{pay_link}} renders as empty text.</p>'
    + '<div id="templateEditors"></div><p><button id="saveTemplates">Save templates</button></p></div>'
    + '</section>'
    + '<section id="tab-settings" style="display:none">'
    + '<div class="card"><h3 style="margin-top:0">Settings</h3>'
    + '<form id="settingsForm"><label>Business name</label><input name="business_name" id="setBusiness">'
    + '<label>Currency</label><select name="currency" id="setCurrency"><option value="USD">USD ($)</option><option value="EUR">EUR (€)</option><option value="GBP">GBP (£)</option><option value="INR">INR (₹)</option></select>'
    + '<p><button type="submit">Save settings</button></p></form>'
    + '<p style="color:#5b6775">Plan: Free (3 active invoices). Starter $19/month for 25 and Pro $49/month for 100 are shown on the <a href="/pricing">pricing page</a>; checkout is not live in this version, so you will never be charged here.</p></div>'
    + '</section></main>'
    + '<div class="modal" id="modal"><div class="box"><h3 id="modalTitle" style="margin-top:0"></h3><div id="modalBody"></div>'
    + '<p><button class="ghost" id="modalClose">Close</button></p></div></div>'
    + '<script>' + APP_JS + '</script></body></html>';
}

const APP_JS = [
  "function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;');}",
  "function api(path, opts){opts=opts||{};opts.headers=opts.headers||{};if(opts.body)opts.headers['Content-Type']='application/json';return fetch(path,opts).then(function(r){return r.json().then(function(j){return {ok:r.ok,status:r.status,body:j};});});}",
  "var state={me:null,invoices:[],queue:[],sent:[],templates:{}};",
  "function showAlert(msg, good){var el=document.getElementById('alert');el.innerHTML='<div class=\"note\">'+esc(msg)+'</div>';if(good){el.firstChild.style.background='#ecfdf5';el.firstChild.style.borderColor='#a7f3d0';}}",
  "function money(cents, cur){var sym={USD:'$',EUR:'€',GBP:'£',INR:'₹'}[cur]||'$';return sym+(cents/100).toFixed(2);}",
  "function todayStr(){return new Date().toISOString().slice(0,10);}",
  "function switchTab(name){var tabs=['invoices','queue','templates','settings'];tabs.forEach(function(t){document.getElementById('tab-'+t).style.display=(t===name?'block':'none');});document.querySelectorAll('.tabs button').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-tab')===name);});}",
  "document.querySelectorAll('.tabs button').forEach(function(b){b.addEventListener('click',function(){switchTab(b.getAttribute('data-tab'));});});",
  "document.getElementById('logoutBtn').addEventListener('click',function(){fetch('/api/auth/logout',{method:'POST'}).then(function(){location.href='/login';});});",
  "document.getElementById('modalClose').addEventListener('click',function(){document.getElementById('modal').classList.remove('open');});",
  "function openModal(title, html){document.getElementById('modalTitle').textContent=title;document.getElementById('modalBody').innerHTML=html;document.getElementById('modal').classList.add('open');}",
  "function render(){var me=state.me;if(!me)return;document.getElementById('who').textContent=me.business_name+' · '+me.email;",
  "var today=todayStr();var overdue=0,track=0,paid=0,active=0;",
  "state.invoices.forEach(function(inv){if(inv.status==='paid'){paid++;}else{active++;if(inv.due_date<today){overdue++;}else{track++;}}});",
  "document.getElementById('cOverdue').textContent=overdue;document.getElementById('cTrack').textContent=track;document.getElementById('cPaid').textContent=paid;",
  "document.getElementById('cActive').textContent=active+' / '+me.plan_limit;",
  "document.getElementById('planNote').textContent=(active>=me.plan_limit?'Free limit reached — mark an invoice paid to add another.':'');",
  "document.getElementById('setBusiness').value=me.business_name;document.getElementById('setCurrency').value=me.currency;",
  "var rows=state.invoices.slice().sort(function(a,b){return a.due_date<b.due_date?-1:1;}).map(function(inv){",
  "var status=inv.status==='paid'?'Paid':(inv.paused?'Paused':(inv.due_date<today?'Overdue':'On track'));",
  "var acts='';",
  "if(inv.status!=='paid'){acts+='<button data-act=\"paid\" data-id=\"'+inv.id+'\">Mark paid</button> ';acts+='<button class=\"ghost\" data-act=\"pause\" data-id=\"'+inv.id+'\">'+(inv.paused?'Resume':'Pause')+'</button> ';",
  "acts+='<button class=\"ghost\" data-act=\"preview\" data-id=\"'+inv.id+'\">Preview next reminder</button> ';} ",
  "acts+='<button class=\"danger\" data-act=\"delete\" data-id=\"'+inv.id+'\">Delete</button>';",
  "return '<tr><td><b>'+esc(inv.client_name)+'</b><br><span style=\"color:#5b6775\">'+esc(inv.client_email)+'</span></td><td>'+money(inv.amount_cents,inv.currency)+'</td><td>'+esc(inv.due_date)+'</td><td>'+status+'</td><td>'+acts+'</td></tr>';}).join('');",
  "document.getElementById('invoiceList').innerHTML=rows?'<table><tr><th>Client</th><th>Amount</th><th>Due</th><th>Status</th><th></th></tr>'+rows+'</table>':'<p style=\"color:#5b6775\">No invoices yet. Add one above.</p>';",
  "document.getElementById('invoiceList').querySelectorAll('button[data-act]').forEach(function(btn){btn.addEventListener('click',function(){handleInvoiceAction(btn.getAttribute('data-act'),btn.getAttribute('data-id'));});});",
  "var up=state.queue.map(function(q){return '<tr><td>'+esc(q.client_name)+'</td><td>Step '+q.step+' (day '+[0,7,14,30][q.step]+')</td><td>'+esc(q.scheduled_date)+'</td><td><button class=\"ghost\" data-prev=\"'+q.reminder_id+'\">Preview</button> <button data-sent=\"'+q.reminder_id+'\">Mark sent manually</button></td></tr>';}).join('');",
  "document.getElementById('upcoming').innerHTML=up?'<table><tr><th>Client</th><th>Reminder</th><th>Sends</th><th></th></tr>'+up+'</table>':'<p style=\"color:#5b6775\">Nothing scheduled. Reminders appear here once an invoice is overdue.</p>';",
  "document.getElementById('upcoming').querySelectorAll('button[data-prev]').forEach(function(btn){btn.addEventListener('click',function(){previewReminder(btn.getAttribute('data-prev'));});});",
  "document.getElementById('upcoming').querySelectorAll('button[data-sent]').forEach(function(btn){btn.addEventListener('click',function(){markSent(btn.getAttribute('data-sent'));});});",
  "var sent=state.sent.map(function(s){return '<tr><td>'+esc(s.client_name||'')+'</td><td>Step '+s.step+'</td><td>'+esc(s.to_email)+'</td><td>'+esc(s.sent_at.slice(0,10))+' ('+esc(s.method)+')</td></tr>';}).join('');",
  "document.getElementById('sentLog').innerHTML=sent?'<table><tr><th>Client</th><th>Reminder</th><th>To</th><th>Sent</th></tr>'+sent+'</table>':'<p style=\"color:#5b6775\">Nothing sent yet.</p>';",
  "var labels={1:'Day 7 — polite nudge',2:'Day 14 — firmer follow-up',3:'Day 30 — final notice'};",
  "document.getElementById('templateEditors').innerHTML=[1,2,3].map(function(step){var t=state.templates[step]||{subject:'',body:''};",
  "return '<h4>'+labels[step]+'</h4><label>Subject</label><input data-tsub=\"'+step+'\" value=\"'+esc(t.subject)+'\">'+'<label>Body</label><textarea data-tbody=\"'+step+'\" rows=\"6\">'+esc(t.body)+'</textarea>';}).join('');",
  "}",
  "function handleInvoiceAction(act, id){if(act==='delete'&&!confirm('Delete this invoice and its reminders?'))return;",
  "if(act==='paid'){api('/api/invoices/'+id,{method:'PATCH',body:JSON.stringify({status:'paid'})}).then(afterMutate);}",
  "else if(act==='pause'){var inv=state.invoices.find(function(i){return i.id===id;});api('/api/invoices/'+id,{method:'PATCH',body:JSON.stringify({paused:inv.paused?0:1})}).then(afterMutate);}",
  "else if(act==='delete'){api('/api/invoices/'+id,{method:'DELETE'}).then(afterMutate);}",
  "else if(act==='preview'){api('/api/invoices/'+id+'/preview').then(function(r){if(!r.ok){showAlert(r.body.error||'Could not preview.');return;}openModal('Next reminder preview','<p><b>To:</b> '+esc(r.body.to)+'</p><p><b>Subject:</b> '+esc(r.body.subject)+'</p><pre class=\"mail\">'+esc(r.body.body)+'</pre>');});}}",
  "function previewReminder(rid){api('/api/reminders/'+rid+'/preview').then(function(r){if(!r.ok){showAlert(r.body.error||'Could not preview.');return;}openModal('Reminder preview','<p><b>To:</b> '+esc(r.body.to)+'</p><p><b>Subject:</b> '+esc(r.body.subject)+'</p><pre class=\"mail\">'+esc(r.body.body)+'</pre>');});}",
  "function markSent(rid){api('/api/reminders/'+rid+'/mark-sent',{method:'POST'}).then(afterMutate);}",
  "function afterMutate(r){if(!r.ok){showAlert(r.body.error||'Something went wrong.');return;}loadAll(true);}",
  "function loadAll(quiet){Promise.all([api('/api/me'),api('/api/invoices'),api('/api/queue'),api('/api/templates')]).then(function(rs){",
  "if(!rs[0].ok){location.href='/login';return;}",
  "state.me=rs[0].body;state.invoices=rs[1].body.invoices||[];state.queue=rs[2].body.upcoming||[];state.sent=rs[2].body.sent||[];state.templates=rs[3].body.templates||{};render();});}",
  "document.getElementById('addForm').addEventListener('submit',function(e){e.preventDefault();var f=e.target;var data={client_name:f.client_name.value.trim(),client_email:f.client_email.value.trim(),amount:parseFloat(f.amount.value),due_date:f.due_date.value,pay_link:f.pay_link.value.trim()};api('/api/invoices',{method:'POST',body:JSON.stringify(data)}).then(function(r){if(!r.ok){showAlert(r.body.error||'Could not add invoice.');return;}f.reset();showAlert('Invoice added. Reminders scheduled for day 7, 14 and 30 after the due date.',true);loadAll(true);});});",
  "document.getElementById('csvBtn').addEventListener('click',function(){var file=document.getElementById('csvFile').files[0];if(!file){showAlert('Choose a CSV file first.');return;}var reader=new FileReader();reader.onload=function(){var lines=reader.result.split(/\\r?\\n/).filter(function(l){return l.trim();});var rows=[];lines.forEach(function(line){var parts=line.split(',').map(function(p){return p.trim().replace(/^\"|\"$/g,'');});if(parts.length<4)return;if(isNaN(parseFloat(parts[2])))return;rows.push({client_name:parts[0],client_email:parts[1],amount:parseFloat(parts[2]),due_date:parts[3],pay_link:parts[4]||''});});if(!rows.length){showAlert('No valid rows found. Expected: client, email, amount, due date.');return;}api('/api/invoices/import',{method:'POST',body:JSON.stringify({invoices:rows})}).then(function(r){if(!r.ok){showAlert(r.body.error||'Import failed.');return;}showAlert('Imported '+r.body.imported+' invoice(s). '+(r.body.skipped?'Skipped '+r.body.skipped+' (free-plan limit).':''),true);loadAll(true);});};reader.readAsText(file);});",
  "document.getElementById('saveTemplates').addEventListener('click',function(){var templates={};[1,2,3].forEach(function(step){templates[step]={subject:document.querySelector('[data-tsub=\"'+step+'\"]').value,body:document.querySelector('[data-tbody=\"'+step+'\"]').value};});api('/api/templates',{method:'PUT',body:JSON.stringify({templates:templates})}).then(function(r){if(!r.ok){showAlert(r.body.error||'Could not save.');return;}showAlert('Templates saved.',true);});});",
  "document.getElementById('settingsForm').addEventListener('submit',function(e){e.preventDefault();api('/api/settings',{method:'PUT',body:JSON.stringify({business_name:document.getElementById('setBusiness').value.trim(),currency:document.getElementById('setCurrency').value})}).then(function(r){if(!r.ok){showAlert(r.body.error||'Could not save.');return;}showAlert('Settings saved.',true);loadAll(true);});});",
  "loadAll(false);",
].join('\n');
