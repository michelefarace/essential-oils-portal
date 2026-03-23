import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description: `Privacy Policy for ${SITE_NAME}. Learn how we collect, use, and protect your personal information.`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-bark mb-2">
          Privacy Policy
        </h1>
        <p className="text-bark/50 text-sm mb-10">
          Last updated: March 2026
        </p>

        <div className="prose-custom space-y-8">
          {/* Introduction */}
          <section>
            <p className="text-bark/70 leading-relaxed">
              At {SITE_NAME}, we take your privacy seriously. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you visit our website. Please read this policy
              carefully. By using our site, you consent to the data practices
              described in this policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              1. Information We Collect
            </h2>
            <h3 className="font-semibold text-bark mb-2">
              Personal Information You Provide
            </h3>
            <p className="text-bark/70 leading-relaxed mb-3">
              We may collect personal information that you voluntarily provide
              when you:
            </p>
            <ul className="list-disc list-inside text-bark/70 space-y-1 ml-2">
              <li>Subscribe to our email newsletter (email address, first name)</li>
              <li>Create an account (name, email address)</li>
              <li>Make a purchase (billing information processed by Stripe)</li>
              <li>Complete our essential oils quiz</li>
              <li>Submit a contact form inquiry</li>
              <li>Participate in surveys or promotions</li>
            </ul>

            <h3 className="font-semibold text-bark mt-4 mb-2">
              Information Collected Automatically
            </h3>
            <p className="text-bark/70 leading-relaxed mb-3">
              When you visit our site, we may automatically collect certain
              information, including:
            </p>
            <ul className="list-disc list-inside text-bark/70 space-y-1 ml-2">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages viewed and time spent on pages</li>
              <li>Referring website addresses</li>
              <li>IP address (anonymized where possible)</li>
              <li>Device information</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              2. How We Use Your Information
            </h2>
            <p className="text-bark/70 leading-relaxed mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-bark/70 space-y-1 ml-2">
              <li>Send you our email newsletter with essential oil tips, recipes, and educational content</li>
              <li>Personalize your experience and recommend relevant oils and recipes</li>
              <li>Process purchases and deliver digital products</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Improve our website content and user experience</li>
              <li>Analyze usage trends to enhance our offerings</li>
              <li>Protect against fraudulent or unauthorized activity</li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              3. Cookies and Tracking Technologies
            </h2>
            <p className="text-bark/70 leading-relaxed mb-3">
              We use cookies and similar tracking technologies to enhance your
              experience on our site. Cookies are small data files stored on your
              device that help us:
            </p>
            <ul className="list-disc list-inside text-bark/70 space-y-1 ml-2">
              <li>Remember your preferences and settings</li>
              <li>Understand how you interact with our site</li>
              <li>Measure the effectiveness of our content and marketing</li>
              <li>Provide a secure browsing experience</li>
            </ul>
            <p className="text-bark/70 leading-relaxed mt-3">
              You can control cookies through your browser settings. Disabling
              cookies may limit some functionality of our website.
            </p>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              4. Third-Party Services
            </h2>
            <p className="text-bark/70 leading-relaxed mb-3">
              We use the following third-party services that may collect and
              process your data in accordance with their own privacy policies:
            </p>
            <ul className="list-disc list-inside text-bark/70 space-y-2 ml-2">
              <li>
                <strong>Kit (formerly ConvertKit)</strong> &mdash; Email marketing
                platform used to manage our newsletter subscribers and send
                emails. Kit processes your email address and first name.
              </li>
              <li>
                <strong>Stripe</strong> &mdash; Payment processing for course and
                premium content purchases. Stripe processes payment information
                directly and we do not store credit card numbers on our servers.
              </li>
              <li>
                <strong>Analytics Services</strong> &mdash; We use privacy-focused
                analytics tools to understand site traffic and usage patterns.
                Data collected is anonymized where possible.
              </li>
              <li>
                <strong>Hosting Provider</strong> &mdash; Our website is hosted on
                infrastructure that may log access data for security and
                performance purposes.
              </li>
            </ul>
          </section>

          {/* GDPR */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              5. Your Rights (GDPR)
            </h2>
            <p className="text-bark/70 leading-relaxed mb-3">
              If you are located in the European Economic Area (EEA), you have
              certain data protection rights. We aim to take reasonable steps to
              allow you to correct, amend, delete, or limit the use of your
              personal data. You have the right to:
            </p>
            <ul className="list-disc list-inside text-bark/70 space-y-1 ml-2">
              <li>
                <strong>Access</strong> &mdash; Request a copy of the personal
                data we hold about you
              </li>
              <li>
                <strong>Rectification</strong> &mdash; Request correction of
                inaccurate personal data
              </li>
              <li>
                <strong>Erasure</strong> &mdash; Request deletion of your personal
                data
              </li>
              <li>
                <strong>Data Portability</strong> &mdash; Request a copy of your
                data in a structured, machine-readable format
              </li>
              <li>
                <strong>Withdraw Consent</strong> &mdash; Withdraw your consent
                for data processing at any time
              </li>
              <li>
                <strong>Restrict Processing</strong> &mdash; Request that we limit
                how we use your data
              </li>
              <li>
                <strong>Object</strong> &mdash; Object to our processing of your
                personal data
              </li>
            </ul>
            <p className="text-bark/70 leading-relaxed mt-3">
              To exercise any of these rights, please contact us using the
              information below. We will respond to your request within 30 days.
            </p>
          </section>

          {/* CAN-SPAM */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              6. CAN-SPAM Compliance
            </h2>
            <p className="text-bark/70 leading-relaxed mb-3">
              We comply with the CAN-SPAM Act. When you subscribe to our email
              list, you can expect:
            </p>
            <ul className="list-disc list-inside text-bark/70 space-y-1 ml-2">
              <li>We will not use false or misleading subjects or email addresses</li>
              <li>We will identify promotional messages as advertisements where required</li>
              <li>We will include our physical mailing address in every email</li>
              <li>We will honor opt-out and unsubscribe requests promptly</li>
              <li>Every email includes a clear and easy-to-find unsubscribe link</li>
            </ul>
            <p className="text-bark/70 leading-relaxed mt-3">
              You may unsubscribe from our emails at any time by clicking the
              unsubscribe link at the bottom of any email, or by contacting us
              directly.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              7. Data Security
            </h2>
            <p className="text-bark/70 leading-relaxed">
              We implement reasonable technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. However, no method of
              electronic transmission or storage is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              8. Data Retention
            </h2>
            <p className="text-bark/70 leading-relaxed">
              We retain your personal information only as long as necessary to
              fulfill the purposes outlined in this policy, unless a longer
              retention period is required or permitted by law. When you
              unsubscribe from our email list, we will remove your information
              from our active mailing lists, though some data may be retained in
              backups for a limited period.
            </p>
          </section>

          {/* Children */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              9. Children&apos;s Privacy
            </h2>
            <p className="text-bark/70 leading-relaxed">
              Our website is not intended for children under the age of 13. We
              do not knowingly collect personal information from children. If you
              believe we have inadvertently collected data from a child under 13,
              please contact us immediately and we will take steps to delete the
              information.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              10. Changes to This Policy
            </h2>
            <p className="text-bark/70 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated revision date. We
              encourage you to review this policy periodically. Your continued
              use of our site after changes are posted constitutes your
              acceptance of the updated policy.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              11. Contact Us
            </h2>
            <p className="text-bark/70 leading-relaxed">
              If you have questions about this Privacy Policy or wish to exercise
              your data rights, please contact us:
            </p>
            <div className="mt-3 bg-white rounded-xl p-5 text-bark/70">
              <p>
                Email:{" "}
                <a
                  href="mailto:privacy@essentialoilshub.com"
                  className="text-sage-600 hover:underline"
                >
                  privacy@essentialoilshub.com
                </a>
              </p>
              <p className="mt-1">
                Or visit our{" "}
                <Link
                  href="/contact"
                  className="text-sage-600 hover:underline"
                >
                  Contact Page
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
