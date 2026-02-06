"use client";

import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { StaggerContainer, TypewriterReveal, ParallaxContainer } from "@/components/ui/ScrollEffects";
import { TISCU_LETTERS } from "@/lib/constants";

export default function TiscuConceptMobile() {
  return (
    <section id="concept" className="border-t border-tiscu-navy/10 bg-tiscu-bg">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <TypewriterReveal delay={0}>
            <h2 className="font-grotesk text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-tiscu-navy">
              The T-Square Philosophy
            </h2>
          </TypewriterReveal>
          <FadeIn delay={0.1}>
            <p className="text-xs text-tiscu-steel uppercase tracking-wider font-mono mb-4">
              Fig 1.0 — Architectural Alignment
            </p>
          </FadeIn>
          <TypewriterReveal delay={0.15}>
            <p className="text-base leading-relaxed text-tiscu-navy">
              Inspired by the simple yet critical &ldquo;T-Square&rdquo; used
              by architects. Like the letters of the word, TISCU understands
              that businesses traverse various phases, requiring distinct
              approaches to push further for growth.
            </p>
          </TypewriterReveal>
        </div>

        {/* Deconstructed Letters Grid - Mobile Optimized */}
        <StaggerContainer staggerDelay={0.1} direction="up" className="space-y-6 mb-12">
          {TISCU_LETTERS.map((item, i) => (
            <motion.div
              key={item.letter}
              className="group border-l-2 border-tiscu-steel/30 hover:border-tiscu-navy pl-4 transition-colors duration-500 cursor-pointer"
            >
              <h3 className="font-grotesk text-3xl sm:text-4xl font-semibold mb-2 text-tiscu-navy">
                {item.combined ? (
                  <>
                    {item.letter}
                    <span className="text-tiscu-muted text-xl font-light">
                      {" "}
                      +{" "}
                    </span>
                    {item.combined}
                  </>
                ) : (
                  <>
                    {item.letter}
                    <span className="text-tiscu-steel text-base font-normal block sm:inline sm:ml-2">
                      {item.word}
                    </span>
                  </>
                )}
              </h3>
              <p className="text-tiscu-steel text-sm sm:text-base group-hover:text-tiscu-navy transition-colors leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </StaggerContainer>

        {/* Mobile Blueprint Section */}
        <div className="bg-tiscu-navy text-tiscu-bg relative overflow-hidden rounded-lg p-6">
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(#EEF0F3 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <div className="text-left">
                <p className="font-grotesk text-sm font-medium text-tiscu-muted mb-1">
                  Business Architecture
                </p>
                <p className="font-mono text-xs text-tiscu-muted/70">
                  Strategic Framework
                </p>
              </div>
              <span className="font-mono text-xs tracking-widest text-tiscu-muted text-right">
                REF: 24-B
                <br />
                SEC: HERO
              </span>
            </div>

            {/* Mobile Image Section */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
              <div className="w-full sm:w-48 h-48 sm:h-56 rounded-lg border border-tiscu-muted/30 overflow-hidden relative bg-tiscu-navy">
                {/* Sharp linear curves - simplified for mobile */}
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
                
                {/* Image */}
                <img 
                  src="/jerico-lugo.png" 
                  alt="Jerico Lugo" 
                  className="w-full h-full object-cover relative z-10 rounded-lg transform scale-105"
                />
                
                {/* Sharp geometric borders */}
                <div className="absolute inset-0 rounded-lg pointer-events-none">
                  <div className="absolute inset-0 rounded-lg border-2 border-tiscu-muted/40"></div>
                  <div className="absolute inset-2 rounded-lg border border-tiscu-muted/20"></div>
                </div>
              </div>
              
              {/* Vertical Title - Mobile Optimized */}
              <h2
                className="font-grotesk text-4xl sm:text-5xl font-semibold tracking-tight text-tiscu-bg opacity-90 text-center sm:text-left"
              >
                THE TISCU<br />CONCEPT
              </h2>
            </div>

            {/* Footer */}
            <div className="border-t border-tiscu-muted/30 pt-4">
              <p className="font-mono text-xs text-tiscu-muted uppercase tracking-widest mb-2">
                Primary Directive
              </p>
              <p className="text-sm font-light leading-snug text-tiscu-bg">
                Anchoring business tailored structures for resource optimization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
