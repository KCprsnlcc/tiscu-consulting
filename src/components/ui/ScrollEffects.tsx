"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue, Variants } from "framer-motion";

// Hook for detecting reduced motion preference
const useReducedMotion = () => {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduceMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setShouldReduceMotion(e.matches);
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  
  return shouldReduceMotion;
};

// Water-like spring configuration for fluid animations
const waterSpring = {
  stiffness: 100,
  damping: 20,
  mass: 1,
  restDelta: 0.001,
};

// Parallax effect component
export const ParallaxContainer = ({ 
  children, 
  speed = 0.5, 
  className = ""
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const shouldReduceMotion = useReducedMotion();
  
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, speed * 100]
  );
  
  const springY = useSpring(y, waterSpring);
  
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y: springY }}>
        {children}
      </motion.div>
    </div>
  );
};

// Fluid scale effect on scroll
export const ScaleOnScroll = ({ 
  children, 
  scaleRange = [0.8, 1],
  className = ""
}: {
  children: React.ReactNode;
  scaleRange?: [number, number];
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const shouldReduceMotion = useReducedMotion();
  
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : scaleRange
  );
  
  const springScale = useSpring(scale, waterSpring);
  
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ scale: springScale }}>
        {children}
      </motion.div>
    </div>
  );
};

// Water wave effect for backgrounds
export const WaterWave = ({ 
  className = "",
  amplitude = 20,
  frequency = 0.01
}: {
  className?: string;
  amplitude?: number;
  frequency?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const shouldReduceMotion = useReducedMotion();
  
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, amplitude]
  );
  
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-2, 2]
  );
  
  const springY = useSpring(y, { ...waterSpring, stiffness: 80 });
  const springRotate = useSpring(rotate, { ...waterSpring, stiffness: 60 });
  
  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={{
          y: springY,
          rotate: springRotate,
          background: `radial-gradient(ellipse at center, 
            rgba(57, 69, 93, 0.03) 0%, 
            transparent 70%)`,
        }}
      />
    </div>
  );
};

// Typography reveal with fluid animation
export const TypewriterReveal = ({ 
  children, 
  delay = 0,
  className = ""
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const shouldReduceMotion = useReducedMotion();
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);
  const y = useTransform(
    scrollYProgress, 
    [0, 0.3, 1], 
    shouldReduceMotion ? [0, 0, 0] : [30, 0, 0]
  );
  
  // Apply delay by adjusting the scroll progress threshold
  const delayedOpacity = useTransform(
    scrollYProgress,
    [0, Math.max(0.3 + delay * 0.5, 0.3), 1],
    [0, 1, 1]
  );
  
  const delayedY = useTransform(
    scrollYProgress,
    [0, Math.max(0.3 + delay * 0.5, 0.3), 1],
    shouldReduceMotion ? [0, 0, 0] : [30, 0, 0]
  );
  
  const springOpacity = useSpring(delayedOpacity, waterSpring);
  const springY = useSpring(delayedY, waterSpring);
  
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ opacity: springOpacity, y: springY }}>
        {children}
      </motion.div>
    </div>
  );
};

// Staggered children animation
export const StaggerContainer = ({ 
  children, 
  staggerDelay = 0.1,
  className = "",
  direction = "up"
}: {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  const dirMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };
  
  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      ...(shouldReduceMotion ? {} : dirMap[direction])
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.6,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    },
  };
  
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div key={i} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Magnetic button effect
export const MagneticButton = ({ 
  children, 
  className = "",
  strength = 0.3,
  type = "button"
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  type?: "button" | "submit" | "reset";
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    
    setPosition({ x: deltaX, y: deltaY });
  };
  
  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };
  
  return (
    <motion.button
      ref={ref}
      type={type}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.button>
  );
};

// Progress indicator for scroll
export const ScrollProgress = ({ 
  className = "",
  color = "#39455D"
}: {
  className?: string;
  color?: string;
}) => {
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });
  
  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 origin-left z-50 ${className}`}
      style={{ scaleX, backgroundColor: color }}
    />
  );
};
