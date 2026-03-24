import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmailCaptureInline } from "@/components/email/EmailCaptureInline";
import { EnrollButton } from "@/components/courses/EnrollButton";
import { formatPrice } from "@/lib/utils";
import { SITE_NAME } from "@/lib/constants";
import coursesData from "@/data/courses.json";

type Course = (typeof coursesData)[number];

function getCourseBySlug(slug: string): Course | undefined {
  return coursesData.find((c) => c.slug === slug);
}

export async function generateStaticParams() {
  return coursesData.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return { title: "Course Not Found" };
  }

  return {
    title: `${course.title} - Online Course | ${SITE_NAME}`,
    description: course.shortDescription,
    keywords: [
      `${course.title.toLowerCase()} course`,
      "essential oils course",
      "aromatherapy course",
      `${course.level.toLowerCase()} aromatherapy`,
    ],
  };
}

const levelBadgeVariant: Record<string, "sage" | "lavender" | "sand"> = {
  Beginner: "sage",
  Intermediate: "lavender",
  "All Levels": "sand",
};

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
    </svg>
  );
}

function EnrollButtonWrapper({ course }: { course: Course }) {
  return (
    <EnrollButton
      courseTitle={course.title}
      courseSlug={course.slug}
      courseId={course.id}
      priceInCents={course.priceInCents}
    />
  );
}

export default async function CourseSalesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const freeLessons = course.lessons.filter((l) => l.isFree);
  const paidLessons = course.lessons.filter((l) => !l.isFree);

  return (
    <div className="min-h-screen bg-cream">
      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 pt-8">
        <nav className="flex items-center text-sm text-bark/50">
          <Link href="/courses" className="hover:text-sage-600 transition-colors">
            Courses
          </Link>
          <svg className="w-4 h-4 mx-2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          <span className="text-bark/80 font-medium">{course.title}</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 py-10 sm:py-14">
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Left: Course Info */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant={levelBadgeVariant[course.level] || "sage"}>
                {course.level}
              </Badge>
              <span className="text-sm text-bark/50 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {course.totalDuration}
              </span>
              <span className="text-sm text-bark/50 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                {course.lessonCount} lessons
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-bark mb-5 leading-tight">
              {course.title}
            </h1>

            <p className="text-bark/70 text-lg leading-relaxed mb-8">
              {course.description}
            </p>

            <div className="lg:hidden mb-8">
              <PriceCard course={course} />
            </div>
          </div>

          {/* Right: Price Card (desktop) */}
          <div className="hidden lg:block lg:col-span-2 lg:sticky lg:top-8">
            <PriceCard course={course} />
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="max-w-5xl mx-auto px-4 pb-14">
        <Card hover={false} className="border border-sage-200 bg-sage-50/50">
          <CardContent className="p-8">
            <h2 className="font-heading text-2xl font-bold text-bark mb-6">
              What You&apos;ll Learn
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {course.whatYoullLearn.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-sage-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckIcon className="w-3.5 h-3.5 text-sage-700" />
                  </div>
                  <span className="text-bark/70 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Who This Course Is For */}
      <section className="max-w-5xl mx-auto px-4 pb-14">
        <h2 className="font-heading text-2xl font-bold text-bark mb-6">
          Who This Course Is For
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {course.whoItsFor.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white shadow-card">
              <div className="w-8 h-8 rounded-full bg-lavender-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-lavender-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <span className="text-bark/70 text-sm leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum */}
      <section className="max-w-5xl mx-auto px-4 pb-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-2xl font-bold text-bark">
            Course Curriculum
          </h2>
          <p className="text-sm text-bark/50">
            {freeLessons.length} free preview{freeLessons.length !== 1 ? "s" : ""} available
          </p>
        </div>

        <div className="space-y-3">
          {course.lessons.map((lesson) => (
            <div
              key={lesson.id}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                lesson.isFree
                  ? "bg-white border-sage-200 hover:border-sage-400"
                  : "bg-white/60 border-sand-100"
              }`}
            >
              {/* Lesson Number */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                  lesson.isFree
                    ? "bg-sage-100 text-sage-700"
                    : "bg-sand-100 text-bark/40"
                }`}
              >
                {lesson.order}
              </div>

              {/* Lesson Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3
                    className={`font-medium text-sm truncate ${
                      lesson.isFree ? "text-bark" : "text-bark/50"
                    }`}
                  >
                    {lesson.title}
                  </h3>
                  {lesson.isFree && (
                    <Badge variant="sage" className="text-[10px] px-2 py-0">
                      FREE
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-bark/40">{lesson.duration}</p>
              </div>

              {/* Action */}
              {lesson.isFree ? (
                <Link
                  href={`/courses/${course.slug}/${lesson.slug}`}
                  className="flex items-center gap-1.5 text-sm font-medium text-sage-600 hover:text-sage-700 transition-colors flex-shrink-0"
                >
                  <PlayIcon className="w-4 h-4" />
                  Preview
                </Link>
              ) : (
                <LockIcon className="w-5 h-5 text-bark/30 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Instructor Section */}
      <section className="max-w-5xl mx-auto px-4 pb-14">
        <Card hover={false}>
          <CardContent className="p-8">
            <h2 className="font-heading text-2xl font-bold text-bark mb-6">
              Your Instructor
            </h2>
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sage-300 to-lavender-300 flex items-center justify-center flex-shrink-0">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-bark mb-1">
                  EssentialOilsHub Team
                </h3>
                <p className="text-sm text-sage-600 mb-3">
                  Certified Aromatherapists &amp; Educators
                </p>
                <p className="text-bark/60 text-sm leading-relaxed">
                  Our courses are developed by a team of certified aromatherapists
                  with over 15 years of combined experience. We&apos;re passionate
                  about education-first, brand-neutral aromatherapy that empowers
                  you to make safe, informed decisions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQ */}
      <section className="max-w-5xl mx-auto px-4 pb-14">
        <h2 className="font-heading text-2xl font-bold text-bark mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "How long do I have access to the course?",
              a: "Forever! Once you enroll, you get lifetime access to all course materials, including any future updates or bonus content we add.",
            },
            {
              q: "Is there a money-back guarantee?",
              a: "Absolutely. If you're not completely satisfied within 30 days of purchase, we'll give you a full refund — no questions asked.",
            },
            {
              q: "Do I need any prior experience?",
              a: course.level === "Beginner"
                ? "None at all! This course is designed for complete beginners. We start from the very basics."
                : course.level === "Intermediate"
                ? "We recommend completing Essential Oils 101 or having equivalent foundational knowledge before taking this course."
                : "This course is designed for all levels. Whether you're a beginner or have experience, you'll find value in the content.",
            },
            {
              q: "Can I preview any lessons before buying?",
              a: `Yes! We offer ${freeLessons.length} free preview lesson${freeLessons.length !== 1 ? "s" : ""} so you can experience the teaching style and content quality before enrolling.`,
            },
            {
              q: "Do you recommend specific essential oil brands?",
              a: "No. Our courses are completely brand-neutral. We teach principles and practices that work with any quality essential oil brand.",
            },
          ].map((faq, i) => (
            <Card key={i} hover={false}>
              <CardContent className="p-5">
                <h3 className="font-semibold text-bark mb-2">{faq.q}</h3>
                <p className="text-sm text-bark/60 leading-relaxed">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Money-Back Guarantee Banner */}
      <section className="max-w-5xl mx-auto px-4 pb-14">
        <div className="bg-gradient-to-r from-sage-50 to-lavender-50 rounded-2xl p-8 sm:p-10 text-center border border-sage-100">
          <div className="w-16 h-16 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-sage-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <h2 className="font-heading text-2xl font-bold text-bark mb-3">
            30-Day Money-Back Guarantee
          </h2>
          <p className="text-bark/60 max-w-lg mx-auto mb-6">
            We&apos;re confident you&apos;ll love this course. If it&apos;s not for you,
            get a full refund within 30 days — no questions asked.
          </p>
          <EnrollButtonWrapper course={course} />
        </div>
      </section>

      {/* Email Capture */}
      <section className="max-w-2xl mx-auto px-4 pb-16">
        <EmailCaptureInline
          title="Want Free Essential Oil Tips First?"
          description="Join our newsletter for weekly aromatherapy tips, mini-lessons, and exclusive course discounts."
          buttonText="Get Free Tips"
          source={`course-${course.slug}`}
        />
      </section>
    </div>
  );
}

/** Price Card component for the sidebar / mobile */
function PriceCard({ course }: { course: Course }) {
  return (
    <Card hover={false} className="border-2 border-sage-200 overflow-visible">
      {/* Gradient top accent */}
      <div
        className="h-3 rounded-t-xl"
        style={{
          background: `linear-gradient(135deg, ${course.imageGradient[0]}, ${course.imageGradient[1]})`,
        }}
      />
      <CardContent className="p-6 text-center">
        <div className="mb-4">
          <span className="text-4xl font-bold text-bark">
            {formatPrice(course.priceInCents)}
          </span>
          <p className="text-bark/40 text-sm mt-1">One-time payment</p>
        </div>

        <EnrollButtonWrapper course={course} />

        <div className="mt-6 space-y-3 text-left">
          {[
            `${course.lessonCount} in-depth lessons`,
            course.totalDuration + " of content",
            "Lifetime access",
            "30-day money-back guarantee",
            "Self-paced learning",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-bark/60">
              <CheckIcon className="w-4 h-4 text-sage-500 flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
