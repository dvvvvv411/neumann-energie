import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const products = [
  {
    title: "Heizöl DIN schwefelarm",
    subtitle: "Der Klassiker unter den Heizölen",
    features: [
      "Raffinerie-Standard-Qualität",
      "Schwefelarm 50 ppm",
      "Zuverlässiger Heizbetrieb",
      "Erfüllt DIN 51603-1",
      "Frei von Zusätzen"
    ]
  },
  {
    title: "Sparheizöl schwefelarm",
    subtitle: "Unser Effektivstes",
    features: [
      "6 - 8 % Ersparnis gegenüber Heizöl DIN (schwefelarm)",
      "nahezu schadstofffreie Verbrennung",
      "Sehr hohe Umweltverträglichkeit, optional: CO₂-Kompensation",
      "Höchste Energieeffizienz",
      "Stark reduzierte Rußbildung"
    ]
  }
];

export function ProductSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Wählen Sie Ihr Heizöl
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <Card key={index} className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-foreground">
                  {product.title}
                </CardTitle>
                <p className="text-muted-foreground font-medium">
                  {product.subtitle}
                </p>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-3 mb-8 flex-1">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-card-foreground text-sm leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-col gap-3 mt-auto">
                  <Button className="w-full">
                    Jetzt anfragen!
                  </Button>
                  <Button variant="outline" className="w-full">
                    Produktdetails
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}