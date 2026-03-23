import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, source } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const KIT_API_KEY = process.env.KIT_API_KEY;
    const KIT_FORM_ID = process.env.KIT_FORM_ID;

    if (!KIT_API_KEY || !KIT_FORM_ID) {
      // In development without Kit configured, just log and return success
      console.log("Email subscription (dev mode):", { email, firstName, source });
      return NextResponse.json({ success: true, dev: true });
    }

    // Subscribe to Kit (ConvertKit) form
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: KIT_API_KEY,
          email,
          first_name: firstName || undefined,
          tags: [source ? `source:${source}` : "source:website"],
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Kit API error:", error);
      return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email subscribe error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
