"use client";

import { Button } from "@/components/ui/button";
import { useConsult } from "@/components/consult/ConsultProvider";
import { ScheduleCallDialog } from "@/components/agents/ScheduleCallDialog";
import { aiConsultantName } from "@/lib/data/agents";
import {
  canChatOrCall,
  canScheduleHuman,
  type MarketplaceListing,
} from "@/lib/data/marketplace";
import { MessageSquare, Phone, Download } from "lucide-react";

interface AgentProfileActionsProps {
  listing: MarketplaceListing;
}

export function AgentProfileActions({ listing }: AgentProfileActionsProps) {
  const { openConsult } = useConsult();
  const showAi = canChatOrCall(listing) && Boolean(listing.liveDemo);
  const showSchedule = canScheduleHuman(listing);
  const isBoth = listing.listingKind === "both";
  const aiName = aiConsultantName(listing);

  const handleDownloadProfile = () => {
    alert("Profile PDF download coming soon!");
  };

  return (
    <div className="space-y-3">
      {showAi && (
        <>
          <Button
            onClick={() => openConsult(listing.slug, "chat")}
            className="w-full"
            size="lg"
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            {isBoth ? `Chat with ${aiName}` : "Start Chat"}
          </Button>
          <Button
            onClick={() => openConsult(listing.slug, "call")}
            variant="outline"
            className="w-full"
            size="lg"
          >
            <Phone className="mr-2 h-5 w-5" />
            {isBoth ? `Call ${aiName}` : "Start Call"}
          </Button>
        </>
      )}

      {showSchedule && (
        <ScheduleCallDialog
          professionalName={listing.name}
          professionalSlug={listing.slug}
          triggerLabel={isBoth ? `Book ${listing.name}` : "Human Consultation"}
          triggerVariant={showAi ? "outline" : "default"}
          triggerSize="lg"
          triggerClassName="w-full"
        />
      )}

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
