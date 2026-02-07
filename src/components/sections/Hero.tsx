"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useSpring, useTransform, useMotionValue, useReducedMotion } from "framer-motion";
import { Triangle } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { ParallaxContainer, ScaleOnScroll, WaterWave, TypewriterReveal } from "@/components/ui/ScrollEffects";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  // Mouse tracking for 3D effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-15, 15]);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      setMousePosition({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [mouseX, mouseY]);

  return (
    <div className="relative min-h-screen bg-tiscu-bg overflow-hidden">

      {/* HUD Header */}
      <header className="relative z-10 border-b border-tiscu-muted/20 h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border border-tiscu-navy rounded-full relative flex items-center justify-center">
            <div className="absolute w-full h-0.5 bg-tiscu-navy" />
            <div className="absolute h-full w-0.5 bg-tiscu-navy" />
          </div>
          <span className="font-mono text-xs text-tiscu-steel uppercase tracking-widest">
            BUSINESS<br />ARCHITECTURE
          </span>
        </div>
        
        <div className="w-px h-8 bg-tiscu-muted/30" />
        
        <div className="font-grotesk font-bold text-xl text-tiscu-navy tracking-tighter">
          TISCU/01
        </div>
      </header>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-[70vh] flex items-center justify-center border-b border-tiscu-muted/20"
      >
        {/* Left Consultant Placeholder */}
        <div className="absolute left-0 top-0 h-full w-1/4 bg-tiscu-navy/5 border-r border-tiscu-muted/20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-48 bg-tiscu-steel/20 rounded-lg mb-4 mx-auto border border-tiscu-muted/30" />
            <p className="font-mono text-xs text-tiscu-muted uppercase tracking-widest">Consultant 01</p>
          </div>
        </div>

        {/* Right Consultant Placeholder */}
        <div className="absolute right-0 top-0 h-full w-1/4 bg-tiscu-navy/5 border-l border-tiscu-muted/20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-48 bg-tiscu-steel/20 rounded-lg mb-4 mx-auto border border-tiscu-muted/30" />
            <p className="font-mono text-xs text-tiscu-muted uppercase tracking-widest">Consultant 02</p>
          </div>
        </div>

        {/* Giant Type Treatment */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <TypewriterReveal delay={0.1}>
            <h1
              className="font-grotesk text-[clamp(6rem,18vw,20rem)] font-black leading-[0.85] text-tiscu-navy uppercase tracking-tighter text-center"
              style={{ letterSpacing: "-0.06em" }}
            >
              TISCU
            </h1>
          </TypewriterReveal>
        </div>

        {/* Glass Triangle Visual Element */}
        <div
          className="absolute w-[400px] h-[400px] flex items-center justify-center z-30"
          style={{
            transform: 'rotate(-10deg)',
            transformStyle: 'preserve-3d'
          }}
        >
          <Triangle 
            className="w-80 h-80 fill-white text-white drop-shadow-lg stroke-none"
            style={{
              filter: `
                drop-shadow(0 0 10px rgba(57, 69, 93, 0.2))
                drop-shadow(5px 10px 20px rgba(57, 69, 93, 0.1))
              `
            }}
          />
        </div>


        {/* Meta Coordinates */}
        <div className="absolute bottom-6 left-6 font-grotesk font-bold text-sm text-tiscu-navy z-10">
          <span className="font-mono text-xs text-tiscu-muted block mb-1">T-SQUARE PRINCIPLE</span>
          "STRUCTURE<br />PRECISION<br />EXCELLENCE"
        </div>

        {/* Recipe Meta Grid */}
        <div className="absolute bottom-6 right-6 text-right font-grotesk text-sm text-tiscu-steel z-10">
          <div>EST: 2024</div>
          <div>ACTIVE: 2 YEARS</div>
          <div className="mt-2 font-mono text-xs text-tiscu-muted">A-TIER FRAMEWORK</div>
        </div>
      </section>

      {/* Content Deck */}
      <main className="bg-tiscu-steel/10 grid grid-cols-1 lg:grid-cols-12 min-h-[40vh] relative">
        {/* Sidebar */}
        <aside className="lg:col-span-4 p-8 border-r border-tiscu-muted/20 flex flex-col justify-between">
          <div>
            <h2 className="font-grotesk text-2xl font-medium mb-2 tracking-tight">PRINCIPLES</h2>
            <h1 className="font-grotesk text-4xl lg:text-5xl font-bold leading-[0.9] tracking-tighter text-tiscu-navy uppercase mb-6">
              STRUCTURAL<br />EXCELLENCE
            </h1>
            <div className="w-16 h-0.5 bg-tiscu-navy mb-6" />
            <blockquote className="text-sm text-tiscu-steel leading-relaxed font-light italic">
              "The T-Square Principle: Precision in measurement creates excellence in structure. Every framework begins with a perfect right angle. In business architecture, as in technical drawing, the true measure of success lies not in complexity, but in the clarity of fundamental lines and the strength of their intersections. We build not just plans, but foundations that stand the test of market forces and organizational dynamics."
            </blockquote>
          </div>
          <div className="font-mono text-xs text-tiscu-muted mt-8 leading-relaxed">
            GLOBAL — CONSULTING<br />
            2024 — PRESENT
          </div>
        </aside>

        {/* Interactive Service List */}
        <div className="lg:col-span-8">
          {[
            { id: '01', service: 'Business Architecture', meta: 'STRATEGIC / FRAMEWORK' },
            { id: '02', service: 'Process Optimization', meta: 'EFFICIENCY / SCALING' },
            { id: '03', service: 'Data Architecture', meta: 'INTELLIGENCE / INSIGHTS' },
            { id: '04', service: 'Strategic Planning', meta: 'ROADMAP / EXECUTION' },
            { id: '05', service: 'Change Management', meta: 'TRANSFORMATION / ADOPTION' },
            { id: '06', service: 'Performance Analytics', meta: 'METRICS / KPI' }
          ].map((item, index) => (
            <motion.div
              key={item.id}
              className="grid grid-cols-12 items-center px-8 py-6 border-b border-tiscu-muted/10 cursor-pointer transition-all duration-200 hover:bg-tiscu-bg/50"
              whileHover={{ x: 8 }}
              transition={{ duration: 0.2 }}
            >
              <span className="col-span-1 font-mono text-xs text-tiscu-muted">{item.id}</span>
              <span className="col-span-8 font-grotesk text-lg font-semibold tracking-tight text-tiscu-navy uppercase">
                {item.service}
              </span>
              <span className="col-span-3 font-mono text-xs text-tiscu-steel text-right">
                {item.meta}
              </span>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Brand Strip */}
      <footer className="border-t border-tiscu-muted/20 p-6 bg-tiscu-steel/10 flex gap-12 items-center overflow-x-auto">
        <div className="flex items-center gap-2 font-grotesk font-bold text-sm text-tiscu-navy uppercase">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          ARCHITECTURE
        </div>
        <div className="flex items-center gap-2 font-grotesk font-bold text-sm text-tiscu-navy uppercase">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          STRATEGY
        </div>
        <div className="flex items-center gap-2 font-grotesk font-bold text-sm text-tiscu-navy uppercase">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          CONSULTING
        </div>
        <div className="ml-auto font-mono text-xs text-tiscu-muted opacity-50">
          TISCU/01
        </div>
      </footer>

      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-8 right-8 w-16 h-16 bg-tiscu-navy text-tiscu-bg rounded-full flex items-center justify-center text-2xl shadow-xl z-50 cursor-pointer"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2, type: "spring", stiffness: 400, damping: 10 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      </motion.button>
    </div>
  );
}
