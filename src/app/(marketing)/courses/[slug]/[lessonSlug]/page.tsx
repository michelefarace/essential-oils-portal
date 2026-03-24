import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { EmailCaptureInline } from "@/components/email/EmailCaptureInline";
import { formatPrice } from "@/lib/utils";
import { SITE_NAME } from "@/lib/constants";
import { renderMarkdown } from "@/lib/markdown";
import coursesData from "@/data/courses.json";

type Course = (typeof coursesData)[number];
type Lesson = Course["lessons"][number];

function getCourseBySlug(slug: string): Course | undefined {
  return coursesData.find((c) => c.slug === slug);
}

function getLessonBySlug(course: Course, lessonSlug: string): Lesson | undefined {
  return course.lessons.find((l) => l.slug === lessonSlug);
}

export async function generateStaticParams() {
  const params: { slug: string; lessonSlug: string }[] = [];
  for (const course of coursesData) {
    for (const lesson of course.lessons) {
      params.push({ slug: course.slug, lessonSlug: lesson.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lessonSlug: string }>;
}): Promise<Metadata> {
  const { slug, lessonSlug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return { title: "Lesson Not Found" };
  }

  const lesson = getLessonBySlug(course, lessonSlug);

  if (!lesson) {
    return { title: "Lesson Not Found" };
  }

  return {
    title: `${lesson.title} - ${course.title} | ${SITE_NAME}`,
    description: `Lesson ${lesson.order} of ${course.lessonCount}: ${lesson.title}. Part of the ${course.title} course.`,
  };
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonSlug: string }>;
}) {
  const { slug, lessonSlug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const lesson = getLessonBySlug(course, lessonSlug);

  if (!lesson) {
    notFound();
  }

  const currentIndex = course.lessons.findIndex((l) => l.slug === lessonSlug);
  const prevLesson = currentIndex > 0 ? course.lessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < course.lessons.length - 1
      ? course.lessons[currentIndex + 1]
      : null;

  // If lesson is not free (and not in preview mode), show locked content page
  const previewMode = process.env.PREVIEW_MODE === "true";
  if (!lesson.isFree && !previewMode) {
    return <LockedLessonPage course={course} lesson={lesson} />;
  }

  // Free lesson - render full content
  const htmlContent = renderMarkdown(lesson.content);

  return (
    <div className="min-h-screen bg-cream">
      {/* Header Bar */}
      <div className="bg-white border-b border-sand-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href={`/courses/${course.slug}`}
              className="text-sage-600 hover:text-sage-700 transition-colors flex-shrink-0"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </Link>
            <div className="min-w-0">
              <p className="text-xs text-bark/50 truncate">{course.title}</p>
              <p className="text-sm font-medium text-bark truncate">
                Lesson {lesson.order} of {course.lessonCount}
              </p>
            </div>
          </div>
          <Badge variant="sage" className="flex-shrink-0">
            Free Preview
          </Badge>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-20">
              <h3 className="font-heading font-bold text-bark text-sm mb-4 uppercase tracking-wider">
                Course Lessons
              </h3>
              <nav className="space-y-1">
                {course.lessons.map((l) => {
                  const isActive = l.slug === lessonSlug;
                  const isAccessible = l.isFree || previewMode;

                  return (
                    <div key={l.id}>
                      {isAccessible ? (
                        <Link
                          href={`/courses/${course.slug}/${l.slug}`}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                            isActive
                              ? "bg-sage-100 text-sage-700 font-medium"
                              : "text-bark/70 hover:bg-sand-50 hover:text-bark"
                          }`}
                        >
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                              isActive
                                ? "bg-sage-500 text-white font-bold"
                                : "bg-sage-100 text-sage-600"
                            }`}
                          >
                            {l.order}
                          </span>
                          <span className="truncate">{l.title}</span>
                        </Link>
                      ) : (
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-bark/35 cursor-not-allowed">
                          <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs bg-sand-100 text-bark/30 flex-shrink-0">
                            <LockIcon className="w-3 h-3" />
                          </span>
                          <span className="truncate">{l.title}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Enroll CTA in sidebar */}
              <div className="mt-6 p-4 rounded-xl bg-sage-50 border border-sage-100">
                <p className="text-sm font-medium text-bark mb-1">
                  Unlock all lessons
                </p>
                <p className="text-xs text-bark/50 mb-3">
                  Get full access to all {course.lessonCount} lessons
                </p>
                <Link
                  href={`/courses/${course.slug}`}
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-sage-500 text-white text-sm font-medium rounded-lg hover:bg-sage-600 transition-colors"
                >
                  Enroll - {formatPrice(course.priceInCents)}
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 max-w-3xl">
            {/* Lesson Title */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-sage-600 uppercase tracking-wider">
                  Lesson {lesson.order}
                </span>
                <span className="text-xs text-bark/40">{lesson.duration}</span>
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-bark">
                {lesson.title}
              </h1>
            </div>

            {/* Rendered Markdown Content */}
            <article
              className="prose-custom"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* Preview CTA */}
            <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-sage-50 to-lavender-50 border border-sage-100 text-center">
              <CheckCircleIcon className="w-10 h-10 text-sage-500 mx-auto mb-3" />
              <h3 className="font-heading text-xl font-bold text-bark mb-2">
                Enjoying This Preview?
              </h3>
              <p className="text-sm text-bark/60 mb-5 max-w-md mx-auto">
                This is just the beginning. Enroll in{" "}
                <strong>{course.title}</strong> to unlock all{" "}
                {course.lessonCount} lessons and deepen your essential oil
                knowledge.
              </p>
              <Link
                href={`/courses/${course.slug}`}
                className="inline-flex items-center justify-center px-6 py-3 bg-sage-500 text-white font-medium rounded-lg hover:bg-sage-600 transition-colors shadow-card"
              >
                Enroll Now - {formatPrice(course.priceInCents)}
              </Link>
            </div>

            {/* Prev/Next Navigation */}
            <div className="mt-10 flex items-center justify-between gap-4 border-t border-sand-200 pt-8">
              {prevLesson && (prevLesson.isFree || previewMode) ? (
                <Link
                  href={`/courses/${course.slug}/${prevLesson.slug}`}
                  className="flex items-center gap-2 text-sm text-bark/60 hover:text-sage-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  <div>
                    <p className="text-xs text-bark/40">Previous</p>
                    <p className="font-medium">{prevLesson.title}</p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {nextLesson && (nextLesson.isFree || previewMode) ? (
                <Link
                  href={`/courses/${course.slug}/${nextLesson.slug}`}
                  className="flex items-center gap-2 text-sm text-bark/60 hover:text-sage-600 transition-colors text-right"
                >
                  <div>
                    <p className="text-xs text-bark/40">Next</p>
                    <p className="font-medium">{nextLesson.title}</p>
                  </div>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              ) : nextLesson ? (
                <div className="flex items-center gap-2 text-sm text-bark/35 text-right">
                  <div>
                    <p className="text-xs">Next (Locked)</p>
                    <p className="font-medium">{nextLesson.title}</p>
                  </div>
                  <LockIcon className="w-4 h-4" />
                </div>
              ) : (
                <div />
              )}
            </div>

            {/* Email capture */}
            <div className="mt-10">
              <EmailCaptureInline
                title="Get Free Essential Oil Tips"
                description="Enjoy this lesson? Subscribe for weekly tips, recipes, and exclusive content."
                source={`lesson-${course.slug}-${lesson.slug}`}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

/** Locked lesson page - shown when lesson is not free */
function LockedLessonPage({
  course,
  lesson,
}: {
  course: Course;
  lesson: Lesson;
}) {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header Bar */}
      <div className="bg-white border-b border-sand-100">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link
            href={`/courses/${course.slug}`}
            className="text-sage-600 hover:text-sage-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </Link>
          <div>
            <p className="text-xs text-bark/50">{course.title}</p>
            <p className="text-sm font-medium text-bark">
              Lesson {lesson.order}: {lesson.title}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        {/* Lock Icon */}
        <div className="w-20 h-20 rounded-full bg-sand-100 flex items-center justify-center mx-auto mb-6">
          <LockIcon className="w-10 h-10 text-bark/30" />
        </div>

        {/* Blurred Preview */}
        <div className="relative mb-8">
          <div className="select-none blur-sm opacity-40 pointer-events-none text-left p-8 bg-white rounded-xl">
            <div className="h-8 bg-sand-200 rounded w-3/4 mb-4" />
            <div className="h-4 bg-sand-100 rounded w-full mb-2" />
            <div className="h-4 bg-sand-100 rounded w-5/6 mb-2" />
            <div className="h-4 bg-sand-100 rounded w-4/5 mb-6" />
            <div className="h-6 bg-sand-200 rounded w-2/3 mb-4" />
            <div className="h-4 bg-sand-100 rounded w-full mb-2" />
            <div className="h-4 bg-sand-100 rounded w-3/4 mb-2" />
            <div className="h-4 bg-sand-100 rounded w-5/6 mb-2" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cream" />
        </div>

        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-bark mb-3">
          This Lesson Is Locked
        </h2>
        <p className="text-bark/60 max-w-md mx-auto mb-8 leading-relaxed">
          Enroll in <strong className="text-bark">{course.title}</strong> to
          unlock this lesson and {course.lessonCount - 1} more. Get lifetime
          access to the entire course.
        </p>

        <div className="flex flex-col items-center gap-4">
          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex items-center justify-center px-8 py-4 bg-sage-500 text-white text-lg font-semibold rounded-lg hover:bg-sage-600 transition-all duration-200 shadow-card hover:shadow-elevated"
          >
            Enroll Now - {formatPrice(course.priceInCents)}
          </Link>
          <p className="text-xs text-bark/40">
            30-day money-back guarantee
          </p>
        </div>

        {/* Free lessons hint */}
        <div className="mt-12">
          <Card hover={false} className="text-left">
            <CardContent className="p-6">
              <h3 className="font-heading font-bold text-bark mb-4">
                Free Preview Lessons Available
              </h3>
              <div className="space-y-2">
                {course.lessons
                  .filter((l) => l.isFree)
                  .map((l) => (
                    <Link
                      key={l.id}
                      href={`/courses/${course.slug}/${l.slug}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-sage-50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center text-xs font-bold text-sage-700 flex-shrink-0">
                        {l.order}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-bark truncate">
                          {l.title}
                        </p>
                        <p className="text-xs text-bark/40">{l.duration}</p>
                      </div>
                      <Badge variant="sage" className="text-[10px] flex-shrink-0">
                        FREE
                      </Badge>
                    </Link>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
