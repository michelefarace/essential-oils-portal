import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  AlertTriangle,
  Droplets,
  Wind,
  Hand,
  Home,
  Sparkles,
  Bath,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmailCaptureInline } from "@/components/email/EmailCaptureInline";
import { FDA_DISCLAIMER, SITE_NAME } from "@/lib/constants";
import oilsData from "@/data/oils.json";

type Oil = (typeof oilsData)[number];

const METHOD_ICONS: Record<string, React.ElementType> = {
  Aromatic: Wind,
  Topical: Hand,
  Inhalation: Wind,
  "Steam Inhalation": Droplets,
  Bath: Bath,
  Household: Home,
  Internal: Sparkles,
};

const NOTE_COLORS: Record<string, string> = {
  TOP: "from-amber-200 to-amber-400",
  MIDDLE: "from-sage-200 to-sage-400",
  BASE: "from-bark/60 to-bark/80",
};

function getOilBySlug(slug: string): Oil | undefined {
  return oilsData.find((oil) => oil.slug === slug);
}

export async function generateStaticParams() {
  return oilsData.map((oil) => ({
    slug: oil.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const oil = getOilBySlug(slug);

  if (!oil) {
    return { title: "Oil Not Found" };
  }

  return {
    title: `${oil.name} Essential Oil - Benefits, Uses & Safety | ${SITE_NAME}`,
    description: oil.shortDescription,
    keywords: [
      `${oil.name.toLowerCase()} essential oil`,
      `${oil.name.toLowerCase()} oil benefits`,
      `${oil.name.toLowerCase()} aromatherapy`,
      ...oil.categories.map((c) => c.toLowerCase()),
    ],
  };
}

export default async function OilDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const oil = getOilBySlug(slug);

  if (!oil) {
    notFound();
  }

  const blendsWithOils = oil.blendsWith
    .map((bSlug) => oilsData.find((o) => o.slug === bSlug))
    .filter(Boolean) as Oil[];

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <Link
          href="/oils"
          className="inline-flex items-center text-sage-600 hover:text-sage-700 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to Oil Guide
        </Link>

        {/* Oil Header */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-10">
          <div
            className={`w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-br ${NOTE_COLORS[oil.topNote] || "from-sage-200 to-sage-400"} flex items-center justify-center shrink-0 shadow-card`}
          >
            <span className="text-5xl sm:text-6xl font-heading font-bold text-white/80">
              {oil.name.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-bark">
                {oil.name}
              </h1>
              <Badge variant="sage">{oil.topNote} Note</Badge>
            </div>
            <p className="text-bark/50 italic text-lg mb-3">{oil.latinName}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {oil.categories.map((cat) => (
                <Badge key={cat} variant="lavender">
                  {cat}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-bark/50">
              <span>Aroma Intensity:</span>
              <div className="flex gap-0.5">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full ${
                      i < oil.intensity ? "bg-sage-400" : "bg-sand-200"
                    }`}
                  />
                ))}
              </div>
              <span className="font-medium text-bark/70">{oil.intensity}/10</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <section className="mb-10">
          <h2 className="font-heading text-2xl font-bold text-bark mb-4">About {oil.name}</h2>
          <p className="text-bark/70 leading-relaxed text-lg">{oil.description}</p>
        </section>

        {/* Usage Methods */}
        <section className="mb-10">
          <h2 className="font-heading text-2xl font-bold text-bark mb-6">How to Use</h2>
          <div className="space-y-4">
            {oil.usageMethods.map((usage) => {
              const Icon = METHOD_ICONS[usage.method] || Sparkles;
              return (
                <Card key={usage.method} hover={false}>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-sage-100 text-sage-600 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-bark mb-1">{usage.method}</h3>
                        <p className="text-bark/60 text-sm leading-relaxed">
                          {usage.instruction}
                        </p>
                        {usage.dilution && (
                          <p className="text-sm text-sage-600 mt-1.5">
                            <span className="font-medium">Dilution:</span> {usage.dilution}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Safety Notes */}
        <section className="mb-10">
          <Card hover={false} className="border border-amber-200 bg-amber-50/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-heading text-xl font-bold text-bark mb-2">Safety Notes</h2>
                  <p className="text-bark/70 leading-relaxed">{oil.safetyNotes}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Blends Well With */}
        {blendsWithOils.length > 0 && (
          <section className="mb-10">
            <h2 className="font-heading text-2xl font-bold text-bark mb-6">Blends Well With</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {blendsWithOils.map((blendOil) => (
                <Link key={blendOil.slug} href={`/oils/${blendOil.slug}`} className="group">
                  <Card className="transition-all duration-300 group-hover:-translate-y-0.5">
                    <CardContent className="p-4 text-center">
                      <div
                        className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-br ${NOTE_COLORS[blendOil.topNote] || "from-sage-200 to-sage-400"} flex items-center justify-center mb-2`}
                      >
                        <span className="text-lg font-heading font-bold text-white/80">
                          {blendOil.name.charAt(0)}
                        </span>
                      </div>
                      <p className="font-medium text-bark text-sm group-hover:text-sage-600 transition-colors">
                        {blendOil.name}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Email Capture */}
        <section className="mb-10">
          <EmailCaptureInline
            title={`Love ${oil.name}? Get More Tips`}
            description={`Subscribe for weekly recipes, blending ideas, and safety updates for ${oil.name} and other essential oils.`}
            source={`oil-detail-${oil.slug}`}
          />
        </section>

        {/* FDA Disclaimer */}
        <section className="border-t border-sand-200 pt-8">
          <p className="text-xs text-bark/40 leading-relaxed">{FDA_DISCLAIMER}</p>
        </section>
      </div>
    </div>
  );
}
