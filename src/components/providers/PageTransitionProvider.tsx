"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { initTransitionKeyboardListeners, cleanupTransitionKeyboardListeners } from "@/lib/page-transition";

interface PageTransitionContextType {
  isLoading: boolean;
  isTransitioning: boolean;
  startTransition: () => void;
  endTransition: () => void;
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined);

export function usePageTransition() {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used within PageTransitionProvider");
  }
  return context;
}

interface PageTransitionProviderProps {
  children: ReactNode;
}

export default function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const [isLoading, setIsLoading] = useState(true); // Start with loading true for initial load
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Check for reduced motion preference
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduceMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setShouldReduceMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Initialize keyboard listeners
  useEffect(() => {
    initTransitionKeyboardListeners();
    return () => cleanupTransitionKeyboardListeners();
  }, []);

  const startTransition = () => {
    if (shouldReduceMotion) {
      setIsLoading(false);
      setIsTransitioning(false);
      return;
    }
    
    console.log("Starting transition"); // Debug log
    setIsLoading(true);
    setIsTransitioning(false); // Start with not transitioning, just loading
    
    // Disable pointer events during transition
    document.body.style.pointerEvents = "none";
    document.body.style.cursor = "wait";
    document.body.classList.add("disable-hover");
    
    // Announce to screen readers
    const announcement = document.createElement("div");
    announcement.setAttribute("role", "status");
    announcement.setAttribute("aria-live", "polite");
    announcement.className = "sr-only";
    announcement.textContent = "Loading page...";
    document.body.appendChild(announcement);
    
    // Clean up announcement after transition
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 2000);
  };

  const endTransition = () => {
    console.log("Ending transition"); // Debug log
    
    // First set transitioning to true to trigger fade out, then slide
    setIsTransitioning(true);
    
    // Then after fade out (0.4s) + slide animation (0.9s + 0.5s delay) completes, hide loader
    setTimeout(() => {
      setIsLoading(false);
      setIsTransitioning(false);
      document.body.style.pointerEvents = "";
      document.body.style.cursor = "";
      document.body.classList.remove("disable-hover");
      
      // Announce completion to screen readers
      const announcement = document.createElement("div");
      announcement.setAttribute("role", "status");
      announcement.setAttribute("aria-live", "polite");
      announcement.className = "sr-only";
      announcement.textContent = "Page loaded";
      document.body.appendChild(announcement);
      
      // Clean up announcement
      setTimeout(() => {
        if (document.body.contains(announcement)) {
          document.body.removeChild(announcement);
        }
      }, 1000);
    }, shouldReduceMotion ? 0 : 1800); // Wait for fade out (0.4s) + slide animation (0.9s + 0.5s delay)
  };

  // Handle route changes
  useEffect(() => {
    // Handle initial page load - show loader longer so transition is visible
    const timer = setTimeout(() => {
      endTransition();
    }, shouldReduceMotion ? 100 : 1500); // Increased from 100ms to 1500ms

    return () => clearTimeout(timer);
  }, [shouldReduceMotion]);

  // Handle pathname changes (client-side navigation)
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Start transition when pathname changes
      startTransition();
      
      // End transition after showing loading state for a bit, then trigger slide out
      const timer = setTimeout(() => {
        endTransition();
      }, shouldReduceMotion ? 100 : 800); // Reduced to 800ms since endTransition now handles the full sequence

      return () => clearTimeout(timer);
    }
  }, [pathname, shouldReduceMotion]);

  const value = {
    isLoading,
    isTransitioning,
    startTransition,
    endTransition,
  };

  return (
    <PageTransitionContext.Provider value={value}>
      {children}
    </PageTransitionContext.Provider>
  );
}
