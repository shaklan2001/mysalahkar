import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";

export function CommunityPromo() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="group overflow-hidden bg-gradient-to-br from-purple-600 to-indigo-700 p-8 text-white transition-all hover:shadow-2xl md:p-10">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <Users className="h-7 w-7" />
            </div>
            
            <h3 className="mb-4 text-2xl font-extrabold md:text-3xl">
              Join the Community
            </h3>
            
            <p className="mb-6 leading-relaxed text-white/90">
              Connect with 2,450+ professionals, share insights, ask questions, and grow together. 
              Network with peers and learn from shared experiences.
            </p>
            
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="group h-12 gap-2 bg-white text-base font-semibold text-purple-700 hover:bg-slate-50"
            >
              <Link href="/community">
                Explore Community
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </Card>
          
          <Card className="group overflow-hidden bg-gradient-to-br from-blue-600 to-cyan-700 p-8 text-white transition-all hover:shadow-2xl md:p-10">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <GraduationCap className="h-7 w-7" />
            </div>
            
            <h3 className="mb-4 text-2xl font-extrabold md:text-3xl">
              Learn & Upskill
            </h3>
            
            <p className="mb-6 leading-relaxed text-white/90">
              Access 50+ courses on GST, corporate law, IP, tax planning, and more. 
              Self-paced learning with expert-curated content.
            </p>
            
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="group h-12 gap-2 bg-white text-base font-semibold text-blue-700 hover:bg-slate-50"
            >
              <Link href="/learning">
                Browse Courses
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}
