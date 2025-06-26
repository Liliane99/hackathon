"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { Service, ServiceFilters, ProfilesState, SlotCategory } from "@/types";
import { getServicesByCategory, getAllServices, searchServices } from "@/lib/api";

export function useProfiles(initialCategory?: SlotCategory) {
  const [state, setState] = useState<ProfilesState>({
    profiles: [],
    filteredProfiles: [],
    filters: {
      category: initialCategory,
    },
    isLoading: false,
    error: undefined,
  });

  const loadProfiles = useCallback(async (category?: SlotCategory) => {
    setState(prev => ({ ...prev, isLoading: true, error: undefined }));

    try {
      const profiles = category
        ? await getServicesByCategory(category)
        : await getAllServices();

      setState(prev => ({
        ...prev,
        profiles,
        filteredProfiles: profiles,
        isLoading: false,
      }));
    }
    catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: "Erreur lors du chargement des profils",
      }));
    }
  }, []);

  const applyFilters = useCallback((filters: ServiceFilters) => {
    setState((prev) => {
      let filtered = [...prev.profiles];
      if (filters.type) {
        filtered = filtered.filter(service => service.type === filters.type);
      }

      if (filters.seniority) {
        filtered = filtered.filter((service) => {
          if (service.type === "human") {
            const dailyRate = service.pricePerDays;
            switch (filters.seniority) {
              case "junior":
                return dailyRate < 350;
              case "mid":
                return dailyRate >= 350 && dailyRate < 450;
              case "senior":
                return dailyRate >= 450 && dailyRate < 600;
              case "lead":
                return dailyRate >= 600;
              default:
                return true;
            }
          }
          return true;
        });
      }

      if (filters.minPrice || filters.maxPrice) {
        filtered = filtered.filter((service) => {
          const price = service.type === "ai" ? service.price : service.pricePerDays * 20;
          return (!filters.minPrice || price >= filters.minPrice)
            && (!filters.maxPrice || price <= filters.maxPrice);
        });
      }

      if (filters.technologies && filters.technologies.length > 0) {
        filtered = filtered.filter((service) => {
          const description = service.description.toLowerCase();
          return filters.technologies!.some(tech =>
            description.includes(tech.toLowerCase()),
          );
        });
      }

      return {
        ...prev,
        filteredProfiles: filtered,
        filters,
      };
    });
  }, []);

  const searchProfiles = useCallback(async (query: string) => {
    if (!query.trim()) {
      setState(prev => ({ ...prev, filteredProfiles: prev.profiles }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const results = await searchServices(query);
      setState(prev => ({
        ...prev,
        filteredProfiles: results,
        isLoading: false,
      }));
    }
    catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: "Erreur lors de la recherche",
      }));
    }
  }, []);
  const clearFilters = useCallback(() => {
    setState(prev => ({
      ...prev,
      filteredProfiles: prev.profiles,
      filters: { category: prev.filters.category },
    }));
  }, []);

  const getProfileById = useCallback((id: string): Service | undefined => {
    return state.profiles.find(profile => profile.id === id);
  }, [state.profiles]);

  const getAlternativeProfiles = useCallback((service: Service, limit = 5): Service[] => {
    return state.profiles
      .filter(profile =>
        profile.id !== service.id
        && profile.type === service.type,
      )
      .slice(0, limit);
  }, [state.profiles]);
  useEffect(() => {
    loadProfiles(initialCategory);
  }, [loadProfiles, initialCategory]);

  const stats = useMemo(() => {
    const total = state.profiles.length;
    const humans = state.profiles.filter(p => p.type === "human").length;
    const ais = state.profiles.filter(p => p.type === "ai").length;
    const filtered = state.filteredProfiles.length;

    return { total, humans, ais, filtered };
  }, [state.profiles, state.filteredProfiles]);

  return {
    profiles: state.filteredProfiles,
    allProfiles: state.profiles,
    filters: state.filters,
    isLoading: state.isLoading,
    error: state.error,
    stats,
    loadProfiles,
    applyFilters,
    searchProfiles,
    clearFilters,
    getProfileById,
    getAlternativeProfiles,
  };
}
