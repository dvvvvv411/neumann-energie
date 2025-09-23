import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Recycle, Target, TrendingUp, Globe, Award } from "lucide-react";

const Sustainability = () => {
  const initiatives = [
    {
      icon: Leaf,
      title: "CO₂-Kompensation",
      description: "100% klimaneutrale Heizöl-Lieferungen durch zertifizierte Klimaschutzprojekte",
      impact: "2.500 Tonnen CO₂ kompensiert",
      color: "bg-green-500/10 text-green-600"
    },
    {
      icon: Recycle,
      title: "Bio-Heizöl",
      description: "Nachhaltige Alternative mit bis zu 30% weniger CO₂-Emissionen",
      impact: "15% unserer Kunden nutzen Bio-Heizöl",
      color: "bg-blue-500/10 text-blue-600"
    },
    {
      icon: TrendingUp,
      title: "Effizienz-Steigerung",
      description: "Optimierte Lieferwege reduzieren unseren ökologischen Fußabdruck",
      impact: "25% weniger Fahrtstrecke pro Liter",
      color: "bg-purple-500/10 text-purple-600"
    },
    {
      icon: Globe,
      title: "Regionale Partnerschaft",
      description: "Zusammenarbeit mit lokalen Umweltschutzorganisationen",
      impact: "12 lokale Projekte unterstützt",
      color: "bg-orange-500/10 text-orange-600"
    }
  ];

  const goals = [
    { target: "2025", title: "CO₂-neutral", description: "Komplette Klimaneutralität aller Geschäftsprozesse" },
    { target: "2027", title: "50% Bio-Anteil", description: "Mindestens 50% Bio-Heizöl im Sortiment" },
    { target: "2030", title: "Zero Waste", description: "Vollständige Kreislaufwirtschaft in allen Bereichen" },
  ];

  const certifications = [
    "ISO 14001 Umweltmanagement",
    "Gold Standard Klimaschutz",
    "ISCC Nachhaltigkeitszertifikat",
    "Regional Plus Siegel"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-green-500/5 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-6 bg-green-500/10 text-green-700">
                Klimaneutrale Energie
              </Badge>
              <h1 className="text-5xl font-bold text-foreground mb-6">
                Nachhaltigkeit & Umwelt
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Wir übernehmen Verantwortung für die Umwelt. Mit innovativen Lösungen 
                und nachhaltigen Produkten gestalten wir die Energiezukunft mit.
              </p>
              <Button size="lg" className="gap-2 bg-green-600 hover:bg-green-700">
                <Leaf className="w-5 h-5" />
                CO₂-Kompensation erfahren
              </Button>
            </div>
          </div>
        </section>

        {/* Nachhaltigkeits-Initiativen */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Unsere Nachhaltigkeits-Initiativen
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Konkrete Maßnahmen für den Klimaschutz
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {initiatives.map((initiative, index) => {
                const IconComponent = initiative.icon;
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <div className={`w-16 h-16 ${initiative.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <IconComponent className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-foreground mb-3">
                            {initiative.title}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {initiative.description}
                          </p>
                          <div className="bg-primary/5 rounded-lg p-3">
                            <p className="text-sm font-medium text-primary">
                              ✓ {initiative.impact}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CO₂-Kompensation Detail */}
        <section className="py-20 bg-green-50/50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-6 bg-green-600">
                  Klimaneutral zertifiziert
                </Badge>
                <h2 className="text-4xl font-bold text-foreground mb-6">
                  100% CO₂-kompensierte Lieferungen
                </h2>
                <div className="space-y-6">
                  <p className="text-lg text-muted-foreground">
                    Jede Heizöl-Lieferung wird durch hochwertige Klimaschutzprojekte 
                    vollständig CO₂-kompensiert. So können Sie klimaneutral heizen.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="font-medium">Gold Standard zertifizierte Projekte</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                        <Globe className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="font-medium">Waldschutz in Brasilien & Indien</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                        <Target className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="font-medium">Transparente CO₂-Bilanz für jeden Kunden</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Card className="bg-gradient-to-br from-green-500/5 to-green-600/5 border-green-200">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Leaf className="w-12 h-12 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      Ihr CO₂-Impact
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-white/50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-green-600">2,5t</div>
                        <div className="text-sm text-muted-foreground">CO₂ kompensiert</div>
                      </div>
                      <div className="bg-white/50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-green-600">50</div>
                        <div className="text-sm text-muted-foreground">Bäume gepflanzt</div>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Klimaneutral bestellen
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Nachhaltigkeits-Roadmap */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Unsere Nachhaltigkeits-Ziele
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Ambitionierte Meilensteine auf dem Weg zur Klimaneutralität
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {goals.map((goal, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 text-center">
                  <CardContent className="p-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <span className="text-2xl font-bold text-primary">{goal.target}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {goal.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {goal.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Zertifikate & Standards */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Zertifikate & Standards
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Externe Bestätigung unserer Nachhaltigkeitsbemühungen
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <Award className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm">
                      {cert}
                    </h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-500/5 to-blue-500/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Gemeinsam für den Klimaschutz
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Werden Sie Teil unserer Nachhaltigkeits-Mission. Bestellen Sie 
              klimaneutrales Heizöl und leisten Sie einen aktiven Beitrag zum Umweltschutz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 bg-green-600 hover:bg-green-700">
                <Leaf className="w-5 h-5" />
                Klimaneutral bestellen
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Target className="w-5 h-5" />
                Nachhaltigkeits-Report
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Sustainability;