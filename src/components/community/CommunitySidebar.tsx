import {
  communityStats,
  trendingTopics,
  topContributors,
  communityGuidelines,
} from "@/lib/data/community";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Award, Shield, Users, MessageCircle } from "lucide-react";

export function CommunitySidebar() {
  return (
    <div className="space-y-6">
      {/* Community Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            Community stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Members</span>
            <span className="font-bold">{communityStats.members.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Posts</span>
            <span className="font-bold">{communityStats.posts.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Active Today</span>
            <Badge variant="success">{communityStats.activeToday}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-600" />
            Trending Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {trendingTopics.map((topic, idx) => (
              <button
                key={idx}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors text-sm"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-3.5 w-3.5 text-blue-600" />
                  <span>{topic}</span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Contributors */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-600" />
            Top Contributors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topContributors.map((contributor, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  {contributor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    {contributor.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {contributor.type}
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {contributor.posts} posts
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Community Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Community Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {communityGuidelines.map((guideline, idx) => (
            <div key={idx}>
              <h4 className="text-sm font-semibold mb-1">{guideline.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {guideline.description}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
