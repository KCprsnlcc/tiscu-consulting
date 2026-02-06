"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

interface LenisProviderProps {
  children: React.ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const shouldReduceMotion = mediaQuery.matches;

    // Initialize Lenis with optimal settings
    lenisRef.current = new Lenis({
      duration: shouldReduceMotion ? 0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
      wheelMultiplier: shouldReduceMotion ? 0 : 1.2,
      touchMultiplier: shouldReduceMotion ? 0 : 2,
      infinite: false,
    });

    // RequestAnimationFrame loop for smooth scrolling
    const raf = (time: number) => {
      if (lenisRef.current) {
        lenisRef.current.raf(time);
      }
      rafId.current = requestAnimationFrame(raf);
    };

    rafId.current = requestAnimationFrame(raf);

    // Handle reduced motion changes
    const handleChange = (e: MediaQueryListEvent) => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = new Lenis({
          duration: e.matches ? 0 : 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          wheelMultiplier: e.matches ? 0 : 1.2,
          touchMultiplier: e.matches ? 0 : 2,
          infinite: false,
        });
        
        // Restart RAF loop
        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
        }
        rafId.current = requestAnimationFrame(raf);
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    // Cleanup
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return <>{children}</>;
}
