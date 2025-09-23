import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, MapPin, Calendar } from "lucide-react";
import ralLogo from "@/assets/ral-logo.webp";

const About = () => {
  const milestones = [
    { year: "1920", title: "Gründung", description: "Familienbetrieb startet im Energiehandel" },
    { year: "1975", title: "Expansion", description: "Erste Tankstellen in der Region" },
    { year: "1990", title: "RAL-Zertifizierung", description: "Qualitätssiegel für Energiehandel erhalten" },
    { year: "2010", title: "Modernisierung", description: "Digitalisierung der Prozesse" },
    { year: "2020", title: "Nachhaltigkeit", description: "CO₂-Kompensationsprogramm gestartet" },
  ];

  const team = [
    { name: "Martin Bois", role: "Vertrieb Heizöl", department: "Vertrieb" },
    { name: "Thomas Müller", role: "Geschäftsführer", department: "Leitung" },
    { name: "Sarah Weber", role: "Kundenservice", department: "Service" },
    { name: "Michael Schmidt", role: "Technischer Leiter", department: "Technik" },
  ];

  const locations = [
    { city: "Bonn", address: "Hauptstraße 123", type: "Hauptsitz" },
    { city: "Köln", address: "Industriestraße 45", type: "Niederlassung" },
    { city: "Koblenz", address: "Am Hafen 78", type: "Tankstelle" },
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
                Seit über 100 Jahren
              </Badge>
              <h1 className="text-5xl font-bold text-foreground mb-6">
                Über Knauber Energie
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Als traditionelles Familienunternehmen verbinden wir seit Generationen 
                Erfahrung mit Innovation. Vertrauen Sie auf unsere Expertise im Energiehandel.
              </p>
            </div>
          </div>
        </section>

        {/* Geschichte Timeline */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Unsere Geschichte
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Über 100 Jahre Erfahrung im Energiehandel
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-8">
              {milestones.map((milestone, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <Calendar className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-2">{milestone.year}</h3>
                    <h4 className="font-semibold text-foreground mb-2">{milestone.title}</h4>
                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Unser Team
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Erfahrene Experten für Ihre Energieversorgung
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <Users className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                    <p className="text-sm text-primary font-medium mb-1">{member.role}</p>
                    <Badge variant="outline" className="text-xs">{member.department}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Standorte */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Unsere Standorte
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Regional stark vertreten in NRW und Rheinland-Pfalz
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {locations.map((location, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{location.city}</h3>
                          <Badge variant="secondary" className="text-xs">{location.type}</Badge>
                        </div>
                        <p className="text-muted-foreground">{location.address}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Qualität & Zertifikate */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-foreground mb-6">
                  Qualität & Zertifikate
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">RAL-Gütezeichen</h3>
                      <p className="text-muted-foreground">
                        Seit über 30 Jahren zertifiziert für höchste Qualitätsstandards im Energiehandel.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">ISO 9001</h3>
                      <p className="text-muted-foreground">
                        Zertifiziertes Qualitätsmanagementsystem für alle Geschäftsprozesse.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Umweltzertifikat</h3>
                      <p className="text-muted-foreground">
                        Nachhaltiges Wirtschaften und CO₂-kompensierte Lieferungen.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <img 
                  src={ralLogo} 
                  alt="RAL Gütezeichen und weitere Zertifikate" 
                  className="max-w-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;