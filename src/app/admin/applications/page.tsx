import { Metadata } from "next";
import { AdminApplicationsPanel } from "@/components/admin/AdminApplicationsPanel";

export const metadata: Metadata = {
  title: "Admin — Listing applications",
  robots: { index: false, follow: false },
};

export default function AdminApplicationsPage() {
  return <AdminApplicationsPanel />;
}
