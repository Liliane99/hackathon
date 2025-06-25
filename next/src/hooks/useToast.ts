"use client";

import { toast } from "sonner";
import { useCallback } from "react";

export function useToast() {
  const showSuccess = useCallback((message: string, description?: string) => {
    toast.success(message, {
      description,
      duration: 4000,
    });
  }, []);

  const showError = useCallback((message: string, description?: string) => {
    toast.error(message, {
      description,
      duration: 5000,
    });
  }, []);

  const showInfo = useCallback((message: string, description?: string) => {
    toast.info(message, {
      description,
      duration: 4000,
    });
  }, []);

  const showWarning = useCallback((message: string, description?: string) => {
    toast.warning(message, {
      description,
      duration: 4000,
    });
  }, []);

  const showLoading = useCallback((message: string) => {
    return toast.loading(message);
  }, []);

  const dismiss = useCallback((toastId?: string | number) => {
    toast.dismiss(toastId);
  }, []);

  const showCustom = useCallback((content: React.ReactNode, options?: any) => {
    toast.custom(content, options);
  }, []);

  const showServiceAssigned = useCallback((serviceName: string) => {
    showSuccess("Service assigné !", `${serviceName} a été ajouté à votre équipe 🎉`);
  }, [showSuccess]);

  const showServiceRemoved = useCallback((serviceName: string) => {
    showInfo("Service retiré", `${serviceName} a été retiré de votre équipe`);
  }, [showInfo]);

  const showTeamCompleted = useCallback(() => {
    showSuccess("Équipe complétée !", "Votre équipe est maintenant prête à démarrer le projet 🚀");
  }, [showSuccess]);

  const showValidationError = useCallback((errors: string[]) => {
    showError("Équipe incomplète", errors.join(", "));
  }, [showError]);

  return {
    success: showSuccess,
    error: showError,
    info: showInfo,
    warning: showWarning,
    loading: showLoading,
    dismiss,
    custom: showCustom,
    serviceAssigned: showServiceAssigned,
    serviceRemoved: showServiceRemoved,
    teamCompleted: showTeamCompleted,
    validationError: showValidationError,
  };
}