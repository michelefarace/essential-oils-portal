"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

interface Oil {
  name: string;
  slug: string;
  latinName: string;
  shortDescription: string;
  topNote: string;
  intensity: number;
  categories: string[];
}

interface OilGridProps {
  oils: Oil[];
}

const NOTE_COLORS: Record<string, string> = {
  TOP: "from-amber-200 to-amber-400",
  MIDDLE: "from-sage-200 to-sage-400",
  BASE: "from-bark/60 to-bark/80",
};

const CATEGORY_VARIANTS: Record<string, "default" | "sage" | "lavender" | "sand"> = {
  "Calming & Sleep": "lavender",
  "Skin & Beauty": "sage",
  "Energy & Focus": "sand",
  "Mood & Uplift": "lavender",
  default: "default",
};

export function OilGrid({ oils }: OilGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    oils.forEach((oil) => oil.categories.forEach((c) => cats.add(c)));
    return Array.from(cats).sort();
  }, [oils]);

  const filteredOils = useMemo(() => {
    let result = oils;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (oil) =>
          oil.name.toLowerCase().includes(q) ||
          oil.latinName.toLowerCase().includes(q) ||
          oil.shortDescription.toLowerCase().includes(q) ||
          oil.categories.some((c) => c.toLowerCase().includes(q))
      );
    }

    if (activeCategory) {
      result = result.filter((oil) => oil.categories.includes(activeCategory));
    }

    return result;
  }, [oils, searchQuery, activeCategory]);

  return (
    <div>
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-bark/40 pointer-events-none" />
        <Input
          type="text"
          placeholder="Search oils by name, benefit, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 pr-10 py-3 text-base"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-sand-100 transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-bark/40" />
          </button>
        )}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className={cn(
            "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
            activeCategory === null
              ? "bg-sage-500 text-white shadow-sm"
              : "bg-sand-100 text-bark/60 hover:bg-sand-200 hover:text-bark"
          )}
        >
          All
        </button>
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(activeCategory === category ? null : category)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
              activeCategory === category
                ? "bg-sage-500 text-white shadow-sm"
                : "bg-sand-100 text-bark/60 hover:bg-sand-200 hover:text-bark"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <p className="text-sm text-bark/50 mb-6">
        {filteredOils.length} {filteredOils.length === 1 ? "oil" : "oils"} found
        {activeCategory && (
          <span>
            {" "}
            in <span className="font-medium text-bark/70">{activeCategory}</span>
          </span>
        )}
        {searchQuery && (
          <span>
            {" "}
            matching &ldquo;<span className="font-medium text-bark/70">{searchQuery}</span>&rdquo;
          </span>
        )}
      </p>

      {/* Oil Grid */}
      {filteredOils.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOils.map((oil) => (
            <Link key={oil.slug} href={`/oils/${oil.slug}`} className="group">
              <Card className="h-full transition-all duration-300 group-hover:-translate-y-1">
                <div
                  className={cn(
                    "aspect-[3/2] bg-gradient-to-br flex items-center justify-center",
                    NOTE_COLORS[oil.topNote] || "from-sage-200 to-sage-400"
                  )}
                >
                  <span className="text-5xl font-heading font-bold text-white/80">
                    {oil.name.charAt(0)}
                  </span>
                </div>
                <CardContent>
                  <div className="flex items-start justify-between mb-1.5">
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-bark group-hover:text-sage-600 transition-colors">
                        {oil.name}
                      </h3>
                      <p className="text-sm text-bark/50 italic">{oil.latinName}</p>
                    </div>
                    <Badge variant="sage" className="text-xs shrink-0 ml-2">
                      {oil.topNote}
                    </Badge>
                  </div>
                  <p className="text-sm text-bark/60 leading-relaxed mb-3 line-clamp-2">
                    {oil.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {oil.categories.slice(0, 3).map((cat) => (
                      <Badge
                        key={cat}
                        variant={CATEGORY_VARIANTS[cat] || CATEGORY_VARIANTS.default}
                        className="text-xs"
                      >
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Search className="h-12 w-12 text-bark/20 mx-auto mb-4" />
          <h3 className="font-heading text-xl font-semibold text-bark mb-2">No oils found</h3>
          <p className="text-bark/50">
            Try adjusting your search or clearing the category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory(null);
            }}
            className="mt-4 text-sage-600 font-medium hover:text-sage-700 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
