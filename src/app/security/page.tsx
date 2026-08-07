import type { Metadata } from "next";
import { Shield, Lock, Eye, Database, FileCheck, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Security & Data Privacy",
  description:
    "Learn how My Salahkar protects your data. Encryption, DPDP compliance, and our commitment to never training on your conversations.",
};

export default function SecurityPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="border-b border-border/70 bg-white/60 section-pad">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Security
            </p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
              Security &amp; data privacy
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Your trust is our foundation. Learn how we protect your data,
              ensure privacy, and align with Indian data protection expectations.
            </p>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">
            Our Security Principles
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900">
                End-to-End Encryption
              </h3>
              <p className="text-slate-600">
                All conversations are encrypted in transit using TLS 1.3. Data at rest is
                encrypted using AES-256 encryption standards.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900">
                No Training on Your Data
              </h3>
              <p className="text-slate-600">
                Your conversations are never used to train or improve our AI models. Your
                queries remain yours — private and confidential.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                <Database className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900">
                Data Minimization
              </h3>
              <p className="text-slate-600">
                We collect only what's necessary to provide our service. No tracking pixels,
                no third-party analytics, no data brokers.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                <FileCheck className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900">DPDP Compliance</h3>
              <p className="text-slate-600">
                We comply with India's Digital Personal Data Protection Act (DPDP), 2023.
                Your rights, our responsibility.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 text-red-600">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900">
                Incident Response
              </h3>
              <p className="text-slate-600">
                In the unlikely event of a breach, we commit to notifying affected users
                within 72 hours as per DPDP guidelines.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900">
                Regular Audits
              </h3>
              <p className="text-slate-600">
                Our security practices are reviewed quarterly by external auditors. We
                maintain SOC 2 Type II equivalent controls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Handling */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">
            How We Handle Your Data
          </h2>

          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  What We Collect
                </h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-blue-600">•</span>
                    <span>
                      <strong>Conversations:</strong> Your queries and our AI responses for
                      quality control and escalation context
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600">•</span>
                    <span>
                      <strong>Contact Information:</strong> Email, phone (optional) for
                      human escalation and follow-ups
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600">•</span>
                    <span>
                      <strong>Technical Logs:</strong> IP addresses (anonymized after 7
                      days), timestamps, browser type for security
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600">•</span>
                    <span>
                      <strong>Payment Data:</strong> Processed by payment gateway partners;
                      we never store full card details
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  What We Don't Collect
                </h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-red-600">✕</span>
                    <span>Browsing history or third-party tracking</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600">✕</span>
                    <span>Location data beyond IP-based country detection</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600">✕</span>
                    <span>Social media profiles or contacts</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600">✕</span>
                    <span>Biometric or sensitive personal data (unless explicitly shared)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  Data Retention
                </h3>
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <ul className="space-y-3 text-slate-600">
                    <li>
                      <strong className="text-slate-900">Active Conversations:</strong>{" "}
                      Retained for 2 years for legal compliance and service improvement
                    </li>
                    <li>
                      <strong className="text-slate-900">Anonymized Logs:</strong> Retained
                      indefinitely for aggregate analysis (no PII)
                    </li>
                    <li>
                      <strong className="text-slate-900">Payment Records:</strong> 7 years
                      (Indian tax law requirement)
                    </li>
                    <li>
                      <strong className="text-slate-900">Deleted Accounts:</strong> All PII
                      purged within 30 days of deletion request
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  Your Rights (DPDP Act)
                </h3>
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Right to access your data</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Right to correct inaccurate data</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Right to erase your data (with legal exceptions)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Right to nominate a data guardian</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Right to grievance redressal</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-sm">
                    Contact{" "}
                    <a
                      href="mailto:privacy@mysalahkar.com"
                      className="font-medium text-blue-600 hover:text-blue-700"
                    >
                      privacy@mysalahkar.com
                    </a>{" "}
                    to exercise your rights.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Third-Party Services */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">
            Third-Party Services
          </h2>
          <div className="rounded-xl border bg-white p-8 shadow-sm">
            <p className="mb-4 text-slate-600">
              We use trusted third-party providers to deliver our service. All providers are
              carefully vetted and contractually required to maintain data security:
            </p>
            <ul className="space-y-3 text-slate-600">
              <li>
                <strong className="text-slate-900">Cloud Infrastructure:</strong> AWS (Mumbai
                region) for hosting and data storage
              </li>
              <li>
                <strong className="text-slate-900">AI Models:</strong> Anthropic Claude,
                OpenAI GPT — with Data Processing Agreements in place
              </li>
              <li>
                <strong className="text-slate-900">Payment Processing:</strong> Razorpay and
                Stripe — PCI DSS compliant
              </li>
              <li>
                <strong className="text-slate-900">Communication:</strong> Twilio (WhatsApp),
                AWS SES (email) — encrypted channels
              </li>
            </ul>
            <p className="mt-4 text-sm text-slate-500">
              We do not share customer data with advertisers, data brokers, or unrelated
              third parties. Ever.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-blue-600 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Questions About Our Security?
          </h2>
          <p className="mb-6 text-lg text-blue-100">
            Our security team is here to help. Reach out with any concerns.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:security@mysalahkar.com"
              className="text-lg font-semibold text-white underline decoration-2 underline-offset-4 hover:text-blue-100"
            >
              security@mysalahkar.com
            </a>
            <span className="text-blue-200">or</span>
            <a
              href="mailto:privacy@mysalahkar.com"
              className="text-lg font-semibold text-white underline decoration-2 underline-offset-4 hover:text-blue-100"
            >
              privacy@mysalahkar.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
