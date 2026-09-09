import type { Metadata } from "next";
import { Target, Users, Award, TrendingUp, Shield, Heart } from "lucide-react";
import { AboutCTA } from "./AboutCTA";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "My Salahkar is India's AI-first professional consultancy. Combining cutting-edge AI with human oversight to deliver expert CA, CS, legal, and financial advice.",
};

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
              About My Salahkar
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              We&apos;re reimagining professional consultancy for India — making
              expert CA, CS, legal, and financial advice accessible through AI,
              backed by human expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-slate-900">Our Mission</h2>
              <p className="mb-4 text-lg text-slate-600">
                Professional advice in India has been expensive, slow, and intimidating for
                too long. Small businesses, startups, and individuals often delay critical
                decisions because expert guidance feels out of reach.
              </p>
              <p className="mb-4 text-lg text-slate-600">
                My Salahkar changes that. We've built AI consultants trained on decades of
                regulatory knowledge, supervised by licensed professionals. The result?
                Instant, accurate answers at a fraction of traditional costs.
              </p>
              <p className="text-lg text-slate-600">
                We believe everyone deserves access to quality professional advice — whether
                you're filing your first GST return or structuring a ₹100 crore transaction.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">AI-First</h3>
                <p className="text-sm text-slate-600">
                  Leveraging cutting-edge language models trained specifically on Indian
                  regulatory frameworks.
                </p>
              </div>

              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">Human Oversight</h3>
                <p className="text-sm text-slate-600">
                  Every AI consultant is supervised by domain experts. Complex cases escalate
                  seamlessly.
                </p>
              </div>

              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">Trust & Accuracy</h3>
                <p className="text-sm text-slate-600">
                  We cite sources, acknowledge uncertainty, and never guess. Accuracy over
                  speed, always.
                </p>
              </div>

              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">For India</h3>
                <p className="text-sm text-slate-600">
                  Built for Indian regulations, languages, and business contexts. Not a
                  global tool adapted poorly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Story Section */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">The Story</h2>

          <div className="space-y-6 text-lg text-slate-600">
            <p>
              My Salahkar was born from frustration. As startup founders and business owners
              ourselves, we experienced the pain of waiting days for simple compliance
              answers, paying thousands for 15-minute consultations, and decoding cryptic
              legal jargon.
            </p>

            <p>
              In 2025, when large language models finally became capable of understanding
              complex regulatory text, we saw an opportunity. What if we could train AI on
              the entire corpus of Indian tax law, company regulations, FEMA guidelines, and
              case law — and make it conversational?
            </p>

            <p>
              We partnered with practicing CAs, CS professionals, lawyers, and wealth
              advisors to build domain-specific AI consultants. Each consultant was trained, tested,
              and refined over thousands of real queries. We added human oversight for
              quality control and escalation paths for complex cases.
            </p>

            <p>
              Today, My Salahkar handles thousands of consultations monthly across tax,
              legal, compliance, and financial domains. Our AI consultants resolve 90%+ of queries
              instantly, while our network of licensed professionals handles the rest.
            </p>

            <p className="font-semibold text-slate-900">
              We're just getting started. The goal is to democratize professional advice
              across India — one conversation at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Why Trust Us Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">
            Why Trust My Salahkar?
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900">
                Licensed Professional Network
              </h3>
              <p className="text-slate-600">
                Our escalation team includes practicing CAs, CS professionals, advocates, and
                RIAs licensed by ICAI, ICSI, Bar Councils, and SEBI.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900">
                No Training on Your Data
              </h3>
              <p className="text-slate-600">
                Your conversations are never used to train our models. All data is encrypted
                in transit and at rest. DPDP compliant.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900">
                Continuous Improvement
              </h3>
              <p className="text-slate-600">
                Every AI response is logged and reviewed. Errors trigger model updates. We're
                constantly learning and improving.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-blue-400">10,000+</div>
              <div className="text-slate-300">Queries Resolved</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-green-400">92%</div>
              <div className="text-slate-300">AI Resolution Rate</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-purple-400">&lt; 30s</div>
              <div className="text-slate-300">Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-amber-400">24/7</div>
              <div className="text-slate-300">Always Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <AboutCTA />
    </div>
  );
}
