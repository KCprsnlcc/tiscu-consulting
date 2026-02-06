"use client";

import { Triangle } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { ParallaxContainer } from "@/components/ui/ScrollEffects";
import { TRIANGLE_PILLARS } from "@/lib/constants";

export default function TiscuTriangleMobile() {
  return (
    <section
      id="triangle"
      className="bg-tiscu-steel text-tiscu-bg py-16 relative overflow-hidden"
    >
      {/* Simplified Architectural Lines for mobile */}
      <ParallaxContainer speed={0.05} className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-tiscu-bg/20 pointer-events-none">
        <div className="w-full h-full" />
      </ParallaxContainer>
      <ParallaxContainer speed={0.08} className="absolute top-1/2 left-0 w-full h-px bg-tiscu-bg/20 pointer-events-none">
        <div className="w-full h-full" />
      </ParallaxContainer>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <FadeIn>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-tiscu-navy/30 px-4 py-2 rounded-full border border-tiscu-bg/20 mb-6">
              <Triangle className="w-4 h-4 text-tiscu-bg fill-current" />
              <span className="font-mono text-xs uppercase tracking-widest">
                Core Methodology
              </span>
            </div>
            <h2 className="font-grotesk text-3xl sm:text-4xl font-semibold tracking-tight">
              THE TISCU TRIANGLE
            </h2>
          </div>
        </FadeIn>

        {/* Mobile Triangle Visual */}
        <div className="flex justify-center mb-12">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
            {/* Outer Ring */}
            <div className="absolute inset-0 border border-tiscu-bg/20 rounded-full animate-[spin_10s_linear_infinite]" />
            {/* Triangle */}
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
              {/* Rounded triangle matching design system */}
              <path
                d="M 56.64,27.33 L 78.36,67.67 Q 85,80 71,80 L 29,80 Q 15,80 21.64,67.67 L 43.36,27.33 Q 50,15 56.64,27.33 Z"
                fill="#39455D"
                stroke="#EEF0F3"
                strokeWidth="5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Mobile Pillars Layout - Stacked Vertically */}
        <div className="space-y-8">
          {/* Left Pillar */}
          <FadeIn direction="left">
            <div className="text-center space-y-4">
              <h3 className="font-grotesk text-xl sm:text-2xl font-medium leading-none">
                {TRIANGLE_PILLARS.left.title}
              </h3>
              <div className="h-px w-12 bg-tiscu-bg/50 mx-auto" />
              <p className="text-sm text-tiscu-bg/80 font-light leading-relaxed max-w-md mx-auto">
                {TRIANGLE_PILLARS.left.desc}
              </p>
            </div>
          </FadeIn>

          {/* Right Pillar */}
          <FadeIn direction="right">
            <div className="text-center space-y-4">
              <h3 className="font-grotesk text-xl sm:text-2xl font-medium leading-none">
                {TRIANGLE_PILLARS.right.title}
              </h3>
              <div className="h-px w-12 bg-tiscu-bg/50 mx-auto" />
              <p className="text-sm text-tiscu-bg/80 font-light leading-relaxed max-w-md mx-auto">
                {TRIANGLE_PILLARS.right.desc}
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Bottom Anchor */}
        <FadeIn delay={0.3}>
          <div className="mt-12 text-center max-w-2xl mx-auto border-t border-tiscu-bg/20 pt-8">
            <h3 className="font-grotesk text-lg sm:text-xl font-medium mb-3">
              {TRIANGLE_PILLARS.bottom.title}
            </h3>
            <p className="text-sm text-tiscu-bg/70 font-light">
              {TRIANGLE_PILLARS.bottom.desc}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
