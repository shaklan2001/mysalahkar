/**
 * Consume a Vibrium agents-api completion stream.
 */
export async function consumeAgentStream(
  body: ReadableStream<Uint8Array>,
  onUpdate: (assembled: string) => void,
  signal?: AbortSignal,
): Promise<void> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let mode: "unknown" | "sse" | "raw" = "unknown";
  let assembled = "";

  try {
    while (true) {
      if (signal?.aborted) throw new DOMException("Aborted", "AbortError");

      const { done, value } = await reader.read();
      if (done) break;
      if (!value?.length) continue;

      const chunk = decoder.decode(value, { stream: true });

      if (mode === "unknown") {
        const head = (buffer + chunk).trimStart();
        mode = head.startsWith("data:") ? "sse" : "raw";
      }

      if (mode === "raw") {
        assembled += chunk;
        continue;
      }

      buffer += chunk;
      const events = buffer.split(/\n\n|\n/);
      buffer = events.pop() || "";

      for (let event of events) {
        event = event.trim();
        if (!event) continue;
        if (event.startsWith("data:")) {
          event = event.replace(/^data:\s*/, "").trim();
        }
        if (event === "[DONE]") return;

        try {
          const parsed = JSON.parse(event) as { delta?: string };
          if (parsed.delta) {
            assembled += parsed.delta;
            onUpdate(assembled);
          }
        } catch {
          assembled += event;
          onUpdate(assembled);
        }
      }
    }

    if (mode === "sse" && buffer.trim()) {
      let event = buffer.trim();
      if (event.startsWith("data:")) {
        event = event.replace(/^data:\s*/, "").trim();
      }
      if (event && event !== "[DONE]") {
        try {
          const parsed = JSON.parse(event) as { delta?: string };
          if (parsed.delta) {
            assembled += parsed.delta;
            onUpdate(assembled);
          }
        } catch {
          assembled += event;
          onUpdate(assembled);
        }
      }
      return;
    }

    if (mode === "raw" && assembled) {
      await revealProgressively(assembled, onUpdate, signal);
    }
  } finally {
    reader.releaseLock();
  }
}

async function revealProgressively(
  full: string,
  onUpdate: (assembled: string) => void,
  signal?: AbortSignal,
) {
  const step = full.length > 2400 ? 12 : full.length > 900 ? 8 : 5;
  const delayMs = full.length > 2400 ? 8 : 12;

  for (let i = 0; i < full.length; i += step) {
    if (signal?.aborted) {
      onUpdate(full);
      return;
    }
    onUpdate(full.slice(0, Math.min(i + step, full.length)));
    await sleep(delayMs);
  }
  onUpdate(full);
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
