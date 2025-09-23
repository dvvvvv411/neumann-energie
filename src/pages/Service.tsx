import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Clock, Shield, Wrench, Phone, MessageSquare, Calendar, Zap } from "lucide-react";

const Service = () => {
  const services = [
    {
      icon: Truck,
      title: "Heizöl-Lieferung",
      description: "Zuverlässige Belieferung direkt zu Ihnen nach Hause",
      features: ["Termingerechte Lieferung", "Moderne Tankfahrzeuge", "Saubere Befüllung"]
    },
    {
      icon: Wrench,
      title: "Tank-Service",
      description: "Professionelle Wartung und Reinigung Ihrer Heizöltanks",
      features: ["Tankreinigung", "Dichtheitsprüfung", "Reparaturservice"]
    },
    {
      icon: Clock,
      title: "Notfall-Service",
      description: "24/7 Bereitschaft für Ihre dringenden Energiebedürfnisse",
      features: ["Schnelllieferung", "Wochenend-Service", "Feiertag-Bereitschaft"]
    },
    {
      icon: MessageSquare,
      title: "Beratung",
      description: "Individuelle Energieberatung für optimale Kosteneinsparung",
      features: ["Verbrauchsanalyse", "Kostenoptimierung", "Zukunftsplanung"]
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
              <Button size="lg" className="gap-2">
                <Phone className="w-5 h-5" />
                Jetzt beraten lassen
              </Button>
            </div>
          </div>
        </section>

        {/* Hauptleistungen */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Unsere Hauptleistungen
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Alles aus einer Hand für Ihre Energieversorgung
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="w-8 h-8 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-foreground mb-3">
                            {service.title}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {service.description}
                          </p>
                          <ul className="space-y-2">
                            {service.features.map((feature, fIndex) => (
                              <li key={fIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <Button variant="outline" className="mt-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            Mehr erfahren
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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

        {/* Notfall-Service */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="destructive" className="mb-6">
                  24/7 Verfügbar
                </Badge>
                <h2 className="text-4xl font-bold text-foreground mb-6">
                  Notfall-Service
                </h2>
                <div className="space-y-6">
                  <p className="text-lg text-muted-foreground">
                    Heizung ausgefallen? Tank leer? Kein Problem! Unser Notfall-Service 
                    ist rund um die Uhr für Sie da.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-500/10 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 text-red-600" />
                      </div>
                      <span className="font-medium">Schnelllieferung innerhalb von 4 Stunden</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-500/10 rounded-full flex items-center justify-center">
                        <Phone className="w-4 h-4 text-red-600" />
                      </div>
                      <span className="font-medium">24/7 Hotline: 0228 / 555-NOTFALL</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-500/10 rounded-full flex items-center justify-center">
                        <Shield className="w-4 h-4 text-red-600" />
                      </div>
                      <span className="font-medium">Auch an Feiertagen und Wochenenden</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Card className="bg-gradient-to-br from-red-50 to-red-100/50 border-red-200">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Phone className="w-10 h-10 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Sofort-Hilfe benötigt?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Rufen Sie uns an – wir sind da!
                  </p>
                  <Button variant="destructive" size="lg" className="w-full mb-4">
                    Jetzt anrufen
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Durchschnittliche Antwortzeit: unter 2 Minuten
                  </p>
                </CardContent>
              </Card>
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
              <Button size="lg" className="gap-2">
                <MessageSquare className="w-5 h-5" />
                Kostenlose Beratung
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Calendar className="w-5 h-5" />
                Termin vereinbaren
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