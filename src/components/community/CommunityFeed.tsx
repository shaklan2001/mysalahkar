"use client";

import { useState } from "react";
import { communityPosts } from "@/lib/data/community";
import { ComposeBox } from "./ComposeBox";
import { PostCard } from "./PostCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function CommunityFeed() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredPosts = communityPosts.filter((post) => {
    if (activeTab === "all") return true;
    if (activeTab === "taxation") return post.tags.some(tag => 
      ["GST", "Taxation", "Budget"].includes(tag)
    );
    if (activeTab === "legal") return post.tags.some(tag =>
      ["Legal", "Corporate Law", "Supreme Court", "Employment"].includes(tag)
    );
    if (activeTab === "compliance") return post.tags.some(tag =>
      ["Compliance", "SEBI", "Listing", "RERA", "ROC Compliance"].includes(tag)
    );
    return true;
  });

  return (
    <div className="space-y-6">
      <ComposeBox />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="all">All Posts</TabsTrigger>
          <TabsTrigger value="taxation">Taxation</TabsTrigger>
          <TabsTrigger value="legal">Legal</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
