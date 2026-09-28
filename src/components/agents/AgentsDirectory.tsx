"use client";

import { useState, useMemo, useEffect } from "react";
import { AgentType, SPECIALIZATIONS, aiConsultantName } from "@/lib/data/agents";
import {
  canChatOrCall,
  canScheduleHuman,
  isAiSalahkarListing,
  listingToAgentShape,
  type ListingKind,
  type MarketplaceListing,
} from "@/lib/data/marketplace";
import { ConsultantPhoto } from "@/components/agents/ConsultantPhoto";
import { listApprovedApplications } from "@/lib/applications-store";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatINR } from "@/lib/utils";
import { getCatalogServicesForAgentType } from "@/lib/data/services";
import { useConsult } from "@/components/consult/ConsultProvider";
import { ScheduleCallDialog } from "@/components/agents/ScheduleCallDialog";
import Link from "next/link";
import {
  Search,
  Star,
  MapPin,
  Briefcase,
  Clock,
  X,
  MessageSquare,
  Phone,
} from "lucide-react";

interface AgentsDirectoryProps {
  agents: MarketplaceListing[];
  searchParams?: {
    type?: string;
    kind?: string;
  };
}

const AGENT_TYPES: { value: AgentType; label: string }[] = [
  { value: "CA", label: "Chartered Accountant" },
  { value: "CS", label: "Company Secretary" },
  { value: "Lawyer", label: "Lawyer" },
  { value: "Wealth Management", label: "Wealth Management" },
  { value: "Real Estate", label: "Real Estate" },
  { value: "IRP", label: "Insolvency & Restructuring" },
  { value: "FEMA", label: "FEMA Consultant" },
  { value: "Insurance", label: "Insurance Advisor" },
  { value: "Lending", label: "Lending Advisor" },
];

function kindLabel(kind: ListingKind) {
  if (kind === "human") return "Human professional";
  if (kind === "both") return "AI + Human";
  return "AI Salahkar";
}

function matchesSearch(agent: MarketplaceListing, search: string) {
  const q = search.trim().toLowerCase();
  if (!q) return true;
  if (agent.name.toLowerCase().includes(q)) return true;
  if (agent.type.toLowerCase().includes(q)) return true;
  if (agent.typeLabel.toLowerCase().includes(q)) return true;
  if (agent.specializations.some((s) => s.toLowerCase().includes(q))) return true;
  const typeMeta = AGENT_TYPES.find((t) => t.value === agent.type);
  return Boolean(
    typeMeta &&
      (typeMeta.value.toLowerCase() === q ||
        typeMeta.label.toLowerCase().includes(q)),
  );
}

export function AgentsDirectory({ agents, searchParams }: AgentsDirectoryProps) {
  const { openConsult } = useConsult();
  const [extraListings, setExtraListings] = useState<MarketplaceListing[]>([]);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<AgentType | "all">(
    (searchParams?.type as AgentType) || "all",
  );
  const [selectedKind, setSelectedKind] = useState<ListingKind | "all">(
    (searchParams?.kind as ListingKind) || "all",
  );
  const [selectedSpecialization, setSelectedSpecialization] = useState("all");
  const [minRating, setMinRating] = useState([0]);
  const [minExperience, setMinExperience] = useState([0]);

  useEffect(() => {
    const approved = listApprovedApplications().map(listingToAgentShape);
    const existing = new Set(agents.map((a) => a.slug));
    setExtraListings(approved.filter((a) => !existing.has(a.slug)));
  }, [agents]);

  const allListings = useMemo(
    () => [...agents, ...extraListings],
    [agents, extraListings],
  );

  const availableSpecializations = useMemo(() => {
    if (selectedType === "all") return [];
    return SPECIALIZATIONS[selectedType] || [];
  }, [selectedType]);

  const filteredAgents = useMemo(() => {
    return allListings.filter((agent) => {
      if (search && !matchesSearch(agent, search)) return false;
      if (selectedType !== "all" && agent.type !== selectedType) return false;
      if (selectedKind !== "all") {
        const kind = agent.listingKind;
        const matches =
          kind === selectedKind ||
          (kind === "both" && (selectedKind === "ai" || selectedKind === "human"));
        if (!matches) return false;
      }
      if (
        selectedSpecialization !== "all" &&
        !agent.specializations.includes(selectedSpecialization)
      ) {
        return false;
      }
      if (agent.rating < minRating[0]) return false;
      if (agent.experience < minExperience[0]) return false;
      return true;
    });
  }, [
    allListings,
    search,
    selectedType,
    selectedKind,
    selectedSpecialization,
    minRating,
    minExperience,
  ]);

  const hasActiveFilters =
    search !== "" ||
    selectedType !== "all" ||
    selectedKind !== "all" ||
    selectedSpecialization !== "all" ||
    minRating[0] > 0 ||
    minExperience[0] > 0;

  function clearFilters() {
    setSearch("");
    setSelectedType("all");
    setSelectedKind("all");
    setSelectedSpecialization("all");
    setMinRating([0]);
    setMinExperience([0]);
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
      <aside className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardContent className="space-y-6 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Filters</h3>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                >
                  <X className="mr-1 h-3 w-3" />
                  Clear
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Name or expertise..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Listing type
              </label>
              <Select
                value={selectedKind}
                onValueChange={(value) =>
                  setSelectedKind(value as ListingKind | "all")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="ai">AI Salahkars</SelectItem>
                  <SelectItem value="human">Human professionals</SelectItem>
                  <SelectItem value="both">AI + Human</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Professional Type
              </label>
              <Select
                value={selectedType}
                onValueChange={(value) => {
                  setSelectedType(value as AgentType | "all");
                  setSelectedSpecialization("all");
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {AGENT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedType !== "all" && availableSpecializations.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Area of Specialization
                </label>
                <Select
                  value={selectedSpecialization}
                  onValueChange={setSelectedSpecialization}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Specializations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specializations</SelectItem>
                    {availableSpecializations.map((spec) => (
                      <SelectItem key={spec} value={spec}>
                        {spec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-foreground">
                  Min Rating
                </label>
                <span className="text-sm text-muted-foreground">
                  {minRating[0].toFixed(1)}+
                </span>
              </div>
              <Slider
                value={minRating}
                onValueChange={setMinRating}
                max={5}
                step={0.5}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-foreground">
                  Min Experience
                </label>
                <span className="text-sm text-muted-foreground">
                  {minExperience[0]}+ yrs
                </span>
              </div>
              <Slider
                value={minExperience}
                onValueChange={setMinExperience}
                max={25}
                step={1}
              />
            </div>
          </CardContent>
        </Card>
      </aside>

      <div className="lg:col-span-3">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filteredAgents.length}
            </span>{" "}
            professional{filteredAgents.length !== 1 ? "s" : ""}
          </p>
        </div>

        {filteredAgents.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="space-y-3">
              <p className="text-lg font-semibold">No professionals found</p>
              <p className="mx-auto max-w-sm text-sm text-muted-foreground">
                Try adjusting your filters to find the right AI Salahkar or human
                consultant.
              </p>
              {hasActiveFilters && (
                <Button onClick={clearFilters} variant="outline" className="mt-4">
                  Clear all filters
                </Button>
              )}
            </div>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredAgents.map((agent) => {
              const showAi = canChatOrCall(agent) && Boolean(agent.liveDemo);
              const showSchedule = canScheduleHuman(agent);
              const isAi = isAiSalahkarListing(agent);
              const displayName = isAi ? aiConsultantName(agent) : agent.name;
              return (
                <Card
                  key={agent.slug}
                  className="overflow-hidden transition-shadow hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-6 sm:flex-row">
                      <ConsultantPhoto
                        src={agent.image}
                        alt={displayName}
                        showAiBadge={isAi}
                        rounded="xl"
                        className="h-24 w-24"
                        sizes="96px"
                      />

                      <div className="min-w-0 flex-1 space-y-4">
                        <div>
                          <div className="mb-2 flex items-start justify-between gap-4">
                            <div>
                              <Link
                                href={`/agents/${agent.slug}`}
                                className="text-xl font-bold transition-colors hover:text-primary"
                              >
                                {displayName}
                              </Link>
                              <Badge variant="secondary" className="ml-2">
                                {agent.typeLabel}
                              </Badge>
                              <Badge variant="outline" className="ml-2">
                                {kindLabel(agent.listingKind)}
                              </Badge>
                            </div>
                            <div className="flex-shrink-0 text-right">
                              <div className="text-2xl font-bold text-primary">
                                {formatINR(agent.consultationFee)}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                per 30 minutes
                              </div>
                            </div>
                          </div>

                          <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold text-foreground">
                                {agent.rating}
                              </span>
                              <span>({agent.reviewCount} reviews)</span>
                            </div>
                            {isAi ? null : (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{agent.location}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              <span>{agent.experience} years exp.</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{agent.availability}</span>
                            </div>
                          </div>

                          <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                            {agent.bio}
                          </p>

                          <div className="space-y-2">
                            <div>
                              <p className="mb-1 text-xs font-semibold text-foreground">
                                Area of Specialization
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {agent.specializations.map((spec) => (
                                  <Badge
                                    key={spec}
                                    variant="success"
                                    className="text-xs"
                                  >
                                    {spec}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <p className="mb-1 text-xs font-semibold text-foreground">
                                Key Services
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {(() => {
                                  const services = getCatalogServicesForAgentType(
                                    agent.type,
                                  );
                                  return (
                                    <>
                                      {services.slice(0, 3).map((service) => (
                                        <Badge
                                          key={service}
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          {service}
                                        </Badge>
                                      ))}
                                      {services.length > 3 ? (
                                        <Badge variant="outline" className="text-xs">
                                          +{services.length - 3} more
                                        </Badge>
                                      ) : null}
                                    </>
                                  );
                                })()}
                              </div>
                            </div>

                            {agent.liveTag && (
                              <Badge variant="live" className="text-xs">
                                {agent.liveTag}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3 pt-2">
                          <Button asChild variant="outline" size="sm">
                            <Link href={`/agents/${agent.slug}`}>View Profile</Link>
                          </Button>
                          {showAi && (
                            <>
                              <Button
                                onClick={() => openConsult(agent.slug, "chat")}
                                size="sm"
                              >
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Chat
                              </Button>
                              <Button
                                onClick={() => openConsult(agent.slug, "call")}
                                variant="outline"
                                size="sm"
                              >
                                <Phone className="mr-2 h-4 w-4" />
                                Call
                              </Button>
                            </>
                          )}
                          {showSchedule && (
                            <ScheduleCallDialog
                              professionalName={agent.name}
                              professionalSlug={agent.slug}
                              triggerVariant={showAi ? "outline" : "default"}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
