import Link from "next/link";
import { Droplets } from "lucide-react";
import { SITE_NAME, DISCLAIMER_TEXT } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-sage-950 text-sage-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Droplets className="h-6 w-6 text-sage-400" />
              <span className="font-heading text-lg font-bold text-white">{SITE_NAME}</span>
            </div>
            <p className="text-sm text-sage-300">
              Your trusted resource for essential oil education, recipes, and wellness guidance.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/oils" className="hover:text-white transition-colors">Oil Guide</Link></li>
              <li><Link href="/quiz" className="hover:text-white transition-colors">Find Your Oil</Link></li>
              <li><Link href="/recipes" className="hover:text-white transition-colors">DIY Recipes</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-3">Learn</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/courses" className="hover:text-white transition-colors">Courses</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 pt-8 border-t border-sage-800">
          <p className="text-xs text-sage-400 text-center max-w-3xl mx-auto">
            {DISCLAIMER_TEXT}
          </p>
          <p className="text-xs text-sage-500 text-center mt-4">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
