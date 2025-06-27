"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/app/components/ui/sheet";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent } from "@/app/components/ui/card";
import { Service } from "@/schemas/service";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Bot, User, Mail, Phone, DollarSign, CheckCircle, Search } from "lucide-react";
import { toast } from "sonner";

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
      <SheetContent className="w-full sm:max-w-4xl p-0 overflow-hidden">
        <div className="flex h-full">
          <div className={`relative ${isAI ? 'w-2/5' : 'w-1/4'}`}>
            <div 
              className="h-full bg-cover bg-center relative"
              style={{
                backgroundImage: `url(${isAI ? '/robot.jpg' : '/presta.jpg'})`,
                borderRadius: '0 0 80px 0'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" 
                   style={{ borderRadius: '0 0 80px 0' }} />
              <div className="absolute bottom-6 left-6">
                <Avatar className="h-16 w-16 ring-4 ring-white/80 shadow-xl">
                  <AvatarFallback className={`text-lg font-semibold ${
                    isAI 
                      ? "bg-gradient-to-br from-purple-50 to-violet-100 text-purple-600" 
                      : "bg-gradient-to-br from-violet-50 to-purple-100 text-violet-600"
                  }`}>
                    {isAI ? <Bot className="h-8 w-8" /> : <User className="h-8 w-8" />}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <SheetHeader className="pb-6">
                <div className="text-left">
                  <SheetTitle className="text-3xl font-bold text-gray-900 mb-3">{service.name}</SheetTitle>
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant={isAI ? "secondary" : "default"} 
                      className={`text-sm font-medium px-4 py-1 ${
                        isAI 
                          ? "bg-purple-100 text-purple-700 hover:bg-purple-200" 
                          : "bg-violet-100 text-violet-700 hover:bg-violet-200"
                      }`}
                    >
                      {isAI ? "🤖 Agent IA" : "👨‍💻 Humain"}
                    </Badge>
                    <span className="text-sm text-purple-500 font-medium">
                      {isAI ? "Intelligence artificielle spécialisée" : "Professionnel expérimenté"}
                    </span>
                  </div>
                </div>
              </SheetHeader>

              <div className="space-y-4">
                <Card className="border border-purple-100 shadow-sm bg-white hover:shadow-md transition-all duration-200">
                  <CardContent className="p-4">
                    <h3 className="font-medium text-purple-700 mb-3 flex items-center gap-2 text-base">
                      <div className="w-1 h-4 bg-primary rounded-full"></div>
                      <span>Description</span>
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{service.description}</p>
                  </CardContent>
                </Card>
                <div className="grid grid-cols-2 gap-3">
                  <Card className="border border-purple-100 shadow-sm bg-white hover:shadow-md transition-all duration-200">
                    <CardContent className="p-4">
                      <h3 className="font-medium text-purple-700 mb-3 flex items-center gap-2 text-base">
                        <div className="w-1 h-4 bg-violet-500 rounded-full"></div>
                        <span>Contact</span>
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 rounded-md bg-gray-50 hover:bg-gray-100 transition-all duration-150">
                          <Mail className="h-3.5 w-3.5 text-purple-500 flex-shrink-0" />
                          <span className="text-gray-600 text-xs truncate">{service.contractor?.email}</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-md bg-gray-50 hover:bg-gray-100 transition-all duration-150">
                          <Phone className="h-3.5 w-3.5 text-purple-500 flex-shrink-0" />
                          <span className="text-gray-600 text-xs">{service.contractor?.phoneNumber}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border border-purple-100 shadow-sm bg-white hover:shadow-md transition-all duration-200">
                    <CardContent className="p-4">
                      <h3 className="font-medium text-purple-700 mb-3 flex items-center gap-2 text-base">
                        <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
                        <span>Tarification</span>
                      </h3>
                      <div className="text-center p-2 rounded-md bg-purple-50">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <DollarSign className="h-4 w-4 text-purple-600" />
                          <span className="text-xl font-bold text-purple-700">
                            {isAI ? `${service.price}€` : `${service.pricePerDays}€`}
                          </span>
                        </div>
                        <span className="text-xs text-purple-500 font-medium">
                          {isAI ? '/mois' : '/jour'}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                {isAI && service.agentAi && (
                  <Card className="border border-purple-100 shadow-sm bg-white hover:shadow-md transition-all duration-200">
                    <CardContent className="p-4">
                      <h3 className="font-medium text-purple-700 mb-3 flex items-center gap-2 text-base">
                        <div className="w-1 h-4 bg-purple-500 rounded-full"></div>
                        <span>Détails techniques</span>
                      </h3>
                      <div className="p-2 rounded-md bg-gray-50">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-600 text-sm">Modèle :</span>
                          <span className="text-purple-600 font-semibold text-sm">{service.agentAi.modelName}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                <div className="pt-4 pb-6">
                  <div className="flex gap-4">
                    <Button
                      onClick={handleAccept}
                      className="flex-1 h-12 font-semibold shadow-md hover:shadow-lg transition-all duration-200 bg-primary hover:bg-primary/90"
                      size="default"
                    >
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Accepter ce profil
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 h-12 font-medium border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200" 
                      size="default"
                    >
                      <Search className="h-5 w-5 mr-2" />
                      Autres {getProfileCategory()}
                    </Button>
                  </div>
                  <p className="text-xs text-purple-500 text-center mt-4">
                    Cliquez sur "Accepter" pour ajouter ce profil à votre équipe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}