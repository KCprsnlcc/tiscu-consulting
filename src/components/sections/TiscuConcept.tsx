"use client";

import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { StaggerContainer, TypewriterReveal, ParallaxContainer } from "@/components/ui/ScrollEffects";
import { TISCU_LETTERS } from "@/lib/constants";

export default function TiscuConcept() {
  return (
    <section id="concept" className="border-t border-tiscu-navy/10 bg-tiscu-bg">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
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
        <div className="lg:col-span-5 bg-tiscu-navy text-tiscu-bg relative overflow-hidden flex flex-col justify-between p-6 md:p-8">
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(#EEF0F3 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative z-10 flex justify-between items-start">
            <div className="w-8 h-8 border border-tiscu-muted rounded-full flex items-center justify-center">
              <Compass className="w-4 h-4 text-tiscu-muted" />
            </div>
            <span className="font-mono text-xs tracking-widest text-tiscu-muted text-right">
              REF: 24-B
              <br />
              SEC: HERO
            </span>
          </div>

          <div className="relative z-10 h-full flex items-center justify-center lg:justify-end gap-8">
            {/* Photo */}
            <div className="hidden lg:block w-64 h-4/5 rounded-lg border border-tiscu-muted/30 overflow-hidden relative group bg-tiscu-navy">
              {/* Sharp linear curves */}
              <div className="absolute inset-0">
                <div className="absolute inset-x-0 top-0 h-1/2 bg-tiscu-navy/60 transform skew-y-3 origin-top"></div>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-tiscu-blue/60 transform -skew-y-3 origin-bottom"></div>
              </div>
              
              {/* Linear white abstract effect */}
              <div className="absolute inset-0">
                <div className="absolute top-1/4 left-0 w-full h-px bg-white/40 transform rotate-12 scale-x-150"></div>
                <div className="absolute top-1/2 left-0 w-full h-px bg-white/30 transform -rotate-6 scale-x-125"></div>
                <div className="absolute top-3/4 left-0 w-full h-px bg-white/35 transform rotate-3 scale-x-140"></div>
                <div className="absolute top-1/6 right-0 w-2/3 h-px bg-white/25 transform rotate-45"></div>
                <div className="absolute bottom-1/6 left-0 w-1/2 h-px bg-white/20 transform -rotate-30"></div>
              </div>
              
              {/* Sharp linear accent */}
              <div className="absolute inset-x-0 top-1/3 h-px bg-tiscu-navy/80 transform rotate-2"></div>
              <div className="absolute inset-x-0 bottom-1/3 h-px bg-tiscu-blue/80 transform -rotate-2"></div>
              
              {/* Image with enhanced styling */}
              <img 
                src="/jerico-lugo.png" 
                alt="Jerico Lugo" 
                className="w-full h-full object-cover relative z-10 rounded-lg transform scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              
              {/* Sharp geometric borders */}
              <div className="absolute inset-0 rounded-lg pointer-events-none">
                <div className="absolute inset-0 rounded-lg border-2 border-tiscu-muted/40"></div>
                <div className="absolute inset-2 rounded-lg border border-tiscu-muted/20"></div>
              </div>
              
              {/* Sharp linear glow on hover */}
              <div className="absolute -inset-1 bg-tiscu-navy/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            <h2
              className="font-grotesk text-6xl md:text-8xl font-semibold tracking-tight text-tiscu-bg opacity-90"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              THE TISCU<br />CONCEPT
            </h2>
          </div>

          <div className="relative z-10 border-t border-tiscu-muted/30 pt-4">
            <p className="font-mono text-xs text-tiscu-muted uppercase tracking-widest mb-2">
              Primary Directive
            </p>
            <p className="text-sm font-light leading-snug text-tiscu-bg">
              Anchoring business tailored structures for resource optimization.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
