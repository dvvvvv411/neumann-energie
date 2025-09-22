import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Award, Shield } from "lucide-react";

const products = [
  {
    id: "standard",
    title: "Heizöl DIN schwefelarm",
    subtitle: "Der bewährte Standard",
    badge: "BEWÄHRT",
    badgeVariant: "secondary" as const,
    features: [
      "Raffinerie-Standard-Qualität",
      "Schwefelarm 50 ppm",
      "Zuverlässiger Heizbetrieb",
      "Erfüllt DIN 51603-1",
      "Frei von Zusätzen"
    ],
    cardStyle: "bg-gradient-to-br from-white to-secondary/20 hover:shadow-[var(--shadow-card)]",
    icon: Shield
  },
  {
    id: "premium", 
    title: "Sparheizöl schwefelarm",
    subtitle: "Maximale Effizienz & Ersparnis",
    badge: "EMPFOHLEN",
    badgeVariant: "default" as const,
    savings: "6-8% ERSPARNIS",
    features: [
      "6 - 8 % Ersparnis gegenüber Heizöl DIN",
      "Nahezu schadstofffreie Verbrennung",
      "CO₂-Kompensation verfügbar",
      "Höchste Energieeffizienz",
      "Stark reduzierte Rußbildung"
    ],
    cardStyle: "bg-gradient-to-br from-primary/5 via-white to-success/5 hover:shadow-[var(--shadow-recommended)] border-2 border-primary/20",
    icon: Award,
    isRecommended: true
  }
];

export function ProductSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Wählen Sie Ihr Heizöl
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professionelle Heizöl-Lösungen für höchste Ansprüche
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {products.map((product) => {
            const IconComponent = product.icon;
            return (
              <Card 
                key={product.id} 
                className={`
                  relative h-full flex flex-col transition-all duration-500 hover:scale-[1.02] 
                  ${product.cardStyle}
                  ${product.isRecommended ? 'lg:scale-105 ring-2 ring-primary/30' : ''}
                `}
              >
                {product.isRecommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-warning to-primary text-white px-4 py-2 text-sm font-bold shadow-lg">
                      <Star className="w-4 h-4 mr-1" />
                      {product.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pb-6 pt-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    {!product.isRecommended && (
                      <Badge variant={product.badgeVariant} className="text-xs font-medium">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                  
                  <CardTitle className="text-2xl font-bold text-foreground mb-2">
                    {product.title}
                  </CardTitle>
                  <p className="text-lg text-muted-foreground font-medium">
                    {product.subtitle}
                  </p>
                  
                  {product.savings && (
                    <div className="mt-4 p-4 bg-success/10 border border-success/20 rounded-lg">
                      <div className="text-2xl font-bold text-success text-center">
                        {product.savings}
                      </div>
                    </div>
                  )}
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col px-6 pb-8">
                  <ul className="space-y-4 mb-8 flex-1">
                    {product.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-4">
                        <div className="p-1 rounded-full bg-success/20 mt-1">
                          <Check className="w-4 h-4 text-success flex-shrink-0" />
                        </div>
                        <span className="text-card-foreground leading-relaxed font-medium">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="space-y-3 mt-auto">
                    <Button 
                      size="lg"
                      className={`
                        w-full text-lg font-bold py-4 h-auto transition-all duration-300
                        ${product.isRecommended 
                          ? 'bg-gradient-to-r from-primary to-success hover:from-primary-hover hover:to-success shadow-lg hover:shadow-xl text-white' 
                          : 'bg-primary hover:bg-primary-hover'
                        }
                      `}
                    >
                      {product.isRecommended ? 'JETZT SPAREN!' : 'Jetzt anfragen!'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="w-full py-4 h-auto font-semibold border-2 hover:bg-muted/50"
                    >
                      Produktdetails ansehen
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            ✓ Kostenlose Beratung • ✓ Schnelle Lieferung • ✓ Premium Qualität
          </p>
        </div>
      </div>
    </section>
  );
}