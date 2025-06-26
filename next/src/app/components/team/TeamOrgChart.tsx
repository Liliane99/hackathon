"use client";

import { mockTeam } from "@/lib/mock-data";
import React, { FormEvent, useState } from "react";
import { ProfileOverlay } from "./ProfileOverlay";
import { Service } from "@/schemas/service";
import { TeamSlot } from "@/schemas/team";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Bot, User, Crown, Code, Database, Users, Palette, Bug, CheckCircle, ArrowRight, Search, Sparkles } from "lucide-react";
import { toast } from "sonner";

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "management": return Crown;
    case "frontend": return Code;
    case "backend": return Database;
    case "rh": return Users;
    case "design": return Palette;
    case "qa": return Bug;
    default: return User;
  }
};

const getCategoryAccent = (category: string) => {
  switch (category) {
    case "management": return "border-l-purple-500";
    case "frontend": return "border-l-blue-500";
    case "backend": return "border-l-emerald-500";
    case "rh": return "border-l-rose-500";
    case "design": return "border-l-orange-500";
    case "qa": return "border-l-amber-500";
    default: return "border-l-gray-500";
  }
};

const getCategoryIconColor = (category: string) => {
  switch (category) {
    case "management": return "text-purple-600";
    case "frontend": return "text-blue-600";
    case "backend": return "text-emerald-600";
    case "rh": return "text-rose-600";
    case "design": return "text-orange-600";
    case "qa": return "text-amber-600";
    default: return "text-gray-600";
  }
};

interface OrgNodeProps {
  slot: TeamSlot;
  position: "top" | "left" | "right" | "center";
  level: number;
  onServiceClick: (service: Service, category: string) => void;
}

function OrgNode({ slot, position, level, onServiceClick }: OrgNodeProps) {
  const service = slot.assignedService;
  const isAssigned = slot.isAssigned && service;
  const Icon = getCategoryIcon(slot.category);
  const accentColor = getCategoryAccent(slot.category);
  const iconColor = getCategoryIconColor(slot.category);

  return (
    <div className={`
      relative group
      ${position === "top" ? "mx-auto" : ""}
      ${level > 0 ? "mt-12" : ""}
    `}
    >
      {level > 0 && (
        <>
          <div className="absolute -top-12 left-1/2 w-0.5 h-12 bg-gray-300 transform -translate-x-px"></div>
          <div className="absolute -top-12 left-1/2 w-2 h-2 bg-gray-400 rounded-full transform -translate-x-1/2 -translate-y-1"></div>
        </>
      )}

      <div className={`
        relative w-80 bg-white rounded-xl shadow-sm border border-gray-200 ${accentColor} border-l-4
        transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1
        ${!isAssigned ? "border-dashed border-gray-300 bg-gray-50/50" : ""}
      `}
      >
        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="relative">
              <Avatar className="h-14 w-14 border-2 border-gray-100">
                <AvatarFallback className="bg-gray-100 text-gray-600 font-semibold">
                  {isAssigned
                    ? (
                        service.type === "ai"
                          ? (
                              <Bot className="h-6 w-6" />
                            )
                          : (
                              <User className="h-6 w-6" />
                            )
                      )
                    : (
                        <Icon className="h-6 w-6" />
                      )}
                </AvatarFallback>
              </Avatar>

              {isAssigned && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`h-4 w-4 ${iconColor}`} />
                <Badge variant={slot.isRequired ? "default" : "secondary"} className="text-xs">
                  {slot.isRequired ? "Requis" : "Optionnel"}
                </Badge>
                {isAssigned && service.type === "ai" && (
                  <Badge variant="outline" className="text-xs border-purple-200 text-purple-700 bg-purple-50">
                    IA
                  </Badge>
                )}
              </div>

              {slot.seniority && (
                <span className="text-xs text-gray-500 font-medium">
                  {slot.seniority.charAt(0).toUpperCase() + slot.seniority.slice(1)}
                </span>
              )}
            </div>
          </div>

          <h3 className="font-semibold text-lg text-gray-900 mb-3 leading-tight">
            {slot.role}
          </h3>

          {isAssigned
            ? (
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-900 mb-1">
                      {service.name}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <span className="text-sm font-semibold text-gray-900">
                      {service.type === "ai"
                        ? `${service.price}€/mois`
                        : `${service.pricePerDays}€/jour`}
                    </span>
                    <button
                      onClick={() => onServiceClick(service, slot.category)}
                      className="px-4 py-2 border-2 border-purple-500 text-purple-600 rounded-lg text-sm font-medium
                           hover:bg-purple-500 hover:text-white transition-all duration-200
                           transform hover:scale-105"
                    >
                      Détails
                    </button>
                  </div>
                </div>
              )
            : (
                <div className="text-center py-4">
                  {/* <div className="text-gray-400 mb-3">
                <Icon className="h-10 w-10 mx-auto mb-2 opacity-40" />
                <p className="text-sm font-medium text-gray-500">Position ouverte</p>
              </div>
              {slot.requirements && (
                <p className="text-xs text-gray-400 mb-3">
                  {slot.requirements.slice(0, 2).join(" • ")}
                </p>
              )}
              <button className="px-4 py-2 border-2 border-gray-300 text-gray-600 rounded-lg text-sm font-medium
                               hover:border-purple-500 hover:text-purple-600 transition-all duration-200">
                Recruter
              </button> */}
                </div>
              )}
        </div>
      </div>
    </div>
  );
}

export function TeamOrgChart() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("J'ai besoin d'une équipe pour développer une plateforme e-commerce avec React en frontend et Laravel en backend");

  const handleServiceClick = (service: Service, slotCategory: string) => {
    setSelectedService(service);
    setSelectedCategory(slotCategory);
    setOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setOverlayOpen(false);
    setSelectedService(null);
    setSelectedCategory("");
  };

  const handleValidateTeam = () => {
    toast("Équipe validée ! 🎉");
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast(`Recherche: ${searchQuery}`);
    }
  };

  const allSlots = mockTeam.slots;
  const managementSlots = allSlots.filter(slot => slot.category === "management");
  const coreSlots = allSlots.filter(slot =>
    ["frontend", "backend"].includes(slot.category),
  );
  const supportSlots = allSlots.filter(slot =>
    ["rh", "design", "qa"].includes(slot.category),
  );

  const isTeamComplete = allSlots.filter(s => s.isRequired).every(s => s.isAssigned);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              TeamBuilder
            </h1>
            <p className="text-lg text-gray-600">
              Décrivez votre projet et obtenez instantanément l'équipe parfaite
            </p>
          </div>
          <form onSubmit={handleSearch} className="relative">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Décrivez votre projet..."
                className="w-full pl-12 pr-16 py-3 text-base border-2 border-gray-200 rounded-full
                         focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none
                         transition-all duration-200 bg-white shadow-sm hover:shadow-md"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2
                         px-4 py-1.5 bg-purple-600 text-white rounded-full font-medium text-sm
                         hover:bg-purple-700 transition-colors duration-200
                         flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Générer
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Équipe recommandée pour votre projet
          </h2>
        </div>
        <div className="space-y-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <Crown className="h-5 w-5 text-purple-600" />
              <span className="font-semibold text-gray-900">Direction</span>
            </div>

            <div className="flex justify-center">
              {managementSlots.map(slot => (
                <OrgNode
                  key={slot.id}
                  slot={slot}
                  position="top"
                  level={0}
                  onServiceClick={handleServiceClick}
                />
              ))}
            </div>
            {coreSlots.length > 0 && (
              <>
                <div className="flex justify-center mt-12">
                  <div className="w-0.5 h-12 bg-gray-300"></div>
                </div>
                <div className="flex justify-center">
                  <div className="w-64 h-0.5 bg-gray-300"></div>
                </div>
              </>
            )}
          </div>
          {coreSlots.length > 0 && (
            <div className="text-center">
              <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
                <Code className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-gray-900">Développement</span>
              </div>

              <div className="flex justify-center gap-24">
                {coreSlots.map((slot, index) => (
                  <div key={slot.id} className="relative">
                    <div className="absolute -top-20 left-1/2 w-0.5 h-12 bg-gray-300 transform -translate-x-px"></div>

                    <OrgNode
                      slot={slot}
                      position={index === 0 ? "left" : "right"}
                      level={1}
                      onServiceClick={handleServiceClick}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {supportSlots.length > 0 && (
            <div className="text-center">
              <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
                <Users className="h-5 w-5 text-rose-600" />
                <span className="font-semibold text-gray-900">Support & Spécialistes</span>
              </div>

              <div className="flex justify-center gap-16 flex-wrap">
                {supportSlots.map(slot => (
                  <OrgNode
                    key={slot.id}
                    slot={slot}
                    position="center"
                    level={2}
                    onServiceClick={handleServiceClick}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="mt-16 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {allSlots.filter(s => s.isAssigned).length}
                </div>
                <div className="text-sm text-gray-600">Membres total</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {allSlots.filter(s => s.assignedService?.type === "human").length}
                </div>
                <div className="text-sm text-gray-600">Humains</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {allSlots.filter(s => s.assignedService?.type === "ai").length}
                </div>
                <div className="text-sm text-gray-600">Agents IA</div>
              </div>
            </div>

            <div className="text-center">
              <Button
                onClick={handleValidateTeam}
                disabled={!isTeamComplete}
                size="lg"
                className={`px-8 py-4 font-semibold transition-all duration-300 ${
                  isTeamComplete
                    ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isTeamComplete
                  ? (
                      <>
                        Valider l'équipe
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )
                  : (
                      "Compléter l'équipe"
                    )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {selectedService && (
        <ProfileOverlay
          service={selectedService}
          open={overlayOpen}
          onClose={handleCloseOverlay}
          slotCategory={selectedCategory}
        />
      )}
    </div>
  );
}
