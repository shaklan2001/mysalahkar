"use client";

import { useState } from "react";
import { learningSessions } from "@/lib/data/learning";
import { SessionCard } from "./SessionCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function LearningContent() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingSessions = learningSessions.filter((s) => s.upcoming);
  const recordedSessions = learningSessions.filter((s) => !s.upcoming);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="w-full justify-start mb-6">
        <TabsTrigger value="upcoming">
          Upcoming Sessions ({upcomingSessions.length})
        </TabsTrigger>
        <TabsTrigger value="recorded">
          Recorded Sessions ({recordedSessions.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="upcoming" className="space-y-6">
        {upcomingSessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </TabsContent>

      <TabsContent value="recorded" className="space-y-6">
        {recordedSessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </TabsContent>
    </Tabs>
  );
}
