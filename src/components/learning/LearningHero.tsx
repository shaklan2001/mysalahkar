import { learningSessions } from "@/lib/data/learning";
import { GraduationCap, Users, Clock, Award } from "lucide-react";

export function LearningHero() {
  const upcomingSessions = learningSessions.filter((s) => s.upcoming).length;
  const totalEnrolled = learningSessions.reduce((sum, s) => sum + s.enrolled, 0);
  const avgRating = (
    learningSessions.reduce((sum, s) => sum + s.rating, 0) /
    learningSessions.length
  ).toFixed(1);

  return (
    <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              <GraduationCap className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Professional Learning
          </h1>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Master taxation, corporate law, compliance, and financial management
            with expert-led courses. Live workshops and recorded sessions from
            India's top professionals.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-white/20 rounded-lg">
                <Clock className="h-6 w-6" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{upcomingSessions}</div>
            <div className="text-blue-100 text-sm">Upcoming Sessions</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-white/20 rounded-lg">
                <Users className="h-6 w-6" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{totalEnrolled.toLocaleString()}+</div>
            <div className="text-blue-100 text-sm">Students Enrolled</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-white/20 rounded-lg">
                <Award className="h-6 w-6" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{avgRating}★</div>
            <div className="text-blue-100 text-sm">Average Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}
