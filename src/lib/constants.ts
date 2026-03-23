export const SITE_NAME = "EssentialOilsHub";
export const SITE_DESCRIPTION =
  "Your complete guide to essential oils. Discover oils, find your perfect blend, explore DIY recipes, and deepen your aromatherapy knowledge.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const DISCLAIMER_TEXT =
  "The information on this site is for educational purposes only and is not intended to diagnose, treat, cure, or prevent any disease.";

export const FDA_DISCLAIMER =
  "These statements have not been evaluated by the Food and Drug Administration. Essential oils are not intended to diagnose, treat, cure, or prevent any disease. Always consult a qualified healthcare practitioner before using essential oils.";

export const NAV_LINKS = [
  { label: "Oils Guide", href: "/oils" },
  { label: "Find Your Oil", href: "/quiz" },
  { label: "Recipes", href: "/recipes" },
  { label: "Courses", href: "/courses" },
  { label: "Blog", href: "/blog" },
] as const;

export const OIL_CATEGORIES = [
  "Calming & Sleep",
  "Energy & Focus",
  "Skin & Beauty",
  "Digestive Support",
  "Respiratory",
  "Muscle & Joint",
  "Mood & Emotions",
  "Home & Cleaning",
  "Immune Support",
] as const;

export const RECIPE_TYPES = [
  "Diffuser Blend",
  "Rollerball",
  "Body Care",
  "Cleaning",
  "Bath & Shower",
  "Massage Oil",
] as const;
