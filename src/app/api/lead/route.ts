import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = leadSchema.parse(body);

    // Log to console
    console.log("[LEAD]", {
      timestamp: new Date().toISOString(),
      ...data,
    });

    // Send to webhook if configured
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            type: "lead",
            ...data,
          }),
        });
        console.log("[LEAD] Sent to webhook:", webhookUrl);
      } catch (webhookError) {
        console.error("[LEAD] Webhook failed:", webhookError);
      }
    }

    // Optional: Resend integration (logged but not implemented)
    if (process.env.RESEND_API_KEY) {
      console.log("[LEAD] Resend API key present, would send email notification");
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[LEAD] Error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, errors: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { ok: false, error: "Failed to process lead" },
      { status: 500 }
    );
  }
}
