import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmailCaptureInline } from "@/components/email/EmailCaptureInline";
import { formatPrice } from "@/lib/utils";
import { SITE_NAME } from "@/lib/constants";
import coursesData from "@/data/courses.json";

export const metadata: Metadata = {
  title: `Essential Oil Courses - Learn Aromatherapy | ${SITE_NAME}`,
  description:
    "Self-paced essential oil courses for every level. Learn aromatherapy fundamentals, advanced blending, and DIY recipes with lifetime access and a 30-day guarantee.",
};

const levelBadgeVariant: Record<string, "sage" | "lavender" | "sand"> = {
  Beginner: "sage",
  Intermediate: "lavender",
  "All Levels": "sand",
};

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
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
  );
}

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sage-600 via-sage-700 to-sage-800 text-white py-16 sm:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-lavender-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <Badge variant="premium" className="mb-5 text-sm px-4 py-1">
            Self-Paced Learning
          </Badge>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
            Level Up Your Essential Oil
            <br className="hidden sm:block" />
            Knowledge
          </h1>
          <p className="text-sage-100 text-lg max-w-2xl mx-auto leading-relaxed">
            Structured, expert-crafted courses designed to take you from curious
            beginner to confident practitioner. Education-first, brand-neutral,
            and grounded in safety.
          </p>
        </div>
      </section>

      {/* Course Cards */}
      <section className="max-w-6xl mx-auto px-4 py-14 sm:py-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {coursesData.map((course) => (
            <Card
              key={course.id}
              className="flex flex-col border border-sand-100 group"
            >
              {/* Gradient Header */}
              <div
                className="h-36 flex items-center justify-center relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${course.imageGradient[0]}, ${course.imageGradient[1]})`,
                }}
              >
                <div className="absolute inset-0 bg-black/5" />
                <span className="relative text-white/90 font-heading text-5xl font-bold">
                  {course.title.charAt(0)}
                </span>
              </div>

              <CardContent className="flex flex-col flex-1 p-6">
                {/* Badges */}
                <div className="flex items-center gap-2 mb-3">
                  <Badge
                    variant={levelBadgeVariant[course.level] || "sage"}
                  >
                    {course.level}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-bark/50">
                    <ClockIcon className="w-3.5 h-3.5" />
                    {course.totalDuration}
                  </span>
                </div>

                {/* Title & Description */}
                <h2 className="font-heading text-xl font-bold text-bark mb-2 group-hover:text-sage-600 transition-colors">
                  {course.title}
                </h2>
                <p className="text-bark/60 text-sm leading-relaxed mb-5 flex-1">
                  {course.shortDescription}
                </p>

                {/* Price */}
                <div className="mb-5">
                  <span className="text-2xl font-bold text-bark">
                    {formatPrice(course.priceInCents)}
                  </span>
                  <span className="text-bark/40 text-sm ml-1.5">
                    one-time
                  </span>
                </div>

                {/* What you'll learn (first 4) */}
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-bark/50 uppercase tracking-wider mb-3">
                    What you&apos;ll learn
                  </h3>
                  <ul className="space-y-2">
                    {course.whatYoullLearn.slice(0, 4).map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-bark/70"
                      >
                        <CheckIcon className="w-4 h-4 text-sage-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                    {course.whatYoullLearn.length > 4 && (
                      <li className="text-xs text-sage-600 ml-6">
                        +{course.whatYoullLearn.length - 4} more
                      </li>
                    )}
                  </ul>
                </div>

                {/* CTA */}
                <Link
                  href={`/courses/${course.slug}`}
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-sage-500 text-white font-medium rounded-lg hover:bg-sage-600 transition-all duration-200 shadow-card mt-auto"
                >
                  View Course
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-xl bg-white shadow-card">
            <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-sage-600"
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
            <h3 className="font-heading font-bold text-bark mb-1">
              30-Day Money-Back Guarantee
            </h3>
            <p className="text-sm text-bark/60">
              Not satisfied? Get a full refund within 30 days, no questions
              asked.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white shadow-card">
            <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-sage-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
            <h3 className="font-heading font-bold text-bark mb-1">
              Lifetime Access
            </h3>
            <p className="text-sm text-bark/60">
              Buy once, access forever. Including all future updates and bonus
              content.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white shadow-card">
            <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-3">
              <BookIcon className="w-6 h-6 text-sage-600" />
            </div>
            <h3 className="font-heading font-bold text-bark mb-1">
              Self-Paced Learning
            </h3>
            <p className="text-sm text-bark/60">
              Learn on your own schedule. No deadlines, no pressure. Go at your
              own pace.
            </p>
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="max-w-2xl mx-auto px-4 pb-16">
        <EmailCaptureInline
          title="Not Ready to Enroll Yet?"
          description="Join our newsletter for free essential oil tips, mini-lessons, and be the first to know about new courses and special offers."
          buttonText="Stay in the Loop"
          source="courses-page"
        />
      </section>
    </div>
  );
}
