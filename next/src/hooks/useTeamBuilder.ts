"use client";

import { useState, useCallback } from "react";
import { Team, TeamSlot, Service, TeamBuilderState } from "@/types";
import { mockTeam } from "@/lib/mock-data";
import { calculateTeamCosts } from "@/lib/api";

export function useTeamBuilder(initialTeam?: Team) {
  const [state, setState] = useState<TeamBuilderState>({
    currentTeam: initialTeam || mockTeam,
    availableServices: [],
    selectedSlot: undefined,
    isLoading: false,
    error: undefined,
  });

  const assignServiceToSlot = useCallback((slotId: string, service: Service) => {
    setState((prev) => {
      if (!prev.currentTeam) return prev;

      const updatedSlots = prev.currentTeam.slots.map((slot) => {
        if (slot.id === slotId) {
          return {
            ...slot,
            isAssigned: true,
            assignedService: service,
          };
        }
        return slot;
      });

      const updatedTeam = {
        ...prev.currentTeam,
        slots: updatedSlots,
        updatedAt: new Date(),
      };

      return {
        ...prev,
        currentTeam: updatedTeam,
        selectedSlot: undefined,
        error: undefined,
      };
    });
  }, []);

  const removeServiceFromSlot = useCallback((slotId: string) => {
    setState((prev) => {
      if (!prev.currentTeam) return prev;

      const updatedSlots = prev.currentTeam.slots.map((slot) => {
        if (slot.id === slotId) {
          return {
            ...slot,
            isAssigned: false,
            assignedService: undefined,
          };
        }
        return slot;
      });

      const updatedTeam = {
        ...prev.currentTeam,
        slots: updatedSlots,
        updatedAt: new Date(),
      };

      return {
        ...prev,
        currentTeam: updatedTeam,
        error: undefined,
      };
    });
  }, []);

  const selectSlot = useCallback((slot: TeamSlot) => {
    setState(prev => ({
      ...prev,
      selectedSlot: slot,
    }));
  }, []);

  const clearSelectedSlot = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedSlot: undefined,
    }));
  }, []);

  const isTeamComplete = useCallback(() => {
    if (!state.currentTeam) return false;

    const requiredSlots = state.currentTeam.slots.filter(slot => slot.isRequired);
    const assignedRequiredSlots = requiredSlots.filter(slot => slot.isAssigned);

    return assignedRequiredSlots.length === requiredSlots.length;
  }, [state.currentTeam]);

  const getTeamStats = useCallback(() => {
    if (!state.currentTeam) return null;

    const assignedSlots = state.currentTeam.slots.filter(slot => slot.isAssigned);
    const humanServices = assignedSlots.filter(slot => slot.assignedService?.type === "human");
    const aiServices = assignedSlots.filter(slot => slot.assignedService?.type === "ai");

    const costs = calculateTeamCosts(state.currentTeam);

    return {
      totalMembers: assignedSlots.length,
      humanMembers: humanServices.length,
      aiMembers: aiServices.length,
      estimatedMonthlyCost: costs.monthly,
      estimatedDailyCost: costs.daily,
      assignedSlots: assignedSlots.length,
      pendingSlots: state.currentTeam.slots.length - assignedSlots.length,
    };
  }, [state.currentTeam]);

  const validateTeam = useCallback(() => {
    if (!state.currentTeam) {
      return { isValid: false, errors: ["No team found"] };
    }

    const errors: string[] = [];
    const requiredSlots = state.currentTeam.slots.filter(slot => slot.isRequired);
    const unassignedRequired = requiredSlots.filter(slot => !slot.isAssigned);

    if (unassignedRequired.length > 0) {
      errors.push(`${unassignedRequired.length} poste(s) obligatoire(s) non assigné(s)`);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }, [state.currentTeam]);

  const completeTeamBuilding = useCallback(async () => {
    const validation = validateTeam();
    if (!validation.isValid) {
      setState(prev => ({
        ...prev,
        error: validation.errors.join(", "),
      }));
      return false;
    }

    setState(prev => ({
      ...prev,
      isLoading: true,
      error: undefined,
    }));

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      setState((prev) => {
        if (!prev.currentTeam) return prev;

        return {
          ...prev,
          currentTeam: {
            ...prev.currentTeam,
            status: "complete",
            updatedAt: new Date(),
          },
          isLoading: false,
        };
      });

      return true;
    }
    catch {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: "Erreur lors de la finalisation de l'équipe",
      }));
      return false;
    }
  }, [validateTeam]);

  return {
    team: state.currentTeam,
    selectedSlot: state.selectedSlot,
    isLoading: state.isLoading,
    error: state.error,
    assignServiceToSlot,
    removeServiceFromSlot,
    selectSlot,
    clearSelectedSlot,
    isTeamComplete: isTeamComplete(),
    getTeamStats,
    validateTeam,
    completeTeamBuilding,
  };
}
