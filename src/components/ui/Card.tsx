import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ className, hover = true, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-card overflow-hidden",
        hover && "transition-shadow duration-200 hover:shadow-elevated",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardImage({ className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <div className="aspect-[4/3] overflow-hidden">
      <img className={cn("w-full h-full object-cover", className)} {...props} />
    </div>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-5", className)} {...props}>
      {children}
    </div>
  );
}
