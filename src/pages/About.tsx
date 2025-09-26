import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Users, Award, MapPin, Calendar } from "lucide-react";
import { usePhoneSettings } from "@/hooks/usePhoneSettings";
import ralLogo from "@/assets/ral-logo.webp";

const About = () => {
  const { phoneSettings, loading } = usePhoneSettings();
  
  const milestones = [
    { year: "2021", title: "Gründung", description: "Expertenteam mit jahrzehntelanger Branchenerfahrung gründet Neumann Energie" },
    { year: "2021", title: "Partnerschaften", description: "Strategische Allianzen mit etablierten Lieferanten und Logistikpartnern" },
    { year: "2022", title: "RAL-Zertifizierung", description: "Schnelle Erlangung des Qualitätssiegels durch erfahrene Gründer" },
    { year: "2023", title: "Digitalisierung", description: "Einführung moderner Online-Services und digitaler Kundenverwaltung für noch besseren Service" },
    { year: "2024", title: "Nachhaltigkeit", description: "CO₂-Kompensationsprogramm und nachhaltige Geschäftspraktiken" },
  ];

  const team = [
    { name: "Fabian Baumann", role: "Vertrieb Heizöl", department: "Vertrieb", image: "/lovable-uploads/3.webp.png" },
    { name: "Peter Neumann", role: "Geschäftsführer", department: "Leitung", image: "/lovable-uploads/1.webp.png" },
    { name: "Sarah Weber", role: "Kundenservice", department: "Service", image: "/lovable-uploads/2.webp.png" },
    { name: "Michael Schmidt", role: "Technischer Leiter", department: "Technik", image: "/lovable-uploads/4.webp.png" },
  ];

  const locations = [
    { city: "München", address: "Dachsteinstr. 14, 81825 München", type: "Hauptsitz", phone: phoneSettings?.display_text || "0228 512-710", email: "info@neumann-energie.de" },
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
                Seit 2021
              </Badge>
              <h1 className="text-5xl font-bold text-foreground mb-6">
                Über Neumann Energie
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Als innovatives Energieunternehmen bringen wir jahrzehntelange Branchenerfahrung 
                mit modernen Geschäftspraktiken zusammen. Vertrauen Sie auf unser Expertenteam.
              </p>
            </div>
          </div>
        </section>

        {/* Geschichte Timeline - Vertical Design */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Unsere Geschichte
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Innovation von Anfang an - mit Branchenerfahrung zum Erfolg
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-primary to-primary/50"></div>
              
              <div className="space-y-16">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Content */}
                    <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group border border-primary/10">
                        <div className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                          {milestone.year}
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-3">{milestone.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>
                    
                    {/* Timeline Node */}
                    <div className="relative z-10">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Calendar className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    
                    {/* Empty space for balance */}
                    <div className="flex-1"></div>
                  </div>
                ))}
              </div>
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
                    <Avatar className="w-20 h-20 mx-auto mb-4 group-hover:scale-105 transition-transform">
                      <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                      <AvatarFallback>
                        <Users className="w-10 h-10 text-primary" />
                      </AvatarFallback>
                    </Avatar>
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
                Unser Hauptsitz
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Von München aus deutschlandweit durch unser bewährtes Partnernetzwerk
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              {locations.map((location, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 mb-8">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <MapPin className="w-8 h-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <h3 className="text-2xl font-semibold text-foreground">{location.city}</h3>
                          <Badge variant="secondary" className="text-sm font-medium">{location.type}</Badge>
                        </div>
                        <div className="space-y-2 text-muted-foreground">
                          <p className="text-lg">Neumann Lubrikat GmbH</p>
                          <p>{location.address}</p>
                          <p>Tel: {loading ? "Lädt..." : location.phone}</p>
                          <p>E-Mail: {location.email}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <div className="text-center bg-muted/50 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-4">Bundesweites Partnernetzwerk</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Von unserem Hauptsitz in München aus beliefern wir Sie deutschlandweit durch 
                  unser bewährtes Partnernetzwerk. Unsere zuverlässigen Partner in der ganzen 
                  Republik gewährleisten eine schnelle und effiziente Lieferung direkt zu Ihnen 
                  vor Ort - mit der gewohnten Neumann-Qualität und dem persönlichen Service, 
                  den Sie von uns kennen.
                </p>
              </div>
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
                        Schnell zertifiziert durch die Branchenerfahrung unseres Expertenteams für höchste Qualitätsstandards.
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