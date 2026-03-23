import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, FDA_DISCLAIMER } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Disclaimer | ${SITE_NAME}`,
  description: `Important disclaimers for ${SITE_NAME}. Essential oil safety, FDA compliance, and educational content notice.`,
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-bark mb-2">
          Disclaimer
        </h1>
        <p className="text-bark/50 text-sm mb-10">
          Last updated: March 2026
        </p>

        <div className="space-y-8">
          {/* Educational Purpose */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              1. Educational Purpose Only
            </h2>
            <p className="text-bark/70 leading-relaxed mb-3">
              The content on {SITE_NAME}, including all articles, guides, oil
              profiles, recipes, quizzes, and course materials, is provided
              solely for educational and informational purposes. This website is
              designed to share general knowledge about essential oils and
              aromatherapy practices.
            </p>
            <p className="text-bark/70 leading-relaxed">
              The information presented here reflects traditional and commonly
              reported uses of essential oils and should not be considered
              definitive or exhaustive. Individual experiences with essential oils
              may vary.
            </p>
          </section>

          {/* Not Medical Advice */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              2. Not Medical Advice
            </h2>
            <div className="bg-sand-100 rounded-xl p-5 mb-4">
              <p className="text-bark/80 font-medium leading-relaxed">
                The content on this website is not intended to be a substitute for
                professional medical advice, diagnosis, or treatment. Always seek
                the advice of your physician, qualified healthcare provider, or
                certified aromatherapist with any questions you may have regarding
                a medical condition or the use of essential oils.
              </p>
            </div>
            <p className="text-bark/70 leading-relaxed mb-3">
              Never disregard professional medical advice or delay in seeking it
              because of something you have read on this website. If you think you
              may have a medical emergency, call your doctor or emergency services
              immediately.
            </p>
            <p className="text-bark/70 leading-relaxed">
              We do not recommend using essential oils as a replacement for
              conventional medical treatments. Essential oils may be used to
              complement your wellness routine, but they should not replace the
              care provided by licensed healthcare professionals.
            </p>
          </section>

          {/* FDA Disclaimer */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              3. FDA Disclaimer
            </h2>
            <div className="bg-sage-50 border border-sage-200 rounded-xl p-5">
              <p className="text-bark/80 leading-relaxed font-medium">
                {FDA_DISCLAIMER}
              </p>
            </div>
            <p className="text-bark/70 leading-relaxed mt-4">
              Essential oils are classified as cosmetics or general wellness
              products, not drugs, by the FDA. No claims are made on this website
              that essential oils can diagnose, treat, cure, or prevent any
              disease or medical condition.
            </p>
          </section>

          {/* Essential Oil Safety */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              4. Essential Oil Safety
            </h2>
            <p className="text-bark/70 leading-relaxed mb-3">
              Essential oils are highly concentrated plant extracts and should be
              used with care. Please observe the following safety guidelines:
            </p>
            <ul className="list-disc list-inside text-bark/70 space-y-2 ml-2">
              <li>
                <strong>Always dilute</strong> essential oils with a carrier oil
                before applying to the skin. Undiluted application may cause
                irritation, sensitization, or adverse reactions.
              </li>
              <li>
                <strong>Perform a patch test</strong> before using any new
                essential oil topically. Apply a small amount of diluted oil to
                the inside of your forearm and wait 24 hours to check for
                reactions.
              </li>
              <li>
                <strong>Keep out of reach of children and pets.</strong> Some
                essential oils can be harmful or toxic to children, cats, dogs,
                and other animals.
              </li>
              <li>
                <strong>Avoid internal use</strong> unless under the direct
                supervision of a qualified healthcare professional trained in
                essential oil safety.
              </li>
              <li>
                <strong>Pregnancy and nursing:</strong> Consult with your
                healthcare provider before using essential oils if you are
                pregnant, nursing, or planning to become pregnant.
              </li>
              <li>
                <strong>Medical conditions:</strong> If you have epilepsy, high
                blood pressure, asthma, or other medical conditions, consult your
                healthcare provider before using essential oils.
              </li>
              <li>
                <strong>Photosensitivity:</strong> Some essential oils,
                particularly citrus oils, can increase sensitivity to sunlight.
                Avoid direct sun exposure for 12-48 hours after topical
                application of photosensitive oils.
              </li>
              <li>
                <strong>Avoid contact with eyes,</strong> inner ears, and other
                sensitive areas. If essential oil gets into your eyes, flush with
                a carrier oil (not water) and seek medical attention if irritation
                persists.
              </li>
            </ul>
          </section>

          {/* Affiliate Disclaimer */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              5. Affiliate and Compensation Disclaimer
            </h2>
            <p className="text-bark/70 leading-relaxed mb-3">
              {SITE_NAME} may contain affiliate links, meaning we may earn a
              commission if you make a purchase through links on our site at no
              additional cost to you. These commissions help support the operation
              of this website and allow us to continue providing free educational
              content.
            </p>
            <p className="text-bark/70 leading-relaxed mb-3">
              We only recommend products and services that we believe provide
              value to our audience. Our editorial content is not influenced by
              affiliate partnerships, and our recommendations are based on our
              genuine assessment of product quality and usefulness.
            </p>
            <p className="text-bark/70 leading-relaxed">
              Any income or revenue claims mentioned on this site are not
              guarantees. Individual results will vary based on many factors
              including personal effort, market conditions, and individual
              circumstances.
            </p>
          </section>

          {/* Results Disclaimer */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              6. Results Disclaimer
            </h2>
            <p className="text-bark/70 leading-relaxed mb-3">
              Any testimonials, results, or outcomes described on this website are
              individual experiences and are not guaranteed. The results you
              experience with essential oils may differ based on factors including:
            </p>
            <ul className="list-disc list-inside text-bark/70 space-y-1 ml-2">
              <li>Individual body chemistry and sensitivity</li>
              <li>Quality and purity of essential oils used</li>
              <li>Proper dilution and application methods</li>
              <li>Consistency of use</li>
              <li>Overall health and lifestyle factors</li>
            </ul>
            <p className="text-bark/70 leading-relaxed mt-3">
              We make no warranties or representations regarding the results you
              may or may not experience from using essential oils or following any
              information provided on this website.
            </p>
          </section>

          {/* Recipe Disclaimer */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              7. Recipe and DIY Project Disclaimer
            </h2>
            <p className="text-bark/70 leading-relaxed">
              The recipes and DIY formulations on this site are shared for
              educational purposes. You prepare and use these recipes at your own
              risk. Always follow proper dilution guidelines, perform patch tests,
              and use high-quality ingredients. We are not responsible for any
              adverse reactions or outcomes resulting from the preparation or use
              of recipes found on this site.
            </p>
          </section>

          {/* External Links */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              8. External Links
            </h2>
            <p className="text-bark/70 leading-relaxed">
              This website may contain links to external websites that are not
              owned or controlled by {SITE_NAME}. We have no control over and
              assume no responsibility for the content, privacy policies, or
              practices of any third-party sites. Visiting external links is at
              your own risk.
            </p>
          </section>

          {/* Limitation */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              9. Limitation of Liability
            </h2>
            <p className="text-bark/70 leading-relaxed">
              Under no circumstances shall {SITE_NAME}, its owners, employees,
              or affiliates be liable for any direct, indirect, incidental,
              special, or consequential damages resulting from the use or
              inability to use this website or its content, including but not
              limited to reliance on any information obtained from the site.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="font-heading text-xl font-bold text-bark mb-3">
              10. Contact Us
            </h2>
            <p className="text-bark/70 leading-relaxed">
              If you have questions about this disclaimer, please contact us:
            </p>
            <div className="mt-3 bg-white rounded-xl p-5 text-bark/70">
              <p>
                Email:{" "}
                <a
                  href="mailto:info@essentialoilshub.com"
                  className="text-sage-600 hover:underline"
                >
                  info@essentialoilshub.com
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
