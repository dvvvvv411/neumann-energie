import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Check, Star, Award, Shield, ArrowUpRight, Plus, X, Truck, Leaf, Droplets } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const products = [
  {
    id: "standard",
    title: "Heizöl DIN schwefelarm",
    subtitle: "Der bewährte Standard",
    features: [
      "Raffinerie-Standard-Qualität",
      "Schwefelarm 50 ppm",
      "Zuverlässiger Heizbetrieb",
      "Erfüllt DIN 51603-1",
      "Frei von Zusätzen"
    ],
    icon: Shield
  },
  {
    id: "premium", 
    title: "Sparheizöl schwefelarm",
    subtitle: "Maximale Effizienz & Ersparnis",
    features: [
      "6 - 8 % Ersparnis gegenüber Heizöl DIN",
      "Nahezu schadstofffreie Verbrennung",
      "CO₂-Kompensation verfügbar",
      "Höchste Energieeffizienz",
      "Stark reduzierte Rußbildung"
    ],
    icon: Award
  }
];

export function ProductSection() {
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const productDetails = {
    standard: {
      services: [
        { name: "Expresslieferung", value: "48h Express", icon: Truck },
        { name: "Anlieferung CO₂-kompensiert", value: "optional zubuchbar", icon: Leaf }
      ],
      quality: [
        { name: "DIN Norm", value: true, icon: Shield },
        { name: "Neutralisierter Geruch", value: false, icon: Droplets },
        { name: "Schwefelarm", value: true, icon: Check }
      ]
    },
    premium: {
      services: [
        { name: "Expresslieferung", value: "48h Express", icon: Truck }
      ],
      quality: [
        { name: "Anlieferung CO₂-kompensiert", value: true, icon: Leaf },
        { name: "Neutralisierter Geruch", value: true, icon: Droplets },
        { name: "Reduzierter Verbrauch", value: true, icon: Award },
        { name: "Schwefelarm", value: true, icon: Check }
      ]
    }
  };

  const ProductDetailDialog = ({ productId, productTitle }: { productId: string, productTitle: string }) => {
    const details = productDetails[productId as keyof typeof productDetails];
    
    return (
      <Dialog open={openDialog === productId} onOpenChange={(open) => setOpenDialog(open ? productId : null)}>
        <DialogContent className={
          isMobile 
            ? "fixed !inset-0 !left-0 !top-0 !right-0 !bottom-0 !translate-x-0 !translate-y-0 !transform-none w-full h-full max-w-none rounded-none border-0 bg-white shadow-none p-4 overflow-y-auto z-50"
            : "max-w-4xl !rounded-[50px] border-0 bg-white/95 backdrop-blur-xl shadow-2xl p-10"
        }>
          <DialogHeader className={isMobile ? "pb-6 pt-4" : "pb-10"}>
            <DialogTitle className={
              isMobile 
                ? "text-2xl font-bold text-primary pr-8"
                : "text-4xl font-bold text-primary pr-12"
            }>
              {productTitle}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Detaillierte Informationen zu {productTitle}
            </DialogDescription>
          </DialogHeader>
          
          <div className={isMobile ? "space-y-8" : "space-y-12"}>
            {/* Zubuchbare Leistungen */}
            <div>
              <h3 className={
                isMobile 
                  ? "text-xl font-bold text-foreground mb-6 flex items-center gap-3"
                  : "text-2xl font-bold text-foreground mb-8 flex items-center gap-3"
              }>
                <Star className="w-6 h-6 text-primary" />
                Zubuchbare Leistungen
              </h3>
              <div className={isMobile ? "space-y-4" : "space-y-6"}>
                {details.services.map((service, index) => {
                  const ServiceIcon = service.icon;
                  return (
                    <div key={index} className={
                      isMobile 
                        ? "flex items-center justify-between p-4 !rounded-[15px] bg-muted/30 border border-border/20"
                        : "flex items-center justify-between p-6 !rounded-[25px] bg-muted/30 border border-border/20"
                    }>
                      <div className="flex items-center gap-4">
                        <ServiceIcon className="w-6 h-6 text-primary" />
                        <span className={
                          isMobile 
                            ? "text-base font-semibold text-foreground"
                            : "text-lg font-semibold text-foreground"
                        }>{service.name}</span>
                      </div>
                      <Badge className="font-semibold rounded-full px-4 py-2 text-sm bg-green-100 text-green-800 hover:bg-green-200">
                        {service.value}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Produktqualität */}
            <div>
              <h3 className={
                isMobile 
                  ? "text-xl font-bold text-foreground mb-6 flex items-center gap-3"
                  : "text-2xl font-bold text-foreground mb-8 flex items-center gap-3"
              }>
                <Award className="w-6 h-6 text-primary" />
                Produktqualität
              </h3>
              <div className={isMobile ? "space-y-4" : "space-y-6"}>
                {details.quality.map((item, index) => {
                  const ItemIcon = item.icon;
                  return (
                    <div key={index} className={
                      isMobile 
                        ? "flex items-center justify-between p-4 !rounded-[15px] bg-muted/30 border border-border/20"
                        : "flex items-center justify-between p-6 !rounded-[25px] bg-muted/30 border border-border/20"
                    }>
                      <div className="flex items-center gap-4">
                        <ItemIcon className="w-6 h-6 text-primary" />
                        <span className={
                          isMobile 
                            ? "text-base font-semibold text-foreground"
                            : "text-lg font-semibold text-foreground"
                        }>{item.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        {item.value === true && (
                          <>
                            <Check className="w-6 h-6 text-green-600" />
                            <span className="text-green-600 font-semibold text-lg">Ja</span>
                          </>
                        )}
                        {item.value === false && (
                          <>
                            <X className="w-6 h-6 text-foreground" />
                            <span className="text-foreground font-semibold text-lg">Nein</span>
                          </>
                        )}
                        {typeof item.value === 'string' && item.value !== 'true' && item.value !== 'false' && (
                          <Badge variant="outline" className="font-semibold rounded-full px-4 py-2 text-sm">
                            {item.value}
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <section id="produkte" className="py-20 bg-gradient-to-b from-muted/30 to-background">
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
                className="relative h-full flex flex-col transition-all duration-500 hover:scale-[1.02] bg-gradient-to-br from-white to-secondary/20 hover:shadow-[var(--shadow-card)] hover:border-2 hover:border-primary rounded-3xl"
              >
                <CardHeader className="pb-6 pt-8">
                  <CardTitle className="text-4xl font-bold text-primary mb-2">
                    {product.title}
                  </CardTitle>
                  <p className="text-lg text-muted-foreground font-medium">
                    {product.subtitle}
                  </p>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col px-6 pb-8">
                  <ul className="space-y-4 mb-8 flex-1">
                    {product.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-4">
                        <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                        <span className="text-card-foreground leading-relaxed font-medium">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="space-y-3 mt-auto">
                    <Button 
                      size="lg"
                      className="w-full text-xl font-bold py-4 h-auto transition-all duration-300 text-white group gap-3 rounded-2xl"
                      style={{ backgroundColor: '#0c2a3e' }}
                    >
                      Jetzt anfragen!
                      <ArrowUpRight className="w-6 h-6 text-primary transition-transform duration-300 group-hover:rotate-45" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="w-full py-4 h-auto font-semibold border-2 hover:bg-muted/50 text-xl gap-3 rounded-2xl"
                      onClick={() => setOpenDialog(product.id)}
                    >
                      Produktdetails
                      <Plus className="w-6 h-6 text-primary" />
                    </Button>
                  </div>
                </CardContent>

                <ProductDetailDialog productId={product.id} productTitle={product.title} />
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