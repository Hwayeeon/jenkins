"use client";

import { useEffect, useState } from "react";
import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";
import { useTranslations } from "next-intl";

const TUTORIAL_STORAGE_KEY = "portfolio-perspective-tutorial-completed";

export function PerspectiveTutorial() {
  const [shouldShow, setShouldShow] = useState(false);
  const t = useTranslations("PerspectiveTutorial");

  useEffect(() => {
    // Check if tutorial has been completed
    const hasCompleted = localStorage.getItem(TUTORIAL_STORAGE_KEY);
    if (!hasCompleted) {
      setShouldShow(true);
    }
  }, []);

  useEffect(() => {
    if (!shouldShow) return;

    // Wait for DOM elements to be ready
    const timer = setTimeout(() => {
      const tour = new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
          cancelIcon: {
            enabled: true,
          },
          classes: "shepherd-theme-custom",
          scrollTo: { behavior: "smooth", block: "center" },
        },
      });

      // Step 1: Introduction
      tour.addStep({
        id: "intro",
        title: t("welcomeTitle"),
        text: t("step1Description"),
        buttons: [
          {
            text: t("skip"),
            action: () => {
              localStorage.setItem(TUTORIAL_STORAGE_KEY, "true");
              tour.complete();
            },
            classes: "shepherd-button-secondary",
          },
          {
            text: t("next"),
            action: tour.next,
          },
        ],
      });

      // Step 2: Highlight Toggle Container
      tour.addStep({
        id: "toggle",
        title: t("step2Title"),
        text: t("step2Description"),
        attachTo: {
          element: "#perspective-toggle",
          on: "left",
        },
        buttons: [
          {
            text: t("next"),
            action: tour.next,
          },
        ],
      });

      // Step 3: Business View Button
      tour.addStep({
        id: "business-btn",
        title: t("businessBtnTitle"),
        text: t("businessBtnDescription"),
        attachTo: {
          element: "#perspective-btn-business",
          on: "left",
        },
        buttons: [
          {
            text: t("next"),
            action: tour.next,
          },
        ],
      });

      // Step 4: Developer View Button
      tour.addStep({
        id: "developer-btn",
        title: t("developerBtnTitle"),
        text: t("developerBtnDescription"),
        attachTo: {
          element: "#perspective-btn-developer",
          on: "left",
        },
        buttons: [
          {
            text: t("gotIt"),
            action: () => {
              localStorage.setItem(TUTORIAL_STORAGE_KEY, "true");
              tour.complete();
            },
          },
        ],
      });

      // Add custom styles
      const style = document.createElement("style");
      style.textContent = `
        .shepherd-theme-custom {
          max-width: 340px !important;
        }
        .shepherd-theme-custom .shepherd-content {
          border-radius: 16px !important;
          background: linear-gradient(135deg, #18181b, #27272a) !important;
          border: none !important;
        }
        .shepherd-theme-custom .shepherd-header {
          background: transparent !important;
          padding: 20px 20px 0 20px !important;
        }
        .shepherd-theme-custom .shepherd-title {
          color: white !important;
          font-size: 1.25rem !important;
          font-weight: 600 !important;
        }
        .shepherd-theme-custom .shepherd-text {
          color: #a1a1aa !important;
          padding: 12px 20px !important;
          font-size: 0.95rem !important;
          line-height: 1.6 !important;
        }
        .shepherd-theme-custom .shepherd-footer {
          padding: 0 20px 20px 20px !important;
        }
        .shepherd-theme-custom .shepherd-button {
          background: linear-gradient(135deg, #10b981, #059669) !important;
          color: white !important;
          border: none !important;
          border-radius: 8px !important;
          padding: 10px 20px !important;
          font-weight: 500 !important;
          transition: all 0.2s ease !important;
        }
        .shepherd-theme-custom .shepherd-button:hover {
          transform: translateY(-1px) !important;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4) !important;
        }
        .shepherd-theme-custom .shepherd-button-secondary {
          background: transparent !important;
          color: #71717a !important;
        }
        .shepherd-theme-custom .shepherd-button-secondary:hover {
          color: white !important;
          box-shadow: none !important;
        }
        .shepherd-theme-custom .shepherd-cancel-icon {
          color: #71717a !important;
        }
        .shepherd-theme-custom .shepherd-cancel-icon:hover {
          color: white !important;
        }
        .shepherd-modal-overlay-container {
          fill: rgba(0, 0, 0, 0.6) !important;
        }
        .shepherd-arrow:before {
          background: #18181b !important;
          border: none !important;
        }
        /* Remove white border on highlighted elements */
        .shepherd-target,
        .shepherd-enabled.shepherd-target,
        .shepherd-modal-target {
          outline: none !important;
          box-shadow: none !important;
        }
        .shepherd-element-attached-top,
        .shepherd-element-attached-bottom,
        .shepherd-element-attached-left,
        .shepherd-element-attached-right {
          outline: none !important;
        }
      `;
      document.head.appendChild(style);

      tour.start();

      return () => {
        tour.complete();
        style.remove();
      };
    }, 800);

    return () => clearTimeout(timer);
  }, [shouldShow, t]);

  return null; // Shepherd handles its own rendering
}
