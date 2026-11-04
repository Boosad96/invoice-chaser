// On-chain verification of USDT (BEP-20) plan payments on BNB Smart Chain.
// A payment is confirmed ONLY when a real BSC transaction shows the exact
// plan amount of USDT moving to the site's wallet. Nothing is trusted from
// the customer's word alone, and no payment is ever upgraded without this
// check passing.

export const USDT_BEP20 = '0x55d398326f99059fF775485246999027B3197955';
export const PAY_TO = '0xB202F2AB1257de36c0A52f8d1c227CCba4a95Fd2';
export const TRANSFER_TOPIC = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

const BSC_RPCS = [
  'https://bsc-dataseed.binance.org/',
  'https://bsc-rpc.publicnode.com',
  'https://1rpc.io/bnb',
  'https://bsc.meowrpc.com',
  'https://binance.llamarpc.com',
];

export const PLAN_PRICES = { starter: 19, pro: 49 };
// USDT has 6 decimals: $19 = 19,000,000 units, $49 = 49,000,000 units.
export function planUnits(plan) {
  return BigInt(PLAN_PRICES[plan] || 0) * 1000000n;
}

export function formatUsdt(units) {
  const whole = units / 1000000n;
  const frac = units % 1000000n;
  if (frac === 0n) return whole.toString();
  return whole.toString() + '.' + frac.toString().padStart(6, '0').replace(/0+$/, '');
}

export function validTxHash(h) {
  return typeof h === 'string' && /^0x[0-9a-fA-F]{64}$/.test(h);
}

// Verify one transaction against the expected USDT amount.
// Returns { state, amountUnits, from } where state is one of:
//   'confirmed' | 'not_found' | 'failed' | 'wrong_recipient' |
//   'wrong_amount' | 'not_usdt' | 'rpc_unavailable'
export async function verifyUsdtPayment(txHash, expectedUnits) {
  let anyResponded = false;
  for (const rpc of BSC_RPCS) {
    let receipt = null;
    try {
      const res = await fetch(rpc, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'eth_getTransactionReceipt', params: [txHash] }),
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) continue;
      const data = await res.json();
      anyResponded = true;
      receipt = data && data.result ? data.result : null;
    } catch {
      continue; // endpoint down: try the next one
    }
    if (!receipt) continue; // not seen by this node yet: another may have it
    if (receipt.status !== '0x1') return { state: 'failed', amountUnits: null, from: null };
    let sawUsdt = false;
    let wrongAmount = null;
    for (const log of receipt.logs || []) {
      if (!log.topics || log.topics.length < 3) continue;
      if (String(log.address).toLowerCase() !== USDT_BEP20.toLowerCase()) continue;
      if (String(log.topics[0]).toLowerCase() !== TRANSFER_TOPIC) continue;
      sawUsdt = true;
      const to = '0x' + String(log.topics[2]).slice(-40);
      if (to.toLowerCase() !== PAY_TO.toLowerCase()) continue;
      let amount = null;
      try { amount = BigInt(log.data); } catch { continue; }
      const from = '0x' + String(log.topics[1]).slice(-40);
      if (amount === expectedUnits) return { state: 'confirmed', amountUnits: amount, from };
      if (!wrongAmount) wrongAmount = { state: 'wrong_amount', amountUnits: amount, from };
    }
    if (wrongAmount) return wrongAmount;
    return { state: sawUsdt ? 'wrong_recipient' : 'not_usdt', amountUnits: null, from: null };
  }
  return { state: anyResponded ? 'not_found' : 'rpc_unavailable', amountUnits: null, from: null };
}
