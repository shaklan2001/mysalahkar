import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createMockBookingArtifacts } from "@/lib/booking";

const consultationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone is required"),
  preferredTime: z.string().optional(),
  note: z.string().optional(),
  agentSlug: z.string().optional(),
  type: z.enum(["human-escalation", "booking"]).optional(),
  privacyConsent: z.boolean().refine((v) => v === true, {
    message: "DPDP consent is required",
  }),
  hasDocument: z.boolean().optional(),
  documentName: z.string().max(200).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = consultationSchema.parse(body);

    const booking = createMockBookingArtifacts({
      title: "Human Consultation | My Salahkar",
      guestEmail: data.email,
      preferredTime: data.preferredTime,
      hasDocument: data.hasDocument,
    });

    console.log("[CONSULTATION]", {
      timestamp: new Date().toISOString(),
      type: data.type ?? "booking",
      agentSlug: data.agentSlug ?? null,
      hasDocument: Boolean(data.hasDocument),
    });

    const webhookUrl = process.env.CONSULTATION_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            type: "consultation",
            name: data.name,
            email: data.email,
            phone: data.phone,
            preferredTime: data.preferredTime,
            note: data.note,
            agentSlug: data.agentSlug,
            bookingType: data.type,
            meetUrl: booking.meetUrl,
          }),
        });
      } catch (webhookError) {
        console.error("[CONSULTATION] Webhook failed");
      }
    }

    return NextResponse.json({ ok: true, ...booking });
  } catch (error) {
    console.error("[CONSULTATION] Error");

    if (error instanceof z.ZodError) {
      const first = error.issues[0];
      return NextResponse.json(
        {
          ok: false,
          error: first?.message ?? "Validation failed",
          field: first?.path[0],
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { ok: false, error: "Failed to process consultation request" },
      { status: 500 }
    );
  }
}
