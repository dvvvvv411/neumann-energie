import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { NavigationSection } from "@/components/NavigationSection";
import { ProductSection } from "@/components/ProductSection";
import { QualitySection } from "@/components/QualitySection";
import { FAQSection } from "@/components/FAQSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <NavigationSection />
        <ProductSection />
        <QualitySection />
        <FAQSection />
      </main>
    </div>
  );
};

export default Index;
