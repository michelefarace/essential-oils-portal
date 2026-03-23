import type { Metadata } from "next";
import { OilGrid } from "@/components/oils/OilGrid";
import { SITE_NAME } from "@/lib/constants";
import oilsData from "@/data/oils.json";

export const metadata: Metadata = {
  title: `Essential Oil Guide | ${SITE_NAME}`,
  description:
    "Browse our comprehensive guide to 50+ essential oils. Search by name, filter by category, and discover detailed usage tips, safety information, and blending suggestions.",
  keywords: [
    "essential oils guide",
    "aromatherapy oils",
    "essential oil list",
    "oil benefits",
    "essential oil database",
  ],
};

export default function OilsPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-bark mb-4">
            Essential Oil Guide
          </h1>
          <p className="text-lg text-bark/60 max-w-2xl leading-relaxed">
            Explore our library of {oilsData.length} essential oils. Search by name or benefit,
            filter by category, and tap any oil to learn about usage methods, safety notes, and
            blending ideas.
          </p>
        </div>

        {/* Interactive Oil Grid */}
        <OilGrid oils={oilsData} />
      </div>
    </div>
  );
}
