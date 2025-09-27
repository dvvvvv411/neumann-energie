import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePhoneSettings } from "@/hooks/usePhoneSettings";

const Impressum = () => {
  const { phoneSettings, loading, hasPhoneNumber } = usePhoneSettings();
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="py-16 flex-grow">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-primary text-primary">
              Rechtliches
            </Badge>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Impressum
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Angaben gemäß § 5 TMG und verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </p>
          </div>

          {/* Impressum Content */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Firmenangaben</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Unternehmen</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Neumann Lubrikat GmbH<br/>
                  Dachsteinstr. 14<br/>
                  81825 München<br/>
                  Deutschland
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Kontakt</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {(loading || hasPhoneNumber) && (
                    <>Telefon: {loading ? 'Wird geladen...' : phoneSettings?.display_text}<br/></>
                  )}
                  E-Mail: <a href="mailto:info@neumann-energie.de" className="text-primary hover:underline">info@neumann-energie.de</a><br/>
                  Internet: <a href="https://neumann-energie.de" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">neumann-energie.de</a>
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Vertretungsberechtigte Geschäftsführung</h3>
                <p className="text-muted-foreground">
                  Peter Neumann
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Handelsregister</h3>
                <p className="text-muted-foreground">
                  Registergericht: Amtsgericht München<br/>
                  Registernummer: HRB 266106
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Umsatzsteuer-Identifikationsnummer</h3>
                <p className="text-muted-foreground">
                  USt-IdNr.: DE445476201<br/>
                  gemäß § 27a Umsatzsteuergesetz
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Verantwortlich für den Inhalt</h3>
                <p className="text-muted-foreground">
                  Peter Neumann<br/>
                  Dachsteinstr. 14<br/>
                  81825 München
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Haftungshinweis</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. 
                  Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich. 
                  Sollten Sie dennoch auf kostenpflichtige Inhalte aufmerksam werden, bitten wir um eine entsprechende Nachricht.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Impressum;