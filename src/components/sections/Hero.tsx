"use client";

import FadeIn from "@/components/ui/FadeIn";
import { ParallaxContainer, ScaleOnScroll, WaterWave, TypewriterReveal } from "@/components/ui/ScrollEffects";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-24 md:pt-32 mb-24 relative">
      {/* Water wave background effect */}
      <WaterWave className="pointer-events-none" />
      
      {/* Decorative Grid Lines with parallax */}
      <ParallaxContainer speed={0.2} className="absolute top-0 left-6 w-px h-full bg-tiscu-navy/5 hidden lg:block pointer-events-none">
        <div className="w-full h-full" />
      </ParallaxContainer>
      <ParallaxContainer speed={0.2} className="absolute top-0 right-6 w-px h-full bg-tiscu-navy/5 hidden lg:block pointer-events-none">
        <div className="w-full h-full" />
      </ParallaxContainer>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
        <div className="lg:col-span-8">
          <ParallaxContainer speed={0.3}>
            <FadeIn>
              <div className="inline-block border-b border-tiscu-steel pb-1 mb-6">
                <span className="font-mono text-xs text-tiscu-steel uppercase tracking-widest">
                  Est. 2024 — Architecture &amp; Strategy
                </span>
              </div>
            </FadeIn>
          </ParallaxContainer>

          <TypewriterReveal delay={0.1}>
            <h1
              className="font-grotesk text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tighter leading-[0.9] text-tiscu-muted mb-6"
              style={{ letterSpacing: "0.2em" }}
            >
              TISCU
            </h1>
          </TypewriterReveal>

          <ParallaxContainer speed={0.4}>
            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-tiscu-steel max-w-2xl leading-relaxed font-light">
                Business Architecture{" "}
                <span className="text-tiscu-navy">+</span>
                Strategy Consulting.
                Constructing high-impact corporate frameworks through structural
                rigor and strategic foresight.
              </p>
            </FadeIn>
          </ParallaxContainer>
        </div>

        <ScaleOnScroll scaleRange={[0.9, 1]} className="lg:col-span-4">
          <FadeIn delay={0.3} direction="right" className="lg:col-span-4">
            <div className="flex flex-col justify-end items-start lg:items-end border-l border-tiscu-navy/10 pl-6 lg:pl-0 lg:border-l-0">
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-left lg:text-right">
                <div>
                  <span className="block font-mono text-xs text-tiscu-muted mb-1">
                    DATASETS
                  </span>
                  <span className="font-grotesk text-2xl md:text-3xl font-medium tracking-tight text-tiscu-navy">
                    85<span className="text-sm align-top">%</span>
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-xs text-tiscu-muted mb-1">
                    OPTIMIZATION
                  </span>
                  <span className="font-grotesk text-2xl md:text-3xl font-medium tracking-tight text-tiscu-navy">
                    3.5<span className="text-sm align-top">x</span>
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>
        </ScaleOnScroll>
      </div>
    </section>
  );
}
