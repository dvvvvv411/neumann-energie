import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${heroImage})`,
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Zuverlässige Heizölversorgung für Ihr Unternehmen
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 leading-relaxed text-white/90 max-w-3xl mx-auto">
            Professionelle Energielösungen für Geschäftskunden. 
            Qualität, Zuverlässigkeit und Service, auf den Sie sich verlassen können.
          </p>
          
          <Button 
            variant="knauber" 
            size="lg"
            className="text-lg px-8 py-6 h-auto"
          >
            Heizöl kaufen
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}