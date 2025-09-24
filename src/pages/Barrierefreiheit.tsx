import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Barrierefreiheit = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-primary text-primary">
              Zugänglichkeit
            </Badge>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Barrierefreiheitserklärung
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Informationen zur Barrierefreiheit dieser Website gemäß § 9a BGG
            </p>
          </div>

          <div className="space-y-6">
            {/* Bemühungen um Barrierefreiheit */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Unsere Bemühungen um Barrierefreiheit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Die Neumann Lubrikat GmbH ist bemüht, ihre Website im Einklang mit den 
                  Web Content Accessibility Guidelines (WCAG) 2.1 auf Konformitätsstufe AA 
                  barrierefrei zugänglich zu machen. Diese Erklärung gilt für die Website 
                  <a href="https://neumann-energie.de" className="text-primary hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                    neumann-energie.de
                  </a>.
                </p>
              </CardContent>
            </Card>

            {/* Stand der Vereinbarkeit */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Stand der Vereinbarkeit mit den Anforderungen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Diese Website ist mit den Web Content Accessibility Guidelines (WCAG) 2.1 
                  auf Konformitätsstufe AA teilweise vereinbar. Die nachstehend aufgeführten 
                  Inhalte sind aus folgenden Gründen nicht barrierefrei:
                </p>
                
                <h4 className="font-semibold text-foreground mb-2">Unvereinbarkeit mit der Barrierefreiheit</h4>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Einige ältere PDF-Dokumente sind möglicherweise nicht vollständig barrierefrei strukturiert</li>
                  <li>• Vereinzelte externe Inhalte von Drittanbietern entsprechen möglicherweise nicht allen Barrierefreiheitsstandards</li>
                </ul>
              </CardContent>
            </Card>

            {/* Erstellung der Erklärung */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Erstellung dieser Barrierefreiheitserklärung</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Diese Erklärung wurde am {new Date().toLocaleDateString('de-DE')} erstellt. 
                  Die Bewertung basiert auf einer Selbstbewertung der Website-Inhalte und -Funktionen.
                </p>
              </CardContent>
            </Card>

            {/* Feedback und Kontakt */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Feedback und Kontaktangaben</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Sie können uns Barrieren mitteilen und Informationen zu Inhalten anfordern, 
                  die von den Regelungen zur Barrierefreiheit ausgenommen sind.
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-muted-foreground">
                    <strong>Kontakt für Barrierefreiheit:</strong><br/>
                    Neumann Lubrikat GmbH<br/>
                    Peter Neumann<br/>
                    Dachsteinstr. 14<br/>
                    81825 München<br/>
                    Deutschland<br/><br/>
                    E-Mail: <a href="mailto:info@neumann-energie.de" className="text-primary hover:underline">info@neumann-energie.de</a><br/>
                    Telefon: +49 (0) 89 123456789
                  </p>
                </div>
                
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Wir sind bemüht, Ihnen innerhalb von 2 Wochen zu antworten.
                </p>
              </CardContent>
            </Card>

            {/* Schlichtungsverfahren */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Schlichtungsverfahren</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Wenn Ihr Kontakt mit uns nicht zu einer zufriedenstellenden Lösung führt, 
                  können Sie sich an die Schlichtungsstelle nach dem Behindertengleichstellungsgesetz wenden. 
                  Die Schlichtungsstelle hat die Aufgabe, Konflikte zwischen Menschen mit Behinderungen 
                  und öffentlichen Stellen zu lösen.
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg mt-4">
                  <p className="text-muted-foreground">
                    <strong>Schlichtungsstelle BGG</strong><br/>
                    Mauerstraße 53<br/>
                    10117 Berlin<br/>
                    Deutschland<br/><br/>
                    Telefon: +49 (0)30 185 27-2805<br/>
                    E-Mail: <a href="mailto:info@schlichtungsstelle-bgg.de" className="text-primary hover:underline">info@schlichtungsstelle-bgg.de</a><br/>
                    Internet: <a href="https://www.schlichtungsstelle-bgg.de" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.schlichtungsstelle-bgg.de</a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Barrierefreiheit;