"use client";

import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { StaggerContainer, TypewriterReveal, ParallaxContainer } from "@/components/ui/ScrollEffects";
import { TISCU_LETTERS } from "@/lib/constants";

export default function TiscuConcept() {
  return (
    <section id="concept" className="border-t border-tiscu-navy/10 bg-tiscu-bg">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[800px]">
        {/* Left: Typographic Deconstruction */}
        <div className="lg:col-span-7 py-16 px-6 lg:pr-16 lg:border-r border-tiscu-navy/10 flex flex-col justify-between relative">
          
          <div className="space-y-12 z-10">
            <div>
              <TypewriterReveal delay={0}>
                <h2 className="font-grotesk text-3xl font-medium tracking-tight mb-8 text-tiscu-navy">
                  The T-Square Philosophy
                </h2>
              </TypewriterReveal>
              <FadeIn delay={0.1}>
                <p className="text-xs text-tiscu-steel uppercase tracking-wider font-mono mb-4">
                  Fig 1.0 — Architectural Alignment
                </p>
              </FadeIn>
              <TypewriterReveal delay={0.15}>
                <p className="text-lg leading-relaxed text-tiscu-navy max-w-xl">
                  Inspired by the simple yet critical &ldquo;T-Square&rdquo; used
                  by architects. Like the letters of the word, TISCU understands
                  that businesses traverse various phases, requiring distinct
                  approaches to push further for growth.
                </p>
              </TypewriterReveal>
            </div>

            {/* Deconstructed Letters Grid */}
            <StaggerContainer staggerDelay={0.12} direction="up" className="grid gap-8">
              {TISCU_LETTERS.map((item, i) => (
                <motion.div
                  key={item.letter}
                  className="group border-l-2 border-tiscu-steel/30 hover:border-tiscu-navy pl-6 transition-colors duration-500 cursor-pointer"
                >
                  <h3 className="font-grotesk text-4xl font-semibold mb-2 text-tiscu-navy">
                    {item.combined ? (
                      <>
                        {item.letter}
                        <span className="text-tiscu-muted text-2xl font-light">
                          {" "}
                          +{" "}
                        </span>
                        {item.combined}
                      </>
                    ) : (
                      <>
                        {item.letter}
                        <span className="text-tiscu-steel text-lg font-normal">
                          {item.word}
                        </span>
                      </>
                    )}
                  </h3>
                  <p className="text-tiscu-steel text-base group-hover:text-tiscu-navy transition-colors">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </div>

        {/* Right: Vertical Concept Title + Blueprint Aesthetic */}
        <div className="lg:col-span-5 bg-tiscu-navy text-tiscu-bg relative overflow-hidden flex flex-col justify-between p-8 md:p-12">
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(#EEF0F3 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative z-10 flex justify-between items-start">
            <div className="w-12 h-12 border border-tiscu-muted rounded-full flex items-center justify-center">
              <Compass className="w-6 h-6 text-tiscu-muted" />
            </div>
            <span className="font-mono text-xs tracking-widest text-tiscu-muted text-right">
              REF: 24-B
              <br />
              SEC: HERO
            </span>
          </div>

          <div className="relative z-10 h-full flex items-center justify-center lg:justify-end py-12">
            <h2
              className="font-grotesk text-6xl md:text-8xl font-semibold tracking-tight text-tiscu-bg opacity-90"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              THE TISCU CONCEPT
            </h2>
          </div>

          <div className="relative z-10 border-t border-tiscu-muted/30 pt-6">
            <p className="font-mono text-xs text-tiscu-muted uppercase tracking-widest mb-2">
              Primary Directive
            </p>
            <p className="text-lg font-light leading-snug text-tiscu-bg">
              Anchoring business tailored structures for resource optimization.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
