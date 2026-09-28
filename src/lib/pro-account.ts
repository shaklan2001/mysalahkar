export type ProAccount = {
  name: string;
  email: string;
  phone: string;
  firm: string;
};

const STORAGE_KEY = "mysalahkar.pro.account";

export function saveProAccount(account: ProAccount) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(account));
}

export function readProAccount(): ProAccount | null {
  if (typeof window === "undefined") return null;
  try {
    const parsed: unknown = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "null");
    if (!parsed || typeof parsed !== "object") return null;
    const record = parsed as Partial<ProAccount>;
    if (typeof record.email !== "string" || !record.email.includes("@")) return null;
    return {
      name: typeof record.name === "string" ? record.name : "",
      email: record.email,
      phone: typeof record.phone === "string" ? record.phone : "",
      firm: typeof record.firm === "string" ? record.firm : "",
    };
  } catch {
    return null;
  }
}
