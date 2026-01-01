"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Particles from "../components/particles";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("NotFoundPage");
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [glitchActive, setGlitchActive] = useState(false);
  const [initialAnimDone, setInitialAnimDone] = useState(false);
  const fullText = t("description");

  // Mark initial animation as done after 1 second (matches animate-title duration)
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialAnimDone(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Typing effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [fullText]);

  // Cursor blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Glitch flicker effect - only after initial animation
  useEffect(() => {
    if (!initialAnimDone) return;

    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 2500);

    const randomGlitch = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 80);
      }
    }, 400);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(randomGlitch);
    };
  }, [initialAnimDone]);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      {/* Particles - same as root page */}
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />

      {/* Top glowing line - same as root */}
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

      {/* 404 with glitch effect - fixed height container to prevent layout shift */}
      <div 
        className="relative flex items-center justify-center"
        style={{ height: "clamp(8rem, 25vw, 16rem)", minWidth: "300px" }}
      >
        <h1
          className={`
            z-10 text-6xl sm:text-8xl md:text-[10rem] 
            font-display font-bold cursor-default select-none
            ${!initialAnimDone ? "animate-title" : ""}
          `}
          style={{
            color: "transparent",
            WebkitTextStroke: glitchActive ? "2px #ff0080" : "2px rgba(255,255,255,0.8)",
            textShadow: glitchActive
              ? "0 0 30px rgba(255,0,128,0.8), 0 0 60px rgba(121,40,202,0.5), -3px 0 #ff0080, 3px 0 #00ff88"
              : "0 0 20px rgba(255,255,255,0.3)",
            transition: "all 0.1s ease",
          }}
        >
          404
        </h1>

        {/* Glitch overlay layers */}
        {glitchActive && (
          <>
            <span
              className="absolute text-6xl sm:text-8xl md:text-[10rem] font-display font-bold pointer-events-none"
              style={{
                color: "#00ff88",
                opacity: 0.7,
                transform: "translate(-4px, -2px)",
                clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
              }}
            >
              404
            </span>
            <span
              className="absolute text-6xl sm:text-8xl md:text-[10rem] font-display font-bold pointer-events-none"
              style={{
                color: "#ff0080",
                opacity: 0.7,
                transform: "translate(4px, 2px)",
                clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
              }}
            >
              404
            </span>
          </>
        )}

        {/* Backlight glow */}
        <div
          className={`absolute inset-0 -z-10 blur-3xl transition-opacity duration-300 ${
            glitchActive ? "opacity-100" : "opacity-30"
          }`}
          style={{
            background: glitchActive
              ? "radial-gradient(ellipse at center, rgba(255,0,128,0.5) 0%, rgba(121,40,202,0.3) 40%, transparent 70%)"
              : "radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Bottom glowing line - same as root */}
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

      {/* Typing description - fixed height to prevent layout shift */}
      <div className="my-16 text-center animate-fade-in px-4" style={{ minHeight: "3rem" }}>
        <p className="text-sm text-zinc-500 font-mono">
          {displayedText}
          <span 
            className="text-zinc-400 transition-opacity duration-100"
            style={{ opacity: showCursor ? 1 : 0 }}
          >
            |
          </span>
        </p>
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-4 animate-fade-in">
        <Link
          href="/"
          className="text-sm duration-500 text-zinc-500 hover:text-zinc-300 px-4 py-2 border border-zinc-700 rounded-lg hover:border-zinc-500 transition-all"
        >
          {t("backHome")}
        </Link>
        <Link
          href="/projects"
          className="text-sm duration-500 text-zinc-300 hover:text-white px-4 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-all"
        >
          {t("viewProjects")}
        </Link>
      </div>
    </div>
  );
}
