import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { NavigationSection } from "@/components/NavigationSection";
import { ProductSection } from "@/components/ProductSection";
import { QualitySection } from "@/components/QualitySection";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";
import { PersonalContactSection } from "@/components/PersonalContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <NavigationSection />
        <ProductSection />
        <QualitySection />
        <ContactSection />
        <PersonalContactSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
