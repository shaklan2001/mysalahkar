export type Appointment = {
  id: string;
  title: string;
  withName: string;
  startsAt: string;
  durationMin: number;
  meetUrl: string;
  service?: string;
  /** Who the professional is meeting (the client side of the booking). */
  clientName?: string;
};

/** Mock upcoming appointments with Google Meet links (demo). */
export const mockAppointments: Appointment[] = [
  {
    id: "apt-1",
    clientName: "Ravi Traders",
    title: "Human Consultation — GST reconciliation",
    withName: "Ankit Gupta",
    startsAt: "2026-10-02T11:00:00+05:30",
    durationMin: 30,
    meetUrl: "https://meet.google.com/abc-defg-hij",
    service: "GST Returns",
  },
  {
    id: "apt-2",
    clientName: "Nova Soft Pvt Ltd",
    title: "Human Consultation — ROC annual filings",
    withName: "Sneha Iyer",
    startsAt: "2026-10-03T15:30:00+05:30",
    durationMin: 30,
    meetUrl: "https://meet.google.com/klm-nopq-rst",
    service: "AOC-4 / MGT-7",
  },
  {
    id: "apt-3",
    clientName: "Priya Nair",
    title: "Follow-up — Income tax notice response",
    withName: "Priya Nair",
    startsAt: "2026-10-06T10:00:00+05:30",
    durationMin: 45,
    meetUrl: "https://meet.google.com/uvw-xyza-bcd",
    service: "Income Tax Assessments",
  },
  {
    id: "apt-4",
    clientName: "Aarav Kapoor",
    title: "FEMA LRS documentation review",
    withName: "Kabir Singh",
    startsAt: "2026-10-08T16:00:00+05:30",
    durationMin: 30,
    meetUrl: "https://meet.google.com/efg-hijk-lmn",
    service: "FEMA Advisory",
  },
  {
    id: "apt-0",
    clientName: "Greenfield Foods",
    title: "Human Consultation — Startup incorporation",
    withName: "Soniya Gupta",
    startsAt: "2026-09-24T12:00:00+05:30",
    durationMin: 30,
    meetUrl: "https://meet.google.com/opq-rstu-vwx",
    service: "Private Limited Company",
  },
];

export function appointmentsForViewer(_viewer: "client" | "professional") {
  return mockAppointments;
}

function endsAt(apt: Appointment) {
  return new Date(apt.startsAt).getTime() + apt.durationMin * 60_000;
}

/** Split into upcoming (soonest first) and past (most recent first). */
export function splitAppointments(list: Appointment[], now = Date.now()) {
  const upcoming = list
    .filter((apt) => endsAt(apt) >= now)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  const past = list
    .filter((apt) => endsAt(apt) < now)
    .sort((a, b) => b.startsAt.localeCompare(a.startsAt));
  return { upcoming, past };
}
