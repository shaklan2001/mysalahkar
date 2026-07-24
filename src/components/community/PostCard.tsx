"use client";

import { useState } from "react";
import { CommunityPost } from "@/lib/data/community";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";

interface PostCardProps {
  post: CommunityPost;
}

export function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const getInitial = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
            {getInitial(post.authorName)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-sm">{post.authorName}</h4>
              <Badge variant="secondary" className="text-xs">
                {post.authorType}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {formatDate(post.date)}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div>
          <h3 className="font-bold text-lg mb-2">{post.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {post.content}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {post.tags.map((tag, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={isLiked ? "text-red-500" : ""}
          >
            <Heart
              className={`h-4 w-4 mr-1.5 ${isLiked ? "fill-current" : ""}`}
            />
            {likes}
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="h-4 w-4 mr-1.5" />
            {post.comments}
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4 mr-1.5" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
