import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import TiscuConcept from "@/components/sections/TiscuConcept";
import TiscuTriangle from "@/components/sections/TiscuTriangle";
import BookConsultation from "@/components/sections/BookConsultation";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="bg-tiscu-bg text-tiscu-navy font-sans antialiased">
      <Navbar />
      <Hero />
      <TiscuConcept />
      <TiscuTriangle />
      <BookConsultation />
      <Footer />
    </main>
  );
}
