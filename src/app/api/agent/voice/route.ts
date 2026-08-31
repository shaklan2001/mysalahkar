import { NextRequest, NextResponse } from "next/server";
import { isVibriumAgentConfigured } from "@/lib/vibrium/config";
import { createWebCallSession } from "@/lib/vibrium/web-call";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const limited = checkRateLimit(req, "voice", 20, 60_000);
    if (limited) return limited;

    const body = (await req.json()) as {
      agentSlug?: string;
      contactId?: string;
      contactName?: string;
      mode?: "voice" | "chat" | "hybrid";
    };

    const agentSlug = (body.agentSlug || "").trim();
    const contactId = (body.contactId || "").trim();
    const contactName = (body.contactName || "").trim();
    const mode = body.mode || "voice";

    if (!agentSlug || !isVibriumAgentConfigured(agentSlug)) {
      return NextResponse.json({ error: "Invalid agent" }, { status: 400 });
    }
    if (!contactId || contactId.length > 128) {
      return NextResponse.json(
        { error: "Valid contactId is required" },
        { status: 400 },
      );
    }

    const session = await createWebCallSession({
      agentSlug,
      contactId,
      contactName,
      mode,
    });

    return NextResponse.json({ ok: true, ...session });
  } catch (err) {
    console.error("[voice]", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : "Failed to start voice session",
      },
      { status: 500 },
    );
  }
}
