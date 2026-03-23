import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmailCaptureInline } from "@/components/email/EmailCaptureInline";
import { cn } from "@/lib/utils";
import { SITE_NAME, FDA_DISCLAIMER } from "@/lib/constants";
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
  ingredients: { name: string; amount: string }[];
  instructions: string;
};

const recipes = recipesData as Recipe[];

function getRecipe(slug: string): Recipe | undefined {
  return recipes.find((r) => r.slug === slug);
}

export function generateStaticParams() {
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) return { title: "Recipe Not Found" };

  return {
    title: `${recipe.title} | ${SITE_NAME}`,
    description: recipe.description,
  };
}

const difficultyColor: Record<string, "sage" | "lavender" | "sand"> = {
  BEGINNER: "sage",
  INTERMEDIATE: "lavender",
  ADVANCED: "sand",
};

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = getRecipe(slug);

  if (!recipe) {
    notFound();
  }

  const instructionSteps = recipe.instructions
    .split("\n")
    .filter((step) => step.trim().length > 0);

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <section className="bg-sage-600 text-white py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4">
          <Link
            href="/recipes"
            className="inline-flex items-center gap-1 text-sage-200 hover:text-white text-sm mb-4 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back to Recipes
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="sage">{recipe.recipeType}</Badge>
            <Badge variant={difficultyColor[recipe.difficulty] || "sage"}>
              {recipe.difficulty}
            </Badge>
            {recipe.isPremium && <Badge variant="premium">Premium</Badge>}
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold mb-3">
            {recipe.title}
          </h1>
          <p className="text-sage-100 text-lg">{recipe.description}</p>
          <div className="flex items-center gap-2 mt-4 text-sage-200 text-sm">
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
            <span>Prep time: {recipe.prepTime} minutes</span>
          </div>
        </div>
      </section>

      {/* Premium Lock */}
      {recipe.isPremium && (
        <div className="max-w-3xl mx-auto px-4 py-8">
          <Card hover={false} className="border-2 border-lavender-300 bg-lavender-50">
            <CardContent className="text-center py-12">
              <svg
                className="w-16 h-16 text-lavender-400 mx-auto mb-4"
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
              <h2 className="font-heading text-2xl font-bold text-bark mb-2">
                Premium Recipe
              </h2>
              <p className="text-bark/60 max-w-md mx-auto mb-6">
                This recipe is part of our premium collection. Upgrade to access
                all premium recipes, advanced blending guides, and exclusive
                content.
              </p>
              <Link href="/courses">
                <Button size="lg">Unlock Premium Access</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Blurred preview of content */}
          <div className="mt-8 relative">
            <div className="blur-md select-none pointer-events-none" aria-hidden="true">
              <h2 className="font-heading text-xl font-bold text-bark mb-4">
                Ingredients
              </h2>
              <div className="bg-white rounded-xl p-6 mb-8">
                <p className="text-bark/60">
                  Premium content is hidden. Upgrade to view full recipe details
                  including ingredients, oil amounts, and step-by-step
                  instructions.
                </p>
              </div>
              <h2 className="font-heading text-xl font-bold text-bark mb-4">
                Instructions
              </h2>
              <div className="bg-white rounded-xl p-6">
                <p className="text-bark/60">
                  Step-by-step instructions are available for premium members.
                  Each recipe includes detailed guidance and helpful tips.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Free Recipe Content */}
      {!recipe.isPremium && (
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* Essential Oils Needed */}
          <section className="mb-10">
            <h2 className="font-heading text-xl font-bold text-bark mb-4">
              Essential Oils Needed
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {recipe.oils.map((oil) => (
                <Link
                  key={oil.slug}
                  href={`/oils/${oil.slug}`}
                  className="block"
                >
                  <Card className="hover:shadow-elevated transition-shadow duration-200">
                    <CardContent className="flex items-center justify-between p-4">
                      <span className="font-medium text-bark">{oil.name}</span>
                      <Badge variant="sage">{oil.drops} drops</Badge>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Other Ingredients */}
          <section className="mb-10">
            <h2 className="font-heading text-xl font-bold text-bark mb-4">
              Other Ingredients
            </h2>
            <Card hover={false}>
              <CardContent>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-sand-100 last:border-0"
                    >
                      <span className="text-bark">{ingredient.name}</span>
                      <span className="text-bark/60 text-sm">
                        {ingredient.amount}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Instructions */}
          <section className="mb-10">
            <h2 className="font-heading text-xl font-bold text-bark mb-4">
              Step-by-Step Instructions
            </h2>
            <Card hover={false}>
              <CardContent>
                <ol className="space-y-4">
                  {instructionSteps.map((step, index) => {
                    const cleanStep = step.replace(/^\d+\.\s*/, "");
                    return (
                      <li key={index} className="flex gap-4">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-sage-100 text-sage-600 font-semibold text-sm flex items-center justify-center mt-0.5">
                          {index + 1}
                        </span>
                        <p className="text-bark/80 leading-relaxed">
                          {cleanStep}
                        </p>
                      </li>
                    );
                  })}
                </ol>
              </CardContent>
            </Card>
          </section>

          {/* FDA Disclaimer */}
          <section className="mb-10">
            <div className="bg-sand-100 rounded-xl p-5 text-sm text-bark/50 leading-relaxed">
              <p className="font-medium text-bark/60 mb-1">Disclaimer</p>
              <p>{FDA_DISCLAIMER}</p>
              <p className="mt-2">
                Always perform a patch test before using any new essential oil
                topically. Keep essential oils out of reach of children and pets.
                If you are pregnant, nursing, or have a medical condition, consult
                a healthcare professional before use.
              </p>
            </div>
          </section>

          {/* Email Capture */}
          <section>
            <EmailCaptureInline
              title="Love This Recipe?"
              description="Get weekly recipes, blending tips, and exclusive guides delivered straight to your inbox."
              buttonText="Subscribe for More"
              source={`recipe-${recipe.slug}`}
            />
          </section>
        </div>
      )}
    </div>
  );
}
