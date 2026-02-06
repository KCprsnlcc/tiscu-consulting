"use client";

import { useEffect, useState } from "react";

export default function LenisTest() {
  const [scrollY, setScrollY] = useState(0);
  const [isLenisActive, setIsLenisActive] = useState(false);

  useEffect(() => {
    // Check if Lenis is active
    const checkLenis = () => {
      const hasLenis = typeof window !== 'undefined' && 'lenis' in window;
      setIsLenisActive(hasLenis);
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    checkLenis();
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-tiscu-navy/90 text-white p-3 rounded-lg text-xs font-mono z-50 backdrop-blur-sm">
      <div>Lenis: {isLenisActive ? '✅ Active' : '❌ Inactive'}</div>
      <div>Scroll: {Math.round(scrollY)}px</div>
    </div>
  );
}
