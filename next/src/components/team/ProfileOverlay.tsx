"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Service } from "@/schemas/service";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User, Mail, Phone, Globe, DollarSign } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface ProfileOverlayProps {
  service: Service | null;
  open: boolean;
  onClose: () => void;
  slotCategory?: string; 
}

export function ProfileOverlay({ service, open, onClose, slotCategory }: ProfileOverlayProps) {
  if (!service) return null;

  const handleAccept = () => {
    toast.success("Profil accepté ! Parfait pour votre équipe 🎉");
    onClose();
  };

  const isAI = service.type === "ai";
  const getProfileCategory = () => {
    if (slotCategory) {
      return slotCategory;
    }
    const description = service.description.toLowerCase();
    
    if (description.includes("react") || description.includes("vue") || description.includes("frontend")) {
      return "frontend";
    }
    if (description.includes("laravel") || description.includes("backend") || description.includes("node")) {
      return "backend";
    }
    if (description.includes("rh") || description.includes("recrutement") || description.includes("emploi")) {
      return "rh";
    }
    if (description.includes("design") || description.includes("ux") || description.includes("ui")) {
      return "design";
    }
    if (description.includes("product") || description.includes("chef") || description.includes("agile")) {
      return "management";
    }
    return isAI ? "rh" : "frontend";
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="pb-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary/10 text-primary text-lg">
                {isAI ? (
                  <Bot className="h-8 w-8" />
                ) : (
                  <User className="h-8 w-8" />
                )}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <SheetTitle className="text-xl">{service.name}</SheetTitle>
              <Badge variant={isAI ? "secondary" : "default"} className="mt-1">
                {isAI ? "Agent IA" : "Humain"}
              </Badge>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>

          <Separator />
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-gray-400" />
                <span>{service.contractor.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-gray-400" />
                <span>{service.contractor.phoneNumber}</span>
              </div>
            </div>
          </div>

          <Separator />
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Tarification</h3>
            <div className="flex items-center gap-3">
              <DollarSign className="h-4 w-4 text-gray-400" />
              <span className="text-lg font-semibold text-primary">
                {isAI 
                  ? `${service.price}€/mois`
                  : `${service.pricePerDays}€/jour`
                }
              </span>
            </div>
          </div>
          {isAI && service.agentAi && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Détails techniques</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Modèle :</span>
                    <span className="ml-2 text-gray-600">{service.agentAi.modelName}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Paramètres d'entrée :</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {service.agentAi.inputParameters.map((param) => (
                        <Badge key={param} variant="outline" className="text-xs">
                          {param}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Résultats :</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {service.agentAi.outputParameters.map((param) => (
                        <Badge key={param} variant="outline" className="text-xs">
                          {param}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <Separator />
          <div className="space-y-3">
            <Button 
              onClick={handleAccept} 
              className="w-full" 
              size="lg"
            >
              Accepter ce profil
            </Button>
            <Link href={`/profiles/${getProfileCategory()}`} className="block">
              <Button variant="outline" className="w-full" size="lg">
                Voir d'autres profils {getProfileCategory()}
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}