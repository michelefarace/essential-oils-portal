"use client";

import { formatPrice } from "@/lib/utils";

interface EnrollButtonProps {
  courseTitle: string;
  courseSlug: string;
  courseId: string;
  priceInCents: number;
}

export function EnrollButton({ courseTitle, courseSlug, courseId, priceInCents }: EnrollButtonProps) {
  const handleEnroll = async () => {
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(
          data.error ||
            `Enrollment for "${courseTitle}" (${formatPrice(priceInCents)}) will be available soon!`
        );
      }
    } catch {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <button
      onClick={handleEnroll}
      className="inline-flex items-center justify-center px-8 py-4 bg-sage-500 text-white text-lg font-semibold rounded-lg hover:bg-sage-600 transition-all duration-200 shadow-card hover:shadow-elevated"
    >
      Enroll Now - {formatPrice(priceInCents)}
    </button>
  );
}
