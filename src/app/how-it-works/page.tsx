import type { Metadata } from "next";
import { MessageSquare, Phone, UserCheck, Sparkles, Clock, Shield } from "lucide-react";
import { HowItWorksCTA } from "./HowItWorksCTA";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how My Salahkar's AI consultants work — consult via WhatsApp, chat, or call. Instant answers with human escalation when you need it.",
};

export default function HowItWorksPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="border-b border-border/70 bg-white/60 section-pad">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              How it works
            </p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
              How My Salahkar works
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Expert AI consultancy at your fingertips. Consult via WhatsApp,
              chat, or call — with human oversight when you need it most.
            </p>
          </div>
        </div>
      </section>

      {/* Three Channels Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">
              Three Ways to Get Expert Advice
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Choose the channel that works best for you. Same expertise, different access points.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-xl border bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900">WhatsApp</h3>
              <p className="mb-4 text-slate-600">
                Message our AI consultants directly on WhatsApp. Get instant responses in your
                preferred language, 24/7.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-green-600">✓</span>
                  <span>No app installation needed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-green-600">✓</span>
                  <span>Voice notes supported</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-green-600">✓</span>
                  <span>Document sharing</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900">Web Chat</h3>
              <p className="mb-4 text-slate-600">
                Real-time chat with specialized AI consultants through our web platform. Rich
                formatting and file uploads.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-blue-600">✓</span>
                  <span>Multi-file upload support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-blue-600">✓</span>
                  <span>Conversation history</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-blue-600">✓</span>
                  <span>Desktop & mobile friendly</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900">Phone Call</h3>
              <p className="mb-4 text-slate-600">
                Schedule a call with our AI voice agents or request human escalation for
                complex matters.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-purple-600">✓</span>
                  <span>Natural conversation flow</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-purple-600">✓</span>
                  <span>Complex query resolution</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-purple-600">✓</span>
                  <span>Human expert fallback</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How AI Resolves Queries */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">
              AI That Understands Your Needs
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Our AI consultants are trained on decades of professional knowledge across tax, legal,
              compliance, and financial domains.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <span className="font-bold">1</span>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900">
                    Ask Your Question
                  </h3>
                  <p className="text-slate-600">
                    Type or speak your query in plain language. Our AI understands context
                    and nuance across multiple languages.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <span className="font-bold">2</span>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900">
                    Instant Analysis
                  </h3>
                  <p className="text-slate-600">
                    The AI consultant analyzes your query against regulatory frameworks, case
                    law, and best practices — in milliseconds.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <span className="font-bold">3</span>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900">
                    Get Actionable Answers
                  </h3>
                  <p className="text-slate-600">
                    Receive clear, step-by-step guidance with relevant citations, deadlines,
                    and next steps — no legal jargon unless you want it.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <span className="font-bold">4</span>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900">
                    Follow-Up & Clarify
                  </h3>
                  <p className="text-slate-600">
                    Ask follow-ups, request examples, or dive deeper. The conversation is
                    natural and continuous.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-8 shadow-sm">
              <h3 className="mb-6 text-xl font-bold text-slate-900">
                Our AI Handles Most Queries
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">GST & Tax Compliance</span>
                    <span className="text-slate-500">95%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-[95%] rounded-full bg-blue-600" />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">Company Law & ROC</span>
                    <span className="text-slate-500">92%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-[92%] rounded-full bg-blue-600" />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">FEMA & Cross-Border</span>
                    <span className="text-slate-500">88%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-[88%] rounded-full bg-blue-600" />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">Wealth Management</span>
                    <span className="text-slate-500">90%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-[90%] rounded-full bg-blue-600" />
                  </div>
                </div>
              </div>
              <p className="mt-6 text-sm text-slate-600">
                Based on 10,000+ resolved queries in 2026. Complex cases are escalated to
                human experts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Human Escalation */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-slate-900">
                Human Expert Escalation When You Need It
              </h2>
              <p className="mb-6 text-lg text-slate-600">
                Our AI knows its limits. For complex, sensitive, or high-stakes matters, we
                seamlessly connect you with licensed professionals.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <UserCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Automatic Escalation Triggers
                    </h4>
                    <p className="text-sm text-slate-600">
                      Court filings, litigation strategy, regulatory audits, M&A transactions
                      — these automatically route to human experts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Request Human Review Anytime
                    </h4>
                    <p className="text-sm text-slate-600">
                      Not satisfied with the AI response? Click "Escalate to Expert" and
                      we'll schedule a consultation within 24 hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      All AI Advice Supervised
                    </h4>
                    <p className="text-sm text-slate-600">
                      Every AI response is logged and periodically reviewed by domain experts
                      to ensure quality and compliance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-white p-8 lg:p-12">
              <h3 className="mb-6 text-2xl font-bold text-slate-900">
                When to Escalate to a Human Expert
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex gap-3">
                  <span className="text-blue-600">•</span>
                  <span>Court representation or litigation support</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600">•</span>
                  <span>Tax notices, scrutiny, or assessment appeals</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600">•</span>
                  <span>Complex cross-border M&A or restructuring</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600">•</span>
                  <span>High-value wealth structuring (₹1Cr+)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600">•</span>
                  <span>Regulatory filings requiring attestation</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600">•</span>
                  <span>Sensitive IP, employment, or family matters</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <HowItWorksCTA />
    </div>
  );
}
