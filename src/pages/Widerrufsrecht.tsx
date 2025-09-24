import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Widerrufsrecht = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-primary text-primary">
              Verbraucherrechte
            </Badge>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Widerrufsrecht
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Informationen zu Ihrem Widerrufsrecht bei Verträgen im Fernabsatz
            </p>
          </div>

          <div className="space-y-6">
            {/* Widerrufsbelehrung */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Widerrufsbelehrung</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Widerrufsrecht</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-2">
                    Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-3">Ausübung des Widerrufsrechts</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Um Ihr Widerrufsrecht auszuüben, müssen Sie uns mittels einer eindeutigen Erklärung 
                    (z.B. ein mit der Post versandter Brief oder E-Mail) über Ihren Entschluss, 
                    diesen Vertrag zu widerrufen, informieren.
                  </p>
                  
                  <div className="bg-muted/50 p-4 rounded-lg mt-4">
                    <p className="text-muted-foreground">
                      <strong>Neumann Lubrikat GmbH</strong><br/>
                      Dachsteinstr. 14<br/>
                      81825 München<br/>
                      Deutschland<br/><br/>
                      E-Mail: <a href="mailto:info@neumann-energie.de" className="text-primary hover:underline">info@neumann-energie.de</a>
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-3">Widerrufsfrist</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung 
                    des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Folgen des Widerrufs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Folgen des Widerrufs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, 
                  einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, 
                  dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung 
                  gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, 
                  an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen 
                  Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; 
                  in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.
                </p>
              </CardContent>
            </Card>

            {/* Ausnahmen */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Ausschluss des Widerrufsrechts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Das Widerrufsrecht besteht nicht bei Verträgen:
                </p>
                <ul className="text-muted-foreground space-y-2">
                  <li>• zur Lieferung von Waren, die nicht vorgefertigt sind und für deren Herstellung eine individuelle Auswahl oder Bestimmung durch den Verbraucher maßgeblich ist</li>
                  <li>• zur Lieferung von Waren, die schnell verderben können oder deren Verfallsdatum schnell überschritten würde</li>
                  <li>• zur Lieferung alkoholischer Getränke, deren Preis bei Vertragsschluss vereinbart wurde, die aber frühestens 30 Tage nach Vertragsschluss geliefert werden können</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Widerrufsrecht;