"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/lib/constants";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "Is the information on this site meant to replace medical advice?",
    answer:
      "No. All content on this site is for educational purposes only. Essential oils are not intended to diagnose, treat, cure, or prevent any disease. Always consult with a qualified healthcare professional before using essential oils, especially if you have a medical condition, are pregnant, nursing, or are considering use for children.",
  },
  {
    question: "Are you affiliated with a specific essential oil brand?",
    answer:
      "No, we are completely brand-neutral. Our guides, recipes, and recommendations focus on oil properties and safety rather than specific brands. We believe you should choose oils based on quality standards and personal preference, not brand loyalty.",
  },
  {
    question: "How do I know which essential oils are right for me?",
    answer:
      "We recommend starting with our free quiz, which asks about your wellness goals, preferences, and experience level to suggest oils that may be a good fit. You can also browse our comprehensive oil guide to learn about each oil individually.",
  },
  {
    question: "Are the recipes on this site safe to use?",
    answer:
      "Our recipes are formulated with proper dilution ratios and include safety notes. However, everyone is different. Always perform a patch test before trying a new recipe, follow the dilution guidelines provided, and discontinue use if irritation occurs. If you have sensitive skin or medical conditions, consult a professional first.",
  },
  {
    question: "Do I need to pay to access content?",
    answer:
      "The majority of our content, including oil profiles, the quiz, free recipes, and educational articles, is completely free. We offer premium recipes and courses for those who want to go deeper. Premium content helps support the free resources we provide.",
  },
  {
    question: "How can I unsubscribe from the email newsletter?",
    answer:
      "Every email we send includes an unsubscribe link at the bottom. Click it and you will be removed from our mailing list immediately. You can also contact us directly and we will process your request.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("loading");
    // UI-only for now - no backend endpoint
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 1000);
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-sage-600 text-white py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold mb-3">
            Contact Us
          </h1>
          <p className="text-sage-100 text-lg">
            Have a question or suggestion? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="font-heading text-2xl font-bold text-bark mb-6">
              Send Us a Message
            </h2>

            {status === "success" ? (
              <Card hover={false} className="bg-sage-50 border-0">
                <CardContent className="text-center py-12">
                  <div className="w-14 h-14 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-7 h-7 text-sage-600"
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
                  </div>
                  <h3 className="font-heading text-xl font-bold text-bark mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-bark/60 text-sm">
                    Thank you for reaching out. We&apos;ll get back to you as
                    soon as possible.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-sm text-sage-600 hover:underline mt-4 inline-block"
                  >
                    Send another message
                  </button>
                </CardContent>
              </Card>
            ) : (
              <Card hover={false}>
                <CardContent className="p-6 sm:p-8">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                      id="name"
                      label="Your Name"
                      type="text"
                      placeholder="Jane Smith"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                    <Input
                      id="email"
                      label="Email Address"
                      type="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                    <div className="space-y-1">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-bark"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        placeholder="How can we help you?"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        required
                        className={cn(
                          "w-full px-4 py-2.5 rounded-lg border border-sand-300 bg-white text-bark placeholder:text-sand-400 transition-colors focus:border-sage-400 focus:ring-2 focus:ring-sage-400/20 focus:outline-none resize-none"
                        )}
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      loading={status === "loading"}
                    >
                      Send Message
                    </Button>
                    {status === "error" && (
                      <p className="text-sm text-red-500 text-center">
                        Something went wrong. Please try again.
                      </p>
                    )}
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Contact Info */}
            <div className="mt-8 space-y-3 text-bark/60 text-sm">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-sage-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <a
                  href="mailto:hello@essentialoilshub.com"
                  className="text-sage-600 hover:underline"
                >
                  hello@essentialoilshub.com
                </a>
              </div>
              <p className="text-bark/40 text-xs">
                We aim to respond to all inquiries within 1-2 business days.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="font-heading text-2xl font-bold text-bark mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden border border-sand-100"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium text-bark text-sm pr-4">
                      {faq.question}
                    </span>
                    <svg
                      className={cn(
                        "w-5 h-5 text-bark/40 flex-shrink-0 transition-transform duration-200",
                        openFAQ === index && "rotate-180"
                      )}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </button>
                  {openFAQ === index && (
                    <div className="px-5 pb-5">
                      <p className="text-bark/60 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
