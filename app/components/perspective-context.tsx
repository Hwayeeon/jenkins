"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type PerspectiveType = "business" | "developer";

interface PerspectiveContextType {
  perspective: PerspectiveType;
  setPerspective: (perspective: PerspectiveType) => void;
  togglePerspective: () => void;
}

const PerspectiveContext = createContext<PerspectiveContextType | undefined>(undefined);

const STORAGE_KEY = "portfolio-perspective-preference";

export function PerspectiveProvider({ children }: { children: ReactNode }) {
  const [perspective, setPerspectiveState] = useState<PerspectiveType>("business");
  const [isHydrated, setIsHydrated] = useState(false);

  // Load preference from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as PerspectiveType | null;
    if (stored === "business" || stored === "developer") {
      setPerspectiveState(stored);
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever perspective changes
  const setPerspective = (newPerspective: PerspectiveType) => {
    setPerspectiveState(newPerspective);
    localStorage.setItem(STORAGE_KEY, newPerspective);
  };

  const togglePerspective = () => {
    const newPerspective = perspective === "business" ? "developer" : "business";
    setPerspective(newPerspective);
  };

  // Prevent hydration mismatch by not rendering until client-side is ready
  if (!isHydrated) {
    return null;
  }

  return (
    <PerspectiveContext.Provider value={{ perspective, setPerspective, togglePerspective }}>
      {children}
    </PerspectiveContext.Provider>
  );
}

export function usePerspective() {
  const context = useContext(PerspectiveContext);
  if (context === undefined) {
    throw new Error("usePerspective must be used within a PerspectiveProvider");
  }
  return context;
}
