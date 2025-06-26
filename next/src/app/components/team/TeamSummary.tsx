import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Team } from "@/schemas/team";
import { Button } from "@/app/components/ui/button";
import { Users, Bot, DollarSign } from "lucide-react";

interface TeamSummaryProps {
  team: Team;
}

export function TeamSummary({ team }: TeamSummaryProps) {
  const assignedSlots = team.slots.filter(slot => slot.isAssigned);
  const humanServices = assignedSlots.filter(slot => slot.assignedService?.type === "human");
  const aiServices = assignedSlots.filter(slot => slot.assignedService?.type === "ai");
  
  const totalMonthlyCost = assignedSlots.reduce((total, slot) => {
    if (!slot.assignedService) return total;
    if (slot.assignedService.type === "ai") {
      return total + slot.assignedService.price;
    } else {
      return total + (slot.assignedService.pricePerDays * 20);
    }
  }, 0);

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Résumé de l'équipe
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-primary/5 rounded-lg p-3">
            <div className="text-2xl font-bold text-primary">{humanServices.length}</div>
            <div className="text-sm text-gray-600">Humains</div>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3">
            <div className="text-2xl font-bold text-gray-700">{aiServices.length}</div>
            <div className="text-sm text-gray-600">Agents IA</div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="text-lg font-bold text-green-700">
              {totalMonthlyCost.toLocaleString()}€
            </span>
          </div>
          <div className="text-sm text-green-600">Coût mensuel estimé</div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Statut des postes</h4>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Assignés</span>
              <Badge variant="default">{assignedSlots.length}</Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span>À pourvoir</span>
              <Badge variant="secondary">{team.slots.length - assignedSlots.length}</Badge>
            </div>
          </div>
        </div>

        <Button className="w-full" size="lg">
          Valider l'équipe
        </Button>
      </CardContent>
    </Card>
  );
}