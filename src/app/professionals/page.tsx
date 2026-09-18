import { redirect } from "next/navigation";

/** Primary nav uses Sign In → Professional Login / signup instead. */
export default function ProfessionalsPage() {
  redirect("/professionals/signup");
}
