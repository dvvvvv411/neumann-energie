import { Button } from "@/components/ui/button";

const navigationItems = [
  { title: "Unsere Produkte", href: "#produkte" },
  { title: "FAQ", href: "#faq" },  
  { title: "Ihre Anfrage", href: "#anfrage" },
  { title: "Kontakt", href: "#kontakt" }
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

        <div className="flex flex-wrap justify-center gap-4">
          {navigationItems.map((item, index) => (
            <Button 
              key={index}
              variant="outline" 
              size="lg"
              className="min-w-40"
              asChild
            >
              <a href={item.href}>
                {item.title}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}