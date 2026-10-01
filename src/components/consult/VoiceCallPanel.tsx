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
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CallLowBalanceDialog } from "@/components/consult/CallLowBalanceDialog";
import { CallReviewDialog } from "@/components/consult/CallReviewDialog";
import { formatClock, meterTick, readCallRates } from "@/lib/call-meter";
import { debitWallet, formatRupees, readBalancePaise } from "@/lib/wallet";

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
  /** True while a connect() is in flight — blocks a second, parallel room (StrictMode / re-renders). */
  const connectingRef = useRef(false);
  /** Bumped on every hang-up so a connect() still in flight knows it was cancelled. */
  const attemptRef = useRef(0);
  const audioContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [status, setStatus] = useState<CallStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [micEnabled, setMicEnabled] = useState(false);
  const [agentOnline, setAgentOnline] = useState(false);
  const [transcripts, setTranscripts] = useState<TranscriptLine[]>([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null);
  const [walletPaise, setWalletPaise] = useState(0);
  const [lowBalance, setLowBalance] = useState(false);
  const payingRef = useRef(false);
  const ratesRef = useRef(readCallRates());
  const hadCallRef = useRef(false);
  const mountedRef = useRef(true);
  const onEndedRef = useRef(onEnded);
  onEndedRef.current = onEnded;
  const [reviewOpen, setReviewOpen] = useState(false);

  const promptReview = useCallback(() => {
    if (!mountedRef.current || !hadCallRef.current) return;
    hadCallRef.current = false;
    setReviewOpen(true);
  }, []);

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

  /** Stop and remove every agent audio element, so nothing keeps playing after hang-up. */
  const teardownAudio = useCallback((room: Room | null) => {
    room?.remoteParticipants.forEach((participant) => {
      participant.audioTrackPublications.forEach((pub) => {
        pub.track?.detach().forEach((el) => el.remove());
      });
    });
    audioContainerRef.current?.querySelectorAll("audio").forEach((el) => {
      el.pause();
      el.srcObject = null;
      el.remove();
    });
  }, []);

  const disconnect = useCallback(async () => {
    attemptRef.current += 1; // cancel any connect() still in flight
    connectingRef.current = false;
    const room = roomRef.current;
    if (!room) {
      teardownAudio(null);
      setStatus("idle");
      promptReview();
      onEndedRef.current();
      return;
    }
    roomRef.current = null;
    setStatus("disconnecting");
    teardownAudio(room);
    try {
      await room.localParticipant.setMicrophoneEnabled(false);
    } catch {
      // ignore
    }
    await room.disconnect().catch(() => {});
    teardownAudio(room);
    setMicEnabled(false);
    setAgentOnline(false);
    setStatus("idle");
    promptReview();
    onEndedRef.current();
  }, [promptReview, teardownAudio]);

  const connect = useCallback(async () => {
    if (roomRef.current || connectingRef.current || !active) return;
    connectingRef.current = true;
    const attempt = ++attemptRef.current;
    const cancelled = () => attempt !== attemptRef.current;
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

    if (cancelled()) return;

    if (!sessionRes.ok) {
      connectingRef.current = false;
      const data = await sessionRes.json().catch(() => ({}));
      setErrorMessage(data.error || "Could not start voice call");
      setStatus("error");
      return;
    }

    const session = await sessionRes.json();
    if (cancelled()) return;
    const room = new Room({ adaptiveStream: true, dynacast: true });

    room.on(RoomEvent.Connected, () => {
      hadCallRef.current = true;
      setStatus("connected");
      room.startAudio().catch(() => {});
    });

    room.on(RoomEvent.Disconnected, () => {
      teardownAudio(room);
      if (roomRef.current !== room) return; // already handled by disconnect() or a stale room
      setMicEnabled(false);
      setAgentOnline(false);
      roomRef.current = null;
      setStatus("idle");
      promptReview();
      onEndedRef.current();
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
        if (roomRef.current !== room) return; // never play audio from a cancelled room
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
      if (cancelled()) {
        await room.disconnect().catch(() => {});
        teardownAudio(room);
        return;
      }
      await room.localParticipant.setMicrophoneEnabled(true);
      setMicEnabled(true);
    } catch (err) {
      if (cancelled()) return;
      const msg = err instanceof Error ? err.message : String(err);
      let userMsg = msg;
      if (/permission|notallowed|microphone/i.test(msg)) {
        userMsg = "Microphone access denied. Allow mic in your browser and try again.";
      }
      setErrorMessage(userMsg);
      setStatus("error");
      roomRef.current = null;
    } finally {
      if (!cancelled()) connectingRef.current = false;
    }
  }, [active, addTranscript, agentSlug, contactId, promptReview, teardownAudio]);

  useEffect(() => {
    if (active && status === "idle" && !reviewOpen) {
      connect();
    }
    if (!active && roomRef.current) {
      disconnect();
    }
  }, [active, status, connect, disconnect, reviewOpen]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      attemptRef.current += 1;
      connectingRef.current = false;
      const room = roomRef.current;
      roomRef.current = null;
      teardownAudio(room);
      room?.disconnect().catch(() => {});
    };
  }, [teardownAudio]);

  const toggleMic = async () => {
    const room = roomRef.current;
    if (!room) return;
    const next = !micEnabled;
    await room.localParticipant.setMicrophoneEnabled(next);
    setMicEnabled(next);
  };

  const isActive = status === "connected" || status === "reconnecting";
  const disconnectRef = useRef(disconnect);
  disconnectRef.current = disconnect;

  useEffect(() => {
    if (!isActive) return;
    const startedAt = Date.now();
    let chargedMinutes = 0;
    const rates = ratesRef.current;
    setWalletPaise(readBalancePaise());
    setElapsedSeconds(0);

    const id = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      const balancePaise = readBalancePaise();
      const tick = meterTick({
        elapsedSeconds: elapsed,
        balancePaise,
        chargedMinutes,
        freeMinutes: rates.freeMinutes,
        rupeesPerMinute: rates.rupeesPerMinute,
      });

      if (tick.debitPaise > 0) {
        const next = debitWallet(tick.debitPaise);
        if (next === null) {
          window.clearInterval(id);
          toast.error("Call ended. The wallet could not cover the next minute.");
          void disconnectRef.current();
          return;
        }
        chargedMinutes = tick.paidMinutesDue;
      }

      setElapsedSeconds(elapsed);
      setWalletPaise(readBalancePaise());
      setSecondsRemaining(tick.secondsRemaining);
      setLowBalance(tick.warn);

      if (tick.cut && !payingRef.current) {
        window.clearInterval(id);
        toast.error("Call ended. Add money to keep talking.");
        void disconnectRef.current();
      }
    }, 1000);

    return () => {
      window.clearInterval(id);
    };
  }, [isActive]);

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
            {status === "disconnected" && "Call ended"}
            {status === "error" && "Call failed"}
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            {status === "error"
              ? errorMessage
              : isActive
                ? "Speak naturally — your mic is live and transcripts appear below."
                : "Voice consultation with your AI specialist on MySalahkaar."}
          </p>
          {isActive ? (
            <p className="mt-2 text-sm font-medium text-slate-800">
              {formatClock(elapsedSeconds)} · first {ratesRef.current.freeMinutes} min free, then{" "}
              {formatRupees(ratesRef.current.rupeesPerMinute * 100)}/min · wallet {formatRupees(walletPaise)}
              {secondsRemaining !== null && Number.isFinite(secondsRemaining)
                ? ` · ${formatClock(secondsRemaining)} left`
                : ""}
            </p>
          ) : null}
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

      {reviewOpen ? (
        <CallReviewDialog
          agentSlug={agentSlug}
          agentName={agentName}
          onClose={() => setReviewOpen(false)}
        />
      ) : null}

      {lowBalance && isActive ? (
        <CallLowBalanceDialog
          secondsRemaining={secondsRemaining ?? 0}
          balancePaise={walletPaise}
          rupeesPerMinute={ratesRef.current.rupeesPerMinute}
          onPaid={() => setLowBalance(false)}
          onEnd={() => void disconnect()}
          onPayingChange={(paying) => {
            payingRef.current = paying;
          }}
        />
      ) : null}
    </div>
  );
}
