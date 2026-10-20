import type { Metadata } from "next";
import { BadgeCheck, CalendarRange, IndianRupee, UserRound } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { SmartLoan } from "@/components/loan/SmartLoan";

export const metadata: Metadata = {
  title: "Smart Loan",
  description:
    "Check personal-loan eligibility, compare partner-bank offers from My Mudra, and continue the application with the bank you choose.",
};

const criteria = [
  {
    icon: UserRound,
    title: "Age 21 to 60",
    body: "Your date of birth is how the banks check age.",
  },
  {
    icon: IndianRupee,
    title: "Salaried income",
    body: "Monthly salary in hand. Each bank sets its own minimum.",
  },
  {
    icon: BadgeCheck,
    title: "₹1,000 to ₹50 lakh",
    body: "The amount you want, within a personal-loan range.",
  },
  {
    icon: CalendarRange,
    title: "3 to 60 months",
    body: "How long you want to repay.",
  },
];

const steps = [
  { n: "1", title: "Share the loan", body: "Amount, tenure, salary, and date of birth." },
  { n: "2", title: "See who will lend", body: "Only banks with an offer for you are shown." },
  { n: "3", title: "Choose one", body: "We submit that choice and open the bank's application." },
];

export default function SmartLoanPage() {
  return (
    <>
      <PageHero
        align="left"
        size="compact"
        eyebrow="Personal loan"
        badge={{ label: "My Mudra partner banks" }}
        title="Smart Loan"
        highlight="shows what you qualify for."
        description="Tell us the personal loan you need. We check the criteria, list the banks that will lend, and send the offer you pick to that bank."
      />
      <section className="pb-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight">What the banks check</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {criteria.map(({ icon: Icon, title, body }) => (
              <li key={title} className="rounded-2xl border border-border bg-white p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-blue/10 text-accent">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-[15px] font-semibold tracking-tight">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </li>
            ))}
          </ul>
          <ol className="mt-5 grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <li key={step.n} className="rounded-2xl border border-border bg-white p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#001450] font-display text-sm font-semibold text-white">
                  {step.n}
                </span>
                <h3 className="mt-3 font-display text-[15px] font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SmartLoan />
          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted-foreground">
            Offers are fetched from My Mudra for salaried personal loans. Interest, fees, and approval are decided by the bank.
            Choosing an offer continues on the bank&apos;s website. My Salahkar does not sanction or disburse the loan.
          </p>
        </div>
      </section>
    </>
  );
}
