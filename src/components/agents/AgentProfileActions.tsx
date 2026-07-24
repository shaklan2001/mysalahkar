"use client";

import { Button } from "@/components/ui/button";
import { useConsult } from "@/components/consult/ConsultProvider";
import { MessageSquare, Phone, Download } from "lucide-react";

interface AgentProfileActionsProps {
  agentSlug: string;
  agentName: string;
}

export function AgentProfileActions({ agentSlug, agentName }: AgentProfileActionsProps) {
  const { openConsult } = useConsult();
  
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi, I want to consult with ${agentName}`;

  const handleDownloadProfile = () => {
    alert("Profile PDF download coming soon!");
  };

  return (
    <div className="space-y-3">
      <Button
        onClick={() => openConsult(agentSlug)}
        className="w-full"
        size="lg"
      >
        <MessageSquare className="h-5 w-5 mr-2" />
        Consult Now
      </Button>

      <Button
        asChild
        variant="outline"
        className="w-full"
        size="lg"
      >
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <Phone className="h-5 w-5 mr-2" />
          WhatsApp
        </a>
      </Button>

      <Button
        onClick={handleDownloadProfile}
        variant="outline"
        className="w-full"
        size="lg"
      >
        <Download className="h-5 w-5 mr-2" />
        Download Profile
      </Button>
    </div>
  );
}
