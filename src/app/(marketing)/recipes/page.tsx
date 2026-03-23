"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { RECIPE_TYPES } from "@/lib/constants";
import { EmailCaptureInline } from "@/components/email/EmailCaptureInline";
import recipesData from "@/data/recipes.json";

type Recipe = {
  title: string;
  slug: string;
  description: string;
  recipeType: string;
  difficulty: string;
  prepTime: number;
  isPremium: boolean;
  oils: { name: string; slug: string; drops: number }[];
};

const recipes = recipesData as Recipe[];

const difficultyColor: Record<string, "sage" | "lavender" | "sand"> = {
  BEGINNER: "sage",
  INTERMEDIATE: "lavender",
  ADVANCED: "sand",
};

export default function RecipesPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filterOptions = ["All", ...RECIPE_TYPES];

  const filteredRecipes =
    activeFilter === "All"
      ? recipes
      : recipes.filter((r) => r.recipeType === activeFilter);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-sage-600 text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
            DIY Essential Oil Recipes
          </h1>
          <p className="text-sage-100 text-lg max-w-2xl mx-auto">
            Discover easy-to-follow recipes for rollers, diffuser blends, body
            care, cleaning products, and more. From beginner to advanced.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-4">
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                activeFilter === filter
                  ? "bg-sage-500 text-white shadow-card"
                  : "bg-white text-bark/70 hover:bg-sage-50 hover:text-sage-600 border border-sand-200"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.slug} className="relative">
              {recipe.isPremium ? (
                <div className="relative">
                  <Card className="h-full opacity-80">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="premium">Premium</Badge>
                        <Badge variant="sand">{recipe.recipeType}</Badge>
                      </div>
                      <h3 className="font-heading text-lg font-bold text-bark mb-2">
                        {recipe.title}
                      </h3>
                      <p className="text-bark/60 text-sm line-clamp-2 mb-4">
                        {recipe.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-bark/50">
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
                          {recipe.prepTime} min
                        </span>
                        <Badge variant={difficultyColor[recipe.difficulty] || "sage"}>
                          {recipe.difficulty}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                  {/* Lock Overlay */}
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] rounded-xl flex flex-col items-center justify-center">
                    <svg
                      className="w-10 h-10 text-bark/40 mb-3"
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
                    <p className="text-bark/70 font-medium text-sm mb-2">
                      Premium Recipe
                    </p>
                    <Link
                      href="/courses"
                      className="text-sm font-medium text-sage-600 hover:text-sage-700 underline underline-offset-2"
                    >
                      Unlock with Premium
                    </Link>
                  </div>
                </div>
              ) : (
                <Link href={`/recipes/${recipe.slug}`} className="block h-full">
                  <Card className="h-full hover:shadow-elevated transition-shadow duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="sage">{recipe.recipeType}</Badge>
                      </div>
                      <h3 className="font-heading text-lg font-bold text-bark mb-2">
                        {recipe.title}
                      </h3>
                      <p className="text-bark/60 text-sm line-clamp-2 mb-4">
                        {recipe.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-bark/50">
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
                          {recipe.prepTime} min
                        </span>
                        <Badge variant={difficultyColor[recipe.difficulty] || "sage"}>
                          {recipe.difficulty}
                        </Badge>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-1">
                        {recipe.oils.map((oil) => (
                          <span
                            key={oil.slug}
                            className="text-xs text-bark/50 bg-sand-100 px-2 py-0.5 rounded-full"
                          >
                            {oil.name}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )}
            </div>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-16">
            <p className="text-bark/50 text-lg">
              No recipes found for this filter. Try a different category.
            </p>
          </div>
        )}
      </div>

      {/* Email Capture */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <EmailCaptureInline
          title="Get 5 Free Bonus Recipes"
          description="Subscribe to our newsletter and receive five exclusive essential oil recipes not available on the site."
          buttonText="Send Me the Recipes"
          source="recipes-page"
        />
      </section>
    </div>
  );
}
