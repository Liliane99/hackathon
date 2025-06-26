"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { TeamSlot } from "@/schemas/team";
import { Service } from "@/schemas/service";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface ServiceCardProps {
  slot: TeamSlot;
  onServiceClick?: (service: Service, slotCategory: string) => void;
}

export function ServiceCard({ slot, onServiceClick }: ServiceCardProps) {
  const service = slot.assignedService;
  const isAssigned = slot.isAssigned && service;

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge variant={slot.isRequired ? "default" : "secondary"}>
            {slot.isRequired ? "Obligatoire" : "Optionnel"}
          </Badge>
          {slot.seniority && (
            <Badge variant="outline">{slot.seniority}</Badge>
          )}
        </div>
        <h3 className="font-semibold text-lg text-gray-900 leading-tight">
          {slot.role}
        </h3>
      </CardHeader>

      <CardContent className="pb-4">
        {isAssigned
          ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {service.type === "ai"
                        ? (
                            <Bot className="h-4 w-4" />
                          )
                        : (
                            <User className="h-4 w-4" />
                          )}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {service.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {service.type === "ai" ? "Agent IA" : "Humain"}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {service.description}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    {service.type === "ai"
                      ? `${service.price}€/mois`
                      : `${service.pricePerDays}€/jour`}
                  </span>
                </div>
              </div>
            )
          : (
              <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <User className="h-6 w-6" />
                </div>
                <p className="text-sm text-center">
                  Poste à pourvoir
                </p>
                {slot.requirements && (
                  <p className="text-xs text-center mt-1">
                    {slot.requirements.slice(0, 2).join(", ")}
                  </p>
                )}
              </div>
            )}
      </CardContent>

      <CardFooter className="pt-0">
        {isAssigned
          ? (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onServiceClick?.(service, slot.category)}
              >
                Voir le profil
              </Button>
            )
          : (
              <Button variant="default" className="w-full">
                Trouver un profil
              </Button>
            )}
      </CardFooter>
    </Card>
  );
}
