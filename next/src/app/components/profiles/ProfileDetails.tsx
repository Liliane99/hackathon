import { Service } from "@/schemas/service";
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Bot, User, Mail, Phone } from "lucide-react";

interface ProfileDetailsProps {
  service: Service;
}

export function ProfileDetails({ service }: ProfileDetailsProps) {
  const isAI = service.type === "ai";

  return (
    <div className="space-y-6">
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
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{service.name}</h2>
          <Badge variant={isAI ? "secondary" : "default"}>
            {isAI ? "Agent IA" : "Humain"}
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
        <p className="text-gray-600">{service.description}</p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Contact</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-gray-400" />
            <span>{service.contractor.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-gray-400" />
            <span>{service.contractor.phoneNumber}</span>
          </div>
        </div>
      </div>

      {isAI && service.agentAi && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Capacités IA</h3>
          <div className="space-y-2">
            <div>
              <span className="text-sm font-medium text-gray-700">Modèle :</span>
              <span className="ml-2 text-gray-600">{service.agentAi.modelName}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700">Paramètres :</span>
              <div className="mt-1 flex flex-wrap gap-1">
                {service.agentAi.inputParameters.map((param) => (
                  <Badge key={param} variant="outline" className="text-xs">
                    {param}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}