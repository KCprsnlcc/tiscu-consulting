"use client";

import { Triangle } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { ParallaxContainer } from "@/components/ui/ScrollEffects";
import { TRIANGLE_PILLARS } from "@/lib/constants";

export default function TiscuTriangle() {
  return (
    <section
      id="triangle"
      className="bg-tiscu-steel text-tiscu-bg py-24 relative overflow-hidden"
    >
      {/* Architectural Lines with parallax */}
      <ParallaxContainer speed={0.1} className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-tiscu-bg/20 pointer-events-none">
        <div className="w-full h-full" />
      </ParallaxContainer>
      <ParallaxContainer speed={0.15} className="absolute top-1/2 left-0 w-full h-px bg-tiscu-bg/20 pointer-events-none">
        <div className="w-full h-full" />
      </ParallaxContainer>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-tiscu-navy/30 px-4 py-2 rounded-full border border-tiscu-bg/20 mb-6">
              <Triangle className="w-4 h-4 text-tiscu-bg fill-current" />
              <span className="font-mono text-xs uppercase tracking-widest">
                Core Methodology
              </span>
            </div>
            <h2 className="font-grotesk text-4xl md:text-5xl font-semibold tracking-tight">
              THE TISCU TRIANGLE
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-0 items-center">
          {/* Left Pillar */}
          <FadeIn direction="left">
            <div className="text-left lg:text-right lg:pr-12 space-y-4">
              <h3 className="font-grotesk text-2xl font-medium leading-none whitespace-pre-line">
                {TRIANGLE_PILLARS.left.title}
              </h3>
              <div className="h-px w-12 bg-tiscu-bg/50 lg:ml-auto mr-auto lg:mr-0" />
              <p className="text-sm md:text-base text-tiscu-bg/80 font-light leading-relaxed">
                {TRIANGLE_PILLARS.left.desc}
              </p>
            </div>
          </FadeIn>

          {/* Center Shape (Visual Anchor) */}
          <div className="flex justify-center py-8 lg:py-0">
            <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">
              {/* Outer Ring */}
              <div className="absolute inset-0 border border-tiscu-bg/20 rounded-full animate-[spin_10s_linear_infinite]" />
              {/* Triangle */}
              <div className="w-full h-full flex items-center justify-center">
                <Triangle className="w-64 h-64 md:w-72 md:h-72 fill-tiscu-navy text-tiscu-bg stroke-tiscu-bg drop-shadow-2xl" />
              </div>
            </div>
          </div>

          {/* Right Pillar */}
          <FadeIn direction="right">
            <div className="text-left lg:pl-12 space-y-4">
              <h3 className="font-grotesk text-2xl font-medium leading-none whitespace-pre-line">
                {TRIANGLE_PILLARS.right.title}
              </h3>
              <div className="h-px w-12 bg-tiscu-bg/50" />
              <p className="text-sm md:text-base text-tiscu-bg/80 font-light leading-relaxed">
                {TRIANGLE_PILLARS.right.desc}
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Bottom Anchor */}
        <FadeIn delay={0.3}>
          <div className="mt-20 text-center max-w-2xl mx-auto">
            <h3 className="font-grotesk text-xl font-medium mb-3">
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
