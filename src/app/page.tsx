import Link from "next/link";
import { Search, Sparkles, FlaskConical, GraduationCap, ArrowRight, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EmailCaptureInline } from "@/components/email/EmailCaptureInline";
import { SITE_NAME } from "@/lib/constants";
import oilsData from "@/data/oils.json";

const POPULAR_OILS = ["lavender", "peppermint", "tea-tree", "eucalyptus", "lemon", "frankincense"];

const OIL_COLORS: Record<string, string> = {
  lavender: "from-lavender-300 to-lavender-500",
  peppermint: "from-emerald-300 to-emerald-500",
  "tea-tree": "from-green-300 to-green-500",
  eucalyptus: "from-teal-300 to-teal-500",
  lemon: "from-yellow-200 to-yellow-400",
  frankincense: "from-amber-300 to-amber-500",
};

const FEATURES = [
  {
    icon: Search,
    title: "Oil Database",
    description: "Browse our comprehensive guide to 50+ essential oils with usage tips, safety info, and blending suggestions.",
    href: "/oils",
    color: "bg-sage-100 text-sage-600",
  },
  {
    icon: Sparkles,
    title: "Oil Finder Quiz",
    description: "Answer a few simple questions and discover which essential oils are perfect for your needs and lifestyle.",
    href: "/quiz",
    color: "bg-lavender-100 text-lavender-600",
  },
  {
    icon: FlaskConical,
    title: "DIY Recipes",
    description: "Explore curated recipes for diffuser blends, rollerballs, body care, and natural cleaning solutions.",
    href: "/recipes",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: GraduationCap,
    title: "Expert Courses",
    description: "Deepen your aromatherapy knowledge with structured courses from beginner basics to advanced techniques.",
    href: "/courses",
    color: "bg-rose-100 text-rose-600",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    role: "Wellness Enthusiast",
    quote:
      "The oil finder quiz matched me with the perfect blend for my evening routine. I sleep so much better now and look forward to winding down every night.",
  },
  {
    name: "James T.",
    role: "Yoga Instructor",
    quote:
      "I use the recipe section constantly for my studio. The diffuser blends have completely transformed the atmosphere of my classes.",
  },
  {
    name: "Priya K.",
    role: "New Mom",
    quote:
      "As a beginner, the safety information on each oil page gave me the confidence to start using essential oils around my family responsibly.",
  },
];

export default function HomePage() {
  const popularOils = oilsData.filter((oil) => POPULAR_OILS.includes(oil.slug));

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-50 via-cream to-lavender-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sage-200/30 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 sm:py-32 lg:py-40 text-center">
          <Badge variant="lavender" className="mb-6 text-sm px-4 py-1.5">
            Free Tools for Essential Oil Lovers
          </Badge>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-bark leading-tight mb-6">
            Discover the Power of{" "}
            <span className="bg-gradient-to-r from-sage-500 to-lavender-500 bg-clip-text text-transparent">
              Essential Oils
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-bark/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Your complete guide to aromatherapy. Explore our oil database, take our personalized quiz,
            discover DIY recipes, and learn from expert courses — all completely free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quiz">
              <Button size="lg" className="w-full sm:w-auto">
                Find Your Perfect Oil
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/oils">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Browse All Oils
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What You'll Find Section */}
      <section className="py-20 sm:py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-bark mb-4">
              What You&apos;ll Find Here
            </h2>
            <p className="text-bark/60 max-w-xl mx-auto text-lg">
              Everything you need to start or deepen your essential oils journey, from research to recipes.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature) => (
              <Link key={feature.title} href={feature.href} className="group">
                <Card className="h-full transition-all duration-300 group-hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}
                    >
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-bark mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-bark/60 text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Oils Section */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-cream to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-bark mb-3">
                Popular Essential Oils
              </h2>
              <p className="text-bark/60 text-lg">
                Start your journey with these beloved, versatile oils.
              </p>
            </div>
            <Link
              href="/oils"
              className="hidden sm:flex items-center text-sage-600 font-medium hover:text-sage-700 transition-colors"
            >
              View all oils
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularOils.map((oil) => (
              <Link key={oil.slug} href={`/oils/${oil.slug}`} className="group">
                <Card className="h-full transition-all duration-300 group-hover:-translate-y-1">
                  <div
                    className={`aspect-[3/2] bg-gradient-to-br ${OIL_COLORS[oil.slug] || "from-sage-200 to-sage-400"} flex items-center justify-center`}
                  >
                    <span className="text-5xl font-heading font-bold text-white/80">
                      {oil.name.charAt(0)}
                    </span>
                  </div>
                  <CardContent>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-heading text-lg font-semibold text-bark">
                          {oil.name}
                        </h3>
                        <p className="text-sm text-bark/50 italic">{oil.latinName}</p>
                      </div>
                      <Badge variant="sage" className="text-xs shrink-0 ml-2">
                        {oil.topNote}
                      </Badge>
                    </div>
                    <p className="text-sm text-bark/60 leading-relaxed mb-3">
                      {oil.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {oil.categories.slice(0, 2).map((cat) => (
                        <Badge key={cat} variant="lavender" className="text-xs">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="sm:hidden mt-8 text-center">
            <Link href="/oils">
              <Button variant="outline">
                View All Oils
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Email Capture Section */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <EmailCaptureInline
            title="Get Your Free Essential Oils Starter Guide"
            description="Join 12,000+ essential oil enthusiasts. Receive weekly recipes, safety tips, and exclusive guides straight to your inbox."
            source="homepage"
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-white to-sage-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-bark mb-4">
              Loved by Oil Enthusiasts
            </h2>
            <p className="text-bark/60 max-w-xl mx-auto text-lg">
              See how {SITE_NAME} has helped thousands discover the right oils for their lifestyle.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <Card key={testimonial.name} hover={false} className="bg-white">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-bark/70 leading-relaxed mb-6 text-sm">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold text-bark">{testimonial.name}</p>
                    <p className="text-sm text-bark/50">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-sage-600 to-sage-700" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-lavender-400/20 via-transparent to-transparent" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Find Your Perfect Oil?
          </h2>
          <p className="text-sage-100 text-lg mb-8 leading-relaxed">
            Take our free two-minute quiz and get personalized essential oil recommendations
            tailored to your goals and preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quiz">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white text-sage-700 hover:bg-sage-50 shadow-lg"
              >
                Take the Quiz
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/oils">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10"
              >
                Explore Oil Guide
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
