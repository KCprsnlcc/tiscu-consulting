"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import TiscuConcept from "@/components/sections/TiscuConcept";
import TiscuTriangle from "@/components/sections/TiscuTriangle";
import BookConsultation from "@/components/sections/BookConsultation";
import Footer from "@/components/sections/Footer";
import { ScrollProgress } from "@/components/ui/ScrollEffects";

// Mobile components
import HeroMobile from "@/components/sections/mobile/HeroMobile";
import TiscuConceptMobile from "@/components/sections/mobile/TiscuConceptMobile";
import TiscuTriangleMobile from "@/components/sections/mobile/TiscuTriangleMobile";
import BookConsultationMobile from "@/components/sections/mobile/BookConsultationMobile";
import FooterMobile from "@/components/sections/mobile/FooterMobile";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <main className="bg-tiscu-bg text-tiscu-navy font-sans antialiased">
      <ScrollProgress />
      <Navbar />
      {isMobile ? <HeroMobile /> : <Hero />}
      {isMobile ? <TiscuConceptMobile /> : <TiscuConcept />}
      {isMobile ? <TiscuTriangleMobile /> : <TiscuTriangle />}
      {isMobile ? <BookConsultationMobile /> : <BookConsultation />}
      {isMobile ? <FooterMobile /> : <Footer />}
    </main>
  );
}
