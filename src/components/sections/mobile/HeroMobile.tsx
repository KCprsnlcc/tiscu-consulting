"use client";

import FadeIn from "@/components/ui/FadeIn";
import { ParallaxContainer, ScaleOnScroll, WaterWave, TypewriterReveal } from "@/components/ui/ScrollEffects";

export default function HeroMobile() {
  return (
    <section className="max-w-7xl mx-auto px-4 pt-20 pb-16 relative">
      {/* Water wave background effect - simplified for mobile */}
      <WaterWave className="pointer-events-none" />
      
      {/* Simplified Decorative Grid Lines for mobile */}
      <ParallaxContainer speed={0.1} className="absolute top-0 left-4 w-px h-full bg-tiscu-navy/5 pointer-events-none">
        <div className="w-full h-full" />
      </ParallaxContainer>
      <ParallaxContainer speed={0.1} className="absolute top-0 right-4 w-px h-full bg-tiscu-navy/5 pointer-events-none">
        <div className="w-full h-full" />
      </ParallaxContainer>

      <div className="flex flex-col gap-8">
        {/* Main Content */}
        <div className="space-y-6">
          <ParallaxContainer speed={0.2}>
            <FadeIn>
              <div className="inline-block border-b border-tiscu-steel pb-1 mb-4">
                <span className="font-mono text-xs text-tiscu-steel uppercase tracking-widest">
                  Est. 2024 — Architecture &amp; Strategy
                </span>
              </div>
            </FadeIn>
          </ParallaxContainer>

          <TypewriterReveal delay={0.1}>
            <h1
              className="font-grotesk text-5xl sm:text-6xl font-semibold tracking-tighter leading-[0.9] text-tiscu-muted mb-6"
              style={{ letterSpacing: "0.15em" }}
            >
              TISCU
            </h1>
          </TypewriterReveal>

          <ParallaxContainer speed={0.3}>
            <FadeIn delay={0.2}>
              <p className="text-base sm:text-lg text-tiscu-steel leading-relaxed font-light">
                Business Architecture{" "}
                <span className="text-tiscu-navy">+</span>
                Strategy Consulting.
                <br className="sm:hidden" />
                Constructing high-impact corporate frameworks through structural
                rigor and strategic foresight.
              </p>
            </FadeIn>
          </ParallaxContainer>
        </div>

        {/* Stats Section - Mobile Optimized */}
        <ScaleOnScroll scaleRange={[0.95, 1]} className="border-t border-tiscu-navy/10 pt-6">
          <FadeIn delay={0.3} direction="up">
            <div className="grid grid-cols-2 gap-6 text-left">
              <div className="text-center sm:text-left">
                <span className="block font-mono text-xs text-tiscu-muted mb-2">
                  DATASETS
                </span>
                <span className="font-grotesk text-2xl sm:text-3xl font-medium tracking-tight text-tiscu-navy">
                  85<span className="text-sm align-top">%</span>
                </span>
              </div>
              <div className="text-center sm:text-left">
                <span className="block font-mono text-xs text-tiscu-muted mb-2">
                  OPTIMIZATION
                </span>
                <span className="font-grotesk text-2xl sm:text-3xl font-medium tracking-tight text-tiscu-navy">
                  3.5<span className="text-sm align-top">x</span>
                </span>
              </div>
            </div>
          </FadeIn>
        </ScaleOnScroll>
      </div>
    </section>
  );
}
