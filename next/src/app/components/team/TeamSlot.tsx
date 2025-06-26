import { TeamSlot as TeamSlotType } from "@/schemas/team";
import { Badge } from "@/app/components/ui/badge";

interface TeamSlotProps {
  slot: TeamSlotType;
}

export function TeamSlot({ slot }: TeamSlotProps) {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">{slot.role}</h3>
        <Badge variant={slot.isRequired ? "default" : "secondary"}>
          {slot.isRequired ? "Obligatoire" : "Optionnel"}
        </Badge>
      </div>
      
      {slot.requirements && (
        <div className="flex flex-wrap gap-1 mt-2">
          {slot.requirements.map((req) => (
            <Badge key={req} variant="outline" className="text-xs">
              {req}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}