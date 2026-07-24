import { Briefcase, TrendingUp, Users } from "lucide-react";

interface ServicesHeroProps {
  categoryCount: number;
  totalServices: number;
  aiExperts: number;
}

export function ServicesHero({
  categoryCount,
  totalServices,
  aiExperts,
}: ServicesHeroProps) {
  return (
    <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Professional Services
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Comprehensive professional services across taxation, corporate law,
            legal, intellectual property, FEMA, real estate, wealth management,
            insurance, and lending. Get expert guidance from specialized AI
            consultants.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-white/20 rounded-lg">
                <Briefcase className="h-8 w-8" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{categoryCount}</div>
            <div className="text-blue-100 text-sm">Service Categories</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-white/20 rounded-lg">
                <TrendingUp className="h-8 w-8" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{totalServices}+</div>
            <div className="text-blue-100 text-sm">Professional Services</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-white/20 rounded-lg">
                <Users className="h-8 w-8" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{aiExperts}</div>
            <div className="text-blue-100 text-sm">AI Expert Consultants</div>
          </div>
        </div>
      </div>
    </div>
  );
}
