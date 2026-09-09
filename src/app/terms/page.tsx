import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "My Salahkar Terms of Service — your agreement with us when using our AI consultancy platform.",
};

export default function TermsPage() {
  return (
    <div className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold text-slate-900">Terms of Service</h1>
        <p className="mb-8 text-sm text-slate-600">Last updated: July 24, 2026</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p className="text-slate-600">
              By accessing or using My Salahkar's services (website, mobile app, WhatsApp,
              phone, or any other channel), you agree to be bound by these Terms of Service
              ("Terms"). If you do not agree to these Terms, do not use our services.
            </p>
            <p className="text-slate-600">
              These Terms constitute a legally binding agreement between you and My Salahkar
              Technologies Private Limited, a company incorporated in India.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              2. Description of Services
            </h2>
            <p className="text-slate-600">
              My Salahkar provides AI-powered professional consultancy services across tax,
              legal, compliance, and financial domains. Our services include:
            </p>
            <ul className="ml-6 list-disc space-y-1 text-slate-600">
              <li>AI-based query resolution and guidance</li>
              <li>Human expert escalation for complex matters</li>
              <li>Document templates and compliance checklists</li>
              <li>Educational resources and learning content</li>
              <li>Community forums and discussion platforms</li>
            </ul>
            <p className="mt-4 text-slate-600">
              <strong>Important:</strong> Our services provide informational guidance and
              consultancy support. They do not constitute formal legal advice, professional
              opinion, or a substitute for licensed representation where required by law.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">3. User Eligibility</h2>
            <p className="text-slate-600">
              You must be at least 18 years old to use our services. By using My Salahkar, you
              represent and warrant that you meet this age requirement and have the legal
              capacity to enter into these Terms.
            </p>
            <p className="text-slate-600">
              If you are using the services on behalf of an organization, you represent that
              you have the authority to bind that organization to these Terms.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">4. User Accounts</h2>
            <h3 className="mb-2 text-xl font-semibold text-slate-900">4.1 Registration</h3>
            <p className="text-slate-600">
              You may need to create an account to access certain features. You agree to
              provide accurate, current, and complete information during registration and keep
              your account information updated.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold text-slate-900">
              4.2 Account Security
            </h3>
            <p className="text-slate-600">
              You are responsible for maintaining the confidentiality of your account
              credentials and for all activities under your account. Notify us immediately of
              any unauthorized access or security breach.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold text-slate-900">
              4.3 Account Termination
            </h3>
            <p className="text-slate-600">
              We reserve the right to suspend or terminate your account if you violate these
              Terms, engage in fraudulent activity, or abuse our services.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">5. Acceptable Use</h2>
            <p className="text-slate-600">You agree NOT to:</p>
            <ul className="ml-6 list-disc space-y-2 text-slate-600">
              <li>
                Use our services for any unlawful, fraudulent, or malicious purpose
              </li>
              <li>
                Attempt to gain unauthorized access to our systems or other users' accounts
              </li>
              <li>
                Upload malware, viruses, or harmful code
              </li>
              <li>
                Scrape, crawl, or reverse-engineer our AI models or technology
              </li>
              <li>
                Harass, abuse, or threaten our staff, consultants, or other users
              </li>
              <li>
                Submit false, misleading, or intentionally inaccurate information
              </li>
              <li>
                Use our services to compete with us or build similar products
              </li>
              <li>
                Violate any applicable laws, regulations, or third-party rights
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              6. AI Services & Limitations
            </h2>
            <h3 className="mb-2 text-xl font-semibold text-slate-900">
              6.1 Nature of AI Advice
            </h3>
            <p className="text-slate-600">
              Our AI consultants provide informational guidance based on training data and
              regulatory knowledge. AI responses are not formal professional opinions and may
              contain errors, omissions, or outdated information.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold text-slate-900">6.2 No Warranty</h3>
            <p className="text-slate-600">
              We do not warrant that AI responses are accurate, complete, current, or suitable
              for your specific circumstances. You use AI guidance at your own risk.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold text-slate-900">
              6.3 Human Escalation
            </h3>
            <p className="text-slate-600">
              For critical decisions, regulatory filings, litigation, or matters requiring
              professional attestation, you must escalate to a licensed professional. We
              facilitate these escalations but do not guarantee availability or outcomes.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              7. Professional Relationship
            </h2>
            <h3 className="mb-2 text-xl font-semibold text-slate-900">
              7.1 No Attorney-Client or CA-Client Privilege
            </h3>
            <p className="text-slate-600">
              Conversations with AI consultants do not establish an attorney-client, CA-client, or
              any professional-client relationship unless you explicitly engage a licensed
              professional through our escalation service and a formal engagement letter is
              signed.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold text-slate-900">
              7.2 Independent Professionals
            </h3>
            <p className="text-slate-600">
              Licensed professionals in our network are independent contractors. We do not
              control their work product, professional judgment, or compliance with their
              respective licensing regulations.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold text-slate-900">
              7.3 Your Responsibility
            </h3>
            <p className="text-slate-600">
              You are ultimately responsible for your compliance, tax filings, legal
              decisions, and financial choices. Our services support informed decision-making
              but do not replace your due diligence or professional judgment.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              8. Payment and Billing
            </h2>
            <h3 className="mb-2 text-xl font-semibold text-slate-900">8.1 Fees</h3>
            <p className="text-slate-600">
              Some services are free; others require payment. Pricing is displayed upfront
              before booking or purchase. All fees are in Indian Rupees (INR) unless otherwise
              stated.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold text-slate-900">
              8.2 Subscriptions
            </h3>
            <p className="text-slate-600">
              Subscription plans auto-renew until canceled. You can cancel anytime from your
              account settings. Cancellations take effect at the end of the current billing
              period.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold text-slate-900">
              8.3 Refunds
            </h3>
            <p className="text-slate-600">
              Refunds are available within 7 days of purchase if you are unsatisfied with the
              service, provided you haven't extensively used the service. Human consultation
              fees are generally non-refundable once the consultation has occurred.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold text-slate-900">8.4 Taxes</h3>
            <p className="text-slate-600">
              All prices are exclusive of applicable taxes (GST, etc.). You are responsible
              for any taxes, duties, or levies imposed by your jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              9. Intellectual Property
            </h2>
            <h3 className="mb-2 text-xl font-semibold text-slate-900">9.1 Our IP</h3>
            <p className="text-slate-600">
              All content, software, AI models, designs, trademarks, and technology on My
              Salahkar are owned by us or our licensors. You may not copy, reproduce,
              distribute, or create derivative works without our written permission.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold text-slate-900">9.2 Your Content</h3>
            <p className="text-slate-600">
              You retain ownership of content you submit (queries, documents, etc.). By
              submitting content, you grant us a license to use, store, and process it to
              provide our services and for quality control purposes.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold text-slate-900">
              9.3 No Training on Your Data
            </h3>
            <p className="text-slate-600">
              We do not use your consultation data to train or improve our AI models. Your
              content remains confidential subject to our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              10. Disclaimers and Limitation of Liability
            </h2>
            <h3 className="mb-2 text-xl font-semibold text-slate-900">
              10.1 Service "As-Is"
            </h3>
            <p className="text-slate-600">
              Our services are provided "as-is" and "as available" without warranties of any
              kind, express or implied. We do not warrant uninterrupted, error-free, or secure
              access.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold text-slate-900">
              10.2 Limitation of Liability
            </h3>
            <p className="text-slate-600">
              To the maximum extent permitted by law, My Salahkar, its directors, employees,
              and partners shall not be liable for any indirect, incidental, consequential, or
              punitive damages arising from your use of our services, including but not
              limited to:
            </p>
            <ul className="ml-6 list-disc space-y-1 text-slate-600">
              <li>Tax penalties, interest, or notices resulting from reliance on our advice</li>
              <li>Legal disputes or litigation costs</li>
              <li>Financial losses from investment or business decisions</li>
              <li>Data loss or security breaches</li>
            </ul>
            <p className="mt-4 text-slate-600">
              Our total liability for any claim shall not exceed the amount you paid us in the
              12 months preceding the claim, or ₹10,000, whichever is lower.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">11. Indemnification</h2>
            <p className="text-slate-600">
              You agree to indemnify and hold harmless My Salahkar, its officers, employees,
              and agents from any claims, damages, or expenses (including legal fees) arising
              from:
            </p>
            <ul className="ml-6 list-disc space-y-1 text-slate-600">
              <li>Your violation of these Terms</li>
              <li>Your misuse of our services</li>
              <li>Your violation of any law or third-party rights</li>
              <li>Content you submit to our platform</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              12. Governing Law and Dispute Resolution
            </h2>
            <h3 className="mb-2 text-xl font-semibold text-slate-900">12.1 Governing Law</h3>
            <p className="text-slate-600">
              These Terms are governed by the laws of India. Any disputes shall be subject to
              the exclusive jurisdiction of courts in Bangalore, Karnataka.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold text-slate-900">
              12.2 Arbitration
            </h3>
            <p className="text-slate-600">
              For disputes exceeding ₹1,00,000, either party may opt for arbitration under the
              Arbitration and Conciliation Act, 1996, with the seat of arbitration in
              Bangalore.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">13. Modifications</h2>
            <p className="text-slate-600">
              We may modify these Terms at any time. Material changes will be notified via
              email or prominent website notice at least 15 days before taking effect.
              Continued use after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">14. Termination</h2>
            <p className="text-slate-600">
              You may stop using our services at any time. We may suspend or terminate your
              access if you violate these Terms. Upon termination, your right to use our
              services ceases immediately.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">15. Miscellaneous</h2>
            <ul className="ml-6 list-disc space-y-2 text-slate-600">
              <li>
                <strong>Entire Agreement:</strong> These Terms constitute the entire agreement
                between you and My Salahkar regarding the services.
              </li>
              <li>
                <strong>Severability:</strong> If any provision is found unenforceable, the
                remaining provisions remain in effect.
              </li>
              <li>
                <strong>No Waiver:</strong> Our failure to enforce any right does not waive
                that right.
              </li>
              <li>
                <strong>Assignment:</strong> You may not assign these Terms without our
                consent. We may assign them to any successor or affiliate.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">16. Contact Us</h2>
            <p className="text-slate-600">
              For questions about these Terms, contact:
            </p>
            <div className="mt-4 rounded-lg bg-slate-50 p-6">
              <p className="text-slate-700">
                <strong>My Salahkar Technologies Private Limited</strong>
                <br />
                HSR Layout, Bangalore 560102, Karnataka, India
                <br />
                Email:{" "}
                <a href="mailto:legal@mysalahkar.com" className="text-blue-600 underline">
                  legal@mysalahkar.com
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
