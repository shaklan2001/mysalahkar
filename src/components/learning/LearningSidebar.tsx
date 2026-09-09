import {
  learningCategories,
  popularInstructors,
  learningPath,
} from "@/lib/data/learning";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Award,
  TrendingUp,
  Users,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export function LearningSidebar() {
  return (
    <div className="space-y-6">
      {/* Browse by Category */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            Browse by Category
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {learningCategories.map((category, idx) => (
            <button
              key={idx}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors text-sm"
            >
              <span className="font-medium">{category.name}</span>
              <Badge variant="outline" className="text-xs">
                {category.count}
              </Badge>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Popular Instructors */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            Popular Instructors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {popularInstructors.map((instructor, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                  {instructor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold">{instructor.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {instructor.courses} courses · {instructor.rating}★
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Learning Path */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Learning Path
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {learningPath.map((path, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-4 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <span className="text-green-700 font-bold text-sm">
                    {idx + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <Badge variant="outline" className="text-xs mb-2">
                    {path.level}
                  </Badge>
                  <h4 className="font-semibold text-sm mb-1">{path.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    {path.description}
                  </p>
                  <div className="text-xs text-blue-600 font-medium">
                    {path.courses} courses
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Certificates Promo */}
      <Card className="border-border bg-[#001450] text-white">
        <CardContent className="space-y-3 p-6">
          <div className="flex justify-center">
            <div className="rounded-xl bg-white/10 p-3">
              <Award className="h-8 w-8" />
            </div>
          </div>
          <h3 className="text-center font-display font-semibold tracking-tight">
            Earn Professional Certificates
          </h3>
          <p className="text-center text-xs leading-relaxed text-slate-400">
            Complete courses and earn industry-recognized certificates to boost
            your career and showcase your expertise.
          </p>
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Verified by industry experts</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Shareable on LinkedIn</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>CPE credits eligible</span>
            </div>
          </div>
          <Button
            variant="secondary"
            className="w-full bg-white text-blue-700 hover:bg-blue-50"
            size="sm"
          >
            Learn More
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
