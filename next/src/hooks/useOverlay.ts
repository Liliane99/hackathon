"use client";

import { useState, useCallback } from "react";

interface OverlayState<T> {
  isOpen: boolean;
  data: T | null;
}

export function useOverlay<T = any>() {
  const [state, setState] = useState<OverlayState<T>>({
    isOpen: false,
    data: null,
  });

  const openOverlay = useCallback((data?: T) => {
    setState({
      isOpen: true,
      data: data || null,
    });
  }, []);

  const closeOverlay = useCallback(() => {
    setState({
      isOpen: false,
      data: null,
    });
  }, []);

  const toggleOverlay = useCallback((data?: T) => {
    setState(prev => ({
      isOpen: !prev.isOpen,
      data: prev.isOpen ? null : (data || null),
    }));
  }, []);

  const updateData = useCallback((data: T) => {
    setState(prev => ({
      ...prev,
      data,
    }));
  }, []);

  return {
    isOpen: state.isOpen,
    data: state.data,
    openOverlay,
    closeOverlay,
    toggleOverlay,
    updateData,
  };
}

export function useProfileOverlay() {
  const overlay = useOverlay<{
    service: any;
    slot?: any;
    onAccept?: (service: any) => void;
    onReplace?: (service: any) => void;
  }>();

  const openProfile = useCallback((
    service: any, 
    slot?: any, 
    actions?: { onAccept?: (service: any) => void; onReplace?: (service: any) => void }
  ) => {
    overlay.openOverlay({
      service,
      slot,
      ...actions,
    });
  }, [overlay]);

  return {
    ...overlay,
    openProfile,
    service: overlay.data?.service,
    slot: overlay.data?.slot,
    onAccept: overlay.data?.onAccept,
    onReplace: overlay.data?.onReplace,
  };
}