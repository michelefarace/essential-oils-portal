"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

interface EmailCaptureInlineProps {
  title?: string;
  description?: string;
  buttonText?: string;
  source?: string;
  className?: string;
  dark?: boolean;
}

export function EmailCaptureInline({
  title = "Get Your Free Essential Oils Starter Guide",
  description = "Join thousands of essential oil enthusiasts. Get weekly tips, recipes, and exclusive guides delivered to your inbox.",
  buttonText = "Get Free Access",
  source = "inline",
  className,
  dark = false,
}: EmailCaptureInlineProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/email/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, source }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("Welcome! Check your inbox for your free guide.");
        setEmail("");
        setFirstName("");
      } else {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className={cn("text-center py-8 px-6 rounded-2xl", dark ? "bg-sage-800" : "bg-sage-50", className)}>
        <div className="text-4xl mb-3">✨</div>
        <h3 className={cn("font-heading text-xl font-bold mb-2", dark ? "text-white" : "text-bark")}>
          You&apos;re In!
        </h3>
        <p className={cn("text-sm", dark ? "text-sage-200" : "text-bark/70")}>{message}</p>
      </div>
    );
  }

  return (
    <div className={cn("py-8 px-6 rounded-2xl", dark ? "bg-sage-800" : "bg-sage-50", className)}>
      <div className="max-w-xl mx-auto text-center">
        <h3 className={cn("font-heading text-2xl font-bold mb-2", dark ? "text-white" : "text-bark")}>
          {title}
        </h3>
        <p className={cn("text-sm mb-6", dark ? "text-sage-200" : "text-bark/70")}>
          {description}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="flex-1"
          />
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" loading={status === "loading"} className="whitespace-nowrap">
            {buttonText}
          </Button>
        </form>
        {status === "error" && (
          <p className="text-sm text-red-400 mt-2">{message}</p>
        )}
        <p className={cn("text-xs mt-3", dark ? "text-sage-400" : "text-bark/40")}>
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
