import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Datenschutz = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-primary text-primary">
              Datenschutz
            </Badge>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Datenschutzerklärung
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Informationen zur Verarbeitung Ihrer personenbezogenen Daten gemäß Art. 13, 14 DSGVO
            </p>
          </div>

          <div className="space-y-6">
            {/* Verantwortlicher */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">1. Verantwortlicher</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Verantwortlicher für die Datenverarbeitung auf dieser Website ist:<br/><br/>
                  <strong>Neumann Lubrikat GmbH</strong><br/>
                  Dachsteinstr. 14<br/>
                  81825 München<br/>
                  Deutschland<br/><br/>
                  Telefon: +49 (0) 89 123456789<br/>
                  E-Mail: <a href="mailto:info@neumann-energie.de" className="text-primary hover:underline">info@neumann-energie.de</a>
                </p>
              </CardContent>
            </Card>

            {/* Arten der verarbeiteten Daten */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">2. Arten der verarbeiteten Daten</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Kontaktdaten (z.B. E-Mail-Adresse, Telefonnummer)</li>
                  <li>• Inhaltsdaten (z.B. Eingaben in Formularen)</li>
                  <li>• Nutzungsdaten (z.B. besuchte Webseiten, Interesse an Inhalten)</li>
                  <li>• Meta-/Kommunikationsdaten (z.B. Geräte-Informationen, IP-Adressen)</li>
                </ul>
              </CardContent>
            </Card>

            {/* Zwecke der Verarbeitung */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">3. Zwecke der Verarbeitung</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit</li>
                  <li>• Auswertung von Besucherverhalten und Interessen</li>
                  <li>• Kontaktanfragen und Kommunikation</li>
                  <li>• Sicherheitsmaßnahmen und Rechtsverfolgung</li>
                  <li>• Geschäftsabwicklung und Kundenbetreuung</li>
                </ul>
              </CardContent>
            </Card>

            {/* Rechtsgrundlagen */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">4. Rechtsgrundlagen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Die Verarbeitung Ihrer personenbezogenen Daten erfolgt auf Grundlage der folgenden Rechtsgrundlagen:
                </p>
                <ul className="text-muted-foreground space-y-2 mt-4">
                  <li>• Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</li>
                  <li>• Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)</li>
                  <li>• Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen)</li>
                </ul>
              </CardContent>
            </Card>

            {/* Betroffenenrechte */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">5. Ihre Rechte</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:
                </p>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Recht auf Auskunft (Art. 15 DSGVO)</li>
                  <li>• Recht auf Berichtigung (Art. 16 DSGVO)</li>
                  <li>• Recht auf Löschung (Art. 17 DSGVO)</li>
                  <li>• Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                  <li>• Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                  <li>• Recht auf Widerspruch (Art. 21 DSGVO)</li>
                  <li>• Recht auf Beschwerde bei einer Aufsichtsbehörde</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Zur Ausübung Ihrer Rechte wenden Sie sich an: 
                  <a href="mailto:info@neumann-energie.de" className="text-primary hover:underline ml-1">info@neumann-energie.de</a>
                </p>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">6. Cookies und Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Unsere Website verwendet Cookies, um die Nutzererfahrung zu verbessern. 
                  Detaillierte Informationen hierzu finden Sie in unserer 
                  <a href="/cookies" className="text-primary hover:underline ml-1">Cookie-Richtlinie</a>.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Datenschutz;