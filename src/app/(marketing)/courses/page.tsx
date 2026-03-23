"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

type Course = {
  id: string;
  title: string;
  description: string;
  price: number;
  level: string;
  modules: number;
  duration: string;
  includes: string[];
  comingSoon: boolean;
};

const courses: Course[] = [
  {
    id: "essential-oils-101",
    title: "Essential Oils 101",
    description:
      "Everything you need to know to start your essential oils journey with confidence. Learn the fundamentals of aromatherapy, how to use oils safely, and build your starter collection.",
    price: 2900,
    level: "Beginner",
    modules: 6,
    duration: "3 hours",
    includes: [
      "6 comprehensive video modules",
      "Printable quick-reference guide",
      "Safety cheat sheet for 20 common oils",
      "Top 10 starter blends recipe card",
      "Private community access",
      "Certificate of completion",
    ],
    comingSoon: true,
  },
  {
    id: "advanced-aromatherapy",
    title: "Advanced Aromatherapy",
    description:
      "Deepen your knowledge with advanced blending techniques, chemistry fundamentals, and therapeutic applications. Designed for those who want to take their practice to the next level.",
    price: 4900,
    level: "Intermediate",
    modules: 10,
    duration: "6 hours",
    includes: [
      "10 in-depth video modules",
      "Essential oil chemistry overview",
      "Advanced blending formulas workbook",
      "Aroma profiling exercises",
      "Therapeutic application guides",
      "1-on-1 Q&A session",
      "Certificate of completion",
    ],
    comingSoon: true,
  },
  {
    id: "diy-wellness-recipes",
    title: "DIY Wellness Recipes Masterclass",
    description:
      "Master the art of creating your own essential oil products at home. From skincare serums to cleaning products, learn to make practical, effective formulations for everyday life.",
    price: 3900,
    level: "All Levels",
    modules: 8,
    duration: "4.5 hours",
    includes: [
      "8 hands-on video modules",
      "25+ exclusive recipes not on the blog",
      "Ingredient sourcing guide",
      "Formulation calculator spreadsheet",
      "Printable recipe cards",
      "Supply list with recommended vendors",
      "Certificate of completion",
    ],
    comingSoon: true,
  },
];

const levelBadgeVariant: Record<string, "sage" | "lavender" | "sand"> = {
  Beginner: "sage",
  Intermediate: "lavender",
  "All Levels": "sand",
};

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export default function CoursesPage() {
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifyStatus, setNotifyStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail) return;

    setNotifyStatus("loading");
    try {
      const res = await fetch("/api/email/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: notifyEmail, source: "courses-waitlist" }),
      });

      if (res.ok) {
        setNotifyStatus("success");
        setNotifyEmail("");
      } else {
        setNotifyStatus("error");
      }
    } catch {
      setNotifyStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-sage-600 text-white py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Badge variant="premium" className="mb-4 text-sm px-4 py-1">
            Coming Soon
          </Badge>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Learn Essential Oils <br className="hidden sm:block" />
            From the Ground Up
          </h1>
          <p className="text-sage-100 text-lg max-w-2xl mx-auto">
            Structured, self-paced courses designed to take you from curious
            beginner to confident aromatherapy practitioner. Education-first,
            brand-neutral, and grounded in safety.
          </p>
        </div>
      </section>

      {/* Course Cards */}
      <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card
              key={course.id}
              hover={false}
              className="flex flex-col border-2 border-sand-100"
            >
              <CardContent className="flex flex-col flex-1 p-6 sm:p-8">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant={levelBadgeVariant[course.level] || "sage"}>
                    {course.level}
                  </Badge>
                  {course.comingSoon && (
                    <Badge variant="lavender">Coming Soon</Badge>
                  )}
                </div>

                <h2 className="font-heading text-2xl font-bold text-bark mb-3">
                  {course.title}
                </h2>
                <p className="text-bark/60 text-sm leading-relaxed mb-6 flex-1">
                  {course.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-bark/50 mb-6">
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                      />
                    </svg>
                    {course.modules} modules
                  </span>
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
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
                    {course.duration}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-3xl font-bold text-bark">
                    {formatPrice(course.price)}
                  </span>
                  <span className="text-bark/40 text-sm ml-1">one-time</span>
                </div>

                {/* What's Included */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-bark mb-3 uppercase tracking-wide">
                    What&apos;s Included
                  </h3>
                  <ul className="space-y-2">
                    {course.includes.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-bark/70"
                      >
                        <svg
                          className="w-4 h-4 text-sage-500 flex-shrink-0 mt-0.5"
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
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full mt-auto"
                  disabled
                >
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Notify Section */}
      <section className="max-w-2xl mx-auto px-4 pb-16">
        <Card hover={false} className="bg-sage-50 border-0">
          <CardContent className="text-center py-10 px-6 sm:px-10">
            <h2 className="font-heading text-2xl font-bold text-bark mb-3">
              Be the First to Know
            </h2>
            <p className="text-bark/60 text-sm mb-6 max-w-md mx-auto">
              Our courses are currently in development. Join the waitlist to get
              notified when they launch, plus receive an exclusive early-bird
              discount.
            </p>

            {notifyStatus === "success" ? (
              <div className="bg-sage-100 rounded-xl p-5 text-center">
                <p className="text-sage-700 font-medium">
                  You&apos;re on the list! We&apos;ll notify you as soon as
                  courses are available.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleNotifySubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button
                  type="submit"
                  loading={notifyStatus === "loading"}
                  className="whitespace-nowrap"
                >
                  Join Waitlist
                </Button>
              </form>
            )}
            {notifyStatus === "error" && (
              <p className="text-sm text-red-500 mt-2">
                Something went wrong. Please try again.
              </p>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Trust Indicators */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <div className="p-6">
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
                  d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342"
                />
              </svg>
            </div>
            <h3 className="font-heading font-bold text-bark mb-1">
              Education-First
            </h3>
            <p className="text-sm text-bark/60">
              Our courses prioritize knowledge and safety over product
              promotion.
            </p>
          </div>
          <div className="p-6">
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
              Brand-Neutral
            </h3>
            <p className="text-sm text-bark/60">
              We teach principles that work with any quality essential oil brand.
            </p>
          </div>
          <div className="p-6">
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
                  d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                />
              </svg>
            </div>
            <h3 className="font-heading font-bold text-bark mb-1">
              30-Day Guarantee
            </h3>
            <p className="text-sm text-bark/60">
              Not satisfied? Get a full refund within 30 days, no questions
              asked.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
