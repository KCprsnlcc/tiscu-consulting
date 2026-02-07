"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useSpring, useTransform, useMotionValue, useReducedMotion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import { ParallaxContainer, ScaleOnScroll, WaterWave, TypewriterReveal } from "@/components/ui/ScrollEffects";

export default function HeroMobile() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  // Simplified mouse tracking for mobile
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-10, 10]);
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

      {/* Mobile HUD Header */}
      <header className="relative z-10 border-b border-tiscu-muted/20 h-14 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border border-tiscu-navy rounded-full relative flex items-center justify-center">
            <div className="absolute w-full h-0.5 bg-tiscu-navy" />
            <div className="absolute h-full w-0.5 bg-tiscu-navy" />
          </div>
          <span className="font-mono text-[10px] text-tiscu-steel uppercase tracking-widest leading-tight">
            BUSINESS<br />ARCHITECTURE
          </span>
        </div>
        
        <div className="w-px h-6 bg-tiscu-muted/30" />
        
        <div className="font-grotesk font-bold text-sm text-tiscu-navy tracking-tighter">
          TISCU/01
        </div>
      </header>

      {/* Mobile Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-[60vh] flex items-center justify-center border-b border-tiscu-muted/20"
      >
        {/* Mobile Consultant Placeholders - Simplified */}
        <div className="absolute left-0 top-0 h-full w-1/6 bg-tiscu-navy/5 border-r border-tiscu-muted/20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-24 bg-tiscu-steel/20 rounded mb-2 mx-auto border border-tiscu-muted/30" />
            <p className="font-mono text-[8px] text-tiscu-muted uppercase tracking-widest leading-tight">C1</p>
          </div>
        </div>

        <div className="absolute right-0 top-0 h-full w-1/6 bg-tiscu-navy/5 border-l border-tiscu-muted/20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-24 bg-tiscu-steel/20 rounded mb-2 mx-auto border border-tiscu-muted/30" />
            <p className="font-mono text-[8px] text-tiscu-muted uppercase tracking-widest leading-tight">C2</p>
          </div>
        </div>

        {/* Giant Type Treatment - Mobile */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
          <TypewriterReveal delay={0.1}>
            <h1
              className="font-grotesk text-[clamp(4rem,15vw,8rem)] font-black leading-[0.85] text-tiscu-navy uppercase tracking-tighter text-center"
              style={{ letterSpacing: "-0.06em" }}
            >
              TISCU
            </h1>
          </TypewriterReveal>
        </div>

        {/* Simplified Glass Triangle - Mobile */}
        <motion.div
          className="absolute w-[200px] h-[200px] overflow-hidden"
          style={{
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            background: `radial-gradient(circle at 30% 30%, rgba(57, 69, 93, 0.1), rgba(109, 131, 151, 0.05))`,
            border: '1px solid rgba(152, 167, 181, 0.3)',
            boxShadow: `
              inset 0 0 15px rgba(57, 69, 93, 0.2),
              5px 10px 25px rgba(57, 69, 93, 0.1)
            `,
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: 'preserve-3d'
          }}
          animate={shouldReduceMotion ? {} : {
            y: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Inner layers for glass effect - simplified */}
          <div className="absolute inset-0 bg-gradient-to-br from-tiscu-navy/5 to-tiscu-steel/10" 
               style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
          <div className="absolute top-8 right-8 w-12 h-6 bg-white rounded-full blur-sm rotate-[-45deg] opacity-60" />
        </motion.div>


        {/* Mobile Meta Coordinates */}
        <div className="absolute bottom-4 left-4 font-grotesk font-bold text-xs text-tiscu-navy z-10">
          <span className="font-mono text-[8px] text-tiscu-muted block mb-1">T-SQUARE PRINCIPLE</span>
          "STRUCTURE<br />PRECISION<br />EXCELLENCE"
        </div>

        {/* Mobile Recipe Meta */}
        <div className="absolute bottom-4 right-4 text-right font-grotesk text-xs text-tiscu-steel z-10">
          <div>EST: 2024</div>
          <div>ACTIVE: 2Y</div>
          <div className="mt-1 font-mono text-[8px] text-tiscu-muted">A-TIER</div>
        </div>
      </section>

      {/* Mobile Content Deck */}
      <main className="bg-tiscu-steel/10 min-h-[40vh] relative">
        {/* Mobile Sidebar */}
        <aside className="p-6 border-b border-tiscu-muted/20">
          <div>
            <h2 className="font-grotesk text-xl font-medium mb-2 tracking-tight">PRINCIPLES</h2>
            <h1 className="font-grotesk text-3xl font-bold leading-[0.9] tracking-tighter text-tiscu-navy uppercase mb-4">
              STRUCTURAL<br />EXCELLENCE
            </h1>
            <div className="w-12 h-0.5 bg-tiscu-navy mb-4" />
            <blockquote className="text-xs text-tiscu-steel leading-relaxed font-light italic">
              "The T-Square Principle: Precision in measurement creates excellence in structure. Every framework begins with a perfect right angle. In business architecture, as in technical drawing, the true measure of success lies not in complexity, but in the clarity of fundamental lines and the strength of their intersections. We build not just plans, but foundations that stand the test of market forces and organizational dynamics."
            </blockquote>
          </div>
          <div className="font-mono text-[8px] text-tiscu-muted mt-6 leading-relaxed">
            GLOBAL — CONSULTING<br />
            2024 — PRESENT
          </div>
        </aside>

        {/* Mobile Service List */}
        <div className="px-6 py-4">
          {[
            { id: '01', service: 'Business Architecture' },
            { id: '02', service: 'Process Optimization' },
            { id: '03', service: 'Data Architecture' },
            { id: '04', service: 'Strategic Planning' },
            { id: '05', service: 'Change Management' },
            { id: '06', service: 'Performance Analytics' }
          ].map((item, index) => (
            <motion.div
              key={item.id}
              className="grid grid-cols-12 items-center py-3 border-b border-tiscu-muted/10 cursor-pointer transition-all duration-200"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <span className="col-span-2 font-mono text-xs text-tiscu-muted">{item.id}</span>
              <span className="col-span-10 font-grotesk text-sm font-semibold tracking-tight text-tiscu-navy uppercase">
                {item.service}
              </span>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Mobile Brand Strip */}
      <footer className="border-t border-tiscu-muted/20 p-4 bg-tiscu-steel/10 flex gap-6 items-center overflow-x-auto">
        <div className="flex items-center gap-1 font-grotesk font-bold text-xs text-tiscu-navy uppercase">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          ARCHITECTURE
        </div>
        <div className="flex items-center gap-1 font-grotesk font-bold text-xs text-tiscu-navy uppercase">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          STRATEGY
        </div>
        <div className="flex items-center gap-1 font-grotesk font-bold text-xs text-tiscu-navy uppercase">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          CONSULTING
        </div>
        <div className="ml-auto font-mono text-[8px] text-tiscu-muted opacity-50">
          TISCU/01
        </div>
      </footer>

      {/* Mobile Floating Action Button */}
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 bg-tiscu-navy text-tiscu-bg rounded-full flex items-center justify-center text-xl shadow-xl z-50 cursor-pointer"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2, type: "spring", stiffness: 400, damping: 10 }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      </motion.button>
    </div>
  );
}
