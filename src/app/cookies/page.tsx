import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "My Salahkar Cookie Policy — how we use cookies and similar technologies on our platform.",
};

export default function CookiesPage() {
  return (
    <div className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold text-slate-900">Cookie Policy</h1>
        <p className="mb-8 text-sm text-slate-600">Last updated: July 24, 2026</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">1. What Are Cookies?</h2>
            <p className="text-slate-600">
              Cookies are small text files stored on your device (computer, smartphone, tablet)
              when you visit a website. They help websites remember your preferences, session
              state, and provide analytics about how the site is used.
            </p>
            <p className="text-slate-600">
              Similar technologies like local storage, session storage, and web beacons serve
              comparable purposes. This policy covers all such technologies, collectively
              referred to as "cookies."
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              2. How We Use Cookies
            </h2>
            <p className="text-slate-600">
              My Salahkar uses cookies to provide, secure, and improve our services. We follow
              a privacy-first approach and minimize cookie usage.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              3. Types of Cookies We Use
            </h2>

            <div className="space-y-6">
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-xl font-bold text-slate-900">
                  3.1 Strictly Necessary Cookies
                </h3>
                <p className="mb-2 text-slate-600">
                  <strong>Purpose:</strong> Essential for the website to function. You cannot
                  opt out of these cookies.
                </p>
                <p className="text-slate-600">
                  <strong>Examples:</strong>
                </p>
                <ul className="ml-6 list-disc space-y-1 text-slate-600">
                  <li>
                    <strong>Authentication:</strong> Session cookies to keep you logged in
                  </li>
                  <li>
                    <strong>Security:</strong> CSRF tokens to prevent cross-site attacks
                  </li>
                  <li>
                    <strong>Load Balancing:</strong> Routing requests to the correct server
                  </li>
                </ul>
                <p className="mt-2 text-sm text-slate-500">
                  <strong>Duration:</strong> Session-based (deleted when you close the browser)
                  or up to 30 days for "remember me" functionality
                </p>
              </div>

              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-xl font-bold text-slate-900">
                  3.2 Functional Cookies
                </h3>
                <p className="mb-2 text-slate-600">
                  <strong>Purpose:</strong> Remember your preferences and enhance user
                  experience.
                </p>
                <p className="text-slate-600">
                  <strong>Examples:</strong>
                </p>
                <ul className="ml-6 list-disc space-y-1 text-slate-600">
                  <li>
                    <strong>Language Preference:</strong> Remember your chosen language
                  </li>
                  <li>
                    <strong>UI Settings:</strong> Dark mode, font size, sidebar state
                  </li>
                  <li>
                    <strong>Consultation Context:</strong> Remember which AI Salahkar you last
                    consulted
                  </li>
                </ul>
                <p className="mt-2 text-sm text-slate-500">
                  <strong>Duration:</strong> Up to 1 year
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  <strong>Opt-Out:</strong> You can clear these via browser settings, but some
                  features may not work optimally.
                </p>
              </div>

              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-xl font-bold text-slate-900">
                  3.3 Analytics Cookies
                </h3>
                <p className="mb-2 text-slate-600">
                  <strong>Purpose:</strong> Understand how users interact with our site to
                  improve performance and user experience.
                </p>
                <p className="text-slate-600">
                  <strong>What We Track:</strong>
                </p>
                <ul className="ml-6 list-disc space-y-1 text-slate-600">
                  <li>Pages visited and time spent</li>
                  <li>Click patterns and feature usage</li>
                  <li>Device type, browser, and screen size</li>
                  <li>Entry and exit pages</li>
                </ul>
                <p className="mt-2 text-slate-600">
                  <strong>Important:</strong> We use first-party analytics only (no Google
                  Analytics or third-party trackers). All data is anonymized and aggregated.
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  <strong>Duration:</strong> Up to 2 years (anonymized after 7 days)
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  <strong>Opt-Out:</strong> You can disable analytics cookies via our cookie
                  banner or browser settings.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              4. What We DON'T Use
            </h2>
            <div className="rounded-xl border-2 border-green-200 bg-green-50 p-6">
              <ul className="space-y-2 text-slate-700">
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>
                    <strong>No Third-Party Advertising Cookies:</strong> We don't use cookies
                    from ad networks (Google Ads, Facebook Pixel, etc.)
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>
                    <strong>No Cross-Site Tracking:</strong> We don't track you across other
                    websites
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>
                    <strong>No Behavioral Profiling:</strong> We don't build user profiles for
                    advertising purposes
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>
                    <strong>No Data Brokers:</strong> We don't sell cookie data to third
                    parties
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              5. Third-Party Cookies
            </h2>
            <p className="text-slate-600">
              We use minimal third-party services that may set their own cookies:
            </p>

            <div className="mt-4 space-y-4">
              <div className="rounded-lg bg-slate-50 p-4">
                <h4 className="mb-1 font-semibold text-slate-900">
                  Payment Processors (Razorpay, Stripe)
                </h4>
                <p className="text-sm text-slate-600">
                  Set cookies to process payments securely. Strictly necessary for checkout.
                  See their privacy policies for details.
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 p-4">
                <h4 className="mb-1 font-semibold text-slate-900">
                  Communication Services (Twilio)
                </h4>
                <p className="text-sm text-slate-600">
                  May set cookies for WhatsApp Web integration. Required for chat
                  functionality.
                </p>
              </div>
            </div>

            <p className="mt-4 text-slate-600">
              We do not control third-party cookies. Please review their respective privacy
              and cookie policies.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              6. Managing Your Cookie Preferences
            </h2>

            <h3 className="mb-2 text-xl font-semibold text-slate-900">
              6.1 Via Our Cookie Banner
            </h3>
            <p className="text-slate-600">
              When you first visit our site, you'll see a cookie banner allowing you to accept
              or customize cookie preferences. You can change your preferences anytime via the
              "Cookie Settings" link in the footer.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold text-slate-900">
              6.2 Via Browser Settings
            </h3>
            <p className="text-slate-600">
              Most browsers allow you to control cookies through settings:
            </p>
            <ul className="ml-6 list-disc space-y-1 text-slate-600">
              <li>
                <strong>Chrome:</strong> Settings → Privacy and security → Cookies and other
                site data
              </li>
              <li>
                <strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site
                Data
              </li>
              <li>
                <strong>Safari:</strong> Preferences → Privacy → Manage Website Data
              </li>
              <li>
                <strong>Edge:</strong> Settings → Cookies and site permissions
              </li>
            </ul>
            <p className="mt-4 text-slate-600">
              Note: Blocking all cookies may prevent certain features from working properly.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold text-slate-900">
              6.3 Do Not Track (DNT)
            </h3>
            <p className="text-slate-600">
              We respect "Do Not Track" browser signals and will disable analytics cookies if
              DNT is enabled.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">7. Mobile Apps</h2>
            <p className="text-slate-600">
              Our mobile apps may use similar technologies (device identifiers, local storage)
              for authentication and analytics. You can control app permissions through your
              device settings.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              8. Updates to This Policy
            </h2>
            <p className="text-slate-600">
              We may update this Cookie Policy to reflect changes in technology or regulation.
              The "Last updated" date indicates the latest revision. Material changes will be
              notified via email or website banner.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">9. Contact Us</h2>
            <p className="text-slate-600">
              Questions about our use of cookies?
            </p>
            <div className="mt-4 rounded-lg bg-slate-50 p-6">
              <p className="text-slate-700">
                <strong>My Salahkar Technologies Private Limited</strong>
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

          <section className="rounded-xl bg-blue-50 p-6">
            <h3 className="mb-2 text-lg font-bold text-slate-900">
              Summary: Our Commitment to Privacy
            </h3>
            <p className="text-slate-600">
              We use cookies responsibly. Essential cookies keep the site working; functional
              cookies improve your experience; analytics help us make the site better. We don't
              use advertising trackers, cross-site profiling, or sell your data. You're always
              in control.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
