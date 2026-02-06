"use client";

import { motion } from "framer-motion";
import { Triangle } from "lucide-react";
import { usePageTransition } from "@/components/providers/PageTransitionProvider";

export default function PageLoader() {
  const { isLoading, isTransitioning } = usePageTransition();

  if (!isLoading && !isTransitioning) return null;

  // Check for reduced motion preference
  const shouldReduceMotion = 
    typeof window !== "undefined" 
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
      : false;

  if (shouldReduceMotion) {
    // Return minimal loader for reduced motion users
    return (
      <div
        className="page-loader"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          backgroundColor: "#39455D", // TISCU navy
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        role="progressbar"
        aria-label="Loading page"
        aria-busy={isLoading}
      >
        <div className="flex flex-col items-center gap-4">
          <Triangle 
            className="w-16 h-16 text-tiscu-bg" 
            fill="currentColor"
            strokeWidth={0}
          />
          <div className="text-tiscu-bg font-grotesk font-semibold tracking-widest text-sm uppercase">
            TISCU
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="page-loader"
      initial={{ transform: "translateX(0%)" }}
      animate={{ 
        transform: isTransitioning ? "translateX(100%)" : "translateX(0%)" 
      }}
      transition={{
        duration: 0.9,
        delay: isTransitioning ? 0.5 : 0, // Only add delay when transitioning out
        ease: [0.76, 0, 0.24, 1],
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#39455D", // TISCU navy
        pointerEvents: isTransitioning ? "none" : "all",
      }}
      role="progressbar"
      aria-label="Loading page"
      aria-busy={isLoading}
    >
      <div className="flex items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isTransitioning ? 0 : 1, // Fade out when transitioning
            scale: isTransitioning ? 0.8 : 1 // Scale down when transitioning
          }}
          transition={{
            duration: 0.4, // Quick fade out
            ease: [0.25, 0.4, 0.25, 1],
          }}
          className="flex flex-col items-center gap-4"
        >
          {/* TISCU Triangle Logo */}
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="relative"
            aria-hidden="true"
            style={{
              opacity: isTransitioning ? 0 : 1, // Also fade logo independently
              transition: "opacity 0.3s ease-out"
            }}
          >
            <Triangle 
              className="w-16 h-16 text-tiscu-bg" 
              fill="currentColor"
              strokeWidth={0}
            />
          </motion.div>
          
          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: isTransitioning ? 0 : 1, // Fade out text when transitioning
              y: isTransitioning ? -10 : 0 // Move text up slightly when fading
            }}
            transition={{
              duration: 0.3, // Faster fade for text
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="text-tiscu-bg font-grotesk font-semibold tracking-widest text-sm uppercase"
          >
            TISCU
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle gradient overlay for depth */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(circle at center, transparent 0%, rgba(238, 240, 243, 0.1) 100%)",
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
}
