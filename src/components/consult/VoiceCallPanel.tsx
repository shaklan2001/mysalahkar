"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ConnectionQuality,
  ParticipantKind,
  RemoteParticipant,
  Room,
  RoomEvent,
  Track,
} from "livekit-client";
import { Loader2, Mic, MicOff, PhoneOff } from "lucide-react";
import { Button } from "@/components/ui/button";

const TRANSCRIPT_TOPIC = "vibrium.voice.transcript";

type CallStatus =
  | "idle"
  | "connecting"
  | "connected"
  | "reconnecting"
  | "disconnecting"
  | "disconnected"
  | "error";

type TranscriptLine = {
  id: string;
  role: "user" | "agent";
  content: string;
};

type VoiceCallPanelProps = {
  agentSlug: string;
  agentName: string;
  contactId: string;
  active: boolean;
  onEnded: () => void;
  fullScreen?: boolean;
};

export function VoiceCallPanel({
  agentSlug,
  agentName,
  contactId,
  active,
  onEnded,
  fullScreen = false,
}: VoiceCallPanelProps) {
  const roomRef = useRef<Room | null>(null);
  const audioContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [status, setStatus] = useState<CallStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [micEnabled, setMicEnabled] = useState(false);
  const [agentOnline, setAgentOnline] = useState(false);
  const [transcripts, setTranscripts] = useState<TranscriptLine[]>([]);

  const addTranscript = useCallback((role: "user" | "agent", content: string) => {
    const trimmed = content.trim();
    if (!trimmed) return;
    setTranscripts((prev) => {
      const last = prev[prev.length - 1];
      if (last?.role === role && last.content === trimmed) return prev;
      return [
        ...prev,
        { id: `${role}-${Date.now()}-${prev.length}`, role, content: trimmed },
      ];
    });
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [transcripts]);

  const disconnect = useCallback(async () => {
    const room = roomRef.current;
    if (!room) {
      setStatus("idle");
      onEnded();
      return;
    }
    setStatus("disconnecting");
    try {
      await room.localParticipant.setMicrophoneEnabled(false);
    } catch {
      // ignore
    }
    await room.disconnect();
    roomRef.current = null;
    setMicEnabled(false);
    setAgentOnline(false);
    setStatus("idle");
    onEnded();
  }, [onEnded]);

  const connect = useCallback(async () => {
    if (roomRef.current || !active) return;
    setStatus("connecting");
    setErrorMessage(null);
    setTranscripts([]);

    const sessionRes = await fetch("/api/agent/voice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        agentSlug,
        contactId,
        contactName: "Web visitor",
        mode: "voice",
      }),
    });

    if (!sessionRes.ok) {
      const data = await sessionRes.json().catch(() => ({}));
      setErrorMessage(data.error || "Could not start voice call");
      setStatus("error");
      return;
    }

    const session = await sessionRes.json();
    const room = new Room({ adaptiveStream: true, dynacast: true });

    room.on(RoomEvent.Connected, () => {
      setStatus("connected");
      room.startAudio().catch(() => {});
    });

    room.on(RoomEvent.Disconnected, () => {
      setMicEnabled(false);
      setAgentOnline(false);
      setStatus("disconnected");
      roomRef.current = null;
    });

    room.on(RoomEvent.Reconnecting, () => setStatus("reconnecting"));
    room.on(RoomEvent.Reconnected, () => setStatus("connected"));

    room.on(RoomEvent.ParticipantConnected, (participant: RemoteParticipant) => {
      if (participant.kind === ParticipantKind.AGENT) {
        setAgentOnline(true);
      }
    });

    room.on(RoomEvent.ParticipantDisconnected, (participant: RemoteParticipant) => {
      if (participant.kind === ParticipantKind.AGENT) {
        setAgentOnline(false);
      }
    });

    room.on(RoomEvent.TrackSubscribed, (track, _pub, participant) => {
      if (track.kind === Track.Kind.Audio) {
        const el = track.attach() as HTMLAudioElement;
        el.autoplay = true;
        audioContainerRef.current?.appendChild(el);
      }
    });

    room.on(RoomEvent.TrackUnsubscribed, (track) => {
      if (track.kind === Track.Kind.Audio) {
        track.detach().forEach((el) => el.remove());
      }
    });

    room.on(RoomEvent.ConnectionQualityChanged, (_q: ConnectionQuality, participant) => {
      if (participant === room.localParticipant) {
        // quality available if needed for UI
      }
    });

    room.on(RoomEvent.DataReceived, (payload, _participant, _kind, topic) => {
      if (topic !== TRANSCRIPT_TOPIC) return;
      try {
        const data = JSON.parse(new TextDecoder().decode(payload)) as {
          text?: string;
          role?: string;
        };
        if (data.text) {
          addTranscript(data.role === "user" ? "user" : "agent", data.text);
        }
      } catch {
        // ignore malformed transcript payloads
      }
    });

    roomRef.current = room;

    try {
      await room.connect(session.url, session.token);
      await room.localParticipant.setMicrophoneEnabled(true);
      setMicEnabled(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      let userMsg = msg;
      if (/permission|notallowed|microphone/i.test(msg)) {
        userMsg = "Microphone access denied. Allow mic in your browser and try again.";
      }
      setErrorMessage(userMsg);
      setStatus("error");
      roomRef.current = null;
    }
  }, [active, addTranscript, agentSlug, contactId]);

  useEffect(() => {
    if (active && status === "idle") {
      connect();
    }
    if (!active && roomRef.current) {
      disconnect();
    }
  }, [active, status, connect, disconnect]);

  useEffect(() => {
    return () => {
      roomRef.current?.disconnect().catch(() => {});
      roomRef.current = null;
    };
  }, []);

  const toggleMic = async () => {
    const room = roomRef.current;
    if (!room) return;
    const next = !micEnabled;
    await room.localParticipant.setMicrophoneEnabled(next);
    setMicEnabled(next);
  };

  const isActive = status === "connected" || status === "reconnecting";

  return (
    <div className={`flex flex-1 flex-col ${fullScreen ? "px-6 py-8" : ""}`}>
      <div ref={audioContainerRef} className="hidden" aria-hidden />

      <div
        className={`flex flex-1 flex-col items-center justify-center gap-6 text-center ${
          fullScreen ? "mx-auto max-w-2xl w-full" : ""
        }`}
      >
        <div
          className={`flex items-center justify-center rounded-full bg-blue-50 text-primary ${
            fullScreen ? "h-28 w-28" : "h-20 w-20"
          } ${status === "connecting" || status === "reconnecting" ? "animate-pulse" : ""}`}
        >
          {status === "connecting" || status === "reconnecting" ? (
            <Loader2 className={fullScreen ? "h-12 w-12 animate-spin" : "h-9 w-9 animate-spin"} />
          ) : (
            <Mic className={fullScreen ? "h-12 w-12" : "h-9 w-9"} />
          )}
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900">
            {status === "idle" && `Call ${agentName}`}
            {status === "connecting" && "Connecting…"}
            {status === "reconnecting" && "Reconnecting…"}
            {status === "connected" && (agentOnline ? "Connected" : "Waiting for agent…")}
            {status === "disconnecting" && "Ending call…"}
            {status === "error" && "Call failed"}
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            {status === "error"
              ? errorMessage
              : isActive
                ? "Speak naturally — your mic is live and transcripts appear below."
                : "Voice consultation with your AI specialist on MySalahkaar."}
          </p>
        </div>

        {transcripts.length > 0 && (
          <div
            ref={scrollRef}
            className={`w-full overflow-y-auto rounded-xl bg-slate-50 p-4 text-left text-sm text-slate-700 ${
              fullScreen ? "max-h-64" : "max-h-40"
            }`}
          >
            {transcripts.map((line) => (
              <div key={line.id} className="mb-2 last:mb-0">
                <p className="font-medium text-primary">
                  {line.role === "user" ? "You" : agentName}
                </p>
                <p className="mt-0.5">{line.content}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          {isActive && (
            <Button variant="outline" onClick={toggleMic}>
              {micEnabled ? (
                <>
                  <MicOff className="h-4 w-4" />
                  Mute
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4" />
                  Unmute
                </>
              )}
            </Button>
          )}
          {(isActive || status === "connecting" || status === "error") && (
            <Button
              variant="outline"
              onClick={disconnect}
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <PhoneOff className="h-4 w-4" />
              End call
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
