import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const consultationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone is required"),
  preferredTime: z.string().optional(),
  note: z.string().optional(),
  agentSlug: z.string().optional(),
  type: z.enum(["human-escalation", "booking"]).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = consultationSchema.parse(body);

    // Log to console
    console.log("[CONSULTATION]", {
      timestamp: new Date().toISOString(),
      ...data,
    });

    // Send to webhook if configured
    const webhookUrl = process.env.CONSULTATION_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            type: "consultation",
            ...data,
          }),
        });
        console.log("[CONSULTATION] Sent to webhook:", webhookUrl);
      } catch (webhookError) {
        console.error("[CONSULTATION] Webhook failed:", webhookError);
      }
    }

    // Optional: Resend integration (logged but not implemented)
    if (process.env.RESEND_API_KEY) {
      console.log("[CONSULTATION] Resend API key present, would send confirmation email");
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[CONSULTATION] Error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, errors: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { ok: false, error: "Failed to process consultation request" },
      { status: 500 }
    );
  }
}
