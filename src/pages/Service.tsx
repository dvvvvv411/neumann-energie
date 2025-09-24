import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Clock, Shield, Wrench, Phone, MessageSquare, Calendar, Zap } from "lucide-react";
import heizolLieferung from "@/assets/heizoel-lieferung.webp";
import tankService from "@/assets/tankservice.jpg";
import beratung from "@/assets/beratung.jpg";

const Service = () => {
  const services = [
    {
      icon: Truck,
      title: "Heizöl-Lieferung",
      description: "Zuverlässige Belieferung direkt zu Ihnen nach Hause",
      features: ["Termingerechte Lieferung", "Moderne Tankfahrzeuge", "Saubere Befüllung"],
      image: heizolLieferung
    },
    {
      icon: Wrench,
      title: "Tank-Service",
      description: "Professionelle Wartung und Reinigung Ihrer Heizöltanks",
      features: ["Tankreinigung", "Dichtheitsprüfung", "Reparaturservice"],
      image: tankService
    },
    {
      icon: MessageSquare,
      title: "Beratung",
      description: "Individuelle Energieberatung für optimale Kosteneinsparung",
      features: ["Verbrauchsanalyse", "Kostenoptimierung", "Zukunftsplanung"],
      image: beratung
    }
  ];

  const specialServices = [
    {
      icon: Shield,
      title: "Heizölversicherung",
      description: "Schutz vor Preisschwankungen und Lieferausfällen",
      color: "bg-blue-500/10 text-blue-600"
    },
    {
      icon: Calendar,
      title: "Lieferplan",
      description: "Automatische Belieferung nach individuellem Zeitplan",
      color: "bg-green-500/10 text-green-600"
    },
    {
      icon: Zap,
      title: "Energieaudit",
      description: "Professionelle Analyse Ihrer Energieeffizienz",
      color: "bg-purple-500/10 text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-6">
                Vollservice-Anbieter
              </Badge>
              <h1 className="text-5xl font-bold text-foreground mb-6">
                Service & Leistungen
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Von der Beratung bis zur Lieferung – wir bieten Ihnen den kompletten 
                Service rund um Ihre Energieversorgung.
              </p>
              <Button size="lg" className="gap-2" asChild>
                <a href="/#anfrage">
                  <Phone className="w-5 h-5" />
                  Jetzt beraten lassen
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Service-Prozess Flow */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                So einfach funktioniert's
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Ihr Weg zur zuverlässigen Energieversorgung in 4 Schritten
              </p>
            </div>

            <div className="relative">
              {/* Process Steps */}
              <div className="grid md:grid-cols-4 gap-8 relative">
                <div className="hidden md:block absolute top-16 left-1/8 right-1/8 h-0.5 bg-gradient-to-r from-primary via-primary to-primary"></div>
                
                {[
                  { step: "01", title: "Beratung", desc: "Kostenlose Analyse Ihres Energiebedarfs", icon: MessageSquare, color: "bg-blue-500" },
                  { step: "02", title: "Angebot", desc: "Individuelles Preisangebot binnen 24h", icon: Calendar, color: "bg-green-500" },  
                  { step: "03", title: "Lieferung", desc: "Termingerechte Lieferung zu Ihnen", icon: Truck, color: "bg-orange-500" },
                  { step: "04", title: "Service", desc: "Laufende Betreuung und Support", icon: Wrench, color: "bg-purple-500" }
                ].map((process, index) => {
                  const IconComponent = process.icon;
                  return (
                    <div key={index} className="relative text-center group">
                      <div className={`w-20 h-20 ${process.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full border-2 border-primary flex items-center justify-center text-sm font-bold text-primary">
                        {process.step}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{process.title}</h3>
                      <p className="text-sm text-muted-foreground">{process.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Hauptleistungen - Alternating Layout */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Unsere Hauptleistungen
              </h2>
            </div>

            <div className="space-y-16">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                const isEven = index % 2 === 0;
                return (
                  <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                    <div className={isEven ? 'lg:pr-8' : 'lg:pl-8 lg:col-start-2'}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">{service.title}</h3>
                          <p className="text-primary font-medium">Professioneller Service</p>
                        </div>
                      </div>
                      <p className="text-lg text-muted-foreground mb-6">{service.description}</p>
                      <div className="grid grid-cols-1 gap-3 mb-8">
                        {service.features.map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="font-medium text-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Button size="lg" className="gap-2" asChild>
                        <a href="/#anfrage">
                          <IconComponent className="w-5 h-5" />
                          Service anfragen
                        </a>
                      </Button>
                    </div>
                    <div className={`${!isEven ? 'lg:col-start-1' : ''}`}>
                      <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Spezial-Services */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Spezial-Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Zusätzliche Dienstleistungen für maximale Sicherheit und Komfort
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {specialServices.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 text-center">
                    <CardContent className="p-8">
                      <div className={`w-20 h-20 ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                        <IconComponent className="w-10 h-10" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {service.description}
                      </p>
                      <Button variant="ghost" className="group-hover:bg-primary/5">
                        Details ansehen
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Bereit für unseren Service?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Kontaktieren Sie uns für eine individuelle Beratung oder fordern Sie 
              direkt ein unverbindliches Angebot an.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" asChild>
                <a href="/#anfrage">
                  <MessageSquare className="w-5 h-5" />
                  Kostenlose Beratung
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Service;