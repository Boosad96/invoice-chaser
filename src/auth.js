// Auth helpers: PBKDF2 password hashing + D1-backed sessions.
// Passwords are NEVER stored in plain text. Sessions are random tokens kept
// in an HttpOnly, SameSite=Lax cookie.

const enc = new TextEncoder();

function bufToB64(buf) {
  const bytes = new Uint8Array(buf);
  let s = '';
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s);
}

function b64ToBuf(s) {
  const bin = atob(s);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes.buffer;
}

export function newId() {
  return crypto.randomUUID();
}

function randomSalt() {
  const salt = new Uint8Array(16);
  crypto.getRandomValues(salt);
  return bufToB64(salt.buffer);
}

async function derive(password, saltB64) {
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: b64ToBuf(saltB64), iterations: 100000, hash: 'SHA-256' },
    key,
    256
  );
  return bufToB64(bits);
}

export async function hashPassword(password) {
  const salt = randomSalt();
  const hash = await derive(password, salt);
  return { salt, hash };
}

export async function verifyPassword(password, salt, hash) {
  const candidate = await derive(password, salt);
  return candidate === hash;
}

export async function createSession(db, userId) {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  const token = [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  await db.prepare('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)')
    .bind(token, userId, expires).run();
  return token;
}

export async function getSessionUser(db, request) {
  const cookie = request.headers.get('Cookie') || '';
  const match = cookie.match(/(?:^|;\s*)session=([^;]+)/);
  if (!match) return null;
  const token = decodeURIComponent(match[1]);
  const row = await db.prepare(
    'SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token = ? AND s.expires_at > ?'
  ).bind(token, new Date().toISOString()).first();
  return row || null;
}

export async function destroySession(db, request) {
  const cookie = request.headers.get('Cookie') || '';
  const match = cookie.match(/(?:^|;\s*)session=([^;]+)/);
  if (match) {
    await db.prepare('DELETE FROM sessions WHERE token = ?').bind(decodeURIComponent(match[1])).run();
  }
}

export function sessionCookie(token) {
  return 'session=' + encodeURIComponent(token) + '; HttpOnly; Path=/; Max-Age=2592000; SameSite=Lax; Secure';
}

export function clearSessionCookie() {
  return 'session=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; Secure';
}

export function requireSameOrigin(request) {
  const origin = request.headers.get('Origin');
  if (!origin) return true; // same-origin fetch always sends Origin; non-browser callers have none
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}
