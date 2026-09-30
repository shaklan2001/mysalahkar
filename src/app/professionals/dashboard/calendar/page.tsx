import { ScheduleView } from "@/components/client/ClientCalendar";

export default function ProCalendarPage() {
  return (
    <ScheduleView
      viewer="professional"
      description="Client consultations booked with you, with their Google Meet links."
      emptyMessage="New bookings from clients will appear here."
    />
  );
}
