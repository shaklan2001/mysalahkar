import { randomBytes } from "node:crypto";

export type BookingArtifacts = {
  meetUrl: string;
  calendarUrl: string;
  documentPassword: string | null;
};

function meetCode() {
  const raw = randomBytes(8).toString("hex");
  return `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7, 10)}`;
}

function toGCalStamp(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function startFromPreferred(preferredTime?: string) {
  if (preferredTime && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(preferredTime)) {
    const parsed = new Date(preferredTime);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  const fallback = new Date();
  fallback.setDate(fallback.getDate() + 1);
  fallback.setHours(11, 0, 0, 0);
  return fallback;
}

export function createMockBookingArtifacts(input: {
  title: string;
  guestEmail: string;
  preferredTime?: string;
  hasDocument?: boolean;
}): BookingArtifacts {
  const meetUrl = `https://meet.google.com/${meetCode()}`;
  const start = startFromPreferred(input.preferredTime);
  const end = new Date(start.getTime() + 30 * 60 * 1000);
  const details = [
    `Join Google Meet: ${meetUrl}`,
    "Calendar invite is generated for you and the consultant.",
    "Email delivery is not sent in this demo.",
  ].join("\n");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: input.title,
    dates: `${toGCalStamp(start)}/${toGCalStamp(end)}`,
    details,
    location: meetUrl,
    add: `${input.guestEmail},consultations@mysalahkar.com`,
  });

  return {
    meetUrl,
    calendarUrl: `https://calendar.google.com/calendar/render?${params.toString()}`,
    documentPassword: input.hasDocument
      ? randomBytes(4).toString("hex")
      : null,
  };
}
