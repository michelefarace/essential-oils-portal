import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Terms of Service | ${SITE_NAME}`,
  description: `Terms of Service for ${SITE_NAME}. Please read these terms carefully before using our website.`,
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-bark mb-2">
          Terms of Service
        </h1>
        <p className="text-bark/50 text-sm mb-10">
          Last updated: March 2026
        </p>

        <div className="space-y-8">
          {/* Acceptance */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-bark/70 leading-relaxed">
              By accessing and using {SITE_NAME} (the &ldquo;Site&rdquo;), you
              accept and agree to be bound by these Terms of Service
              (&ldquo;Terms&rdquo;). If you do not agree to these Terms, please
              do not use the Site. We reserve the right to modify these Terms at
              any time. Changes will be effective immediately upon posting to the
              Site. Your continued use of the Site after any changes constitutes
              your acceptance of the new Terms.
            </p>
          </section>

          {/* Educational Disclaimer */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              2. Educational Content Disclaimer
            </h2>
            <p className="text-bark/70 leading-relaxed mb-3">
              All content provided on this Site, including but not limited to
              articles, guides, recipes, oil profiles, quizzes, and course
              materials, is for educational and informational purposes only. This
              content is not intended to be a substitute for professional medical
              advice, diagnosis, or treatment.
            </p>
            <p className="text-bark/70 leading-relaxed mb-3">
              Always seek the advice of your physician or other qualified health
              provider with any questions you may have regarding a medical
              condition. Never disregard professional medical advice or delay in
              seeking it because of something you have read on this Site.
            </p>
            <p className="text-bark/70 leading-relaxed">
              The statements made on this Site have not been evaluated by the
              Food and Drug Administration. Essential oils are not intended to
              diagnose, treat, cure, or prevent any disease.
            </p>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              3. User Accounts
            </h2>
            <p className="text-bark/70 leading-relaxed mb-3">
              Some features of the Site may require you to create an account. When
              creating an account, you agree to:
            </p>
            <ul className="list-disc list-inside text-bark/70 space-y-1 ml-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Accept responsibility for all activity under your account</li>
            </ul>
            <p className="text-bark/70 leading-relaxed mt-3">
              We reserve the right to suspend or terminate accounts that violate
              these Terms or engage in fraudulent or abusive behavior.
            </p>
          </section>

          {/* Payments and Refunds */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              4. Payments and Refunds
            </h2>
            <p className="text-bark/70 leading-relaxed mb-3">
              Certain content and courses on the Site are available for purchase.
              By making a purchase, you agree to the following:
            </p>
            <ul className="list-disc list-inside text-bark/70 space-y-1 ml-2">
              <li>All prices are listed in US dollars unless otherwise stated</li>
              <li>Payment is processed securely through our third-party payment provider (Stripe)</li>
              <li>You are responsible for any applicable taxes</li>
              <li>Digital products are delivered electronically upon successful payment</li>
            </ul>
            <p className="text-bark/70 leading-relaxed mt-3">
              <strong>Refund Policy:</strong> We offer a 30-day money-back
              guarantee on course purchases. If you are not satisfied with a
              course, contact us within 30 days of purchase for a full refund. Due
              to the digital nature of our products, refunds are handled on a
              case-by-case basis for other digital purchases.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              5. Intellectual Property
            </h2>
            <p className="text-bark/70 leading-relaxed mb-3">
              All content on this Site, including text, graphics, logos, images,
              recipes, course materials, and software, is the property of{" "}
              {SITE_NAME} or its content suppliers and is protected by
              intellectual property laws.
            </p>
            <p className="text-bark/70 leading-relaxed mb-3">
              You may not, without our prior written permission:
            </p>
            <ul className="list-disc list-inside text-bark/70 space-y-1 ml-2">
              <li>Reproduce, distribute, or publicly display our content</li>
              <li>Modify or create derivative works based on our content</li>
              <li>Use our content for commercial purposes</li>
              <li>Remove any copyright or proprietary notices</li>
            </ul>
            <p className="text-bark/70 leading-relaxed mt-3">
              You are granted a limited, non-exclusive, personal license to access
              and use the Site and its content for your personal, non-commercial
              use only.
            </p>
          </section>

          {/* User Conduct */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              6. User Conduct
            </h2>
            <p className="text-bark/70 leading-relaxed mb-3">
              When using the Site, you agree not to:
            </p>
            <ul className="list-disc list-inside text-bark/70 space-y-1 ml-2">
              <li>Use the Site for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any part of the Site</li>
              <li>Interfere with the proper functioning of the Site</li>
              <li>Upload malicious code or harmful content</li>
              <li>Impersonate any person or entity</li>
              <li>Collect personal information from other users</li>
              <li>Use automated tools to scrape or extract content</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              7. Limitation of Liability
            </h2>
            <p className="text-bark/70 leading-relaxed mb-3">
              To the fullest extent permitted by law, {SITE_NAME} and its owners,
              employees, and affiliates shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages arising out
              of or related to your use of the Site, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-bark/70 space-y-1 ml-2">
              <li>Errors or omissions in content</li>
              <li>Any unauthorized access to or use of our servers</li>
              <li>Any interruption or cessation of service</li>
              <li>Any bugs, viruses, or similar issues transmitted through the Site</li>
              <li>Any loss or damage resulting from the use of content posted on the Site</li>
            </ul>
            <p className="text-bark/70 leading-relaxed mt-3">
              You use essential oils and follow recipes at your own risk. We
              strongly recommend consulting with a qualified aromatherapist or
              healthcare professional before using essential oils, especially if
              you are pregnant, nursing, have a medical condition, or are using
              essential oils around children or pets.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              8. Indemnification
            </h2>
            <p className="text-bark/70 leading-relaxed">
              You agree to indemnify, defend, and hold harmless {SITE_NAME}, its
              owners, employees, and affiliates from any claims, liabilities,
              damages, losses, or expenses arising from your use of the Site or
              your violation of these Terms.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              9. Third-Party Links
            </h2>
            <p className="text-bark/70 leading-relaxed">
              The Site may contain links to third-party websites or services. We
              are not responsible for the content, policies, or practices of any
              third-party sites. Your use of third-party sites is at your own
              risk, and we encourage you to review the terms and privacy policies
              of those sites.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              10. Governing Law
            </h2>
            <p className="text-bark/70 leading-relaxed">
              These Terms shall be governed by and construed in accordance with
              the laws of the United States, without regard to conflict of law
              principles. Any disputes arising from these Terms or your use of the
              Site shall be resolved through binding arbitration in accordance
              with the rules of the American Arbitration Association.
            </p>
          </section>

          {/* Severability */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              11. Severability
            </h2>
            <p className="text-bark/70 leading-relaxed">
              If any provision of these Terms is found to be unenforceable or
              invalid, that provision shall be limited or eliminated to the
              minimum extent necessary so that these Terms shall otherwise remain
              in full force and effect.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              12. Contact Us
            </h2>
            <p className="text-bark/70 leading-relaxed">
              If you have questions about these Terms, please contact us:
            </p>
            <div className="mt-3 bg-white rounded-xl p-5 text-bark/70">
              <p>
                Email:{" "}
                <a
                  href="mailto:legal@essentialoilshub.com"
                  className="text-sage-600 hover:underline"
                >
                  legal@essentialoilshub.com
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
