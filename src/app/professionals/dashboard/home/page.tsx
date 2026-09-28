import { redirect } from "next/navigation";

export default function ProHomeRedirectPage() {
  redirect("/professionals/dashboard");
}
