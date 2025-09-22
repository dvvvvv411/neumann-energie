import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { NavigationSection } from "@/components/NavigationSection";
import { ProductSection } from "@/components/ProductSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <NavigationSection />
        <ProductSection />
      </main>
    </div>
  );
};

export default Index;
