"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { DISCLAIMER_TEXT } from "@/lib/constants";

export function DisclaimerBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-sage-800 text-sage-100 text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <p className="text-center flex-1">{DISCLAIMER_TEXT}</p>
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 p-1 hover:bg-sage-700 rounded transition-colors"
          aria-label="Dismiss disclaimer"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
