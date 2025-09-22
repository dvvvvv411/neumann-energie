import { Package, HelpCircle, MessageSquare, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const navigationItems = [
  {
    title: "Unsere Produkte",
    icon: Package,
    href: "#produkte"
  },
  {
    title: "FAQ",
    icon: HelpCircle,
    href: "#faq"
  },
  {
    title: "Ihre Anfrage",
    icon: MessageSquare,
    href: "#anfrage"
  },
  {
    title: "Kontakt",
    icon: Phone,
    href: "#kontakt"
  }
];

export function NavigationSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Alles für Ihren Energiebedarf
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {navigationItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 cursor-pointer"
              >
                <CardContent className="p-6">
                  <a href={item.href} className="block">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}