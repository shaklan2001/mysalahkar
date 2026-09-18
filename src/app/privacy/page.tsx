import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "My Salahkar Privacy Policy — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold text-slate-900">Privacy Policy</h1>
        <p className="mb-8 text-sm text-slate-600">
          Last updated: September 16, 2026
        </p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">1. Introduction</h2>
            <p className="text-slate-600">
              My Salahkar Technologies Private Limited ("My Salahkar", "we", "us", or "our")
              operates the website mysalahkar.com and provides AI-powered professional
              consultancy services. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you use our services.
            </p>
            <p className="text-slate-600">
              We are committed to protecting your privacy and complying with the Digital
              Personal Data Protection Act, 2023 (DPDP Act) and other applicable Indian data
              protection laws.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              2. Information We Collect
            </h2>
            <h3 className="mb-2 text-xl font-semibold text-slate-900">
              2.1 Information You Provide
            </h3>
            <ul className="ml-6 list-disc space-y-1 text-slate-600">
              <li>
                <strong>Contact Information:</strong> Name, email address, phone number when
                you register or book a consultation
              </li>
              <li>
                <strong>Consultation Data:</strong> Questions, queries, documents (held with
                a share password), and information you share during AI or human consultations
              </li>
              <li>
                <strong>Payment Information:</strong> Billing details processed through our
                payment partners (we do not store full credit card details)
              </li>
              <li>
                <strong>Communication Records:</strong> Emails, chat transcripts, call
                recordings (with consent), and support tickets
              </li>
            </ul>

            <h3 className="mb-2 mt-4 text-xl font-semibold text-slate-900">
              2.2 Automatically Collected Information
            </h3>
            <ul className="ml-6 list-disc space-y-1 text-slate-600">
              <li>
                <strong>Device Information:</strong> IP address (anonymized after 7 days),
                browser type, operating system, device identifiers
              </li>
              <li>
                <strong>Usage Data:</strong> Pages visited, features used, time spent,
                referring URLs, and interaction patterns
              </li>
              <li>
                <strong>Location Data:</strong> Approximate location based on IP address
                (country/city level only)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              3. How We Use Your Information
            </h2>
            <ul className="ml-6 list-disc space-y-2 text-slate-600">
              <li>
                <strong>Service Delivery:</strong> To provide AI consultations, connect you
                with human experts, and fulfill your service requests
              </li>
              <li>
                <strong>Communication:</strong> To respond to inquiries, generate Google
                Calendar / Google Meet details for human consultations, and provide support
              </li>
              <li>
                <strong>Quality Control:</strong> To review AI responses for accuracy,
                compliance, and safety (human oversight)
              </li>
              <li>
                <strong>Legal Compliance:</strong> To maintain records as required by Indian
                tax, company, and financial services regulations
              </li>
              <li>
                <strong>Improvement:</strong> To analyze usage patterns and improve our
                services (using aggregated, anonymized data only)
              </li>
              <li>
                <strong>Security:</strong> To detect fraud, prevent abuse, and protect our
                platform and users
              </li>
            </ul>
            <p className="mt-4 text-slate-600">
              <strong>We do NOT use your consultation data to train AI models.</strong> Your
              queries and conversations remain confidential.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              4. Data Sharing and Disclosure
            </h2>
            <h3 className="mb-2 text-xl font-semibold text-slate-900">
              4.1 Service Providers
            </h3>
            <p className="text-slate-600">
              We share data with trusted third-party vendors who help us deliver our services:
            </p>
            <ul className="ml-6 list-disc space-y-1 text-slate-600">
              <li>
                <strong>Cloud Infrastructure:</strong> AWS (Mumbai region) for hosting and
                storage
              </li>
              <li>
                <strong>AI Models:</strong> Anthropic (Claude), OpenAI (GPT) for AI
                consultations — with Data Processing Agreements in place
              </li>
              <li>
                <strong>Payment Processors:</strong> Razorpay, Stripe for secure payment
                processing
              </li>
              <li>
                <strong>Communication:</strong> Twilio (WhatsApp, SMS), AWS SES (email)
              </li>
            </ul>

            <h3 className="mb-2 mt-4 text-xl font-semibold text-slate-900">
              4.2 Professional Escalations
            </h3>
            <p className="text-slate-600">
              When you request human escalation, we share relevant conversation context with
              licensed professionals (CAs, CS, advocates, RIAs) in our network to provide
              expert assistance.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold text-slate-900">
              4.3 Legal Requirements
            </h3>
            <p className="text-slate-600">
              We may disclose your information if required by law, court order, or regulatory
              authority, or to protect our legal rights and safety of others.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold text-slate-900">
              4.4 No Sale of Data
            </h3>
            <p className="text-slate-600">
              We do not sell, rent, or trade your personal information to third parties for
              marketing or advertising purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">5. Data Retention</h2>
            <ul className="ml-6 list-disc space-y-2 text-slate-600">
              <li>
                <strong>Active Consultations:</strong> Retained for 2 years for compliance and
                service continuity
              </li>
              <li>
                <strong>Financial Records:</strong> 7 years (as per Income Tax Act)
              </li>
              <li>
                <strong>Aggregated Analytics:</strong> Indefinitely (fully anonymized, no PII)
              </li>
              <li>
                <strong>Deleted Accounts:</strong> Personal data purged within 30 days of
                deletion request (except legally required records)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              6. Your Rights (Under DPDP Act)
            </h2>
            <p className="text-slate-600">
              You have the following rights. Consent for processing is collected by a
              required tick-box at login and before AI or human consultations.
            </p>
            <ul className="ml-6 list-disc space-y-2 text-slate-600">
              <li>
                <strong>Right to Access:</strong> Request a copy of your personal data
              </li>
              <li>
                <strong>Right to Correction:</strong> Update inaccurate or incomplete
                information
              </li>
              <li>
                <strong>Right to Erasure:</strong> Request deletion of your data (subject to
                legal retention requirements)
              </li>
              <li>
                <strong>Right to Nominate:</strong> Nominate another individual to exercise
                your rights in case of death or incapacity
              </li>
              <li>
                <strong>Right to Grievance Redressal:</strong> File complaints with our Data
                Protection Officer or the Data Protection Board of India
              </li>
            </ul>
            <p className="mt-4 text-slate-600">
              To exercise your rights, contact us at{" "}
              <a href="mailto:privacy@mysalahkar.com" className="text-blue-600 underline">
                privacy@mysalahkar.com
              </a>
              . We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">7. Data Security</h2>
            <p className="text-slate-600">
              We implement industry-standard security measures to protect your data:
            </p>
            <ul className="ml-6 list-disc space-y-1 text-slate-600">
              <li>TLS 1.3 encryption for data in transit</li>
              <li>AES-256 encryption for data at rest</li>
              <li>Role-based access controls for internal systems</li>
              <li>Regular security audits and penetration testing</li>
              <li>Employee training on data protection best practices</li>
            </ul>
            <p className="mt-4 text-slate-600">
              Despite our best efforts, no system is 100% secure. We cannot guarantee absolute
              security but commit to promptly addressing any breaches.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">8. Cookies and Tracking</h2>
            <p className="text-slate-600">
              We use essential cookies for authentication and session management. We do not use
              third-party tracking cookies or advertising networks. See our{" "}
              <a href="/cookies" className="text-blue-600 underline">
                Cookie Policy
              </a>{" "}
              for details.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              9. Children's Privacy
            </h2>
            <p className="text-slate-600">
              Our services are not directed to individuals under 18 years of age. We do not
              knowingly collect personal information from minors. If you believe we have
              collected data from a minor, contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              10. International Data Transfers
            </h2>
            <p className="text-slate-600">
              Your data is primarily stored in India (AWS Mumbai region). Some service
              providers (Anthropic, OpenAI) may process data outside India with appropriate
              safeguards and Data Processing Agreements as per DPDP Act requirements.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              11. Changes to This Policy
            </h2>
            <p className="text-slate-600">
              We may update this Privacy Policy periodically. The "Last updated" date at the
              top indicates the latest revision. Material changes will be notified via email or
              prominent notice on our website.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">12. Contact Us</h2>
            <p className="text-slate-600">
              For privacy-related questions, concerns, or requests:
            </p>
            <div className="mt-4 rounded-lg bg-slate-50 p-6">
              <p className="text-slate-700">
                <strong>Data Protection Officer</strong>
                <br />
                My Salahkar Technologies Private Limited
                <br />
                HSR Layout, Bangalore 560102, Karnataka, India
                <br />
                Email:{" "}
                <a href="mailto:privacy@mysalahkar.com" className="text-blue-600 underline">
                  privacy@mysalahkar.com
                </a>
                <br />
                Phone: +91 80470 01234
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
