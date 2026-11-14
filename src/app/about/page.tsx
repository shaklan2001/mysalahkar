import type { Metadata } from "next";
import Image from "next/image";
import {
  Compass,
  BadgeCheck,
  Cpu,
  Landmark,
  Newspaper,
  ShieldCheck,
} from "lucide-react";
import { AboutCTA } from "./AboutCTA";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "MySalahkar brings qualified finance, tax, legal and compliance professionals together with AI-powered consultancy, a Smart Loan tool and daily updates, so you get the right advice at the right time.",
};

const founders = [
  {
    name: "CA Ankit Gupta",
    image: "/consultants/ankit-gupta.jpg",
    credentials: [
      "Founder & CEO",
      "Chartered Accountant",
      "DIP-IFRS UK",
      "IIM Lucknow Alumnus",
    ],
    paragraphs: [
      "Building MySalahkar to bring the speed of AI and the assurance of expert professionals together on one platform, at every stage of a business’s journey.",
      "A Chartered Accountant and business consultant with 15+ years of experience in taxation, GST, mergers and acquisitions, business restructuring and startup advisory. He has advised businesses, startups and corporates across the full business lifecycle, from setup and tax structuring to compliance, transactions and growth.",
      "His work spans corporate tax planning, M&A taxation, due diligence, statutory and tax audits, and internal controls. He leads MySalahkar’s mission to make trusted professional advice accessible across India, with AI supporting verified professionals.",
    ],
  },
  {
    name: "CS Soniya Gupta",
    image: "/consultants/soniya-gupta.jpg",
    credentials: [
      "Co-Founder & COO",
      "Company Secretary",
      "L.L.B.",
      "Insolvency Professional",
    ],
    paragraphs: [
      "A Company Secretary in Practice with 18+ years of experience in corporate and commercial advisory, IPR, corporate law, SEBI and listing compliances, POSH Training, insolvency and bankruptcy, and regulatory approvals. She provides end-to-end advisory and compliance support to companies, promoters and businesses, including representation before NCLT/NCLAT, MCA, the Regional Director, ROC and other regulatory authorities.",
      "Her experience also covers IPO due diligence, secretarial audits, FEMA/RBI compliance, and POSH advisory & training. She leads MySalahkar’s operations and its mission to make trusted professional advice accessible across India.",
    ],
  },
];

const mandate = [
  {
    icon: Compass,
    title: "Right Professional, Right Need",
    body: "Whether it’s a CA for taxation, a CS for secretarial compliance, a lawyer for legal advice, or a consultant for project finance, we help you reach the right expert instead of searching blindly.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Professionals",
    body: "Every professional on MySalahkar is verified before joining. You can approach a CA, CS, lawyer, or advisor knowing their credentials have been checked, and that they follow our Professional Community Policy.",
  },
  {
    icon: Cpu,
    title: "Technology That Supports, Not Replaces",
    body: "Our AI agents give quick, accessible guidance. They support professional advice and do not replace it. For decisions that matter, you work directly with a qualified professional.",
  },
  {
    icon: Landmark,
    title: "Smarter Borrowing",
    body: "Our Smart Loan tool lets you compare offers and choose with more clarity and confidence.",
  },
  {
    icon: Newspaper,
    title: "Staying Informed",
    body: "Daily updates keep clients and professionals aware of tax, compliance, and regulatory changes that affect them.",
  },
];

const values = [
  {
    pillar: "Trust",
    promise: "Experienced professionals and recommendations that earn your confidence",
  },
  { pillar: "Clarity", promise: "Plain-language guidance, with no jargon" },
  {
    pillar: "Convenience",
    promise: "Advice, comparison, and compliance in one place",
  },
  {
    pillar: "Growth",
    promise: "Helping clients grow and professionals build their practice",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="border-b border-border/70 bg-white/60 section-pad">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              About
            </p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
              About MySalahkar
            </h1>
            <p className="mt-4 font-display text-xl font-medium text-foreground sm:text-2xl">
              Every business and every individual deserves trusted professional
              advice.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              MySalahkar brings qualified finance, tax, legal and compliance
              professionals together with AI-powered consultancy, a Smart Loan
              tool and daily updates, so you get the right advice at the right
              time.
            </p>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-3xl font-bold text-slate-900">
            Meet the Founders
          </h2>

          <div className="space-y-12">
            {founders.map((founder) => (
              <article
                key={founder.name}
                className="grid gap-8 rounded-2xl border bg-white p-6 shadow-sm sm:p-8 md:grid-cols-[220px_1fr]"
              >
                <div className="relative mx-auto aspect-square w-full max-w-[220px] overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    sizes="220px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {founder.name}
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {founder.credentials.map((credential) => (
                      <li
                        key={credential}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                      >
                        {credential}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-600">
                    {founder.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mandate Section */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Our Mandate
            </p>
            <h2 className="text-3xl font-bold text-slate-900">
              Why MySalahkar
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Financial, tax, corporate and legal advice is often scattered
              across consultants and professionals, with unclear fees and
              uncertain quality. MySalahkar brings it together in one place,
              with technology that saves time and professionals who are
              accountable for their work.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mandate.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-xl border bg-white p-6 shadow-sm"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">
                  {title}
                </h3>
                <p className="text-sm text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Our Values
          </p>
          <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">
            Values that guide every client relationship
          </h2>

          <div className="overflow-hidden rounded-xl border">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Pillar
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Promise
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {values.map((value) => (
                  <tr key={value.pillar}>
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {value.pillar}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {value.promise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex gap-3 rounded-xl bg-blue-50 p-5 text-sm text-slate-700">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
            <p>
              <span className="font-semibold text-slate-900">
                Trust in detail:
              </span>{" "}
              We work to ensure that professionals on our platform are
              qualified for the services they offer, and we hold them to a
              Professional Community Policy.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <AboutCTA />
    </div>
  );
}
