"use client";

import { usePerspective } from "./perspective-context";
import { ReactNode } from "react";

interface PerspectiveContentProps {
  businessContent: ReactNode;
  developerContent: ReactNode;
}

export function PerspectiveContent({ 
  businessContent, 
  developerContent,
}: PerspectiveContentProps) {
  const { perspective } = usePerspective();

  return (
    <div className="perspective-content-wrapper">
      <div
        key={perspective}
        className="perspective-content animate-fade-in"
      >
        {perspective === "business" ? businessContent : developerContent}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
