/** Preset top-ups. Anything else is rejected on the server and in the browser. */
export const WALLET_TOP_UPS_RUPEES = [100, 500, 1000, 2000] as const;

const ALLOWED_RUPEES = new Set<number>(WALLET_TOP_UPS_RUPEES);
const BALANCE_KEY = "salahkar.wallet.paise";
const CREDITS_KEY = "salahkar.wallet.credits";
const WALLET_CHANGED = "salahkar-wallet";
/** ponytail: ₹50,000 browser cap. Replace localStorage with a server ledger if balances must persist across devices. */
const MAX_BALANCE_PAISE = 5_000_000;

export function paiseForTopUp(rupees: number): number | null {
  if (!Number.isInteger(rupees) || !ALLOWED_RUPEES.has(rupees)) return null;
  return rupees * 100;
}

export function formatRupees(paise: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(paise / 100);
}

function readCredits(): string[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(CREDITS_KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === "string");
  } catch {
    return [];
  }
}

export function readBalancePaise(): number {
  const raw = Number(localStorage.getItem(BALANCE_KEY));
  if (!Number.isInteger(raw) || raw < 0 || raw > MAX_BALANCE_PAISE) return 0;
  return raw;
}

function writeBalance(next: number): number {
  localStorage.setItem(BALANCE_KEY, String(next));
  window.dispatchEvent(new Event(WALLET_CHANGED));
  return next;
}

export function onWalletChange(listener: () => void): () => void {
  window.addEventListener(WALLET_CHANGED, listener);
  return () => window.removeEventListener(WALLET_CHANGED, listener);
}

/** Debits a whole-minute call charge. Returns the new balance, or null if it cannot be covered. */
export function debitWallet(amountPaise: number): number | null {
  if (!Number.isInteger(amountPaise) || amountPaise <= 0 || amountPaise > MAX_BALANCE_PAISE) return null;
  const balance = readBalancePaise();
  if (balance < amountPaise) return null;
  return writeBalance(balance - amountPaise);
}

/** Credits a verified Razorpay payment once. Returns the new balance in paise. */
export function creditWallet(paymentId: string, amountPaise: number): number {
  if (!/^pay_[A-Za-z0-9]+$/.test(paymentId)) {
    throw new Error("Invalid payment");
  }
  if (!WALLET_TOP_UPS_RUPEES.some((rupees) => rupees * 100 === amountPaise)) {
    throw new Error("Invalid amount");
  }

  const credits = readCredits();
  if (credits.includes(paymentId)) return readBalancePaise();

  const next = readBalancePaise() + amountPaise;
  if (next > MAX_BALANCE_PAISE) {
    throw new Error("Wallet limit reached");
  }

  writeBalance(next);
  localStorage.setItem(CREDITS_KEY, JSON.stringify([...credits, paymentId].slice(-40)));
  return next;
}

function selfCheck(): void {
  if (paiseForTopUp(100) !== 10_000) throw new Error("wallet top-up paise mismatch");
  if (paiseForTopUp(50) !== null) throw new Error("wallet top-up allowlist mismatch");
}

selfCheck();
