import { notFound } from "next/navigation";
import { agents, getAgent } from "@/lib/data/agents";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { formatINR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Star,
  MapPin,
  Briefcase,
  Clock,
  CheckCircle,
  MessageSquare,
  Phone,
  Download,
  Shield,
} from "lucide-react";
import { AgentProfileActions } from "@/components/agents/AgentProfileActions";

interface AgentProfilePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return agents.map((agent) => ({
    slug: agent.slug,
  }));
}

export async function generateMetadata({
  params,
}: AgentProfilePageProps): Promise<Metadata> {
  const { slug } = await params;
  const agent = getAgent(slug);

  if (!agent) {
    return {
      title: "Agent Not Found",
    };
  }

  return {
    title: `${agent.name} - ${agent.typeLabel} | Salahkar`,
    description: agent.bio,
  };
}

export default async function AgentProfilePage({ params }: AgentProfilePageProps) {
  const { slug } = await params;
  const agent = getAgent(slug);

  if (!agent) {
    notFound();
  }

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi, I want to consult with ${agent.name}`;

  const synthesizedReviews = [
    {
      name: "Anonymous Client",
      rating: 5,
      text: `${agent.name}'s expertise in ${agent.specializations[0]} was exactly what I needed. Professional, thorough, and delivered results beyond expectations.`,
    },
    {
      name: "Business Owner",
      rating: agent.rating >= 4.8 ? 5 : 4,
      text: `Highly recommend ${agent.name}. The consultation was clear, actionable, and helped solve our complex ${agent.type} challenges efficiently.`,
    },
    {
      name: "Satisfied Customer",
      rating: agent.rating >= 4.7 ? 5 : 4,
      text: `${agent.name} provided exceptional guidance. ${agent.personality} Made the entire process smooth and stress-free.`,
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/agents"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Consultants
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row gap-6 mb-6">
                  <div className="flex-shrink-0">
                    <div className="relative w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-primary ring-offset-4">
                      <Image
                        src={agent.image}
                        alt={agent.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{agent.name}</h1>
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <Badge variant="secondary" className="text-sm">
                          {agent.typeLabel}
                        </Badge>
                        {agent.liveTag && (
                          <Badge variant="live" className="text-sm">
                            {agent.liveTag}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-foreground text-lg">
                          {agent.rating}
                        </span>
                        <span className="text-muted-foreground">
                          ({agent.reviewCount} reviews)
                        </span>
                      </div>
                      <Separator orientation="vertical" className="h-4" />
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{agent.location}</span>
                      </div>
                      <Separator orientation="vertical" className="h-4" />
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        <span>{agent.experience} years experience</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground font-medium">
                        {agent.availability}
                      </span>
                      <span className="text-muted-foreground">
                        • Response time: 2-4 hours
                      </span>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      {agent.bio}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-sm font-semibold mb-3">
                    Available Channels
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {agent.channels.map((channel) => (
                      <Badge key={channel} variant="outline" className="text-sm">
                        {channel === "whatsapp" && (
                          <>
                            <MessageSquare className="h-3 w-3 mr-1" />
                            WhatsApp
                          </>
                        )}
                        {channel === "chat" && (
                          <>
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Chat
                          </>
                        )}
                        {channel === "call" && (
                          <>
                            <Phone className="h-3 w-3 mr-1" />
                            Call
                          </>
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Services Offered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {agent.services.map((service, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Areas of Specialization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {agent.specializations.map((spec, idx) => (
                    <Badge
                      key={idx}
                      variant="success"
                      className="text-sm px-4 py-2"
                    >
                      {spec}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About {agent.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Key Highlights</h4>
                  <div className="space-y-4">
                    {agent.capabilities.map((capability, idx) => (
                      <div key={idx}>
                        <h5 className="font-medium text-sm mb-1">
                          {capability.title}
                        </h5>
                        <p className="text-sm text-muted-foreground">
                          {capability.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {agent.kpis && agent.kpis.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Performance Metrics</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {agent.kpis.map((kpi, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-2xl font-bold text-primary">
                            {kpi.value}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {kpi.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {agent.workflows && agent.workflows.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">How It Works</h4>
                    <div className="space-y-3">
                      {agent.workflows.map((workflow) => (
                        <div key={workflow.num} className="flex gap-3">
                          <div
                            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                            style={{ backgroundColor: agent.accent }}
                          >
                            {workflow.num}
                          </div>
                          <div>
                            <h5 className="font-medium text-sm">
                              {workflow.title}
                            </h5>
                            <p className="text-sm text-muted-foreground">
                              {workflow.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {agent.sampleChat && agent.sampleChat.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Sample Conversation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {agent.sampleChat.map((message, idx) => (
                      <div
                        key={idx}
                        className={`flex gap-3 ${
                          message.role === "agent" ? "flex-row" : "flex-row-reverse"
                        }`}
                      >
                        <div
                          className={`flex-1 rounded-lg p-4 ${
                            message.role === "agent"
                              ? "bg-secondary"
                              : "bg-primary/10"
                          }`}
                        >
                          <p className="text-xs font-semibold mb-1 text-muted-foreground">
                            {message.role === "agent" ? agent.name : "Client"}
                          </p>
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Client Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {synthesizedReviews.map((review, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{review.name}</span>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.text}</p>
                      {idx < synthesizedReviews.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-6">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">
                    Consultation Fee
                  </div>
                  <div className="text-3xl font-bold text-primary">
                    {formatINR(agent.consultationFee)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    per consultation
                  </div>
                </div>

                <AgentProfileActions agentSlug={agent.slug} agentName={agent.name} />

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Why Book {agent.name}?</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span>{agent.experience}+ years of proven expertise</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span>Available 24/7 via WhatsApp, Chat & Call</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span>{agent.rating}/5 rating from {agent.reviewCount}+ clients</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span>Fast response time (2-4 hours)</span>
                    </li>
                  </ul>
                </div>

                {agent.escalationNote && (
                  <>
                    <Separator />
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-blue-900">
                          {agent.escalationNote}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
