"use client";

import { ProfileList } from "@/app/components/profiles/ProfileList";
import { ProfileFilters } from "@/app/components/profiles/ProfileFilters";
import { Button } from "@/app/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ServiceRepository } from "@/mocks/service";
import { useEffect, useState } from "react";
import { Service } from "@/types";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[] | null>(null);

  useEffect(() => {
    const localStorageServices = ServiceRepository.findAll();
    setServices(localStorageServices);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/team">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'équipe
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Tous les services
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Découvrez tous les services disponibles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <ProfileFilters />
        </div>
        <div className="lg:col-span-3">
          {services && services.length > 0
            ? (
                <ProfileList
                  services={services}
                />
              )
            : (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">
                    Vous n'avez pas encore créer de service.
                  </p>
                  <Link href="/services/integration">
                    <Button variant="outline">
                      Créer un service
                    </Button>
                  </Link>
                </div>
              )}
        </div>
      </div>
    </div>
  );
}
