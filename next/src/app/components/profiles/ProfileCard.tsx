import { Card, CardContent, CardFooter, CardHeader } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Bot, User } from "lucide-react";
import { Service } from "@/schemas/service";
import Link from "next/link"; 

interface ProfileCardProps {
  service: Service;
  onSelect?: (service: Service) => void;
}

export function ProfileCard({ service, onSelect }: ProfileCardProps) {
  const isAI = service.type === "ai";

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-primary/10 text-primary">
              {isAI ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{service.name}</h3>
            <Badge variant={isAI ? "secondary" : "default"} className="mt-1">
              {isAI ? "Agent IA" : "Humain"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-3">
          {service.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-primary">
            {isAI ? `${service.price}€/mois` : `${service.pricePerDays}€/jour`}
          </span>
        </div>
      </CardContent>

      <CardFooter>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onSelect?.(service)}>
            Voir le service
          </Button>

          
          <Link href={`/services/${service.id}`}>
            <Button variant="default">Commencer</Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
