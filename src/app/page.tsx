import NavbarClient from "@/components/sections/NavbarClient";
import HeroClient from "@/components/sections/HeroClient";
import TiscuConceptClient from "@/components/sections/TiscuConceptClient";
import TiscuTriangleClient from "@/components/sections/TiscuTriangleClient";
import BookConsultationClient from "@/components/sections/BookConsultationClient";
import FooterClient from "@/components/sections/FooterClient";
import ScrollProgressClient from "@/components/ui/ScrollProgressClient";

export default function Home() {
  return (
    <main className="bg-tiscu-bg text-tiscu-navy font-sans antialiased">
      <ScrollProgressClient />
      <NavbarClient />
      <HeroClient />
      <TiscuConceptClient />
      <TiscuTriangleClient />
      <BookConsultationClient />
      <FooterClient />
    </main>
  );
}
