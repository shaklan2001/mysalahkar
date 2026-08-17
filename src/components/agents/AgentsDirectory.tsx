"use client";

import { useState, useMemo } from "react";
import { Agent, AgentType, SPECIALIZATIONS } from "@/lib/data/agents";
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
import Link from "next/link";
import Image from "next/image";
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
  agents: Agent[];
  searchParams?: {
    type?: string;
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

export function AgentsDirectory({ agents, searchParams }: AgentsDirectoryProps) {
  const { openConsult } = useConsult();
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<AgentType | "all">(
    (searchParams?.type as AgentType) || "all"
  );
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("all");
  const [minRating, setMinRating] = useState([0]);
  const [minExperience, setMinExperience] = useState([0]);

  const availableSpecializations = useMemo(() => {
    if (selectedType === "all") return [];
    return SPECIALIZATIONS[selectedType] || [];
  }, [selectedType]);

  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      if (search && !agent.name.toLowerCase().includes(search.toLowerCase()) &&
          !agent.specializations.some(s => s.toLowerCase().includes(search.toLowerCase())) &&
          !agent.typeLabel.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }

      if (selectedType !== "all" && agent.type !== selectedType) {
        return false;
      }

      if (selectedSpecialization !== "all" && 
          !agent.specializations.includes(selectedSpecialization)) {
        return false;
      }

      if (agent.rating < minRating[0]) {
        return false;
      }

      if (agent.experience < minExperience[0]) {
        return false;
      }

      return true;
    });
  }, [agents, search, selectedType, selectedSpecialization, minRating, minExperience]);

  const clearFilters = () => {
    setSearch("");
    setSelectedType("all");
    setSelectedSpecialization("all");
    setMinRating([0]);
    setMinExperience([0]);
  };

  const hasActiveFilters =
    search !== "" ||
    selectedType !== "all" ||
    selectedSpecialization !== "all" ||
    minRating[0] > 0 ||
    minExperience[0] > 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <aside className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Filters</h3>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
                <span className="text-sm font-medium text-muted-foreground">
                  {minRating[0].toFixed(1)}+
                </span>
              </div>
              <Slider
                value={minRating}
                onValueChange={setMinRating}
                min={0}
                max={5}
                step={0.5}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-foreground">
                  Min Experience
                </label>
                <span className="text-sm font-medium text-muted-foreground">
                  {minExperience[0]}+ years
                </span>
              </div>
              <Slider
                value={minExperience}
                onValueChange={setMinExperience}
                min={0}
                max={20}
                step={1}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>
      </aside>

      <div className="lg:col-span-3 space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredAgents.length} {filteredAgents.length === 1 ? "consultant" : "consultants"} found
          </p>
        </div>

        {filteredAgents.length === 0 ? (
          <Card className="p-12">
            <div className="text-center space-y-3">
              <div className="mx-auto w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold">No consultants found</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Try adjusting your filters or search criteria to find the right professional consultant.
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
            {filteredAgents.map((agent) => (
              <Card key={agent.slug} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden">
                        <Image
                          src={agent.image}
                          alt={agent.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0 space-y-4">
                      <div>
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <Link
                              href={`/agents/${agent.slug}`}
                              className="text-xl font-bold hover:text-primary transition-colors"
                            >
                              {agent.name}
                            </Link>
                            <Badge variant="secondary" className="ml-2">
                              {agent.typeLabel}
                            </Badge>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-2xl font-bold text-primary">
                              {formatINR(agent.consultationFee)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              per consultation
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold text-foreground">
                              {agent.rating}
                            </span>
                            <span>({agent.reviewCount} reviews)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{agent.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            <span>{agent.experience} years exp.</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{agent.availability}</span>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {agent.bio}
                        </p>

                        <div className="space-y-2">
                          <div>
                            <p className="text-xs font-semibold text-foreground mb-1">
                              Key Services
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {(() => {
                                const services = getCatalogServicesForAgentType(agent.type);
                                return (
                                  <>
                                    {services.slice(0, 3).map((service, idx) => (
                                      <Badge key={idx} variant="outline" className="text-xs">
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

                          <div>
                            <p className="text-xs font-semibold text-foreground mb-1">
                              Specializations
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {agent.specializations.map((spec, idx) => (
                                <Badge key={idx} variant="success" className="text-xs">
                                  {spec}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 pt-2">
                            {agent.channels.map((channel) => (
                              <Badge key={channel} variant="live" className="text-xs">
                                {channel === "whatsapp" && "WhatsApp"}
                                {channel === "chat" && "Chat"}
                                {channel === "call" && "Call"}
                              </Badge>
                            ))}
                            {agent.liveTag && (
                              <Badge variant="live" className="text-xs">
                                {agent.liveTag}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 pt-2">
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                        >
                          <Link href={`/agents/${agent.slug}`}>
                            View Profile
                          </Link>
                        </Button>
                        <Button
                          onClick={() => openConsult(agent.slug)}
                          size="sm"
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Consult Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
