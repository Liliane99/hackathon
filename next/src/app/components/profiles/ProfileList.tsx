"use client";

import { ProfileCard } from "./ProfileCard";
import { ProfileOverlay } from "../team/ProfileOverlay";
import { Service } from "@/schemas/service";
import { useState } from "react";

interface ProfileListProps {
  services: Service[];
}

export function ProfileList({ services }: ProfileListProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setOverlayOpen(true);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        {(services.length + " profil(s) trouvé(s)")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <ProfileCard
            key={service.id}
            service={service}
            onSelect={handleServiceSelect}
          />
        ))}
      </div>

      <ProfileOverlay
        service={selectedService}
        open={overlayOpen}
        onClose={() => {
          setOverlayOpen(false);
          setSelectedService(null);
        }}
      />
    </div>
  );
}
