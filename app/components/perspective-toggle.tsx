"use client";

import React from "react";
import { usePerspective } from "./perspective-context";
import { useTranslations } from "next-intl";
import { Briefcase, Code2, Check } from "lucide-react";

export function PerspectiveToggle() {
  const { perspective, setPerspective } = usePerspective();
  const t = useTranslations("PerspectiveToggle");

  return (
    <div 
      id="perspective-toggle"
      style={{
        position: 'fixed',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        zIndex: 50,
        paddingLeft: '8px',
        paddingTop: '8px',
        paddingBottom: '8px',
      }}
    >
      {/* Business View Button */}
      <button
        id="perspective-btn-business"
        onClick={() => setPerspective("business")}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          width: '48px',
          height: '48px',
          borderRadius: '12px 0 0 12px',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          background: perspective === "business" 
            ? 'linear-gradient(135deg, #10b981, #059669)' 
            : 'rgba(0, 0, 0, 0.2)',
          color: perspective === "business" ? 'white' : 'rgba(0, 0, 0, 0.5)',
          boxShadow: perspective === "business" ? '0 4px 15px rgba(16, 185, 129, 0.4)' : 'none',
        }}
        aria-label={t("businessView")}
        title={t("businessView")}
      >
        <Briefcase className="w-5 h-5" />
        {perspective === "business" && (
          <Check 
            style={{
              position: 'absolute',
              bottom: '4px',
              right: '4px',
              width: '12px',
              height: '12px',
              strokeWidth: 3,
            }}
          />
        )}
      </button>

      {/* Developer View Button */}
      <button
        id="perspective-btn-developer"
        onClick={() => setPerspective("developer")}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          width: '48px',
          height: '48px',
          borderRadius: '12px 0 0 12px',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          background: perspective === "developer" 
            ? 'linear-gradient(135deg, #3b82f6, #2563eb)' 
            : 'rgba(0, 0, 0, 0.2)',
          color: perspective === "developer" ? 'white' : 'rgba(0, 0, 0, 0.5)',
          boxShadow: perspective === "developer" ? '0 4px 15px rgba(59, 130, 246, 0.4)' : 'none',
        }}
        aria-label={t("developerView")}
        title={t("developerView")}
      >
        <Code2 className="w-5 h-5" />
        {perspective === "developer" && (
          <Check 
            style={{
              position: 'absolute',
              bottom: '4px',
              right: '4px',
              width: '12px',
              height: '12px',
              strokeWidth: 3,
            }}
          />
        )}
      </button>
    </div>
  );
}
