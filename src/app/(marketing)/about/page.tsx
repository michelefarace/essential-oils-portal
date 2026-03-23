import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmailCaptureInline } from "@/components/email/EmailCaptureInline";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

export const metadata: Metadata = {
  title: `About Us | ${SITE_NAME}`,
  description: `Learn about ${SITE_NAME} and our mission to provide trustworthy, education-first essential oil guidance.`,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-sage-600 text-white py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Our Mission
          </h1>
          <p className="text-sage-100 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            To make essential oil education accessible, trustworthy, and
            practical for everyone &mdash; regardless of which brand you use or
            where you are on your wellness journey.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-bark mb-6">
          How It Started
        </h2>
        <div className="space-y-4 text-bark/70 leading-relaxed">
          <p>
            {SITE_NAME} was born from a simple frustration: finding reliable,
            brand-neutral information about essential oils was far harder than it
            should be. Too many resources were tied to specific companies, filled
            with unverified claims, or lacked the safety guidelines that
            newcomers desperately need.
          </p>
          <p>
            We believe that essential oils can be a wonderful addition to a
            wellness routine when used responsibly. But we also believe that
            good information should come first &mdash; before any purchase,
            before any recommendation, and before any application.
          </p>
          <p>
            That is why we built this platform: a place where you can learn
            about essential oils at your own pace, discover which ones match your
            lifestyle, and find practical recipes you can actually use &mdash;
            all grounded in safety and transparency.
          </p>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-bark text-center mb-10">
            What Makes Us Different
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <Card hover={false} className="bg-sage-50 border-0">
              <CardContent className="text-center p-6 sm:p-8">
                <div className="w-14 h-14 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-7 h-7 text-sage-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-bold text-bark mb-2">
                  Education-First
                </h3>
                <p className="text-bark/60 text-sm leading-relaxed">
                  Every piece of content starts with education. We explain the
                  why and the how, so you can make informed decisions about which
                  oils to use and how to use them safely.
                </p>
              </CardContent>
            </Card>

            <Card hover={false} className="bg-sage-50 border-0">
              <CardContent className="text-center p-6 sm:p-8">
                <div className="w-14 h-14 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-7 h-7 text-sage-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-bold text-bark mb-2">
                  Brand-Neutral
                </h3>
                <p className="text-bark/60 text-sm leading-relaxed">
                  We are not affiliated with any essential oil company. Our
                  recommendations focus on oil properties and quality standards,
                  not specific brands. Use what works for you.
                </p>
              </CardContent>
            </Card>

            <Card hover={false} className="bg-sage-50 border-0">
              <CardContent className="text-center p-6 sm:p-8">
                <div className="w-14 h-14 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-7 h-7 text-sage-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-bold text-bark mb-2">
                  Safety-Grounded
                </h3>
                <p className="text-bark/60 text-sm leading-relaxed">
                  Every oil profile includes detailed safety notes. Every recipe
                  includes proper dilution ratios. We never make health claims
                  and always recommend consulting healthcare professionals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-bark mb-8">
          What We Believe
        </h2>
        <div className="space-y-6">
          {[
            {
              title: "Knowledge empowers better choices",
              text: "When you understand what an essential oil is, how it works, and what to watch out for, you can use oils with genuine confidence.",
            },
            {
              title: "Safety is non-negotiable",
              text: "Essential oils are potent. Proper dilution, patch testing, and understanding contraindications are not optional steps. They are fundamental to responsible use.",
            },
            {
              title: "Wellness is personal",
              text: "There is no one-size-fits-all approach. Our quiz, guides, and resources help you find what works for your unique body, lifestyle, and preferences.",
            },
            {
              title: "Transparency builds trust",
              text: "We are upfront about what essential oils can and cannot do. We include FDA disclaimers, cite traditional uses rather than making health claims, and always recommend professional guidance.",
            },
          ].map((value) => (
            <div
              key={value.title}
              className="flex gap-4 items-start"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-sage-200 flex items-center justify-center mt-1">
                <svg
                  className="w-3.5 h-3.5 text-sage-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-bold text-bark mb-1">
                  {value.title}
                </h3>
                <p className="text-bark/60 text-sm leading-relaxed">
                  {value.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Placeholder */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-bark mb-4">
            The Team
          </h2>
          <p className="text-bark/60 max-w-xl mx-auto mb-10">
            We are a small team of aromatherapy enthusiasts, educators, and
            wellness advocates dedicated to making essential oil education
            accessible and trustworthy.
          </p>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                role: "Founder & Content Lead",
                bio: "Passionate about natural wellness and making essential oil education accessible to everyone.",
              },
              {
                role: "Aromatherapy Educator",
                bio: "Dedicated to teaching safe, effective aromatherapy practices grounded in traditional knowledge.",
              },
              {
                role: "Recipe Developer",
                bio: "Creating practical, tested DIY formulations that make essential oils part of everyday life.",
              },
            ].map((member) => (
              <div key={member.role} className="text-center">
                <div className="w-24 h-24 rounded-full bg-sage-100 mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-sage-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-bark mb-1">
                  {member.role}
                </h3>
                <p className="text-bark/60 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-12 sm:py-16 text-center">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-bark mb-4">
          Ready to Find Your Oils?
        </h2>
        <p className="text-bark/60 max-w-md mx-auto mb-8">
          Take our free quiz to discover which essential oils are the best match
          for your lifestyle, preferences, and wellness goals.
        </p>
        <Link href="/quiz">
          <Button size="lg">Take the Quiz</Button>
        </Link>
      </section>

      {/* Email Capture */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <EmailCaptureInline
          title="Join Our Community"
          description="Get weekly essential oil tips, new recipes, and exclusive educational content delivered to your inbox."
          source="about-page"
        />
      </section>
    </div>
  );
}
