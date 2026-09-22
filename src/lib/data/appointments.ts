export type Appointment = {
  id: string;
  title: string;
  withName: string;
  startsAt: string;
  durationMin: number;
  meetUrl: string;
  service?: string;
};

/** Mock upcoming appointments with Google Meet links (demo). */
export const mockAppointments: Appointment[] = [
  {
    id: "apt-1",
    title: "Human Consultation — GST reconciliation",
    withName: "Ankit Gupta",
    startsAt: "2026-09-18T11:00:00+05:30",
    durationMin: 30,
    meetUrl: "https://meet.google.com/abc-defg-hij",
    service: "GST Returns",
  },
  {
    id: "apt-2",
    title: "Human Consultation — ROC annual filings",
    withName: "Sneha Iyer",
    startsAt: "2026-09-19T15:30:00+05:30",
    durationMin: 30,
    meetUrl: "https://meet.google.com/klm-nopq-rst",
    service: "AOC-4 / MGT-7",
  },
  {
    id: "apt-3",
    title: "Follow-up — Income tax notice response",
    withName: "Priya Nair",
    startsAt: "2026-09-20T10:00:00+05:30",
    durationMin: 45,
    meetUrl: "https://meet.google.com/uvw-xyza-bcd",
    service: "Income Tax Assessments",
  },
  {
    id: "apt-4",
    title: "FEMA LRS documentation review",
    withName: "Kabir Singh",
    startsAt: "2026-09-22T16:00:00+05:30",
    durationMin: 30,
    meetUrl: "https://meet.google.com/efg-hijk-lmn",
    service: "FEMA Advisory",
  },
];

export function appointmentsForViewer(_viewer: "client" | "professional") {
  return mockAppointments;
}
