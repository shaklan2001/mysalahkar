import type { Metadata } from "next";
import { Scale, Users, AlertTriangle, FileCheck, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Compliance & Regulatory Oversight",
  description:
    "How My Salahkar ensures compliance across tax, legal, and financial domains. AI + human oversight for regulatory accuracy.",
};

export default function CompliancePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="border-b border-border/70 bg-white/60 section-pad">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Compliance
            </p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
              Compliance &amp; regulatory oversight
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Our AI Salahkars are designed with compliance at the core, backed by
              human expertise and clear escalation paths for regulated activities.
            </p>
          </div>
        </div>
      </section>

      {/* Regulatory Domains */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">
            Regulatory Domains We Cover
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-bold text-slate-900">
                Tax & GST Compliance
              </h3>
              <p className="mb-4 text-slate-600">
                Income Tax Act, GST Law, TDS provisions, advance tax, ITR filing guidance,
                and GST return preparation.
              </p>
              <div className="text-sm text-slate-500">
                <strong>Oversight:</strong> Chartered Accountants (ICAI)
              </div>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-bold text-slate-900">
                Company Law & ROC
              </h3>
              <p className="mb-4 text-slate-600">
                Companies Act, LLP Act, incorporation, board resolutions, ROC filings, annual
                compliance, and statutory registers.
              </p>
              <div className="text-sm text-slate-500">
                <strong>Oversight:</strong> Company Secretaries (ICSI)
              </div>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-bold text-slate-900">
                FEMA & Cross-Border
              </h3>
              <p className="mb-4 text-slate-600">
                Foreign Exchange Management Act, ODI/FDI regulations, import/export
                compliance, and remittance rules.
              </p>
              <div className="text-sm text-slate-500">
                <strong>Oversight:</strong> CAs & Legal Counsel
              </div>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-bold text-slate-900">
                Contracts & Agreements
              </h3>
              <p className="mb-4 text-slate-600">
                Contract drafting guidance, employment law, intellectual property basics,
                non-disclosure agreements, and licensing.
              </p>
              <div className="text-sm text-slate-500">
                <strong>Oversight:</strong> Advocates (Bar Council)
              </div>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-bold text-slate-900">
                Wealth & Investment
              </h3>
              <p className="mb-4 text-slate-600">
                Tax-efficient investing, capital gains planning, mutual funds, equity
                analysis, and portfolio construction.
              </p>
              <div className="text-sm text-slate-500">
                <strong>Oversight:</strong> RIAs (SEBI Registered)
              </div>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-bold text-slate-900">
                Insolvency & Bankruptcy
              </h3>
              <p className="mb-4 text-slate-600">
                IBC provisions, resolution plans, creditor rights, CIRP timelines, and
                liquidation procedures.
              </p>
              <div className="text-sm text-slate-500">
                <strong>Oversight:</strong> Insolvency Professionals (IBBI)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI + Human Model */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">
              AI + Human Oversight Model
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              We combine AI efficiency with human expertise to ensure accuracy, compliance,
              and ethical advice delivery.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-xl bg-white p-8 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">What AI Can Do</h3>
              </div>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Interpret tax provisions and calculate liabilities</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Draft compliance checklists and filing guides</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Explain legal concepts and regulatory timelines</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Provide investment tax planning strategies</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Generate document templates and format guidance</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Answer 'how-to' and procedural questions instantly</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl bg-white p-8 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  When Humans Take Over
                </h3>
              </div>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-2">
                  <span className="text-blue-600">→</span>
                  <span>Court representation or litigation strategy</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">→</span>
                  <span>Signing/attesting statutory filings (CA/CS signature required)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">→</span>
                  <span>Tax notice responses and assessment appeals</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">→</span>
                  <span>Complex M&A, restructuring, or due diligence</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">→</span>
                  <span>Portfolio management or discretionary trading (SEBI rules)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">→</span>
                  <span>High-stakes or legally-binding decisions requiring professional judgment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Important Disclaimers */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-8">
            <div className="mb-4 flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 shrink-0 text-amber-600" />
              <h2 className="text-2xl font-bold text-slate-900">Important Disclaimers</h2>
            </div>

            <div className="space-y-4 text-slate-700">
              <p>
                <strong>Not a Substitute for Licensed Representation:</strong> My Salahkar
                provides informational guidance and AI-assisted consultancy. For activities
                requiring professional licensing — such as court appearances, statutory
                attestations, or regulatory filings with professional sign-off — you must
                engage a licensed CA, CS, advocate, or RIA. We facilitate these escalations
                when needed.
              </p>

              <p>
                <strong>No Attorney-Client or CA-Client Privilege:</strong> Conversations
                with our AI Salahkars do not establish a formal attorney-client or CA-client
                relationship unless you explicitly engage a licensed professional through our
                escalation path. AI advice is guidance, not legal or professional opinion
                binding in court or before regulatory authorities.
              </p>

              <p>
                <strong>Regulatory Changes:</strong> Indian regulations evolve frequently.
                While we update our AI models regularly, there may be a lag between new
                notifications and model updates. Always verify critical information with
                official sources or licensed professionals.
              </p>

              <p>
                <strong>Your Responsibility:</strong> You are ultimately responsible for your
                compliance, tax filings, and legal decisions. Our service supports informed
                decision-making but does not replace your duty of care and due diligence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Escalation Path */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Clear Escalation Path to Licensed Professionals
          </h2>

          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="mb-2 font-bold">AI Consultation</h3>
              <p className="text-sm text-slate-300">
                Start with instant AI guidance for most queries
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="mb-2 font-bold">Complexity Detection</h3>
              <p className="text-sm text-slate-300">
                AI flags cases requiring human expertise
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="mb-2 font-bold">Professional Match</h3>
              <p className="text-sm text-slate-300">
                We connect you with the right licensed expert
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="mb-2 font-bold">Human Resolution</h3>
              <p className="text-sm text-slate-300">
                Get professional opinion, attestation, or representation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-slate-900">
            Questions About Compliance?
          </h2>
          <p className="mb-6 text-lg text-slate-600">
            Our compliance team is available to address your concerns.
          </p>
          <a
            href="mailto:compliance@mysalahkar.com"
            className="inline-flex items-center gap-2 text-lg font-semibold text-blue-600 underline decoration-2 underline-offset-4 hover:text-blue-700"
          >
            compliance@mysalahkar.com
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
