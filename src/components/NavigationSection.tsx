import { Button } from "@/components/ui/button";
import { ArrowRight, Package, HelpCircle, MessageSquare, Phone } from "lucide-react";

const navigationItems = [
  {
    title: "Unsere Produkte",
    description: "Entdecken Sie unser umfassendes Heizöl-Sortiment für Geschäftskunden",
    icon: Package,
    href: "#produkte"
  },
  {
    title: "FAQ",
    description: "Häufig gestellte Fragen rund um unsere Heizöl-Services",
    icon: HelpCircle,
    href: "#faq"
  },
  {
    title: "Ihre Anfrage",
    description: "Stellen Sie uns Ihre individuelle Anfrage für maßgeschneiderte Lösungen",
    icon: MessageSquare,
    href: "#anfrage"
  },
  {
    title: "Kontakt",
    description: "Nehmen Sie direkt Kontakt zu unseren Energie-Experten auf",
    icon: Phone,
    href: "#kontakt"
  }
];

export function NavigationSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Alles für Ihren Energiebedarf
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Von der Beratung bis zur Lieferung - wir sind Ihr zuverlässiger Partner 
            für professionelle Energielösungen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {navigationItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index}
                className="group bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/30"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
                    {item.description}
                  </p>
                  
                  <Button 
                    variant="ghost" 
                    className="mt-auto w-full justify-between group-hover:bg-primary/5 group-hover:text-primary"
                    asChild
                  >
                    <a href={item.href}>
                      Mehr erfahren
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}