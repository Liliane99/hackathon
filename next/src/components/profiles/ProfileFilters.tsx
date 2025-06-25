"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES, SENIORITY_LEVELS, SERVICE_TYPES } from "@/lib/constants";

interface ProfileFiltersProps {
  selectedCategory?: string;
  selectedType?: string;
  selectedSeniority?: string;
  onCategoryChange?: (category: string) => void;
  onTypeChange?: (type: string) => void;
  onSeniorityChange?: (seniority: string) => void;
}

export function ProfileFilters({
  selectedCategory,
  selectedType,
  selectedSeniority,
  onCategoryChange,
  onTypeChange,
  onSeniorityChange
}: ProfileFiltersProps) {
  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <h3 className="font-semibold text-gray-900">Filtres</h3>
      
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Catégorie</h4>
        <div className="flex flex-wrap gap-2">
          {Object.entries(CATEGORIES).map(([key, label]) => (
            <Badge
              key={key}
              variant={selectedCategory === key ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => onCategoryChange?.(key)}
            >
              {label}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Type</h4>
        <div className="flex gap-2">
          {Object.entries(SERVICE_TYPES).map(([key, label]) => (
            <Badge
              key={key}
              variant={selectedType === key ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => onTypeChange?.(key)}
            >
              {label}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Niveau</h4>
        <div className="flex flex-wrap gap-2">
          {Object.entries(SENIORITY_LEVELS).map(([key, label]) => (
            <Badge
              key={key}
              variant={selectedSeniority === key ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => onSeniorityChange?.(key)}
            >
              {label}
            </Badge>
          ))}
        </div>
      </div>

      <Button variant="outline" size="sm" className="w-full">
        Réinitialiser
      </Button>
    </div>
  );
}