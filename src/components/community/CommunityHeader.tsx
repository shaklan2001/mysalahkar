import { Users } from "lucide-react";

export function CommunityHeader() {
  return (
    <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <Users className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Professional Community</h1>
            <p className="text-blue-100 mt-1">
              Connect, share, and learn from India's top professionals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
