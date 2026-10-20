import { api, errorMessage } from "@/lib/api";
import { getSessionUser } from "@/lib/auth";
import type { Appointment } from "@/lib/data/appointments";

export type ApiBooking = {
  id: string;
  status: string;
  type: string;
  proSlug: string;
  proName: string;
  clientName: string;
  startsAt: string;
  endsAt: string;
  durationMinutes: number;
  meetUrl: string | null;
  calendarLink: string | null;
  note: string;
  documentName: string | null;
};

const SLOT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;

/** True when the value can be sent as startsAt: 15-minute mark, at least 30 minutes ahead. */
export function isBookableSlot(value: string): boolean {
  if (!SLOT.test(value)) return false;
  const start = new Date(value);
  if (Number.isNaN(start.getTime())) return false;
  if (start.getMinutes() % 15 !== 0 || start.getSeconds() !== 0) return false;
  return start.getTime() >= Date.now() + 30 * 60 * 1000;
}

export function bookingToAppointment(booking: ApiBooking, viewer: "client" | "professional"): Appointment {
  return {
    id: booking.id,
    title: booking.type === "human-escalation" ? "Escalation" : "Consultation",
    withName: viewer === "client" ? booking.proName : booking.clientName,
    clientName: booking.clientName,
    startsAt: booking.startsAt,
    durationMin: booking.durationMinutes,
    meetUrl: booking.meetUrl ?? "",
    service: booking.note || undefined,
  };
}

export async function loadBookings(viewer: "client" | "professional"): Promise<Appointment[]> {
  const scope = viewer === "professional" ? "pro" : "client";
  const [upcoming, past] = await Promise.all([
    api<{ items: ApiBooking[] }>(`/bookings?scope=${scope}&upcoming=true`),
    api<{ items: ApiBooking[] }>(`/bookings?scope=${scope}&upcoming=false`),
  ]);
  const seen = new Set<string>();
  return [...upcoming.items, ...past.items]
    .filter((booking) => {
      if (seen.has(booking.id) || booking.status === "cancelled" || booking.status === "failed") return false;
      seen.add(booking.id);
      return true;
    })
    .map((booking) => bookingToAppointment(booking, viewer));
}

type BookingResult = {
  meetUrl: string;
  calendarUrl: string;
};

/** Books a live professional. startsAt is a datetime-local value, treated as IST by the API. */
export async function createBooking(input: {
  proSlug: string;
  startsAt: string;
  phone: string;
  email?: string;
  note?: string;
  documentName?: string;
  type?: "booking" | "human-escalation";
}): Promise<BookingResult> {
  const user = getSessionUser();
  if (!user || (user.role !== "client" && user.role !== "admin")) {
    throw new Error("Sign in as a client to book a consultation.");
  }
  if (!isBookableSlot(input.startsAt)) {
    throw new Error("Choose a time at least 30 minutes from now, on a 15-minute mark.");
  }
  const data = await api<{ ok: true; booking: ApiBooking }>("/bookings", {
    method: "POST",
    body: {
      proSlug: input.proSlug,
      startsAt: input.startsAt,
      phone: input.phone,
      email: input.email || undefined,
      note: input.note ?? "",
      documentName: input.documentName || undefined,
      type: input.type ?? "booking",
      privacyConsent: true,
    },
  });
  return {
    meetUrl: data.booking.meetUrl ?? "",
    calendarUrl: data.booking.calendarLink ?? "",
  };
}

/** Public enquiry. No account required. */
export async function createLead(input: {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  source: "contact" | "escalation" | "website";
  proSlug?: string;
  preferredTime?: string;
}): Promise<void> {
  try {
    await api("/leads", {
      method: "POST",
      body: {
        name: input.name,
        email: input.email,
        phone: input.phone ?? "",
        message: input.message ?? "",
        source: input.source,
        proSlug: input.proSlug,
        preferredTime: input.preferredTime || undefined,
        privacyConsent: true,
      },
    });
  } catch (error) {
    throw new Error(errorMessage(error, "Could not send your request."));
  }
}
