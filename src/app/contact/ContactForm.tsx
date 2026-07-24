"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredTime: "",
    note: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type: "booking",
        }),
      });

      const data = await response.json();

      if (data.ok) {
        toast.success("Request received! We'll contact you within 24 hours.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          preferredTime: "",
          note: "",
        });
      } else {
        toast.error("Something went wrong. Please try again or call us directly.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to submit. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border bg-white p-8 shadow-sm">
      <div>
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Your full name"
          className="mt-1.5"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="you@example.com"
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91 98765 43210"
            className="mt-1.5"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="preferredTime">Preferred Time (optional)</Label>
        <Input
          id="preferredTime"
          type="text"
          value={formData.preferredTime}
          onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
          placeholder="e.g., Tomorrow 3 PM, or Weekday mornings"
          className="mt-1.5"
        />
      </div>

      <div>
        <Label htmlFor="note">What can we help you with? (optional)</Label>
        <Textarea
          id="note"
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          placeholder="Brief description of your query or concern..."
          rows={4}
          className="mt-1.5"
        />
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Submitting..." : "Request Consultation"}
      </Button>

      <p className="text-center text-sm text-slate-500">
        By submitting, you agree to our{" "}
        <a href="/privacy" className="underline hover:text-slate-700">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="/terms" className="underline hover:text-slate-700">
          Terms
        </a>
        .
      </p>
    </form>
  );
}
