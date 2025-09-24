import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, Building, Home, Factory, Users, TrendingUp, Award } from "lucide-react";

const References = () => {
  const testimonials = [
    {
      name: "Maria Weber",
      company: "Wohnungsgenossenschaft Rheinland",
      role: "Geschäftsführerin",
      rating: 5,
      text: "Seit 15 Jahren verlassen wir uns auf Knauber. Die Qualität stimmt, die Preise sind fair und der Service ist hervorragend. Besonders schätzen wir die zuverlässigen Liefertermine.",
      sector: "Wohnungswirtschaft"
    },
    {
      name: "Dr. Thomas Müller",
      company: "Maschinenbau Rhein GmbH",
      role: "Geschäftsführer",
      rating: 5,
      text: "Als Industriebetrieb sind wir auf eine sichere Energieversorgung angewiesen. Knauber liefert nicht nur zuverlässig, sondern berät uns auch kompetent bei der Optimierung unserer Energiekosten.",
      sector: "Industrie"
    },
    {
      name: "Familie Schneider",
      company: "Privatkunde",
      role: "Eigenheimbesitzer",
      rating: 5,
      text: "Der persönliche Kontakt zu Herrn Bois ist fantastisch. Er kennt unseren Verbrauch und meldet sich rechtzeitig für die nächste Lieferung. So entspannt kann Heizöl-Kauf sein!",
      sector: "Privatkunden"
    },
    {
      name: "Michael König",
      company: "Hotel Zur Post",
      role: "Inhaber",
      rating: 5,
      text: "Im Hotelgewerbe ist Zuverlässigkeit das A und O. Knauber hat uns noch nie im Stich gelassen - auch nicht bei kurzfristigen Notfällen. Top Service!",
      sector: "Gewerbe"
    }
  ];

  const caseStudies = [
    {
      title: "Industriekomplex Rhein-Ruhr",
      client: "12 Produktionsbetriebe",
      challenge: "Versorgungssicherheit für kritische Industrieprozesse",
      solution: "Redundante Lieferkette mit 24/7 Notfallservice",
      result: "100% Ausfallsicherheit, 30% Kosteneinsparung",
      icon: Factory
    },
    {
      title: "Wohnkomplex Bonn-Süd",
      client: "800 Wohneinheiten",
      challenge: "Kostensenkung bei gleichbleibender Versorgungssicherheit",
      solution: "Optimierter Lieferplan mit Sammelbestellungen",
      result: "35% Kosteneinsparung bei 100% Verfügbarkeit",
      icon: Building
    },
    {
      title: "Krankenhauskette NRW",
      client: "5 Kliniken",
      challenge: "Unterbrechungsfreie Energieversorgung für kritische Bereiche",
      solution: "Priorisierte Lieferung mit Backup-Systemen",
      result: "Null Ausfallzeiten, 20% Budgeteinsparung",
      icon: Home
    }
  ];

  const partners = [
    "Stadtwerke Bonn", "IHK Köln", "Handwerkskammer Düsseldorf", 
    "BDH Bundesverband", "Gebäudereiniger-Innung", "Hotel & Gastro Verband NRW",
    "Wohnungswirtschaft Rheinland", "RAL Gütegemeinschaft"
  ];

  const stats = [
    { number: "25.000+", label: "Zufriedene Kunden", icon: Users },
    { number: "96%", label: "Weiterempfehlungsrate", icon: TrendingUp },
    { number: "12+", label: "Jahre Durchschnittliche Kundenbeziehung", icon: Award },
    { number: "99.8%", label: "Lieferzuverlässigkeit", icon: Star }
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
                25.000+ zufriedene Kunden
              </Badge>
              <h1 className="text-5xl font-bold text-foreground mb-6">
                Referenzen & Kunden
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Vertrauen Sie auf die Erfahrungen unserer Geschäftskunden. Von Industriebetrieben 
                bis zu Wohnkomplexen – wir sind der zuverlässige Partner für Ihre Energieversorgung.
              </p>
            </div>
          </div>
        </section>

        {/* Statistiken */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 text-center">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                      <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials - Social Proof Design */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full mb-6">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span className="font-semibold">4.9/5 Kundenbewertung</span>
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Was unsere Kunden sagen
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Über 25.000 zufriedene Kunden sprechen für sich
              </p>
            </div>

            {/* Masonry Layout for Testimonials */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="break-inside-avoid">
                  <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
                    {/* Quote Mark */}
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Quote className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    {/* Testimonial Text */}
                    <blockquote className="text-gray-700 mb-8 text-lg leading-relaxed italic">
                      "{testimonial.text}"
                    </blockquote>
                    
                    {/* Customer Info */}
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                        <Users className="w-8 h-8 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                        <div className="text-gray-600 text-sm">{testimonial.role}</div>
                        <div className="text-primary font-semibold">{testimonial.company}</div>
                        <Badge variant="secondary" className="mt-2 text-xs">{testimonial.sector}</Badge>
                      </div>
                    </div>
                    
                    {/* Trust Indicator */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-green-600">
                        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-sm font-medium">Verifizierter Kunde</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Additional Social Proof Card */}
              <div className="break-inside-avoid">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-8 border-2 border-primary/20">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                      <TrendingUp className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-4xl font-bold text-primary mb-2">96%</div>
                    <div className="text-lg font-semibold text-foreground mb-2">Weiterempfehlungsrate</div>
                    <p className="text-muted-foreground text-sm">
                      96% unserer Kunden würden uns weiterempfehlen
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Erfolgsgeschichten
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Wie wir unseren Kunden geholfen haben, ihre Ziele zu erreichen
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {caseStudies.map((study, index) => {
                const IconComponent = study.icon;
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {study.title}
                      </h3>
                      <p className="text-sm text-primary font-medium mb-4">{study.client}</p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-foreground mb-1">Herausforderung:</h4>
                          <p className="text-sm text-muted-foreground">{study.challenge}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-1">Lösung:</h4>
                          <p className="text-sm text-muted-foreground">{study.solution}</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3">
                          <h4 className="font-medium text-green-800 mb-1">Ergebnis:</h4>
                          <p className="text-sm text-green-700 font-medium">{study.result}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Partner & Kooperationen */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Unsere Partner
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Starke Kooperationen für noch besseren Service
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {partners.map((partner, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                      <Building className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-sm font-medium text-foreground">{partner}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Branchenvielfalt */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Branchen & Kundengruppen
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Wir beliefern Kunden aus allen Bereichen
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Industrie & Gewerbe", count: "12.500+", icon: Factory },
                { name: "Wohnungswirtschaft", count: "8.000+", icon: Building },
                { name: "Öffentliche Einrichtungen", count: "2.500+", icon: Users },
                { name: "Privathaushalte", count: "2.000+", icon: Home }
              ].map((sector, index) => {
                const IconComponent = sector.icon;
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 text-center">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      <div className="text-2xl font-bold text-primary mb-2">{sector.count}</div>
                      <div className="font-medium text-foreground">{sector.name}</div>
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
              Werden Sie Teil unserer Erfolgsgeschichte
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Schließen Sie sich tausenden zufriedenen Kunden an und erleben Sie 
              selbst, was Knauber Energie ausmacht.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <Star className="w-5 h-5" />
                Jetzt Kunde werden
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Quote className="w-5 h-5" />
                Referenzen anfragen
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default References;