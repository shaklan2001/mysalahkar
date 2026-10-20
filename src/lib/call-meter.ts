/** Display helper for a server-metered call. Billing happens on POST /calls/{id}/tick. */

const SECONDS_PER_MINUTE = 60;

export function formatClock(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds)) return "—";
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(seconds / SECONDS_PER_MINUTE);
  const rest = seconds % SECONDS_PER_MINUTE;
  return `${minutes}:${rest.toString().padStart(2, "0")}`;
}
