import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { NavigationSection } from "@/components/NavigationSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <NavigationSection />
      </main>
    </div>
  );
};

export default Index;
