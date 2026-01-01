"use client";

import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("LoadingPage");

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <div className="relative">
        {/* Spinning loader */}
        <div className="w-16 h-16 border-4 border-zinc-700 border-t-zinc-300 rounded-full animate-spin" />
        
        {/* Center glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-zinc-300/10 rounded-full blur-xl animate-pulse" />
        </div>
      </div>

      <p className="mt-8 text-zinc-500 animate-pulse">{t("loading")}</p>

      {/* Glowing lines */}
      <div className="absolute top-1/2 left-0 w-screen h-px bg-gradient-to-r from-zinc-300/0 via-zinc-300/20 to-zinc-300/0 animate-pulse" />
    </div>
  );
}
