import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with My Salahkar. Book a human consultation, request a callback, or reach us via email or phone.",
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="border-b border-border/70 bg-white/60 section-pad">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Contact
            </p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
              Get in touch
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Have a complex query? Want to speak to a human expert? We&apos;re
              here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="mb-6 text-3xl font-bold text-slate-900">
                Book a Human Consultation
              </h2>
              <p className="mb-8 text-slate-600">
                Fill out the form below and we'll connect you with the right expert within
                24 hours. For urgent matters, call us directly.
              </p>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="mb-6 text-2xl font-bold text-slate-900">
                  Other Ways to Reach Us
                </h3>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold text-slate-900">Email</h4>
                      <a
                        href="mailto:support@mysalahkar.com"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        support@mysalahkar.com
                      </a>
                      <p className="mt-1 text-sm text-slate-600">
                        We respond within 6 hours during business days
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold text-slate-900">Phone</h4>
                      <a
                        href="tel:+918047001234"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        +91 80470 01234
                      </a>
                      <p className="mt-1 text-sm text-slate-600">
                        Mon-Sat: 9:00 AM - 7:00 PM IST
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold text-slate-900">Office</h4>
                      <p className="text-slate-600">
                        My Salahkar Technologies Pvt. Ltd.
                        <br />
                        HSR Layout, Bangalore 560102
                        <br />
                        Karnataka, India
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold text-slate-900">Business Hours</h4>
                      <p className="text-slate-600">
                        AI Agents: 24/7
                        <br />
                        Human Support: Mon-Sat, 9 AM - 7 PM IST
                        <br />
                        Emergency Escalation: Available for paying clients
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-blue-50 p-6">
                <h4 className="mb-2 font-bold text-slate-900">Need Immediate Help?</h4>
                <p className="mb-4 text-slate-600">
                  For instant answers to most queries, try our AI agents first. They're
                  available 24/7 and can resolve 90%+ of questions immediately.
                </p>
                <a
                  href="/"
                  className="font-semibold text-blue-600 underline decoration-2 underline-offset-4 hover:text-blue-700"
                >
                  Start AI Consultation →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold text-slate-900">
                How quickly will I get a response?
              </h3>
              <p className="text-slate-600">
                AI agents respond instantly (within seconds). For human consultations booked
                via this form, we'll reach out within 24 hours on business days. Urgent
                matters can be escalated by calling us directly.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold text-slate-900">
                What's the cost of a human consultation?
              </h3>
              <p className="text-slate-600">
                Initial 15-minute consultations are free. Extended consultations start at
                ₹500 for 30 minutes, depending on complexity and domain. You'll see pricing
                upfront before booking.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold text-slate-900">
                Can I schedule a video call?
              </h3>
              <p className="text-slate-600">
                Yes! When we reach out, you can choose between phone, video (Google
                Meet/Zoom), or in-person meetings (for Bangalore clients). Video calls are
                our most popular option.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold text-slate-900">
                Do you provide ongoing retainer services?
              </h3>
              <p className="text-slate-600">
                Absolutely. We offer monthly retainer plans for businesses that need regular
                compliance, tax, or legal support. Contact us for custom pricing based on
                your needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
