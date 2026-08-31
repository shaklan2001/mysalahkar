import { NextRequest, NextResponse } from "next/server";
import { isVibriumAgentConfigured } from "@/lib/vibrium/config";
import { startSession } from "@/lib/vibrium/chat";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const limited = checkRateLimit(req, "chat-start", 30, 60_000);
    if (limited) return limited;

    const body = (await req.json()) as {
      agentSlug?: string;
      contactId?: string;
    };

    const agentSlug = (body.agentSlug || "").trim();
    const contactId = (body.contactId || "").trim();

    if (!agentSlug || !isVibriumAgentConfigured(agentSlug)) {
      return NextResponse.json({ error: "Invalid agent" }, { status: 400 });
    }
    if (!contactId || contactId.length > 128) {
      return NextResponse.json(
        { error: "Valid contactId is required" },
        { status: 400 },
      );
    }

    const session = await startSession(agentSlug, contactId);
    return NextResponse.json({
      ok: true,
      sessionId: session.session_id,
      contactId,
    });
  } catch (err) {
    console.error("[chat/start]", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : "Failed to start chat session",
      },
      { status: 500 },
    );
  }
}
