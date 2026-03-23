import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "sage" | "lavender" | "sand" | "premium";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-sage-100 text-sage-700",
  sage: "bg-sage-200 text-sage-800",
  lavender: "bg-lavender-100 text-lavender-700",
  sand: "bg-sand-200 text-sand-800",
  premium: "bg-gradient-to-r from-lavender-400 to-sage-400 text-white",
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
