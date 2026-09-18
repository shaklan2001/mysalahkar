"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Paperclip, Send, Tag } from "lucide-react";
import { toast } from "sonner";

export function ComposeBox() {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const handlePost = () => {
    if (!content.trim()) {
      toast.error("Please write something to post");
      return;
    }
    toast.success("Post published successfully!");
    setContent("");
    setTags("");
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <h3 className="font-semibold">Share with the community</h3>
        <p className="text-xs text-muted-foreground">
          Open to professionals and clients. Post views, questions, and updates.
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <Textarea
          placeholder="Share insights, ask questions, or discuss recent updates..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="resize-none"
        />
        
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Add tags (e.g., GST, SEBI, Compliance)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="flex-1"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button variant="ghost" size="sm">
            <Paperclip className="h-4 w-4 mr-2" />
            Attach File
          </Button>
          <Button onClick={handlePost} size="sm">
            <Send className="h-4 w-4 mr-2" />
            Post
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
