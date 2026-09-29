"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Copy, ExternalLink, FileLock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LegalConsent } from "@/components/legal/LegalConsent";
import { toast } from "sonner";
import { readClientSession } from "@/lib/client-session";

type ScheduleCallDialogProps = {
  professionalName: string;
  professionalSlug: string;
  serviceName?: string;
  triggerLabel?: string;
  triggerVariant?: "default" | "outline" | "secondary";
  triggerSize?: "default" | "sm" | "lg";
  triggerClassName?: string;
  initialOpen?: boolean;
};

type BookingResult = {
  meetUrl: string;
  calendarUrl: string;
  documentPassword: string | null;
};

export function ScheduleCallDialog({
  professionalName,
  professionalSlug,
  serviceName,
  triggerLabel = "Human Consultation",
  triggerVariant = "default",
  triggerSize = "sm",
  triggerClassName,
  initialOpen = false,
}: ScheduleCallDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (initialOpen && readClientSession()) setOpen(true);
  }, [initialOpen]);
  const [submitting, setSubmitting] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [documentName, setDocumentName] = useState("");
  const [booking, setBooking] = useState<BookingResult | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredTime: "",
    note: "",
  });

  function reset() {
    setForm({ name: "", email: "", phone: "", preferredTime: "", note: "" });
    setPrivacyConsent(false);
    setDocumentName("");
    setBooking(null);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!privacyConsent) {
      toast.error("Please accept the Terms and DPDP consent to continue.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          agentSlug: professionalSlug,
          type: "booking",
          privacyConsent: true,
          hasDocument: Boolean(documentName),
          documentName: documentName || undefined,
          note: [serviceName && `Service: ${serviceName}`, form.note]
            .filter(Boolean)
            .join("\n"),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed");
      }
      setBooking({
        meetUrl: data.meetUrl,
        calendarUrl: data.calendarUrl,
        documentPassword: data.documentPassword ?? null,
      });
    } catch {
      toast.error("Could not submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Button
        type="button"
        variant={triggerVariant}
        size={triggerSize}
        className={triggerClassName}
        onClick={() => {
          if (!readClientSession()) {
            const next = `/client/dashboard/find?book=${encodeURIComponent(professionalSlug)}`;
            router.push(`/client/login?next=${encodeURIComponent(next)}`);
            return;
          }
          setOpen(true);
        }}
      >
        <Calendar className="mr-2 h-4 w-4" />
        {triggerLabel}
      </Button>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/40"
            aria-label="Close"
            onClick={() => {
              setOpen(false);
              reset();
            }}
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-white p-6 shadow-xl">
            {booking ? (
              <div className="space-y-4">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Call booked
                </h3>
                <p className="text-sm text-muted-foreground">
                  Google Meet link is ready. Open Google Calendar to add the invite
                  for you and the consultant. Email is not sent in this demo.
                </p>
                <a
                  href={booking.meetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-lg border border-border bg-[#f8fafb] px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
                >
                  {booking.meetUrl.replace("https://", "")}
                  <ExternalLink className="h-4 w-4 shrink-0" />
                </a>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      void navigator.clipboard.writeText(booking.meetUrl);
                      toast.success("Meet link copied");
                    }}
                  >
                    <Copy className="h-4 w-4" />
                    Copy Meet
                  </Button>
                  <Button asChild className="flex-1">
                    <a href={booking.calendarUrl} target="_blank" rel="noreferrer">
                      Add to Calendar
                    </a>
                  </Button>
                </div>
                {booking.documentPassword ? (
                  <p className="flex items-start gap-2 rounded-lg bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
                    <FileLock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    Document share password:{" "}
                    <span className="font-mono font-semibold text-foreground">
                      {booking.documentPassword}
                    </span>
                  </p>
                ) : null}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setOpen(false);
                    reset();
                  }}
                >
                  Done
                </Button>
              </div>
            ) : (
              <>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Human Consultation
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {serviceName
                    ? `Schedule a Google Meet for ${serviceName}.`
                    : `Schedule a Google Meet with ${professionalName}.`}{" "}
                  A calendar invite is generated for both sides.
                </p>
                <form onSubmit={submit} className="mt-5 space-y-3">
                  <div>
                    <Label htmlFor="sch-name">Your name</Label>
                    <Input
                      id="sch-name"
                      className="mt-1.5"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="sch-email">Email</Label>
                      <Input
                        id="sch-email"
                        type="email"
                        className="mt-1.5"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, email: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="sch-phone">Phone</Label>
                      <Input
                        id="sch-phone"
                        className="mt-1.5"
                        required
                        value={form.phone}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, phone: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="sch-time">Preferred time</Label>
                    <Input
                      id="sch-time"
                      type="datetime-local"
                      className="mt-1.5"
                      value={form.preferredTime}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, preferredTime: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="sch-note">What do you need help with?</Label>
                    <Textarea
                      id="sch-note"
                      className="mt-1.5"
                      rows={3}
                      value={form.note}
                      onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sch-doc">Document (optional, password-protected)</Label>
                    <Input
                      id="sch-doc"
                      type="file"
                      className="mt-1.5"
                      onChange={(e) =>
                        setDocumentName(e.target.files?.[0]?.name ?? "")
                      }
                    />
                  </div>
                  <LegalConsent
                    id="sch-dpdp"
                    checked={privacyConsent}
                    onChange={setPrivacyConsent}
                  />
                  <div className="flex gap-2 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setOpen(false);
                        reset();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={submitting || !privacyConsent}
                    >
                      {submitting ? "Booking…" : "Book Meet"}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
