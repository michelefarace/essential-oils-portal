import { NextRequest, NextResponse } from "next/server";
import coursesData from "@/data/courses.json";

export async function POST(request: NextRequest) {
  try {
    const { courseId } = await request.json();

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    const course = coursesData.find((c: { id: string }) => c.id === courseId);

    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
      return NextResponse.json(
        {
          error:
            "Payments are not configured yet. Please contact us for access.",
          dev: true,
        },
        { status: 503 }
      );
    }

    // Dynamic import to avoid build errors when stripe is not installed
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(stripeKey);

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: course.title,
              description: course.shortDescription,
            },
            unit_amount: course.priceInCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/courses/${course.slug}?success=true`,
      cancel_url: `${siteUrl}/courses/${course.slug}`,
      metadata: {
        courseId: course.id,
        courseSlug: course.slug,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
