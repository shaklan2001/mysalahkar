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

  const handleDownloadProfile = () => {
    alert("Profile PDF download coming soon!");
  };

  return (
    <div className="space-y-3">
      <Button
        onClick={() => openConsult(agentSlug, "chat")}
        className="w-full"
        size="lg"
      >
        <MessageSquare className="mr-2 h-5 w-5" />
        Start Chat
      </Button>

      <Button
        onClick={() => openConsult(agentSlug, "call")}
        variant="outline"
        className="w-full"
        size="lg"
      >
        <Phone className="mr-2 h-5 w-5" />
        Start Call
      </Button>

      <Button
        onClick={handleDownloadProfile}
        variant="outline"
        className="w-full"
        size="lg"
      >
        <Download className="mr-2 h-5 w-5" />
        Download Profile
      </Button>
    </div>
  );
}
