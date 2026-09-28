import { redirect } from "next/navigation";

export default function ClientHomeRedirectPage() {
  redirect("/client/dashboard");
}
