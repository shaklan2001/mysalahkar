/**
 * Contact details typed on the professional sign-up form, kept for this browser tab only so the
 * listing application can be pre-filled. Not a session: the account itself lives on the API.
 */

export type ProSignupDraft = {
  phone: string;
  firm: string;
};

const STORAGE_KEY = "mysalahkar.pro.draft";

export function saveProDraft(draft: ProSignupDraft) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // Storage blocked: the application form just starts empty.
  }
}

export function readProDraft(): ProSignupDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const parsed: unknown = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "null");
    if (!parsed || typeof parsed !== "object") return null;
    const record = parsed as Partial<ProSignupDraft>;
    return {
      phone: typeof record.phone === "string" ? record.phone : "",
      firm: typeof record.firm === "string" ? record.firm : "",
    };
  } catch {
    return null;
  }
}
