import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
// Logo will be referenced directly

export function HeroSection() {
  return (
    <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(/lovable-uploads/neumannbanner2.png.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-white">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Ihr zuverlässiger Partner für deutschlandweite Heizöl-Lieferung
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 leading-relaxed text-white/90 max-w-3xl">
            Mit über 25 Jahren Erfahrung beliefern wir Sie schnell, zuverlässig und zu fairen Preisen. Persönlicher Service, höchste Qualität und optional CO₂-kompensiert – so heizen Sie mit gutem Gewissen.
          </p>
          
          <Button 
            variant="modern" 
            size="lg"
            className="text-2xl px-8 py-6 h-auto gap-4 rounded-2xl group"
            style={{ color: '#0c2a3e' }}
            onClick={() => {
              document.getElementById('produkte')?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }}
          >
            Heizöl kaufen
            <ArrowUpRight className="w-8 h-8 text-white transition-transform duration-300 group-hover:rotate-45" />
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