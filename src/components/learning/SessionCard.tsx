"use client";

import { LearningSession } from "@/lib/data/learning";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, Calendar, PlayCircle, Video } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface SessionCardProps {
  session: LearningSession;
}

export function SessionCard({ session }: SessionCardProps) {
  const handleRegister = () => {
    toast.success(
      session.upcoming
        ? `Registered for ${session.title}!`
        : `Access granted to ${session.title}!`
    );
  };

  const handleSecondary = () => {
    toast.info("Opening details...");
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getLevelColor = (level: string) => {
    if (level === "Beginner") return "bg-green-100 text-green-700";
    if (level === "Intermediate") return "bg-blue-100 text-blue-700";
    return "bg-purple-100 text-purple-700";
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="md:flex">
        {/* Image */}
        <div className="md:w-80 h-48 md:h-auto relative bg-slate-200">
          <Image
            src={session.image}
            alt={session.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <CardContent className="p-6 space-y-4">
            {/* Category & Level Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary">{session.category}</Badge>
              <Badge className={getLevelColor(session.level)}>
                {session.level}
              </Badge>
              {!session.upcoming && (
                <Badge variant="outline" className="gap-1">
                  <Video className="h-3 w-3" />
                  Recorded
                </Badge>
              )}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 leading-tight">
              {session.title}
            </h3>

            {/* Instructor */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                {session.instructor
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <div className="text-sm font-semibold">{session.instructor}</div>
                <div className="text-xs text-muted-foreground">
                  {session.instructorType}
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold">{session.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{session.enrolled.toLocaleString()} enrolled</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{session.duration}</span>
              </div>
              {session.date && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(session.date)}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {session.description}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <Button onClick={handleRegister} size="sm">
                {session.upcoming ? (
                  <>
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Register Now
                  </>
                ) : (
                  <>
                    <Video className="h-4 w-4 mr-2" />
                    Watch Now
                  </>
                )}
              </Button>
              <Button onClick={handleSecondary} variant="outline" size="sm">
                View Details
              </Button>
              <div className="ml-auto font-bold text-lg text-blue-600">
                ₹{session.price.toLocaleString()}
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
