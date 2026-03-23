"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/lib/constants";
import quizQuestions from "@/data/quiz-questions.json";
import oilsData from "@/data/oils.json";

type QuizOption = {
  label: string;
  tags: string[];
};

type QuizQuestion = {
  id: number;
  question: string;
  options: QuizOption[];
};

type Oil = {
  name: string;
  slug: string;
  shortDescription: string;
  categories: string[];
};

const TAG_TO_CATEGORY: Record<string, string[]> = {
  sleep: ["Calming & Sleep"],
  calming: ["Calming & Sleep"],
  relaxation: ["Calming & Sleep"],
  energy: ["Energy & Focus"],
  focus: ["Energy & Focus"],
  uplifting: ["Mood & Uplift"],
  skin: ["Skin & Beauty"],
  beauty: ["Skin & Beauty"],
  glow: ["Skin & Beauty"],
  mood: ["Mood & Uplift"],
  emotions: ["Mood & Uplift"],
  balance: ["Mood & Uplift", "Calming & Sleep"],
  grounding: ["Grounding & Meditation"],
  meditation: ["Grounding & Meditation"],
  floral: ["Calming & Sleep", "Skin & Beauty"],
  citrus: ["Mood & Uplift", "Energy & Focus"],
  woody: ["Grounding & Meditation"],
  herbal: ["Energy & Focus", "Respiratory Support"],
  respiratory: ["Respiratory Support"],
  muscle: ["Muscle & Joint Support", "Comfort & Soothing"],
  comfort: ["Comfort & Soothing"],
  cleaning: ["Cleansing & Purifying"],
  gentle: ["Calming & Sleep", "Skin & Beauty"],
  mild: ["Calming & Sleep", "Children's Wellness"],
  versatile: ["Calming & Sleep", "Mood & Uplift", "Energy & Focus"],
  potent: ["Immune Support", "Energy & Focus"],
  beginner: ["Calming & Sleep", "Mood & Uplift"],
  intermediate: ["Energy & Focus", "Skin & Beauty"],
  advanced: ["Grounding & Meditation", "Immune Support"],
  rare: ["Grounding & Meditation"],
  premium: ["Skin & Beauty"],
  blending: ["Calming & Sleep", "Mood & Uplift"],
  layering: ["Grounding & Meditation"],
  aromatic: ["Calming & Sleep", "Mood & Uplift"],
  diffuser: ["Calming & Sleep", "Mood & Uplift"],
  atmosphere: ["Calming & Sleep"],
  topical: ["Skin & Beauty", "Comfort & Soothing"],
  roller: ["Calming & Sleep", "Skin & Beauty"],
  bath: ["Calming & Sleep", "Skin & Beauty"],
  "self-care": ["Calming & Sleep", "Skin & Beauty"],
  diy: ["Cleansing & Purifying"],
  creative: ["Mood & Uplift"],
  "stress-relief": ["Calming & Sleep"],
  adaptable: ["Mood & Uplift", "Energy & Focus"],
  maintenance: ["Immune Support"],
  moderate: ["Skin & Beauty"],
  variety: ["Energy & Focus"],
};

const questions = quizQuestions as QuizQuestion[];
const oils = oilsData as Oil[];

function getRecommendations(answers: number[]): Oil[] {
  const tagCounts: Record<string, number> = {};

  answers.forEach((answerIndex, questionIndex) => {
    const question = questions[questionIndex];
    if (!question) return;
    const option = question.options[answerIndex];
    if (!option) return;
    option.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const categoryCounts: Record<string, number> = {};
  Object.entries(tagCounts).forEach(([tag, count]) => {
    const categories = TAG_TO_CATEGORY[tag] || [];
    categories.forEach((cat) => {
      categoryCounts[cat] = (categoryCounts[cat] || 0) + count;
    });
  });

  const oilScores = oils.map((oil) => {
    let score = 0;
    oil.categories.forEach((cat) => {
      score += categoryCounts[cat] || 0;
    });
    return { oil, score };
  });

  oilScores.sort((a, b) => b.score - a.score);
  return oilScores.slice(0, 5).map((o) => o.oil);
}

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "loading" | "error">("idle");
  const [showResults, setShowResults] = useState(false);

  const totalSteps = questions.length;
  const quizComplete = answers.length === totalSteps;

  const recommendations = useMemo(() => {
    if (!quizComplete) return [];
    return getRecommendations(answers);
  }, [answers, quizComplete]);

  const handleOptionClick = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setEmailStatus("loading");
    try {
      const res = await fetch("/api/email/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, source: "quiz" }),
      });

      if (res.ok) {
        setEmailSubmitted(true);
        setShowResults(true);
      } else {
        setEmailStatus("error");
      }
    } catch {
      setEmailStatus("error");
    }
  };

  const handleSkipEmail = () => {
    setShowResults(true);
  };

  const progressPercent = quizComplete
    ? 100
    : Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <section className="bg-sage-600 text-white py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold mb-3">
            Find Your Perfect Essential Oils
          </h1>
          <p className="text-sage-100 text-lg">
            Answer a few quick questions and we&apos;ll recommend the best oils
            for your unique needs.
          </p>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="max-w-2xl mx-auto px-4 pt-8">
        <div className="flex items-center justify-between text-sm text-bark/60 mb-2">
          <span>
            {quizComplete
              ? "Quiz complete!"
              : `Question ${currentStep + 1} of ${totalSteps}`}
          </span>
          <span>{progressPercent}%</span>
        </div>
        <div className="w-full h-2 bg-sand-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-sage-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Quiz Content */}
      <div className="max-w-2xl mx-auto px-4 py-10">
        <AnimatePresence mode="wait">
          {/* Active Question */}
          {!quizComplete && (
            <motion.div
              key={`question-${currentStep}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-bark text-center mb-8">
                {questions[currentStep].question}
              </h2>
              <div className="grid gap-4">
                {questions[currentStep].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(index)}
                    className={cn(
                      "w-full text-left p-5 rounded-xl border-2 border-sand-200 bg-white",
                      "hover:border-sage-400 hover:bg-sage-50 hover:shadow-card",
                      "transition-all duration-200 group"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-sage-100 text-sage-600 font-semibold text-sm flex items-center justify-center group-hover:bg-sage-500 group-hover:text-white transition-colors">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-bark font-medium text-lg">
                        {option.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              {currentStep > 0 && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => {
                      setCurrentStep(currentStep - 1);
                      setAnswers(answers.slice(0, -1));
                    }}
                    className="text-sm text-bark/50 hover:text-bark/80 transition-colors"
                  >
                    &larr; Go back
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* Email Gate */}
          {quizComplete && !showResults && (
            <motion.div
              key="email-gate"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-sage-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
                  />
                </svg>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-bark mb-3">
                Your Results Are Ready!
              </h2>
              <p className="text-bark/70 mb-8 max-w-md mx-auto">
                Enter your email to see your personalized oil recommendations
                and get a free starter guide.
              </p>
              <form
                onSubmit={handleEmailSubmit}
                className="max-w-sm mx-auto space-y-3"
              >
                <Input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  loading={emailStatus === "loading"}
                >
                  See My Recommendations
                </Button>
                {emailStatus === "error" && (
                  <p className="text-sm text-red-500">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
              <button
                onClick={handleSkipEmail}
                className="text-sm text-bark/40 hover:text-bark/60 transition-colors mt-4 inline-block"
              >
                Skip for now
              </button>
            </motion.div>
          )}

          {/* Results */}
          {showResults && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center mb-10">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-bark mb-3">
                  Your Top 5 Recommended Oils
                </h2>
                <p className="text-bark/70 max-w-md mx-auto">
                  Based on your answers, these essential oils are a great match
                  for your lifestyle and wellness goals.
                </p>
              </div>

              <div className="grid gap-4">
                {recommendations.map((oil, index) => (
                  <Link
                    key={oil.slug}
                    href={`/oils/${oil.slug}`}
                    className="block"
                  >
                    <Card className="hover:shadow-elevated transition-shadow duration-200">
                      <CardContent className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-10 h-10 rounded-full bg-sage-100 text-sage-600 font-bold text-lg flex items-center justify-center mt-0.5">
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading text-xl font-bold text-bark mb-1">
                            {oil.name}
                          </h3>
                          <p className="text-bark/60 text-sm mb-2">
                            {oil.shortDescription}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {oil.categories.map((cat) => (
                              <Badge key={cat} variant="sage">
                                {cat}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <svg
                          className="w-5 h-5 text-bark/30 flex-shrink-0 mt-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              <div className="mt-10 text-center space-y-4">
                <Link href="/oils">
                  <Button variant="outline" size="lg">
                    Browse All Essential Oils
                  </Button>
                </Link>
                <div>
                  <button
                    onClick={() => {
                      setAnswers([]);
                      setCurrentStep(0);
                      setShowResults(false);
                      setEmailSubmitted(false);
                      setEmail("");
                      setFirstName("");
                      setEmailStatus("idle");
                    }}
                    className="text-sm text-bark/50 hover:text-bark/80 transition-colors"
                  >
                    Retake the quiz
                  </button>
                </div>
              </div>

              {!emailSubmitted && (
                <div className="mt-12">
                  <Card hover={false} className="bg-sage-50 border-0">
                    <CardContent className="text-center py-8">
                      <h3 className="font-heading text-xl font-bold text-bark mb-2">
                        Want to dive deeper?
                      </h3>
                      <p className="text-bark/60 text-sm mb-4">
                        Get our free Essential Oils Starter Guide with detailed
                        profiles, blending tips, and safety guidelines.
                      </p>
                      <Link href="/recipes">
                        <Button variant="secondary">
                          Explore DIY Recipes
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
